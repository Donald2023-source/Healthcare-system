import mongoose, { Document, Model, Schema } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  code: string;
  description?: string;
  consultationFee: number;
  averageConsultationTime: number;
  queuePrefix: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    description: {
      type: String,
      default: "",
    },

    consultationFee: {
      type: Number,
      default: 0,
    },

    averageConsultationTime: {
      type: Number,
      default: 15,
    },

    queuePrefix: {
      type: String,
      required: true,
      uppercase: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Department: Model<IDepartment> =
  mongoose.models.Department ||
  mongoose.model<IDepartment>("Department", DepartmentSchema);

export default Department;