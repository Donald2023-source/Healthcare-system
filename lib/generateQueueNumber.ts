import Queue from "@/models/Queue";
import Department from "@/models/Departments";

export async function generateQueueNumber(
  departmentId: string
) {
  const department = await Department.findById(departmentId);

  if (!department) {
    throw new Error("Department not found");
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const count = await Queue.countDocuments({
    department: department._id,
    createdAt: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });

  const nextNumber = count + 1;

  return `${department.code}-${String(nextNumber).padStart(3, "0")}`;
}