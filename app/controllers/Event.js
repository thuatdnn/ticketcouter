const EventRepository = require('../repositories/Event');
const { validationResult } = require('express-validator/check');
const Responses = require('../responses');
const JWT = require('jsonwebtoken');

class EventController extends Responses{
    constructor(){
        super();
        this.eventRepo = new EventRepository;
    }

    async createEvent(req, res){
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
            let token = req.headers.authentication;
            var decoded = await JWT.verify(token, APP_KEY);
            if (!decoded.admin){
                return this.permission_denied(res, options)
            }
            else{
                let newEvent  = await this.eventRepo.createEvent(req.body)
                let options={data:{
                    event_id:newEvent.id
                }}
                return this.success(res, options)
            }
        }
    }

    async getEventDetail(req, res){
        let event  = await this.eventRepo.getEventById(req.params.id)
        if (!event){
            this.event_not_exist(res, options)
        }else{
            let options = {
                data: event
            }
            this.success(res, options)
        }
    }
    async getEventList(req, res){
        let limit = +req.query.limit;
        let page = +req.query.page;
        let options={}
        if(limit < 0){
            let event = await this.eventRepo.getEventList(0,0);
            options = {data:event}
            return this.success(res, options)
        }else{
            let event  = await this.eventRepo.getEventList(limit, page);
            options = {data:event}
            return this.success(res, options)
        }
    }

    async updateEvent (req, res){
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
            let token = req.headers.authentication;
            let decoded = await JWT.verify(token, APP_KEY);
            if (!decoded.admin){
                return this.permission_denied(res, options)
            }
            else{
                let event = await this.eventRepo.updateEvent(req.params.id,req.body)
                if (!event){
                    this.event_not_exist(res, options)
                }else{
                    this.success(res, options)
                }
            }
        }
    }

    async deleteEvent (req, res){
        let options = {};

        let errors = validationResult(req);

        if (!errors.isEmpty()){
            let options = {};
            if (errors.array()[0].param == 'authentication'){
                return this.authen_required(res, options)
            }
        }else{
            let token = req.headers.authentication;
            let decoded = await JWT.verify(token, APP_KEY);
            
            if (!decoded.admin){
                return this.permission_denied(res, options)
            }
            else{
                let event = await this.eventRepo.deleteEvent(req.params.id,req.body)
                if (!event){
                    this.event_not_exist(res, options)
                }else{
                    this.success(res, options)
                }
            }
        }
    }
}

module.exports = EventController;
