import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pipeline from './pages/Pipeline';
import Compliance from './pages/Compliance';
import Performance from './pages/Performance';
import Insights from './pages/Insights';
import About from './pages/About';
import TerritoryManager from './pages/TerritoryManager';
import LeadMaturation from './pages/LeadMaturation';
import SalesforceConsole from './pages/SalesforceConsole';
import DealDesk from './pages/DealDesk';
import PartnerDocs from './pages/PartnerDocs';
import ReportingSuite from './pages/ReportingSuite';
import WorkflowAutomation from './pages/WorkflowAutomation';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LegalModal } from './components/LegalModal';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Layout Component
const AuthenticatedApp: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null; // Or a splash screen

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-wk-teal/30 transition-colors duration-300 flex flex-col">
      <LegalModal />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/about" element={<About />} />
          
          {/* New Ops Modules */}
          <Route path="/territory-manager" element={<TerritoryManager />} />
          <Route path="/lead-maturation" element={<LeadMaturation />} />
          <Route path="/sfdc-console" element={<SalesforceConsole />} />
          <Route path="/deal-desk" element={<DealDesk />} />
          <Route path="/partner-docs" element={<PartnerDocs />} />
          <Route path="/reporting-suite" element={<ReportingSuite />} />
          <Route path="/workflow-automation" element={<WorkflowAutomation />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
                <h4 className="font-bold text-wk-navy dark:text-white mb-4">WK Sales Ops</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Empowering sales excellence through unified data intelligence and compliance automation.
                </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link to="/pipeline" className="hover:text-wk-blue dark:hover:text-wk-teal">Pipeline Hub</Link></li>
                <li><Link to="/compliance" className="hover:text-wk-blue dark:hover:text-wk-teal">Compliance Engine</Link></li>
                <li><Link to="/performance" className="hover:text-wk-blue dark:hover:text-wk-teal">Performance Suite</Link></li>
                <li><Link to="/sfdc-console" className="hover:text-wk-blue dark:hover:text-wk-teal">SFDC Console</Link></li>
              </ul>
            </div>
            <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                  <li>
                    <a 
                      href="https://www.wolterskluwer.com/en/about-us" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-wk-blue dark:hover:text-wk-teal"
                    >
                      About WK
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.wolterskluwer.com/en/careers" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-wk-blue dark:hover:text-wk-teal"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.wolterskluwer.com/en/solutions/ct-corporation/contact-us" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-wk-blue dark:hover:text-wk-teal"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                  <li>
                    <a 
                      href="https://www.wolterskluwer.com/en/privacy-cookies" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-wk-blue dark:hover:text-wk-teal"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.wolterskluwer.com/en/terms-of-use" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-wk-blue dark:hover:text-wk-teal"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.wolterskluwer.com/en/terms-of-use" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-wk-blue dark:hover:text-wk-teal"
                    >
                      Disclaimer
                    </a>
                  </li>
                </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-400 dark:text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Wolters Kluwer Prototype. Built for Demonstration Purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AuthenticatedApp />
      </Router>
    </AuthProvider>
  );
};

export default App;