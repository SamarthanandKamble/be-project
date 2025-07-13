const express = require("express");
require('dotenv').config();
const connectDB = require('./config/database');
const app = express();
const User = require('./model/user');

const port = process.env.PORT;


app.post("/signup", async (req,res) => {
  const dummyUser = {
    firstName: "John",
    lastName: "Doe",
    city: "Solapur",
    email: "johndoe@gmail.com",
    password:"password123"
  }

  try {
    const user = new User(dummyUser);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error", error });
  }

})


connectDB().then(() => {
  console.log("Connected to the database successfully");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}).catch((err) => {
  console.error("Database connection error:", err);
})