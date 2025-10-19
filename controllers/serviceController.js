import Service from "../models/serviceModel.js";

// Create service (Provider)
export const createService = async (req,res) => {
  const { title, description, category, price, availability } = req.body;
  const service = await Service.create({
    providerId: req.user._id,
    title, description, category, price, availability
  });
  res.status(201).json(service);
};

// Get all services
export const getAllServices = async (req,res) => {
  const services = await Service.find().populate("providerId","name email");
  res.json(services);
};

// Get provider services
export const getProviderServices = async (req,res) => {
  const services = await Service.find({ providerId: req.user._id });
  res.json(services);
};
