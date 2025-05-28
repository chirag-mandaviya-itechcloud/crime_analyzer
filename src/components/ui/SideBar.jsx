import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';

const SideBar = ({ variant = 'expanded', userRole = 'admin' }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(variant === 'collapsed');

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Navigation items with role-based access
  const navigationItems = [
    {
      name: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/dashboard-home',
      roles: ['admin', 'analyst', 'user'],
    },
    {
      name: 'Data Analysis',
      icon: 'BarChart2',
      path: '/data-analysis-view',
      roles: ['admin', 'analyst'],
    },
    {
      name: 'Sentiment Analysis',
      icon: 'TrendingUp',
      path: '/sentiment-analysis-report',
      roles: ['admin', 'analyst', 'user'],
    },
    {
      name: 'User Management',
      icon: 'Users',
      path: '/user-authentication',
      roles: ['admin'],
    },
    {
      name: 'Settings',
      icon: 'Settings',
      path: '/settings',
      roles: ['admin', 'analyst', 'user'],
    },
    {
      name: 'Help & Support',
      icon: 'HelpCircle',
      path: '/help',
      roles: ['admin', 'analyst', 'user'],
    },
  ];

  // Filter navigation items based on user role
  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  // Render different sidebar variants
  if (variant === 'role-based') {
    return (
      <aside className={`h-screen bg-white border-r border-border flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/dashboard-home" className="flex items-center">
              <Icon name="BarChart2" className="text-primary h-6 w-6" />
              <span className="ml-2 font-semibold text-lg text-text-primary">DataSense</span>
            </Link>
          )}
          {isCollapsed && (
            <Link to="/dashboard-home" className="mx-auto">
              <Icon name="BarChart2" className="text-primary h-6 w-6" />
            </Link>
          )}
          <button 
            onClick={toggleSidebar} 
            className={`text-text-secondary hover:text-primary ${isCollapsed ? 'mx-auto mt-4' : ''}`}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-3 mb-6">
            {!isCollapsed && (
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                    JD
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-text-primary">John Doe</p>
                    <p className="text-xs text-text-tertiary capitalize">{userRole}</p>
                  </div>
                </div>
              </div>
            )}
            {isCollapsed && (
              <div className="flex justify-center">
                <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                  JD
                </div>
              </div>
            )}
          </div>
          
          <nav>
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2.5 mb-1 rounded-md ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-primary' :'text-text-secondary hover:bg-slate-50 hover:text-text-primary'
                } ${isCollapsed ? 'justify-center' : ''}`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                <Icon name={item.icon} size={20} />
                {!isCollapsed && <span className="ml-3 text-sm font-medium">{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <button className="flex items-center w-full text-sm text-danger font-medium">
              <Icon name="LogOut" size={20} />
              <span className="ml-3">Sign out</span>
            </button>
          ) : (
            <button className="flex justify-center w-full text-danger">
              <Icon name="LogOut" size={20} />
            </button>
          )}
        </div>
      </aside>
    );
  }
  
  // Default: Expanded or Collapsed sidebar
  return (
    <aside className={`h-screen bg-white border-r border-border flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <Link to="/dashboard-home" className="flex items-center">
            <Icon name="BarChart2" className="text-primary h-6 w-6" />
            <span className="ml-2 font-semibold text-lg text-text-primary">DataSense</span>
          </Link>
        )}
        {isCollapsed && (
          <Link to="/dashboard-home" className="mx-auto">
            <Icon name="BarChart2" className="text-primary h-6 w-6" />
          </Link>
        )}
        <button 
          onClick={toggleSidebar} 
          className={`text-text-secondary hover:text-primary ${isCollapsed ? 'mx-auto mt-4' : ''}`}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav>
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2.5 mb-1 mx-2 rounded-md ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-primary' :'text-text-secondary hover:bg-slate-50 hover:text-text-primary'
              } ${isCollapsed ? 'justify-center' : ''}`}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              <Icon name={item.icon} size={20} />
              {!isCollapsed && <span className="ml-3 text-sm font-medium">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-border">
        {!isCollapsed ? (
          <div>
            <div className="mb-4">
              <p className="text-xs text-text-tertiary uppercase font-medium mb-2">Current Version</p>
              <p className="text-sm text-text-secondary">v1.2.0</p>
            </div>
            <button className="flex items-center w-full text-sm text-danger font-medium">
              <Icon name="LogOut" size={20} />
              <span className="ml-3">Sign out</span>
            </button>
          </div>
        ) : (
          <button className="flex justify-center w-full text-danger">
            <Icon name="LogOut" size={20} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default SideBar;