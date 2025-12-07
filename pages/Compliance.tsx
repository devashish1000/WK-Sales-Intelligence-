import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, FileText, Download } from 'lucide-react';
import Card from '../components/ui/Card';
import { ENTITY_LIFECYCLE, RISK_SCORES, COLORS } from '../constants';
import { exportToCSV } from '../utils/exportUtils';

const Compliance: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-wk-navy dark:text-white">Compliance Engine</h1>
        <p className="text-slate-500 dark:text-slate-400">Entity lifecycle management and risk scoring.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Status Traffic Lights */}
        <Card title="Portfolio Health" className="lg:col-span-1">
          <div className="flex flex-col gap-6 items-center justify-center py-6">
            <div className="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/50">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />
                <span className="font-semibold text-slate-700 dark:text-slate-200">Good Standing</span>
              </div>
              <span className="text-2xl font-bold text-green-700 dark:text-green-400">84%</span>
            </div>
            <div className="w-full flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800/50">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-yellow-600 dark:text-yellow-400" size={24} />
                <span className="font-semibold text-slate-700 dark:text-slate-200">At Risk</span>
              </div>
              <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">12%</span>
            </div>
            <div className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800/50">
              <div className="flex items-center gap-3">
                <XCircle className="text-red-600 dark:text-red-400" size={24} />
                <span className="font-semibold text-slate-700 dark:text-slate-200">Overdue</span>
              </div>
              <span className="text-2xl font-bold text-red-700 dark:text-red-400">4%</span>
            </div>
          </div>
        </Card>

        {/* Lifecycle Timeline */}
        <Card title="Entity Lifecycle Timeline" className="lg:col-span-2">
          <div className="relative py-10">
            {/* Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 rounded-full z-0" />
            
            <div className="relative z-10 flex justify-between px-2">
              {ENTITY_LIFECYCLE.map((event, idx) => (
                <div key={idx} className="flex flex-col items-center group cursor-pointer">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                    event.status === 'completed' ? 'bg-wk-blue border-blue-100 dark:border-blue-900 text-white' :
                    event.status === 'current' ? 'bg-white dark:bg-slate-800 border-wk-gold text-wk-gold shadow-lg scale-110' :
                    'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-400'
                  }`}>
                    {event.status === 'completed' && <CheckCircle2 size={16} />}
                    {event.status === 'current' && <div className="w-3 h-3 bg-wk-gold rounded-full animate-ping" />}
                  </div>
                  <div className="mt-4 text-center">
                    <p className={`text-sm font-semibold ${event.status === 'current' ? 'text-wk-navy dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                      {event.phase}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Risk Scoring Table */}
      <Card 
        title="High Risk Entities" 
        subtitle="Prioritized by composite risk score"
        action={
          <button 
            onClick={() => exportToCSV(RISK_SCORES, 'risk_scores')}
            className="flex items-center gap-1 text-xs font-medium text-wk-blue dark:text-wk-teal hover:underline px-2 py-1"
          >
            <Download size={14} /> Export CSV
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold">
              <tr>
                <th className="px-6 py-4">Entity Name</th>
                <th className="px-6 py-4">Risk Score</th>
                <th className="px-6 py-4">Missing Docs</th>
                <th className="px-6 py-4">Next Deadline</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {RISK_SCORES.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-wk-navy dark:text-white flex items-center gap-2">
                    <FileText size={16} className="text-slate-400" />
                    {item.entity}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            item.risk > 70 ? 'bg-red-500' : item.risk > 40 ? 'bg-yellow-500' : 'bg-green-500'
                          }`} 
                          style={{ width: `${item.risk}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs dark:text-slate-300">{item.risk}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 dark:text-slate-300">{item.missing_docs}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{item.deadline}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-wk-blue dark:text-blue-400 hover:text-wk-teal text-xs font-semibold px-3 py-1 rounded border border-blue-100 dark:border-blue-900/50 hover:border-wk-teal/30 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Compliance;