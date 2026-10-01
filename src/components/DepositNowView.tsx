import React, { useState } from 'react';
import { GATEWAYS } from '../data/mockData';
import { DepositLog, TransactionItem, UserProfile } from '../types';
import { 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  CreditCard, 
  Smartphone, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface DepositNowViewProps {
  user: UserProfile;
  onDepositSuccess: (log: DepositLog, trx: TransactionItem, newBalance: number) => void;
  onViewLogs: () => void;
}

export const DepositNowView: React.FC<DepositNowViewProps> = ({
  user,
  onDepositSuccess,
  onViewLogs,
}) => {
  const [selectedGatewayId, setSelectedGatewayId] = useState('');
  const [amount, setAmount] = useState<string>('50');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessingModal, setIsProcessingModal] = useState(false);
  const [step, setStep] = useState<'form' | 'gateway-modal' | 'success'>('form');
  const [transactionRef, setTransactionRef] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedGateway = GATEWAYS.find((g) => g.id === selectedGatewayId);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedGatewayId) {
      setErrorMsg('Please select a payment gateway.');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMsg('Please enter a valid deposit amount.');
      return;
    }

    if (selectedGateway && numAmount < selectedGateway.minDeposit) {
      setErrorMsg(`Minimum deposit for ${selectedGateway.name} is $${selectedGateway.minDeposit}.`);
      return;
    }

    if (selectedGateway && numAmount > selectedGateway.maxDeposit) {
      setErrorMsg(`Maximum deposit limit is $${selectedGateway.maxDeposit}.`);
      return;
    }

    // Open realistic payment gateway modal
    setIsProcessingModal(true);
  };

  const handleConfirmPayment = () => {
    const numAmount = parseFloat(amount);
    const fee = selectedGateway ? (numAmount * selectedGateway.feePercent) / 100 : 0;
    const netDeposit = numAmount;
    const generatedTrx = 'TRX' + Math.floor(100000000 + Math.random() * 900000000);
    const now = new Date().toISOString();

    const newLog: DepositLog = {
      id: 'dep-' + Date.now(),
      transactionId: transactionRef || generatedTrx,
      gateway: selectedGateway?.name || 'Online Gateway',
      amount: numAmount,
      charge: fee,
      payable: numAmount + fee,
      status: 'Completed',
      date: now,
    };

    const newTrx: TransactionItem = {
      id: 'trx-' + Date.now(),
      trx: generatedTrx,
      date: now,
      amount: numAmount,
      type: '+',
      postBalance: user.balance + numAmount,
      details: `Deposit via ${selectedGateway?.name}`,
    };

    onDepositSuccess(newLog, newTrx, user.balance + numAmount);
    setStep('success');
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      {step === 'form' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8">
          {/* Card Title matching 3.PNG */}
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-6">
            Deposit
          </h2>

          {errorMsg && (
            <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs text-rose-700 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Field 1: Select Gateway* */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Select Gateway<span className="text-rose-500">*</span>
              </label>
              <select
                value={selectedGatewayId}
                onChange={(e) => {
                  setSelectedGatewayId(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              >
                <option value="">Select One</option>
                {GATEWAYS.map((gw) => (
                  <option key={gw.id} value={gw.id}>
                    {gw.name} ({gw.badge})
                  </option>
                ))}
              </select>
            </div>

            {/* Field 2: Amount* with USD addon */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Amount<span className="text-rose-500">*</span>
              </label>
              <div className="relative flex rounded-xl shadow-xs">
                <input
                  type="number"
                  step="any"
                  min="1"
                  required
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full rounded-none rounded-l-xl border border-r-0 border-slate-300 px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
                <span className="inline-flex items-center px-4 rounded-r-xl border border-l-0 border-slate-300 bg-slate-900 text-white text-xs font-bold font-mono tracking-wider">
                  USD
                </span>
              </div>
            </div>

            {/* Gateway Specification Box */}
            {selectedGateway && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Limit:</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    ${selectedGateway.minDeposit}.00 - ${selectedGateway.maxDeposit.toLocaleString()}.00 USD
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Charge:</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    {selectedGateway.feePercent === 0 ? 'Free (0%)' : `${selectedGateway.feePercent}%`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Conversion Rate:</span>
                  <span className="font-semibold text-blue-600 font-mono">
                    {selectedGateway.currencyRate}
                  </span>
                </div>
                {amount && !isNaN(parseFloat(amount)) && (
                  <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-slate-900">
                    <span>Total Credited:</span>
                    <span className="text-emerald-600 font-mono text-sm font-bold">
                      ${parseFloat(amount).toFixed(2)} USD
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button matching 3.PNG */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#0b1325] hover:bg-[#182647] text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-[0.99]"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Realistic Gateway Simulation Modal */}
      {isProcessingModal && step === 'form' && selectedGateway && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: selectedGateway.color }}
                >
                  {selectedGateway.id === 'bkash' ? 'bK' : selectedGateway.id === 'nagad' ? 'N' : '$'}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedGateway.name}</h3>
                  <p className="text-[11px] text-slate-500">Secure Gateway Checkout</p>
                </div>
              </div>
              <button
                onClick={() => setIsProcessingModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Gateway Specific Instructions */}
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-blue-900 leading-relaxed">
                  Deposit Amount: <strong className="font-mono text-sm">${parseFloat(amount).toFixed(2)} USD</strong>
                  <br />
                  Equivalent: <strong className="font-mono">{selectedGateway.currencyRate}</strong>
                </div>
              </div>

              {selectedGateway.id === 'bkash' || selectedGateway.id === 'nagad' ? (
                <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <p className="text-slate-600">
                    Send <strong>৳{(parseFloat(amount) * 120).toFixed(0)} BDT</strong> to the official Merchant Number:
                  </p>
                  <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-300 font-mono font-bold text-slate-900">
                    <span>01712-345678</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('01712-345678')}
                      className="text-blue-600 hover:text-blue-800 text-[11px] flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Enter Sender Transaction ID (TrxID)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 9J4K2L99A"
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono uppercase"
                    />
                  </div>
                </div>
              ) : selectedGateway.id === 'usdt' ? (
                <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
                  <div className="w-32 h-32 bg-white mx-auto p-2 border border-slate-200 rounded-lg flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-slate-900" />
                  </div>
                  <p className="text-[11px] text-slate-600">Send TRC-20 USDT to address below:</p>
                  <div className="flex items-center justify-between bg-white px-2 py-1.5 rounded-lg border border-slate-300 font-mono text-[10px] text-slate-900 truncate">
                    <span className="truncate">TJ7s8hK2N9yR4pZ1w8QxM2o4L0v9</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('TJ7s8hK2N9yR4pZ1w8QxM2o4L0v9')}
                      className="text-blue-600 ml-2 shrink-0 font-bold"
                    >
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <p className="text-slate-600">Enter Payment Reference / Card Last 4 Digits:</p>
                  <input
                    type="text"
                    placeholder="e.g. Card ending 4242"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsProcessingModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simulate Instant Pay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success View */}
      {step === 'success' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 text-center animate-in fade-in duration-200">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Deposit Successful!
          </h3>
          <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto">
            Your payment has been verified. <strong>${parseFloat(amount).toFixed(2)} USD</strong> has been credited to your account balance.
          </p>

          <div className="my-6 p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-xs mx-auto text-xs space-y-1.5 font-medium">
            <div className="flex justify-between text-slate-500">
              <span>Updated Balance:</span>
              <span className="font-bold text-slate-900 font-mono">${user.balance.toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Gateway:</span>
              <span className="font-semibold text-slate-800">{selectedGateway?.name}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Status:</span>
              <span className="text-emerald-600 font-bold">Completed</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => {
                setStep('form');
                setIsProcessingModal(false);
                setAmount('50');
              }}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
            >
              Deposit Again
            </button>
            <button
              onClick={onViewLogs}
              className="px-6 py-2.5 bg-[#0b1325] hover:bg-[#182647] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>View Deposit Logs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
