const express = require('express');
const router = express.Router();

const AuthCtrl = require('../app/controllers/Auth');
const registerValidator = require('../app/validations/auth/register');
const loginValidator = require('../app/validations/auth/login');
const  authCtrl = new AuthCtrl();

router.post('/register', registerValidator, function(req, res, next) {
    authCtrl.register( req, res, next )});

router.post('/login', loginValidator, function(req, res, next) {
    authCtrl.login( req, res, next )});
module.exports = router;