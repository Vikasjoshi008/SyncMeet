import "./App.css";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import Authentication from "./pages/authentication";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/landing";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import RefrshHandler from "./pages/RefreshHandler";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Authentication />
      </GoogleOAuthProvider>
    );
  };
  return (
    <>
      <Router>
        <AuthProvider>
          <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<GoogleAuthWrapper />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
