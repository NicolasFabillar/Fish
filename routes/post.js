const express = require("express");
const router = express.Router();
const {employeeRender, userRender, editUserRender, logout} = require("../controllers/auth")

router.get("/", (req,res) => {
    res.render("index")
});


router.get("/listingform", (req,res) => {
    res.render("listingform")
});

router.get("/product-info", (req,res) => {
    res.render("product-info")
});

router.get("/product-list", (req,res) => {
    res.render("product-list")
});

router.get("/sellerinfo", (req,res) => {
    res.render("sellerinfo")
});

router.get("/sellers", (req,res) => {
    res.render("sellers")
});

router.get("/loginN", (req,res) => {
    res.render("loginN")
});

router.get("/indexN", (req,res) => {
    res.render("indexN")
});

router.get("/register", (req,res) => {
    res.render("register", message=false)
});

router.get("/login", (req,res) => {
    res.render("login", message=false)
});

router.get("/signup", (req,res) => {
    res.render("signup", message=false)
});


router.get("/home", employeeRender);

router.get("/profile", userRender); 

router.get("/edit-profile", editUserRender);

router.get("/logout", logout); 

module.exports = router;
