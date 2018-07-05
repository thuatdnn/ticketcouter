const EventRepository = require('../repositories/Event');
const TicketRepository = require('../repositories/Ticket');
const UserRepository = require('../repositories/User');
//const { validationResult } = require('express-validator/check');
const Responses = require('../responses');
const seeder = require('../../seeder');
const userRepo = new UserRepository;
const eventRepo = new EventRepository;
const ticketRepo = new TicketRepository;
const response = new Responses;
module.exports = {
    async resetDB (req, res){
        let options = {};
            await userRepo.resetUser();
            await eventRepo.resetEvent();
            await ticketRepo.resetTicket();
            await seeder.seeder()
            return response.success(res, options)
    
    },
}