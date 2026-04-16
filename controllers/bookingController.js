const Booking = require('../models/Booking');
const Listing = require('../models/Listing');

exports.createBooking = async (req, res) => {
    try {
        const { listingId, startDate, endDate, price } = req.body;
        
        const booking = await Booking.create({
            listing: listingId,
            user: req.user.id,
            startDate,
            endDate,
            price
        });

        res.status(201).json({
            status: 'success',
            data: { booking }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('listing');
        res.status(200).json({
            status: 'success',
            results: bookings.length,
            data: { bookings }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
