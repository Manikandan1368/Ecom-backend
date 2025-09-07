const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
   date: {
       type: Date,
       default: Date.now
   },
   items: Array(mongoose.Schema.Types.Mixed),
   status: String,
   paymentType: String,
   address: mongoose.Schema.Types.Mixed,
});
const Order = mongoose.model('orders', orderSchema);
module.exports = Order;