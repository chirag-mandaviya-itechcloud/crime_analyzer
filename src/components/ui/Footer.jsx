import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';

const Footer = ({ variant = 'standard' }) => {
  const currentYear = new Date().getFullYear();
  
  // Minimal footer variant
  if (variant === 'minimal') {
    return (
      <footer className="bg-white border-t border-border py-3 px-4">
        <div className="flex justify-between items-center">
          <div className="text-xs text-text-tertiary">
            &copy; {currentYear} DataSense Analytics. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-xs text-text-secondary hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-text-secondary hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    );
  }
  
  // Expanded footer variant
  if (variant === 'expanded') {
    return (
      <footer className="bg-white border-t border-border pt-8 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Icon name="BarChart2" className="text-primary h-6 w-6" />
                <span className="ml-2 font-semibold text-lg text-text-primary">DataSense</span>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Advanced analytics platform for data-driven insights and sentiment analysis.
              </p>
              <div className="flex space-x-3">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-tertiary hover:text-primary" aria-label="Twitter">
                  <Icon name="Twitter" size={18} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-tertiary hover:text-primary" aria-label="LinkedIn">
                  <Icon name="Linkedin" size={18} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-tertiary hover:text-primary" aria-label="GitHub">
                  <Icon name="Github" size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/features" className="text-sm text-text-secondary hover:text-primary">Features</Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-sm text-text-secondary hover:text-primary">Pricing</Link>
                </li>
                <li>
                  <Link to="/roadmap" className="text-sm text-text-secondary hover:text-primary">Roadmap</Link>
                </li>
                <li>
                  <Link to="/changelog" className="text-sm text-text-secondary hover:text-primary">Changelog</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/documentation" className="text-sm text-text-secondary hover:text-primary">Documentation</Link>
                </li>
                <li>
                  <Link to="/api" className="text-sm text-text-secondary hover:text-primary">API Reference</Link>
                </li>
                <li>
                  <Link to="/guides" className="text-sm text-text-secondary hover:text-primary">Guides</Link>
                </li>
                <li>
                  <Link to="/support" className="text-sm text-text-secondary hover:text-primary">Support</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-sm text-text-secondary hover:text-primary">About Us</Link>
                </li>
                <li>
                  <Link to="/careers" className="text-sm text-text-secondary hover:text-primary">Careers</Link>
                </li>
                <li>
                  <Link to="/blog" className="text-sm text-text-secondary hover:text-primary">Blog</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-text-secondary hover:text-primary">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-text-tertiary mb-4 md:mb-0">
              &copy; {currentYear} DataSense Analytics. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-text-secondary hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-text-secondary hover:text-primary">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-text-secondary hover:text-primary">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  // Default: Standard footer
  return (
    <footer className="bg-white border-t border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Icon name="BarChart2" className="text-primary h-5 w-5" />
            <span className="ml-2 font-semibold text-text-primary">DataSense</span>
            <span className="ml-4 text-sm text-text-tertiary">Version 1.2.0</span>
          </div>
          
          <div className="flex flex-wrap justify-center space-x-6">
            <Link to="/documentation" className="text-sm text-text-secondary hover:text-primary mb-2 md:mb-0">
              Documentation
            </Link>
            <Link to="/support" className="text-sm text-text-secondary hover:text-primary mb-2 md:mb-0">
              Support
            </Link>
            <Link to="/privacy" className="text-sm text-text-secondary hover:text-primary mb-2 md:mb-0">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-text-secondary hover:text-primary mb-2 md:mb-0">
              Terms of Service
            </Link>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-text-tertiary mb-4 md:mb-0">
            &copy; {currentYear} DataSense Analytics. All rights reserved.
          </div>
          
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-tertiary hover:text-primary" aria-label="Twitter">
              <Icon name="Twitter" size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-tertiary hover:text-primary" aria-label="LinkedIn">
              <Icon name="Linkedin" size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-tertiary hover:text-primary" aria-label="GitHub">
              <Icon name="Github" size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;