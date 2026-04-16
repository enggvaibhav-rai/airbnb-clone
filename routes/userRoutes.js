const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/me', authMiddleware.protect, authController.getMe);

// Wishlist
router.use(authMiddleware.protect);
const userController = require('../controllers/userController');
router.get('/wishlist', userController.getWishlist);
router.post('/wishlist/:listingId', userController.addToWishlist);
router.delete('/wishlist/:listingId', userController.removeFromWishlist);

module.exports = router;
