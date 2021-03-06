var express=require("express");
var router= express.Router({mergeParams:true});
var Comment=require("../models/comment");
var Campground=require("../models/campgrounds");
var middleware=require("../middleware");

router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            req.flash("error","Something went wrong")
            console.log(err);
        } 
        else{
            req.flash("success","Comment posted")
            //console.log(campground);
            res.render("./comments/new",{campground: campground});
        }
    });
    
});

router.post("/",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err) 
            console.log(err);
        else{
            Comment.create({text:req.body.text},function(err,comment){
                if(err) console.log(err);
                else{
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });

});

router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,fcomment){
        if(err) console.log(err);
        else{
            res.render("./comments/edit",{campground_id:req.params.id,comment:fcomment});
        }
    });
});

router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,{text:req.body.text},function(err,ucomment){
        if(err) console.log(err);
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id,function(err,comment){
        if(err) console.log(err);
        else {
            req.flash("success","Comment Deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});


module.exports=router;