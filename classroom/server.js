const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");

app.use(session({
    secret : "mysupersecretstring", 
    resave:false, 
    saveUninitialized: true,
}));

app.get("/reqcount", (req,res)=>{
    if(req.session.count){
        req.session.count++;
    } else{
        req.session.count =1;
    }
    res.send(`you sent a request ${req.session.count} times`);
});

app.listen(3000, () =>{
    console.log("server is lisening to 3000");
});


/*
const cookieParser = require("cookie-parser");


app.use(cookieParser("secretcode"));

app.get("/getsignedcookkie", (req,res)=>{
    res.cookie("made-in", "india", {signed:true});
    res.send("signed cookie sent");
});

app.get("/verify", (req, res)=>{
    console.log(req.signedCookies);
    res.send("verified");
});

app.get("/getcookies",(req, res)=>{
    res.cookie("greet","hello");
    res.send("sent you some cookies");
});

app.get("/greet", (req, res)=>{
    let {name="anonymous"} = req.cookies;
    res.send(`hi,${name}`);
})

app.get("/", (req, res)=>{
    console.dir(req.cookies);
    res.send("im root");
});

app.use("/users", users);
app.use("/posts", posts);
*/