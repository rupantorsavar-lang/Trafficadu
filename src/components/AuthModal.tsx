import React, { useState } from 'react';
import { TrafficaduLogo } from './TrafficaduLogo';
import { UserProfile } from '../types';
import { User, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onLoginSuccess: (user: Partial<UserProfile>) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [username, setUsername] = useState('shafiq07');
  const [email, setEmail] = useState('rupantorsavar@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [accountType, setAccountType] = useState<'advertiser' | 'publisher'>('advertiser');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      username: username || 'shafiq07',
      email: email || 'user@trafficadu.com',
      fullName: username === 'shafiq07' ? 'Shafiqul Islam' : username,
    });
    onClose();
  };

  const handleQuickDemo = () => {
    onLoginSuccess({
      username: 'shafiq07',
      fullName: 'Shafiqul Islam',
      email: 'rupantorsavar@gmail.com',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <TrafficaduLogo size="sm" />
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 p-1 rounded-xl my-5">
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
              mode === 'signup' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
              mode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Quick Demo Pre-fill Pill */}
        <div
          onClick={handleQuickDemo}
          className="mb-5 p-3 bg-blue-50 border border-blue-200/80 rounded-xl cursor-pointer hover:bg-blue-100/70 transition-colors flex items-center justify-between"
        >
          <div className="flex items-center gap-2 text-xs text-blue-900">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>Instant Demo: Log in as <strong>shafiq07</strong></span>
          </div>
          <span className="text-[11px] font-bold text-blue-700 underline">One-click →</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Account Role</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAccountType('advertiser')}
                  className={`py-2 px-3 rounded-lg border font-bold text-xs ${
                    accountType === 'advertiser'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Advertiser
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType('publisher')}
                  className={`py-2 px-3 rounded-lg border font-bold text-xs ${
                    accountType === 'publisher'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Publisher
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Username</label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="shafiq07"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-600"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="shafiq@example.com"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-600"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-600"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0b1325] hover:bg-[#182647] text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 mt-2"
          >
            <span>{mode === 'signup' ? 'Create Account & Enter' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
