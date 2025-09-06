const express = require('express');
const { loginHandler, signupHandler, forgotPasswordHandler, unlockAccountHandler, logoutHandler } = require('../../controllers/preLogin');
const router = express.Router();
const endpoints = require('../../utils/endpoints');

const { LOGIN, FORGOT_PASSWORD, SIGNUP, UNLOCK_ACCOUNT, LOGOUT } = endpoints.AUTH;

router.post(LOGIN, loginHandler)
router.get(LOGOUT, logoutHandler)
router.post(SIGNUP, signupHandler)
router.patch(FORGOT_PASSWORD, forgotPasswordHandler)
router.patch(UNLOCK_ACCOUNT, unlockAccountHandler)

module.exports = router;