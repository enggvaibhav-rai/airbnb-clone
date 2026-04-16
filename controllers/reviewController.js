const Review = require('../models/Review');

exports.createReview = async (req, res) => {
    try {
        if (!req.body.listing) req.body.listing = req.params.listingId;
        if (!req.body.user) req.body.user = req.user.id;

        const newReview = await Review.create(req.body);

        res.status(201).json({
            status: 'success',
            data: { review: newReview }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        let filter = {};
        if (req.params.listingId) filter = { listing: req.params.listingId };

        const reviews = await Review.find(filter);

        res.status(200).json({
            status: 'success',
            results: reviews.length,
            data: { reviews }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
