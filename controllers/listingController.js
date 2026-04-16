const Listing = require('../models/Listing');

exports.getAllListings = async (req, res) => {
    try {
        // Search & Filter
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // Advanced filtering (for price ranges)
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Listing.find(JSON.parse(queryStr));

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 12;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        const listings = await query;

        res.status(200).json({
            status: 'success',
            results: listings.length,
            data: { listings }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate('reviews').populate('host', 'name email');
        if (!listing) {
            return res.status(404).json({ status: 'fail', message: 'No listing found with that ID' });
        }
        res.status(200).json({ status: 'success', data: { listing } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.createListing = async (req, res) => {
    try {
        req.body.host = req.user.id;
        const newListing = await Listing.create(req.body);
        res.status(201).json({ status: 'success', data: { listing: newListing } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.updateListing = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!listing) {
            return res.status(404).json({ status: 'fail', message: 'No listing found with that ID' });
        }
        res.status(200).json({ status: 'success', data: { listing } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndDelete(req.params.id);
        if (!listing) {
            return res.status(404).json({ status: 'fail', message: 'No listing found with that ID' });
        }
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
