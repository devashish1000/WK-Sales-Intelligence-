
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ShieldCheck, BarChart3, Activity, PieChart, BrainCircuit, Info, Moon, Sun, 
  Map, Workflow, Settings, FileText, FileBarChart, Zap, Users, LogOut
} from 'lucide-react';
import NavigationTicker, { NavItem } from './NavigationTicker';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { logout, user } = useAuth();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Consolidated Navigation Items for the Ticker
  const tickerItems: NavItem[] = [
    { name: 'Home', path: '/', icon: <ShieldCheck size={16} /> },
    { name: 'Pipeline Hub', path: '/pipeline', icon: <BarChart3 size={16} /> },
    { name: 'Compliance Engine', path: '/compliance', icon: <Activity size={16} /> },
    { name: 'Performance Suite', path: '/performance', icon: <PieChart size={16} /> },
    { name: 'Insights', path: '/insights', icon: <BrainCircuit size={16} /> },
    { name: 'Territory Manager', path: '/territory-manager', icon: <Map size={16} /> },
    { name: 'Lead Workflow', path: '/lead-maturation', icon: <Workflow size={16} /> },
    { name: 'SFDC Console', path: '/sfdc-console', icon: <Settings size={16} /> },
    { name: 'Deal Desk', path: '/deal-desk', icon: <FileText size={16} /> },
    { name: 'Partner Docs', path: '/partner-docs', icon: <Users size={16} /> },
    { name: 'Reporting Suite', path: '/reporting-suite', icon: <FileBarChart size={16} /> },
    { name: 'Workflow Auto', path: '/workflow-automation', icon: <Zap size={16} /> },
    { name: 'About', path: '/about', icon: <Info size={16} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-b border-wk-blue/10 dark:border-slate-700 shadow-sm transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3 pr-4 border-r border-slate-200 dark:border-slate-700">
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-wk-blue dark:bg-wk-blue/80 rounded-lg flex items-center justify-center text-white shadow-lg shadow-wk-blue/20 group-hover:scale-105 transition-transform">
                <ShieldCheck size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-wk-navy dark:text-white text-sm tracking-tight leading-none">
                  WK Sales Ops
                </span>
                <span className="text-wk-teal text-xs font-medium tracking-wider leading-none mt-1">
                  COMMAND
                </span>
              </div>
            </NavLink>
          </div>

          {/* Ticker Section (Flexible Center) */}
          <div className="flex-1 overflow-hidden h-full flex items-center relative">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white/95 dark:from-slate-900/95 to-transparent z-10 pointer-events-none hidden md:block" />
            
            <NavigationTicker items={tickerItems} />
            
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/95 dark:from-slate-900/95 to-transparent z-10 pointer-events-none hidden md:block" />
          </div>

          {/* Actions Section */}
          <div className="flex-shrink-0 flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-700">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-wk-blue"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="hidden sm:flex items-center gap-3 pl-2">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-wk-navy dark:text-white">{user?.name}</p>
                <p className="text-[10px] text-slate-500 uppercase">{user?.role}</p>
              </div>
              <button 
                onClick={logout}
                className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
