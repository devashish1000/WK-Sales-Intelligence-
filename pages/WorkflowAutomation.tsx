import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Search, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';
import Card from '../components/ui/Card';

const WorkflowAutomation: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const startScan = () => {
    setScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-wk-navy dark:text-white flex items-center gap-2">
          <Zap className="text-yellow-500" /> Workflow Automation Engine
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Identify inefficiencies and calculate automation ROI.</p>
      </motion.div>

      <Card className="text-center py-12">
        {!scanning && !scanComplete && (
          <div className="max-w-md mx-auto">
             <Cpu size={48} className="mx-auto text-slate-300 mb-4" />
             <h2 className="text-xl font-bold text-wk-navy dark:text-white mb-2">Process Miner</h2>
             <p className="text-slate-500 dark:text-slate-400 mb-6">
               Scan current Sales Operations workflows to identify manual bottlenecks and redundancy.
             </p>
             <button 
               onClick={startScan}
               className="bg-wk-blue text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-wk-blue/30 hover:shadow-wk-blue/40 hover:bg-wk-navy hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-2 mx-auto"
             >
               Start System Scan <ArrowRight size={18} />
             </button>
          </div>
        )}

        {scanning && (
          <div className="max-w-md mx-auto">
             <div className="w-12 h-12 border-4 border-wk-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
             <p className="font-semibold text-slate-700 dark:text-slate-300">Analyzing Access Logs & User Activity...</p>
             <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-4 overflow-hidden">
               <div className="h-full bg-wk-blue animate-pulse w-2/3"></div>
             </div>
          </div>
        )}

        {scanComplete && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
            <div className="flex items-center gap-2 justify-center mb-8">
               <CheckCircle2 className="text-green-500" size={24} />
               <span className="text-lg font-bold text-green-700 dark:text-green-400">Scan Complete: 3 Opportunities Found</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Manual Data Entry", savings: "15 hrs/mo", desc: "Reps manually copying Lead data to Opportunity fields.", roi: "$12,000/yr" },
                { title: "Approval Latency", savings: "8 hrs/mo", desc: "Quote approvals sitting in email inboxes > 24h.", roi: "$6,500/yr" },
                { title: "Report Generation", savings: "4 hrs/mo", desc: "Sales Ops manually compiling Weekly Forecast Excel.", roi: "$3,200/yr" }
              ].map((opp, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-wk-teal hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-wk-navy dark:text-white">{opp.title}</h3>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold px-2 py-1 rounded">
                      {opp.savings}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 h-10">{opp.desc}</p>
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <span className="text-xs text-slate-500 uppercase tracking-wide">Est. ROI</span>
                    <span className="font-bold text-wk-blue dark:text-wk-teal">{opp.roi}</span>
                  </div>
                  <button className="w-full mt-4 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white py-2 rounded text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-wk-teal transition-colors">
                    View Solution
                  </button>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
               <button 
                 onClick={() => setScanComplete(false)} 
                 className="text-slate-500 hover:text-wk-blue text-sm underline"
               >
                 Reset Analysis
               </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default WorkflowAutomation;