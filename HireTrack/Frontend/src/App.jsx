import AnalyzeResumePage from "./pages/analyzer"
import {Routes, Route} from "react-router-dom";

import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import IntroPage from "./pages/Intro";
import MainPage from "./pages/mainPage";
import DashBoardPage from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/dashboard" element={<DashBoardPage />} />
      <Route path="/analyzeService" element={<AnalyzeResumePage />} />
    </Routes>
  );
}
 
export default App
