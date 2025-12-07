import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingUp, DollarSign, Activity, Download } from 'lucide-react';
import Card from '../components/ui/Card';
import { PIPELINE_FUNNEL, FORECAST_DATA, STALLED_DEALS, COLORS } from '../constants';
import { exportToCSV } from '../utils/exportUtils';

const Pipeline: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-wk-navy dark:text-white">Pipeline Hub</h1>
          <p className="text-slate-500 dark:text-slate-400">Real-time funnel analytics and forecasting.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Live Data</span>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Pipeline", value: "$3.2M", icon: <DollarSign size={20} />, color: "text-wk-blue dark:text-blue-400" },
          { label: "Win Rate", value: "24%", icon: <TrendingUp size={20} />, color: "text-wk-teal dark:text-teal-400" },
          { label: "Avg Cycle", value: "45 Days", icon: <Activity size={20} />, color: "text-purple-500 dark:text-purple-400" },
          { label: "Stalled Deals", value: "3", icon: <AlertCircle size={20} />, color: "text-wk-red dark:text-red-400" },
        ].map((kpi, idx) => (
          <Card key={idx} className="!p-4" delay={idx * 0.1}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{kpi.label}</p>
                <p className="text-2xl font-bold text-wk-navy dark:text-white mt-1">{kpi.value}</p>
              </div>
              <div className={`p-2 bg-slate-50 dark:bg-slate-700/50 rounded-full ${kpi.color}`}>
                {kpi.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Funnel Chart */}
        <Card title="Sales Funnel Stage Volume" subtitle="Deal count by stage">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={PIPELINE_FUNNEL}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis type="number" hide />
                <YAxis dataKey="stage" type="category" width={80} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#f8fafc'}}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={30}>
                  {PIPELINE_FUNNEL.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill || COLORS.wkBlue} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Forecast Line Chart */}
        <Card title="Revenue Forecast" subtitle="Projected vs Actual (6 Months)">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FORECAST_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.wkBlue} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={COLORS.wkBlue} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis dataKey="month" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#f8fafc'}} />
                <Area type="monotone" dataKey="value" stroke={COLORS.wkBlue} strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Stalled Deals Table */}
      <Card 
        title="Stalled Deal Detector" 
        subtitle="Opportunities with no activity > 30 days" 
        icon={<AlertCircle size={20} />}
        action={
          <button 
            onClick={() => exportToCSV(STALLED_DEALS, 'stalled_deals')}
            className="flex items-center gap-1 text-xs font-medium text-wk-blue dark:text-wk-teal hover:underline px-2 py-1"
          >
            <Download size={14} /> Export CSV
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/50">
              <tr>
                <th scope="col" className="px-6 py-4 rounded-tl-lg">Deal ID</th>
                <th scope="col" className="px-6 py-4">Owner</th>
                <th scope="col" className="px-6 py-4">Value</th>
                <th scope="col" className="px-6 py-4">Inactivity (Days)</th>
                <th scope="col" className="px-6 py-4 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {STALLED_DEALS.map((deal) => (
                <tr key={deal.deal_id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-wk-navy dark:text-white">{deal.deal_id}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{deal.owner}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">${deal.value.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                      {deal.inactivity_days} days
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-wk-blue dark:text-blue-400 hover:text-wk-navy dark:hover:text-blue-200 font-medium text-xs uppercase tracking-wide">
                      Nudge
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

export default Pipeline;