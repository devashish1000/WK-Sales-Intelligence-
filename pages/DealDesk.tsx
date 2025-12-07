import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, PieChart, FileCheck, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, PieChart as RePie, Pie, Cell, Tooltip } from 'recharts';
import Card from '../components/ui/Card';
import { COLORS } from '../constants';

const DealDesk: React.FC = () => {
  const [price, setPrice] = useState(100000);
  const [discount, setDiscount] = useState(15);
  const [cost, setCost] = useState(40000);

  const finalPrice = price * (1 - discount / 100);
  const margin = finalPrice - cost;
  const marginPercent = (margin / finalPrice) * 100;

  const approvalRequired = discount > 20 || marginPercent < 30;

  const data = [
    { name: 'Cost', value: cost },
    { name: 'Margin', value: margin },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-wk-navy dark:text-white">Deal Desk Modeler</h1>
        <p className="text-slate-500 dark:text-slate-400">Pricing worksheets and margin analysis.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Pricing Worksheet" icon={<DollarSign size={20} />}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">List Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <input 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-wk-blue focus:border-transparent outline-none transition-all hover:border-slate-300 dark:hover:border-slate-600"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Discount %</label>
                <span className={`text-sm font-bold ${discount > 20 ? 'text-red-500' : 'text-slate-500'}`}>{discount}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-wk-blue hover:accent-wk-navy transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Estimated Cost</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <input 
                  type="number" 
                  value={cost} 
                  onChange={(e) => setCost(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-wk-blue focus:border-transparent outline-none transition-all hover:border-slate-300 dark:hover:border-slate-600"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600 dark:text-slate-400">Final Price</span>
                <span className="text-xl font-bold text-wk-navy dark:text-white">${finalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Projected Margin</span>
                <span className={`text-lg font-bold ${marginPercent < 30 ? 'text-red-500' : 'text-green-500'}`}>
                  {marginPercent.toFixed(1)}% (${margin.toLocaleString()})
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Profitability Impact" icon={<PieChart size={20} />}>
          <div className="flex flex-col items-center">
            <div className="h-64 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <RePie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  <Cell fill={COLORS.riskRed} />
                  <Cell fill={COLORS.successGreen} />
                  <Tooltip 
                     contentStyle={{borderRadius: '8px', border: 'none', backgroundColor: '#1e293b', color: '#f8fafc'}}
                     formatter={(value: number) => `$${value.toLocaleString()}`}
                  />
                </RePie>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="text-center">
                   <p className="text-xs text-slate-400 uppercase">Margin</p>
                   <p className="text-xl font-bold text-slate-800 dark:text-white">{marginPercent.toFixed(1)}%</p>
                 </div>
              </div>
            </div>
            
            {approvalRequired && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg flex items-start gap-3 max-w-sm"
              >
                <AlertTriangle className="text-yellow-600 dark:text-yellow-400 shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-sm text-yellow-800 dark:text-yellow-300">Approval Required</h4>
                  <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                    Triggers: {discount > 20 && 'Discount > 20%'} {discount > 20 && marginPercent < 30 && '&'} {marginPercent < 30 && 'Margin < 30%'}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm text-slate-600 dark:text-slate-300">
                      Route to: VP Sales
                    </span>
                    <span className="text-xs bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm text-slate-600 dark:text-slate-300">
                      Route to: Finance
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
            
            {!approvalRequired && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3"
              >
                <FileCheck className="text-green-600 dark:text-green-400" size={20} />
                <div>
                   <h4 className="font-bold text-sm text-green-800 dark:text-green-300">Auto-Approval</h4>
                   <p className="text-xs text-green-700 dark:text-green-400">Deal falls within standard guidelines.</p>
                </div>
              </motion.div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DealDesk;