const mongoose = require("mongoose")




const raisecomplaintSchema = new mongoose.Schema({
    Name:{
        type:String,
        required: true
    },
    Email:{
        type:String,
        required: true
    },
    PhoneNumber:{
        type:Number,
        required: true
    },
    Age:{
        type:Number,
        required: true
    },
    Date:{
        type:String,
        required: true
    }   ,
    ComplaintIssueName:{
        type:String,
        required: true
    },
    ComplaintOn:{
        type:String,
        required: true
    },
    Address:{
        type:String,
        required: true
    },
    Reasonforraisingcomplaint:{
        type:String,
        required: true
    },
    UploadImage:{
        type:String,
        required: true
    },
    status: { type: String, enum: ['Pending', 'Ongoing', 'Completed'], default: 'Pending' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', default: null }
})


const raisecomplaint = mongoose.model("raisecomplaint" ,raisecomplaintSchema)

module.exports = raisecomplaint;
