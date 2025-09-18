const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { verifyToken, isAdmin } = require('./middleware/auth-middleware');

const app = express();
const port = process.env.PORT || 3000;

// app.use(cors({
//   origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
//   credentials: true
// }));
app.use(cors({
  origin: [
    'https://heroic-lolly-e95ead.netlify.app', 
    'http://localhost:4200'                    
  ],
  credentials: true
}));

app.use(express.json()); 

const CategoryRouter = require('./routes/category');
const BrandRouter = require('./routes/brand');
const ProductRouter = require('./routes/product');
const OrderRouter = require('./routes/order');
const CustomerRouter = require('./routes/customer');
const AuthRouter = require('./routes/auth');

app.use("/category", CategoryRouter);
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
await mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
}

connectDB().catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.get('/', (req, res) => {
  res.send('API is working');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
