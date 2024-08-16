const mongoose = require("mongoose")



const wastecollectingSchuduleSchema = new mongoose.Schema({
    ward:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
        required:true
    },
    pickupdate:{
        type:Date,
        required:true
    },
    pickuptime:{
        type:Number,
        required:true
    },
    status: { type: String, enum: ['Pending','Completed'], default: 'Pending' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', default: null }
})



const wastecollectingschudule= mongoose.model("wastecollectingschudule" , wastecollectingSchuduleSchema )

module.exports = wastecollectingschudule;