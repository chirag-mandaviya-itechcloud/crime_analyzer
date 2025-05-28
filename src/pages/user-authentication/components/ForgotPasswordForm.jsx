import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import AuthCard from "./AuthCard";
import InputField from "./InputField";
import Button from "../../../components/ui/Button";
import ErrorMessage from "./ErrorMessage";

const ForgotPasswordForm = ({ onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <AuthCard>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-primary bg-opacity-10 p-3 rounded-full">
            <Icon name="KeyRound" size={32} className="text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-text-primary">Reset Password</h1>
        <p className="text-text-secondary mt-2">
          Enter your email to receive a password reset link
        </p>
      </div>

      {error && <ErrorMessage message={error} />}

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Email"
            type="email"
            id="reset-email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon="Mail"
          />

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            disabled={isLoading}
            icon={isLoading ? "Loader" : "Send"}
            className={isLoading ? "animate-pulse" : ""}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="medium"
            fullWidth
            onClick={onBackToLogin}
            icon="ArrowLeft"
          >
            Back to Login
          </Button>
        </form>
      ) : (
        <div className="text-center">
          <div className="bg-success bg-opacity-10 p-4 rounded-full inline-flex mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Check Your Email
          </h2>
          <p className="text-text-secondary mb-6">
            We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
          </p>
          <Button
            type="button"
            variant="primary"
            size="medium"
            fullWidth
            onClick={onBackToLogin}
          >
            Return to Login
          </Button>
        </div>
      )}
    </AuthCard>
  );
};

export default ForgotPasswordForm;