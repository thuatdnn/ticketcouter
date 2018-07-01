const express = require('express');
const router = express.Router();

const EventCtrl = require('../app/controllers/Event');
const createValidator = require('../app/validations/event/create');
const eventCtrl = new EventCtrl();
router.post('/', createValidator, function(req, res, next){
    eventCtrl.createEvent(req, res, next)
})

module.exports = router;