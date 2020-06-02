const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic : {
        type: String,
        default : "https://res.cloudinary.com/insta-images/image/upload/v1590936562/defaulr-profile_g74b0h.png"
    },
    followers: [{type:ObjectId, ref:"User"}],
    following: [{type:ObjectId, ref:"User"}]
})

mongoose.model("User", userSchema);