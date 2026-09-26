const {Router} = require("express")
const authcontroller = require("../controller/auth.controller")
const authmiddleware = require("../middleware/auth.middleware")
const router = Router();

router.post("/register", authcontroller.registeruser)

router.post("/login",authcontroller.loginUser)

router.get("/get-me",authmiddleware.authuser,authcontroller.getMe)

router.post("/logout",  authmiddleware.authuser   ,authcontroller.logoutUser)

module.exports = router