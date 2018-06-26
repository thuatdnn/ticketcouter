const express = require('express');
const userCtrl = require('../app/controllers/userCtrl')
const router = express.Router();

router.post('/signup', userCtrl.createUser)

module.exports = router;