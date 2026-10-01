import React, { useState } from 'react';
import { AD_TYPES } from '../data/mockData';
import { AdTypeItem, UserProfile } from '../types';
import { Check, Sparkles, AlertCircle, ShoppingCart } from 'lucide-react';

interface AdTypesViewProps {
  user: UserProfile;
  onCreateAdWithFormat: (adTypeId: string) => void;
  onBuyPoints: (type: 'clicks' | 'impressions', amount: number, cost: number) => boolean;
  onOpenDeposit: () => void;
}

export const AdTypesView: React.FC<AdTypesViewProps> = ({
  user,
  onCreateAdWithFormat,
  onBuyPoints,
  onOpenDeposit,
}) => {
  const [selectedAdForPlan, setSelectedAdForPlan] = useState<AdTypeItem | null>(null);
  const [purchaseTier, setPurchaseTier] = useState<number>(10);
  const [purchaseType, setPurchaseType] = useState<'impressions' | 'clicks'>('impressions');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const getBadgeClass = (category: string) => {
    switch (category) {
      case 'Banner':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Direct Link':
        return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'Article/Feed':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  const handleBuy = (ad: AdTypeItem) => {
    setSelectedAdForPlan(ad);
    setNotification(null);
  };

  const executePurchase = () => {
    if (!selectedAdForPlan) return;

    const cost = purchaseTier;
    if (user.balance < cost) {
      setNotification({
        type: 'error',
        message: `Insufficient balance ($${user.balance.toFixed(2)}). Please deposit at least $${(cost - user.balance).toFixed(2)} USD to buy this plan.`,
      });
      return;
    }

    const calculatedPoints =
      purchaseType === 'impressions'
        ? Math.floor((cost / selectedAdForPlan.cpmRate) * 1000)
        : Math.floor(cost / selectedAdForPlan.cpcRate);

    const success = onBuyPoints(purchaseType, calculatedPoints, cost);
    if (success) {
      setNotification({
        type: 'success',
        message: `Successfully purchased ${calculatedPoints.toLocaleString()} ${purchaseType} for ${selectedAdForPlan.name}!`,
      });
      setTimeout(() => {
        setSelectedAdForPlan(null);
        setNotification(null);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Description Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Available Ad Formats</h2>
          <p className="text-xs text-slate-500 mt-1">
            Browse our standard high-converting ad units and purchase traffic impressions or clicks directly.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Available Balance</span>
            <span className="text-sm font-bold text-slate-900 font-mono">${user.balance.toFixed(2)} USD</span>
          </div>
          <button
            onClick={onOpenDeposit}
            className="px-4 py-2 bg-[#0b1325] hover:bg-[#182647] text-white text-xs font-bold rounded-lg transition-colors"
          >
            Deposit
          </button>
        </div>
      </div>

      {/* 8 CARDS GRID (Exact 1:1 Match with Screenshot 4.PNG) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {AD_TYPES.map((ad) => (
          <div
            key={ad.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all"
          >
            <div>
              {/* Ad Title */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                {ad.name}
              </h3>

              {/* Type Badge */}
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="text-slate-500 font-medium">Type:</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${getBadgeClass(ad.category)}`}>
                  {ad.category}
                </span>
              </div>

              {/* Width */}
              <div className="flex items-center gap-2 mb-1.5 text-xs">
                <span className="text-slate-500 font-medium">Width:</span>
                <span className="font-semibold text-slate-800 font-mono">{ad.width}</span>
              </div>

              {/* Height */}
              <div className="flex items-center gap-2 mb-6 text-xs">
                <span className="text-slate-500 font-medium">Height:</span>
                <span className="font-semibold text-slate-800 font-mono">{ad.height}</span>
              </div>
            </div>

            {/* Buy Plan Button matching 4.PNG */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleBuy(ad)}
                className="w-full py-2.5 bg-[#0b1325] hover:bg-[#182647] text-white font-bold text-xs rounded-xl transition-colors shadow-xs active:scale-[0.99] flex items-center justify-center gap-1.5"
              >
                <span>Buy Plan</span>
              </button>

              <button
                onClick={() => onCreateAdWithFormat(ad.id)}
                className="w-full py-1.5 text-center text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline"
              >
                Create Ad with this format →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Buy Plan Modal */}
      {selectedAdForPlan && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Buy Traffic: {selectedAdForPlan.name}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Format: {selectedAdForPlan.width} × {selectedAdForPlan.height} ({selectedAdForPlan.category})
                </p>
              </div>
              <button
                onClick={() => setSelectedAdForPlan(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {notification && (
              <div
                className={`mb-4 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  notification.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {notification.type === 'success' ? (
                  <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                )}
                <span>{notification.message}</span>
              </div>
            )}

            <div className="space-y-4 text-xs">
              {/* Traffic Type Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  Select Traffic Model
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPurchaseType('impressions')}
                    className={`py-2 px-3 rounded-xl border text-center font-bold text-xs transition-colors ${
                      purchaseType === 'impressions'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    CPM (Impressions)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPurchaseType('clicks')}
                    className={`py-2 px-3 rounded-xl border text-center font-bold text-xs transition-colors ${
                      purchaseType === 'clicks'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    CPC (Targeted Clicks)
                  </button>
                </div>
              </div>

              {/* Package Amount Tiers */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  Choose Budget Tier
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 25, 50, 100].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setPurchaseTier(val)}
                      className={`py-2 rounded-xl border font-mono font-bold text-xs transition-colors ${
                        purchaseTier === val
                          ? 'border-[#0b1325] bg-[#0b1325] text-white'
                          : 'border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Yield Calculation */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Unit Rate:</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {purchaseType === 'impressions'
                      ? `$${selectedAdForPlan.cpmRate.toFixed(2)} / 1,000 Impr`
                      : `$${selectedAdForPlan.cpcRate.toFixed(2)} / Click`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Yield:</span>
                  <span className="font-mono font-bold text-emerald-600 text-sm">
                    {purchaseType === 'impressions'
                      ? `${Math.floor((purchaseTier / selectedAdForPlan.cpmRate) * 1000).toLocaleString()} Impressions`
                      : `${Math.floor(purchaseTier / selectedAdForPlan.cpcRate).toLocaleString()} Clicks`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 pt-1.5 border-t border-slate-200">
                  <span>Your Current Balance:</span>
                  <span className="font-mono font-bold text-slate-900">${user.balance.toFixed(2)} USD</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAdForPlan(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>

                {user.balance < purchaseTier ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAdForPlan(null);
                      onOpenDeposit();
                    }}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm"
                  >
                    Deposit Funds First
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={executePurchase}
                    className="flex-1 py-2.5 bg-[#0b1325] hover:bg-[#182647] text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Confirm (${purchaseTier})</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
