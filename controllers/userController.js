const User = require('../models/User');

exports.addToWishlist = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $addToSet: { wishlist: req.params.listingId } },
            { new: true }
        );
        res.status(200).json({ status: 'success', data: { user } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { wishlist: req.params.listingId } },
            { new: true }
        );
        res.status(200).json({ status: 'success', data: { user } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('wishlist');
        res.status(200).json({ status: 'success', data: { wishlist: user.wishlist } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
