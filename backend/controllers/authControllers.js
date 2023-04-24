const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { use } = require("../routers/auth");

const refreshTokens = [];
const authController = {
    //register
    registerUser: async(req,res)=>{
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //create new user
            const newUser = await new User({
                username:req.body.username,
                email:req.body.email,
                password:hashed,
            });

            //save to db
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error)
            
        }

    },
     //generate access token
     generateAccessToken: (user)=>{
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
        process.env.JWT_ACCESS_KEY,
        {expiresIn:"30s"}
        );

    },
    //generateRefesh Token
    generateRefeshToken: (user)=>{
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
        process.env.JWT_REFRESH_KEY,
        {expiresIn:"365d"}
        );

    },
    //LOGIN
    loginUser: async(req,res)=>{
        try {
            const user = await User.findOne({username: req.body.username});
            if(!user){
               return res.status(404).json("Wrong username")
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if(!validPassword){
               return res.status(404).json("Wrong password")
            }
            if(user && validPassword){
               const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefeshToken(user);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path:"/",
                    sameSite:"strict",
                })
                const {password, ...others} = user._doc;
                res.status(200).json({...others, accessToken,refreshToken})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    requestRefeshToken: async(req,res)=>{
        //Take refesh token from user
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json("You are not authencated")
        if(!refreshTokens.includes(refreshToken)){
            return res.status(403).json("Refresh token is not valid")
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err,user)=>{
            if(err){
                console.log(err)
            }
            refreshTokens = refreshTokens.filter((token)=> token !== refreshToken);
            //create new accessToken, refresh token
            const newAccessToken = authControllers.generateAccessToken(user);
            const newRefreshToken = authControllers.generateRefeshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path:"/",
                sameSite:"strict",
            });
            res.status(200).json({accessToken: newAccessToken});
        })
    },
     //Log out
     userLogout: async(req,res)=>{
        res.clearCookie("refreshToken")
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("Loged out !");
    }
}

module.exports = authController;