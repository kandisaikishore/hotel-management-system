# Scalability and capacity plan

## Backend and database
- Keep API instances stateless and move sessions/shared state to a shared store where required.
- Paginate room, guest, reservation, and reporting endpoints with bounded page sizes.
- Add indexes from actual slow-query plans, especially reservation lookup patterns; verify impact on writes.
- Use database transactions and appropriate locking/constraints to prevent overlapping room reservations under concurrent requests.
- Configure database pool limits and connection timeouts with the total replica connection budget in mind.
- Run versioned schema migrations as a controlled deployment step, not independently from every replica.

## Frontend and service operations
- Lazy-load reports and infrequently used screens.
- Bound file uploads and report-generation workloads.
- Add readiness/liveness checks, structured logs, request IDs, and dependency timeouts.
- Keep secrets in deployment environment configuration and run containers as non-root.

## Validation gates
- [ ] Concurrent reservation tests prove no double booking.
- [ ] Pagination and validation cover all high-volume list endpoints.
- [ ] Migration and backup/restore procedures are exercised.
- [ ] API and frontend builds pass in CI.
- [ ] Load testing records p95/p99 latency, throughput, DB pool wait, and error rates.

No production capacity increase should be made without measured test results.
