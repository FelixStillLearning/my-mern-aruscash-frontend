import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-dark-light transform -translate-x-full md:translate-x-0 transition duration-200 ease-in-out z-50">
      <div className="flex flex-col h-full p-4">
        {/* Logo */}
        <div className="flex items-center justify-center py-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <FontAwesomeIcon icon={faCoins} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">ArusKas</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-8">
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-primary/20 text-primary">
                <FontAwesomeIcon icon={faHome} className="w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/transactions" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-dark-lighter transition-colors">
                <FontAwesomeIcon icon={faExchangeAlt} className="w-5" />
                <span>Transactions</span>
              </Link>
            </li>
            <li>
              <Link to="/analytics" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-dark-lighter transition-colors">
                <FontAwesomeIcon icon={faChartPie} className="w-5" />
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link to="/categories" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-dark-lighter transition-colors">
                <FontAwesomeIcon icon={faTags} className="w-5" />
                <span>Categories</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-dark-lighter transition-colors">
                <FontAwesomeIcon icon={faCog} className="w-5" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Profile */}
        <div className="mt-auto mb-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-dark-lighter transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <span className="font-semibold">U</span>
            </div>
            <div className="flex-1">
              <p className="font-medium">User Account</p>
              <p className="text-xs text-gray-400">user@example.com</p>
            </div>
            <FontAwesomeIcon icon="chevron-down" className="text-gray-400 text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
