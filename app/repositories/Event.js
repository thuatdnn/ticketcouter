const EventModel = require('../models/Event');

class EventRepository{
    constructor(){

    }

    async createEvent(body){
        try {
            let newEvent = new EventModel(body);
            const result = await newEvent.save();
            return result;
        }catch (e){
            console.log(e);
        }
    }
    async getEventById(id) {
        try{
             let event =   await EventModel.findById(id);
             return event
        }catch(e){
            console.log(e);
        }
    }
    async updateEvent(id, body){
        try{
            let event  = await EventModel.findByIdAndUpdate(id, body)
            return event
        }catch(e){
            console.log(e);
        }
    }

    async deleteEvent(id, body){
        try{
            let event  = await EventModel.findByIdAndRemove(id, body)
            return event
        }catch(e){
            console.log(e);
        }
    }

    async getEventList(limit, page){
        try{
            let event  = await EventModel.find({}).limit(limit).skip(page*limit);
            return event
        }catch(e){
            console.log(e);
        }
    }
}

module.exports = EventRepository;