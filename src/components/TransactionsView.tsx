import React, { useState } from 'react';
import { TransactionItem } from '../types';
import { ArrowUpRight, ArrowDownLeft, Search } from 'lucide-react';

interface TransactionsViewProps {
  transactions: TransactionItem[];
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = transactions.filter(
    (t) =>
      t.trx.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Account Financial Transactions</h2>
          <p className="text-xs text-slate-500 mt-1">
            Audited financial ledger detailing all top-ups, campaign expenditures, and point redemptions.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by TRX ID or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 px-4">
            <h3 className="text-sm font-bold text-slate-800">No transactions recorded</h3>
            <p className="text-xs text-slate-400 mt-1">Your deposits and campaign spendings will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-6">Transaction ID</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-6 text-right">Post Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-mono font-bold text-slate-800">
                      {t.trx}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                      {new Date(t.date).toLocaleDateString()} {new Date(t.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {t.details}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold">
                      <span className={t.type === '+' ? 'text-emerald-600' : 'text-rose-600'}>
                        {t.type}${t.amount.toFixed(2)} USD
                      </span>
                    </td>

                    <td className="py-3.5 px-6 text-right font-mono font-bold text-slate-900">
                      ${t.postBalance.toFixed(2)} USD
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
