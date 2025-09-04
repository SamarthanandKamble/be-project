const express = require('express');
const { loginHandler, signupHandler, forgotPasswordHandler, unlockAccountHandler } = require('../../controllers/preLogin');
const router = express.Router();

// Pre-login route

router.post("/login", loginHandler)
router.post("/signup", signupHandler)
router.patch("/forgotPassword", forgotPasswordHandler)
router.patch("/unlockAccount", unlockAccountHandler)
// router.post("/resetPassword", loginValidation, loginHandler)

module.exports = router;