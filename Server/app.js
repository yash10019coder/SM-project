//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
//globalvariables
const homeStartingContent =
    "";
const aboutContent =
    "";
const contactContent =
    "";
let posts = [];

const app = express();
app.use(express.static("public"));

app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

//app.get is used to create routes
//res.render is used to reder ejs templates which are inside views folder
app.get("/", function(req, res) {
    //renders home template and replace .... using markers
    res.render("home", {
        homeStartingContent: homeStartingContent,
        posts: posts,
    });
});
app.get("/about", function(req, res) {
    //renders home template and replace .... using markers
    res.render("about", { aboutContent: aboutContent });
});
app.get("/contact", function(req, res) {
    //renders home template and replace .... using markers
    res.render("contact", { contactContent: contactContent });
});
app.get("/compose", function(req, res) {
    //renders home template and replace .... using markers
    res.render("compose");
});
app.get("/b1", function(req, res) {
    //renders home template and replace .... using markers
    res.render("b1");
});
app.post("/compose", function(req, res) {
    let post = {
        postTitle: req.body.postTitle,
        postBody: req.body.postBody,
    };
    posts.push(post);
    res.redirect("/");
});
//dynamic route using express pararms routing
//using lodash to convert any type of string kebab snake or any to lowecase
app.get("/posts/:postName", function(req, res) {
    const requestedTitle = _.lowerCase(req.params.postName);
    //for each loop 
    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.postTitle);

        if (storedTitle == requestedTitle) {
            res.render("post", { title: post.postTitle, content: post.postBody });
        };
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});