const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true,
        max: 20,
        trim: true
    },
    familyname:{
        type: String,
        required: true,
        max: 20,
        trim: true
    },
    admin:{
        type: Boolean,
        default: false
    }
});

//Pre-hook, hash password

module.exports = mongoose.model('UserModel', UserSchema);