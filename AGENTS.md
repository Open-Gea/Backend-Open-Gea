# Open Gea – Project Context & Authoritative Guidelines for AI Agents

These instructions tailor AI agent suggestions for the Open Gea Backend (Node.js + TypeScript, PostgreSQL, TypeORM, Express). Follow them when generating, refactoring, or extending code. Prefer reuse over reinvention.

---

## 1. Project Overview

Open Gea (forked from YvY) is an open‑source backend API powering a regenerative agriculture web platform. Core domains:

* User & Cooperative management (roles: producer, organization, admin)
* Farms & Products
* Carbon footprint (v1 & v2) and Water footprint calculations
* Weather, seasonal and agronomic data ingestion + forecasting
* Soil regeneration modules (cover, tillage, fertilization, pruning, crop rotation / irrigation systems)
* Records (lots, performances, sowing, labors, soils, staff, sales, suppliers, agrochemicals, revenues/expenses, phyto, product info)
* Sustainability self‑assessment (autodiag v1 & v2)
* QR Settings & Reports

Goals: Accurate environmental footprint metrics, traceability, data integrity, secure multi‑tenant access, extensibility for future sustainability modules.

**Open‑Source Nature**: This project is developed openly, welcoming contributions from developers, agronomists, testers, and other stakeholders. The codebase is a fork of the closed‑source YvY project, preserving its architecture while replacing proprietary services with free/open alternatives where possible.

---

## 2. High‑Level Architecture

Layered structure:

1. **Routes** (`src/routes`) – Express routers; light parameter extraction and middleware composition.
2. **Middlewares** (`src/middlewares`) – Auth (`authorization.middleware`), schema validation, file processing, serialization (`classToPlain`), URL parsing, rate limiting (global), CORS.
3. **Services** (`src/services`) – Business logic orchestrating repositories and utilities; stateless (per request) aside from constructed dependencies.
4. **Data Access / Repositories** (`src/data‑access`, `src/repositories`) – TypeORM entity repositories; central aggregator `YvYRepository` supplies strongly‑typed repos to services.
5. **Entities** (`src/entities`) – TypeORM models (per domain subfolder) + relationships.
6. **Schemas** (`src/schemas`) – JSON Schemas (jsonschema) used for request validation via `Validator.validate`.
7. **Utilities** (`src/utils`) – Calculations (carbon/water), error helpers (`BaseError`), email, file scanning, generic helpers.
8. **Scripts** (`src/scripts`, `db/scripts`) – Initialization, data loading, migrations, backups.
9. **Config** (`src/config`) – Data source (`data‑source.ts`), dynamic entity registration, initialization logic.

Server bootstrap (`src/server.ts`): loads env, initializes DataSource, constructs `YvYRepository` then `YvYService` aggregator then `YvYRouter`. Rate limiting, security, CORS, JSON body, logging order matters. Root endpoints: `/` (health), `/test` (deploy check).

---

## 3. Folder Structure (Relevant Excerpts)

```
Dockerfile
package.json
db/
    migrations/        # TypeORM timestamped migrations
    scripts/          # DB CLI (backup, restore, migration generate/run)
src/
    server.ts
    index.ts
    logger.ts
    config/
        data‑source.ts
        entities.ts
    routes/
        index.ts      # YvYRouter root aggregator
        auth/, farm/, carbonFootprint/, ... (domain routers)
    middlewares/
    services/
        index.ts      # YvYService dependency composition
    repositories/     # Domain‑specific or generic repo facades
    data‑access/      # DAO utilities and composite repository
    entities/         # TypeORM Entities grouped by domain
    schemas/          # JSON schemas (jsonschema)
    models/           # DTO / type layer (API contracts)
    utils/            # Calculations, error, validation helpers
    scripts/          # App‑level scripts (init db, load data)
mock/                # Static test / seed fixtures
uploads/             # User‑uploaded media (ensure validation)
```

When adding new domain functionality replicate the pattern: entities → repository/repositories → service → schema(s) → router → integration in `YvYService` and `YvYRouter`.

---

## 4. Tech Stack & Key Libraries

**Runtime & Core:**

* Node.js + TypeScript
* Express (HTTP API)
* TypeORM (ORM / migrations)
* PostgreSQL (primary datastore)

**Validation & Serialization:**

* jsonschema (JSON schema validation)
* class‑transformer (DTO serialization via `classToPlainMiddleware`)

**Security & Auth:**

* jsonwebtoken (JWT auth)
* bcrypt (password hashing)
* express‑rate‑limit (anti‑abuse)
* helmet (HTTP headers hardening)
* cors (origin control)
* clamscan (malware scanning uploaded files)

**Cloud / Storage:**

* AWS SDK S3 (object storage abstraction – also IBM COS compatibility)
* ibm‑cos‑sdk (IBM Cloud Object Storage) – **optional**; can be replaced with localstack or other free object storage for local development.

**Utilities:**

