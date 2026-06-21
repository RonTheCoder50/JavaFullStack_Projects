import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import IntroPage from "./pages/intropage";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import DashBoard from "./pages/dashBoard";
import BlogPage_Card from "./pages/blogPage";
import AddBlogForm from "./pages/addBlogForm";
import ProfileCard from "./pages/profile";
import AboutPage from "./pages/About";

import ProtectedRoute from "./pages/protectedRoutePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute>
              <BlogPage_Card />
            </ProtectedRoute>
          }
        />

        <Route
          path="/blog_form"
          element={
            <ProtectedRoute>
              <AddBlogForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileCard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
