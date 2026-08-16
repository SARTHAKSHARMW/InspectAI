# InspectAI

AI-Powered Intelligent Manufacturing Inspection Platform

InspectAI is an enterprise-grade platform designed to detect defects and analyze manufacturing components using GPU-accelerated computer vision and AI models.

## Architecture

The system uses a strictly separated, robust microservice architecture:

User
 ↓
React (Frontend)
 ↓
Spring Boot (Core Backend Gateway)
 ├── PostgreSQL (Database)
 └── FastAPI (AI Service)
       ↓
      YOLO (Computer Vision)

**Image Inspection Flow:**
1. A user uploads an image via the React Dashboard.
2. React securely transmits the image with a JWT to Spring Boot.
3. Spring Boot delegates the raw image via an internal HTTP call to FastAPI.
4. FastAPI executes inference using a fine-tuned YOLO model.
5. FastAPI returns bounding box, confidence, and class data to Spring Boot.
6. Spring Boot stores the inspection metadata and results in PostgreSQL.
7. React immediately displays the results in a GPU-accelerated 3D environment.

## Technologies

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Three.js, React Three Fiber.
- **Backend**: Java 21, Spring Boot 3, Spring Security, JWT, BCrypt, Hibernate.
- **Database**: PostgreSQL 15.
- **AI Service**: Python 3.11, FastAPI, Ultralytics YOLOv8.

## Authentication

- Stateless JSON Web Token (JWT) architecture.
- Passwords strictly hashed using BCrypt.
- All non-public endpoints secured by Spring Security filters.

## Local Development (Docker)

To run the complete application stack locally via Docker Compose:

```bash
# Build and start all services
docker compose up --build -d
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8080`
- **AI Service**: `http://localhost:8000`
- **PostgreSQL**: `localhost:5432`

## Production Deployment

This repository is fully configured for deployment on modern PaaS platforms like **Railway** or AWS/GCP via Docker.

### Railway Deployment
1. Provision a PostgreSQL Database service.
2. Deploy the `ai-service` repository folder (Railway detects Dockerfile).
3. Deploy the `backend/backend` repository folder (Railway detects Dockerfile). Configure environment variables:
   - `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`
   - `JWT_SECRET`
   - `ai.service.url` -> *Internal Railway URL of FastAPI service*
4. Deploy the `frontend` repository folder (Railway detects Dockerfile). Configure:
   - `VITE_API_BASE_URL` -> *Public Railway URL of Spring Boot service*

### Environment Variables

**Frontend (`frontend/.env`):**
```
VITE_API_BASE_URL=http://localhost:8080
```

**Backend (`backend/backend/src/main/resources/application.properties` overridable via ENV):**
```
DB_URL=jdbc:postgresql://localhost:5432/inspectai
DB_USERNAME=postgres
DB_PASSWORD=secret
JWT_SECRET=super_secret_key_change_in_production
ai.service.url=http://localhost:8000
```
