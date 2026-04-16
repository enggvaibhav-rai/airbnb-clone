const mongoose = require('mongoose');
const Listing = require('./Listing');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review cannot be empty']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    listing: {
        type: mongoose.Schema.ObjectId,
        ref: 'Listing',
        required: [true, 'Review must belong to a listing']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Avoid duplicate reviews from same user for same listing
reviewSchema.index({ listing: 1, user: 1 }, { unique: true });

// Static method to calculate average rating
reviewSchema.statics.calcAverageRatings = async function(listingId) {
    const stats = await this.aggregate([
        {
            $match: { listing: listingId }
        },
        {
            $group: {
                _id: '$listing',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);

    if (stats.length > 0) {
        await Listing.findByIdAndUpdate(listingId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        });
    } else {
        await Listing.findByIdAndUpdate(listingId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
        });
    }
};

reviewSchema.post('save', function() {
    this.constructor.calcAverageRatings(this.listing);
});

module.exports = mongoose.model('Review', reviewSchema);
