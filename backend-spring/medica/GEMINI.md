# Medica - Hospital Management System

Medica is a comprehensive backend application for hospital management, built with Spring Boot. It provides a robust platform for managing appointments, admissions, patients, doctors, billing, and real-time communication.

## Project Overview

-   **Purpose:** To streamline hospital operations including patient management, doctor scheduling, billing, and clinical documentation.
-   **Main Technologies:**
    -   **Framework:** Spring Boot 4.0.5 (Jakarta EE 11)
    -   **Language:** Java 26
    -   **Database:** PostgreSQL (Primary), Elasticsearch (Search indexing)
    -   **Migrations:** Liquibase for schema management and data seeding.
    -   **Security:** Spring Security 7.0 with JWT (Stateless), Hierarchical Roles.
    -   **Real-time:** WebSocket support for chat and notifications.
    -   **Payments:** Stripe integration.
    -   **Storage:** AWS S3 for file management (e.g., reports, profiles).
    -   **Communication:** Email via Spring Boot Starter Mail (configured with Mailtrap for development).
    -   **Mapping & Querying:** MapStruct for DTO mapping, QueryDSL for type-safe queries.
    -   **Documentation:** OpenAPI/Swagger (SpringDoc).

## Architecture

The project follows a standard layered architecture:
-   **`endpoint/controller`:** REST API controllers handling HTTP requests.
-   **`service`:** Business logic implementation.
-   **`repository`:** Data access layer using Spring Data JPA and QueryDSL.
-   **`model`:** JPA entities representing the domain model.
-   **`dto`:** Data Transfer Objects for API requests and responses.
-   **`mapper`:** MapStruct mappers for converting between models and DTOs.
-   **`config`:** Configuration for Security (updated for Spring Security 7.0), JWT, Web, QueryDSL, etc.

## Security & Roles

Medica uses a hierarchical role-based access control system:
-   `ROLE_ADMIN` > `ROLE_DOCTOR` > `ROLE_PATIENT` > `ROLE_USER`
-   Authentication is handled via JWT.
-   Base API path: `/hms/v1/`

## Key Modules

-   **`auth`:** Handles registration, login, token refresh, password reset, and logout.
-   **`appointment`:** Manages patient-doctor appointment scheduling and validation.
-   **`admission`:** Handles patient admissions to wards.
-   **`doctor` & `patient`:** Core entity management for healthcare providers and recipients.
-   **`bill` & `billservice`:** Billing logic and integration with Stripe for payments.
-   **`chat`:** Real-time communication features.
-   **`dashboard`:** Statistics and summary data.
-   **`ward`:** Management of hospital wards and beds.
-   **`examination` & `diagnoses`:** Clinical documentation and patient history.
-   **`search`:** Provides high-performance, full-text search for patients and doctors using Elasticsearch, with real-time data synchronization from PostgreSQL.

## Building and Running

### Prerequisites
-   Java 26+
-   PostgreSQL
-   Elasticsearch (optional for core features, required for search)

### Commands
-   **Build:** `./mvnw clean install`
-   **Run:** `./mvnw spring-boot:run`
-   **Test:** `./mvnw test` (Note: `maven-surefire-plugin` is currently configured to skip tests by default in `pom.xml`).
-   **Infrastructure (Docker):** `docker compose up -d` (Starts PostgreSQL and Elasticsearch).

## Development Conventions

-   **Auditing:** Most entities extend `AuditedEntity` to track creation time and creator.
-   **Async:** Asynchronous processing is enabled via `@EnableAsync`.
-   **Exception Handling:** Global exception handling is managed through `RestResponseEntityExceptionHandler`.
-   **DTOs:** Always use DTOs for API input/output to avoid exposing internal models.
-   **Mappers:** Use MapStruct for object mapping (builders disabled for compatibility).

## Recent Improvements & Fixes

-   **Upgraded Stack:** Migrated to Spring Boot 4.0.5 and Java 26.
-   **Circular Dependency Fix:** Resolved a startup crash by using `@Lazy` injection in `SecurityConfig`.
-   **Entity ID Resolution:** Fixed a JPA initialization error by removing redundant `@Id` fields in `User` and `Doctor` subclasses.
-   **Database Migrations:** Integrated Liquibase for robust schema and data management, replacing manual `CommandLineRunner` and `ApplicationListener` seeders.
-   **Stability:** Successfully achieved a stable startup by excluding Elasticsearch auto-configurations and using conditional properties.
-   **Elasticsearch Status:** The search module is implemented but currently **disabled by default** via `elasticsearch.enabled: false` to ensure system stability while connection protocols for Spring Boot 4 are refined.


