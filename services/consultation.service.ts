import Consultation from "@/models/Consultation";
import Queue, { QueueStatus } from "@/models/Queue";

class ConsultationService {
  async create(doctorId: string, data: any) {
    const consultation = await Consultation.create({
      patient: data.patientId,
      assignedDoctor: doctorId,
      queue: data.queueId,

      diagnosis: data.diagnosis,

      prescription: data.prescription,
    });

    await Queue.findByIdAndUpdate(data.queueId, {
      status: QueueStatus.COMPLETED,
    });

    return consultation;
  }

  async findById(id: string) {
    return Consultation.findById(id)
      .populate("patient")
      .populate("assignedDoctor")
      .populate("queue");
  }

  async getPatientHistory(patientId: string) {
    return Consultation.find({
      patient: patientId,
    })
      .populate("assignedDoctor")
      .sort({
        consultationDate: -1,
      });
  }

  async getDoctorHistory(doctorId: string) {
    return Consultation.find({
      assignedDoctor: doctorId,
    })
      .populate("patient")
      .sort({
        consultationDate: -1,
      });
  }

  async complete(id: string) {
    return Consultation.findByIdAndUpdate(
      id,
      {
        status: "COMPLETED",
      },
      {
        new: true,
      },
    );
  }
}

export default new ConsultationService();
