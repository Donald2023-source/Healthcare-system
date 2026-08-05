import ConsultationRequest, {
  ConsultationRequestStatus,
} from "@/models/ConsultationRequest";
import "@/models/User";
import "@/models/Patients";
import "@/models/Department";
import "@/models/Doctor";

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
      .populate({
        path: "patient",
        populate: {
          path: "user",
          select: "firstName lastName email phoneNumber",
        },
      })
      .sort({
        createdAt: 1,
      });
  }
  /**
   * Get patient's latest consultation request
   */
  async getLatestRequest(patientId: string) {
    return (
      ConsultationRequest.findOne({
        patient: patientId,
      })
        // .populate("department")
        .populate("assignedDoctor")
        .populate("queue")
        .sort({
          createdAt: -1,
        })
        .lean()
    );
  }

  /**
   * Get patient's active consultation request
   */
  async getActiveRequest(patientId: string) {
    return ConsultationRequest.findOne({
      patient: patientId,
      status: {
        $in: [
          ConsultationRequestStatus.REQUESTED,
          ConsultationRequestStatus.WAITING,
          ConsultationRequestStatus.CALLED,
          ConsultationRequestStatus.IN_PROGRESS,
        ],
      },
    })
      .populate("department")
      .populate("assignedDoctor")
      .populate("queue")
      .sort({
        createdAt: -1,
      });
  }

  async getDoctorsByDepartment(departmentId: string) {
    const Doctor = (await import("@/models/Doctor")).default;

    return Doctor.find({
      department: departmentId,
      isActive: true,
    })
      .populate("department")
      .sort({
        name: 1,
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
  /**
   * Reception assigns doctor
   */
  async assignDoctor(
    requestId: string,
    doctorId: string,
    consultationDate: string,
    consultationTime: string,
  ) {
    const request = await ConsultationRequest.findById(requestId);

    if (!request) {
      throw new Error("Consultation request not found");
    }

    const appointment = new Date(`${consultationDate}T${consultationTime}`);

    const queue = await Queue.create({
      patient: request.patient,
      department: request.department,
      doctor: doctorId,
      status: QueueStatus.WAITING,
    });

    request.assignedDoctor = doctorId as any;

    request.queue = queue._id as any;

    request.consultationDate = appointment;

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
