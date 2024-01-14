const express = require("express")

const {register, login, forgotpassword, resetpassword, getPrivateData} = require("../controllers/auth");

const {getAccessToRoute} = require("../middlewares/authorization/auth");

const router = express.Router();


router.post("/register", register)

router.post("/login", login)

router.post("/forgotpassword", forgotpassword)

router.put("/resetpassword", resetpassword)

router.get("/private", getAccessToRoute, getPrivateData)


module.exports = router