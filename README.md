# 🚀 InspectAI  
## AI-Powered Intelligent Manufacturing Inspection Platform

<p align="center">
  <img src="screenshots/banner.png" alt="InspectAI Banner">
</p>

InspectAI is an end-to-end **AI-powered manufacturing inspection platform** designed to automate defect detection and quality analysis using **Computer Vision, Deep Learning, and modern cloud-native architecture**.

The platform combines a scalable frontend, backend gateway, AI inference service, and persistent database into a production-ready microservice system.

---

# 🌐 Live Deployment

## Application

🔗 Frontend Dashboard  
https://inspectai-frontend.onrender.com


## Backend API

🔗 Spring Boot Backend  
https://inspectai-backend-weyb.onrender.com


## AI Inference Service

🔗 FastAPI AI Service  
https://inspectai-m3h2.onrender.com


## Database

PostgreSQL Database  
`inspectai-db`

Hosted using Render PostgreSQL.

---

# 🏗️ System Architecture


```
                         USER
                          |
                          |
                  React Dashboard
                          |
                          |
              Spring Boot Backend Gateway
                          |
              ┌───────────┴───────────┐
              |                       |
              |                       |
        PostgreSQL Database     FastAPI AI Service
                                      |
                                      |
                                  YOLO Model
                                      |
                                      |
                              Defect Detection
```


---

# 🔄 Inspection Workflow


### 1. Image Upload

User uploads a manufacturing component image through the React dashboard.


### 2. Authentication

Frontend sends the request securely using JWT authentication to the Spring Boot backend.


### 3. Backend Processing

Spring Boot handles:
- Authentication
- Business logic
- Request validation
- Database operations


### 4. AI Inference

Backend forwards the image to the FastAPI AI service.


FastAPI performs:

- Image preprocessing
- YOLO model inference
- Defect detection
- Confidence calculation
- Bounding box generation


### 5. Result Storage

Inspection metadata and prediction results are stored in PostgreSQL.


### 6. Visualization

Frontend displays inspection results and analytics to the user.

---

# 🧩 Microservice Architecture

InspectAI follows a clean separation of responsibilities:

## Frontend Service

Responsible for:

- User interface
- Authentication screens
- Image upload workflow
- Result visualization


## Backend Service

Responsible for:

- REST API layer
- JWT authentication
- Spring Security
- Database communication
- Service orchestration


## AI Service

Responsible for:

- Computer vision pipeline
- YOLO inference
- Defect prediction
- Model serving


## Database Service

Responsible for:

- User persistence
- Inspection history
- Prediction records

---

# 🛠️ Technology Stack


## Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Three.js
- React Three Fiber


## Backend

- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- BCrypt Password Hashing
- Hibernate / JPA


## AI / Computer Vision

- Python
- FastAPI
- Ultralytics YOLO
- Computer Vision


## Database

- PostgreSQL


## DevOps

- Docker
- Docker Compose
- Render Cloud Deployment
- Environment-based Configuration

---

# 🔐 Authentication & Security

InspectAI implements a stateless authentication architecture.

Features:

✅ JWT-based authentication  
✅ BCrypt password hashing  
✅ Spring Security filters  
✅ Protected API endpoints  
✅ Environment-based secrets management  

---

# 📁 Project Structure


```
InspectAI
│
├── frontend
│   ├── src
│   ├── Dockerfile
│   └── nginx.conf
│
├── backend
│   └── backend
│       ├── src
│       ├── pom.xml
│       └── Dockerfile
│
├── ai-service
│   ├── app
│   ├── models
│   ├── requirements.txt
│   └── Dockerfile
│
├── docker-compose.yml
│
└── README.md
```

---

# 🐳 Local Development


Clone repository:

```bash
git clone https://github.com/SARTHAKSHARMW/InspectAI.git

cd InspectAI
```


Start complete application:

```bash
docker compose up --build
```


Services:

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8080 |
| AI Service | http://localhost:8000 |
| PostgreSQL | localhost:5432 |

---

# ⚙️ Environment Configuration


## Frontend

```
VITE_API_BASE_URL=http://localhost:8080
```


## Backend

```
DB_URL=jdbc:postgresql://localhost:5432/inspectai

DB_USERNAME=postgres

DB_PASSWORD=your_password

JWT_SECRET=your_secret_key

ai.service.url=http://localhost:8000
```


## AI Service

```
PORT=8000
```

---

# 🚀 Production Deployment Architecture


The application is deployed as independent cloud services:


```
Render Cloud

        |
        |
 ┌───────────────┐
 | React Frontend |
 └───────────────┘
        |
        |
 ┌────────────────┐
 | Spring Backend |
 └────────────────┘
        |
        |
 ┌────────────────┐
 | FastAPI AI API |
 └────────────────┘
        |
        |
 ┌────────────────┐
 | PostgreSQL DB  |
 └────────────────┘
```

Each service runs independently using Docker containers.

---

# 📸 Screenshots

(Add screenshots here)

```
screenshots/
│
├── dashboard.png
├── upload.png
├── prediction.png
└── history.png
```

---

# 💡 Engineering Highlights

- Designed and deployed a complete AI-powered inspection platform
- Implemented microservice architecture separating AI inference and backend logic
- Built REST APIs using Spring Boot and Spring Security
- Developed independent FastAPI model-serving infrastructure
- Integrated YOLO-based computer vision inference pipeline
- Containerized application components using Docker
- Configured production deployment with cloud environment variables
- Implemented secure authentication using JWT

---

# 🔮 Future Enhancements

- Real-time camera inspection
- Automated defect analytics dashboard
- Model performance monitoring
- Cloud image storage integration
- CI/CD pipeline automation
- Model version management
- Advanced defect classification


---

# 👨‍💻 Author

## Sarthak Sharma

Computer Science Engineering Student

GitHub:
https://github.com/SARTHAKSHARMW

LinkedIn:
(Add LinkedIn URL)

---

⭐ If you find this project interesting, consider giving it a star!
