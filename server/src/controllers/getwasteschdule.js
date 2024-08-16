const asyncHandler = require('express-async-handler');  
const wastecollectschudule = require("../Models/wastecollectingschudule")


const getwastecollect=  asyncHandler(async (req, res) => {
    const { status } = req.params;
  
    try {
      const schudule = await wastecollectschudule.find({ status }).populate('assignedTo');
      res.status(200).json(schudule);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching collect waste' });
    }
  })


  module.exports = getwastecollect;