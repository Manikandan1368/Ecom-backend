const Order = require("../db/order");

async function addOrder(userId,order){
    const newOrder = new Order({
        userId:userId,
        ...order,
        status:"Inprogress"
    });
    await newOrder.save();
    // return newOrder.toObject();
}

async function getCustomerOrders(userId){
    console.log('userId: ', userId);
    let orders = await Order.find({userId:userId})
    console.log('orders: ', orders);
    return orders.map(order=>order.toObject());
}

async function getOrders(){
 let orders = await Order.find()
 return orders.map(order=>order.toObject());
}

async function updateOrderStatus(id, status){
    await Order.findByIdAndUpdate(id, {status:status});
}

module.exports={ addOrder, getCustomerOrders, getOrders, updateOrderStatus};