* date‑fns, timezone‑support, tz‑lookup (temporal + timezone computations)
* mathjs (advanced calculations)
* uuid (identifiers)
* axios (external API calls: weather, etc.)
* nodemailer (email)
* xlsx (spreadsheet import/export)

**Observability & Logging:**

* morgan (HTTP access logs)
* pino / tslog (structured app logs)

**Build / Dev Tooling:**

* typescript, ts‑node, nodemon
* eslint (+ airbnb base + typescript + simple‑import‑sort) & prettier
* husky (git hooks), standard‑version (versioning), commitlint

Referenced versions are in `package.json`; keep compatibility when upgrading – prefer minor bumps unless API changes are required.

---

## 5. Coding Standards & Conventions

**General:**

* Language: TypeScript (strict where feasible). Always type public function inputs/outputs.
* Naming: PascalCase for classes & decorators; camelCase for variables/functions; SCREAMING_SNAKE_CASE for immutable compile‑time constants; kebab‑case for filenames except entities/DTOs using PascalCase when matching class.
* Imports: Use absolute or controlled relative paths; group by (builtin, 3rd party, internal) and let `simple‑import‑sort` manage ordering.
* Semicolons: Required.
* Strings: Prefer single quotes; template literals for interpolation/multiline.
* Error Handling: Throw or propagate instances of `BaseError` (with `.code`) for expected domain errors; never swallow errors silently—log with context.
* Async: Use `async/await`. Avoid unhandled promise rejections. Wrap route handlers with try/catch sending structured error response or delegate to error middleware.
* Validation: Every mutating endpoint must validate input using jsonschema schema validation (`Validator.validate`) before hitting core business logic.
* Logging: Use centralized `logger()` (pino / tslog) – no `console.log` in committed code (except temporary scripts).
* Side Effects: Keep pure calculations in `src/utils/`.
* Magic Numbers / Strings: Centralize in constants (e.g., rate limits, default pagination size).
* Commits: Conventional Commits (enforced by commitlint). Examples: `feat(farm): add irrigation efficiency field`.
* Always apply Clean Code and SOLID principles where feasible.

**TypeORM & Data Layer:**

* Entities live under domain subfolders; include explicit column types & indexes where performance‑critical.
* Avoid business logic in entities (keep them as persistence models only).
* Repositories should remain thin; orchestrate multi‑entity logic inside a Service.
* Migrations must be generated via provided script and reviewed (no unsafe `DROP` without fallback).

**Security:**

* Never log secrets (JWT, passwords, DB creds, API keys).
* Always sanitize file uploads and validate MIME where relevant.
* Ensure CORS origin whitelist uses `ACCEPTED_ORIGIN` env (comma‑separated) – do not broad‑enable `*` when credentials are true.
* JWT: Short‑lived tokens; refresh logic (if implemented) separated; verify signature before trusting claims.

**Performance & Reliability:**

* Batch DB operations with transactions where atomicity is required.
* Use indexes for query patterns appearing in services (EXPLAIN if slow).
* Avoid N+1 queries: prefer `relations` or `QueryBuilder` joins.
* Rate limiter currently global (100 req / 60s); keep consistent when adding sub‑routers unless explicit override.

**Error Response Shape:**

```json
{ "message": string, ...optional domain‑specific context }
```

Use HTTP status codes from `http‑status‑codes` or explicit numeric constants (prefer enum import).

---

## 6. Validation Patterns

1. Define JSON Schema as a TypeScript object in `src/schemas/<domain>/<name>.schema.ts` (or .json).
2. Import Validator from 'jsonschema' and the schema in the route file.
3. Call `Validator.validate(requestBody, schema)` and check `validation.valid`. If invalid, respond with 400 and error details.
4. For file + JSON combos, validate metadata first then process file (ordering matters vs. `processFiles.middleware`).

Custom Formats: Not applicable (jsonschema does not have custom formats by default; extend with custom validation if needed).

---

## 7. Routing & Middleware Order (Critical)

In `YvYRouter`:

1. Auth endpoints (`/auth`) – public.
2. `classToPlainMiddleware` – apply serialization early for later responses.
3. Public setting QR route (with schema validation) before `authorize`.
4. `authorize` middleware – protects subsequent routes (JWT).
5. Domain routers (users, farms, footprints, soil regeneration, records, etc.) each leaning on service layer.

Maintain this ordering when inserting new routes. If adding a new public route, place it before `authorize` with explicit schema validation.

---

## 8. Adding a New Domain (Checklist)

Example: Add "inventory" domain.

1. Create Entity: `src/entities/inventory/InventoryItem.entity.ts`.
2. Update entity export list if using dynamic loader (`entities.ts`).
3. Add Repository if custom behavior needed or rely on generic via `GenericService`.
4. Add Service: `InventoryService` extending domain logic (transactions, cross‑entity rules).
5. Define JSON Schemas: create/update (e.g., `createInventoryItemSchema`).
6. Add Router: `inventoryRouter(service, validateSchema(create...), validateSchema(update...))` (where validation is performed using `Validator.validate`).
7. Wire Service in `YvYService` constructor (after repository injection).
8. Wire Router in `YvYRouter` after `authorize` (or before if intentionally public with justification).
9. Add migration for new table/columns.
10. Add script/seeds if required.
11. Update documentation & tests (future test suite).

