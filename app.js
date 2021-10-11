var express         = require('express'),
    app             = express(),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    passport        = require('passport'),
    methodOverride  = require('method-override'),
    LocalStrategy   = require("passport-local");

    app.set("view engine","ejs");
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(express.static("public"));
    app.use(methodOverride("_method"));    

    var port = process.env.PORT || 7700;

 mongoose.connect("mongodb+srv://hacktoberfest:hacktoberfest@hacktoberfest.2tevb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
  useNewUrlParser :true,
  useUnifiedTopology: true
}).then(() =>{
  console.log("mongodb connected");
}).catch(err =>{
  console.log("ERROR", err.message);
});

app.use(require("express-session")({
    secret : 'you cannot access without auth',
    resave : false,
    saveUninitialized : false
   }));


const User = require("./models/user");
const Post = require("./models/post");
   

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
   

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/login",(req,res)=>{
       res.render("login")
})

app.get("/register",(req,res)=>{
       res.render("register");
})

app.get("/profile",(req,res)=>{
       res.render("profile");
})

app.get("/dashboard",(req,res)=>{
    res.render("dashboard");
})


//POST Method routes

  app.post("/newpost",(req,res)=>{
    const data = req.body;
    Post.create(data,(err)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect("/");
      }
    })
  })


  app.post("/register",(req,res)=>{
    const data = req.body;
    User.create(data,(err)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect("/dashboard");
      }
    })
  })

  app.post("login",(req,res)=>{
    
  })



app.listen(port,()=>{
    console.log("Server connected on: " + port)
})