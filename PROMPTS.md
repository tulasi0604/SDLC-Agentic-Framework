# AI Prompt and Refinement Log

This log documents significant human/AI collaboration for reproducibility. Responses are summarized rather than copied verbatim.

| Iteration | Prompt / intent | AI response | Human refinement / resulting decision |
| --- | --- | --- | --- |
| 1 | Build an end-to-end SDLC Agentic Framework from the supplied problem statement. | Proposed an 11-agent Orbit command-center UI and dependency-light static implementation. | Retained the UI, but identified that a visual prototype alone did not meet the executable-service evaluation rubric. |
| 2 | Apply the expected deliverables checklist: layered source, claim scenarios, docs, data, Postman, and packaging. | Proposed a minimal Node REST vertical slice with DTO, controller, and service layers plus auditable submission artifacts. | Chose built-in Node APIs to avoid registry/network risk and ensure a clean hackathon build. |
| 3 | Clarify duplicate-versus-eligibility precedence and edge behavior. | Recommended checking duplicate IDs first, recording only approvals, validating all fields together, and treating business dispositions as HTTP 200. | Adopted the ordering for deterministic retries; documented that approved identifiers persist only for the process lifetime. |
| 4 | Increase confidence without external test libraries. | Added `node:test` unit and live HTTP tests covering approval, duplicate retry, ineligibility, malformed JSON, normalization, and numeric boundaries. | Added native coverage reporting and a 70%+ target while keeping the app dependency-free. |
| 5 | Prepare a compliant submission. | Added Docker assets, Postman cases, 20 mock claims, presentation plan, and a script that tests/builds then creates a non-nested ZIP. | Explicitly excluded dependencies, build artifacts, Git data, archives, and video binaries from the ZIP.

## Responsible-use notes

AI suggestions were treated as drafts. Business-rule ordering, public contract behavior, test assertions, and limitations were reviewed and made explicit. The sample data is synthetic and contains no protected health information.
