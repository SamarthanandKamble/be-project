const express = require('express');
const { loginHandler,signupHandler,forgotPasswordHandler } = require('../controllers/preLogin');
const router = express.Router();

// Pre-login route

router.post("/login", loginHandler)
router.post("/signup", signupHandler)
router.patch("/forgotPassword", forgotPasswordHandler)
// router.post("/signup", loginValidation, loginHandler)
// router.post("/resetPassword", loginValidation, loginHandler)
// router.post("/forgotPassword", loginValidation, loginHandler)

module.exports = router;