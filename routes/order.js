const express = require('express');
const router = express.Router();

const { getOrders, updateOrderStatus } = require("../handlers/order-handler");

router.get("/allOrders", async(req, res)=>{
    const orders = await getOrders();
    res.send(orders);
});

router.post("/:id", async(req,res)=>{
    const id = req.params.id;
    const status = req.body.status;
    await updateOrderStatus(id, status);
    res.send({message: "Order status updated successfully"});
});

module.exports = router;