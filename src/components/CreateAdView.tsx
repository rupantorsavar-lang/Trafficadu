import React, { useState } from 'react';
import { AD_TYPES } from '../data/mockData';
import { AdCampaign, UserProfile } from '../types';
import { 
  Sparkles, 
  ExternalLink, 
  Image as ImageIcon, 
  AlertCircle, 
  CheckCircle2, 
  Sliders, 
  Globe 
} from 'lucide-react';

interface CreateAdViewProps {
  user: UserProfile;
  initialAdTypeId?: string;
  onCreateSuccess: (campaign: AdCampaign) => void;
  onOpenDeposit: () => void;
}

export const CreateAdView: React.FC<CreateAdViewProps> = ({
  user,
  initialAdTypeId,
  onCreateSuccess,
  onOpenDeposit,
}) => {
  const [selectedTypeId, setSelectedTypeId] = useState(initialAdTypeId || 'push');
  const [title, setTitle] = useState('');
  const [targetUrl, setTargetUrl] = useState('https://');
  const [imageUrl, setImageUrl] = useState('');
  const [cpcBid, setCpcBid] = useState('0.05');
  const [dailyBudget, setDailyBudget] = useState('10');
  const [geoTarget, setGeoTarget] = useState('Worldwide');
  const [errorMsg, setErrorMsg] = useState('');

  const selectedType = AD_TYPES.find((t) => t.id === selectedTypeId) || AD_TYPES[0];

  const sampleBanners = [
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter a campaign title.');
      return;
    }

    if (!targetUrl.trim() || targetUrl === 'https://') {
      setErrorMsg('Please enter a valid destination target URL.');
      return;
    }

    const budget = parseFloat(dailyBudget);
    if (isNaN(budget) || budget < 5) {
      setErrorMsg('Minimum daily budget is $5.00 USD.');
      return;
    }

    const newCampaign: AdCampaign = {
      id: 'camp-' + Date.now(),
      title: title.trim(),
      adTypeId: selectedType.id,
      adTypeName: selectedType.name,
      category: selectedType.category,
      dimensions: `${selectedType.width} × ${selectedType.height}`,
      targetUrl: targetUrl.trim(),
      imageUrl: imageUrl.trim() || undefined,
      status: 'Active',
      cpc: parseFloat(cpcBid) || selectedType.cpcRate,
      dailyBudget: budget,
      spent: 0,
      impressions: 0,
      clicks: 0,
      createdAt: new Date().toISOString(),
    };

    onCreateSuccess(newCampaign);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Create New Ad Campaign</h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure your campaign creative, targeting parameters, and budget to start driving traffic.
          </p>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-slate-400 block">Available Balance</span>
          <span className="text-sm font-bold text-slate-900 font-mono">${user.balance.toFixed(2)} USD</span>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs text-rose-700 font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Fields */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          {/* Ad Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Select Ad Format<span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {AD_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTypeId(t.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedTypeId === t.id
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="font-bold text-xs truncate">{t.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 truncate">{t.width} × {t.height}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Campaign Title */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Campaign Title<span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Summer Promo - Worldwide Mobile CPA"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Target URL */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Destination / Target URL<span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="url"
                required
                placeholder="https://yourlandingpage.com/offer"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
              />
              <ExternalLink className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Users clicking your ad will be directed to this address.</p>
          </div>

          {/* Banner Creative Image URL (If not Direct Link) */}
          {selectedType.id !== 'direct-link' && (
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Creative Banner Image URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="https://example.com/banner.png or select sample below"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                />
                <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>

              {/* Sample Quick Pick */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[11px] text-slate-400">Quick Fill:</span>
                {sampleBanners.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImageUrl(url)}
                    className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded hover:bg-blue-100"
                  >
                    Sample #{i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Geo Targeting & Bidding */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Geo Targeting
              </label>
              <select
                value={geoTarget}
                onChange={(e) => setGeoTarget(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="Worldwide">Worldwide (Global Distribution)</option>
                <option value="Tier1">Tier 1 (US, UK, CA, AU, DE)</option>
                <option value="BD">Bangladesh Only (Local Traffic)</option>
                <option value="Asia">South & East Asia</option>
                <option value="Europe">European Union</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                CPC Bid (USD per Click)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={cpcBid}
                  onChange={(e) => setCpcBid(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Daily Budget */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              Daily Budget (USD)<span className="text-rose-500">*</span>
            </label>
            <div className="relative flex rounded-xl">
              <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-bold">
                $
              </span>
              <input
                type="number"
                min="5"
                step="5"
                required
                value={dailyBudget}
                onChange={(e) => setDailyBudget(e.target.value)}
                className="block w-full rounded-none rounded-r-xl border border-slate-300 px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#0b1325] hover:bg-[#182647] text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Launch Campaign Now</span>
            </button>
          </div>
        </div>

        {/* Right Col: Live Creative Dimension Preview */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Live Format Preview</h3>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-3">
              <div className="text-[11px] font-bold text-slate-600 uppercase">
                {selectedType.name} ({selectedType.width} × {selectedType.height})
              </div>

              {/* Dynamic Mock Ad Container */}
              <div className="mx-auto bg-white border border-slate-300 rounded-lg p-2 shadow-xs overflow-hidden max-w-full flex flex-col items-center justify-center min-h-[140px]">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Creative Preview"
                    referrerPolicy="no-referrer"
                    className="max-h-36 object-contain rounded"
                  />
                ) : (
                  <div className="text-center p-4">
                    <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2 text-xs font-bold">
                      Ad
                    </span>
                    <p className="text-xs font-bold text-slate-800 line-clamp-1">
                      {title || 'Your Ad Headline Here'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                      {targetUrl || 'destination-site.com'}
                    </p>
                  </div>
                )}
              </div>

              <div className="text-[11px] text-slate-500 text-left space-y-1 pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-semibold text-slate-800">{selectedType.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Daily Clicks:</span>
                  <span className="font-semibold text-emerald-600 font-mono">
                    ~{Math.floor((parseFloat(dailyBudget) || 10) / (parseFloat(cpcBid) || 0.05))} clicks
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="p-4 bg-blue-50 border border-blue-200/80 rounded-2xl text-xs text-blue-900 space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Instant Review Active</span>
            </div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Standard ads are approved in under 15 minutes. Ensure your target URL complies with our clean advertising network policy.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
