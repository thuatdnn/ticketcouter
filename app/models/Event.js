const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    banner:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    ticket_total:{
        type: Number,
        required: true
    },
    ticket_price:{
        type: Number,
        required: true
    },
    start_date:{
        type: String,
        required: true
    },
    end_date:{
        type: String,
        required: true
    },
    ticket_start_date:{
        type: String,
        required: true
    },
    ticket_end_date:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('EventModel', EventSchema);
