import { Queue } from 'bullmq';

export const clickQueue = new Queue('click-tracking', {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});