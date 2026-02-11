---
name: backend-developer-open-source-nodejs
description: Backend development expertise for open‑source Node.js/TypeScript projects, emphasizing SOLID principles, clean code, and Open Gea project conventions.
---

# Backend Developer (Open‑Source Node.js) Skills

This skill provides guidance for backend development in Node.js/TypeScript, with a strong focus on SOLID principles, clean code, and alignment with the Open Gea project's established patterns.

## SOLID Principles in Practice

Apply the SOLID principles to ensure maintainable, extensible code:

1. **Single Responsibility Principle (SRP)**
   - Each class/function should have one reason to change.
   - Example: Separate validation logic from business logic, repository logic from service logic.

2. **Open/Closed Principle (OCP)**
   - Modules should be open for extension but closed for modification.
   - Use abstractions (interfaces) and dependency injection to allow new behavior without changing existing code.

3. **Liskov Substitution Principle (LSP)**
   - Subtypes must be substitutable for their base types.
   - Ensure inheritance hierarchies don't break client expectations.

4. **Interface Segregation Principle (ISP)**
   - Clients should not be forced to depend on interfaces they don't use.
   - Prefer small, focused interfaces over large, monolithic ones.

5. **Dependency Inversion Principle (DIP)**
   - Depend on abstractions, not concretions.
   - Inject dependencies (repositories, services) via constructors.

## Open Gea Development Guidelines

Refer to [`AGENTS.md`](AGENTS.md) for project‑specific standards. Key points:

### TypeScript Best Practices

- Use strict TypeScript configuration (`strict: true`).
- Always type function parameters and return values.
- Prefer `interface` for object shapes, `type` for unions/aliases.
- Use `enum` or `as const` for enumerated values.

### Coding Conventions

- **Naming**: PascalCase for classes/decorators, camelCase for variables/functions, SCREAMING_SNAKE_CASE for constants, kebab‑case for filenames (except entities/DTOs).
- **Imports**: Group by (built‑in, third‑party, internal) and let `simple‑import‑sort` manage ordering.
- **Semicolons**: Required.
- **Strings**: Single quotes; template literals for interpolation/multiline.
- **Error Handling**: Throw `BaseError` instances for domain errors; never swallow errors silently.
- **Async/Await**: Use `async/await`; avoid unhandled promise rejections.

### Project Structure Patterns

- **Entities**: TypeORM models under `src/entities/<domain>/`. Keep them pure (no business logic).
- **Repositories**: Data‑access objects in `src/data‑access/` or `src/repositories/`. Keep thin; delegate complex queries to services.
- **Services**: Business logic in `src/services/`. Stateless per request; orchestrate repositories and utilities.
- **Routes**: Express routers in `src/routes/<domain>/`. Lightweight; delegate to services after validation.
- **Schemas**: JSON Schema definitions in `src/schemas/<domain>/` for request validation.
- **Utilities**: Pure functions in `src/utils/` (calculations, helpers).

### Validation & Serialization

- Validate **every** mutating endpoint with JSON Schema (`Validator.validate`).
- Use `class‑transformer` with `classToPlainMiddleware` for consistent serialization.

### Security Practices

- Never log secrets (JWT, DB credentials, API keys).
- Sanitize file uploads (MIME validation, malware scanning).
- Enforce CORS origin whitelist via `ACCEPTED_ORIGIN` environment variable.
- Use short‑lived JWTs; verify signature before trusting claims.

### Performance & Reliability

- Batch database operations with transactions when atomicity is required.
- Create indexes for frequent query patterns (check with `EXPLAIN`).
- Avoid N+1 queries: use `relations` or `QueryBuilder` joins.
- Respect the global rate limit (100 req / 60s) unless explicitly overridden.

## Example: Implementing a New Feature

Follow the **Add a New Domain** checklist from [`AGENTS.md`](AGENTS.md):

1. **Entity** → **Repository** → **Service** → **Schema** → **Router** → **Integration**.

### Code Snippet Example

**Entity** (`src/entities/inventory/InventoryItem.entity.ts`):
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

**Service** (`src/services/inventory.service.ts`):
```ts
export class InventoryService {
    constructor(private repo: Repository<InventoryItem>) {}
    async list(): Promise<InventoryItem[]> { return this.repo.find(); }
    async create(input: CreateInventoryDTO) { return this.repo.save(input); }
}
```

**Router** (`src/routes/inventory.route.ts`):
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
    try {
        const item = await service.create(req.body);
        res.status(StatusCodes.CREATED).send(item);
    } catch (e) {
        next(e);
    }
});
```

## Testing & Quality

- Write unit tests for services and utilities (using Jest/Mocha).
- Write integration tests for routes (supertest).
- Ensure linting passes (`eslint` with Airbnb base + TypeScript + simple‑import‑sort).
- Run `tsc` to verify no compilation errors.

## Open‑Source Contribution Mindset

- Prefer reuse of existing utilities over reinvention.
- Choose libraries with permissive licenses (MIT, Apache‑2.0).
- Document public APIs and contribution guidelines.
- Follow conventional commits (`feat:`, `fix:`, `docs:`, etc.).

## References

- [Open Gea AGENTS.md](AGENTS.md) – project‑specific authoritative guidelines
- [SOLID Principles Explained](https://en.wikipedia.org/wiki/SOLID)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [TypeORM Documentation](https://typeorm.io/)