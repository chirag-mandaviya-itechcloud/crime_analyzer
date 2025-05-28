import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';

const Header = ({ variant = 'standard' }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const notifications = [
    { id: 1, title: 'New data available', message: 'Latest sentiment analysis data is ready for review', time: '5 min ago', read: false },
    { id: 2, title: 'System update', message: 'System will undergo maintenance in 2 hours', time: '1 hour ago', read: false },
    { id: 3, title: 'Report generated', message: 'Your requested report has been generated', time: '3 hours ago', read: true },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search submission
    console.log('Search submitted:', searchQuery);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isUserMenuOpen) setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const getContextualTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard-home') return 'Dashboard';
    if (path === '/data-analysis-view') return 'Data Analysis';
    if (path === '/sentiment-analysis-report') return 'Sentiment Analysis Report';
    if (path === '/user-authentication') return 'User Authentication';
    return 'Analytics Dashboard';
  };

  // Render different header variants
  if (variant === 'compact') {
    return (
      <header className="bg-white border-b border-border shadow-sm">
        <div className="px-4 h-12 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard-home" className="flex items-center">
              <Icon name="BarChart2" className="text-primary h-5 w-5" />
              <span className="ml-1 font-semibold text-sm text-text-primary">DataSense</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              aria-label="Search"
              className="p-1.5 text-text-secondary hover:text-primary rounded-full hover:bg-slate-100"
              onClick={() => console.log('Open search')}
            >
              <Icon name="Search" size={18} />
            </button>
            
            <div className="relative">
              <button 
                aria-label="Notifications"
                className="p-1.5 text-text-secondary hover:text-primary rounded-full hover:bg-slate-100 relative"
                onClick={toggleNotifications}
              >
                <Icon name="Bell" size={18} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-danger"></span>
                )}
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg border border-border z-10 animate-fade-in">
                  <div className="p-2 border-b border-border">
                    <h3 className="font-medium text-sm">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className={`p-2 border-b border-border hover:bg-background ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">{notification.title}</h4>
                          <span className="text-xs text-text-tertiary">{notification.time}</span>
                        </div>
                        <p className="text-xs text-text-secondary mt-1">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 text-center border-t border-border">
                    <button className="text-xs text-primary hover:text-primary-dark">View all notifications</button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                aria-label="User menu"
                className="flex items-center"
                onClick={toggleUserMenu}
              >
                <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                  JD
                </div>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-border z-10 animate-fade-in">
                  <div className="p-2 border-b border-border">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-text-tertiary">john.doe@example.com</p>
                  </div>
                  <div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-text-primary hover:bg-background">Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-text-primary hover:bg-background">Settings</Link>
                    <button className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-background">Sign out</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
  
  if (variant === 'contextual') {
    return (
      <header className="bg-white border-b border-border shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/dashboard-home" className="flex items-center mr-6">
              <Icon name="BarChart2" className="text-primary h-6 w-6" />
              <span className="ml-2 font-semibold text-lg text-text-primary">DataSense</span>
            </Link>
            
            <div>
              <h1 className="text-xl font-semibold text-text-primary">{getContextualTitle()}</h1>
              <p className="text-sm text-text-secondary">
                {location.pathname === '/dashboard-home' && 'Overview of key metrics and insights'}
                {location.pathname === '/data-analysis-view' && 'Analyze and visualize your data'}
                {location.pathname === '/sentiment-analysis-report' && 'Detailed sentiment analysis results'}
                {location.pathname === '/user-authentication' && 'Manage user access and permissions'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {location.pathname === '/data-analysis-view' && (
              <button className="btn btn-primary py-1.5 px-3 text-sm">
                <Icon name="Download" size={16} className="mr-1.5" />
                Export Data
              </button>
            )}
            
            {location.pathname === '/sentiment-analysis-report' && (
              <button className="btn btn-primary py-1.5 px-3 text-sm">
                <Icon name="Share2" size={16} className="mr-1.5" />
                Share Report
              </button>
            )}
            
            <div className="relative">
              <button 
                aria-label="Notifications"
                className="p-2 text-text-secondary hover:text-primary rounded-full hover:bg-slate-100 relative"
                onClick={toggleNotifications}
              >
                <Icon name="Bell" size={20} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-danger"></span>
                )}
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-border z-10 animate-fade-in">
                  <div className="p-3 border-b border-border">
                    <h3 className="font-medium">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className={`p-3 border-b border-border hover:bg-background ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <div className="flex justify-between">
                          <h4 className="font-medium">{notification.title}</h4>
                          <span className="text-xs text-text-tertiary">{notification.time}</span>
                        </div>
                        <p className="text-sm text-text-secondary mt-1">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-border">
                    <button className="text-sm text-primary hover:text-primary-dark">View all notifications</button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                aria-label="User menu"
                className="flex items-center space-x-2"
                onClick={toggleUserMenu}
              >
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                  JD
                </div>
                <span className="text-sm font-medium text-text-primary hidden sm:block">John Doe</span>
                <Icon name="ChevronDown" size={16} className="text-text-secondary" />
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-border z-10 animate-fade-in">
                  <div className="p-3 border-b border-border">
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-text-tertiary">john.doe@example.com</p>
                  </div>
                  <div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-text-primary hover:bg-background">
                      <Icon name="User" size={16} className="inline mr-2 text-text-secondary" />
                      Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-text-primary hover:bg-background">
                      <Icon name="Settings" size={16} className="inline mr-2 text-text-secondary" />
                      Settings
                    </Link>
                    <Link to="/help" className="block px-4 py-2 text-sm text-text-primary hover:bg-background">
                      <Icon name="HelpCircle" size={16} className="inline mr-2 text-text-secondary" />
                      Help & Support
                    </Link>
                    <div className="border-t border-border mt-1"></div>
                    <button className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-background">
                      <Icon name="LogOut" size={16} className="inline mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
  
  // Default: Standard header
  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard-home" className="flex items-center mr-8">
            <Icon name="BarChart2" className="text-primary h-6 w-6" />
            <span className="ml-2 font-semibold text-xl text-text-primary">DataSense</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/dashboard-home" 
              className={`text-sm font-medium ${location.pathname === '/dashboard-home' ? 'text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/data-analysis-view" 
              className={`text-sm font-medium ${location.pathname === '/data-analysis-view' ? 'text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              Data Analysis
            </Link>
            <Link 
              to="/sentiment-analysis-report" 
              className={`text-sm font-medium ${location.pathname === '/sentiment-analysis-report' ? 'text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              Sentiment Analysis
            </Link>
            <Link 
              to="/user-authentication" 
              className={`text-sm font-medium ${location.pathname === '/user-authentication' ? 'text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              Users
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearchSubmit} className="hidden md:block relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-9 pr-4 py-2 w-64 bg-slate-50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Icon name="Search" className="absolute left-3 top-2.5 text-text-tertiary" size={16} />
          </form>
          
          <div className="relative">
            <button 
              aria-label="Notifications"
              className="p-2 text-text-secondary hover:text-primary rounded-full hover:bg-slate-100 relative"
              onClick={toggleNotifications}
            >
              <Icon name="Bell" size={20} />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-danger"></span>
              )}
            </button>
            
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-border z-10 animate-fade-in">
                <div className="p-3 border-b border-border flex justify-between items-center">
                  <h3 className="font-medium">Notifications</h3>
                  <button className="text-xs text-primary hover:text-primary-dark">Mark all as read</button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notification => (
                    <div key={notification.id} className={`p-3 border-b border-border hover:bg-background ${!notification.read ? 'bg-blue-50' : ''}`}>
                      <div className="flex justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        <span className="text-xs text-text-tertiary">{notification.time}</span>
                      </div>
                      <p className="text-sm text-text-secondary mt-1">{notification.message}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-border">
                  <button className="text-sm text-primary hover:text-primary-dark">View all notifications</button>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              aria-label="User menu"
              className="flex items-center space-x-2"
              onClick={toggleUserMenu}
            >
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                JD
              </div>
              <span className="text-sm font-medium text-text-primary hidden sm:block">John Doe</span>
              <Icon name="ChevronDown" size={16} className="text-text-secondary hidden sm:block" />
            </button>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-border z-10 animate-fade-in">
                <div className="p-3 border-b border-border">
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-text-tertiary">john.doe@example.com</p>
                </div>
                <div>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-text-primary hover:bg-background">
                    <Icon name="User" size={16} className="inline mr-2 text-text-secondary" />
                    Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-text-primary hover:bg-background">
                    <Icon name="Settings" size={16} className="inline mr-2 text-text-secondary" />
                    Settings
                  </Link>
                  <Link to="/help" className="block px-4 py-2 text-sm text-text-primary hover:bg-background">
                    <Icon name="HelpCircle" size={16} className="inline mr-2 text-text-secondary" />
                    Help & Support
                  </Link>
                  <div className="border-t border-border mt-1"></div>
                  <button className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-background">
                    <Icon name="LogOut" size={16} className="inline mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;