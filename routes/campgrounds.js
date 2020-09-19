var express=require("express");
var router= express.Router();
var Campground=require("../models/campgrounds");
var Comment=require("../models/comment");
var middleware=require("../middleware");
router.use(express.static(__dirname+"/public"));



router.get("/",function(req,res){
    
    Campground.find({},function(err,allCampgrounds){
        if(err) console.log(err);
        else{
            res.render("./campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
    
});

router.post("/",middleware.isLoggedIn,function(req,res){
    //get data from form 
    //add to campground array
    //redirect
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var author={id: req.user._id,username: req.user.username};
    var description=req.body.description;
    var newCamp={name:name,
        price:price, 
        image:image, 
        description: description,
        author: author};
    Campground.create(newCamp,function(err,res){
        if(err)console.log(err);
        else console.log(res);
    });
    //default redirects to get campground ver
    res.redirect("/");
});

router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("./campgrounds/new");
});

router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err) {
            console.log(err);
        }
        else 
        {
            res.render("./campgrounds/show" ,{campground:foundCampground});
        }
    });
    
});

//edit

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    //if user loggedIn
    //if yes owner
    //let user run
    //else redirect
    Campground.findById(req.params.id,function(err,fcampground){
        if(err) console.log(err);
        else{
                res.render("./campgrounds/edit",{campground:fcampground});
        }         
    });
    
});

//update

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    
    Campground.findByIdAndUpdate(req.params.id,req.body.camp,function(err,newCamp){
        if(err) console.log(err);
        else{
            req.flash("success","Campground Updated!");
            res.redirect("/campgrounds");
        } 
    });
});
 
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndDelete(req.params.id,function(err){
        if(err) console.log(err);
        else{
            req.flash("success","Campground deleted!");
            res.redirect("/campgrounds");
        }
        
    });
});

module.exports=router;