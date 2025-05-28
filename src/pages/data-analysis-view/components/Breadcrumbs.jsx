import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Breadcrumbs = () => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/dashboard-home" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary">
            <Icon name="Home" size={16} className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <Icon name="ChevronRight" size={16} className="text-text-tertiary" />
            <span className="ml-1 text-sm font-medium text-text-primary">Data Analysis</span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;