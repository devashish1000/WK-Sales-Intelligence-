import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { Map, ArrowRightLeft, User, DollarSign, Save } from 'lucide-react';
import Card from '../components/ui/Card';
import { TERRITORIES, COLORS } from '../constants';

const TerritoryManager: React.FC = () => {
  const [sourceAccounts, setSourceAccounts] = useState([
    { id: 'ACC-001', name: 'TechFlow Systems', value: 120000 },
    { id: 'ACC-002', name: 'Global Logistics', value: 85000 },
    { id: 'ACC-003', name: 'Apex Retail', value: 45000 },
  ]);
  const [targetAccounts, setTargetAccounts] = useState([
    { id: 'ACC-004', name: 'BioMed Labs', value: 210000 },
    { id: 'ACC-005', name: 'FinCorp LLC', value: 155000 },
  ]);

  const [quotaAdj, setQuotaAdj] = useState(1.1);

  const moveAccount = (id: string, direction: 'toTarget' | 'toSource') => {
    if (direction === 'toTarget') {
      const acc = sourceAccounts.find(a => a.id === id);
      if (acc) {
        setSourceAccounts(prev => prev.filter(a => a.id !== id));
        setTargetAccounts(prev => [...prev, acc]);
      }
    } else {
      const acc = targetAccounts.find(a => a.id === id);
      if (acc) {
        setTargetAccounts(prev => prev.filter(a => a.id !== id));
        setSourceAccounts(prev => [...prev, acc]);
      }
    }
  };

  const calculateTotal = (accounts: typeof sourceAccounts) => accounts.reduce((sum, acc) => sum + acc.value, 0);

  const coverageData = [
    { name: 'Source Rep', current: calculateTotal(sourceAccounts), capacity: 500000 },
    { name: 'Target Rep', current: calculateTotal(targetAccounts), capacity: 500000 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-wk-navy dark:text-white flex items-center gap-2">
          <Map className="text-wk-teal" /> Territory Transfer & Quota Manager
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Manage account transfers, quota adjustments, and territory balancing.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Transfer Board */}
        <Card title="Account Transfer Board" subtitle="Drag and drop simulation" icon={<ArrowRightLeft size={20} />} className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Source */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-slate-500" />
                  <span className="font-semibold text-wk-navy dark:text-white">Source Territory (North)</span>
                </div>
                <span className="text-xs font-mono bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
                  ${calculateTotal(sourceAccounts).toLocaleString()}
                </span>
              </div>
              <div className="space-y-2 min-h-[200px]">
                {sourceAccounts.map(acc => (
                  <div key={acc.id} onClick={() => moveAccount(acc.id, 'toTarget')} className="bg-white dark:bg-slate-700 p-3 rounded shadow-sm border border-slate-200 dark:border-slate-600 cursor-pointer hover:border-wk-blue hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all group flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm text-slate-800 dark:text-slate-200">{acc.name}</p>
                      <p className="text-xs text-slate-500">ID: {acc.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">${acc.value.toLocaleString()}</span>
                      <ArrowRightLeft size={14} className="text-wk-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
                {sourceAccounts.length === 0 && <p className="text-center text-sm text-slate-400 py-8">No accounts assigned</p>}
              </div>
            </div>

            {/* Target */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-slate-500" />
                  <span className="font-semibold text-wk-navy dark:text-white">Target Territory (East)</span>
                </div>
                <span className="text-xs font-mono bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
                  ${calculateTotal(targetAccounts).toLocaleString()}
                </span>
              </div>
              <div className="space-y-2 min-h-[200px]">
                {targetAccounts.map(acc => (
                  <div key={acc.id} onClick={() => moveAccount(acc.id, 'toSource')} className="bg-white dark:bg-slate-700 p-3 rounded shadow-sm border border-slate-200 dark:border-slate-600 cursor-pointer hover:border-wk-teal hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all group flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm text-slate-800 dark:text-slate-200">{acc.name}</p>
                      <p className="text-xs text-slate-500">ID: {acc.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <ArrowRightLeft size={14} className="text-wk-teal opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">${acc.value.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
                 {targetAccounts.length === 0 && <p className="text-center text-sm text-slate-400 py-8">No accounts assigned</p>}
              </div>
            </div>
          </div>
        </Card>

        {/* Quota Adjustment */}
        <Card title="Quota Adjustment Rules" icon={<DollarSign size={20} />}>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Uplift Multiplier</label>
                <span className="text-sm font-bold text-wk-blue dark:text-wk-teal">{Math.round((quotaAdj - 1) * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="1.0" 
                max="1.5" 
                step="0.01" 
                value={quotaAdj} 
                onChange={(e) => setQuotaAdj(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-wk-blue hover:accent-wk-navy transition-all"
              />
              <p className="text-xs text-slate-500 mt-2">Applies uniform uplift to target territory post-transfer.</p>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-slate-800 rounded-lg border border-blue-100 dark:border-slate-700">
              <h4 className="text-sm font-semibold text-wk-navy dark:text-white mb-2">Optimization Suggestion</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                Based on historical win rates, the Target Territory has 15% excess capacity. Recommend moving 2 more mid-market accounts.
              </p>
              <button className="text-xs bg-wk-blue text-white px-3 py-1.5 rounded hover:bg-wk-navy hover:shadow-md active:scale-95 transition-all">
                Apply Suggestion
              </button>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-wk-teal hover:bg-teal-500 text-white font-medium py-3 rounded-lg transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]">
              <Save size={18} /> Save & Recalculate Territories
            </button>
          </div>
        </Card>

        {/* Coverage Chart */}
        <Card title="Workload Coverage Impact" subtitle="Book of Business vs Capacity">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coverageData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis dataKey="name" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(val) => `$${val/1000}k`} tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <Tooltip 
                   cursor={{fill: 'transparent'}}
                   contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', backgroundColor: '#1e293b', color: '#f8fafc'}}
                />
                <Bar dataKey="current" name="Current Book" fill={COLORS.wkBlue} radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="capacity" name="Max Capacity" fill={COLORS.neutral} stroke={COLORS.wkNavy} strokeDasharray="5 5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TerritoryManager;