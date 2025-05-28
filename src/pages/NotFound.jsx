import React from "react";
import { Link } from "react-router-dom";
import Icon from "../components/AppIcon";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-slate-100 p-4 rounded-full">
            <Icon name="FileQuestion" size={48} className="text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-text-primary mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
        <p className="text-text-secondary mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/dashboard-home"
          className="btn btn-primary px-6 py-3 inline-flex items-center"
        >
          <Icon name="Home" size={18} className="mr-2" />
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;