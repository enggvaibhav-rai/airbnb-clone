const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    location: {
        type: String,
        required: [true, 'Please provide a location']
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price']
    },
    images: [{
        type: String,
        required: true
    }],
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: ['Apartment', 'House', 'Villa', 'Cabin', 'Studio']
    },
    guests: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    amenities: [String],
    host: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual populate for reviews
listingSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'listing',
    localField: '_id'
});

module.exports = mongoose.model('Listing', listingSchema);
