const express = require('express');
const router = express.Router();
const reset = require('../app/controllers/ResetDB');
//const resetDBValidator = require('../app/validations/auth/resetDB')

router.get('/', function(req, res, next){
    reset.resetDB(req, res, next);
})

module.exports = router;