import mongoose, { Document, Model, Schema, Types } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  RECEPTIONIST = "RECEPTIONIST",
  DOCTOR = "DOCTOR",
  NURSE = "NURSE",
  LAB_TECHNICIAN = "LAB_TECHNICIAN",
  PHARMACIST = "PHARMACIST",
  PATIENT = "PATIENT",
}

export interface IUser extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;

  email: string;

  phoneNumber: string;

  password: string;

  role: UserRole;

  avatar?: string;

  gender?: "MALE" | "FEMALE";

  dateOfBirth?: Date;

  department?: Types.ObjectId | null;

  isActive: boolean;

  isVerified: boolean;

  lastLogin?: Date;

  createdAt: Date;

  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    middleName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },

    avatar: String,

    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
    },

    dateOfBirth: Date,

    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    lastLogin: Date,
  },
  {
    timestamps: true,
  },
);

UserSchema.virtual("fullName").get(function (this: IUser) {
  return [this.firstName, this.middleName, this.lastName]
    .filter(Boolean)
    .join(" ");
});

UserSchema.set("toJSON", {
  virtuals: true,
});

UserSchema.set("toObject", {
  virtuals: true,
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
