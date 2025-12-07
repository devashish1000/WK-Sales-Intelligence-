import React from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { login, isLoading } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 text-center">
        <div className="w-16 h-16 bg-wk-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-wk-blue/30">
          <ShieldCheck size={40} className="text-white" />
        </div>
        
        <h1 className="text-2xl font-bold text-wk-navy dark:text-white mb-2">WK Sales Ops Command</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Sign in with your corporate ID to access pipeline intelligence and compliance tools.
        </p>

        <button
          onClick={login}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-[#0078D4] hover:bg-[#006cbd] text-white rounded-lg font-medium shadow-md transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="#fff" d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z" />
            </svg>
          )}
          {isLoading ? 'Authenticating...' : 'Sign in with Microsoft SSO'}
        </button>

        <p className="mt-6 text-xs text-slate-400">
          Protected by Azure Active Directory. Access is logged.
        </p>
      </div>
    </div>
  );
};

export default Login;