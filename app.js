const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/shoeping")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  `Server of ShoePing connected`;
});
