# Medica - System Audit & Improvement Roadmap

## 1. Unfinished Modules & Missing Features

### **Payment Module (`PaymentService.java`)**
*   **Hardcoded Configuration:** The Stripe API key and pricing (`2000L EGP`) are hardcoded in the service instead of being injected via `@Value`.
*   **Placeholder URLs:** `successUrl` and `cancelUrl` are currently set to `"write the url here"`.
*   **Missing Webhooks:** There is no webhook listener to handle asynchronous payment success/failure notifications from Stripe to update `Bill` or `Appointment` status.

### **Notification System**
*   **Missing Implementation:** While mentioned in the `GEMINI.md` as a core module, there are currently no services or endpoints implemented for system notifications (e.g., appointment reminders, admission alerts).

### **Elasticsearch Search (`SearchService.java`)**
*   **Skeletal State:** The search module is functionally disabled (`enabled: false`).
*   **Manual Mapping:** Several mapping methods contain `TODO` logic or manual field assignments that should be handled by MapStruct.

### **Appointment Date Management**
*   **Missing Field:** The `Appointment` entity only contains `LocalTime startTime`. It lacks a `LocalDate` field, making it impossible to schedule appointments for future days.
*   **Query Logic Bug:** `QAppointmentRepository` uses `createdDate` (audit timestamp) to filter for "today's" appointments. This incorrectly retrieves appointments based on *when they were booked* rather than *when they occur*.

---

## 2. Identified Logical Bugs

*   **`UserService.java`:** The `updateUser` method contains a copy-paste error: `user.setLastname(user.getLastname())` sets the name to its current value instead of the value provided in the DTO.
*   **`AppointmentSchedulingService.java`:** Uses an unsafe direct cast: `Patient patient = (Patient) userService.getCurrentUser()`. This will trigger a `ClassCastException` if a user with `ROLE_ADMIN` or `ROLE_DOCTOR` attempts to use this endpoint.
*   **`OTPService.java`:** The `verifyOTP` logic is incomplete. It checks if the OTP exists and is not expired, but it does **not** verify if the OTP belongs to the specific user attempting the action, nor does it delete/invalidate the OTP after use.
*   **`WardService.java`:** Boundary condition in `isWardFull` uses `>`. It should likely be `>=` to prevent admitting a patient when the last bed is already occupied.
*   **`PatientHistoryServiceImpl.java`:** The error message in `updatePatientHistory` uses `%s %s` placeholders but provides no arguments, leading to an unhelpful `RuntimeException`.

---

## 3. Architectural & Security Improvements

### **Security & Configuration**
*   **Secret Management:** Sensitive credentials (PostgreSQL password, JWT Secret, Stripe Key, Mailtrap credentials) are hardcoded in `application.yaml`. These should be moved to Environment Variables.
*   **Data Integrity:** `hibernate.ddl-auto` is set to `create`. In a development/production lifecycle, this should be `update` or managed via migrations (Liquibase/Flyway) to avoid data loss on restart.
*   **CORS Policy:** Currently uses a wildcard `*` for all origins, methods, and headers. This should be restricted to the specific frontend domain.
*   **API Inconsistency:** Endpoints are mapped to `/api/v1/`, but `SecurityConfig` and documentation refer to `/hms/v1/`. This path mismatch will cause 403 Forbidden or 404 Not Found errors.

### **Code Quality & Conventions**
*   **Manual Mapping:** Services like `DoctorServiceImpl` and `PatientService` are performing manual field-by-field mapping instead of using the MapStruct mappers defined in the project.
*   **Exception Handling:** Frequent use of generic `RuntimeException`. The project should implement domain-specific exceptions (e.g., `ResourceNotFoundException`, `InsufficientCapacityException`) for better API responses.
*   **Iterative Logic:** The `getAllAvailableTimes` loop in `DoctorServiceImpl` is potentially brittle. If `workEndTime` is not an exact multiple of 30 minutes from `workStartTime`, it could cause unexpected behavior or missed slots.
