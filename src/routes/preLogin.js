
//add pre login routes

const express = require('express');
const router = express.Router();

// Pre-login route

router.post("/login", (req,res) => {
console.log("req",req.body);
res.send("login route");
})

module.exports = router;