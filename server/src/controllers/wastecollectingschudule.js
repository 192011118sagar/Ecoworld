const wastecollectingschudule = require("../Models/wastecollectingschudule")
const asyncHandler = require('express-async-handler');



const wastecollectschudule = asyncHandler(async(req,res) =>{
    const {
        ward,
        landmark,
        pickupdate,
        pickuptime
    } = req.body

try {
    if (!ward || !landmark || !pickupdate || !pickuptime) {
        res.send("please fill all mandatory field")
    }
    
    const schudule = await wastecollectingschudule.create({
        ward,
        landmark,
        pickupdate,
        pickuptime
    })
    
    res.status(200).json(`registered schudule` , schudule)
} catch (error) {
    return res.status(500).json({ message: "Error creating schudule", error: error.message });
    
}
})


module.exports= wastecollectschudule;