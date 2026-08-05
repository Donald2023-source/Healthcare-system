import ConsultationRequest, {
  ConsultationRequestStatus,
} from "@/models/ConsultationRequest";

import Queue, { QueueStatus } from "@/models/Queue";

class ConsultationRequestService {
  /**
   * Patient creates a consultation request
   */
  async create(patientId: string, data: any) {
    return ConsultationRequest.create({
      patient: patientId,
      department: data.department,
      reason: data.reason,
      priority: data.priority ?? "NORMAL",
    });
  }

  /**
   * Reception dashboard
   */
  async getPendingRequests() {
    return ConsultationRequest.find({
      status: ConsultationRequestStatus.REQUESTED,
    })
      .populate("patient")
      .populate("department")
      .sort({
        createdAt: 1,
      });
  }

  /**
   * Patient history
   */
  async getPatientRequests(patientId: string) {
    return ConsultationRequest.find({
      patient: patientId,
    })
      .populate("department")
      .populate("assignedDoctor")
      .sort({
        createdAt: -1,
      });
  }

  /**
   * Reception assigns doctor
   */
  async assignDoctor(requestId: string, doctorId: string) {
    const request = await ConsultationRequest.findById(requestId);

    if (!request) {
      throw new Error("Consultation request not found");
    }

    /**
     * Create queue
     */

    const queue = await Queue.create({
      patient: request.patient,
      department: request.department,
      doctor: doctorId,
      status: QueueStatus.WAITING,
    });

    request.assignedDoctor = doctorId as any;
    request.queue = queue._id as any;
    request.status = ConsultationRequestStatus.WAITING;
    request.assignedAt = new Date();

    await request.save();

    return request.populate([
      "patient",
      "department",
      "assignedDoctor",
      "queue",
    ]);
  }

  /**
   * Doctor calls patient
   */
  async callPatient(requestId: string) {
    return ConsultationRequest.findByIdAndUpdate(
      requestId,
      {
        status: ConsultationRequestStatus.CALLED,
      },
      {
        new: true,
      },
    );
  }

  async findById(id: string) {
    return ConsultationRequest.findById(id)
      .populate("patient")
      .populate("department")
      .populate("assignedDoctor")
      .populate("queue");
  }
  /**
   * Doctor starts consultation
   */
  async startConsultation(requestId: string) {
    return ConsultationRequest.findByIdAndUpdate(
      requestId,
      {
        status: ConsultationRequestStatus.IN_PROGRESS,
      },
      {
        new: true,
      },
    );
  }

  /**
   * Consultation completed
   */
  async complete(requestId: string) {
    return ConsultationRequest.findByIdAndUpdate(
      requestId,
      {
        status: ConsultationRequestStatus.COMPLETED,
        completedAt: new Date(),
      },
      {
        new: true,
      },
    );
  }
}

export default new ConsultationRequestService();
