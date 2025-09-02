const express = require("express");
require('dotenv').config();
const connectDB = require('./config/database');
const app = express();
const port = process.env.PORT;
app.use(express.json());
const preLoginRoutes = require("./routes/preLogin");

app.use("/api/pre",preLoginRoutes);

connectDB().then(() => {
  console.log("Connected to the database successfully");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}).catch((err) => {
  console.error("Database connection error:", err);
})