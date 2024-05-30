import { Queue } from "bullmq";

import redisConnection from "../config/redis.config";
import { SUBMISSION_QUEUE } from "../utils/constants";

export default new Queue(SUBMISSION_QUEUE, { connection: redisConnection });
