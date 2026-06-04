# 🚀 HireTrack

### HireTrack is a full-stack resume analysis platform that helps candidates understand how job-ready their resume is by providing AI-powered feedback, ATS scoring, and skill gap insights. It also includes an admin dashboard for monitoring users and system analytics.

## ✨ What This Project Does
- Upload your resume and get instant AI-generated feedback
- ATS-style evaluation of resume quality
- Identify missing skills and weak areas
- Get suggestions to improve job readiness
- Track past resume analyses in your history
- Monitor improvement over time (average ATS score)

## 👤 User Features
- 📄 Resume Analysis
- Upload resume (PDF/Text)
- AI-powered breakdown of resume content
- ATS score estimation
- Skill extraction from resume
- Personalized improvement suggestions

## 📊 User Dashboard
- View profile and usage details
- Daily limit tracking (free tier system)
- Average ATS score from last 5 analyses
- History of all resume evaluations
- Option to delete past records

## 🛠️ Admin Features
- 📈 System Monitoring
- View total registered users
- Monitor user activity and analysis usage
- Track system-wide resume analysis data

## 👥 User Management
- Block or remove users
- View user details in structured tables

## 📊 Analytics Dashboard
- User growth charts (weekly / monthly / yearly)
- Resume analysis trends over time
- Free vs Pro user distribution (pie chart)

## 🔍 Data Control Panel
- Search, sort, and paginate users
- Analysis logs with filtering support
- 🔐 Authentication & Security
- JWT-based authentication
- Role-based access control (User / Admin)
- Secure API endpoints

## 🎨 UI / UX
- Clean and responsive dashboard design
- Dark mode support
- Interactive charts and analytics views
Mobile-friendly layout

## 🧠 Tech Highlights
- Full-stack architecture (Frontend + Backend)
- REST API integration
- AI-based resume processing (Gemini API)
- Role-based system design
- Real-world dashboard + analytics system

## 📌 Project Goal
The goal of HireTrack is to help candidates:
Understand why they are getting rejected and how to improve their resume in a structured, data-driven way.

## 🛠 Tech Stack

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
- PostgresSQL (For Deploy)

### AI Integration
- Google Gemini API

### Deployment
- Vercel
- Render 
- Neon

## 🚀 Live Demo 

Frontend: [[Live URL](https://hiretrack-hazel.vercel.app/)] 

Backend: [[API URL](https://hiretrack-dnyi.onrender.com)] 


## ⚙️ Installation

### step 1: Clone Repository

git clone https://github.com/RonTheCoder50/hiretrack.git
cd hiretrack

### Step 2: Backend Setup

```bash
cd backend
```

**Configure `application.properties`:**

```properties
spring.datasource.url=YOUR_DB_URL
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

JWT_SECRET=YOUR_SECRET
GOOGLE_API_KEY=YOUR_GEMINI_KEY
```

**Run the backend:**

```bash
mvn spring-boot:run
```

### Step 3: Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

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

## 📁 Project Structure

```text
HireTrack-AI
│
├── frontend
│   ├── components
│   ├── pages
│   ├── context
│   ├── services
│   └── assets
│
├── backend
│   └── src/main/java/com/ron/backend
│       ├── controller
│       ├── service
│       ├── repository
│       ├── entity
│       ├── dto
│       ├── exception
│       ├── config
│       └── security
│
└── README.md
```

 
## Future Improvements
- Advanced analytics
- Job matching % via resume.
- so on.

# Author

### Rohan Vaybhase

LinkedIn: [your-linkedin](https://www.linkedin.com/in/rohan-vaybhase-15661533a/)
GitHub: https://github.com/RonTheCoder50
X (Tweeter): https://x.com/Inosukeei_coder
 









