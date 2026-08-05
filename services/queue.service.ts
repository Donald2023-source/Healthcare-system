import Queue from "@/models/Queue";
import { QueueStatus } from "@/models/Queue";

class QueueService {
  async create(patientId: string, departmentId: string) {
    const start = new Date();

    start.setHours(0, 0, 0, 0);

    const lastQueue = await Queue.findOne({
      department: departmentId,

      date: {
        $gte: start,
      },
    }).sort({
      queueNumber: -1,
    });

    const queueNumber = lastQueue ? lastQueue.queueNumber + 1 : 1;

    const queue = await Queue.create({
      patient: patientId,

      department: departmentId,

      queueNumber,

      status: QueueStatus.WAITING,
    });

    return queue;
  }

  async checkIn(queueId: string) {
    return Queue.findByIdAndUpdate(
      queueId,
      {
        checkedIn: true,
        checkedInAt: new Date(),
        status: QueueStatus.WAITING,
      },
      {
        new: true,
      },
    )
      .populate("patient")
      .populate("department");
  }
  async getDepartmentQueue(departmentId: string) {
    return Queue.find({
      department: departmentId,

      status: {
        $in: [QueueStatus.WAITING, QueueStatus.CALLED],
      },
    })
      .populate("patient")
      .sort({
        queueNumber: 1,
      });
  }

  async getTodayQueue(patientId: string) {
    const start = new Date();

    start.setHours(0, 0, 0, 0);

    const end = new Date();

    end.setHours(23, 59, 59, 999);

    return Queue.findOne({
      patient: patientId,

      createdAt: {
        $gte: start,
        $lte: end,
      },
    })
      .populate("department")
      .sort({
        createdAt: -1,
      });
  }

  async callNext(queueId: string) {
    return Queue.findByIdAndUpdate(
      queueId,

      {
        status: QueueStatus.CALLED,
      },

      {
        new: true,
      },
    );
  }
}

export default new QueueService();
