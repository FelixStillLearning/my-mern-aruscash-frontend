import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoins,
  faHome,
  faExchangeAlt,
  faChartPie,
  faTags,
  faCog,
  faChevronDown,
  faBars,
  faBell,
  faMoon,
  faArrowUp,
  faArrowDown,
  faInfoCircle,
  faWallet,
  faShoppingBag,
  faPiggyBank,
  faPlus,
  faMinus,
  faChartLine,
  faUtensils,
  faFilm,
  faBriefcase,
  faArrowRight,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

library.add(
  faCoins,
  faHome,
  faExchangeAlt,
  faChartPie,
  faTags,
  faCog,
  faChevronDown,
  faBars,
  faBell,
  faMoon,
  faArrowUp,
  faArrowDown,
  faInfoCircle,
  faWallet,
  faShoppingBag,
  faPiggyBank,
  faPlus,
  faMinus,
  faChartLine,
  faUtensils,
  faFilm,
  faBriefcase,
  faArrowRight,
  faEdit,
  faTrash,
);

function App() {
  useEffect(() => {
    const mobileToggle = document.querySelector('.mobile-sidebar-toggle');
    const sidebar = document.querySelector('.fixed.inset-y-0.left-0');
    
    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener('click', function() {
        sidebar.classList.toggle('-translate-x-full');
      });
    }
  }, []);

  return (
    <Router>
      <div className="bg-dark-DEFAULT text-gray-100 font-sans min-h-screen flex">
        <Sidebar />

        {/* Mobile Sidebar Toggle */}
        <button className="mobile-sidebar-toggle md:hidden fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center">
          <FontAwesomeIcon icon={faBars} className="text-white" />
        </button>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 min-h-screen">
          <Header title="Dashboard" />

          {/* Main Content Area */}
          <main className="p-6">
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/dashboard' element={<PrivateRoute />}>
                <Route path='/dashboard' element={<DashboardPage />} />
              </Route>
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
