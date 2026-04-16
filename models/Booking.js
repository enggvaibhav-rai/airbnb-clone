const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    listing: {
        type: mongoose.Schema.ObjectId,
        ref: 'Listing',
        required: [true, 'Booking must belong to a listing']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to a user']
    },
    startDate: {
        type: Date,
        required: [true, 'Booking must have a start date']
    },
    endDate: {
        type: Date,
        required: [true, 'Booking must have an end date']
    },
    price: {
        type: Number,
        required: [true, 'Booking must have a price']
    },
    paid: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
