import mongoose, { Document, Model, Schema } from "mongoose";

export enum TicketStatus {
  WAITING = "WAITING",
  TRIAGE = "TRIAGE",
  WAITING_FOR_DOCTOR = "WAITING_FOR_DOCTOR",
  IN_CONSULTATION = "IN_CONSULTATION",
  LABORATORY = "LABORATORY",
  PHARMACY = "PHARMACY",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface IQueueTicket extends Document {
  queue: mongoose.Types.ObjectId;

  patient: mongoose.Types.ObjectId;

  department: mongoose.Types.ObjectId;

  doctor?: mongoose.Types.ObjectId;

  appointment?: mongoose.Types.ObjectId;

  ticketNumber: string;

  queueNumber: number;

  priority: number;

  status: TicketStatus;

  checkInTime: Date;

  calledAt?: Date;

  consultationStartedAt?: Date;

  consultationEndedAt?: Date;

  completedAt?: Date;

  estimatedWaitingTime: number;

  notes?: string;

  createdAt: Date;

  updatedAt: Date;
}

const QueueTicketSchema = new Schema<IQueueTicket>(
  {
    queue: {
      type: Schema.Types.ObjectId,
      ref: "Queue",
      required: true,
    },

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

    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },

    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },

    ticketNumber: {
      type: String,
      required: true,
      unique: true,
    },

    queueNumber: {
      type: Number,
      required: true,
    },

    priority: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: Object.values(TicketStatus),
      default: TicketStatus.WAITING,
    },

    checkInTime: {
      type: Date,
      default: Date.now,
    },

    calledAt: Date,

    consultationStartedAt: Date,

    consultationEndedAt: Date,

    completedAt: Date,

    estimatedWaitingTime: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

QueueTicketSchema.index({
  queue: 1,
  queueNumber: 1,
});

const QueueTicket: Model<IQueueTicket> =
  mongoose.models.QueueTicket ||
  mongoose.model<IQueueTicket>(
    "QueueTicket",
    QueueTicketSchema
  );

export default QueueTicket;