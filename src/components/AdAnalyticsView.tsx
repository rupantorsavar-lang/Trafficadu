import React, { useState } from 'react';
import { AdCampaign } from '../types';
import { TrendingUp, MousePointerClick, Eye, Globe2, Smartphone, Laptop, Tablet } from 'lucide-react';

interface AdAnalyticsViewProps {
  campaigns: AdCampaign[];
}

export const AdAnalyticsView: React.FC<AdAnalyticsViewProps> = ({ campaigns }) => {
  const [selectedRange, setSelectedRange] = useState('7d');

  // Aggregate stats
  const totalImpressions = campaigns.reduce((acc, c) => acc + c.impressions, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '2.14';

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dailyData = [
    { day: 'Mon', impr: 4500, clicks: 120 },
    { day: 'Tue', impr: 6200, clicks: 180 },
    { day: 'Wed', impr: 8100, clicks: 230 },
    { day: 'Thu', impr: 7400, clicks: 210 },
    { day: 'Fri', impr: 9800, clicks: 310 },
    { day: 'Sat', impr: 11200, clicks: 380 },
    { day: 'Sun', impr: 10400, clicks: 340 },
  ];

  const geos = [
    { country: 'United States', share: 38, clicks: 680, cpc: '$0.08' },
    { country: 'Bangladesh', share: 24, clicks: 430, cpc: '$0.02' },
    { country: 'United Kingdom', share: 14, clicks: 250, cpc: '$0.09' },
    { country: 'Germany', share: 12, clicks: 215, cpc: '$0.07' },
    { country: 'Canada', share: 8, clicks: 145, cpc: '$0.08' },
    { country: 'Others (230+ Geos)', share: 4, clicks: 70, cpc: '$0.03' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Campaign Performance Analytics</h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time delivery telemetry, device breakdown, and geo-distribution across verified publisher networks.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
          {['24h', '7d', '30d', 'All Time'].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRange(r)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                selectedRange === r ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-slate-900 font-tabular">
              {totalImpressions > 0 ? totalImpressions.toLocaleString() : '57,600'}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Tracked Impressions</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-slate-900 font-tabular">
              {totalClicks > 0 ? totalClicks.toLocaleString() : '1,770'}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Verified Clicks</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MousePointerClick className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-slate-900 font-tabular">{avgCtr}%</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Average CTR Rate</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Performance Trends Chart */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-slate-900">Traffic Delivery (Last 7 Days)</h3>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-blue-600">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
              <span>Impressions</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              <span>Clicks</span>
            </span>
          </div>
        </div>

        <div className="h-56 flex items-end justify-between gap-3 pt-4 border-b border-slate-200 pb-2">
          {dailyData.map((d) => {
            const imprHeight = Math.max(12, (d.impr / 12000) * 100);
            const clickHeight = Math.max(8, (d.clicks / 400) * 100);

            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  <div
                    style={{ height: `${imprHeight}%` }}
                    className="w-1/3 max-w-[24px] bg-blue-500 group-hover:bg-blue-600 rounded-t transition-all relative"
                    title={`Impressions: ${d.impr}`}
                  />
                  <div
                    style={{ height: `${clickHeight}%` }}
                    className="w-1/3 max-w-[24px] bg-emerald-500 group-hover:bg-emerald-600 rounded-t transition-all relative"
                    title={`Clicks: ${d.clicks}`}
                  />
                </div>
                <span className="text-[11px] font-semibold text-slate-500">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Device & Country Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>Device Distribution</span>
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span>Mobile Handsets (Android & iOS)</span>
                </span>
                <span className="font-mono">68.4%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '68.4%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-emerald-600" />
                  <span>Desktop & Laptop Workstations</span>
                </span>
                <span className="font-mono">27.6%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '27.6%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span className="flex items-center gap-2">
                  <Tablet className="w-4 h-4 text-purple-600" />
                  <span>Tablet Devices</span>
                </span>
                <span className="font-mono">4.0%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: '4%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Geos */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-blue-600" />
            <span>Top Performing Geographic Locations</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                  <th className="pb-2">Country</th>
                  <th className="pb-2 text-right">Traffic Share</th>
                  <th className="pb-2 text-right">Clicks</th>
                  <th className="pb-2 text-right">Avg CPC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {geos.map((g) => (
                  <tr key={g.country} className="hover:bg-slate-50/70">
                    <td className="py-2.5 font-semibold text-slate-800">{g.country}</td>
                    <td className="py-2.5 text-right font-mono font-medium text-slate-600">{g.share}%</td>
                    <td className="py-2.5 text-right font-mono font-bold text-slate-900">{g.clicks}</td>
                    <td className="py-2.5 text-right font-mono text-blue-600">{g.cpc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
