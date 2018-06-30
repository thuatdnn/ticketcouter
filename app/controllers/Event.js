const eventRepo = require('../repositories/Event');
const { validationResult } = require('express-validator/check');
const Responses = require('../responses');

class EventController extends Responses{
    constructor(){
        super()
    }

    async createEvent(){
        let options = {};

        let errors = validationResult(req);

        if (!errors.isEmpty()){
            let options = {
                validations: []
            };
            errors.array().forEach((obj)=>{
                options.validations.push({'attribute': obj.param,'reason': obj.msg});
            });
            return this.validation_error(res, options);
        }else{
            
        }
    }
}
