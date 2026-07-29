export const CLAIM_STATUSES = Object.freeze({
  APPROVED: 'APPROVED',
  DUPLICATE: 'DUPLICATE',
  INELIGIBLE: 'INELIGIBLE',
});

export class ClaimRequest {
  constructor({ claimId, memberId, serviceDate, amount, procedureCode }) {
    this.claimId = claimId?.trim();
    this.memberId = memberId?.trim();
    this.serviceDate = serviceDate;
    this.amount = amount;
    this.procedureCode = procedureCode?.trim().toUpperCase();
  }

  validate() {
    const errors = [];
    if (!this.claimId) errors.push('claimId is required');
    if (!this.memberId) errors.push('memberId is required');
    const parsedDate = new Date(`${this.serviceDate}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(this.serviceDate ?? '') || Number.isNaN(parsedDate.valueOf()) || parsedDate.toISOString().slice(0, 10) !== this.serviceDate) {
      errors.push('serviceDate must be a valid date in YYYY-MM-DD format');
    }
    if (typeof this.amount !== 'number' || !Number.isFinite(this.amount) || this.amount <= 0) {
      errors.push('amount must be a positive number');
    }
    if (!this.procedureCode) errors.push('procedureCode is required');
    return errors;
  }
}

export const claimResponse = (claim, status, reason, processedAt) => ({
  claimId: claim.claimId,
  status,
  reason,
  processedAt,
});
