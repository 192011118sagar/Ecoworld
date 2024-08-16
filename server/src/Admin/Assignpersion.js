const asyncHandler = require('express-async-handler');
const raisecomplaint = require('../Models/raisecomplaint');
const Person = require('../Models/labour');

const GetComplaint = asyncHandler(async (req, res) => {
    const complaints = await raisecomplaint.find();
    res.status(200).json(complaints);
})


const updateComplaint = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, assignedTo } = req.body;

  const complaint = await raisecomplaint.findById(id);

  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  if (assignedTo) {
    const person = await Person.findById(assignedTo);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    complaint.assignedTo = assignedTo;
  }

  complaint.status = status || complaint.status;
  await complaint.save();
  res.status(200).json(complaint);
});


const getlabours = asyncHandler(async(req,res) =>{
    try {
        const labour = await Person.find()
        res.status(200).json(labour);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
})


// const 


module.exports = {updateComplaint , GetComplaint ,getlabours};
