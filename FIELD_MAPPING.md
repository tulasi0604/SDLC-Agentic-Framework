# Legacy Field Mapping

| Legacy field | Position / format | REST DTO field | JSON type / format | Rule |
| --- | --- | --- | --- | --- |
| `CLM_ID` | 1–12, alphanumeric | `claimId` | string | Required; trimmed; duplicate key |
| `MBR_ID` | 13–24, alphanumeric | `memberId` | string | Required; trimmed; eligibility lookup key |
| `SVC_DT` | 25–32, `YYYYMMDD` | `serviceDate` | string, `YYYY-MM-DD` | Required; convert and validate calendar date |
| `CHG_AMT` | 33–42, implied 2 decimals | `amount` | number | Required; divide legacy integer by 100; must be positive |
| `PROC_CD` | 43–50, alphanumeric | `procedureCode` | string | Required; trim and uppercase |
| `DISP_CD` | output `A/D/E` | `status` | enum | `APPROVED`, `DUPLICATE`, or `INELIGIBLE` |
| `DISP_TEXT` | output 80 chars | `reason` | string | Human-readable rule result |
| `RUN_TS` | batch timestamp | `processedAt` | ISO-8601 UTC string | Generated per request |

No personally identifying names or addresses are accepted by the new contract. Unknown JSON properties are ignored in this prototype; production contract validation should reject or explicitly version them.
