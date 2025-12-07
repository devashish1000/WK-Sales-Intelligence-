import React from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { ChevronRight } from 'lucide-react';

export interface NavItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

interface NavigationTickerProps {
  items: NavItem[];
}

const NavigationTicker: React.FC<NavigationTickerProps> = ({ items }) => {
  // Duplicate items 3 times for a seamless loop on wide screens
  const tickerItems = [...items, ...items, ...items];

  return (
    <div className="w-full h-full flex items-center overflow-hidden relative group mask-fade">
      {/* 
        Mobile: Scrollable, No Animation 
        Desktop: Animated Ticker (Left -> Right) 
      */}
      <div className="flex md:animate-ticker-slide items-center md:w-max hover:[animation-play-state:paused] overflow-x-auto md:overflow-x-visible no-scrollbar">
        {tickerItems.map((item, index) => (
          <NavLink
            key={`${item.name}-${index}`}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "flex-shrink-0 flex items-center gap-2 px-6 py-2 text-sm font-medium transition-all duration-200 border-r border-slate-200 dark:border-slate-700/50 last:border-r-0",
                isActive
                  ? "text-wk-blue dark:text-wk-teal bg-blue-50/50 dark:bg-slate-800/50"
                  : "text-slate-600 dark:text-slate-400 hover:text-wk-blue dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
              )
            }
          >
            {item.icon && <span className="opacity-80">{item.icon}</span>}
            <span className="whitespace-nowrap">{item.name}</span>
            {/* Subtle indicator for direction */}
            <ChevronRight size={12} className="opacity-30 ml-1" />
          </NavLink>
        ))}
      </div>
      
      {/* Mobile-only fade indicators */}
      <div className="md:hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-slate-900 to-transparent pointer-events-none" />
      <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none" />
    </div>
  );
};

export default NavigationTicker;