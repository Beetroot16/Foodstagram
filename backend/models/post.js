const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    body:{
        type: String,
        required: true
    },
    photo:{
        type:String,
        required: true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"  
    }
});

mongoose.model('POST', postSchema);