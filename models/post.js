const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    likes: [{type: ObjectId, ref:"User"}],
    comments: [{
        text: String,
        postedBy: {type:ObjectId, ref:"User"}
    }],
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

mongoose.model("Post", postSchema);