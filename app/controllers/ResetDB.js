const EventRepository = require('../repositories/Event');
const TicketRepository = require('../repositories/Ticket');
const UserRepository = require('../repositories/User');
const { validationResult } = require('express-validator/check');
const Responses = require('../responses');
const JWT = require('jsonwebtoken');
const userRepo = new UserRepository;
const eventRepo = new EventRepository;
const ticketRepo = new TicketRepository;
const response = new Responses;
module.exports = {
    async resetDB (req, res){
        let options = {};

        let errors = validationResult(req);

        if (!errors.isEmpty()){
            let options = {};
            if (errors.array()[0].param == 'authentication'){
                return response.authen_required(res, options)
            }else{
                let options = {validations:[]};
                errors.array().forEach((obj)=>{
                    options.validations.push({'attribute': obj.param,'reason': obj.msg});
                });
                return response.validation_error(res, options);
            }
        }else{
            let token = req.headers.authentication;
            let decoded = await JWT.verify(token, APP_KEY);
            let defaultAdmin = await userRepo.getUserById(decoded.id);
            if (!(defaultAdmin.username === "BE.admin")){
                return response.permission_denied(res, options)
            }
            else{
                await userRepo.resetUser();
                await eventRepo.resetEvent();
                await ticketRepo.resetTicket();
                return response.success(res, options)
            }
        }
    },
}