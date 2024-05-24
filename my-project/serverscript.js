const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const { createLogger, transports, format } = require('winston');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Winston logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'server.log' })
  ]
});

// Define custom log format
const customFormat = ':date[iso] - :method :url :status :response-time ms';

// Use Morgan middleware for logging
app.use(morgan(customFormat));

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/signup', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => logger.info('Connected to MongoDB'))
.catch(err => logger.error('Error connecting to MongoDB:', err));

// Helper function to validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// POST route for handling signup requests
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Check if the username is shorter than 3 characters
        if (username.length < 3) {
            return res.status(400).json({ error: 'Username must be at least 3 characters long' });
        }

        // Check if the email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Check if the password is longer than 6 characters
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success message
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        logger.error('Error signing up user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
