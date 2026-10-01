import React, { useState } from 'react';
import { UserProfile, AdCampaign, DepositLog, PageView } from '../types';
import {
  DollarSign,
  TrendingUp,
  MousePointerClick,
  Plus,
  ArrowUpRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

interface DashboardViewProps {
  user: UserProfile;
  campaigns: AdCampaign[];
  deposits: DepositLog[];
  onNavigate: (view: PageView) => void;
  onOpenDeposit: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  campaigns,
  deposits,
  onNavigate,
  onOpenDeposit,
}) => {
  // Chart timeframe state
  const [chartYear, setChartYear] = useState('2026');

  // Realistic monthly deposit logs data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Aggregate deposit logs by month if any
  const depositMonthlyAmounts = months.map((m, idx) => {
    const sum = deposits
      .filter((d) => {
        const dDate = new Date(d.date);
        return dDate.getMonth() === idx && d.status === 'Completed';
      })
      .reduce((acc, curr) => acc + curr.amount, 0);
    // Baseline sample curve if empty
    return sum > 0 ? sum : (idx === 2 ? 0 : 0);
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. SIX METRIC CARDS (Exact recreation of 2.PNG) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Balance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-tabular tracking-tight">
              ${user.balance.toFixed(2)}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Balance
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
            <DollarSign className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        {/* Card 2: Total Ads */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-tabular tracking-tight">
              {user.totalAds}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Total Ads
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
            <span className="w-5 h-5 bg-[#0b1325] text-white rounded text-[10px] font-black flex items-center justify-center">
              Ad
            </span>
          </div>
        </div>

        {/* Card 3: Total Clicks */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-tabular tracking-tight">
              {user.totalClicks.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Total Clicks
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
            <MousePointerClick className="w-5 h-5 stroke-[2]" />
          </div>
        </div>

        {/* Card 4: Total Impressions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-tabular tracking-tight">
              {user.totalImpressions.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Total Impressions
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
            <TrendingUp className="w-5 h-5 stroke-[2]" />
          </div>
        </div>

        {/* Card 5: Remain Clicks Points */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-tabular tracking-tight">
              {user.remainClicks.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Remain Clicks Points
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
            <MousePointerClick className="w-5 h-5 stroke-[2]" />
          </div>
        </div>

        {/* Card 6: Remain Impressions Points */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-tabular tracking-tight">
              {user.remainImpressions.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              Remain Impressions Points
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
            <TrendingUp className="w-5 h-5 stroke-[2]" />
          </div>
        </div>
      </div>

      {/* 2. MONTLY DEPOSIT LOGS CHART (Recreation of 2.PNG) */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Montly Deposit Logs
          </h2>

          <div className="flex items-center gap-3">
            <select
              value={chartYear}
              onChange={(e) => setChartYear(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
            >
              <option value="2026">Year 2026</option>
              <option value="2025">Year 2025</option>
            </select>

            <button
              onClick={onOpenDeposit}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0b1325] hover:bg-[#182647] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Deposit Now</span>
            </button>
          </div>
        </div>

        {/* Chart Canvas Area */}
        <div className="relative h-64 w-full pt-4">
          {/* Y Axis Gridlines (5.0, 4.0, 3.0, 2.0, 1.0, 0.0) */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[11px] font-mono text-slate-400">
            <div className="flex items-center w-full">
              <span className="w-8 shrink-0">5.0</span>
              <div className="flex-1 border-b border-slate-200" />
            </div>
            <div className="flex items-center w-full">
              <span className="w-8 shrink-0">4.0</span>
              <div className="flex-1 border-b border-slate-200" />
            </div>
            <div className="flex items-center w-full">
              <span className="w-8 shrink-0">3.0</span>
              <div className="flex-1 border-b border-slate-200" />
            </div>
            <div className="flex items-center w-full">
              <span className="w-8 shrink-0">2.0</span>
              <div className="flex-1 border-b border-slate-200" />
            </div>
            <div className="flex items-center w-full">
              <span className="w-8 shrink-0">1.0</span>
              <div className="flex-1 border-b border-slate-200" />
            </div>
            <div className="flex items-center w-full">
              <span className="w-8 shrink-0">0.0</span>
              <div className="flex-1 border-b border-slate-300" />
            </div>
          </div>

          {/* SVG Line / Bar Representation */}
          <div className="absolute inset-0 ml-8 flex items-end justify-between px-2 pb-6">
            {months.map((m, idx) => {
              const amount = depositMonthlyAmounts[idx];
              const barHeightPct = Math.min(100, Math.max(4, (amount / 50) * 100));

              return (
                <div key={m} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                  {/* Tooltip */}
                  <div className="absolute -top-8 hidden group-hover:flex bg-[#0b1325] text-white text-[10px] font-bold font-mono py-1 px-2 rounded shadow pointer-events-none whitespace-nowrap z-20">
                    {m}: ${amount.toFixed(2)}
                  </div>

                  {/* Interactive Bar Indicator */}
                  <div
                    style={{ height: `${barHeightPct}%` }}
                    className={`w-3 sm:w-6 rounded-t transition-all ${
                      amount > 0
                        ? 'bg-blue-600 group-hover:bg-blue-700 shadow-sm'
                        : 'bg-slate-200/50 group-hover:bg-slate-300'
                    }`}
                  />
                  {/* Month Label */}
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-2">
                    {m}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {deposits.length === 0 && (
          <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500">
            No deposits logged yet this month. Click <strong>Deposit Now</strong> to fund your advertising account.
          </div>
        )}
      </div>

      {/* 3. CAMPAIGN QUICK LAUNCH & RECENT CAMPAIGNS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Launch Card */}
        <div className="bg-gradient-to-br from-[#0b1325] to-[#1e293b] text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Launch Campaign</span>
            </div>
            <h3 className="text-xl font-bold font-display">Need Targeted Traffic?</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Create Push, Native, Billboard or Direct Link campaigns with instant global distribution across verified publishers.
            </p>
          </div>

          <div className="mt-6 space-y-2.5">
            <button
              onClick={() => onNavigate('create-ad')}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Ad</span>
            </button>
            <button
              onClick={() => onNavigate('ad-types')}
              className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-white/10"
            >
              <span>Explore 8 Ad Formats</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recent Campaigns Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900">Active Campaigns</h3>
            <button
              onClick={() => onNavigate('ad-list')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              View All ({campaigns.length})
            </button>
          </div>

          {campaigns.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <div className="w-10 h-10 rounded-full bg-slate-200/60 text-slate-500 flex items-center justify-center mx-auto mb-2">
                <span className="text-xs font-bold">Ad</span>
              </div>
              <p className="text-xs font-semibold text-slate-700">No campaigns created yet</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Start your first advertising campaign in seconds.</p>
              <button
                onClick={() => onNavigate('create-ad')}
                className="mt-3 px-4 py-1.5 bg-[#0b1325] text-white text-xs font-bold rounded-lg hover:bg-slate-800"
              >
                Create Ad Now
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                    <th className="pb-2">Campaign</th>
                    <th className="pb-2">Format</th>
                    <th className="pb-2 text-right">Impressions</th>
                    <th className="pb-2 text-right">Clicks</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {campaigns.slice(0, 4).map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80">
                      <td className="py-2.5 font-semibold text-slate-800">{c.title}</td>
                      <td className="py-2.5 text-slate-500">{c.adTypeName}</td>
                      <td className="py-2.5 text-right font-tabular">{c.impressions.toLocaleString()}</td>
                      <td className="py-2.5 text-right font-tabular">{c.clicks.toLocaleString()}</td>
                      <td className="py-2.5 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          c.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
