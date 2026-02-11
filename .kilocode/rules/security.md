# Security

- **No Secret Logging**: Never log secrets (JWT, passwords, DB credentials, API keys).
- **File Upload Sanitization**: Sanitize filenames, validate MIME types, and scan uploaded files with ClamAV.
- **CORS Whitelist**: Use `ACCEPTED_ORIGIN` environment variable (comma‑separated) for origin whitelist; never broad‑enable `*` when credentials are true.
- **JWT Practices**: Use short‑lived tokens; verify signature before trusting claims.
- **Input Validation**: Validate all inputs; no dynamic SQL – rely on parameterized queries.
- **Rate Limiting**: Respect the global rate limit (100 req / 60s) unless explicitly overridden for a specific route.