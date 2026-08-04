import Queue, { QueueStatus } from "@/models/Queue";

class QueueService {
  async checkIn(patientId: string, departmentId: string) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const totalToday = await Queue.countDocuments({
      department: departmentId,
      date: today,
    });

    const queueNumber = totalToday + 1;

    const estimatedTime = (queueNumber - 1) * 15;

    return Queue.create({
      patient: patientId,
      department: departmentId,
      queueNumber,
      date: today,
      estimatedTime,
      status: QueueStatus.WAITING,
    });
  }
}

export default new QueueService();
