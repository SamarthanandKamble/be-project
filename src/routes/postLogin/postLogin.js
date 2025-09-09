const express = require('express');
const { getUserDetails } = require('../../controllers/postLogin/getProfileDetails');
const { updateUserDetails } = require('../../controllers/postLogin/updateProfile');
const { connectionRequests } = require('../../controllers/postLogin/connectionRequests');
const { authenticateUser } = require('../../middleware/userAuth');
const router = express.Router();
const endpoints = require('../../utils/endpoints');
const { PROFILE, UPDATE, } = endpoints.PROFILE;
const { CONNECTION_REQUESTS } = endpoints.DASHBOARD;

router.get(PROFILE, authenticateUser, getUserDetails)
router.patch(UPDATE, authenticateUser, updateUserDetails)
router.get(CONNECTION_REQUESTS, authenticateUser, connectionRequests)

module.exports = router;