# DevOps & Deployment

- **Docker Best Practices**: Use multi‑stage builds, pin base image tags, set non‑root user, include `.dockerignore`.
- **Migrations**: Generate migrations via `npm run migration:generate`; review before committing; run on deployment.
- **CI/CD**: Implement GitHub Actions workflows for lint, type‑check, test, build, security scan.
- **Health Checks**: Provide `/` health endpoint for readiness probes.