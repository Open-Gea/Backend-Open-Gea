# Coding Standards

- **TypeScript Strict**: Use strict TypeScript (`strict: true`). Always type function parameters and return values.
- **Naming Conventions**:
  - PascalCase for classes & decorators
  - camelCase for variables & functions
  - SCREAMING_SNAKE_CASE for immutable compile‑time constants
  - kebab‑case for filenames (except entities/DTOs use PascalCase when matching class)
- **Imports Order**: Group imports as: built‑in → third‑party → internal. Let `simple‑import‑sort` manage ordering.
- **Semicolons**: Always include semicolons.
- **Strings**: Prefer single quotes; use template literals for interpolation/multiline.
- **Error Handling**: Throw or propagate instances of `BaseError` (with `.code`) for expected domain errors. Never swallow errors silently.
- **Async/Await**: Use `async/await`. Avoid unhandled promise rejections. Wrap route handlers in try/catch or delegate to error middleware.
- **SOLID Principles**: Apply Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.
- **Pure Entities**: Keep TypeORM entities free of business logic (persistence models only).
- **Thin Repositories**: Repositories should be thin; orchestrate multi‑entity logic inside Services.