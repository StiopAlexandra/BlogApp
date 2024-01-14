const express = require("express")

const imageUpload = require("../helpers/libraries/imageUpload");

const {profile, editProfile, changePassword, addStoryToReadList, readListPage} = require("../controllers/user");
const {getAccessToRoute} = require("../middlewares/authorization/auth");


const router = express.Router();

router.get("/profile", getAccessToRoute, profile)

router.post("/editProfile", [getAccessToRoute, imageUpload.single("photo")], editProfile)

router.put("/changePassword", getAccessToRoute, changePassword)

router.post("/:slug/addStoryToReadList", getAccessToRoute, addStoryToReadList)

router.get("/readList", getAccessToRoute, readListPage)


module.exports = router