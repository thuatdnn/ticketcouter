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
},{
    versionKey: false // You should be aware of the outcome after set to false
})

module.exports = mongoose.model('TicketModel', TicketSchema);