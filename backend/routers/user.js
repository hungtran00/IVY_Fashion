const userController = require("../controllers/userController")
const middlewareController = require("../controllers/middlewareControllers")

const router = require("express").Router();

//get all user
router.get("/",middlewareController.verifyToken ,userController.getAllUsers)


module.exports = router;