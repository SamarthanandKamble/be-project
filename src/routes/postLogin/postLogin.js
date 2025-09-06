const express = require('express');
const { getUserDetails } = require('../../controllers/postLogin/getProfileDetails');
const { updateUserDetails } = require('../../controllers/postLogin/updateProfile');
const { authenticateUser } = require('../../middleware/userAuth');
const router = express.Router();
const endpoints = require('../../utils/endpoints');
const { PROFILE, UPDATE } = endpoints.PROFILE;

router.get(PROFILE, authenticateUser, getUserDetails)
router.patch(UPDATE, authenticateUser, updateUserDetails)

module.exports = router;