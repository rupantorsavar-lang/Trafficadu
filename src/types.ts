export type PageView = 
  | 'landing'
  | 'dashboard'
  | 'ad-types'
  | 'create-ad'
  | 'ad-list'
  | 'ad-analytics'
  | 'deposit-now'
  | 'deposit-log'
  | 'plans'
  | 'transactions'
  | 'support-tickets'
  | 'publisher';

export interface AdTypeItem {
  id: string;
  name: string;
  category: 'Banner' | 'Direct Link' | 'Article/Feed';
  width: string;
  height: string;
  cpmRate: number; // USD per 1000 impressions
  cpcRate: number; // USD per click
  description: string;
}

export interface AdCampaign {
  id: string;
  title: string;
  adTypeId: string;
  adTypeName: string;
  category: string;
  dimensions: string;
  targetUrl: string;
  imageUrl?: string;
  status: 'Active' | 'Paused' | 'Pending Review';
  cpc: number;
  dailyBudget: number;
  spent: number;
  impressions: number;
  clicks: number;
  createdAt: string;
}

export interface DepositLog {
  id: string;
  transactionId: string;
  gateway: string;
  amount: number;
  charge: number;
  payable: number;
  status: 'Completed' | 'Pending' | 'Rejected';
  date: string;
}

export interface TransactionItem {
  id: string;
  trx: string;
  date: string;
  amount: number;
  type: '+' | '-';
  postBalance: number;
  details: string;
}

export interface SupportTicket {
  id: string;
  ticketNo: string;
  subject: string;
  department: 'General' | 'Billing & Deposit' | 'Ad Campaign' | 'Technical';
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Answered' | 'Closed';
  lastReply: string;
  messages: {
    sender: 'user' | 'support';
    name: string;
    text: string;
    date: string;
  }[];
}

export interface PlanItem {
  id: string;
  name: string;
  price: number;
  clicks: number;
  impressions: number;
  popular?: boolean;
  features: string[];
}

export interface UserProfile {
  username: string;
  fullName: string;
  email: string;
  balance: number;
  remainClicks: number;
  remainImpressions: number;
  totalAds: number;
  totalClicks: number;
  totalImpressions: number;
  joinedDate: string;
}
