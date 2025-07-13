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

app.get("/login", (req, res) => {
  res.json({
    message: "This is a GET login route!",
    status: "success"
  });
})

app.get("/logout", (req, res) => {
  // res.redirect(200,"/login");
  res.json({
    message: "This is a GET logout route!",
    status: "success"
  });
})

// playing with the route handlers
// first the req handlers will execute and then it will execute the final route handler.
// if we dont use next() in the req handlers, the final route handler will not execute.
const handler1 = (req,res,next) => {
  console.log("Handler 1 executed"); 
  next();
}

const handler2 = (req,res,next) => {
  console.log("Handler 2 executed");
  next();
}

app.get("/hello", handler1, handler2, (req, res) => {
  res.send("Hello World!");
})


app.get("/abc1", (req, res,next) => {

  next()
})
app.get("/abc2", (req, res,next) => {
  res.send("This is a GET abc2 route!");
})
app.get("/abc3", (req, res,next) => {
  res.send("This is a GET abc3 route!");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })