---
name: architect-designer
description: Design software architecture for Node.js/TypeScript backend projects, focusing on layered architecture, domain-driven design, and Open Gea project conventions.
---

# Architect Designer Skills

This skill provides guidance for designing and evaluating software architecture, especially for Node.js/TypeScript backend projects like Open Gea. Follow these principles to ensure maintainability, scalability, and alignment with existing project standards.

## Core Architectural Principles

1. **Layered Architecture**: Adopt the established Open Gea layered structure:
   - Routes (Express routers)
   - Middlewares (auth, validation, serialization)
   - Services (business logic)
   - Data Access / Repositories (TypeORM)
   - Entities (TypeORM models)
   - Schemas (JSON schema validation)
   - Utilities (calculations, helpers)

2. **Separation of Concerns**: Each layer has a distinct responsibility; avoid mixing presentation, business logic, and data access.

3. **Domain-Driven Design**: Organize code by bounded contexts (User, Farm, Carbon Footprint, Soil Regeneration, etc.). Each domain should have its own entities, repositories, services, and schemas.

4. **Open‑Source Friendly**: Prefer free/open‑source libraries over proprietary solutions. Ensure licensing compatibility (MIT, Apache‑2.0).

5. **Security by Design**: Integrate authentication, authorization, input validation, and rate‑limiting from the outset.

## Open Gea Specific Guidelines

Refer to the authoritative project guidelines in [`AGENTS.md`](AGENTS.md) for detailed coding standards, folder structure, and technology stack.

### When Adding a New Domain (Checklist)

1. **Entity**: Create TypeORM entity under `src/entities/<domain>/`
2. **Repository**: If needed, add a custom repository in `src/data‑access/<domain>/`; otherwise rely on generic repository.
3. **Service**: Implement service class in `src/services/` (or domain subfolder) that orchestrates business logic.
4. **Schema**: Define JSON Schema(s) for request validation in `src/schemas/<domain>/`
5. **Router**: Create Express router in `src/routes/<domain>/` with proper validation and authorization.
6. **Integration**: Wire the service into `YvYService` and the router into `YvYRouter` (following middleware order).
7. **Migration**: Generate and apply TypeORM migration for new tables/columns.
8. **Documentation**: Update relevant documentation (API docs, README).

### Middleware Order (Critical)

When inserting new routes, preserve the global middleware order defined in `YvYRouter`:

1. Auth endpoints (public)
2. `classToPlainMiddleware`
3. Public QR route (with schema validation)
4. `authorize` middleware (JWT protection)
5. Domain‑specific routers

### Technology Stack Decisions

- **Runtime**: Node.js + TypeScript (strict mode)
- **Framework**: Express
- **ORM**: TypeORM with PostgreSQL
- **Validation**: JSON Schema (jsonschema)
- **Serialization**: class‑transformer (`classToPlain`)
- **Authentication**: JWT (jsonwebtoken)
- **File Storage**: AWS S3 / IBM COS abstraction (replaceable with localstack for local development)
- **Logging**: pino / tslog (structured logs)

### Performance & Scalability Considerations

- Use database indexes for frequent query patterns.
- Avoid N+1 queries by leveraging TypeORM relations or query builder joins.
- Implement caching for expensive computations (e.g., weather data) with TTL.
- Consider asynchronous processing for long‑running tasks (e.g., report generation).

### Reviewing Existing Architecture

When reviewing architecture changes, verify:

- Consistency with the layered structure
- Proper error handling (using `BaseError`)
- Input validation on all mutating endpoints
- No hard‑coded secrets or environment‑specific values
- Adherence to security practices (CORS, rate limiting, file upload scanning)

## References

- [Open Gea AGENTS.md](AGENTS.md) – project‑specific authoritative guidelines
- [TypeORM Documentation](https://typeorm.io/)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Domain‑Driven Design Fundamentals](https://domainlanguage.com/ddd/)