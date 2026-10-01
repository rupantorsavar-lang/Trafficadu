import React, { useState } from 'react';
import { PLANS } from '../data/mockData';
import { PlanItem, UserProfile } from '../types';
import { Check, Sparkles, Gift, AlertCircle } from 'lucide-react';

interface PlansViewProps {
  user: UserProfile;
  onBuyPlan: (plan: PlanItem) => boolean;
  onOpenDeposit: () => void;
}

export const PlansView: React.FC<PlansViewProps> = ({ user, onBuyPlan, onOpenDeposit }) => {
  const [purchasedPlanId, setPurchasedPlanId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePurchase = (plan: PlanItem) => {
    setErrorMsg(null);
    if (user.balance < plan.price) {
      setErrorMsg(`Insufficient balance ($${user.balance.toFixed(2)}). Please deposit $${(plan.price - user.balance).toFixed(2)} USD to purchase ${plan.name}.`);
      return;
    }

    const ok = onBuyPlan(plan);
    if (ok) {
      setPurchasedPlanId(plan.id);
      setTimeout(() => setPurchasedPlanId(null), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Traffic Bundles & Advertising Plans</h2>
          <p className="text-xs text-slate-500 mt-1">
            Bulk traffic packages with high priority delivery across all 8 premium ad formats.
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

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-700 font-semibold">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
          <button
            onClick={onOpenDeposit}
            className="px-3 py-1 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700"
          >
            Deposit Now
          </button>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANS.map((plan) => {
          const isPurchased = purchasedPlanId === plan.id;

          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'bg-white border-2 border-blue-600 shadow-md ring-4 ring-blue-50'
                  : 'bg-white border border-slate-200/80 shadow-xs hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h3>
                <div className="my-4">
                  <span className="text-3xl font-black text-slate-900 font-tabular">${plan.price}</span>
                  <span className="text-xs text-slate-500 font-medium"> / one-time</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-6 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Impressions:</span>
                    <span className="font-bold text-slate-900 font-tabular">{plan.impressions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Clicks:</span>
                    <span className="font-bold text-emerald-600 font-tabular">{plan.clicks.toLocaleString()}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  onClick={() => handlePurchase(plan)}
                  className={`w-full py-2.5 text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                    isPurchased
                      ? 'bg-emerald-600 text-white'
                      : plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                      : 'bg-[#0b1325] hover:bg-[#182647] text-white'
                  }`}
                >
                  {isPurchased ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Activated!</span>
                    </>
                  ) : (
                    <>
                      <Gift className="w-3.5 h-3.5" />
                      <span>Buy Pack (${plan.price})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
