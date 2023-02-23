const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Why is a blog important? Blogs provide more shareable content than just your products or service posts for consumers to share with others across social media. It's a great way to educate customers, provide tips or how-tos, and create more connections with your brand.";
const aboutContent = "I am Arshad Mapari, an aspiring web developer and a machine learning enthusiast. I enjoy building new things and seeing results unfold before my eyes. I hope you enjoy this blog website!";
const contactContent = "Feel free to mail me at : arshadhm200@gmail.com";
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set('strictQuery',false);
mongoose.connect("mongodb+srv://admin-arshad:mongo0302@cluster0.khypjtz.mongodb.net/blogdb",{useNewUrlParser : true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post",postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
});

app.get("/posts/:postID", function(req, res){
  const reqID = req.params.postID;

  Post.findOne({_id: reqID}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
