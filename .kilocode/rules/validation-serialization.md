# Validation & Serialization

- **JSON Schema Validation**: Every mutating endpoint must validate input using JSON Schema (`Validator.validate`) before hitting business logic.
- **Schema Placement**: Define JSON Schemas as TypeScript objects in `src/schemas/<domain>/<name>.schema.ts`.
- **Serialization**: Use `class‑transformer` with `classToPlainMiddleware` for consistent DTO serialization.