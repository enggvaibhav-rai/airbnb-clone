const express = require('express');
const listingController = require('../controllers/listingController');
const authMiddleware = require('../middleware/authMiddleware');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// Re-route to review router
router.use('/:listingId/reviews', reviewRouter);

router.route('/')
    .get(listingController.getAllListings)
    .post(authMiddleware.protect, authMiddleware.restrictTo('admin', 'user'), listingController.createListing);

router.route('/:id')
    .get(listingController.getListing)
    .patch(authMiddleware.protect, listingController.updateListing)
    .delete(authMiddleware.protect, authMiddleware.restrictTo('admin'), listingController.deleteListing);

module.exports = router;
