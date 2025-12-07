import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Trophy, Map, Calculator, Download } from 'lucide-react';
import Card from '../components/ui/Card';
import { REPS, TERRITORIES, COLORS } from '../constants';
import { exportToCSV } from '../utils/exportUtils';

const Performance: React.FC = () => {
  // Compensation Simulator State
  const [quotaMult, setQuotaMult] = useState(1.0);
  const [winRateMult, setWinRateMult] = useState(1.0);

  // Simple sort for leaderboard
  const sortedReps = [...REPS].sort((a, b) => b.attainment - a.attainment);

  const calculateCommission = (base: number) => {
    return Math.round(base * 0.1 * quotaMult * winRateMult);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-wk-navy dark:text-white">Performance Suite</h1>
        <p className="text-slate-500 dark:text-slate-400">Sales territory analysis and rep leaderboards.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quota Attainment Chart */}
        <Card title="Quota Attainment (%)" subtitle="Current Period">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REPS} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis type="number" domain={[0, 120]} tick={{fill: '#94a3b8'}} />
                <YAxis dataKey="name" type="category" width={60} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', backgroundColor: '#1e293b', color: '#f8fafc'}} 
                />
                <Bar dataKey="attainment" barSize={20} radius={[0, 4, 4, 0]}>
                  {REPS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.attainment >= 100 ? COLORS.successGreen : entry.attainment < 80 ? COLORS.riskRed : COLORS.wkBlue} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Territory Heatmap (Visual List) */}
        <Card title="Territory Performance" icon={<Map size={20} />}>
          <div className="space-y-4">
            {TERRITORIES.map((t, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{t.region}</span>
                  <span className="text-xs text-slate-500 font-mono">{(t.score * 100).toFixed(0)}/100</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-wk-blue to-wk-teal transition-all duration-1000 ease-out"
                    style={{ width: `${t.score * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leaderboard */}
        <Card 
          title="Rep Leaderboard" 
          className="lg:col-span-2"
          action={
            <button 
              onClick={() => exportToCSV(sortedReps, 'rep_performance')}
              className="flex items-center gap-1 text-xs font-medium text-wk-blue dark:text-wk-teal hover:underline px-2 py-1"
            >
              <Download size={14} /> Export CSV
            </button>
          }
        >
           <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Rep Name</th>
                  <th className="px-6 py-4">Quota Target</th>
                  <th className="px-6 py-4">Attainment</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {sortedReps.map((rep, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-400">#{idx + 1}</td>
                    <td className="px-6 py-4 font-medium text-wk-navy dark:text-white flex items-center gap-2">
                      {idx === 0 && <Trophy size={16} className="text-yellow-500" />}
                      {rep.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">${rep.quota.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold dark:text-white">{rep.attainment}%</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${rep.attainment >= 100 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                        {rep.attainment >= 100 ? 'Achiever' : 'In Progress'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Comp Simulator */}
        <Card title="Compensation Simulator" icon={<Calculator size={20} />} className="bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-slate-800/80">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Quota Multiplier: {quotaMult}x</label>
              <input 
                type="range" 
                min="0.5" 
                max="2.0" 
                step="0.1" 
                value={quotaMult}
                onChange={(e) => setQuotaMult(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-wk-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Win Rate Impact: {winRateMult}x</label>
              <input 
                type="range" 
                min="0.8" 
                max="1.5" 
                step="0.05" 
                value={winRateMult}
                onChange={(e) => setWinRateMult(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-wk-teal"
              />
            </div>
            
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">Estimated Commission Pool</p>
              <p className="text-3xl font-bold text-wk-blue dark:text-blue-400 mt-1">
                ${calculateCommission(500000).toLocaleString()}
              </p>
              <p className="text-xs text-slate-400 mt-2">
                *Hypothetical projection based on current accelerator models.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Performance;