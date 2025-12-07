import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-wk-navy dark:text-white mb-2">About This Demo</h1>
        <p className="text-slate-500 dark:text-slate-400">WK Sales Operations Command Center Prototype</p>
      </motion.div>

      <Card>
        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <p>
            This front-end prototype was designed to illustrate Sales Operations, Compliance Lifecycle Management, and Performance Analytics capabilities relevant to Wolters Kluwer FCC | CT Corporation.
          </p>
          
          <div>
            <h3 className="text-lg font-semibold text-wk-navy dark:text-white mb-3">Key Features Demonstrated</h3>
            <ul className="list-disc pl-5 space-y-2 marker:text-wk-teal">
              <li><strong>Modern React Architecture:</strong> Built with React 18, TypeScript, and Tailwind CSS.</li>
              <li><strong>Data Visualization:</strong> Integrated Recharts for complex forecasting and funnel visualization.</li>
              <li><strong>AI Integration:</strong> Utilizes Google Gemini 2.5 Flash for generating executive summaries from raw JSON data.</li>
              <li><strong>Compliance Logic:</strong> Simulates entity lifecycle tracking and risk scoring logic.</li>
              <li><strong>Interactive UX:</strong> Includes glassmorphism effects, smooth transitions, and responsive layouts.</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-slate-700/50 p-4 rounded-lg border border-blue-100 dark:border-slate-600">
            <h4 className="text-sm font-bold text-wk-blue dark:text-blue-300 mb-2">Role Relevance</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              This application directly addresses the Senior Sales Operations Analyst requirements by combining technical front-end skills with domain knowledge of sales funnels, compliance risks, and territory performance.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default About;