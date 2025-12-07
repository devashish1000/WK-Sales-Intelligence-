import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, BarChart3, Activity, PieChart, BrainCircuit, Info, Moon, Sun, 
  Map, Workflow, Settings, FileText, FileBarChart, Zap, Users, LogOut, LayoutGrid, ChevronDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { clsx } from 'clsx';

const Navbar: React.FC = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
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

  const mainLinks = [
    { name: 'Home', path: '/', icon: <ShieldCheck size={18} /> },
    { name: 'Pipeline', path: '/pipeline', icon: <BarChart3 size={18} /> },
    { name: 'Compliance', path: '/compliance', icon: <Activity size={18} /> },
    { name: 'Performance', path: '/performance', icon: <PieChart size={18} /> },
    { name: 'Insights', path: '/insights', icon: <BrainCircuit size={18} /> },
  ];

  const opsSuiteLinks = [
    { name: 'Territory Manager', path: '/territory-manager', icon: <Map size={16} /> },
    { name: 'Lead Workflow', path: '/lead-maturation', icon: <Workflow size={16} /> },
    { name: 'SFDC Console', path: '/sfdc-console', icon: <Settings size={16} /> },
    { name: 'Deal Desk', path: '/deal-desk', icon: <FileText size={16} /> },
    { name: 'Partner Docs', path: '/partner-docs', icon: <Users size={16} /> },
    { name: 'Reporting', path: '/reporting-suite', icon: <FileBarChart size={16} /> },
    { name: 'Automation', path: '/workflow-automation', icon: <Zap size={16} /> },
  ];

  const isOpsActive = opsSuiteLinks.some(link => link.path === location.pathname);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-b border-wk-blue/10 dark:border-slate-700 shadow-sm transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3">
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

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-blue-50 dark:bg-slate-800 text-wk-blue dark:text-wk-teal"
                      : "text-slate-600 dark:text-slate-400 hover:text-wk-blue dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                  )
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}

            {/* Ops Suite Dropdown */}
            <div className="relative group ml-1">
              <button
                className={clsx(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none",
                  isOpsActive
                    ? "bg-blue-50 dark:bg-slate-800 text-wk-blue dark:text-wk-teal"
                    : "text-slate-600 dark:text-slate-400 hover:text-wk-blue dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <LayoutGrid size={18} />
                <span>Ops Suite</span>
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full right-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-[60]">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden p-1">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Advanced Tools</span>
                  </div>
                  {opsSuiteLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      className={({ isActive }) =>
                        clsx(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                          isActive
                            ? "bg-blue-50 dark:bg-slate-800 text-wk-blue dark:text-wk-teal"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-wk-blue dark:hover:text-white"
                        )
                      }
                    >
                      <div className={clsx("p-1.5 rounded-md", location.pathname === link.path ? "bg-white dark:bg-slate-700 shadow-sm" : "bg-slate-100 dark:bg-slate-800")}>
                        {link.icon}
                      </div>
                      <span>{link.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            <NavLink
               to="/about"
               className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ml-1",
                    isActive
                      ? "bg-blue-50 dark:bg-slate-800 text-wk-blue dark:text-wk-teal"
                      : "text-slate-600 dark:text-slate-400 hover:text-wk-blue dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                  )
                }
            >
              <Info size={18} />
              <span>About</span>
            </NavLink>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700 ml-4">
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