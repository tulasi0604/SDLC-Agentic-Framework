import { ClaimRequest } from '../domain/claim-dto.js';

export class ClaimController {
  constructor(service) {
    this.service = service;
  }

  process(body) {
    const claim = new ClaimRequest(body ?? {});
    const errors = claim.validate();
    if (errors.length) return { status: 400, body: { error: 'VALIDATION_ERROR', details: errors } };
    return { status: 200, body: this.service.process(claim) };
  }
}
