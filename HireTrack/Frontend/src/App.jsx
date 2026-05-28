import AnalyzeResumePage from "./pages/analyzer"
import {Routes, Route} from "react-router-dom";

import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import IntroPage from "./pages/Intro";
import MainPage from "./pages/mainPage";
import DashBoardPage from "./pages/dashboard";
import AnalysisOutputPage from "./pages/output";
import ProfilePage from "./pages/profile";
import ProtectedRoute from "./components-project/protectedRoute";

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
            <MainPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashBoardPage />
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

    </Routes>
  );
}
 
export default App
