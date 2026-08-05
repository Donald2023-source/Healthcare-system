import User, { UserRole } from "@/models/User";
import Department from "@/models/Department";
import { hashPassword } from "@/lib/password";
import { connectDB } from "@/lib/mongodb";
class AdminService {
  async getDoctors() {
    return User.find({
      role: UserRole.DOCTOR,
    });
  }

  async createDoctor(data: any) {
    const password = "123456"

    const hashedPassword = await hashPassword(password);

    const doctor = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: hashedPassword,
      role: UserRole.DOCTOR,

      isActive: true,
    });

    return {
      doctor,
      temporaryPassword: password,
    };
  }

  async getDashboardStats() {
    const patients = await User.countDocuments({
      role: UserRole.PATIENT,
    });

    const doctors = await User.countDocuments({
      role: UserRole.DOCTOR,
    });

    const receptionists = await User.countDocuments({
      role: UserRole.RECEPTIONIST,
    });

    return {
      patients,
      doctors,
      receptionists,
    };
  }
  async toggleDoctor(id: string) {
    const doctor = await User.findById(id);

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    doctor.isActive = !doctor.isActive;

    await doctor.save();

    return doctor;
  }

  async getReceptionists() {
    return User.find({
      role: UserRole.RECEPTIONIST,
    }).lean();
  }

  async createReceptionist(data: any) {
    const password = "123456";

    const hashedPassword = await hashPassword(password);

    const receptionist = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: hashedPassword,
      role: UserRole.RECEPTIONIST,
      isActive: true,
    });

    return {
      receptionist,
      temporaryPassword: password,
    };
  }

  async toggleReceptionist(id: string) {
    await connectDB();

    const receptionist = await User.findById(id);

    if (!receptionist) {
      throw new Error("Receptionist not found");
    }

    receptionist.isActive = !receptionist.isActive;

    await receptionist.save();

    return receptionist;
  }
}

export default new AdminService();
