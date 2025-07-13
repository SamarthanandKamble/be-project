const express = require("express");
require('dotenv').config();


console.log("express version:", express);

const app = express();

const port = process.env.PORT;

app.use("/", (req, res) => {
  res.send("Hello World!");
})

app.use("/user", (req, res) => {
  res.send("This is users route!");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })