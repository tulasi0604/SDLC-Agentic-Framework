import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ClaimController } from './controllers/claim-controller.js';
import { ClaimService } from './services/claim-service.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const service = new ClaimService({
  eligibleMembers: ['M-1001', 'M-1002', 'M-1003', 'M-1004', 'M-1005'],
  processedClaimIds: ['CLM-0001'],
});
const controller = new ClaimController(service);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };
const json = (response, status, body) => {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
};

export const createApp = () => createServer(async (request, response) => {
  if (request.method === 'GET' && request.url === '/health') return json(response, 200, { status: 'UP' });
  if (request.method === 'POST' && request.url === '/api/v1/claims') {
    let raw = '';
    for await (const chunk of request) {
      raw += chunk;
      if (raw.length > 1_000_000) return json(response, 413, { error: 'PAYLOAD_TOO_LARGE' });
    }
    let body;
    try { body = JSON.parse(raw); } catch { return json(response, 400, { error: 'INVALID_JSON' }); }
    const result = controller.process(body);
    return json(response, result.status, result.body);
  }
  if (request.method !== 'GET') return json(response, 404, { error: 'NOT_FOUND' });
  const pathname = request.url === '/' ? '/index.html' : request.url;
  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  if (!['/index.html', '/src/main.js', '/src/styles.css'].includes(safePath)) return json(response, 404, { error: 'NOT_FOUND' });
  try {
    const file = await readFile(join(root, safePath));
    response.writeHead(200, { 'content-type': types[extname(safePath)] ?? 'application/octet-stream' });
    response.end(file);
  } catch { json(response, 404, { error: 'NOT_FOUND' }); }
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 5173);
  createApp().listen(port, () => console.log(`Orbit listening on http://localhost:${port}`));
}
