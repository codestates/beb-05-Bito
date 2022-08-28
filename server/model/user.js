const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required: true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    profilePicture : {
        type : String,
        default : "",
    },
    followers : {
        type : Array,
        default : [],
    },
    followings : {
        type : Array,
        default : [],
    },
    address : {
        type : String,
        default : '0'
    },
    tokenAmount : {
        type : Number,
        default : 0,
    },
    ethAmount : {
        type : Number,
        default : 0,
    },
}, {timestamps : true})

module.exports = mongoose.model("User", UserSchema);