const mongoose = require('mongoose');

const createcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },

    eventName:{
        type: String,
        required: true
    },

    organizerName:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    eventVenue:{
        type: String,
        required: true
    },
    howToReachEventVenue:{
        type: String,
        required: true
    },
    eventimage:{
        type: String,
        required: true
    },
    eventDescription:{
        type: String,
        required: true
    },
approved :{
    type :Boolean,
    default : false
}
})


const createcamp = mongoose.model("createcamp" , createcampSchema)

module.exports = createcamp;