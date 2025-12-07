import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, FileText, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import { generateExecutiveSummary } from '../services/geminiService';
import { INITIAL_INSIGHTS } from '../constants';

const Insights: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    const summary = await generateExecutiveSummary();
    setAiSummary(summary);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-wk-navy dark:text-white flex items-center gap-3">
          AI Insights <Sparkles className="text-wk-teal" />
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Automated executive summaries driven by Gemini 2.5 Flash.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Action Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card title="Generate Report" className="border-t-4 border-t-wk-blue dark:border-t-wk-teal">
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm">
              Synthesize data from Pipeline, Compliance, and Performance modules into a weekly executive briefing.
            </p>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-wk-blue to-wk-navy dark:from-blue-600 dark:to-blue-800 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
              {loading ? "Analyzing Data..." : "Generate AI Summary"}
            </button>
          </Card>

          {/* Quick Insights List */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="space-y-4"
          >
             <h3 className="text-lg font-semibold text-wk-navy dark:text-white px-1">Key Signals</h3>
             {INITIAL_INSIGHTS.map((insight, idx) => (
               <Card key={idx} className="!p-4 border-l-4 border-l-wk-teal" delay={idx * 0.2}>
                 <h4 className="font-semibold text-wk-navy dark:text-white text-sm">{insight.title}</h4>
                 <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{insight.description}</p>
               </Card>
             ))}
          </motion.div>
        </div>

        {/* Results Panel */}
        <Card className="lg:col-span-2 min-h-[400px] flex flex-col">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
            <FileText className="text-wk-blue dark:text-blue-400" size={24} />
            <h2 className="text-xl font-bold text-wk-navy dark:text-white">Executive Briefing</h2>
          </div>
          
          <div className="flex-grow">
            {!aiSummary && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 opacity-60">
                <Sparkles size={48} className="mb-4 text-slate-300 dark:text-slate-600" />
                <p>Click "Generate AI Summary" to analyze current data.</p>
              </div>
            )}
            
            {loading && (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <Loader2 size={48} className="animate-spin text-wk-blue dark:text-wk-teal" />
                <p className="text-slate-500 dark:text-slate-400 animate-pulse">Consulting Gemini...</p>
              </div>
            )}

            {aiSummary && (
              <div className="prose prose-slate dark:prose-invert prose-sm max-w-none animate-in fade-in duration-500">
                <div dangerouslySetInnerHTML={{ __html: aiSummary }} />
              </div>
            )}
          </div>
          
          {aiSummary && (
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
              <button className="text-wk-blue dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1">
                Export to PDF <ArrowRight size={14} />
              </button>
            </div>
          )}
        </Card>

      </div>
    </div>
  );
};

export default Insights;