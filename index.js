const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Fix: CORS Configuration
app.use(cors({
    origin: ['http://localhost:5173', 'https://book-app-frontend-3uyo.vercel.app'], // Removed trailing slash
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Keep only if using cookies/authentication
}));

app.use(express.json());

// ✅ Define Routes BEFORE MongoDB connection
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');
const adminRoutes = require('./src/stats/admin.stats');

app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Fix: Root Route should be at the end
app.get('/', (req, res) => {
    res.send('Book server is running!');
});

// ✅ Fix: Proper MongoDB Connection
async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit process if DB connection fails
    }
}

// ✅ Start Server only after MongoDB is connected
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
