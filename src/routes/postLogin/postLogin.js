const express = require('express');
const { getUserDetails } = require('../../controllers/postLogin/getProfileDetails');
const { updateUserDetails } = require('../../controllers/postLogin/updateProfile');
const { sendConnectionRequest, recievedConnectionRequests, respondConnectionRequest } = require('../../controllers/postLogin/connectionRequests');
const { authenticateUser } = require('../../middleware/userAuth');
const router = express.Router();
const endpoints = require('../../utils/endpoints');
const { PROFILE, UPDATE, } = endpoints.PROFILE;
const { SEND_CONNECTION_REQUESTS, RECIEVED_REQUESTS, RESPOND_CONNECTION_REQUESTS } = endpoints.DASHBOARD;

router.get(PROFILE, authenticateUser, getUserDetails)
router.patch(UPDATE, authenticateUser, updateUserDetails)
router.get(SEND_CONNECTION_REQUESTS, authenticateUser, sendConnectionRequest)
router.get(RECIEVED_REQUESTS, authenticateUser, recievedConnectionRequests)
router.get(RESPOND_CONNECTION_REQUESTS, authenticateUser, respondConnectionRequest)

module.exports = router;