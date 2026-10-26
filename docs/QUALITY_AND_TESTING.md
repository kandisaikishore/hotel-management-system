# Development and Quality Guide

The hotel-management interface is a React front-desk dashboard for room status, booking creation, guest workflows, and kitchen-preparation planning. The kitchen panel is a front-end demonstration; it does not create restaurant orders, update inventory, or connect to a kitchen display system.

## Prerequisites and local setup

Install a supported Node.js version and npm. From the repository root:

```bash
npm install
npm run dev
```

## Test and build

```bash
npm test
npm run build
```

Use the current package scripts as the source of truth. If the app uses a mock backend, clearly distinguish mock data from backend-backed records during testing and demos.

## Booking validation matrix

- Required guest fields and valid room identifiers
- Check-in before check-out; invalid or equal date ranges rejected
- Room already booked for an overlapping date range
- Non-overlapping stays remain bookable
- Repeated submissions do not create duplicate bookings
- Failed API requests show recoverable errors and do not display false success
- Refresh behavior is consistent with the actual persistence layer

The authoritative service or persistence layer must enforce room conflicts if the application has a backend. UI-only checks are not sufficient for concurrent requests.

## Front-desk and kitchen-demo boundaries

Test room status, booking actions, refresh, loading/error states, and responsive layouts that exist in the current UI. For the kitchen-prep panel, test serving-scale changes, checklist state, and stage transitions, but do not describe these as real inventory or restaurant-order operations unless an integration has been implemented.

## Pull-request checklist

- [ ] Run `npm test` and `npm run build`.
- [ ] Add regression tests for the behavior changed.
- [ ] Cover invalid dates and overlapping bookings for booking changes.
- [ ] Check keyboard focus and mobile layout for UI changes.
- [ ] State whether data is mock, in-memory, or backend-persisted.
