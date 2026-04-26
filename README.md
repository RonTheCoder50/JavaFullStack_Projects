> This Repo Includes My Self-Made ALL Fullstack Web-applications.


1) 📝 Fullstack Blog Application

A production-style fullstack blog platform built using React.js and Spring Boot, implementing secure authentication, role-based authorization, and scalable REST APIs.

📌 Project Summary
  Developed a fullstack web application enabling users to create, manage, and interact with blog content.
  Implemented JWT-based authentication and role-based access control (RBAC).
  Designed RESTful APIs following industry best practices.
  Built responsive UI with optimized state management and API handling.

🛠 Tech Stack

> Frontend
  - React.js
  - Tailwind CSS
  - Axios
  - Vite

> Backend

- Spring Boot
- Spring Security
- JWT (JSON Web Token)
- REST API

> Database
- MySQL
  
🔑 Key Features
- Authentication & Security
- JWT-based login and signup system
- Secure password handling
- Role-based authorization (USER / ADMIN)
- Protected API routes using Spring Security
- Blog Management
- Create, update, delete blog posts (CRUD)
- Fetch blogs with optimized API calls
- Search functionality for users and posts
- User Interaction
- Like and comment system
- Bookmark functionality
- User profile with activity stats
- Admin Controls
- User management (delete/restrict users)
- Content moderation capabilities

📊 Impact & Highlights
  Structured backend using layered architecture (Controller → Service → Repository)
  Reduced redundant API calls through efficient frontend state handling
  Built reusable React components for scalable UI development
  Implemented clean folder structure improving maintainability

📂 Project Structure
blog-app/
│
├── frontend/        # React application
├── backend/         # Spring Boot application

⚙️ Installation & Setup
> Clone Repository
 git clone https://github.com/RohTheCoder50/Blog_app.git
 cd Blog_app 
 Backend Setup
 cd backend

Create application.properties:

spring.datasource.url=YOUR_DB_URL
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
jwt.secret=YOUR_SECRET_KEY

Run:

mvn spring-boot:run
Frontend Setup
cd frontend
npm install
npm run dev

🔐 Environment Configuration
  - Sensitive data is not committed to the repository.


🚀 Deployment
- Frontend: Vercel
- Backend: Render / Railway
- Database: MySQL (Cloud / Local)

🧠 Skills Demonstrated
- Fullstack Development
- REST API Design
- Authentication & Authorization (JWT, RBAC)
- State Management & API Integration
- Database Design & Integration
- Responsive UI Development

📈 Future Enhancements
- Pagination & lazy loading
- Rich text editor for blogs
- Image upload (Cloudinary / S3)
- Notification system
- Performance optimization & caching

📬 Contact
- X (Tweeter): https://x.com/Inosukeei_coder
- Email: rohanvaybhase50@gmail.com

⭐ Note
This project represents my hands-on experience in building scalable fullstack applications and applying backend + frontend integration in a real-world scenario.
