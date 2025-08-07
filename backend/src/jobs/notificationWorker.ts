import 'dotenv/config';
import { Worker } from 'bullmq';
import axios from 'axios';

const worker = new Worker(
  'notifications',
  async job => {
    const task = job.data;
    const webhookUrl = process.env.WEBHOOK_URL;

    if (!webhookUrl) {
      console.log('ℹ️ WEBHOOK_URL não configurada; notificação não será enviada.');
      return;
    }

    await axios.post(webhookUrl, {
      message: 'Tarefa agendada para execução em breve',
      task,
    });

    console.log(`🔔 Notificação enviada para: ${webhookUrl}`);
  },
  {
    connection: {
      host: process.env.REDIS_HOST || 'redis',
      port: Number(process.env.REDIS_PORT || 6379),
    },
  }
);

worker.on('completed', job => console.log(`✅ Job ${job.id} OK`));
worker.on('failed', (job, err) => console.error(`❌ Job ${job?.id} falhou`, err));
