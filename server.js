require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Route imports
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/listings', listingRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/bookings', bookingRoutes);

// Root Route - Serve Frontend (Catch-all)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
}

module.exports = app;
