import Queue from "@/models/Queue";

class QueueService {
  async getTodayQueue() {
    const today = new Date();
    today.setHours(0,0,0,0);

    return Queue.find({
      createdAt: {
        $gte: today,
      },
    })
      .populate({
        path: "patient",
        populate: {
          path: "user",
        },
      })
      .populate("department")
      .sort({
        queueNumber: 1,
      });
  }
}

export default new QueueService();