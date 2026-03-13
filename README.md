HRMS Lite – Full Stack Assignment

A lightweight and professional Human Resource Management System (HRMS) designed to handle essential HR operations such as employee onboarding and attendance tracking.

Project Overview

The primary objective of this project is to build an internal tool that simplifies administrative HR tasks.
The system follows a decoupled architecture, meaning the frontend and backend operate independently while communicating through REST APIs.

This design improves maintainability, scalability, and allows both layers of the application to evolve independently.

Core Features
Employee Directory

Add and manage employee profiles with proper validation to ensure data consistency and prevent duplicate records.

Attendance Tracker

Mark daily attendance (Present/Absent) and maintain historical records for easy tracking and reference.

Data Persistence

The application integrates PostgreSQL for production-level database management while using SQLite for local development, enabling quick setup and flexibility during development.

Responsive Design

The interface is built with Tailwind CSS, providing a clean, modern, and responsive user experience across different devices.

Tech Stack

The application is built using a modern full-stack technology stack to ensure performance, scalability, and maintainability.

Frontend

React.js (Vite)
Used for building a fast and efficient user interface with optimized development workflow and production builds.

Tailwind CSS
Provides a utility-first approach to styling, enabling rapid UI development with a consistent and professional design system.

Axios
Handles communication between the frontend and backend APIs efficiently.

Backend

Django & Django REST Framework (DRF)
Used to build robust and scalable REST APIs that power the application's core functionality.

PostgreSQL
A production-grade relational database used for stable and reliable data storage.

SQLite
Used for local development to simplify setup and eliminate external database dependencies.

Installation & Local Setup
1. Backend Configuration

First, configure the backend to ensure the API services are available.

cd backend

python -m venv venv

# Activate virtual environment
source venv/bin/activate
# Windows: venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
2. Frontend Configuration

Open a new terminal and configure the frontend environment.

cd frontend

npm install

npm run dev
Environment Variables

For local development, the following environment variables must be configured.

Backend (.env)
DEBUG=True
SECRET_KEY=django-insecure-pj!ul+o%&_d!w9yeeof-5xqjozs5$1ei3_a86w4=h@*dlvbc
DB_ENGINE=sqlite
Frontend (.env)
VITE_API_BASE_URL=http://127.0.0.1:8000/api/
Error Handling & Validations
Server-side Validation

The backend ensures data integrity by implementing validations such as email format checks and duplicate employee ID prevention.

UI States

The user interface includes loading states and empty states to handle scenarios where data is still being fetched or when no records are available.

HTTP Status Codes

The API uses appropriate HTTP status codes to clearly communicate the result of requests.

Examples include:

201 Created

400 Bad Request

404 Not Found

Assumptions

Single User System
The application assumes a single administrative user. To keep the system simple and focused on core HR operations, authentication and authorization were intentionally excluded.

SQLite for Development
SQLite is used during local development to simplify setup and avoid requiring PostgreSQL installation on the developer’s machine.
