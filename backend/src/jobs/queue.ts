// backend/src/jobs/queue.ts
import { Queue } from 'bullmq';

const queue = new Queue('notifications', {
  connection: {
    host: process.env.REDIS_HOST || 'redis',
    port: Number(process.env.REDIS_PORT || 6379),
  },
});

export default queue;
