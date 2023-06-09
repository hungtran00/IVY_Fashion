const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser");
const authRoute = require("./routers/auth")
const userRoute = require("./routers/user")
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGOODB_URL, ()=>{
    console.log("CONNECTED TO MONGO DB")
})

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//routes
app.use("/v1/auth", authRoute)
app.use("/v1/user", userRoute)

app.listen(8000, ()=>{
    console.log("Server is running...")
})