import mongoose, { Document, Model, Schema } from "mongoose";

export enum QueueStatus {
  OPEN = "OPEN",
  PAUSED = "PAUSED",
  CLOSED = "CLOSED",
}

export interface IQueue extends Document {
  department: mongoose.Types.ObjectId;

  doctor?: mongoose.Types.ObjectId;

  date: Date;

  currentNumber: number;

  totalServed: number;

  totalWaiting: number;

  averageWaitingTime: number;

  status: QueueStatus;

  createdAt: Date;

  updatedAt: Date;
}

const QueueSchema = new Schema<IQueue>(
  {
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },

    date: {
      type: Date,
      required: true,
    },

    currentNumber: {
      type: Number,
      default: 0,
    },

    totalServed: {
      type: Number,
      default: 0,
    },

    totalWaiting: {
      type: Number,
      default: 0,
    },

    averageWaitingTime: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: Object.values(QueueStatus),
      default: QueueStatus.OPEN,
    },
  },
  {
    timestamps: true,
  }
);

QueueSchema.index(
  {
    department: 1,
    doctor: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

const Queue: Model<IQueue> =
  mongoose.models.Queue ||
  mongoose.model<IQueue>("Queue", QueueSchema);

export default Queue;