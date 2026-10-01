import React, { useState } from 'react';
import { TrafficaduLogo } from './TrafficaduLogo';
import { PageView, UserProfile } from '../types';
import {
  Gauge,
  DollarSign,
  Gift,
  ArrowLeftRight,
  Headphones,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Check,
  ExternalLink,
  Plus
} from 'lucide-react';

interface AdvertiserLayoutProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  user: UserProfile;
  children: React.ReactNode;
  onLogout: () => void;
  onOpenDeposit: () => void;
}

export const AdvertiserLayout: React.FC<AdvertiserLayoutProps> = ({
  currentView,
  onNavigate,
  user,
  children,
  onLogout,
  onOpenDeposit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adsManagementExpanded, setAdsManagementExpanded] = useState(
    ['ad-list', 'create-ad', 'ad-analytics', 'ad-types'].includes(currentView)
  );
  const [depositExpanded, setDepositExpanded] = useState(
    ['deposit-now', 'deposit-log'].includes(currentView)
  );
  const [supportExpanded, setSupportExpanded] = useState(
    currentView === 'support-tickets'
  );
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Determine top header title based on current view
  const getHeaderTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return `${user.username}-Dashboard`;
      case 'deposit-now':
        return 'Deposit Methods';
      case 'deposit-log':
        return 'Deposit History Logs';
      case 'ad-types':
        return 'Ad Type Lists';
      case 'create-ad':
        return 'Create Campaign';
      case 'ad-list':
        return 'Ads Management / Ad List';
      case 'ad-analytics':
        return 'Campaign Analytics';
      case 'plans':
        return 'Pricing Plans';
      case 'transactions':
        return 'Transaction Ledger';
      case 'support-tickets':
        return 'Support Ticket Center';
      default:
        return `${user.username}-Dashboard`;
    }
  };

  return (
    <div className="min-h-screen bg-[#eef1f6] flex flex-col md:flex-row font-sans text-slate-800">
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-50">
        <TrafficaduLogo size="sm" onClick={() => onNavigate('dashboard')} />
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* LEFT SIDEBAR (Identical to 2.PNG, 3.PNG, 4.PNG) */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 z-40 flex flex-col justify-between shrink-0 transition-transform duration-200 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Logo Section */}
          <div className="p-6 pb-5 border-b border-slate-100">
            <TrafficaduLogo size="md" onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }} />
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 flex-1">
            {/* 1. Dashboard */}
            <button
              onClick={() => {
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <Gauge className="w-4 h-4 text-slate-600 shrink-0" />
              <span>Dashboard</span>
            </button>

            {/* 2. Ads Management (Collapsible) */}
            <div>
              <button
                onClick={() => setAdsManagementExpanded(!adsManagementExpanded)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  ['ad-list', 'create-ad', 'ad-analytics', 'ad-types'].includes(currentView)
                    ? 'text-blue-700 bg-blue-50/50'
                    : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Custom Ad rectangle icon as in screenshot */}
                  <span className="w-4 h-4 rounded bg-slate-800 text-white text-[9px] font-black flex items-center justify-center shrink-0">
                    Ad
                  </span>
                  <span>Ads Management</span>
                </div>
                {adsManagementExpanded ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {/* Sub-items for Ads Management */}
              {adsManagementExpanded && (
                <div className="ml-7 mt-1 space-y-1 border-l-2 border-slate-200 pl-3">
                  <button
                    onClick={() => {
                      onNavigate('ad-list');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left py-1.5 px-2 text-xs font-medium rounded transition-colors ${
                      currentView === 'ad-list' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    • Ad List
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('create-ad');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left py-1.5 px-2 text-xs font-medium rounded transition-colors ${
                      currentView === 'create-ad' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    • Create Ad
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('ad-analytics');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left py-1.5 px-2 text-xs font-medium rounded transition-colors ${
                      currentView === 'ad-analytics' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    • Ad Analytics
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('ad-types');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left py-1.5 px-2 text-xs font-medium rounded transition-colors ${
                      currentView === 'ad-types' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    • Ad Types
                  </button>
                </div>
              )}
            </div>

            {/* 3. Deposit (Collapsible) */}
            <div>
              <button
                onClick={() => setDepositExpanded(!depositExpanded)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  ['deposit-now', 'deposit-log'].includes(currentView)
                    ? 'text-blue-700 bg-blue-50/50'
                    : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Deposit</span>
                </div>
                {depositExpanded ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {/* Sub-items for Deposit */}
              {depositExpanded && (
                <div className="ml-7 mt-1 space-y-1 border-l-2 border-slate-200 pl-3">
                  <button
                    onClick={() => {
                      onNavigate('deposit-now');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left py-1.5 px-2 text-xs font-medium rounded transition-colors ${
                      currentView === 'deposit-now' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    • Deposit Now
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('deposit-log');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left py-1.5 px-2 text-xs font-medium rounded transition-colors ${
                      currentView === 'deposit-log' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    • Deposit Log
                  </button>
                </div>
              )}
            </div>

            {/* 4. Plans */}
            <button
              onClick={() => {
                onNavigate('plans');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'plans'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <Gift className="w-4 h-4 text-slate-700 shrink-0" />
              <span>Plans</span>
            </button>

            {/* 5. Transaction */}
            <button
              onClick={() => {
                onNavigate('transactions');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'transactions'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <ArrowLeftRight className="w-4 h-4 text-slate-700 shrink-0" />
              <span>Transaction</span>
            </button>

            {/* 6. Support Tickets */}
            <button
              onClick={() => {
                onNavigate('support-tickets');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'support-tickets'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Headphones className="w-4 h-4 text-slate-700 shrink-0" />
                <span>Support Tickets</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* 7. LogOut */}
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors pt-4 mt-4 border-t border-slate-100"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>LogOut</span>
            </button>
          </nav>

          {/* Quick Balance Summary Pill in Sidebar */}
          <div className="p-4 m-3 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Account Balance</div>
            <div className="text-xl font-bold text-slate-900 font-tabular mt-0.5">${user.balance.toFixed(2)}</div>
            <button
              onClick={onOpenDeposit}
              className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 bg-[#0b1325] hover:bg-[#182647] text-white text-xs font-semibold rounded-md transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Funds</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR / HEADER (Identical to 2.PNG, 3.PNG, 4.PNG) */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
          {/* Breadcrumb / Title with underline indicator */}
          <div className="relative flex items-center h-full">
            <div className="font-bold text-slate-900 text-base md:text-lg tracking-tight">
              {getHeaderTitle()}
            </div>
            {/* Exact black underline tab bar under the title */}
            <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0b1325]" />
          </div>

          {/* Right Area: View Switcher + User Profile Badge */}
          <div className="flex items-center gap-3">
            {/* Quick Landing Page / Portal Link */}
            <button
              onClick={() => onNavigate('landing')}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
              title="View Public Landing Page"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Home</span>
            </button>

            {/* User Profile Badge (Matching screenshot 2.PNG top right) */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                {/* Dark circular avatar with '350x300' or avatar text */}
                <div className="w-9 h-9 rounded-full bg-[#1e293b] text-white flex items-center justify-center text-[10px] font-mono font-bold tracking-tighter shrink-0 border border-slate-300">
                  350×300
                </div>

                <span className="font-bold text-xs text-slate-900 hidden sm:inline">
                  {user.username}
                </span>

                {/* Black circle with checkmark badge from screenshot */}
                <div className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl rounded-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{user.fullName}</p>
                    <p className="text-[11px] text-slate-500 font-mono truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Advertiser Dashboard
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('deposit-now');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Deposit Funds
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('publisher');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Switch to Publisher Mode
                  </button>
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main className="p-6 md:p-8 flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
