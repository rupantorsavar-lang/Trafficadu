import React, { useState } from 'react';
import { DepositLog } from '../types';
import { Search, Plus, CheckCircle2, Clock, XCircle, ArrowDownLeft } from 'lucide-react';

interface DepositLogViewProps {
  deposits: DepositLog[];
  onOpenDeposit: () => void;
}

export const DepositLogView: React.FC<DepositLogViewProps> = ({
  deposits,
  onOpenDeposit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDeposits = deposits.filter((d) =>
    d.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.gateway.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Deposit Logs & History</h2>
          <p className="text-xs text-slate-500 mt-1">
            Complete transaction record of all funds added through bKash, Nagad, USDT, and Card gateways.
          </p>
        </div>

        <button
          onClick={onOpenDeposit}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0b1325] hover:bg-[#182647] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Deposit</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-72">
        <input
          type="text"
          placeholder="Search by Transaction ID or Gateway..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {filteredDeposits.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <ArrowDownLeft className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No deposit records found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              You haven't deposited funds yet or no records match your filter.
            </p>
            <button
              onClick={onOpenDeposit}
              className="mt-4 px-4 py-2 bg-[#0b1325] text-white text-xs font-bold rounded-xl hover:bg-slate-800"
            >
              Deposit Funds Now
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-6">Gateway</th>
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-right">Charge</th>
                  <th className="py-3 px-4 text-right">Payable</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-6 text-right">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDeposits.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      {d.gateway}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 font-medium">
                      {d.transactionId}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600">
                      +${d.amount.toFixed(2)} USD
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-slate-500">
                      ${d.charge.toFixed(2)} USD
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      ${d.payable.toFixed(2)} USD
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-6 text-right text-slate-500 font-mono text-[11px]">
                      {new Date(d.date).toLocaleDateString()} {new Date(d.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
