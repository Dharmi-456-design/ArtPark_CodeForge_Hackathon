import { motion } from 'framer-motion';
import { TrendingUp, Target, AlertTriangle, XCircle } from 'lucide-react';
import CircularProgress from './CircularProgress';

export default function GapSummary({
  readinessScore,
  matchPercentage,
  missingSkills,
  weakSkills,
}) {
  const stats = [
    {
      label: 'Match Rate',
      value: `${matchPercentage}%`,
      icon: TrendingUp,
      color: 'bg-indigo-100 text-indigo-600',
      trend: matchPercentage >= 70 ? 'up' : 'down',
    },
    {
      label: 'Missing Skills',
      value: missingSkills,
      icon: XCircle,
      color: 'bg-rose-100 text-rose-600',
      trend: missingSkills <= 1 ? 'up' : 'down',
    },
    {
      label: 'Weak Areas',
      value: weakSkills,
      icon: AlertTriangle,
      color: 'bg-amber-100 text-amber-600',
      trend: weakSkills <= 2 ? 'up' : 'down',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 px-8 py-6 border-b border-slate-200/60">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-100 rounded-xl">
            <Target className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Job Readiness</h2>
            <p className="text-sm text-slate-500 mt-0.5">Your preparedness for this role</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Circular Progress */}
          <div className="flex items-center justify-center">
            <CircularProgress score={readinessScore} />
          </div>

          {/* Stat Cards */}
          <div className="space-y-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100"
              >
                <div className={`p-2.5 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-800 mt-0.5">{stat.value}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  stat.trend === 'up' ? 'bg-emerald-500' : 'bg-rose-500'
                }`} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-700">Overall Progress</span>
            <span className="text-sm text-slate-500">{readinessScore}% complete</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${readinessScore}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className={`h-full rounded-full bg-gradient-to-r ${
                readinessScore >= 80
                  ? 'from-emerald-500 to-emerald-400'
                  : readinessScore >= 60
                  ? 'from-amber-500 to-amber-400'
                  : 'from-rose-500 to-rose-400'
              }`}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>Getting Started</span>
            <span>Role Ready</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}