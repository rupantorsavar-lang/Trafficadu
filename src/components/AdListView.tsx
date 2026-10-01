import React, { useState } from 'react';
import { AdCampaign, PageView } from '../types';
import { 
  Play, 
  Pause, 
  Trash2, 
  ExternalLink, 
  BarChart2, 
  Plus, 
  Search,
  Filter
} from 'lucide-react';

interface AdListViewProps {
  campaigns: AdCampaign[];
  onToggleStatus: (id: string) => void;
  onDeleteCampaign: (id: string) => void;
  onNavigate: (view: PageView) => void;
}

export const AdListView: React.FC<AdListViewProps> = ({
  campaigns,
  onToggleStatus,
  onDeleteCampaign,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Paused'>('All');

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.adTypeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Search Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Campaigns & Ad Management</h2>
          <p className="text-xs text-slate-500 mt-1">
            Monitor real-time delivery, manage status, and inspect performance across all your ad formats.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('create-ad')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0b1325] hover:bg-[#182647] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl">
          {(['All', 'Active', 'Paused'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                statusFilter === tab
                  ? 'bg-[#0b1325] text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {filteredCampaigns.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No campaigns found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {searchTerm
                ? 'Try adjusting your search criteria.'
                : 'You have not launched any ad campaigns yet. Launch one to start reaching visitors.'}
            </p>
            <button
              onClick={() => onNavigate('create-ad')}
              className="mt-4 px-4 py-2 bg-[#0b1325] hover:bg-[#182647] text-white text-xs font-bold rounded-xl"
            >
              Create First Campaign
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-6">Campaign Info</th>
                  <th className="py-3 px-4">Format</th>
                  <th className="py-3 px-4 text-right">Daily Budget</th>
                  <th className="py-3 px-4 text-right">Spent</th>
                  <th className="py-3 px-4 text-right">Impressions</th>
                  <th className="py-3 px-4 text-right">Clicks</th>
                  <th className="py-3 px-4 text-right">CTR</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCampaigns.map((camp) => {
                  const ctr = camp.impressions > 0 ? ((camp.clicks / camp.impressions) * 100).toFixed(2) : '0.00';

                  return (
                    <tr key={camp.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-6">
                        <div className="font-bold text-slate-900 line-clamp-1">{camp.title}</div>
                        <a
                          href={camp.targetUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <span className="truncate max-w-[160px]">{camp.targetUrl}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        <div className="font-semibold text-slate-800">{camp.adTypeName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{camp.dimensions}</div>
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                        ${camp.dailyBudget.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono text-slate-700">
                        ${camp.spent.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-800">
                        {camp.impressions.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-800">
                        {camp.clicks.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-bold text-blue-600">
                        {ctr}%
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            camp.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {camp.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onToggleStatus(camp.id)}
                            title={camp.status === 'Active' ? 'Pause Campaign' : 'Resume Campaign'}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              camp.status === 'Active'
                                ? 'border-amber-300 text-amber-700 hover:bg-amber-50'
                                : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                            }`}
                          >
                            {camp.status === 'Active' ? (
                              <Pause className="w-3.5 h-3.5" />
                            ) : (
                              <Play className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <button
                            onClick={() => onNavigate('ad-analytics')}
                            title="Analytics"
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                          >
                            <BarChart2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onDeleteCampaign(camp.id)}
                            title="Delete Campaign"
                            className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
