const eventModel = require('../models/Event');

class eventRepo{
    constructor(){

    }
    async create_event(body){
        try {
            let newEvent = new eventModel(body);
            const result = await newEvent.save();
            return result;
        }catch (e){
            console.log(e);
        }
    }
}