# Delivery Plan

## Phase 1 — Contract and baseline (complete)
- Define claim request/response DTOs and legacy field mapping.
- Capture the before/after architecture and scope boundaries.
- **Definition of done:** all required fields, status values, and HTTP semantics are documented and reviewed.

## Phase 2 — Vertical slice (complete)
- Implement DTO validation, controller translation, and service rules.
- Expose versioned claim and health endpoints without third-party runtime dependencies.
- **Definition of done:** eligible unique claims approve; duplicates and ineligible members return deterministic dispositions; invalid payloads return HTTP 400.

## Phase 3 — Verification and demo assets (complete)
- Add unit/HTTP tests, 20 sample records, and four Postman cases.
- Add clean build, container, packaging, and video walkthrough instructions.
- **Definition of done:** clean checkout passes build/tests; Postman cases cover approval, duplicate, eligibility, and validation; submission archive excludes generated/heavy files.

## Phase 4 — Production hardening (next)
- Replace in-memory state with transactional persistence and an idempotency policy.
- Integrate the authoritative eligibility provider; add auth, audit logs, tracing, rate limits, and OpenAPI.
- Add contract/load/security tests and CI quality gates.
- **Definition of done:** restart-safe duplicate behavior, authenticated least-privilege access, observable SLOs, threat-model sign-off, and deployment rollback evidence.
