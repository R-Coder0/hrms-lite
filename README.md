HRMS Lite - Full Stack Assignment
A professional, lightweight Human Resource Management System built to handle core HR operations like employee onboarding and attendance tracking.

##  Project Overview
Is project ka main objective ek aisa internal tool banana hai jo admin ka kaam asaan kare. Ye system architecture Decoupled hai, yaani Frontend aur Backend independently behave karte hain.

###  Core Features
Employee Directory: Add and manage employee profiles with unique validation.

Attendance Tracker: Mark daily presence/absence with historical logs.

Data Persistence: Integrated with PostgreSQL for production stability.

Responsive Design: Clean and professional UI using Tailwind CSS.

## Tech Stack
Project ko scalable banane ke liye niche di gayi technologies use ki gayi hain:

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
Server-side: Email format validation aur duplicate Employee ID check backend level par handle kiya gaya hai.

UI States: Loading spinners aur empty states (jab koi data na ho) add kiye gaye hain.

HTTP Status: Sahi codes (201 Created, 400 Bad Request, 404 Not Found) ka use kiya gaya hai.

## Assumptions
Single User: System assume karta hai ki sirf ek hi admin isse use kar raha hai, isliye complexity kam karne ke liye Auth add nahi kiya gaya hai.

SQLite for Dev: Local machine par PostgreSQL setup ki dependency hatane ke liye default SQLite rakha gaya hai.