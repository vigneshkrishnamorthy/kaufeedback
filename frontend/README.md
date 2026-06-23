# KauFeedback – QR Based Patient Feedback System

## Project Overview

KauFeedback is a QR-based patient feedback management system designed for hospitals. Patients can scan department-specific QR codes, submit feedback, and hospital management can monitor feedback through a real-time analytics dashboard.

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

* PostgreSQL (AWS RDS)

### DevOps

* Docker
* Docker Compose
* GitHub Actions
* AWS EC2
* AWS RDS PostgreSQL
* AWS Route53
* AWS Application Load Balancer
* AWS Target Groups
* Security Groups

---

## Architecture Diagram

![AWS Architecture](docs/architecture.png)

### Architecture Overview

The application follows a production-ready AWS architecture.

Patient/User

↓

QR Code Scan

↓

Route53 DNS

kaufeedback.exploremira.com

↓

Application Load Balancer (ALB)

↓

Path Based Routing

* /* → Frontend Target Group
* /api/* → Backend Target Group

↓

Amazon EC2 (Ubuntu)

Docker Compose Environment

* React Frontend Container (Nginx)
* Spring Boot Backend Container

↓

Amazon RDS PostgreSQL

↓

Admin Dashboard Analytics

---

## AWS Architecture

### AWS Services Used

* Amazon Route53
* Application Load Balancer
* Target Groups
* Amazon EC2
* Amazon RDS PostgreSQL
* Security Groups
* Docker
* GitHub Actions

### Infrastructure Flow

User

↓

Route53

↓

Application Load Balancer

↓

EC2 Instance

* Frontend Docker Container
* Backend Docker Container

↓

Amazon RDS PostgreSQL

---

## CI/CD Pipeline

### GitHub Actions Workflow

Pipeline Stages

1. Source Checkout
2. Backend Build using Gradle
3. Frontend Build using Node.js
4. Docker Image Build
5. Deploy to EC2 via SSH
6. Docker Compose Deployment
7. Container Restart
8. Live Application Update

### Workflow

Developer

↓

GitHub Repository

↓

GitHub Actions

↓

Build & Test

↓

Deploy to EC2

↓

Docker Compose

↓

Live Application

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

Stores hospital services.

### feedback_entries

Stores patient feedback records.

---

## QR Based Feedback Flow

Patient

↓

Scan QR Code

↓

Department Auto Selected

↓

Location Auto Selected

↓

Fill Feedback Form

↓

Submit Feedback

↓

Stored in PostgreSQL

↓

Visible in Admin Dashboard

---

## Live URL

### Patient Feedback Portal

https://kaufeedback.exploremira.com

### Admin Dashboard

https://kaufeedback.exploremira.com/admin

---

## Repository

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
* Blue-Green Deployment
* AWS ECS Migration

---

## Author

Vignesh Krishnamorthy

AWS & DevOps Engineer