---

## 9. Error Handling Pattern

* Throw `new BaseError(message, httpCode?)` for predictable domain failures (e.g., not found, validation edge not captured by schema, permission issues).
* Let generic error middleware convert to `{ message }` payload.
* Log error with context: userId, route, entity id.
* Avoid leaking internal stack traces to clients.

---

## 10. Logging Guidelines

* Use `logger().info|warn|error`.
* Include structured metadata (object form) not concatenated strings.
* For success events of bulk operations, log counts not raw arrays.
* For external API calls (weather), log request latency + status if degraded.

---

## 11. Environment Variables (Indicative)

```
PORT=8001
ACCEPTED_ORIGIN=https://app.example.com,https://another.example
DATABASE_URL=postgres://user:pass@host:5432/db
JWT_SECRET=... (keep secret)
S3_BUCKET=...
IBM_COS_ENDPOINT=...   # optional; can be omitted for localstack
NODE_ENV=local|dev|prod
```

Never hardcode secrets; reference via `process.env`. Validate required envs on startup (add a small guard if missing).

---

## 12. Security Practices (Recap)

* Input validation everywhere; no dynamic SQL – rely on parameterized queries.
* Sanitize filenames & scan uploads (ClamAV).
* Enforce least privilege on S3 / COS credentials.
* Rate limit already applied globally – extend granularly if adding brute‑force sensitive routes.

---

## 13. Style Examples

**Entity:**

```ts
@Entity('inventory_items')
export class InventoryItem {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({ type: 'text' }) name: string;
    @Column({ type: 'int', default: 0 }) quantity: number;
    @CreateDateColumn() createdAt: Date;
    @UpdateDateColumn() updatedAt: Date;
}
```

**Service (pure orchestration):**

```ts
export class InventoryService {
    constructor(private repo: Repository<InventoryItem>) {}
    async list(): Promise<InventoryItem[]> { return this.repo.find(); }
    async create(input: CreateInventoryDTO) { return this.repo.save(input); }
}
```

**Router snippet:**

```ts
router.post('/', async (req, res, next) => {
    const validation = Validator.validate(req.body, createInventoryItemSchema);
    if (!validation.valid) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Invalid request body',
            errors: validation.errors.map((error) => error.stack),
        });
        return;
    }
    try { const item = await service.create(req.body); res.status(StatusCodes.CREATED).send(item); }
    catch (e) { next(e); }
});
```

---

## 14. AI Agent Prompting Guidelines

When generating code:

* Reuse existing utilities (e.g., error, validation, logger) – do not duplicate logic.
* For each layer check on utils folder to implement or extend existing utilities like classes or methods.
* Suggest TypeScript typings explicitly.
* Prefer small, composable functions.
* Remind to add JSON schema for any new endpoint.
* Avoid adding new external dependencies without architectural reason; if necessary, highlight justification in PR.
* Keep middleware order intact.
* Ensure new routes are added to `YvYRouter` & services to `YvYService`.
* Avoid mixing presentation (serialization) with service logic.

**Do:**

* Provide full minimal examples (entity + service + route) when scaffolding.
* Use existing `GenericService` where CRUD fits pattern.
* Consider transaction usage for multi‑entity writes.

**Avoid:**

* Writing raw SQL inline unless performance‑critical (then justify & parameterize).
* Adding environment variable reads deep in low‑level helpers (keep near boundaries or config layer).
* Hardcoding constants already defined elsewhere.

---

## 15. Future Enhancements (For Awareness)

* Add automated test suite (Mocha/Chai or Jest) – generate factories for entities.
* Introduce centralized config validation (Zod or env schema) pre server start.
* Observability: structured request correlation id middleware.
* Caching layer for heavy computation (e.g., weather aggregation) with TTL.

Until implemented, AI agents should not hallucinate these features—only reference them if asked explicitly.

---

## 16. Quick Reference Checklist (Add Feature)

1. Entity + Migration
2. Repository (or use generic)
3. Service
4. JSON Schema(s)
5. Router + Validation + Authorization placement
6. Wire in `YvYService` & `YvYRouter`
7. Update docs & scripts as needed
8. Run build + migrations locally before PR

---

## 17. Definition of Done (Backend Change)

* Build passes (tsc) & lints clean.
* New endpoints validated & secured.
* Error cases covered (not found, forbidden, validation fail).
* No sensitive data logged.
* Migration applied & rollback tested.

---

By following these guidelines, AI agents should generate context‑aware, secure, and maintainable contributions aligned with existing project architecture.

---

*This document is adapted from the original YvY copilot‑instructions.md, updated for the Open Gea open‑source project. Contributions to improve these guidelines are welcome.*