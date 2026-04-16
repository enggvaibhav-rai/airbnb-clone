# Airbnb Clone - Full Stack Web Application

A premium, modern Airbnb clone built with Vanilla JavaScript, Node.js, Express, and MongoDB.

## Features
- **User Authentication**: Secure signup and login with JWT and password hashing (bcrypt).
- **Property Listings**: View all listings, filter by category, and see detailed property information.
- **MVC Architecture**: Clean and organized backend structure.
- **RESTful APIs**: Complete set of endpoints for Users, Listings, Bookings, and Reviews.
- **Responsive UI**: Beautiful, Airbnb-inspired design using native HTML/CSS/JS.
- **Database**: MongoDB with Mongoose for robust data modeling.

## Folder Structure
```text
backend/
├── config/             # Database connection configurations
├── controllers/        # Business logic for each route
├── middleware/         # Auth protection and custom middlewares
├── models/             # Mongoose schemas (User, Listing, Booking, Review)
├── public/             # Static frontend files (HTML, CSS, JS)
│   ├── css/            # Stylesheets
│   ├── js/             # Frontend logic
│   ├── index.html      # Home page
│   ├── property.html   # Property details
│   ├── login.html      # Login page
│   └── signup.html     # Signup page
├── routes/             # API route definitions
├── .env                # Environment variables
├── seeder.js           # Database seeding script
├── server.js           # Main entry point
└── package.json        # Dependencies and scripts
```

## Setup Guide

### 1. Prerequisites
- Node.js installed on your machine.
- MongoDB Atlas account or local MongoDB instance.

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory (already provided) and update your values:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Seed Database
Run the seeder script to populate sample listings:
```bash
node seeder.js
```

### 5. Start Server
Run the application locally:
```bash
npm run dev # or node server.js
```
Open `http://localhost:5000` in your browser.

## Sample API Endpoints
- `POST /api/v1/users/signup` - Register a new user
- `POST /api/v1/users/login` - Authenticate user
- `GET /api/v1/listings` - Get all property listings
- `GET /api/v1/listings/:id` - Get specific property details
- `POST /api/v1/bookings/checkout` - Book a property (Protected)
- `POST /api/v1/listings/:listingId/reviews` - Add a review (Protected)
