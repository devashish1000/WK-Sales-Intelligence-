import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, BarChart2, ArrowRight, Zap, Settings, Map, Layers, Workflow, FileText, Users } from 'lucide-react';
import Card from '../components/ui/Card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-wk-teal/20 dark:bg-wk-teal/10 rounded-full blur-3xl" />
          <div className="absolute top-20 -left-20 w-72 h-72 bg-wk-blue/10 dark:bg-wk-blue/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-wk-blue/10 dark:bg-wk-blue/20 text-wk-blue dark:text-wk-teal text-xs font-semibold tracking-wider uppercase mb-4">
              Sales Operations Intelligence
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-wk-navy dark:text-white tracking-tight mb-6">
              Unified Command <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-wk-blue to-wk-teal dark:from-blue-400 dark:to-teal-400">
                for FCC | CT Corporation
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300">
              Pipeline visibility, compliance lifecycle management, and performance analytics in one cohesive interface.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/pipeline" className="px-8 py-3 rounded-lg bg-wk-blue text-white font-medium hover:bg-wk-navy transition-colors shadow-lg hover:shadow-xl flex items-center gap-2">
                Explore Pipeline Hub <ArrowRight size={18} />
              </Link>
              <Link to="/compliance" className="px-8 py-3 rounded-lg bg-white dark:bg-slate-800 text-wk-navy dark:text-white font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                View Compliance Engine
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="-mt-20 pb-16 relative z-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            title="Pipeline Visibility" 
            subtitle="Real-time metrics & forecasting"
            icon={<TrendingUp size={24} />}
            delay={0.2}
          >
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Monitor funnel velocity, stalled deals, and forecast accuracy with real-time data integration.
            </p>
            <Link to="/pipeline" className="text-wk-blue dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1">
              View Analytics <ArrowRight size={14} />
            </Link>
          </Card>

          <Card 
            title="Compliance Health" 
            subtitle="Entity lifecycle & risk scoring"
            icon={<Shield size={24} />}
            delay={0.4}
          >
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Proactive tracking of Good Standing status, annual report deadlines, and risk mitigation.
            </p>
            <Link to="/compliance" className="text-wk-blue dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1">
              Check Status <ArrowRight size={14} />
            </Link>
          </Card>

          <Card 
            title="Rep Performance" 
            subtitle="Quota attainment & territory insights"
            icon={<BarChart2 size={24} />}
            delay={0.6}
          >
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Analyze individual contributor performance against quotas and territory potential.
            </p>
            <Link to="/performance" className="text-wk-blue dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1">
              See Leaderboard <ArrowRight size={14} />
            </Link>
          </Card>
        </div>
      </section>

      {/* Advanced Capabilities Quick Links */}
      <section className="py-16 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
             <h2 className="text-2xl font-bold text-wk-navy dark:text-white">Advanced Operations Suite</h2>
             <p className="text-slate-500 dark:text-slate-400">Specialized modules for process optimization and governance.</p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <motion.div variants={itemVariants}>
              <Link to="/territory-manager" className="group p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md hover:border-wk-teal border border-transparent transition-all block h-full">
                <Map size={24} className="text-slate-400 group-hover:text-wk-teal mb-3" />
                <h3 className="font-semibold text-slate-800 dark:text-white">Territory Manager</h3>
                <p className="text-xs text-slate-500 mt-1">Quota & coverage balancing</p>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/lead-maturation" className="group p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md hover:border-wk-blue border border-transparent transition-all block h-full">
                <Workflow size={24} className="text-slate-400 group-hover:text-wk-blue mb-3" />
                <h3 className="font-semibold text-slate-800 dark:text-white">Lead Workflow</h3>
                <p className="text-xs text-slate-500 mt-1">MQL to Opportunity SLAs</p>
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link to="/sfdc-console" className="group p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md hover:border-blue-600 border border-transparent transition-all block h-full">
                <Settings size={24} className="text-slate-400 group-hover:text-blue-600 mb-3" />
                <h3 className="font-semibold text-slate-800 dark:text-white">SFDC Console</h3>
                <p className="text-xs text-slate-500 mt-1">Admin & automation rules</p>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/deal-desk" className="group p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md hover:border-green-500 border border-transparent transition-all block h-full">
                <FileText size={24} className="text-slate-400 group-hover:text-green-500 mb-3" />
                <h3 className="font-semibold text-slate-800 dark:text-white">Deal Desk</h3>
                <p className="text-xs text-slate-500 mt-1">Pricing & revenue models</p>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/partner-docs" className="group p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md hover:border-orange-500 border border-transparent transition-all block h-full">
                <Users size={24} className="text-slate-400 group-hover:text-orange-500 mb-3" />
                <h3 className="font-semibold text-slate-800 dark:text-white">Partner Docs</h3>
                <p className="text-xs text-slate-500 mt-1">Channel enablement hub</p>
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link to="/workflow-automation" className="group p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md hover:border-yellow-500 border border-transparent transition-all block h-full">
                <Zap size={24} className="text-slate-400 group-hover:text-yellow-500 mb-3" />
                <h3 className="font-semibold text-slate-800 dark:text-white">Workflow Engine</h3>
                <p className="text-xs text-slate-500 mt-1">Efficiency scanner & ROI</p>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/reporting-suite" className="group p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md hover:border-purple-500 border border-transparent transition-all block h-full">
                <Layers size={24} className="text-slate-400 group-hover:text-purple-500 mb-3" />
                <h3 className="font-semibold text-slate-800 dark:text-white">Reporting Suite</h3>
                <p className="text-xs text-slate-500 mt-1">Ad hoc builder & governance</p>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;