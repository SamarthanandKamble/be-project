
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.authenticateUser = (async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  const { _id } = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

  const user = await User.findById(_id);
  if (!user) {
    return res.status(401).json({ message: "User not found!" });
  }
  req.user = user;
  next();
})
