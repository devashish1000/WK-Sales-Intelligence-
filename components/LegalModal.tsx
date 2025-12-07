import React, { useState, useEffect } from 'react';
import { ShieldAlert, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LegalModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = sessionStorage.getItem('wk_legal_accepted');
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem('wk_legal_accepted', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-700"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4 text-wk-red">
                <ShieldAlert size={32} />
                <h2 className="text-xl font-bold text-wk-navy dark:text-white">Confidential System</h2>
              </div>
              
              <div className="prose prose-sm dark:prose-invert text-slate-600 dark:text-slate-300 mb-6 max-h-60 overflow-y-auto">
                <p><strong>AUTHORIZED USE ONLY.</strong></p>
                <p>
                  You are accessing a Wolters Kluwer FCC | CT Corporation restricted system containing sensitive pipeline, revenue, and client compliance data.
                </p>
                <p>
                  By proceeding, you agree that:
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>You will not export data to unapproved devices.</li>
                  <li>All AI-generated insights must be verified before external use.</li>
                  <li>Access is logged and monitored for security purposes.</li>
                </ul>
              </div>

              <button 
                onClick={handleAccept}
                className="w-full py-3 bg-wk-blue hover:bg-wk-navy text-white font-bold rounded-lg transition-colors"
              >
                I Acknowledge & Accept
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};