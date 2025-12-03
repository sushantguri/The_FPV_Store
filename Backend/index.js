const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();




const app = express();
const prisma = require('./prismaClient.js');
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const tutorialRoutes = require('./routes/tutorialRoutes.js');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tutorials', tutorialRoutes);

const { createOrder, getUserOrders } = require('./controllers/orderController.js');
const { submitContactForm } = require('./controllers/contactController.js');
const { protect } = require('./middleware/authMiddleware.js');

app.post('/api/orders', protect, createOrder);
app.get('/api/orders', protect, getUserOrders);
app.post('/api/contact', submitContactForm);

// Basic Route
app.get('/', (req, res) => {
  res.send('FPV Haven API is running');
});

const { errorHandler } = require('./middleware/errorMiddleware.js');

app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
