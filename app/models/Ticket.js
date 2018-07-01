const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TicketSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "UserModel"
    },
    event_id:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "EventModel"
    },
    quantity:{
        type: Number,
        required: true,
        min: 1
    }
})

module.exports = mongoose.model('TicketModel', TicketSchema);