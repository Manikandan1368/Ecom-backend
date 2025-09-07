const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    shortDescription: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },  
    // images: {
    //     type: String,
    //     required: true
    // },
    images: [
    {
      image: { type: String, required: true }
    }
  ],
  reviews: [
    {
      user: { type: String },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],
      categoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categories' }], 
      brandId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'brands' }], 
      isFeatured:Boolean,
      isNewProduct:Boolean
});
const Product = mongoose.model('products', productSchema);
module.exports = Product;