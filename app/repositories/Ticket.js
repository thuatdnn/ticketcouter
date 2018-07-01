const TicketModel = require('../models/Ticket');

class TicketRepository{
    constructor(){

    }
    async createTicket(event_id, user_id, quantity){
        try{
        let newTicket = new TicketModel(user_id, event_id, quantity);
        const result = await newTicket.save();
            return result;
        }catch (e){
            console.log(e);
        }
    }
}
module.exports = TicketRepository;