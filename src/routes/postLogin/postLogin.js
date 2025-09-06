const express = require('express');
const { profileHandler } = require('../../controllers/postLogin/profile');
const { authenticateUser } = require('../../middleware/userAuth');
const router = express.Router();

router.post("/profile", authenticateUser, profileHandler)

module.exports = router;