const TicketRepository = require('../repositories/Ticket');
const EventRepository = require('../repositories/Event');
const { validationResult } = require('express-validator/check');
const Responses = require('../responses');
const JWT = require('jsonwebtoken');

class TicketController extends Responses{
    constructor(){
        super();
        this.ticketRepo = new TicketRepository;
        this.eventRepo = new EventRepository;
    }

    async buyTicket(req, res){
        let options = {};

        let errors = validationResult(req);

        if (!errors.isEmpty()){
            let options = {};
            if (errors.array()[0].param == 'authentication'){
                return this.authen_required(res, options)
            }else{
                let options = {validations:[]};
                errors.array().forEach((obj)=>{
                    options.validations.push({'attribute': obj.param,'reason': obj.msg});
                });
                return this.validation_error(res, options);
            }
        }else{
            let now = new Date().now();
            let event = await this.eventRepo.getEventById(req.params.event_id);
            if (!event){
                return this.event_not_exist(res, options);
            }
            if (!(event.ticket_start_time < now && event.ticket_end_time > now)){
                return this.not_time_buy(res, options);
            }
            if (event.sold>=event.ticket_total){
                return this.sold_out(res, options)
            }else{
                let token = req.headers.authentication;
                let decoded = await JWT.verify(token, APP_KEY);
                let newSold = event.sold + req.body.quantity;
                let updateEvent = await this.eventRepo.updateEvent(req.params.event_id,{sold: newSold})
                let newTicket = await this.ticketRepo.createTicket(req.params.event_id, decoded.id, req.body.quantity);
                let options={data:{
                    payment_id:newTicket.id
                }}
                return this.success(res, options)
            }


        }
    }
}