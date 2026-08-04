import mongoose, { Document, Model, Schema } from "mongoose";

export enum TriagePriority {
  EMERGENCY = "EMERGENCY",
  URGENT = "URGENT",
  NORMAL = "NORMAL",
}

export interface ITriage extends Document {
  queueTicket: mongoose.Types.ObjectId;

  nurse: mongoose.Types.ObjectId;

  systolicBP: number;

  diastolicBP: number;

  pulseRate: number;

  respiratoryRate: number;

  temperature: number;

  oxygenSaturation: number;

  weight: number;

  height: number;

  bmi: number;

  painScore: number;

  bloodSugar?: number;

  chiefComplaint: string;

  allergies?: string[];

  currentMedications?: string[];

  notes?: string;

  priority: TriagePriority;

  createdAt: Date;

  updatedAt: Date;
}

const TriageSchema = new Schema<ITriage>(
  {
    queueTicket: {
      type: Schema.Types.ObjectId,
      ref: "QueueTicket",
      required: true,
      unique: true,
    },

    nurse: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    systolicBP: {
      type: Number,
      required: true,
    },

    diastolicBP: {
      type: Number,
      required: true,
    },

    pulseRate: {
      type: Number,
      required: true,
    },

    respiratoryRate: {
      type: Number,
      required: true,
    },

    temperature: {
      type: Number,
      required: true,
    },

    oxygenSaturation: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    bmi: {
      type: Number,
      required: true,
    },

    painScore: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },

    bloodSugar: {
      type: Number,
    },

    chiefComplaint: {
      type: String,
      required: true,
      trim: true,
    },

    allergies: {
      type: [String],
      default: [],
    },

    currentMedications: {
      type: [String],
      default: [],
    },

    notes: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: Object.values(TriagePriority),
      default: TriagePriority.NORMAL,
    },
  },
  {
    timestamps: true,
  }
);

const Triage: Model<ITriage> =
  mongoose.models.Triage ||
  mongoose.model<ITriage>("Triage", TriageSchema);

export default Triage;