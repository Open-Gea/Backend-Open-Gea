---
name: documentation
description: Write clear, comprehensive documentation for open‑source software projects, including READMEs, API docs, contributing guides, and inline code comments.
---

# Documentation Skills

This skill provides guidance for creating and maintaining high‑quality documentation for open‑source projects, with a focus on the Open Gea backend. Good documentation enables contributors, users, and maintainers to understand, use, and extend the project effectively.

## Documentation Types & Their Purposes

1. **README.md** – Project overview, getting started, installation, basic usage.
2. **API Documentation** – Endpoint descriptions, request/response examples, authentication details.
3. **Contributing Guidelines** (`CONTRIBUTING.md`) – How to contribute, pull request process, code of conduct.
4. **Code Comments** – Inline explanations of non‑obvious logic, JSDoc/TSDoc for public APIs.
5. **Architectural Documentation** (e.g., `AGENTS.md`) – High‑level design, coding standards, project structure.
6. **Tutorials & Guides** – Step‑by‑step instructions for common tasks.
7. **Changelog** (`CHANGELOG.md`) – Record of changes between versions.

## Principles of Effective Documentation

- **Clarity**: Use simple, direct language. Avoid jargon unless defined.
- **Completeness**: Provide enough detail for the intended audience to succeed.
- **Accuracy**: Keep documentation synchronized with the codebase.
- **Consistency**: Follow the same style, tone, and formatting throughout.
- **Accessibility**: Use headings, lists, code blocks, and links to improve readability.
- **Maintainability**: Write documentation that is easy to update as the project evolves.

## Open Gea Documentation Standards

Refer to the existing documentation (`README.md`, `CONTRIBUTING.md`, `AGENTS.md`, endpoint markdown files in `docs/`) as reference models.

### README.md Structure

A typical README for Open Gea should include:

1. **Project Title & Badges** (version, license, build status)
2. **Brief Description** – What the project does and its goals.
3. **Origin & Context** – Relationship to YvY, open‑source nature.
4. **User Roles** – Producer, Organization, Administrator.
5. **Modules / Features** – List of available functionality.
6. **Technology Stack** – PostgreSQL, Node.js, external APIs.
7. **Getting Started** – Prerequisites, installation, environment setup.
8. **Running Locally** – Database initialization, scripts, starting the server.
9. **Available Scripts** – Table of npm scripts with descriptions.
10. **Contributing** – Link to CONTRIBUTING.md.
11. **License** – Apache‑2.0.
12. **Contact & Links** – TSC members, Slack channel, issue tracker.

### API Documentation

Each endpoint should be documented in a separate Markdown file under `docs/` (e.g., `auth.endpoint.md`). Include:

- **HTTP Method & Path**
- **Description** – What the endpoint does.
- **Authentication** – Required (JWT) or public.
- **Request Parameters** – Path, query, body (with example JSON).
- **Response** – Success (HTTP status, example JSON) and error responses.
- **Example** – curl command or equivalent.
- **Notes** – Special considerations, rate limits, etc.

Example format:
```markdown
## POST /api/auth/login

Authenticates a user and returns a JWT token.

**Authentication**: None (public)

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

**Success Response (200)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "uuid", "email": "user@example.com", "role": "producer" }
}
```

**Error Responses**:
- 400 – Invalid email or password format
- 401 – Invalid credentials
- 500 – Server error

**Example**:
```bash
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}'
```
```

### Contributing Guidelines

Follow the structure of `CONTRIBUTING.md`:

- **Ways to Contribute** – Reporting bugs, improving docs, coding, testing.
- **Technical Steering Committee (TSC)** – Members and responsibilities.
- **Pull Request Process** – Fork, commit, submit, review, merge.
- **Code of Conduct** – Pledge, standards, enforcement.
- **Developer Certificate of Origin (DCO)** – Requirement for contributions.

### Inline Code Comments

- Use JSDoc/TSDoc for public functions, classes, methods.
- Explain **why** non‑obvious code exists, not **what** it does (the code already shows that).
- Avoid redundant comments (e.g., `// increments i` next to `i++`).
- Mark TODOs, FIXMEs with issue references when possible.

Example TSDoc:
```ts
/**
 * Calculates the water footprint for a given crop and location.
 * Uses the FAO Penman‑Monteith equation with local weather data.
 *
 * @param cropCoefficient - Kc value for the crop (0–1.5)
 * @param evapotranspiration - Reference evapotranspiration (mm/day)
 * @param areaHa - Area in hectares
 * @returns Water footprint in cubic meters
 * @throws {BaseError} If inputs are out of valid ranges
 */
export function calculateWaterFootprint(
  cropCoefficient: number,
  evapotranspiration: number,
  areaHa: number
): number { ... }
```

## Writing for Different Audiences

- **New Contributors**: Provide step‑by‑step setup instructions, explain project structure, link to `AGENTS.md`.
- **Developers**: Focus on API contracts, architectural decisions, coding standards.
- **End‑Users** (if applicable): Document available features, how‑to guides, troubleshooting.
- **Maintainers**: Include release procedures, deployment, monitoring.

## Maintaining Documentation

- **Review documentation** as part of code reviews.
- **Update documentation** whenever the corresponding code changes.
- **Use relative links** to other project files (e.g., `[AGENTS.md](AGENTS.md)`).
- **Version documentation** alongside code releases (tag versions, keep changelog).

## Tools & Automation

- **Markdown linting** – Use `markdownlint` to enforce consistent formatting.
- **API documentation generators** – Consider tools like `swagger‑ui‑express` or `typedoc` for auto‑generation.
- **Pre‑commit hooks** – Ensure documentation updates are not forgotten.

## Checklist for New Documentation

1. **Identify audience** (contributor, developer, user).
2. **Choose appropriate format** (README, API doc, guide).
3. **Follow existing project style** (headings, code blocks, links).
4. **Include examples** that can be copied and pasted.
5. **Link to related resources** (`AGENTS.md`, other endpoints, external references).
6. **Proofread** for clarity, accuracy, and typos.
7. **Submit for review** (just like code).

## References

- [Open Gea AGENTS.md](AGENTS.md) – project‑specific authoritative guidelines
- [Open Gea README.md](README.md) – example of project overview
- [Open Gea CONTRIBUTING.md](CONTRIBUTING.md) – contribution guidelines
- [Markdown Guide](https://www.markdownguide.org/)
- [Write the Docs](https://www.writethedocs.org/guide/) – community best practices
- [Google Developer Documentation Style Guide](https://developers.google.com/style)