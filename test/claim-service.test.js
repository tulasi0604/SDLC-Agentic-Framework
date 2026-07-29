import test from 'node:test';
import assert from 'node:assert/strict';
import { ClaimRequest } from '../src/domain/claim-dto.js';
import { ClaimService } from '../src/services/claim-service.js';
import { ClaimController } from '../src/controllers/claim-controller.js';

const clock = () => new Date('2026-07-29T12:00:00.000Z');
const claim = (changes = {}) => new ClaimRequest({ claimId: 'CLM-1000', memberId: 'M-1001', serviceDate: '2026-07-20', amount: 125.5, procedureCode: 'a100', ...changes });

test('approves an eligible, unique claim and normalizes its procedure code', () => {
  const service = new ClaimService({ eligibleMembers: ['M-1001'], clock });
  const request = claim();
  assert.equal(request.procedureCode, 'A100');
  assert.deepEqual(service.process(request), { claimId: 'CLM-1000', status: 'APPROVED', reason: 'Claim passed duplicate and eligibility checks', processedAt: clock().toISOString() });
});

test('rejects an existing claim as a duplicate', () => {
  const service = new ClaimService({ eligibleMembers: ['M-1001'], processedClaimIds: ['CLM-1000'], clock });
  assert.equal(service.process(claim()).status, 'DUPLICATE');
});

test('makes a second submission idempotently duplicate', () => {
  const service = new ClaimService({ eligibleMembers: ['M-1001'], clock });
  service.process(claim());
  assert.equal(service.process(claim()).status, 'DUPLICATE');
});

test('rejects an ineligible member without consuming the claim ID', () => {
  const service = new ClaimService({ eligibleMembers: [], clock });
  assert.equal(service.process(claim()).status, 'INELIGIBLE');
  service.eligibleMembers.add('M-1001');
  assert.equal(service.process(claim()).status, 'APPROVED');
});

test('controller returns all validation failures', () => {
  const controller = new ClaimController(new ClaimService());
  const result = controller.process({ claimId: '', memberId: '', serviceDate: 'not-a-date', amount: 0 });
  assert.equal(result.status, 400);
  assert.equal(result.body.details.length, 5);
});

test('accepts decimal amounts and rejects NaN, infinity, strings, and negatives', () => {
  assert.deepEqual(claim({ amount: 0.01 }).validate(), []);
  for (const amount of [NaN, Infinity, '12', -1]) assert.ok(claim({ amount }).validate().some((message) => message.startsWith('amount')));
});
