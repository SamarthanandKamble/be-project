const express = require("express");
require('dotenv').config();
const connectDB = require('./config/database');
const app = express();
const User = require('./model/user');

const port = process.env.PORT;
app.use(express.json());


// Middleware to authenticate user
const authenticateUser = ("/user",(req, res, next) => {
  console.log("Authenticating user...");
  next();
})

// CRUD operations for User
// Create a new user
app.post("/user/signup",authenticateUser, async (req,res) => {
  const userRequestBody = req?.body
  try {
    const user = new User(userRequestBody);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error?.message });
  }
})

// Read a user by first name
app.get("/user/getUserDetails",authenticateUser, async (req, res) => { 
  const firstName = req?.body?.firstName;
  if (!firstName) {
    res.status(400).json({ message: "Bad request: firstName is required" });
  }
  try {
    const user = await User.exists({ firstName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error?.message });
  }
})


app.patch("/user/update",authenticateUser, async (req,res) => { 
  try {
    const userId = req?.body?.userId;
    const updatedFirstName = req?.body?.updatedFirstName;

    if (!userId || !updatedFirstName) { 
      return res.status(400).json({ message: "userId field is required" });
    }

    //Chck if the existingfirstName is present in Db
    const user = User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update the user's first name
    // user.firstName = updatedFirstName;
    // res.status(200).json({ message: "User updated successfully", user });

    // Alternatively, you can use findOneAndUpdate
    const response = await User.findByIdAndUpdate(
      { _id: userId },
      { firstName: updatedFirstName },
      { new: true, runValidators: true }
    );

    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }  
    res.status(200).json({ message: "User updated successfully", user: response });

} catch (error) {
    res.status(500).json({ message: "Internal server error", error: error?.message });
  }
})

app.delete("/user/delete", authenticateUser, async (req,res,next) => {
  try {
    const firstName = req?.body?.firstName;
    if (!firstName) {
      return res.status(400).json({ message: "Bad request: firstName is required" });
    }
    const response = await User.findOneAndDelete({ firstName });
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
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