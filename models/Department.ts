import mongoose, { Schema, model, models } from "mongoose";

export interface IDepartment {
  name: string;

  code: string;

  description?: string;

  location?: string;

  color?: string;

  consultationDuration: number;

  dailyCapacity: number;

  isActive: boolean;
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
      trim: true,
    },

    description: String,

    location: String,

    color: {
      type: String,
      default: "#2563EB",
    },

    consultationDuration: {
      type: Number,
      default: 15,
    },

    dailyCapacity: {
      type: Number,
      default: 100,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

DepartmentSchema.index({
  code: 1,
});

const Department =
  models.Department || model<IDepartment>("Department", DepartmentSchema);

console.log("Department model registered");
console.log(mongoose.modelNames());

export default Department;
