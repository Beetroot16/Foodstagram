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
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        default:"USER"
    }],
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"  
    }
});

mongoose.model('POST', postSchema);