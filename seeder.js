require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('./models/Listing');
const User = require('./models/User');

const sampleListings = [
    {
        title: "Modern Beachfront Villa",
        description: "A stunning modern villa located right on the beach with private pool.",
        location: "Malibu, California",
        price: 450,
        images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
        category: "Villa",
        guests: 6,
        bedrooms: 3,
        bathrooms: 2,
        amenities: ["Wifi", "Kitchen", "Pool", "Free Parking"],
        ratingsAverage: 4.8
    },
    {
        title: "Cozy Mountain Cabin",
        description: "Escape to the mountains in this handcrafted log cabin.",
        location: "Aspen, Colorado",
        price: 250,
        images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
        category: "Cabin",
        guests: 4,
        bedrooms: 2,
        bathrooms: 1,
        amenities: ["Fireplace", "Wifi", "Kitchen"],
        ratingsAverage: 4.9
    },
    {
        title: "Luxury Penthouse in NYC",
        description: "Panoramic views of the Manhattan skyline.",
        location: "New York City, NY",
        price: 800,
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
        category: "Apartment",
        guests: 2,
        bedrooms: 1,
        bathrooms: 1.5,
        amenities: ["Gym", "Wifi", "Elevator", "Air conditioning"],
        ratingsAverage: 4.7
    },
    {
        title: "Charming Country House",
        description: "Classic English countryside living.",
        location: "Cotswolds, UK",
        price: 180,
        images: ["https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
        category: "House",
        guests: 5,
        bedrooms: 3,
        bathrooms: 2,
        amenities: ["Garden", "Wifi", "Washer"],
        ratingsAverage: 4.6
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/airbnb_clone');
        console.log('Connected to DB...');

        await Listing.deleteMany({});
        await User.deleteMany({});

        // Create a mock user for the host
        const user = await User.create({
            name: "Admin Host",
            email: "admin@airbnb.com",
            password: "Zxl729@#",
            role: "admin"
        });

        const listingsWithHost = sampleListings.map(listing => ({
            ...listing,
            host: user._id
        }));

        await Listing.insertMany(listingsWithHost);

        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
