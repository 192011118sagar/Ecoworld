const asyncHandler = require('express-async-handler');  
const raisecomplaint = require("../Models/raisecomplaint");


const getcomplaints =  asyncHandler(async (req, res) => {
  const { status } = req.params;

  try {
    const complaints = await raisecomplaint.find({ status }).populate('assignedTo');
    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching complaints' });
  }
})


  module.exports = getcomplaints;
