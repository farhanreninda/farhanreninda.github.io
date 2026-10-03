import { createCmsServer } from './app.mjs';

const port = Number(process.env.PORT || 3001);
const host = process.env.HOST || '127.0.0.1';
const server = await createCmsServer();
server.listen(port, host, () => console.log(`Portfolio dan CMS: http://${host}:${port}`));
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => { server.close(); server.closeIdleConnections(); });
