import Order from "../models/orderModel.js";
import Service from "../models/serviceModel.js";

// Client: Create order
export const createOrder = async (req,res) => {
  const { serviceId } = req.body;
  const service = await Service.findById(serviceId);
  if(!service) return res.status(404).json({ message: "Service not found" });

  const order = await Order.create({
    clientId: req.user._id,
    providerId: service.providerId,
    serviceId
  });
  res.status(201).json(order);
};

// Client: Get my orders
export const getClientOrders = async (req,res) => {
  const orders = await Order.find({ clientId: req.user._id }).populate("serviceId","title price").populate("providerId","name email");
  res.json(orders);
};

// Provider: Get incoming orders
export const getProviderOrders = async (req,res) => {
  const orders = await Order.find({ providerId: req.user._id }).populate("serviceId","title price").populate("clientId","name email");
  res.json(orders);
};

// Provider: Update order status
export const updateOrderStatus = async (req,res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findById(id);
  if(!order) return res.status(404).json({ message: "Order not found" });
  if(order.providerId.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not authorized" });

  order.status = status;
  await order.save();
  res.json(order);
};
