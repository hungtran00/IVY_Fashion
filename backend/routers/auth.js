const authController = require("../controllers/authControllers");
const userController = require("../controllers/userController")
const middlewareController = require("../controllers/middlewareControllers")

const router = require("express").Router();

router.post("/register", authController.registerUser)


router.post("/login", authController.loginUser)

//REFRESH
router.post("/refresh", authController.requestRefeshToken);

router.delete("/:id", userController.deleteUsers)

router.post("/logout", middlewareController.verifyToken ,authController.userLogout);

module.exports = router;