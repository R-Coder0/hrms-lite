# HRMS Lite - Full Stack Assignment

A professional, lightweight **Human Resource Management System (HRMS)** built to handle core HR operations such as **employee onboarding and attendance tracking**.

## Project Overview
The main objective of this project is to build an internal tool that simplifies administrative tasks for HR or management.  

The system follows a **decoupled architecture**, meaning the **frontend and backend operate independently** while communicating through APIs. This approach improves maintainability, scalability, and flexibility for future enhancements.

## Core Features

**Employee Directory**  
Add and manage employee profiles with proper validation to ensure unique and consistent records.

**Attendance Tracker**  
Mark daily employee attendance (Present/Absent) and maintain historical logs for tracking and reference.

**Data Persistence**  
Integrated with **PostgreSQL** for reliable and production-level database management.

**Responsive Design**  
A clean and modern user interface built using **Tailwind CSS**, ensuring responsiveness across different devices.

## Tech Stack
The project is built using the following technologies to ensure scalability, performance, and maintainability:

### Frontend
React.js (Vite): Fast development and optimized build.

Tailwind CSS: For a modern, production-ready look.

Axios: For seamless API communication.

### Backend
Django & DRF: Robust REST API development.

PostgreSQL: Production-grade database.

SQLite: Quick local development database.

## Installation & Local Setup
### 1. Backend Configuration
Pehle backend setup karein taaki API ready ho jaye:

Bash
cd backend
python -m venv venv
# Activate venv
source venv/bin/activate # Windows: venv\Scripts\activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
### 2. Frontend Configuration
Naya terminal open karein aur frontend setup karein:

Bash
cd frontend
npm install
npm run dev
## Environment Variables
Local setup ke liye ye .env files create karna zaroori hai:

### Backend (.env)
Code snippet
DEBUG=True
SECRET_KEY=django-insecure-pj!ul+o%&_d!w9yeeof-5xqjozs5$1ei3_a86w4=h@*dlvbc
DB_ENGINE=sqlite
### Frontend (.env)
Code snippet
VITE_API_BASE_URL=http://127.0.0.1:8000/api/
## Error Handling & Validations

**Server-side:** Email format validation and duplicate Employee ID checks are handled at the backend level to ensure data integrity.

**UI States:** Loading spinners and empty states are implemented to properly handle situations when data is still loading or when no records are available.

**HTTP Status:** Appropriate HTTP status codes such as **201 Created**, **400 Bad Request**, and **404 Not Found** are used to clearly indicate the result of API requests.

---

## Assumptions

**Single User:** The system assumes that only a single administrator is using the application. To keep the project simple and focused on core HR functionality, authentication and authorization were not included.

**SQLite for Development:** SQLite is used as the default database during local development to remove the dependency of installing PostgreSQL on the developer's machine.
