const Cart = require('../db/cart');

async function addToCart(userId, productId, quantity){
    let product = await Cart.findOne({userId:userId, productId:productId});
    if(product){
        await Cart.findByIdAndUpdate(product._id,{
            quantity: product.quantity + quantity,
        });
    }else{
        product = new Cart({
            userId:userId,
            productId:productId,
            quantity:quantity
        });
        await product.save(); 
    }   
}

async function removeFromCart(userId, productId){
    await Cart.findOneAndDelete({userId:userId, productId:productId});
}

async function getCart(userId) {
    let cart = await Cart.find({ userId:userId }).populate('productId');
    return cart.map(item => {
      return {quantity:item.quantity,productId:item.productId}
    });
}

async function updateCart(userId, productId, quantity){
    let product = await Cart.findOne({userId:userId, productId:productId});
    if(product){
        await Cart.findByIdAndUpdate(product._id, {
            quantity: quantity
        });
    }
}

async function clearCart(userId){
    await Cart.deleteMany({
        userId:userId
    })
}

module.exports = { addToCart, removeFromCart, getCart, updateCart, clearCart };