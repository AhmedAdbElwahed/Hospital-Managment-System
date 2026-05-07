# Medica Hospital Management System - Next.js Migration Guide

This document provides a comprehensive blueprint for reimplementing the Medica HMS using **Next.js (App Router)**. This migration focuses on performance, modern developer experience, and a cohesive design system.

## 🚀 Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **Authentication:** [Auth.js (NextAuth v5)](https://authjs.dev/)
- **State Management:**
  - **Server State:** [TanStack Query v5](https://tanstack.com/query/latest) (Fetching, Caching, Sync)
  - **Global Client State:** [Zustand](https://docs.pmnd.rs/zustand/) (UI state, Sidebar toggle)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts:** [Recharts](https://recharts.org/) or [Nivo](https://nivo.rocks/)
- **API Client:** [Axios](https://axios-http.com/) with interceptors for JWT.

---

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router
│   ├── (auth)/           # Auth group
│   │   ├── login/        # /login
│   │   └── register/     # /register
│   ├── (dashboard)/      # Protected dashboard group
│   │   ├── layout.tsx    # Sidebar & Header layout
│   │   ├── page.tsx      # Dashboard Overview
│   │   ├── patients/     # /patients
│   │   │   ├── page.tsx  # Patient list table
│   │   │   ├── create/   # /patients/create
│   │   │   └── [id]/     # Patient details/edit
│   │   ├── doctors/      # /doctors
│   │   ├── appointments/ # /appointments
│   │   ├── wards/        # /wards
│   │   └── payment/      # /payment
│   └── api/              # Route handlers (if needed for proxies)
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn low-level components
│   ├── dashboard/        # Dashboard specific cards/charts
│   ├── patients/         # Patient forms/tables
│   └── shared/           # Sidebar, Nav, Search
├── hooks/                # Custom hooks (usePatients, useAuth)
├── lib/                  # Utilities (axios client, utils)
├── store/                # Zustand stores
├── types/                # TypeScript interfaces/types
└── constants/            # Sidebar links, config
```

---

## 🔐 Authentication Strategy

Replace Redux-based auth with **Auth.js**.
- **Provider:** Credentials Provider (email/password).
- **Session:** Store JWT in `callbacks.jwt` and expose to client in `callbacks.session`.
- **Middleware:** Protect all `/dashboard` and sub-routes. Redirect unauthenticated users to `/login`.

---

## 📡 Data Fetching (TanStack Query)

Migrate from RTK Query to TanStack Query for better flexibility with Server Actions.
- Use `prefetchQuery` in Server Components for initial data.
- Use `useSuspenseQuery` or `useQuery` in Client Components for interactive states.
- **Mutations:** Use `useMutation` for CRUD with `onSuccess` invalidation.

---

## 🗺️ Route Mappings

| Feature | Current Path (React) | Next.js Path | Component Type |
| :--- | :--- | :--- | :--- |
| Login | `/login` | `/login` | Client |
| Dashboard | `/` | `/` | Hybrid (Prefetched) |
| Patient List | `/patients` | `/patients` | Hybrid |
| Create Patient | `/patients/create-patient` | `/patients/create` | Client |
| Update Patient | `/patients/update-patient/:id` | `/patients/[id]/edit` | Client |
| Doctors | `/doctors` | `/doctors` | Hybrid |
| Appointments | `/appointments` | `/appointments` | Hybrid |
| Wards | `/wards` | `/wards` | Hybrid |

---

## 🔌 API Documentation Reference

The backend API follows the OpenAPI 3.1.0 specification. Base URL: `http://localhost:8080/hms/v1`.

### Key Endpoints (from @api-docs.json)

- **Auth:**
  - `POST /auth/login`: Authenticate and get JWT.
  - `POST /auth/register`: Create a new user/patient.
- **Patients:**
  - `GET /patient/all`: List all patients.
  - `GET /patient/{id}`: Get patient details.
  - `POST /patient/register`: Create patient.
  - `PUT /patient/update/{id}`: Update patient.
- **Doctors:**
  - `GET /doctor/all`: List all doctors.
  - `POST /doctor/create`: Create doctor.
- **Wards:**
  - `GET /ward/all`: List all wards.
  - `PUT /ward/update-ward/{id}`: Update ward details.
- **Appointments:**
  - `GET /appointment/today`: Get today's scheduled appointments.
  - `POST /appointment/create`: Book a new appointment.

### Data Models (DTOs)
Refer to `#/components/schemas` in `api-docs.json` for:
- `PatientRequestDto`, `DoctorRequestDto`, `AppointmentRequestDto`.
- `WardRequestDto`, `PaymentRequestDto`.

---

## 🎨 UI/UX Guidelines

- **Component Composition:** This project uses **Base UI** (`@base-ui/react`) for low-level primitives.
  - **NEVER** use the `asChild` prop (it is Radix-specific).
  - **ALWAYS** use the `render` prop for component composition (e.g., in `DropdownMenuTrigger`, `DialogClose`, etc.) to prevent hydration errors and invalid HTML nesting (like buttons inside buttons).
  - **Example:** `<DropdownMenuTrigger render={<Button ... />} />`
- **Theme:** Follow the Indigo/Blue medical theme.
- **Interactivity:** Use Framer Motion for page transitions and card hover effects.
- **Feedback:** Use `sonner` for toast notifications and `loading.tsx` for skeleton loaders.
---

## 🚀 Suggestions for Backend Enhancements

To optimize the dashboard and enable advanced visualizations, I recommend implementing (or utilizing existing) "Analytics" endpoints. These are currently available under the `/hms/v1/dashboard/` prefix in the API:

1.  **GET /hms/v1/dashboard/summary**
    *   **Purpose:** Returns a pre-aggregated object for the main KPIs.
    *   **Response:** `{ totalPatients: 2450, todayAppointments: 42, activeAdmissions: 128, efficiencyRate: 0.94 }`
    *   **Benefit:** Reduces frontend logic and saves multiple API calls on every dashboard load.
2.  **GET /hms/v1/dashboard/trends/admissions**
    *   **Purpose:** Returns daily/weekly admission counts for the last 30 days.
    *   **Response:** `[{ date: '2026-05-01', count: 12 }, ...]`
    *   **Benefit:** Enables the implementation of the "Patient Admissions" chart.
3.  **GET /hms/v1/dashboard/recent-activity**
    *   **Purpose:** Returns a feed of the last 10-20 actions across the system.
    *   **Response:** `[{ id: 1, type: 'PATIENT_REGISTERED', message: 'New patient John Doe added', timestamp: '...' }, ...]`
4.  **GET /hms/v1/dashboard/distribution/department**
    *   **Purpose:** Returns the percentage of patients currently in each department (Cardiology, Pediatrics, etc.).
    *   **Benefit:** Perfect for a "Department Distribution" donut chart.
