import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  delay?: number;
  action?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className, title, subtitle, icon, delay = 0, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      className={clsx(
        "bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 shadow-xl dark:shadow-slate-900/50 rounded-2xl p-6 relative overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300 ease-out",
        className
      )}
    >
      {/* Cinematic subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-slate-700/20 pointer-events-none" />
      
      {(title || icon || action) && (
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex-1">
            {title && <h3 className="text-lg font-semibold text-wk-navy dark:text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2 ml-4">
            {action && (
              <div className="flex items-center">{action}</div>
            )}
            {icon && (
              <div className="p-2 bg-blue-50/50 dark:bg-slate-700/50 rounded-lg text-wk-blue dark:text-wk-teal shadow-sm">
                {icon}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;