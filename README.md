# Orbit — Legacy Claims REST Modernization

Orbit is a dependency-free Node.js reference implementation that replaces a nightly claims batch handoff with a synchronous, traceable REST service. It validates claim DTOs, detects duplicate claim IDs, checks member eligibility, and returns a deterministic disposition. The existing command-center UI remains available at the service root.

## Prerequisites and quick start

- Node.js 20 or newer (tested with Node 22)
- Docker 24+ only if using the container workflow

```bash
npm test
npm run build
npm start
```

The application listens on `http://localhost:5173` by default. Override it with `PORT=8080 npm start`. Verify readiness with `curl http://localhost:5173/health`.

### Docker

```bash
docker compose up --build
```

## API

### `POST /api/v1/claims`

Processes one claim. Required JSON fields are `claimId` (string), `memberId` (string), `serviceDate` (`YYYY-MM-DD`), `amount` (positive JSON number), and `procedureCode` (string). The demo eligibility set is `M-1001` through `M-1005`; `CLM-0001` is pre-seeded as processed. Approved IDs are retained in memory until restart.

```bash
curl -i http://localhost:5173/api/v1/claims \
  -H 'Content-Type: application/json' \
  -d '{"claimId":"CLM-1000","memberId":"M-1001","serviceDate":"2026-07-20","amount":125.50,"procedureCode":"A100"}'
```

Successful HTTP `200` response:

```json
{
  "claimId": "CLM-1000",
  "status": "APPROVED",
  "reason": "Claim passed duplicate and eligibility checks",
  "processedAt": "2026-07-29T12:00:00.000Z"
}
```

Business outcomes (`APPROVED`, `DUPLICATE`, and `INELIGIBLE`) return HTTP `200`; malformed or invalid requests return HTTP `400` with `VALIDATION_ERROR`, `INVALID_JSON`, and actionable details. Health checks use `GET /health`.

## Project structure and artifacts

| Path | Purpose |
| --- | --- |
| `src/domain` | Request/response DTO and validation |
| `src/services` | Duplicate and eligibility business rules |
| `src/controllers` | HTTP-independent controller boundary |
| `src/server.js` | HTTP routes and static UI server |
| `test/` | Unit and endpoint tests |
| `data/claims.json` | 20-record mock dataset |
| `postman/` | Importable collection with four cases |
| `ARCHITECTURE.md` | Before/after architecture and decisions |
| `FIELD_MAPPING.md` | Legacy-to-DTO mapping |
| `PLAN.md` | Phases and definitions of done |
| `PROMPTS.md` | AI collaboration record |
| `VIDEO.md` | Submission walkthrough plan |

## Test, build, and package

`npm run test:coverage` prints native line/function/branch coverage. `npm run build` creates `dist/`. `npm run submission` performs a clean build/test and creates `submission.zip` with source and required documentation only. The archive deliberately excludes Git metadata, dependencies, build output, and video binaries to remain below the 150 MB limit; record/compress the video separately to less than 50 MB if the event permits a separate upload.

## Current scope

This hackathon implementation intentionally uses an in-memory duplicate store and fixed eligibility fixture. Production evolution should add durable idempotency, an eligibility system adapter, authentication/authorization, audit persistence, structured telemetry, and rate limiting.
