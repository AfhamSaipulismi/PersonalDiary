const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/diaries', require('./routes/diaryRoutes'));

// Simple route to check if the API is running
app.get('/', (req, res) => {
    res.send('Personal Diary API is running successfully on Vercel!');
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    // Only listen locally. Vercel handles this in production.
    if (process.env.NODE_ENV !== 'production') {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
};

startServer();

module.exports = app;
