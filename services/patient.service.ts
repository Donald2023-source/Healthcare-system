// services/patient.service.ts

import Patient from "@/models/Patients";
import Consultation from "@/models/Consultation";
import ConsultationRequest from "@/models/ConsultationRequest";
import Queue from "@/models/Queue";
import { hashPassword } from "@/lib/password";
import { generateHospitalNumber } from "@/lib/generateHospitalNumber";
import User, { UserRole } from "@/models/User";

class PatientService {
  async create(data: any) {
    const password = Math.random().toString(36).slice(-8);

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,

      email: data.email,
      phoneNumber: data.phoneNumber,

      password: hashedPassword,

      role: UserRole.PATIENT,
    });

    const patient = await Patient.create({
      user: user._id,

      hospitalNumber: generateHospitalNumber(),

      gender: data.gender,

      dateOfBirth: data.dateOfBirth,

      bloodGroup: data.bloodGroup,

      genotype: data.genotype,

      maritalStatus: data.maritalStatus,

      address: data.address,

      emergencyContactName: data.emergencyContactName,

      emergencyContactPhone: data.emergencyContactPhone,
    });
    return patient;
  }
  /**
   * Dashboard
   */
  async getDashboard(userId: string) {
    const patient = await Patient.findOne({
      user: userId,
    }).populate("user");

    if (!patient) {
      throw new Error("Patient not found");
    }

    const activeConsultation = await ConsultationRequest.findOne({
      patient: patient._id,
      status: {
        $in: ["PENDING", "APPROVED", "CHECKED_IN"],
      },
    })
      .populate("department")
      .sort({ createdAt: -1 });

    const currentQueue = await Queue.findOne({
      patient: patient._id,
      status: {
        $in: ["WAITING", "CALLED"],
      },
    }).populate("department");

    const recentConsultation = await Consultation.findOne({
      patient: patient._id,
    })
      .populate("doctor")
      .sort({
        consultationDate: -1,
      });

    return {
      patient,
      activeConsultation,
      currentQueue,
      recentConsultation,
    };
  }

  /**
   * Profile
   */

  async getAll() {
    return Patient.find().populate("user").sort({
      createdAt: -1,
    });
  }

  async findById(id: string) {
    return Patient.findById(id).populate("user");
  }

  async getProfile(userId: string) {
    return Patient.findOne({
      user: userId,
    }).populate("user");
  }

  /**
   * Update Profile
   */
  async updateProfile(userId: string, data: any) {
    const patient = await Patient.findOne({
      user: userId,
    });

    if (!patient) {
      throw new Error("Patient not found");
    }

    patient.address = data.address ?? patient.address;
    patient.emergencyContactName =
      data.emergencyContactName ?? patient.emergencyContactName;
    patient.emergencyContactPhone =
      data.emergencyContactPhone ?? patient.emergencyContactPhone;

    if (data.bloodGroup) {
      patient.bloodGroup = data.bloodGroup;
    }

    if (data.genotype) {
      patient.genotype = data.genotype;
    }

    if (data.maritalStatus) {
      patient.maritalStatus = data.maritalStatus;
    }

    await patient.save();

    return patient.populate("user");
  }
}

export default new PatientService();
