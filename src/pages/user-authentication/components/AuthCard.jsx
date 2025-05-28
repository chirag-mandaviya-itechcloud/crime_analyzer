import React from "react";

const AuthCard = ({ children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg border border-border p-8 animate-fade-in">
      {children}
    </div>
  );
};

export default AuthCard;