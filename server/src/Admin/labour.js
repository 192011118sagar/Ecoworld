const Person = require('../Models/labour');
const asyncHandler = require('express-async-handler');

// Create a new person
const labour = asyncHandler(async (req, res) => {
  const { name, email, number } = req.body;

  try {
    const person = new Person({ name, email, number});
    await person.save();
    res.status(201).json(person);
  } catch (error) {
    res.status(400).json({ message: 'Error creating person' });
  }
});

module.exports = labour;
