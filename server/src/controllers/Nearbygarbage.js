const asyncHandler = require('express-async-handler');  
const Garbage = require("../Models/nearbygarbage");



const getgarbage = asyncHandler(async(req, res) => {
    const garbage = await Garbage.find();
    res.json(garbage);
})


const postgarbage = asyncHandler(async(req, res) => {
    const { lat, lng, description } = req.body;
    const newGarbage = new Garbage({ lat, lng, description });
    await newGarbage.save();
    res.json(newGarbage);
})

module.exports = {getgarbage , postgarbage}