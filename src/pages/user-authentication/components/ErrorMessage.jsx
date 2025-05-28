import React from "react";
import Icon from "../../../components/AppIcon";

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 animate-fade-in">
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon name="AlertCircle" size={20} className="text-danger" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;