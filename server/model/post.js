const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
    },
    userName:{
        type: String
    },
    comment : {
        type : String,
        max : 1200,
    },
    imgUrl : {
        type : String,
    },
    imgName : {
        type : String,
    },
    likes : {
        type : Array,
        default : [],
    }
}, {timestamps : true})

module.exports = mongoose.model("Post", PostSchema);