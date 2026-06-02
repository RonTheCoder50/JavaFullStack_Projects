# THE HireTrack 

An AI-powered Applicant Tracking System (ATS) designed to help recruiters manage candidates, analyze resumes, and streamline hiring workflows
& also helpful for students as well.

### ✨ Key Features

### Authentication
- Secure user registration and login
- JWT-based authentication

### Candidate Management
- Add, edit, and delete candidate profiles
- Store candidate information and resumes
- Search candidates by name, skills, or role

### AI Resume Analysis
- Upload resumes for AI processing
- Generate candidate summaries using Gemini API
- Extract key skills and relevant information from resumes
- Quickly understand candidate profiles without manual review

### Email Integration (comming soon)
- Send candidate-related communications
- Contact candidates directly from the platform

### Dashboard
- View all candidates in a centralized dashboard
- Track candidate information efficiently

### Responsive UI
- Mobile-friendly interface
- Clean and intuitive user experience


🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Java
- Spring Boot
- Spring Security
- JWT

### Database
- MySQL

### AI Integration
- Google Gemini API

### Deployment
- Vercel
- Render 
- Neon

## 🎯 Problem Solved

Recruiters often spend significant time manually reviewing resumes and managing candidate data. HireTrack AI reduces manual effort by leveraging AI-powered resume analysis and centralized applicant management.

Another one is for freshman graduates or students which they can quickly see ATS score and receive instantlly feedback on the basis of their resume.

## 🚀 Live Demo 

Frontend: [Live URL] (comming soon) 

Backend: [API URL] (comming soon)

## 📸 Screenshots

---


## ⚙️ Installation

### step 1: Clone Repository

git clone https://github.com/RonTheCoder50/hiretrack.git
cd hiretrack

### step 2: Backend setup
- cd backend
-- application properties --
  spring.datasource.url=YOUR_DB_URL
  spring.datasource.username=YOUR_USERNAME
  spring.datasource.password=YOUR_PASSWORD
  JWT_SECRET=YOUR_SECRET

- mvn spring-boot:run

### step 3: Frontend setup
cd Frontend
npm install
npm run dev

## API ENDPOINTS
-- Authentication:
  - POST: /user/register
  - POST: /user/login

-- USER:
  - GET: /user/{id}
  - GET: /user/info
  - GET: /user/history
  - DELETE: /user/remove/{id}

-- ADMIN:
  - GET: /admin-data
  - GET: /chart-user
  - GET: /chart-analyses
  - PUT: /block
  - DELETE: /remove
  - GET: /view
  - GET: /users

## 🏗️ Backend Architecture

The backend follows a layered architecture:

- Controller Layer → Handles HTTP requests
- Service Layer → Contains business logic
- Repository Layer → Database operations
- DTO Layer → Request/Response data transfer
- Security Layer → JWT Authentication & Authorization
- Exception Layer → Centralized error handling
- Entity Layer → Database models


## 📁 Project Structure

HireTrack-AI
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   └── assets
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── dto
│   ├── model
│   ├── exception
│   └── config
│
└── README.md


## Future Improvements
- Advanced analytics
- Job matching % via resume.
- so on.

# Author

Rohan Vaybhase

LinkedIn: [your-linkedin](https://www.linkedin.com/in/rohan-vaybhase-15661533a/)
GitHub: https://github.com/RonTheCoder50
X (Tweeter): https://x.com/Inosukeei_coder
 









