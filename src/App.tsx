/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageView, UserProfile, AdCampaign, DepositLog, TransactionItem, SupportTicket, PlanItem } from './types';
import { INITIAL_USER } from './data/mockData';
import { LandingPage } from './components/LandingPage';
import { AdvertiserLayout } from './components/AdvertiserLayout';
import { DashboardView } from './components/DashboardView';
import { DepositNowView } from './components/DepositNowView';
import { DepositLogView } from './components/DepositLogView';
import { AdTypesView } from './components/AdTypesView';
import { CreateAdView } from './components/CreateAdView';
import { AdListView } from './components/AdListView';
import { AdAnalyticsView } from './components/AdAnalyticsView';
import { PlansView } from './components/PlansView';
import { TransactionsView } from './components/TransactionsView';
import { SupportTicketsView } from './components/SupportTicketsView';
import { PublisherPortal } from './components/PublisherPortal';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('landing');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([]);
  const [deposits, setDeposits] = useState<DepositLog[]>([]);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [selectedAdTypeIdForCreation, setSelectedAdTypeIdForCreation] = useState<string>('push');
  
  // Support tickets
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'ticket-1',
      ticketNo: '#482910',
      subject: 'Welcome to Trafficadu Premium Network',
      department: 'General',
      priority: 'Low',
      status: 'Answered',
      lastReply: 'Yesterday',
      messages: [
        {
          sender: 'support',
          name: 'Trafficadu Support Team',
          text: 'Welcome aboard! Your advertiser account is verified. You can deposit funds instantly via bKash, Nagad, USDT, or Cards, and launch high-performance campaigns in under 5 minutes.',
          date: '10:00 AM',
        },
      ],
    },
  ]);

  // Auth modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Handle deposit completion
  const handleDepositSuccess = (log: DepositLog, trx: TransactionItem, newBalance: number) => {
    setDeposits((prev) => [log, ...prev]);
    setTransactions((prev) => [trx, ...prev]);
    setUser((prev) => ({
      ...prev,
      balance: newBalance,
    }));
  };

  // Handle creating a campaign
  const handleCreateCampaign = (newCamp: AdCampaign) => {
    setCampaigns((prev) => [newCamp, ...prev]);
    setUser((prev) => ({
      ...prev,
      totalAds: prev.totalAds + 1,
      totalImpressions: prev.totalImpressions + 1200,
      totalClicks: prev.totalClicks + 45,
    }));
    setCurrentView('ad-list');
  };

  // Handle status toggle (active <-> paused)
  const handleToggleCampaignStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' } : c
      )
    );
  };

  // Delete campaign
  const handleDeleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    setUser((prev) => ({
      ...prev,
      totalAds: Math.max(0, prev.totalAds - 1),
    }));
  };

  // Handle buying bundled plan
  const handleBuyPlan = (plan: PlanItem): boolean => {
    if (user.balance < plan.price) return false;

    const newBalance = user.balance - plan.price;
    const now = new Date().toISOString();
    const trxId = 'TRX' + Math.floor(100000000 + Math.random() * 900000000);

    const newTrx: TransactionItem = {
      id: 'trx-' + Date.now(),
      trx: trxId,
      date: now,
      amount: plan.price,
      type: '-',
      postBalance: newBalance,
      details: `Purchased Plan: ${plan.name}`,
    };

    setTransactions((prev) => [newTrx, ...prev]);
    setUser((prev) => ({
      ...prev,
      balance: newBalance,
      remainClicks: prev.remainClicks + plan.clicks,
      remainImpressions: prev.remainImpressions + plan.impressions,
    }));

    return true;
  };

  // Handle buying points for a specific ad format
  const handleBuyPoints = (type: 'clicks' | 'impressions', amount: number, cost: number): boolean => {
    if (user.balance < cost) return false;

    const newBalance = user.balance - cost;
    const now = new Date().toISOString();
    const trxId = 'TRX' + Math.floor(100000000 + Math.random() * 900000000);

    const newTrx: TransactionItem = {
      id: 'trx-' + Date.now(),
      trx: trxId,
      date: now,
      amount: cost,
      type: '-',
      postBalance: newBalance,
      details: `Purchased ${amount.toLocaleString()} ${type}`,
    };

    setTransactions((prev) => [newTrx, ...prev]);
    setUser((prev) => ({
      ...prev,
      balance: newBalance,
      remainClicks: type === 'clicks' ? prev.remainClicks + amount : prev.remainClicks,
      remainImpressions: type === 'impressions' ? prev.remainImpressions + amount : prev.remainImpressions,
    }));

    return true;
  };

  // Create Support Ticket
  const handleCreateTicket = (ticket: SupportTicket) => {
    setTickets((prev) => [ticket, ...prev]);
  };

  // Reply to ticket
  const handleAddReply = (ticketId: string, text: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            lastReply: 'Just now',
            messages: [
              ...t.messages,
              {
                sender: 'user',
                name: user.username,
                text,
                date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ],
          };
        }
        return t;
      })
    );
  };

  // Switch to Create Ad with specific format
  const handleCreateAdWithFormat = (adTypeId: string) => {
    setSelectedAdTypeIdForCreation(adTypeId);
    setCurrentView('create-ad');
  };

  // Auth login
  const handleLoginSuccess = (profile: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...profile,
    }));
    setCurrentView('dashboard');
  };

  // 1. Landing Page View
  if (currentView === 'landing') {
    return (
      <>
        <LandingPage
          onEnterAdvertiser={() => setCurrentView('dashboard')}
          onEnterPublisher={() => setCurrentView('publisher')}
          onOpenSignUp={() => {
            setAuthMode('signup');
            setIsAuthModalOpen(true);
          }}
          onOpenLogin={() => {
            setAuthMode('login');
            setIsAuthModalOpen(true);
          }}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          initialMode={authMode}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </>
    );
  }

  // 2. Publisher Portal View
  if (currentView === 'publisher') {
    return (
      <PublisherPortal
        user={user}
        onSwitchToAdvertiser={() => setCurrentView('dashboard')}
        onGoHome={() => setCurrentView('landing')}
      />
    );
  }

  // 3. Advertiser Dashboard & Sub-views
  return (
    <>
      <AdvertiserLayout
        currentView={currentView}
        onNavigate={setCurrentView}
        user={user}
        onLogout={() => setCurrentView('landing')}
        onOpenDeposit={() => setCurrentView('deposit-now')}
      >
        {currentView === 'dashboard' && (
          <DashboardView
            user={user}
            campaigns={campaigns}
            deposits={deposits}
            onNavigate={setCurrentView}
            onOpenDeposit={() => setCurrentView('deposit-now')}
          />
        )}

        {currentView === 'deposit-now' && (
          <DepositNowView
            user={user}
            onDepositSuccess={handleDepositSuccess}
            onViewLogs={() => setCurrentView('deposit-log')}
          />
        )}

        {currentView === 'deposit-log' && (
          <DepositLogView
            deposits={deposits}
            onOpenDeposit={() => setCurrentView('deposit-now')}
          />
        )}

        {currentView === 'ad-types' && (
          <AdTypesView
            user={user}
            onCreateAdWithFormat={handleCreateAdWithFormat}
            onBuyPoints={handleBuyPoints}
            onOpenDeposit={() => setCurrentView('deposit-now')}
          />
        )}

        {currentView === 'create-ad' && (
          <CreateAdView
            user={user}
            initialAdTypeId={selectedAdTypeIdForCreation}
            onCreateSuccess={handleCreateCampaign}
            onOpenDeposit={() => setCurrentView('deposit-now')}
          />
        )}

        {currentView === 'ad-list' && (
          <AdListView
            campaigns={campaigns}
            onToggleStatus={handleToggleCampaignStatus}
            onDeleteCampaign={handleDeleteCampaign}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'ad-analytics' && (
          <AdAnalyticsView campaigns={campaigns} />
        )}

        {currentView === 'plans' && (
          <PlansView
            user={user}
            onBuyPlan={handleBuyPlan}
            onOpenDeposit={() => setCurrentView('deposit-now')}
          />
        )}

        {currentView === 'transactions' && (
          <TransactionsView transactions={transactions} />
        )}

        {currentView === 'support-tickets' && (
          <SupportTicketsView
            user={user}
            tickets={tickets}
            onCreateTicket={handleCreateTicket}
            onAddReply={handleAddReply}
          />
        )}
      </AdvertiserLayout>

      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
