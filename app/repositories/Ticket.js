const TicketModel = require('../models/Ticket');

class TicketRepository{
    constructor(){

    }
    async createTicket(ticketInfo){
        try{
        let newTicket = new TicketModel(ticketInfo);
        const result = await newTicket.save();
            return result;
        }catch (e){
            console.log(e);
        }
    }
    async getTicket(query){
        try{
        const result = await TicketModel.find(query);
        return result
        }catch(e){
            console.log(e);
        }
    }
    async resetTicket(){
        try{
            await TicketModel.remove({});
        }catch(e){
            console.log(e);
        }
    }
}
module.exports = TicketRepository;