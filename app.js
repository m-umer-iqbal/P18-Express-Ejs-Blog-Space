const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const homeStartingContent = "Welcome home! Make yourself comfortable… but don’t click away so fast!";
const aboutContent = "It’s basically our dating profile for Google.";
const contactContent = "Fill out the form, I promise I will reply before the next site redesign.";

const app = express();
app.locals._ = _;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const year = new Date().getFullYear();
const posts = [];

app.get("/", (req, res) => {
  res.render("home", { homeStartingContent: homeStartingContent, year: year, posts: posts });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent, year: year, posts: posts });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent, year: year, posts: posts });
});

app.get("/compose", (req, res) => {
  res.render("compose", { year: year, posts: posts });
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  }
  posts.push(post)
  let currentPost = "/posts/" + _.kebabCase(post.title);
  res.redirect(currentPost);
});

app.get("/posts/:slug", (req, res) => {
  let variable = req.params.slug;
  posts.forEach((post) => {
    if (_.lowerCase(variable) == _.lowerCase(post.title)) {
      res.render("post", { title: post.title, body: post.body, year: year, posts: posts });
    }
  })
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});