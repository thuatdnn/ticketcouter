const EventRepository = require('../repositories/Event');
const { validationResult } = require('express-validator/check');
const Responses = require('../responses');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
class EventController extends Responses{
    constructor(){
        super();
        this.eventRepo = new EventRepository;
    }
    
    async createEvent(req, res){
        let options = {};
        let decoded = {};
        let errors = validationResult(req);
        let token={}
        if (!errors.isEmpty()){
            if (errors.array()[0].param == 'authorization'){
                return this.authen_required(res, options)
            }else{
                
                try {
                    token = req.headers.authorization;
                    decoded = await JWT.verify(token, APP_KEY);
                }catch(error) {
                    return this.authen_required(res, options)
                }
                if (!decoded.admin){
                    return this.permission_denied(res, options)
                }
                options = {validations:[]};
                errors.array().forEach((obj)=>{
                    options.validations.push({'attribute': obj.param,'reason': obj.msg});
                });
                return this.validation_error(res, options);
            }
        }else{
            let newEvent  = await this.eventRepo.createEvent(req.body)
            let options={data:{
                event_id:newEvent.id
            }}
            return this.success(res, options)
            }
        }

    async getEventDetail(req, res){
        let options={}
        let isObjectId = mongoose.Types.ObjectId.isValid(req.params.event_id);
        if (!isObjectId){
            return this.event_not_exist(res, options)
        }
        let event  = await this.eventRepo.getEventById(req.params.event_id)
        if (!event){
            return this.event_not_exist(res, options)
        }else{
            let options = {
                data: {
                "id": event._id,
                "name": event.name,
                "banner": event.banner,
                "description": event.description,
                "ticket_total": event.ticket_total,
                "ticket_price": event.ticket_price,
                "start_date": event.start_date,
                "end_date":event.end_date,
                "ticket_start_date": event.ticket_start_date,
                "ticket_end_date": event.ticket_end_date
            }
            }
            return this.success(res, options)
        }
    }
    async getEventList(req, res){
        let limit = +req.query.limit;
        let page = +req.query.page;
        let options = {data:[]}
        if(limit < 0){
            let events = await this.eventRepo.getEventList(0,0);
            if (events.length>0){
                events.forEach((obj)=>{
                    options.data.push({
                        "id": obj._id,
                        "name": obj.name,
                        "banner": obj.banner,
                        "description": obj.description,
                        "ticket_total": obj.ticket_total,
                        "ticket_price": obj.ticket_price,
                        "start_date": obj.start_date,
                        "end_date": obj.end_date,
                        "ticket_start_date": obj.ticket_start_date,
                        "ticket_end_date": obj.ticket_end_date
                    })
                })
            }
            return this.success(res, options)
        }else{
            let events  = await this.eventRepo.getEventList(limit, page);
            if (events.length>0){
                events.forEach((obj)=>{
                    options.data.push({
                        "id": obj._id,
                        "name": obj.name,
                        "banner": obj.banner,
                        "description": obj.description,
                        "ticket_total": obj.ticket_total,
                        "ticket_price": obj.ticket_price,
                        "start_date": obj.start_date,
                        "end_date": obj.end_date,
                        "ticket_start_date": obj.ticket_start_date,
                        "ticket_end_date": obj.ticket_end_date
                    })
                })
            }
            return this.success(res, options)
        }
    }

    async updateEvent (req, res){
        let options = {};
        let decoded={}
        let errors = validationResult(req);
        let token={}
        if (!errors.isEmpty()){
            if (errors.array()[0].param == 'authorization'){
                return this.authen_required(res, options)
            }else{
                try{
                    token = req.headers.authorization;
                    decoded = await JWT.verify(token, APP_KEY);
                }catch(err){
                    return this.authen_required(res, options)
                }
                if (!decoded.admin){
                    return this.permission_denied(res, options)
                }
                options = {validations:[]};
                errors.array().forEach((obj)=>{
                    options.validations.push({'attribute': obj.param,'reason': obj.msg});
                });
                return this.validation_error(res, options);
            }
        }else{
                let isObjectId = mongoose.Types.ObjectId.isValid(req.params.event_id)
                if (!isObjectId){
                    return this.event_not_exist(res, options)
                }
                let event = await this.eventRepo.updateEvent(req.params.event_id,req.body)
                if (!event){
                    this.event_not_exist(res, options)
                }else{
                    this.success(res, options)
                }
            }
    }

    async deleteEvent (req, res){
        let options = {};

        let errors = validationResult(req);

        if (!errors.isEmpty()){
            let options = {};
            if (errors.array()[0].param == 'authorization'){
                return this.authen_required(res, options)
            }
        }else{
            let decoded={}
            try{
                let token = req.headers.authorization;
                decoded = await JWT.verify(token, APP_KEY);
            }catch(err){
                return this.authen_required(res, options)
            }
            if (!decoded.admin){
                return this.permission_denied(res, options)
            }
            else{
                let isObjectId = mongoose.Types.ObjectId.isValid(req.params.event_id)
                if (!isObjectId){
                    return this.event_not_exist(res, options)
                }
                let event = await this.eventRepo.deleteEvent(req.params.event_id,req.body)
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
