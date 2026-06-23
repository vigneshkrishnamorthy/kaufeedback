# KauFeedback – QR Based Patient Feedback System

## Project Overview

KauFeedback is a QR-based patient feedback management system designed for hospitals. Patients can scan a department-specific QR code, submit feedback, and hospital management can monitor feedback through a real-time analytics dashboard.

The system is built using modern DevOps practices and deployed on AWS using Docker and GitHub Actions CI/CD.

---

## Features

### Patient Feedback Portal

* QR Code Based Access
* Department Auto Selection
* Location Auto Selection
* Mobile Responsive Design
* Patient Name Collection
* Age Collection
* Visit Type Selection
* Department Selection
* Service Selection
* Star Rating System
* Comments Submission
* Thank You Page

### Admin Dashboard

* Total Feedback Today
* Average Rating
* Department Wise Average Rating
* Rating Distribution Pie Chart
* Recent Feedback List
* Patient Search
* CSV Export
* Auto Refresh Every 30 Seconds

---

## Technology Stack

### Frontend

* React
* Vite
* Axios
* Recharts
* React Router

### Backend

* Spring Boot
* Java 21
* Spring Data JPA
* PostgreSQL
* Lombok

### Database

* PostgreSQL

### DevOps

* Docker
* Docker Compose
* GitHub Actions
* AWS EC2
* AWS RDS PostgreSQL
* AWS Route53
* AWS Application Load Balancer
* AWS Target Groups

---

## Architecture Diagram

```text
Patient
   │
   ▼
QR Code
   │
   ▼
Route53 Domain
(kaufeedback.exploremira.com)
   │
   ▼
Application Load Balancer
   │
   ├──────────────► Frontend Target Group
   │                    Port 80
   │
   └──────────────► Backend Target Group
                        Port 8080
                             │
                             ▼
                    Spring Boot Backend
                             │
                             ▼
                     PostgreSQL Database
                             │
                             ▼
                     Admin Dashboard
```

---

## AWS Architecture

### AWS Services Used

* Route53
* Application Load Balancer
* Target Groups
* EC2 Ubuntu Server
* RDS PostgreSQL
* Security Groups

### Infrastructure Flow

```text
User
  │
  ▼
Route53
  │
  ▼
Application Load Balancer
  │
  ▼
EC2 Instance
  ├── React Frontend Container
  └── Spring Boot Backend Container
  │
  ▼
Amazon RDS PostgreSQL
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

Pipeline Stages:

1. Source Checkout
2. Backend Build using Gradle
3. Frontend Build using Node.js
4. Docker Build
5. Deploy to EC2 using SSH
6. Docker Compose Deployment
7. Application Restart

### Workflow

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ▼
Build & Test
    │
    ▼
EC2 Deployment
    │
    ▼
Docker Compose
    │
    ▼
Live Application
```

---

## Docker Setup

### Backend Docker

```bash
docker build -t kaufeedback-backend .
```

### Frontend Docker

```bash
docker build -t kaufeedback-frontend .
```

### Docker Compose

```bash
docker compose up -d --build
```

---

## Deployment Steps

### Clone Repository

```bash
git clone https://github.com/vigneshkrishnamorthy/kaufeedback.git
```

### Start Application

```bash
docker compose up -d --build
```

### Verify Containers

```bash
docker ps
```

---

## Database Tables

### departments

Stores hospital departments.

### locations

Stores hospital branch locations.

### services

Stores available services.

### feedback_entries

Stores patient feedback records.

---

## QR Based Feedback Flow

```text
Patient
   │
   ▼
Scan QR Code
   │
   ▼
Department Auto Selected
Location Auto Selected
   │
   ▼
Submit Feedback
   │
   ▼
Stored in PostgreSQL
   │
   ▼
Visible in Dashboard
```

---

## Live URL

Patient Feedback Portal

https://kaufeedback.exploremira.com

Admin Dashboard

https://kaufeedback.exploremira.com/admin

---

## Repository

GitHub Repository

https://github.com/vigneshkrishnamorthy/kaufeedback

---

## Future Enhancements

* JWT Authentication
* Kubernetes Deployment
* Helm Charts
* Prometheus Monitoring
* Grafana Dashboards
* CloudWatch Logging
* SSL Automation
* Auto Scaling Groups

---

## Author

Vignesh Krishnamorthy

AWS & DevOps Engineer
