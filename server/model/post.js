const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
    },
    comment : {
        type : String,
        max : 1200,
    },
    img : {
        type : String,
    },
    likes : {
        type : Array,
        default : [],
    }
}, {timestamps : true})

module.exports = mongoose.model("Post", PostSchema);