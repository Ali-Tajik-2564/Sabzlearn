const express = require("express");
const path = require("path");

const authRoutes = require("./routes/v1/auth");
const courseRoutes = require("./routes/v1/course");
const menuRoutes = require("./routes/v1/menu");
const categoryRoutes = require("./routes/v1/category");
const articlesRoutes = require("./routes/v1/article");
const commentsRoutes = require("./routes/v1/comment");
const newslettersRoutes = require("./routes/v1/newsletter");
const contactRoutes = require("./routes/v1/contact");
const searchRoutes = require("./routes/v1/search");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  "/courses/covers",
  express.static(path.join(__dirname, "public", "course", "covers"))
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/v1/auth", authRoutes);
app.use("/v1/courses", courseRoutes);
app.use("/v1/menus", menuRoutes);
app.use("/v1/category", categoryRoutes);
app.use("/v1/articles", articlesRoutes);
app.use("/v1/comments", commentsRoutes);
app.use("/v1/newsletters", newslettersRoutes);
app.use("/v1/contact", contactRoutes);
app.use("/v1/search", searchRoutes);

module.exports = app;
