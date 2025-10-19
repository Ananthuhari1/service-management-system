import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  availability: { days: [String], hours: String },
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
