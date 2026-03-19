import { motion } from 'framer-motion';
import { getGapColor } from '../data/mockData';
import { Lightbulb, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export default function ReasoningPanel({ reasoning }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'matched':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'weak':
        return <AlertTriangle className="w-5 h-5" />;
      case 'missing':
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'matched':
        return 'Strength';
      case 'weak':
        return 'Improvement Area';
      case 'missing':
        return 'Critical Gap';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-800/60 overflow-hidden shadow-indigo-100/20 dark:shadow-none"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800 dark:to-slate-900 px-8 py-6 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 rounded-xl">
            <Lightbulb className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Why This Roadmap Was Generated</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">AI reasoning behind each recommendation</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {reasoning.map((item, index) => {
            const colors = getGapColor(item.type);

            return (
              <motion.div
                key={index}
                variants={itemVariant}
                className={`flex items-start gap-4 p-5 rounded-xl border ${colors.bg} ${colors.border} dark:bg-slate-800 dark:border-opacity-30`}
              >
                <div className={`p-2 rounded-lg ${colors.bg} ${colors.text} dark:bg-slate-700/50`}>
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${colors.text} ${colors.bg} ${colors.border} dark:bg-slate-700/50 dark:border-opacity-40`}>
                      {item.skill}
                    </span>
                    <span className={`text-xs font-medium ${colors.text} opacity-90`}>
                      {getTypeLabel(item.type)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item.reason}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Summary */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
              <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-indigo-900 dark:text-indigo-300">Personalized Learning Path</p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">
                This roadmap prioritizes critical gaps first, then builds on your existing strengths.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}