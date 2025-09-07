const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../db/product');
const { addProduct, getProduct, getProductById, updateProduct, deleteProduct } = require('../handlers/product-handler');

router.post('/', async (req, res) => {
    const files = req.files;
    const body = req.body;

    try {
        const model1 = req.body;        
        let product = await addProduct(model1);
        res.send({ message: "Product created successfully", product: product.toObject() });
    } catch (err) {
        res.status(500).send({ error: 'Failed to save product' });
    }
});

router.get('/', async (req, res) => {
    try {
        let products = await getProduct();
        res.send({ message: "Products retrieved successfully", products });
    } catch (err) {
        res.status(500).send({ error: 'Failed to retrieve products' });
    }
});

router.get('/:id', async (req, res) => {
    let id = req.params["id"];
    try {
        let product = await getProductById(id);
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.send({ message: "Product retrieved successfully", product });
    } catch (err) {
        res.status(500).send({ error: 'Failed to retrieve product' });
    }
});

router.put('/:id', async (req, res) => {
    let id = req.params["id"];
    let model = req.body;
    try {
        let product = await updateProduct(id, model);
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.send({ message: "Product updated successfully", product });
    } catch (err) {
        res.status(500).send({ error: 'Failed to update product' });
    }
});

router.delete('/:id', async (req, res) => {
    let id = req.params["id"];
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid product ID format' });
  }

  try {
    const deletedProduct = await deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).send({ error: 'Product not found or already deleted' });
    }

    const product = await getProduct(); 
    res.send({ message: 'Product deleted successfully', product });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete product' });
  }
}); 

module.exports = router;