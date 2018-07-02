const express = require('express');
const router = express.Router();

const EventCtrl = require('../app/controllers/Event');
const eventCtrl = new EventCtrl();
router.get('/', function(req, res, next){
    eventCtrl.getEventList(req, res, next);
})

module.exports = router;