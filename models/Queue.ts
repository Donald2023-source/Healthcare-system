import mongoose, { Schema, Document, models, model } from "mongoose";

export enum QueueStatus {
  WAITING = "WAITING",
  CALLED = "CALLED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface IQueue extends Document {
  patient: mongoose.Types.ObjectId;

  department: mongoose.Types.ObjectId;

  queueNumber: number;

  status: QueueStatus;

  date: Date;

  createdAt: Date;

  updatedAt: Date;
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

    status: {
      type: String,
      enum: Object.values(QueueStatus),
      default: QueueStatus.WAITING,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

QueueSchema.index({
  department: 1,
  date: 1,
});

const Queue = models.Queue || model<IQueue>("Queue", QueueSchema);

export default Queue;
