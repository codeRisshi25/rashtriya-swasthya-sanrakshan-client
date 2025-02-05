import LandingPage from "./landing-page/LandingPage";
import SignUp from "./sign-up/SignUp";
import SignIn from "./sign-in/SignIn";
import Dashboard from "./dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
  );
}

export default App;