const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();
//checking

const dbURI =
  "mongodb+srv://canh:test123456@learn-node.xslr6.mongodb.net/KevinDb1?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useUnifiedTopology: true })
  .then((result) => app.listen(5000))
  .catch((err) => console.log(err));
app.set("view engine", "ejs");

app.use(express.urlencoded());

app.use(express.static("public"));
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
