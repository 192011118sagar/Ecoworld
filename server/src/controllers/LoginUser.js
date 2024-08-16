const asyncHandler = require('express-async-handler');  
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../Models/Register");
const dotenv = require("dotenv").config();

const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password." });
        }

        // Check if the user with the provided email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send({ message: "Invalid email or password." });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid email or password." });
        }

        // Determine if the user is an admin
        const isAdmin = user.isAdmin;

        // Create a JWT token for the user
        const token = jwt.sign(
            { userId: user._id, email: user.email, isAdmin: isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Send appropriate response based on user role
        if (isAdmin) {
            res.status(200).json({ message: "Admin login successful.", token , isAdmin });
        } else {
            res.status(200).json({ message: "User login successful.", token });
        }

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).send({ message: "Internal server error." });
    }
});

module.exports = LoginUser;
