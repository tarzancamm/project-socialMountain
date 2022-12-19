// Imports
require("dotenv").config();
const { db } = require("./util/database");
const { User } = require("./models/user");
const { Post } = require("./models/post");

const express = require("express");
const cors = require("cors");

// Importing port
const { PORT } = process.env; //5544

// Import middleware functions
const { login, register } = require("./controllers/auth");
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/posts");
const { isAuthenticated } = require("./middleware/isAuthenticated");

// Store express in variable
const app = express();

// Middleware to run on every endpoint
app.use(express.json()); // Parse requests into JSON
app.use(cors());

// Relations (associations)
User.hasMany(Post);
Post.belongsTo(User);

// Endpoints
app.post("/register", register);
app.post("/login", login);

// Endpoints (no auth required)
app.get("/posts", getAllPosts);

// Endpoints (auth required)
app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

// Sync methods to DB and have server listen. This will sync DB before server starts up
// Can use force to DROP tables while building app / making changes
// db.sync({ force: true })
db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
});
