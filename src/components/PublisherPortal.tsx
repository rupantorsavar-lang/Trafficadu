import React, { useState } from 'react';
import { TrafficaduLogo } from './TrafficaduLogo';
import { PageView, UserProfile } from '../types';
import { 
  Globe, 
  Code, 
  DollarSign, 
  Copy, 
  Check, 
  Plus, 
  ArrowLeft, 
  TrendingUp, 
  Download,
  CheckCircle2
} from 'lucide-react';

interface PublisherPortalProps {
  user: UserProfile;
  onSwitchToAdvertiser: () => void;
  onGoHome: () => void;
}

export const PublisherPortal: React.FC<PublisherPortalProps> = ({
  user,
  onSwitchToAdvertiser,
  onGoHome,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('banner-728');
  const [newSiteDomain, setNewSiteDomain] = useState('');
  const [sites, setSites] = useState([
    { id: '1', domain: 'technews24.com', category: 'Tech & Gadgets', status: 'Approved', dailyImpr: '14,200', earnings: '$34.80' },
    { id: '2', domain: 'dailyviralhub.net', category: 'Entertainment', status: 'Approved', dailyImpr: '28,900', earnings: '$62.15' },
  ]);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const embedCodeSnippet = `<!-- Trafficadu Ad Network Tag [${selectedFormat}] -->
<script async src="https://cdn.trafficadu.com/tag.js" data-zone="tz_${Math.floor(100000 + Math.random() * 900000)}"></script>
<ins class="trafficadu-unit" data-format="${selectedFormat}" data-width="auto"></ins>
<!-- End Trafficadu Tag -->`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(embedCodeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAddSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSiteDomain.trim()) return;
    setSites([
      ...sites,
      {
        id: String(Date.now()),
        domain: newSiteDomain.trim().replace(/^https?:\/\//, ''),
        category: 'General Blog',
        status: 'Approved',
        dailyImpr: '0',
        earnings: '$0.00',
      },
    ]);
    setNewSiteDomain('');
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] flex flex-col font-sans">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <TrafficaduLogo size="sm" onClick={onGoHome} />
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Publisher Console
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSwitchToAdvertiser}
            className="px-3.5 py-1.5 bg-[#0b1325] hover:bg-[#182647] text-white text-xs font-bold rounded-lg transition-colors"
          >
            Switch to Advertiser Panel →
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 md:p-8 space-y-6 flex-1 w-full">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-semibold text-slate-500">Total Publisher Earnings</div>
            <div className="text-2xl font-black text-slate-900 font-mono mt-1">$96.95 USD</div>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="mt-3 text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Request Payout</span>
              <span>→</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-semibold text-slate-500">Today's Impressions</div>
            <div className="text-2xl font-black text-slate-900 font-mono mt-1">43,100</div>
            <span className="text-[11px] text-emerald-600 font-semibold">↑ 12% vs yesterday</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-semibold text-slate-500">Average eCPM</div>
            <div className="text-2xl font-black text-blue-600 font-mono mt-1">$2.25 USD</div>
            <span className="text-[11px] text-slate-400">Tier 1 & 2 weighted</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-semibold text-slate-500">Active Ad Zones</div>
            <div className="text-2xl font-black text-slate-900 font-mono mt-1">6 Zones</div>
            <span className="text-[11px] text-slate-400">100% Global Fill</span>
          </div>
        </div>

        {/* Ad Tag Generator */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-600" />
                <span>Publisher Ad Tag Code Generator</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Generate lightweight JavaScript embed tags to paste into your website's HTML template or WordPress header.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              >
                <option value="banner-728">Leaderboard (728 × 90)</option>
                <option value="push-notification">Web Push Notification</option>
                <option value="native-card">Native Recommendation Widget (300 × 250)</option>
                <option value="billboard-970">Billboard Banner (970 × 250)</option>
                <option value="direct-link">Smart Direct Link URL</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <pre className="p-4 bg-[#0b1325] text-blue-300 font-mono text-xs rounded-xl overflow-x-auto leading-relaxed">
              {embedCodeSnippet}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied Tag' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

        {/* Verified Websites List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-600" />
              <span>Registered Domains & Websites</span>
            </h3>

            <form onSubmit={handleAddSite} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="e.g. mynewblog.com"
                value={newSiteDomain}
                onChange={(e) => setNewSiteDomain(e.target.value)}
                className="px-3.5 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-blue-600"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#0b1325] hover:bg-[#182647] text-white text-xs font-bold rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Domain</span>
              </button>
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold">
                <tr>
                  <th className="py-2.5 px-4">Domain</th>
                  <th className="py-2.5 px-4">Category</th>
                  <th className="py-2.5 px-4 text-center">Status</th>
                  <th className="py-2.5 px-4 text-right">Daily Impressions</th>
                  <th className="py-2.5 px-4 text-right">Estimated Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sites.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-slate-900">{s.domain}</td>
                    <td className="py-3 px-4 text-slate-600">{s.category}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold">
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono">{s.dailyImpr}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600">{s.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in duration-150">
            {withdrawSuccess ? (
              <div className="text-center py-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-base font-bold text-slate-900">Payout Submitted</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Withdrawal of $96.95 USD has been queued to your bKash / USDT account.
                </p>
                <button
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setWithdrawSuccess(false);
                  }}
                  className="mt-4 px-4 py-2 bg-[#0b1325] text-white text-xs font-bold rounded-lg w-full"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">Request Publisher Payout</h3>
                  <button onClick={() => setShowWithdrawModal(false)} className="text-slate-400 font-bold">✕</button>
                </div>
                <div className="text-xs space-y-2">
                  <p className="text-slate-600">Available Balance: <strong className="font-mono text-slate-900">$96.95 USD</strong></p>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Select Payout Method</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs">
                      <option>bKash Personal / Agent (৳120/USD)</option>
                      <option>Nagad Personal</option>
                      <option>USDT (TRC-20)</option>
                      <option>Bank Wire (Bangladesh / International)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Account / Wallet Address</label>
                    <input
                      type="text"
                      placeholder="017XXXXXXXX or USDT Address"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setWithdrawSuccess(true)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm"
                >
                  Confirm Withdrawal ($96.95)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
