const Product=require('../db/product');
const mongoose = require('mongoose');

async function addProduct(model){
    const product = new Product({
        ...model
    });
    await product.save();
    return product;
}

async function getProduct() {
    let products = await Product.find();
    return products.map((product) => product.toObject());
}

async function getProductById(id) {
    let product = await Product.findById(id);
    return product.toObject();
}

async function updateProduct(id, model) {
    const product = await Product.findByIdAndUpdate({ _id: id }, model, { new: true }); 
    return product.toObject();
}

async function deleteProduct(id) {
  const deleted = await Product.findByIdAndDelete(id);
  return deleted ? deleted.toObject() : null;
}

async function getNewProducts(){
    let newProducts = await Product.find({
        isNewProduct: true,
    });
 return newProducts.map((product) => product.toObject());
}

async function getFeaturedProducts(){
    let featuredProducts = await Product.find({
        isFeatured: true,
    });
 return featuredProducts.map((product) => product.toObject());
}

async function getProductForListing(searchItem, categoryId, page, pageSize, sortBy, sortOrder, branchId) {
    if (!sortBy) sortBy = 'price';
    if (!sortOrder) sortOrder = -1;

    let queryFilter = {};

    if (searchItem) {
        queryFilter.$or = [
            { name: { $regex: searchItem, $options: 'i' } },
            { shortDescription: { $regex: searchItem, $options: 'i' } }
        ];
    }

    // if (categoryId) {
    //     queryFilter.categoryId = categoryId;
    // }
     if (categoryId) {
    const categoryIds = categoryId.split(',').filter(Boolean);
    if (categoryIds.length > 1) {
      queryFilter.categoryId = { $in: categoryIds };
    } else {
      queryFilter.categoryId = categoryIds[0];
    }
  }
if (branchId) {
    try {
      const trimmedBranchId = branchId.trim();
      if (mongoose.Types.ObjectId.isValid(trimmedBranchId)) {
        queryFilter.brandId = { $in: [new mongoose.Types.ObjectId(trimmedBranchId)] };
      } else {
        console.warn('Invalid branchId format:', branchId);
      }
    } catch (err) {
      console.warn('Exception when converting branchId:', err);
    }
  }
  const totalCount = await Product.countDocuments(queryFilter);
    const products = await Product.find(queryFilter)
        .sort({ [sortBy]: +sortOrder })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

    return {
    products:products.map((product) => product.toObject()),
    totalCount
    };
}




module.exports = { addProduct, getProduct, getProductById, updateProduct, deleteProduct, getNewProducts, getFeaturedProducts, getProductForListing};