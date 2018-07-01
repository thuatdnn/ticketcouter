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
            console.log(token);
            let decoded = await JWT.verify(token, APP_KEY);
            if (!decoded.admin){
                return this.permission_denied(res, options)
            }
            else{
                this.eventRepo.createEvent(req.body)
                return this.success(res, options)
            }
            
        }
    }
}

module.exports = EventController;
