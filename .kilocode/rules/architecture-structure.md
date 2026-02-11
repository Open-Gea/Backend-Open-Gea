# Architecture & Structure

- **Layered Architecture**: Follow the established layered structure:
  1. Routes (`src/routes`) – Express routers
  2. Middlewares (`src/middlewares`) – auth, validation, serialization
  3. Services (`src/services`) – business logic
  4. Repositories / Data‑Access (`src/data‑access`, `src/repositories`) – TypeORM repositories
  5. Entities (`src/entities`) – TypeORM models
  6. Schemas (`src/schemas`) – JSON Schema validation
  7. Utilities (`src/utils`) – pure calculations, helpers
- **Domain‑Driven Organization**: Group code by bounded contexts (User, Farm, Carbon Footprint, Soil Regeneration, etc.). Each domain must have its own entity, repository, service, schema, and router.
- **Middleware Order**: Preserve the global middleware order in `YvYRouter`:
  1. Auth endpoints (public)
  2. `classToPlainMiddleware`
  3. Public QR route (with schema validation)
  4. `authorize` middleware (JWT protection)
  5. Domain‑specific routers
- **File Placement**:
  - Entities → `src/entities/<domain>/`
  - Repositories → `src/data‑access/<domain>/` or `src/repositories/`
  - Services → `src/services/` (or domain subfolder)
  - Routes → `src/routes/<domain>/`
  - Schemas → `src/schemas/<domain>/`