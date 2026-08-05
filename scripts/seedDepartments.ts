import { connectDB } from "@/lib/mongodb";
import Department from "@/models/Department";

const departments = [
  {
    name: "General OPD",
    code: "GOPD",
    consultationDuration: 15,
    dailyCapacity: 150,
  },
  {
    name: "Paediatrics",
    code: "PED",
    consultationDuration: 20,
    dailyCapacity: 120,
  },
  {
    name: "Laboratory",
    code: "LAB",
    consultationDuration: 8,
    dailyCapacity: 250,
  },
  {
    name: "Radiology",
    code: "RAD",
    consultationDuration: 20,
    dailyCapacity: 80,
  },
  {
    name: "Pharmacy",
    code: "PHA",
    consultationDuration: 5,
    dailyCapacity: 300,
  },
  {
    name: "Emergency",
    code: "EMR",
    consultationDuration: 10,
    dailyCapacity: 500,
  },
];

async function seedDepartments() {
  try {
    console.log("🚀 Connecting to database...");
    await connectDB();

    console.log("🗑 Clearing existing departments...");
    await Department.deleteMany({});

    console.log("📥 Inserting departments...");
    await Department.insertMany(departments);

    console.log("✅ Departments seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding departments:", error);
  } finally {
    process.exit();
  }
}

seedDepartments();
