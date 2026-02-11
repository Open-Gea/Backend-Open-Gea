# Error Handling & Logging

- **Error Response Shape**: Return `{ "message": string, ...optional context }` for errors. Use HTTP status codes from `http‑status‑codes`.
- **Structured Logging**: Use `logger().info|warn|error` (pino/tslog). Include structured metadata (object form).
- **Log Context**: Include userId, route, entity id in error logs.
- **External API Logging**: Log request latency and status for external API calls (weather, etc.).