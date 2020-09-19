var mongoose=require("mongoose"),
Campground=require("./models/campgrounds"),
Comment=require("./models/comment");
var data= [
    {name:"Cloud Rest",
    image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Rest and enjoy"
    }
    ,
    {name:"Cloud Sky",
    image:"https://images.unsplash.com/photo-1556942154-006c061d4561?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Dance with the skies"
    }
    ,
    {name:"Cloud Fire",
    image:"https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Bon fire Bon iver"
    }
]
function seedDB(){
    Campground.remove({},function(err){
        // if(err) console.log(err);
        // else {
        //     console.log("campgrounds removed");
        //     data.forEach(function(seed){
        //         Campground.create(seed,function(err,campground){
        //             if(err) 
        //             {
        //                 console.log(err);
        //             }
        //             else {
        //                 console.log(seed);
        //                 Comment.create({
        //                         text: "Great Hi Raja",
        //                         author:"Baniya Babu"
        //                 },function(err,comment){
        //                     if(err){console.log(err);}
        //                     else{
        //                         campground.comments.push(comment)
        //                         campground.save();
        //                         console.log(comment);
        //                     }
        //                 });
        //             }   
        //         });
        //     });
        // }
    });
}

module.exports = seedDB;

