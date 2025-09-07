const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { verifyToken, isAdmin } = require('./middleware/auth-middleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  credentials: true
}));

app.use(express.json()); 

const CategoryRouter = require('./routes/category');
const BrandRouter = require('./routes/brand');
const ProductRouter = require('./routes/product');
const OrderRouter = require('./routes/order');
const CustomerRouter = require('./routes/customer');
const AuthRouter = require('./routes/auth');

app.use("/category", verifyToken, isAdmin, CategoryRouter);
app.use("/brand", verifyToken, isAdmin, BrandRouter);
app.use("/product", verifyToken, isAdmin, ProductRouter);
app.use("/order", verifyToken, isAdmin, OrderRouter);

app.use("/customer", verifyToken, CustomerRouter);

app.use("/auth", AuthRouter);

// async function connectDB() {
//   await mongoose.connect("mongodb://localhost:27017", {
//     dbName: "Ecom-store-db",
//   });
// }

async function connectDB() {
  try {
    const dbURI = process.env.MONGODB_URI;
    if (!dbURI) {
      console.error("MONGODB_URI not found in .env");
      process.exit(1);
    }
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectDB().catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
