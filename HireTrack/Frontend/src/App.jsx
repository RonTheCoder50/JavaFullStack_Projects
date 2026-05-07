import AnalyzeResumePage from "./pages/analyzer"
import {Routes, Route} from "react-router-dom";

import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<AnalyzeResumePage />} />
    </Routes>
  );
}
 
export default App
