const eventModel = require('../models/Event');

class EventRepository{
    constructor(){

    }
    async createEvent(body){
        try {
            let newEvent = new eventModel(body);
            const result = await newEvent.save();
            return result;
        }catch (e){
            console.log(e);
        }
    }
}

module.exports = EventRepository;