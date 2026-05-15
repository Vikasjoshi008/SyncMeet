import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Authentication from "./pages/authentication";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/landing";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="318831286872-ehjtp3ofd61u3eud2jfh5jcubpqv5133.apps.googleusercontent.com">
        <Authentication />
      </GoogleOAuthProvider>
    );
  };
  return (
    <>
      <Router>
        <AuthProvider>
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
