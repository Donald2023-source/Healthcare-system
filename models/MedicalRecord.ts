import mongoose, { Document, Model, Schema } from "mongoose";

export enum ConsultationOutcome {
  DISCHARGED = "DISCHARGED",
  ADMITTED = "ADMITTED",
  REFERRED = "REFERRED",
  FOLLOW_UP = "FOLLOW_UP",
}

export interface IMedicalRecord extends Document {
  queueTicket: mongoose.Types.ObjectId;

  patient: mongoose.Types.ObjectId;

  doctor: mongoose.Types.ObjectId;

  triage?: mongoose.Types.ObjectId;

  diagnosis: string;

  symptoms: string[];

  examination: string;

  assessment: string;

  treatmentPlan: string;

  doctorNotes?: string;

  followUpDate?: Date;

  outcome: ConsultationOutcome;

  createdAt: Date;

  updatedAt: Date;
}

const MedicalRecordSchema = new Schema<IMedicalRecord>(
  {
    queueTicket: {
      type: Schema.Types.ObjectId,
      ref: "QueueTicket",
      required: true,
      unique: true,
    },

    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    triage: {
      type: Schema.Types.ObjectId,
      ref: "Triage",
    },

    diagnosis: {
      type: String,
      required: true,
    },

    symptoms: {
      type: [String],
      default: [],
    },

    examination: {
      type: String,
      default: "",
    },

    assessment: {
      type: String,
      default: "",
    },

    treatmentPlan: {
      type: String,
      default: "",
    },

    doctorNotes: {
      type: String,
      default: "",
    },

    followUpDate: Date,

    outcome: {
      type: String,
      enum: Object.values(ConsultationOutcome),
      default: ConsultationOutcome.DISCHARGED,
    },
  },
  {
    timestamps: true,
  }
);

const MedicalRecord: Model<IMedicalRecord> =
  mongoose.models.MedicalRecord ||
  mongoose.model<IMedicalRecord>(
    "MedicalRecord",
    MedicalRecordSchema
  );

export default MedicalRecord;