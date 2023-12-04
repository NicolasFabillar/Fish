const express = require("express");
const {login, register, updateProfile} = require("../controllers/auth")

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/updateProfile", updateProfile);

module.exports = router;