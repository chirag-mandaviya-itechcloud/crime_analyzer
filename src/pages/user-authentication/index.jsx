import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import AuthCard from "./components/AuthCard";
import InputField from "./components/InputField";
import Checkbox from "./components/Checkbox";
import Button from "../../components/ui/Button";
import ErrorMessage from "./components/ErrorMessage";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

const UserAuthentication = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Mock credentials for demonstration
  const mockCredentials = {
    email: "admin@crimeanalyzer.org",
    password: "Admin@123",
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (email === mockCredentials.email && password === mockCredentials.password) {
        // Success - store JWT token in cookie (mock)
        document.cookie = "auth_token=mock_jwt_token; max-age=86400; path=/; secure; samesite=strict";
        navigate("/dashboard-home");
      } else {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setError(null);
  };

  const systemStatus = "operational"; // Could be: operational, degraded, maintenance, outage

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        {!showForgotPassword ? (
          <AuthCard>
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                  <Icon name="Shield" size={32} className="text-primary" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-text-primary">Crime Analyzer</h1>
              <p className="text-text-secondary mt-2">
                AI-driven crime data analysis platform
              </p>
            </div>

            {error && <ErrorMessage message={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Email"
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon="Mail"
              />

              <InputField
                label="Password"
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                icon="Lock"
              />

              <div className="flex items-center justify-between">
                <Checkbox
                  id="remember-me"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm font-medium text-primary hover:text-primary-dark"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="large"
                fullWidth
                disabled={isLoading}
                icon={isLoading ? "Loader" : "LogIn"}
                className={isLoading ? "animate-pulse" : ""}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-text-tertiary">
              <p>
                By signing in, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-2 text-sm">
              <div className={`h-2 w-2 rounded-full ${
                systemStatus === "operational" ? "bg-success" :
                systemStatus === "degraded" ? "bg-warning" :
                systemStatus === "maintenance" ? "bg-info" : "bg-danger"
              }`}></div>
              <span className="text-text-secondary">
                System status: {systemStatus}
              </span>
            </div>
          </AuthCard>
        ) : (
          <ForgotPasswordForm onBackToLogin={handleBackToLogin} />
        )}
      </div>
    </div>
  );
};

export default UserAuthentication;