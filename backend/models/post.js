const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    body:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: false
    },
    photo:{
        type:String,
        required: true
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        default:"USER"
    }],
    comments:[{
        comment:{type:String,required:true},
        postedBy:{type:mongoose.Schema.Types.ObjectId,ref:"USER"}
    }],
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"  
    }
});

mongoose.model('POST', postSchema);