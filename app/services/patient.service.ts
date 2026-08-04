import User, { UserRole } from "@/models/User";
import Patient from "@/models/Patients";

import { hashPassword } from "@/lib/password";

import { generateHospitalNumber } from "@/lib/generateHospitalNumber";

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

    return {
      user,
      patient,
      temporaryPassword: password,
    };
  }
}

export default new PatientService();
