const express = require("express");
const app = express();
const Port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Generate a random Id
var methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Default Posts

let posts = [
  {
    id: uuidv4(),
    username: "amankumawat",
    content:
      "I am a BCA final year student and currently i am working on my final year project",
  },
  {
    id: uuidv4(),
    username: "nikhilsharma",
    content: "This men is working on AdMediaX",
  },
  {
    id: uuidv4(),
    username: "codingHeist",
    content: "Here you can see all coding doubts and their solution",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// Add a new Post

app.post("/posts", (req, res) => {
  let id = uuidv4();
  let { username, content } = req.body;
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// See Post In Details

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

// Edit Post content

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

// Delete a Post

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

// Start localhost

app.listen(Port, () => {
  console.log(`Listening on Port ${Port}`);
});