//all middlewares
var Campground=require("../models/campgrounds");
var Comment=require("../models/comment");
var middlewareObj={};

middlewareObj.checkCampgroundOwnership=
function checkCampgroundOwnership(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,fcampground){
            if(err){
                res.redirect("back");
            }
            else{
                if(fcampground.author.id.equals(req.user._id))
                {
                    next();
                }
                else{
                    res.redirect("back");
                }
            }  
        });
    }
    else{
        res.redirect("/register");
    }
    
};

middlewareObj.checkCommentOwnership=
function checkCommentOwnership(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,fcomment){
            if(err){
                req.flash("error","Campgrounds not found");
                res.redirect("back");
            }
            else{
                if(fcomment.author.id.equals(req.user._id))
                {
                    next();
                }
                else{
                    req.flash("error","Permission denied");              
                    res.redirect("back");
                }
            }  
        });
    }
    else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("/login");
    }
};

middlewareObj.isLoggedIn=
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please log in first");
    res.redirect("/login");
};
module.exports= middlewareObj;