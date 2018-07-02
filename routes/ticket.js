const express = require('express');
const router = express.Router();
const TicketController = require('../app/controllers/Ticket');
const buyValidator = require('../app/validations/ticket/buy');
const getValidator = require('../app/validations/ticket/getPurchased');
const ticketCtrl = new TicketController;
router.post('/buy-ticket/:event_id', buyValidator ,function(req, res, next){
    ticketCtrl.buyTicket(req, res);
})
router.get('/tickets/:event_id', getValidator,function(req, res, next){
    ticketCtrl.getPurchasedTicket(req, res);
})

module.exports = router;
