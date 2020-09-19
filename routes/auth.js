var express=require("express");
var router= express.Router({mergeParams:true});
var passport= require("passport");
var User=require("../models/user");


router.get("/",function(req,res){
    res.render("landing");
});

router.get("/register",function(req,res){
    res.render("./account/register");
});

router.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),
    req.body.password,
    function(err,user){
        if(err) {
            req.flash("error",err.message);
            return res.render("./account/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to YelpCamp"+ user.username);
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login",function(req,res){
    res.render("./account/login");
});


//login(route,middleware,callback)
router.post("/login",passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect:"/login"}),
    function(req,res){
    }
);


router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/");
});

module.exports=router;