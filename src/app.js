const express = require("express");
require('dotenv').config();

const app = express();

const port = process.env.PORT;


app.get("/user", (req, res) => {
  res.send("This is a GET users route!");
})

app.post("/user", (req, res) => {
  res.send("This is a POST users route!");
})

app.put("/user", (req, res) => { 
  res.send("This is a PUT users route!");
})

app.delete("/user", (req, res) => {
  res.send("This is a DELETE users route!");
})

app.get("/logout", (req, res) => {
  res.redirect(200,"/login");
  // res.json({
  //   message: "This is a GET logout route!",
  //   status: "success"
  // });
})

app.get("/login", (req, res) => {
  res.json({
    message: "This is a GET login route!",
    status: "success"
  });
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })