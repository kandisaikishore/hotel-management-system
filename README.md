# Hotel Management System — Front Desk

[![Repository](https://img.shields.io/badge/GitHub-Repository-181717?logo=github)](https://github.com/saikishore2410/hotel-management-system) [![Issues](https://img.shields.io/github/issues/saikishore2410/hotel-management-system)](https://github.com/saikishore2410/hotel-management-system/issues) [![Last Commit](https://img.shields.io/github/last-commit/saikishore2410/hotel-management-system)](https://github.com/saikishore2410/hotel-management-system/commits/main)

> This project provides a user interface for hotel staff to review rooms and manage the lifecycle of demo reservations. It is built as a front-end project with demo data by default.

## At a glance

- **Purpose:** Understand the problem and supported workflows from the feature and scope sections below.
- **Setup:** Follow the project-specific steps in **Getting started** or **Run locally**; verify commands against the current source and package scripts.
- **Configuration:** Keep API keys, database passwords, tokens, and user data out of commits. Use local environment variables for secrets.
- **Quality:** Run the available build, tests, and lint checks before proposing changes.



**A responsive front-desk dashboard for room availability and reservation workflows.**

This project provides a user interface for hotel staff to review rooms and manage the lifecycle of demo reservations. It is built as a front-end project with demo data by default.

## Highlights

- Front-desk metrics for reservations, room availability, occupancy, and expected arrivals
- Room grid grouped by floor
- Room status and type filters, plus a room details drawer
- Quick-booking workflow with guest details, date validation, and an estimated total
- Reservation actions for confirm, cancel, check-in, and check-out
- Unit/UI testing, CI validation, production build, and a GitHub Pages workflow (see repository configuration)

## Tech stack

- React
- Vite
- Tailwind CSS v4
- Lucide icons

## Requirements

- Node.js 20+
- npm 10+

## Quick start

```bash
git clone https://github.com/saikishore2410/hotel-management-system.git
cd hotel-management-system
npm ci
npm run dev
```

## Quality checks

```bash
npm test
npm run build
```

Review `package.json` for all available scripts.

## Data and production readiness

The application uses demo data by default. Before using it in a real hotel, implement and verify server-side persistence, authentication and role-based access, audit logging, data protection, backups, and concurrency-safe reservation rules.

## Contributing

Please include issue reproduction steps and tests for behaviour changes.

## License

No license is specified. Add a `LICENSE` file to define reuse terms.