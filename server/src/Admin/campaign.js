const asyncHandler = require('express-async-handler');
const createcamp = require("../Models/createcamp");

const PendingCampaign = asyncHandler(async( req , res) =>{
   const pending = await createcamp.find({approved:false})
   res.json(pending)
})

const ApproveCampaign = asyncHandler( async(req , res) =>{
  const campaign = await createcamp.findById(req.params.id)

  if (!campaign) {
    res.status(400).json("campaign not found")
  }

  campaign.approved =true;
  await campaign.save();
  res.json({ message: "Campaign approved successfully" });
})


const Approvedcampaigns = asyncHandler(async(req,res) =>{
    const approved = await createcamp.find({approved:true})
    res.json(approved)
})

const Campaign  = asyncHandler(async (req, res) => {
  try {
    const campaign = await createcamp.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid campaign ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
})


module.exports = {PendingCampaign , ApproveCampaign , Approvedcampaigns , Campaign}