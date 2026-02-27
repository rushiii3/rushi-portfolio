# Security Best Practices Report

## Executive Summary
No critical vulnerabilities were found in this codebase during this review. The main gaps are secure-by-default hardening issues: missing global security headers, missing strict validation on path-derived slugs before filesystem reads, and a few frontend link/navigation hygiene issues. Addressing these items will reduce XSS/path-manipulation risk and improve baseline resilience.

Scope reviewed: Next.js + TypeScript app/router code, API routes, MDX rendering paths, and configuration under `app/`, `components/`, `lib/`, and `next.config.ts`.

---

## Medium Severity Findings

### [SBP-001] Missing baseline security headers/CSP hardening
- Rule ID: `NEXT-HEADERS-001`, `NEXT-CSP-001`
- Severity: Medium
- Location:
  - `next.config.ts:3`
  - `app/layout.tsx:98`
- Evidence:
  - No `headers()` security policy in `next.config.ts`.
  - No middleware/proxy security header setter in app code.
  - Repo search found no `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, or `Permissions-Policy` configuration.
- Impact:
  - If any XSS sink is introduced or untrusted content reaches rendering paths, exploit impact is higher without CSP and baseline browser hardening headers.
- Fix:
  - Add centralized security headers (prefer in `next.config.ts` `headers()` or proxy/edge config):
    - `Content-Security-Policy` (at minimum strict `script-src`)
    - `X-Content-Type-Options: nosniff`
    - `X-Frame-Options: DENY` (or CSP `frame-ancestors`)
    - `Referrer-Policy: strict-origin-when-cross-origin`
    - `Permissions-Policy` (feature-minimized)
- Mitigation (if immediate fix is hard):
  - Start with report-only CSP in staging and tighten incrementally.
- False positive notes:
  - Headers may exist at CDN/platform edge; verify runtime response headers in production.

### [SBP-002] Route slug used directly in filesystem path construction
- Rule ID: `NEXT-PATH-001`, `NEXT-INPUT-001`
- Severity: Medium
- Location:
  - `app/api/projects/[slug]/route.ts:28`
  - `app/api/projects/[slug]/route.ts:62`
  - `lib/blogs.ts:95`
  - `lib/projects.ts:85`
- Evidence:
  - `const slug = (await params).slug;`
  - `const filePath = path.join(rootDirectory, `${slug}.mdx`);`
  - `await fs.readFile(filePath, "utf8");`
- Impact:
  - If route decoding/normalization or future refactors allow separators/edge cases, attacker-controlled slugs could be used to attempt path traversal or unintended file access.
- Fix:
  - Validate slugs with a strict allowlist before path use (e.g., `^[a-z0-9-]+$`).
  - Resolve and enforce base-directory boundary after `path.resolve`.
  - Return `400` on invalid slug format.
- Mitigation:
  - Keep content in non-sensitive directories and avoid exposing filesystem errors.
- False positive notes:
  - Current single-segment route structure may reduce exploitability, but explicit validation is still recommended secure-by-default.

---

## Low Severity Findings

### [SBP-003] External links opened with `target="_blank"` without explicit `rel` protections in some places
- Rule ID: `JS-URL-002`
- Severity: Low
- Location:
  - `components/Header.tsx:18`
  - `components/project-card.tsx:53`
  - `components/project-card.tsx:68`
  - `app/work/[slug]/page.tsx:39`
  - `app/work/[slug]/page.tsx:53`
- Evidence:
  - External links use `target="_blank"` but do not consistently include `rel="noopener noreferrer"`.
- Impact:
  - Risk of reverse-tabnabbing or opener-based window interactions in environments where implicit protections are absent/inconsistent.
- Fix:
  - Add `rel="noopener noreferrer"` to all external `_blank` links.
  - Keep `referrerPolicy` only where intentional for privacy.
- Mitigation:
  - Centralize external link component enforcing safe defaults.
- False positive notes:
  - Some modern browsers apply implicit `noopener`, but explicit attributes remain best practice.

### [SBP-004] Unbounded query parameters in listing API endpoints
- Rule ID: `NEXT-INPUT-001`, `NEXT-DOS-001`
- Severity: Low
- Location:
  - `app/api/blogs/route.ts:9`
  - `app/api/blogs/route.ts:10`
  - `app/api/projects/route.ts:8`
  - `app/api/projects/route.ts:11`
- Evidence:
  - Numeric params are parsed directly from query string and used without range bounds.
- Impact:
  - Potential abuse (very large/negative values) can increase processing load or produce undefined behavior.
- Fix:
  - Add strict schema validation and clamp ranges (e.g., `1 <= page <= 10000`, `1 <= limit <= 100`).
- Mitigation:
  - Add edge/app rate limiting on anonymous API routes.
- False positive notes:
  - Current data size is small, so immediate impact is low.

### [SBP-005] Verbose error logging in API/lib paths can leak internal context to logs
- Rule ID: `NEXT-LOG-001`
- Severity: Low
- Location:
  - `app/api/blogs/route.ts:32`
  - `app/api/blogs/[slug]/route.ts:32`
  - `app/api/projects/route.ts:20`
  - `app/api/projects/[slug]/route.ts:51`
  - `lib/blogs.ts:114`
  - `lib/projects.ts:107`
- Evidence:
  - Raw error objects are logged directly (`console.error(..., error)`).
- Impact:
  - Logs can unintentionally capture stack traces/path data and become sensitive operational metadata.
- Fix:
  - Log structured, sanitized error messages with stable error codes; avoid dumping full error objects in production.
- Mitigation:
  - Restrict log access and retention.
- False positive notes:
  - This does not expose details to HTTP clients in current handlers.

---

## Positive Security Observations
- JSON-LD script content is escaped for `<` before injection (`app/blog/[slug]/page.tsx:101`), reducing script-breakout risk.
- Lockfile is present (`package-lock.json`) and `npm ci`-compatible workflow is possible.
- No hardcoded secrets were observed in code under reviewed paths.
- `next` and `eslint-config-next` are on the same modern major line (`16.1.6`).

---

## Suggested Secure-by-Default Improvement Plan
1. Add centralized security headers/CSP policy and verify on runtime responses.
2. Add strict slug validation + base-dir boundary checks before any filesystem read.
3. Standardize external link component with enforced `rel` and optional `referrerPolicy`.
4. Add query validation/range clamps and anonymous route rate limiting.
5. Switch to structured/redacted error logging for production.

---

## Notes / Limitations
- `npm audit` could not be executed due network resolution failure in this environment (`ENOTFOUND registry.npmjs.org`). Dependency vulnerability status is therefore not fully verified in this run.
