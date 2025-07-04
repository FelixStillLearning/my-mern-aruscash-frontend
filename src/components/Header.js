import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ title }) => {
  return (
    <header className="sticky top-0 z-30 bg-dark-light/80 backdrop-blur-md border-b border-dark-lighter">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="w-10 h-10 rounded-full bg-dark-lighter flex items-center justify-center hover:bg-primary/20 transition-colors">
            <FontAwesomeIcon icon={faBell} className="text-gray-400" />
          </button>
          <button className="w-10 h-10 rounded-full bg-dark-lighter flex items-center justify-center hover:bg-primary/20 transition-colors">
            <FontAwesomeIcon icon="moon" className="text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
