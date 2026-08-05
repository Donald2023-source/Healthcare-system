import mongoose, { Schema, Model, Document } from "mongoose";
import { IUser } from "./User";
export interface IPatient extends Document {
  user: mongoose.Types.ObjectId | IUser;

  hospitalNumber: string;

  gender: "MALE" | "FEMALE";

  dateOfBirth: Date;

  bloodGroup?: string;

  genotype?: string;

  maritalStatus?: string;

  address: string;

  emergencyContactName: string;

  emergencyContactPhone: string;

  createdAt: Date;

  updatedAt: Date;
}

const PatientSchema = new Schema<IPatient>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    hospitalNumber: {
      type: String,
      unique: true,
      required: true,
    },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    bloodGroup: String,

    genotype: String,

    maritalStatus: String,

    address: {
      type: String,
      required: true,
    },

    emergencyContactName: {
      type: String,
      required: true,
    },

    emergencyContactPhone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default (mongoose.models.Patient as Model<IPatient>) ||
  mongoose.model<IPatient>("Patient", PatientSchema);
