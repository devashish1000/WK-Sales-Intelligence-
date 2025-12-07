import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileBarChart, Filter, LayoutGrid, CheckSquare, AlertOctagon } from 'lucide-react';
import Card from '../components/ui/Card';

const ReportingSuite: React.FC = () => {
  const [vizStyle, setVizStyle] = useState<'tableau' | 'powerbi'>('tableau');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-wk-navy dark:text-white">Reporting Suite</h1>
        <p className="text-slate-500 dark:text-slate-400">Ad hoc builder & pipeline governance scorecard.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ad Hoc Builder */}
        <Card title="Ad Hoc Report Builder" className="lg:col-span-2">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Metrics</label>
                <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 h-40 overflow-y-auto custom-scrollbar">
                   {['ARR', 'TCV', 'Win Rate', 'Sales Cycle', 'CAC', 'Churn Rate', 'Quota Attainment'].map((m) => (
                     <label key={m} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50 p-1 rounded transition-colors">
                       <input type="checkbox" className="rounded text-wk-blue focus:ring-wk-blue accent-wk-blue" /> {m}
                     </label>
                   ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Dimensions</label>
                <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 h-40 overflow-y-auto custom-scrollbar">
                   {['Territory', 'Rep Name', 'Product Line', 'Industry', 'Lead Source', 'Fiscal Quarter'].map((d) => (
                     <label key={d} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50 p-1 rounded transition-colors">
                       <input type="checkbox" className="rounded text-wk-blue focus:ring-wk-blue accent-wk-blue" /> {d}
                     </label>
                   ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                 <button 
                   onClick={() => setVizStyle('tableau')}
                   className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${vizStyle === 'tableau' ? 'bg-white dark:bg-slate-700 text-wk-blue shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                 >
                   Tableau Style
                 </button>
                 <button 
                   onClick={() => setVizStyle('powerbi')}
                   className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${vizStyle === 'powerbi' ? 'bg-white dark:bg-slate-700 text-yellow-600 dark:text-yellow-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                 >
                   Power BI Style
                 </button>
              </div>
              <button className="bg-wk-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-wk-navy hover:shadow-lg active:scale-95 transition-all shadow-sm">
                Generate Visualization
              </button>
            </div>
            
            {/* Mock Viz Output */}
            <div className="h-48 bg-slate-50 dark:bg-slate-900/50 rounded-lg flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700 group cursor-pointer hover:border-wk-blue hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
               <div className="text-center text-slate-400 group-hover:text-wk-blue transition-colors">
                 <FileBarChart size={32} className="mx-auto mb-2 opacity-50" />
                 <p className="text-sm">Select metrics to preview {vizStyle === 'tableau' ? 'Tableau' : 'Power BI'} visualization</p>
               </div>
            </div>
          </div>
        </Card>

        {/* Pipeline Governance */}
        <div className="space-y-6">
          <Card title="Pipeline Health Score" className="text-center bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-800/80">
            <div className="w-32 h-32 rounded-full border-8 border-wk-teal flex items-center justify-center mx-auto mb-4 shadow-lg shadow-wk-teal/20 relative">
              <span className="text-4xl font-extrabold text-wk-navy dark:text-white">82</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">Standardization Rating: <span className="text-green-500 font-bold">Good</span></p>
          </Card>

          <Card title="Hygiene Alerts">
             <div className="space-y-3">
               {[
                 { msg: "12 Opps missing Next Steps", priority: "High" },
                 { msg: "5 Deals in 'Commit' w/o Close Date", priority: "Critical" },
                 { msg: "Proposal stage > 90 days (3 opps)", priority: "Med" }
               ].map((alert, idx) => (
                 <div key={idx} className="flex gap-3 items-start p-2 bg-red-50 dark:bg-red-900/10 rounded border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors cursor-pointer">
                   <AlertOctagon size={16} className="text-red-500 mt-0.5 shrink-0" />
                   <div>
                     <p className="text-xs font-semibold text-red-800 dark:text-red-300">{alert.msg}</p>
                     <span className="text-[10px] uppercase font-bold text-red-600/70 dark:text-red-400">{alert.priority}</span>
                   </div>
                 </div>
               ))}
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportingSuite;