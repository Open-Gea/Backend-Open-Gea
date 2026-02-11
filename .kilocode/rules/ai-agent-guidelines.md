# AI Agent Specific Guidelines

- **Reuse Existing Utilities**: Always check `src/utils/` for existing classes/methods before implementing new logic.
- **No New Dependencies**: Avoid adding external dependencies without architectural justification; prefer libraries already in `package.json`.
- **Follow Domain Checklist**: When adding a new domain, follow the “Add a New Domain” checklist (Entity → Repository → Service → Schema → Router → Integration).
- **Middleware Order Integrity**: Ensure new routes are placed correctly in `YvYRouter` respecting the middleware order.
- **Provide Full Examples**: When scaffolding code, give complete, minimal examples (entity + service + route).
- **Use GenericService**: Where CRUD fits the pattern, reuse the existing `GenericService`.