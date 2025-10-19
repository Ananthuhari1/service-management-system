import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  status: { type: String, enum: ["pending","accepted","declined","completed"], default: "pending" },
  paymentStatus: { type: String, enum: ["unpaid","paid"], default: "unpaid" },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
