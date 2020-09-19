var express=require("express");
var bodyParser=require("body-parser");
var app=express();
var mongoose=require("mongoose");
var passport= require("passport");
var localStrategy  =require("passport-local");
var passportLocalMongoose=require("passport-local-mongoose");
var methodOverride=require("method-override");
var flash = require("connect-flash");

mongoose. set('useUnifiedTopology', true);
mongoose.connect("mongodb://127.0.0.1:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname+"/public"));

app.use(require("express-session")({
    secret: "fallout boy",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(flash()); 

//schema setup
var Campground=require("./models/campgrounds"),
Comment=require("./models/comment"),
User=require("./models/user");



//==========PASSPORT========
app.use(require("express-session")({
    secret: "fallout boy",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
}); 

app.set("view engine","ejs");
//=====ROUTE FILES===============
var campgroundsRoutes=require("./routes/campgrounds"),
    authRoutes=require("./routes/auth"),
    commentsRoutes=require("./routes/comments");

app.use("/campgrounds",campgroundsRoutes);
app.use("/",authRoutes);
app.use("/campgrounds/:id/comments",commentsRoutes);


app.listen(process.env.PORT || 7000,function(){console.log("Server Started")});