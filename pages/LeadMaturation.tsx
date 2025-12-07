import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Plus, Share2, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import { DEFAULT_LEAD_STAGES } from '../constants';

const LeadMaturation: React.FC = () => {
  const [stages, setStages] = useState(DEFAULT_LEAD_STAGES);

  const updateSla = (id: string, newSla: number) => {
    setStages(stages.map(s => s.id === id ? { ...s, slaHours: newSla } : s));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-wk-navy dark:text-white">Lead Maturation Builder</h1>
          <p className="text-slate-500 dark:text-slate-400">Design MQL to Opportunity lifecycles and SLA triggers.</p>
        </div>
        <button className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-sm active:scale-95 transition-all">
          <Share2 size={18} /> Export Process
        </button>
      </motion.div>

      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <div className="min-w-[800px] flex items-center justify-between gap-4 py-8 px-2">
          {stages.map((stage, index) => (
            <React.Fragment key={stage.id}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="w-64 bg-white dark:bg-slate-800 rounded-xl shadow-lg border-t-4 border-t-wk-blue p-5 relative z-10 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-wk-navy dark:text-white">{stage.name}</h3>
                    <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 px-2 py-1 rounded">
                      {stage.owner}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">SLA Timer</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock size={16} className="text-wk-teal" />
                        <input 
                          type="number" 
                          value={stage.slaHours}
                          onChange={(e) => updateSla(stage.id, parseInt(e.target.value))}
                          className="w-16 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-sm text-center font-bold text-wk-navy dark:text-white focus:ring-2 focus:ring-wk-blue focus:border-transparent outline-none transition-all"
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-400">hours</span>
                      </div>
                    </div>
                    
                    <div className="bg-red-50 dark:bg-red-900/10 p-2 rounded border border-red-100 dark:border-red-900/30 flex gap-2 items-start">
                      <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-red-700 dark:text-red-300">
                        Auto-alert manager if untouched for {stage.slaHours}h
                      </p>
                    </div>
                  </div>
                </div>
                {/* Connector Line behind */}
                {index < stages.length - 1 && (
                  <div className="absolute top-1/2 -right-8 w-8 h-1 bg-slate-200 dark:bg-slate-700 -z-0" />
                )}
              </motion.div>
              
              {index < stages.length - 1 && (
                <div className="flex flex-col items-center justify-center text-slate-400">
                   <ArrowRight size={24} />
                   <span className="text-xs font-mono mt-1">Pass</span>
                </div>
              )}
            </React.Fragment>
          ))}
          
          <button className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-400 hover:text-wk-blue hover:border-wk-blue hover:bg-blue-50 dark:hover:bg-slate-800 hover:scale-110 active:scale-90 transition-all">
            <Plus size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="Stage Criteria Config">
          <div className="space-y-4">
             <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <p className="text-sm font-semibold text-wk-navy dark:text-white mb-2">Entry Criteria: MQL</p>
                <ul className="text-sm text-slate-600 dark:text-slate-300 list-disc pl-5 space-y-1">
                  <li>Lead Score &gt; 60</li>
                  <li>Valid Email & Phone present</li>
                  <li>Geography matches Active Territory</li>
                </ul>
             </div>
             <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <p className="text-sm font-semibold text-wk-navy dark:text-white mb-2">Exit Criteria: MQL → SAL</p>
                <ul className="text-sm text-slate-600 dark:text-slate-300 list-disc pl-5 space-y-1">
                  <li>SDR Sequence started</li>
                  <li>Initial contact attempt logged</li>
                </ul>
             </div>
          </div>
        </Card>

        <Card title="Marketing Ops Integration Placeholder">
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Share2 size={32} className="text-slate-400" />
            </div>
            <h4 className="font-semibold text-wk-navy dark:text-white">HubSpot / Marketo Sync</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Configuration ready. API endpoints mocked for bi-directional status updates.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LeadMaturation;