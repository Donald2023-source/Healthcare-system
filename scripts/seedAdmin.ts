import "dotenv/config";

import { connectDB } from "@/lib/mongodb";
import User, { UserRole } from "@/models/User";
import { hashPassword } from "@/lib/password";

async function seedAdmin() {
  try {
    await connectDB();

    const email = "admin@gmail.com";

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("✅ Admin already exists.");
      process.exit(0);
    }

    const password = "123456";

    const hashedPassword = await hashPassword(password);

    await User.create({
      firstName: "System",
      lastName: "Administrator",
      email,
      phoneNumber: "+2348000000000",
      password: hashedPassword,
      role: UserRole.ADMIN,
    });

    console.log("✅ Admin created successfully.");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedAdmin();
