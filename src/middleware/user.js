exports.authenticateUser = ("/user",(req, res, next) => {
    console.log("Authenticating user...");
    next();
  })
  