const express = require("express");
const router = express.Router();
const {employeeRender, userRender, editUserRender, logout} = require("../controllers/auth")

router.get("/", (req,res) => {
    res.render("index")
});

router.get("/register", (req,res) => {
    res.render("register", message=false)
});

router.get("/login", (req,res) => {
    res.render("login", message=false)
});

router.get("/home", employeeRender);

router.get("/profile", userRender); 

router.get("/edit-profile", editUserRender);

router.get("/logout", logout); 


module.exports = router;
