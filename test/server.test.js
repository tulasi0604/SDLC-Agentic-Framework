import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/server.js';

const start = async () => {
  const server = createApp();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return { server, base: `http://127.0.0.1:${server.address().port}` };
};

test('health endpoint reports readiness', async (t) => {
  const { server, base } = await start();
  t.after(() => server.close());
  const response = await fetch(`${base}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'UP' });
});

test('claims endpoint processes valid input and rejects malformed JSON', async (t) => {
  const { server, base } = await start();
  t.after(() => server.close());
  const valid = await fetch(`${base}/api/v1/claims`, { method: 'POST', body: JSON.stringify({ claimId: `CLM-${Date.now()}`, memberId: 'M-1001', serviceDate: '2026-07-20', amount: 25, procedureCode: 'A100' }) });
  assert.equal(valid.status, 200);
  assert.equal((await valid.json()).status, 'APPROVED');
  const invalid = await fetch(`${base}/api/v1/claims`, { method: 'POST', body: '{' });
  assert.equal(invalid.status, 400);
});
