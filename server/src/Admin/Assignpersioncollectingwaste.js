const asyncHandler = require('express-async-handler');
const Person = require('../Models/labour');
const wastecollectschudule = require("../Models/wastecollectingschudule")


const GetSchudule = asyncHandler(async(req,res) =>{
    const schudule = await wastecollectschudule.find()
    res.status(200).json("waste collecting schudule", schudule)
})


const AssignSchudule = asyncHandler(async(req,res) =>{
     const { id } = req.params;
     const { status, assignedTo } = req.body;

  const schudule = await wastecollectschudule.findById(id);

 if (!schudule) {
    return res.status(404).json({ message: "Schudule not found" });
  }

  if (assignedTo) {
    const person = await Person.findById(assignedTo);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    schudule.assignedTo = assignedTo;
  }

  schudule.status = status || schudule.status;
  await schudule.save();
  res.status(200).json(schudule);
});



module.exports = {GetSchudule , AssignSchudule}