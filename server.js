const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const cookie = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const renderRoutes = require("./routes/renderRoutes");
const addRoutes = require("./routes/addRoutes");
const deleteRoutes = require("./routes/deleteRoutes");
const getRoutes = require("./routes/getRoutes");
const PORT = process.env.PORT || 3000;
const URI = process.env.DB_URI;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookie());

app.use(
  "/upload/image",
  express.static(path.join(__dirname, "./upload/image"))
);
app.use("/js", express.static(path.join(__dirname, "./js")));
app.use("/css", express.static(path.join(__dirname, "./css")));
app.use("/lib", express.static(path.join(__dirname, "./lib")));
app.use(
  "/node_modules",
  express.static(path.join(__dirname, "./node_modules"))
);
app.set("view engine", "ejs");

mongoose
  .connect(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    console.log("Database Connection Good");
  })
  .catch((err) => {
    console.log(err);
  });

// Routes

app.use("/add", addRoutes);
app.use("/delete", deleteRoutes);
app.use("/get", getRoutes);
app.use(authRoutes);
app.use(renderRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome Home" });
});
