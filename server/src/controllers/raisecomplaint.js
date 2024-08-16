const asyncHandler = require('express-async-handler');
const createcamp = require("../Models/createcamp");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {                                                             
        cb(null, uploadDir); // Specify the upload directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Specify the file naming convention
    }
});

const upload = multer({ storage: storage });



const createcampaign = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        phoneNumber,
        eventName,
        organizerName,
        dateOfBirth,
        eventVenue,
        howToReachEventVenue,
        eventDescription
    } = req.body;

    try {
        // Check if all required fields are provided
        if (!name || !email || !phoneNumber || !eventName || !organizerName || !dateOfBirth || !eventVenue || !howToReachEventVenue || !req.file.filename || !eventDescription) {
            return res.status(400).json({ message: "Please provide all mandatory fields" });
        }

        // Create a new campaign
        const created = await createcamp.create({
            name,
            email,
            phoneNumber,
            eventName,
            organizerName,
            dateOfBirth,
            eventVenue,
            howToReachEventVenue,
            eventimage: req.file.filename,
            eventDescription
        });

        // Send response with the created campaign details
        res.status(201).json({
            message: "Campaign created successfully",
            campaign: {
                _id: created._id,
                name: created.name,
                email: created.email,
                phoneNumber: created.phoneNumber,
                eventName: created.eventName,
                organizerName: created.organizerName,
                dateOfBirth: created.dateOfBirth,
                eventVenue: created.eventVenue,
                howToReachEventVenue: created.howToReachEventVenue,
                eventimage: created.eventimage,
                eventDescription: created.eventDescription
            }
        });
    } catch (error) {
        console.error("Error creating campaign:", error);
        res.status(500).json({ message: "Error creating campaign", error: error.message });
    }
});

module.exports = { createcampaign , upload };
