import { createServer as createViteServer } from 'vite';
import { createCmsServer } from './app.mjs';

const api = await createCmsServer();
await new Promise((accept, reject) => { api.once('error', reject); api.listen(3001, '127.0.0.1', accept); });
try {
  const vite = await createViteServer();
  await vite.listen();
  vite.printUrls();
  console.log('Admin: http://localhost:5173/admin | API: http://127.0.0.1:3001/api/content');
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { await vite.close(); api.close(); api.closeIdleConnections(); });
} catch (error) { api.close(); console.error(error.message); process.exitCode = 1; }
