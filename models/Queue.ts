import mongoose, { Document, Model, Schema } from "mongoose";

export enum QueueStatus {
  WAITING = "WAITING",
  WITH_DOCTOR = "WITH_DOCTOR",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface IQueue extends Document {
  patient: mongoose.Types.ObjectId;

  department: mongoose.Types.ObjectId;

  queueNumber: number;

  date: Date;

  status: QueueStatus;

  estimatedTime: number;

  checkedInAt: Date;
}

const QueueSchema = new Schema<IQueue>(
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

    queueNumber: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(QueueStatus),
      default: QueueStatus.WAITING,
    },

    estimatedTime: {
      type: Number,
      default: 0,
    },

    checkedInAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Queue: Model<IQueue> =
  mongoose.models.Queue || mongoose.model<IQueue>("Queue", QueueSchema);

export default Queue;
