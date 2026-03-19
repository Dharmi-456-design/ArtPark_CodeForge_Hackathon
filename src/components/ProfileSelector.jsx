import { Briefcase } from 'lucide-react';

export default function ProfileSelector({ selectedProfile, onProfileChange, profileOptions }) {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <Briefcase className="w-4 h-4 text-slate-400" />
        Demo Profile
      </label>
      <select
        value={selectedProfile}
        onChange={(e) => onProfileChange(e.target.value)}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all cursor-pointer"
      >
        {profileOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <p className="text-xs text-slate-400">Select a demo profile to see different skill gap scenarios</p>
    </div>
  );
}