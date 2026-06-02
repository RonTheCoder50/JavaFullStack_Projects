import AnalyzeResumePage from "./pages/analyzer"
import {Routes, Route} from "react-router-dom";

import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import IntroPage from "./pages/Intro";

import AnalysisOutputPage from "./pages/output";
import ProfilePage from "./pages/profile";
import ProtectedRoute from "./components-project/protectedRoute";
import ManagerComponenet from "./pages/manage";
import AboutSection from "./pages/about";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<IntroPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes */}
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <ManagerComponenet />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analyzeService"
        element={
          <ProtectedRoute>
            <AnalyzeResumePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analysis-output"
        element={
          <ProtectedRoute>
            <AnalysisOutputPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <AboutSection />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}
 
export default App
