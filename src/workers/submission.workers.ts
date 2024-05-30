import { Job, Worker } from "bullmq";

import redisConnection from "../config/redis.config";
import SubmissionJob from "../jobs/submission.job";

export default function SubmissionWorker(queueName: string) {
    new Worker(
        queueName, 
        async (job: Job) => {
            console.log("SubmissionJob job worker kicking", job);
            if(job.name === "SubmissionJob") {
                const submissionJob = new SubmissionJob(job.data);

                submissionJob.handle(job);

                return true;
            }
        },
        {
            connection: redisConnection
        }
    );
}