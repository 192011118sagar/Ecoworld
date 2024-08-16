const mongoose = require('mongoose');


const GarbageSchema = new mongoose.Schema({
    lat: Number,
    lng: Number,
    description: String
});


const Garbage = mongoose.model('Garbage', GarbageSchema);

module.exports = Garbage;