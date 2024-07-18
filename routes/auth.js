const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();

const {login, register, updateProfile, listFish, updateFish} = require("../controllers/auth")

router.post("/api/register",upload.single("Image"), register);

router.post("/api/login", login);

router.post("/api/listfish", upload.single("fishPhoto"), listFish); // Seller Post Fish

router.post("/api/updateProfile", upload.single("profileImage"), updateProfile);

router.post("/api/updateFish", upload.single("fishImage"), updateFish);

module.exports = router;