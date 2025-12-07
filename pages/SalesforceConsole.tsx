import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Database, PlayCircle, UploadCloud, Link, BookOpen } from 'lucide-react';
import Card from '../components/ui/Card';

const SalesforceConsole: React.FC = () => {
  const tools = [
    { title: "Automation Rules", icon: <PlayCircle size={24} />, desc: "Preview Flow & Process Builder logic.", color: "text-blue-500" },
    { title: "Data Governance", icon: <Database size={24} />, desc: "Duplicate detector & cleanup wizard.", color: "text-purple-500" },
    { title: "Bulk Loader", icon: <UploadCloud size={24} />, desc: "Staging area with validation rules.", color: "text-green-500" },
    { title: "Integrations Map", icon: <Link size={24} />, desc: "Connector status for ERP/MAP.", color: "text-orange-500" },
    { title: "Training Hub", icon: <BookOpen size={24} />, desc: "Onboarding modules for new reps.", color: "text-wk-teal" },
    { title: "Change Control", icon: <Settings size={24} />, desc: "Sandbox deployment manager.", color: "text-slate-500" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-wk-navy dark:text-white">Salesforce Operations Console</h1>
        <p className="text-slate-500 dark:text-slate-400">Admin tools, process automation, and data hygiene center.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, idx) => (
          <Card key={idx} className="hover:border-wk-blue dark:hover:border-wk-teal transition-all cursor-pointer group active:scale-[0.98]">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-slate-50 dark:bg-slate-800 rounded-lg ${tool.color} group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <span className="text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                Admin
              </span>
            </div>
            <h3 className="text-lg font-bold text-wk-navy dark:text-white mb-2 group-hover:text-wk-blue dark:group-hover:text-wk-teal transition-colors">
              {tool.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {tool.desc}
            </p>
          </Card>
        ))}
      </div>

      {/* Mock Sandbox Environment */}
      <Card title="Workflow Sandbox Simulator">
        <div className="bg-slate-900 rounded-lg p-6 font-mono text-sm text-slate-300 overflow-hidden relative shadow-inner">
          <div className="absolute top-2 right-4 text-xs text-green-400 flex items-center gap-1">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Running
          </div>
          <div className="space-y-2 opacity-80">
            <p className="text-blue-400">&gt; Initiating Process: Opportunity_Stage_Update</p>
            <p>&gt; Trigger: Stage changed to "Negotiation"</p>
            <p>&gt; Action: Create Task "Legal Review Required"</p>
            <p>&gt; Condition Check: Amount &gt; $50,000 ... <span className="text-green-400">TRUE</span></p>
            <p>&gt; Action: Email Alert sent to Deal Desk</p>
            <p className="text-yellow-400">&gt; Warning: Approval Process 2.0 latency detected (200ms)</p>
            <p className="text-green-400">&gt; Process Complete.</p>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <button className="bg-wk-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-wk-navy hover:shadow-lg active:scale-95 transition-all">
            Modify Trigger Logic
          </button>
          <button className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-sm active:scale-95 transition-all">
            View Audit Logs
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SalesforceConsole;