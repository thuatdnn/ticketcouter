const express = require('express');
const router = express.Router();

const EventCtrl = require('../app/controllers/Event');
const createValidator = require('../app/validations/event/create');
const updateValidator = require('../app/validations/event/update');
const deleteValidator = require('../app/validations/event/delete');
const eventCtrl = new EventCtrl();
router.post('/', createValidator, function(req, res, next){
    eventCtrl.createEvent(req, res, next)
})

router.get('/:event_id', function(req, res, next){
    eventCtrl.getEventDetail(req, res, next)
})
router.post('/:event_id', updateValidator, function(req, res, next){
    eventCtrl.updateEvent(req, res, next)
})
router.delete('/:event_id', deleteValidator, function(req, res, next){
    eventCtrl.deleteEvent(req, res, next)
})

module.exports = router;