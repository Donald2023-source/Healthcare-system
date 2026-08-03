import mongoose, { Document, Model, Schema } from "mongoose";

export enum DoctorStatus {
  AVAILABLE = "AVAILABLE",
  BUSY = "BUSY",
  OFFLINE = "OFFLINE",
  ON_LEAVE = "ON_LEAVE",
}

export interface IDoctor extends Document {
  user: mongoose.Types.ObjectId;

  department: mongoose.Types.ObjectId;

  employeeId: string;
  licenseNumber: string;

  specialization: string;

  yearsOfExperience: number;

  qualification: string;

  bio?: string;

  consultationFee?: number;

  workingDays: string[];

  startTime: string;

  endTime: string;

  maxPatientsPerDay: number;

  currentPatients: number;

  status: DoctorStatus;

  profileImage?: string;

  createdAt: Date;

  updatedAt: Date;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    employeeId: {
      type: String,
      unique: true,
      required: true,
    },

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    yearsOfExperience: {
      type: Number,
      default: 0,
    },

    bio: {
      type: String,
      default: "",
    },

    consultationFee: {
      type: Number,
    },

    workingDays: {
      type: [String],
      default: [],
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    maxPatientsPerDay: {
      type: Number,
      default: 30,
    },

    currentPatients: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: Object.values(DoctorStatus),
      default: DoctorStatus.AVAILABLE,
    },

    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor: Model<IDoctor> =
  mongoose.models.Doctor ||
  mongoose.model<IDoctor>("Doctor", DoctorSchema);

export default Doctor;