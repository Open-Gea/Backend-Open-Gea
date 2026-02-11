---
name: devops-open-source
description: DevOps practices for open‑source Node.js projects: CI/CD, Docker, database migrations, monitoring, logging, and deployment.
---

# DevOps Open‑Source Skills

This skill provides guidance for implementing DevOps practices in open‑source Node.js/TypeScript projects like Open Gea. Focus on automation, reproducibility, security, and observability.

## Core DevOps Principles

1. **Infrastructure as Code**: Define infrastructure (Docker, CI/CD pipelines) in version‑controlled configuration files.
2. **Automation**: Automate repetitive tasks (testing, building, deployment, database migrations).
3. **Monitoring & Observability**: Collect logs, metrics, and traces to understand system behavior and detect issues.
4. **Security**: Integrate security scanning (dependencies, containers) and secret management.
5. **Collaboration**: Use CI/CD to enforce quality gates and enable reproducible deployments.

## Open Gea DevOps Context

Refer to [`AGENTS.md`](AGENTS.md) for project‑specific standards. The project currently uses:

- **Docker** for containerization (see `Dockerfile`)
- **TypeORM** for database migrations (scripts in `package.json`)
- **Node.js** runtime (version >=18.19.0)
- **PostgreSQL** as primary datastore
- **GitHub** for source control (with issue and pull request templates)

### Docker & Containerization

**Dockerfile Best Practices**:

- Use multi‑stage builds to reduce final image size.
- Pin base image tags (e.g., `node:18-alpine`) for reproducibility.
- Install only necessary system packages (e.g., `clamav` for malware scanning).
- Set non‑root user for security.
- Use `.dockerignore` to exclude development files.

Example improved Dockerfile (conceptual):
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs
WORKDIR /app
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
EXPOSE 8080
ENTRYPOINT ["node", "dist/index.js"]
```

**Docker Compose**: Consider adding a `docker‑compose.yml` for local development with PostgreSQL, localstack (S3 emulation), and the application.

### Database Migrations

- Migrations are generated via `npm run migration:generate`.
- Always review generated migration files before committing (ensure no unsafe `DROP`).
- Run migrations on deployment via `npm run migration:run`.
- Include rollback capability (`npm run migration:revert`).

**Migration Guidelines**:
- Keep migrations idempotent where possible (use `IF NOT EXISTS`).
- Avoid locking production tables for long periods.
- Test migrations in a staging environment before production.

### CI/CD (Continuous Integration / Continuous Deployment)

**GitHub Actions** (recommended for open‑source projects):

- Create workflows under `.github/workflows/`.
- Typical steps: lint, type‑check, test, build, security scan, deploy.

Example workflow skeleton:
```yaml
name: CI
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '18' }
      - run: npm ci
      - run: npm run lint   # if lint script exists
  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '18' }
      - run: npm ci
      - run: npx tsc --noEmit
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '18' }
      - run: npm ci
      - run: npm test
```

**Deployment**:
- Consider deploying to platforms like Heroku, Railway, AWS ECS, or Kubernetes.
- Use environment variables for configuration (never commit secrets).
- Implement health checks (`/` health endpoint) for readiness probes.

### Environment Configuration

- Store configuration in environment variables (see `AGENTS.md` §11).
- Validate required variables on application startup.
- Use `.env` files for local development (excluded from Git).

### Logging & Monitoring

- Use structured logging (`tslog` or `pino`) as configured in `src/logger.ts`.
- Include correlation IDs for request tracing.
- Export metrics (e.g., request duration, error rates) to a monitoring system (Prometheus, Datadog).
- Set up alerts for critical errors (5xx HTTP status, database connection failures).

### Security Scanning

- **Dependencies**: Use `npm audit` or GitHub Dependabot to detect vulnerabilities.
- **Container images**: Scan with tools like Trivy or Grype.
- **Secrets**: Use GitHub Secrets or external secret managers (Hashicorp Vault, AWS Secrets Manager).
- **File uploads**: Already scanned with ClamAV (integrated via `clamscan`).

### Backup & Disaster Recovery

- Regular database backups (use `pg_dump` or managed service backups).
- Test restoration procedure periodically.
- Store backups in geographically separate location.

### Performance & Scalability

- Use a connection pool for PostgreSQL (configured in TypeORM `DataSource`).
- Consider read replicas for heavy read loads.
- Implement caching (Redis) for frequently accessed data (e.g., weather forecasts).
- Use a CDN for static assets (if any).

## Open‑Source Considerations

- Choose CI/CD tools that are free for open‑source projects (GitHub Actions, Travis CI, CircleCI).
- Use open‑source monitoring stacks (Prometheus + Grafana).
- Document the DevOps setup in `README.md` or `docs/` to help contributors.

## Checklist for New DevOps Contributions

1. **Docker**: Update `Dockerfile` following best practices.
2. **CI/CD**: Add or update GitHub Actions workflows.
3. **Migrations**: Ensure migration scripts are safe and tested.
4. **Monitoring**: Enhance logging and add metrics if needed.
5. **Security**: Integrate vulnerability scanning.
6. **Documentation**: Update relevant docs (deployment guide, environment variables).

## References

- [Open Gea AGENTS.md](AGENTS.md) – project‑specific authoritative guidelines
- [Docker Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [TypeORM Migrations](https://typeorm.io/migrations)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Node.js Production Best Practices](https://nodejs.org/en/learn/getting-started/nodejs-production-best-practices)