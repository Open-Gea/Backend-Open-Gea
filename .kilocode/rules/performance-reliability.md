# Performance & Reliability

- **Database Transactions**: Batch DB operations with transactions where atomicity is required.
- **Indexes**: Create indexes for frequent query patterns (check with `EXPLAIN`).
- **Avoid N+1 Queries**: Prefer `relations` or `QueryBuilder` joins.
- **Connection Pooling**: Use a connection pool configured in TypeORM `DataSource`.