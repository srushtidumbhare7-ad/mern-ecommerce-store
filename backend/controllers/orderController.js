const Order = require("../models/Order");

// 🔹 Create new order (USER)
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalPrice } = req.body;

    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      totalPrice,
      status: "Processing"
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed" });
  }
};

// 🔹 Get logged-in user's orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// 🔹 Admin: get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

// 🔹 Admin: update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found" });
    }

    order.status = req.body.status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status" });
  }
};
