import mongoose, { Schema, model, models } from "mongoose";

export enum ConsultationRequestStatus {
  REQUESTED = "REQUESTED",
  ASSIGNED = "ASSIGNED",
  WAITING = "WAITING",
  CALLED = "CALLED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum ConsultationPriority {
  NORMAL = "NORMAL",
  URGENT = "URGENT",
  EMERGENCY = "EMERGENCY",
}

export interface IConsultationRequest extends mongoose.Document {
  patient: mongoose.Types.ObjectId;

  department: mongoose.Types.ObjectId;

  assignedDoctor?: mongoose.Types.ObjectId;

  queue?: mongoose.Types.ObjectId;

  reason: string;

  priority: ConsultationPriority;

  status: ConsultationRequestStatus;

  estimatedWaitTime?: number;

  notes?: string;

  requestedAt: Date;

  assignedAt?: Date;

  completedAt?: Date;

  createdAt: Date;

  updatedAt: Date;
  consultationDate: Date;
}

const ConsultationRequestSchema = new Schema<IConsultationRequest>(
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

    queue: {
      type: Schema.Types.ObjectId,
      ref: "Queue",
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    priority: {
      type: String,
      enum: Object.values(ConsultationPriority),
      default: ConsultationPriority.NORMAL,
    },

    status: {
      type: String,
      enum: Object.values(ConsultationRequestStatus),
      default: ConsultationRequestStatus.REQUESTED,
    },

    estimatedWaitTime: {
      type: Number,
    },

    consultationDate: {
      type: Date,
    },

    notes: {
      type: String,
    },

    requestedAt: {
      type: Date,
      default: Date.now,
    },

    assignedAt: Date,

    completedAt: Date,
  },
  {
    timestamps: true,
  },
);

ConsultationRequestSchema.index({
  status: 1,
});

ConsultationRequestSchema.index({
  department: 1,
  status: 1,
});

ConsultationRequestSchema.index({
  patient: 1,
  createdAt: -1,
});

const ConsultationRequest =
  models.ConsultationRequest ||
  model<IConsultationRequest>("ConsultationRequest", ConsultationRequestSchema);

export default ConsultationRequest;
