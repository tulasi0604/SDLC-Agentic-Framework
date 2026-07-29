import { CLAIM_STATUSES, claimResponse } from '../domain/claim-dto.js';

export class ClaimService {
  constructor({ eligibleMembers = [], processedClaimIds = [], clock = () => new Date() } = {}) {
    this.eligibleMembers = new Set(eligibleMembers);
    this.processedClaimIds = new Set(processedClaimIds);
    this.clock = clock;
  }

  process(claim) {
    const processedAt = this.clock().toISOString();
    if (this.processedClaimIds.has(claim.claimId)) {
      return claimResponse(claim, CLAIM_STATUSES.DUPLICATE, 'Claim ID has already been processed', processedAt);
    }
    if (!this.eligibleMembers.has(claim.memberId)) {
      return claimResponse(claim, CLAIM_STATUSES.INELIGIBLE, 'Member is not eligible on the service date', processedAt);
    }
    this.processedClaimIds.add(claim.claimId);
    return claimResponse(claim, CLAIM_STATUSES.APPROVED, 'Claim passed duplicate and eligibility checks', processedAt);
  }
}
