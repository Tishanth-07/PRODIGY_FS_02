import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    dateOfJoining: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
