const express = require('express');
const { getFeaturedProducts, getProductForListing, getProduct, getProductById } = require('../handlers/product-handler');
const { getNewProducts } = require('../handlers/product-handler');
const { getCategory } = require('../handlers/category-handler');
const { getBrand } = require('../handlers/brand-handler');
const { updateProduct } = require('../handlers/product-handler');
const { addToWishlist, removeFromWishlist, getWishlist } = require('../handlers/whislist-handler');
const { getCart, addToCart, removeFromCart, updateCart, clearCart } = require('../handlers/shopping-cart');
const router = express.Router();

const {addOrder, getCustomerOrders} = require('../handlers/order-handler');

router.get("/new-products", async (req, res)=>{
    const product = await getNewProducts();
    res.send(product);
});

router.get("/featured-products", async (req, res)=>{
    const product = await getFeaturedProducts();
    res.send(product);
});

router.get("/categories", async (req, res)=>{
    const categories = await getCategory();
    res.send(categories);
});

router.get("/brands", async (req, res)=>{
    const brands = await getBrand();
    res.send(brands);
});

router.get("/products", async (req, res) => {
    const { searchItem, categoryId, sortBy, sortOrder, branchId, page, pageSize } = req.query;

    const products = await getProductForListing(
        searchItem,
        categoryId,
        parseInt(page),
        parseInt(pageSize),
        sortBy,
        sortOrder,
        branchId
    );

    res.send(products);
});

router.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    const products = await getProductById(id);
    res.send(products);
});

router.post("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { user, comment } = req.body;

  if (!user || !comment) {
    return res.status(400).json({ error: 'Missing user or comment' });
  }

  try {
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const newReview = {
      user,
      comment,
      createdAt: new Date()
    };

    product.reviews = product.reviews || [];
    product.reviews.push(newReview);

    const updated = await updateProduct(productId, { reviews: product.reviews });
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

router.get("/wishlist", async (req, res)=>{
    const userId = req.user.id;
    const items = await getWishlist(userId);
    res.send(items);
});

    router.post("/wishlist/:id", async (req, res)=>{
        const userId = req.user.id;
        const productId = req.params.id;
        const items = await addToWishlist(userId, productId);
        res.send(items);
    });

    router.delete("/wishlist/:id", async (req, res)=>{
        const userId = req.user.id;
        const productId = req.params.id;
        await removeFromWishlist(userId, productId);
        res.send({message:"Item removed from wishlist"});
    });

    router.get("/shopping-cart", async (req, res)=>{
    const userId = req.user.id;
    const items = await getCart(userId);
    res.send(items);
});

    router.post("/shopping-cart/:id", async (req, res)=>{
        const userId = req.user.id;
        const productId = req.params.id;
        const quantity = req.body.quantity;
        const items = await addToCart(userId, productId, quantity);
        res.send(items);
    });

    router.delete("/shopping-cart/:id", async (req, res)=>{
        const userId = req.user.id;
        const productId = req.params.id;
        await removeFromCart(userId, productId);
        res.send({message:"Shopping Cart removed successfully"});
    });

    router.put("/shopping-cart/:id", async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    const quantity = req.body.quantity;

    await updateCart(userId, productId, quantity);
    res.send({ message: "Shopping cart updated successfully" });
});

router.post("/order", async (req, res) => {
    const userId = req.user.id;
    const order = req.body;
    await addOrder(userId, order);
    await clearCart(userId);
    return res.send({message: "Order Placed Successfully"})
});

router.get("/orders", async (req, res) => {
    const userId = req.user.id;
    const orders = await getCustomerOrders(userId);
    res.send(orders);
});
   
module.exports = router;