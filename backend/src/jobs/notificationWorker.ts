import { Worker } from 'bullmq';
import axios from 'axios';

const worker = new Worker(
  'notifications',
  async job => {
    const task = job.data;
    const webhookUrl = process.env.WEBHOOK_URL;

    if (webhookUrl) {
      await axios.post(webhookUrl, {
        message: 'Tarefa agendada para execução em breve',
        task
      });
      console.log(`🔔 Notificação enviada para: ${webhookUrl}`);
    }
  },
  {
    connection: {
      host: 'localhost',
      port: 6379
    }
  }
);

worker.on('completed', job => {
  console.log(`✅ Job ${job.id} processado com sucesso`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} falhou:`, err);
});
