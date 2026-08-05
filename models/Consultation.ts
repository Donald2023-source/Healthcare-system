import mongoose, { Schema, Document, Model } from "mongoose";

export interface IConsultation extends Document {
  patient: mongoose.Types.ObjectId;

  department: mongoose.Types.ObjectId;

  assignedDoctor?: mongoose.Types.ObjectId;

  reason: string;

  status: "REQUESTED" | "WAITING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

  consultationDate?: Date;
  queue: mongoose.Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}

const ConsultationSchema = new Schema<IConsultation>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    assignedDoctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },

    reason: {
      type: String,
      required: true,
    },

    queue: {
      type: Schema.Types.ObjectId,
      ref: "Queue",
    },

    status: {
      type: String,
      enum: ["REQUESTED", "WAITING", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
      default: "REQUESTED",
    },

    consultationDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default (mongoose.models.Consultation as Model<IConsultation>) ||
  mongoose.model<IConsultation>("Consultation", ConsultationSchema);
