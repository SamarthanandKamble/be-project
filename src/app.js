const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT;
const preLoginRoutes = require("./routes/preLogin/preLogin");
const postLoginRoutes = require("./routes/postLogin/postLogin");

app.use(express.json());
app.use(cookieParser());

app.use("/auth", preLoginRoutes);
app.use("/user", postLoginRoutes);

connectDB()
  .then(() => {
    console.log("Connected to the database successfully");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
