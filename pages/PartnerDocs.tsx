import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Upload, Search, Tag, Eye } from 'lucide-react';
import Card from '../components/ui/Card';
import { PARTNER_DOCS } from '../constants';

const PartnerDocs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-wk-navy dark:text-white">Partner Documentation</h1>
          <p className="text-slate-500 dark:text-slate-400">Central repository for channel partner agreements and enablement.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-wk-blue transition-colors" size={16} />
             <input 
               type="text" 
               placeholder="Search docs..." 
               className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-wk-blue focus:border-transparent outline-none transition-all w-64"
             />
          </div>
          <button className="flex items-center gap-2 bg-wk-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-wk-navy hover:shadow-lg active:scale-95 transition-all shadow-sm">
            <Upload size={16} /> Upload New
          </button>
        </div>
      </motion.div>

      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Document Title</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Last Modified</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {PARTNER_DOCS.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded text-slate-500 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:text-wk-blue transition-colors">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-wk-navy dark:text-white">{doc.title}</p>
                        <p className="text-xs text-slate-400">{doc.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                      <Tag size={12} className="text-wk-teal" /> {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doc.status === 'Approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                      doc.status === 'Review' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                      'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{doc.lastModified}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-400 hover:text-wk-blue transition-colors">
                         <Eye size={16} />
                       </button>
                       <button className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-400 hover:text-wk-blue transition-colors">
                         <Download size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Approval Workflow">
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-8 h-8 rounded-full bg-wk-blue text-white flex items-center justify-center text-xs font-bold mb-2 shadow-md group-hover:scale-110 transition-transform">1</div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Draft</span>
            </div>
            <div className="h-0.5 flex-1 bg-wk-blue mx-2 rounded-full"></div>
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-8 h-8 rounded-full bg-wk-blue text-white flex items-center justify-center text-xs font-bold mb-2 shadow-md group-hover:scale-110 transition-transform">2</div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Legal</span>
            </div>
            <div className="h-0.5 flex-1 bg-slate-200 dark:bg-slate-700 mx-2 rounded-full"></div>
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center text-xs font-bold mb-2 group-hover:scale-110 transition-transform">3</div>
              <span className="text-xs text-slate-600 dark:text-slate-400">Live</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PartnerDocs;