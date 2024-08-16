const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../Models/Register")
const dotenv = require("dotenv").config()


const RegisterUser = asyncHandler(async (req, res) => {
    const { name, email, contactnumber , password } = req.body;
    try {
        // Check if username, email, and password are provided
        if (!name || !email || !contactnumber|| !password) {
            return res.status(400).json({ message: "Please provide all mandatory fields." });
        }

        // Check     if the user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already registered." });
        }
        

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = await User.create({
            name,
            email,
            contactnumber,
            password: hashedPassword // Store the hashed password in the database
        });

        // Respond with success message and user data
        res.status(201).json({
            message: "User registered successfully.",
            user: {
                _id: newUser._id,
                name: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});




const CreateAdmin = asyncHandler(async (req, res) => {
    try {
        // Check if default admin already exists
        const existingAdmin = await User.findOne({ isAdmin: true });
        if (existingAdmin) {
            return res.status(400).json({ message: "Default admin already exists." });
        }

        // Hash the default admin password
        const defaultAdminPassword = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);

        // Create the default admin user
        const defaultAdmin = await User.create({
            name: process.env.DEFAULT_ADMIN_NAME,
            email: process.env.DEFAULT_ADMIN_EMAIL,
            contactnumber: process.env.DEFAULT_ADMIN_CONTACT,
            password: defaultAdminPassword,
            isAdmin: true
        });

        res.status(201).json({ message: "Default admin created successfully.", defaultAdmin });
    } catch (error) {
        console.error("Error creating default admin:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});






module.exports = {RegisterUser , CreateAdmin};