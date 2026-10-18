# Hotel Management System — Front Desk

[![Source](https://img.shields.io/badge/Source-GitHub-181717?logo=github)](https://github.com/kandisaikishore/hotel-management-system) [![Last Commit](https://img.shields.io/github/last-commit/kandisaikishore/hotel-management-system)](https://github.com/kandisaikishore/hotel-management-system/commits/main)

A hotel-management application project for exploring guest and front-desk workflows. The repository provides a foundation for organizing hotel operations; use the actual application code to determine which booking, room, and guest flows are currently supported.

## Project goals

- Present guest and room information clearly
- Support the front-desk workflows implemented by the application
- Reduce errors through input validation and consistent status handling
- Provide a foundation for reporting and operational improvements

## Getting started

```bash
git clone https://github.com/kandisaikishore/hotel-management-system.git
cd hotel-management-system
```

Review the project manifests and setup files for framework prerequisites, environment variables, and startup commands. Keep credentials and any real guest information out of version control.

## Quality checklist

- Validate guest details, room identifiers, and date inputs
- Prevent overlapping bookings where reservation logic exists
- Check room availability and status transitions
- Verify access controls for personal and payment-related data
- Test empty states, errors, and persistence behaviour
- Document backup and recovery procedures before production use

## Contributing

Report defects with reproduction steps and expected results. Pull requests should include relevant tests or manual validation results.

## License

No license file is currently declared. Add a `LICENSE` file to define reuse terms.


## Kitchen recipe prep station

The front-desk dashboard also includes a demo kitchen-prep panel for a lemon-and-spinach pasta recipe:

- Toggle between 2 and 4 servings; ingredient quantities update immediately.
- Check ingredients as they are gathered and view preparation progress.
- Follow a four-stage cooking workflow with stage timings and completion status.
- Reset the checklist and workflow for a new prep session.

The kitchen panel is currently a front-end demonstration. Checklist progress is session-only; it does not yet create restaurant orders, update inventory, persist kitchen tasks, or connect to a kitchen display system.

Run the frontend and tests using the scripts in `package.json`:

```bash
npm install
npm run dev
npm test
npm run build
```
