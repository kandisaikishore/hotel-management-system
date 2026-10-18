# Hotel Management System — Front Desk

[![Source](https://img.shields.io/badge/Source-GitHub-181717?logo=github)](https://github.com/kandisaikishore/hotel-management-system) [![Last Commit](https://img.shields.io/github/last-commit/kandisaikishore/hotel-management-system)](https://github.com/kandisaikishore/hotel-management-system/commits/main)

A hotel-management application with a responsive React front-desk dashboard for room status, booking creation, guest workflows, and kitchen-preparation planning. The dashboard uses the backend where configured and clearly identifies demo data when running with mocks.

## Run the interface locally

```bash
npm install
npm run dev
```

## Test and build

```bash
npm test
npm run build
```

## UI features

- Room availability dashboard and at-a-glance metrics
- Quick booking form, room details drawer, and booking status actions
- Loading and error feedback, refresh action, and responsive layout
- Kitchen-prep panel with 2/4 serving scale, ingredient checklist, and cooking stages

The kitchen panel is a front-end demonstration. It does not yet create restaurant orders, update inventory, or connect to a kitchen display system.

## Quality checklist

- Validate guest details, room identifiers, and date inputs
- Prevent overlapping bookings where reservation logic exists
- Check room availability and status transitions
- Verify access controls for personal and payment-related data
- Test empty states, errors, persistence, keyboard access, and responsive layouts

Keep credentials and real guest information out of version control. This project should not be treated as production-ready without appropriate security, backend validation, monitoring, and privacy controls.

## License

No license file is currently declared. Add a `LICENSE` file to define reuse terms.
