const express = require('express');
const { profileHandler } = require('../../controllers/postLogin/profile');
const { authenticateUser } = require('../../middleware/userAuth');
const router = express.Router();
const endpoints = require('../../utils/endpoints');
const { PROFILE } = endpoints.PROFILE;

router.post(PROFILE, authenticateUser, profileHandler)

module.exports = router;