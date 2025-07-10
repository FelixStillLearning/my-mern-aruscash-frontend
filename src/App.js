import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toaster } from 'react-hot-toast';
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
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CategoriesPage from './pages/CategoriesPage';
import SettingsPage from './pages/SettingsPage';
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
  faSignOutAlt,
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
              <Route path='/transactions' element={<PrivateRoute />}>
                <Route path='/transactions' element={<TransactionsPage />} />
              </Route>
              <Route path='/analytics' element={<PrivateRoute />}>
                <Route path='/analytics' element={<AnalyticsPage />} />
              </Route>
              <Route path='/categories' element={<PrivateRoute />}>
                <Route path='/categories' element={<CategoriesPage />} />
              </Route>
              <Route path='/settings' element={<PrivateRoute />}>
                <Route path='/settings' element={<SettingsPage />} />
              </Route>
            </Routes>
          </main>
        </div>
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #334155',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#1e293b',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#1e293b',
            },
          },
        }}
      />
    </Router>
  );
}

export default App;
