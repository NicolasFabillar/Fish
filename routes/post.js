const express = require("express");
const router = express.Router();

const {productRender, userRender, editUserRender, logout, productInfoRender, sellersRender, sellerInfoRender, profileRender, editProfileRender} = require("../controllers/auth")

router.get("/", (req, res) => {
    const isLoggedIn = req.session?.isLoggedin;
    const userID =  req.session?.userID;
    const profileImage =  req.session?.profileImage;
    const userData = {
        loginStatus: isLoggedIn,
        profileImage: profileImage,
        userID: userID,
    };
    res.render("index", {userData});
});

router.get("/listing_form", (req,res) => {
    const isLoggedIn = req.session?.isLoggedin;
    if (isLoggedIn == true){
        res.render("listingform")
    } else {
        res.redirect("/login")
    }
});

router.get("/edit", editProfileRender);

router.get("/edit-fish", (req,res) => {
    res.render("edit-fish")
});

router.get("/profilepage", profileRender); // render product list

router.get("/contact", (req, res) => {
    const isLoggedIn = req.session?.isLoggedin;
    const userID =  req.session?.userID;
    const profileImage =  req.session?.profileImage;
    const userData = {
        loginStatus: isLoggedIn,
        profileImage: profileImage,
        userID: userID,
    };
    res.render("contact", {userData});
});

router.get("/product_list", productRender); // render product list

router.get("/product_info", productInfoRender); // render product info

router.get("/sellers", sellersRender); // render sellers

router.get("/seller_info", sellerInfoRender); // render seller info

router.get("/loginOLD", (req,res) => {
    res.render("loginOLD", messafe = false)
});

router.get("/indexOLD", (req,res) => {
    res.render("indexOLD")
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

router.get("/profile", userRender); 

router.get("/edit-profile", editUserRender);

router.get("/logout", logout); 

module.exports = router;
