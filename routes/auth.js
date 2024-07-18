const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();

const {login, register, updateProfile, listFish, updateFish, deleteFish} = require("../controllers/auth")

router.post("/api/register",upload.single("Image"), register);

router.post("/api/login", login);

router.post("/api/listfish", upload.single("fishPhoto"), listFish); // Seller Post Fish

router.post("/api/updateProfile", upload.single("profileImage"), updateProfile);

router.post("/api/updateFish", upload.single("fishImage"), updateFish);

router.get("/api/deleteFish", deleteFish);

module.exports = router;