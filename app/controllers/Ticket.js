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
            let now = Date.now();
            let event = await this.eventRepo.getEventById(req.params.event_id);
            if (!event){
                return this.event_not_exist(res, options);
            }
            function milliSecond (string){
                let dateTime = new Date(string);
                return dateTime.getTime();
            }
            if (!(milliSecond(event.ticket_start_date) < now && milliSecond(event.ticket_end_date) > now)){
                return this.not_time_buy(res, options);
            }else{
                let decoded={}
                try{
                    let token = req.headers.authentication;
                    decoded = await JWT.verify(token, APP_KEY);
                }catch(err){
                    return this.authen_required(res, options)
                }
                let newSold = event.sold + req.body.quantity;
                if (newSold > event.ticket_total){
                    return this.sold_out(res, options)
                }else{
                await this.eventRepo.updateEvent(req.params.event_id,{sold: newSold})
                let ticketInfo ={
                    user_id: decoded.id,
                    event_id: req.params.event_id,
                    quantity: req.body.quantity
                }
                let newTicket = await this.ticketRepo.createTicket(ticketInfo);
                let options={data:{
                    payment_id:newTicket.id
                }}
                return this.success(res, options)
                }
            }
        }
    }

    async getPurchasedTicket(req, res){
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
            let event={}
            try{
                event = await this.eventRepo.getEventById(req.params.event_id);
            }catch(err){
                console.error(err);
                
                return this.event_not_exist(res, options);
            }
            if (!event){
                return this.event_not_exist(res, options);
            }else{
                let options = {
                    data:[]
                }
                let decoded={}
                try{
                    let token = req.headers.authentication;
                    decoded = await JWT.verify(token, APP_KEY);
                }catch(err){
                    return this.authen_required(res, options)
                }
                let query = {
                    "event_id": req.params.event_id,
                    "user_id": decoded.id
                }
                let result = await this.ticketRepo.getTicket(query);
                result.forEach((obj)=>{
                    options.data.push({"id": obj.id, "ticket_count":obj.quantity})
                })
                return this.success(res, options);
            }
        }
    }
}

module.exports = TicketController;