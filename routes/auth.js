const express = require('express');
const authConroller = require('../authController/auth')
const router = express.Router();

router.post('/register', authConroller.register);

module .exports = router;