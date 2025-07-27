const express = require("express");
require('dotenv').config();
const connectDB = require('./config/database');
const app = express();
const User = require('./model/user');

const port = process.env.PORT;
app.use(express.json());

app.post("/signup", async (req,res) => {
  const userRequestBody = req?.body
  try {
    const user = new User(userRequestBody);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error?.message });
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