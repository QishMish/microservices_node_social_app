import sendEmail from "../../mail";
import Queue from "bull";

class EmailQueue {
  queue;
  constructor() {
    // initialize queue
    this.queue = new Queue("verification");
    // add a worker
    this.queue.process("email", (job: any) => {
      this.sendEmail(job);
    });
  }
  addEmailToQueue(data: object) {
    this.queue.add("email", data, {
      delay: 3000,
      attempts: 5,
      lifo: true,
      timeout: 10000,
    });
  }
  async sendEmail(job: any) {
    const { to, from, subject, text } = job.data;
    const msg = {
      to,
      from,
      subject,
      text,
    };
    try {
      await sendEmail(msg);
      job.moveToCompleted("done", true);
    } catch (error: any) {
      if (error.response) {
        job.moveToFailed({ message: "job failed" });
      }
    }
  }
}

export default new EmailQueue();
