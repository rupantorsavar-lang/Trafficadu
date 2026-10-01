import React, { useState } from 'react';
import { SupportTicket, UserProfile } from '../types';
import { Headphones, Plus, MessageSquare, CheckCircle2, Clock, Send } from 'lucide-react';

interface SupportTicketsViewProps {
  user: UserProfile;
  tickets: SupportTicket[];
  onCreateTicket: (ticket: SupportTicket) => void;
  onAddReply: (ticketId: string, replyText: string) => void;
}

export const SupportTicketsView: React.FC<SupportTicketsViewProps> = ({
  user,
  tickets,
  onCreateTicket,
  onAddReply,
}) => {
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [replyInput, setReplyInput] = useState('');

  // New Ticket Form State
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState<'General' | 'Billing & Deposit' | 'Ad Campaign' | 'Technical'>('Billing & Deposit');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [message, setMessage] = useState('');

  const activeTicket = tickets.find((t) => t.id === activeTicketId);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    const newTicket: SupportTicket = {
      id: 'ticket-' + Date.now(),
      ticketNo: '#' + Math.floor(100000 + Math.random() * 900000),
      subject: subject.trim(),
      department,
      priority,
      status: 'Open',
      lastReply: 'Just now',
      messages: [
        {
          sender: 'user',
          name: user.username,
          text: message.trim(),
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };

    onCreateTicket(newTicket);
    setIsCreateModalOpen(false);
    setSubject('');
    setMessage('');
    setActiveTicketId(newTicket.id);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim() || !activeTicketId) return;

    onAddReply(activeTicketId, replyInput.trim());
    setReplyInput('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Support Ticket Center</h2>
          <p className="text-xs text-slate-500 mt-1">
            24/7 dedicated support for campaign optimization, billing inquiries, and gateway verification.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0b1325] hover:bg-[#182647] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Open New Ticket</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Tickets List */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-700">
            Your Tickets ({tickets.length})
          </div>

          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {tickets.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No support tickets yet. Click "Open New Ticket" if you need assistance.
              </div>
            ) : (
              tickets.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setActiveTicketId(t.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    activeTicketId === t.id ? 'bg-blue-50/80 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[11px] font-bold text-slate-500">{t.ticketNo}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.status === 'Answered'
                          ? 'bg-emerald-100 text-emerald-700'
                          : t.status === 'Open'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{t.subject}</h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>{t.department}</span>
                    <span>{t.lastReply}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Col: Ticket Details & Conversation */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-[520px]">
          {activeTicket ? (
            <div className="flex flex-col h-full">
              {/* Ticket Top bar */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">{activeTicket.ticketNo}</span>
                    <h3 className="text-sm font-bold text-slate-900">{activeTicket.subject}</h3>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Dept: {activeTicket.department} · Priority: {activeTicket.priority}
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold">
                  {activeTicket.status}
                </span>
              </div>

              {/* Messages conversation */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
                {activeTicket.messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex flex-col max-w-[85%] ${
                      m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400 mb-1 flex items-center gap-1.5">
                      <span className="font-semibold text-slate-700">{m.name}</span>
                      <span>·</span>
                      <span>{m.date}</span>
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#0b1325] text-white rounded-tr-xs'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-xs'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="p-3 border-t border-slate-200 flex gap-2 bg-white rounded-b-2xl">
                <input
                  type="text"
                  placeholder="Type your reply to Trafficadu support..."
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0b1325] hover:bg-[#182647] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <Headphones className="w-10 h-10 mb-2 text-slate-300" />
              <p className="text-xs font-semibold text-slate-600">Select a ticket to view messages</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Or open a new ticket for any account questions.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Create Ticket */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Open Support Ticket</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Subject*</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deposit confirmation inquiry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e: any) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  >
                    <option value="Billing & Deposit">Billing & Deposit</option>
                    <option value="Ad Campaign">Ad Campaign</option>
                    <option value="Technical">Technical</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e: any) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Message*</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your issue or question in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0b1325] hover:bg-[#182647] text-white font-bold rounded-xl"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
