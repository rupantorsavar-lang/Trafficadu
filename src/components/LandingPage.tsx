import React, { useState } from 'react';
import { TrafficaduLogo } from './TrafficaduLogo';
import { FloatingWireframePrism, FloatingBlueTorus } from './HeroDecorations';
import { AD_TYPES } from '../data/mockData';
import { 
  ArrowUp, 
  ChevronRight, 
  Globe, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Users, 
  Layers, 
  CheckCircle2, 
  Send
} from 'lucide-react';

interface LandingPageProps {
  onEnterAdvertiser: () => void;
  onEnterPublisher: () => void;
  onOpenSignUp: () => void;
  onOpenLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterAdvertiser,
  onEnterPublisher,
  onOpenSignUp,
  onOpenLogin,
}) => {
  const [language, setLanguage] = useState<'English' | 'বাংলা'>('English');
  const [selectedFormat, setSelectedFormat] = useState(AD_TYPES[0]);
  const [contactSent, setContactSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) return;
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] text-[#1e293b] flex flex-col relative selection:bg-blue-600 selection:text-white">
      {/* 1. TOP BAR / NAVBAR (Exact 3-Zone Contract from 1.PNG) */}
      <header className="sticky top-0 z-50 bg-[#f1f3f6]/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Zone */}
          <div className="flex items-center">
            <TrafficaduLogo size="md" onClick={scrollToTop} />
          </div>

          {/* Navigation Links Zone */}
          <nav className="hidden md:flex items-center gap-10">
            <a 
              href="#home" 
              className="text-sm font-bold tracking-wider text-slate-900 hover:text-blue-600 uppercase transition-colors"
            >
              HOME
            </a>
            <a 
              href="#about" 
              className="text-sm font-bold tracking-wider text-slate-800 hover:text-blue-600 uppercase transition-colors"
            >
              ABOUT
            </a>
            <a 
              href="#formats" 
              className="text-sm font-bold tracking-wider text-slate-800 hover:text-blue-600 uppercase transition-colors"
            >
              FORMATS
            </a>
            <a 
              href="#blogs" 
              className="text-sm font-bold tracking-wider text-slate-800 hover:text-blue-600 uppercase transition-colors"
            >
              BLOGS
            </a>
            <a 
              href="#contact" 
              className="text-sm font-bold tracking-wider text-slate-800 hover:text-blue-600 uppercase transition-colors"
            >
              CONTACT
            </a>
          </nav>

          {/* Right Action Zone */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative group flex items-center gap-1.5 text-sm font-medium text-slate-700 cursor-pointer px-2 py-1.5 rounded-md hover:bg-slate-200/60">
              <Globe className="w-4 h-4 text-slate-600" />
              <span>{language}</span>
              <span className="text-xs text-slate-500">▼</span>

              <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-white border border-slate-200 shadow-xl rounded-lg py-1 w-32 z-50">
                <button
                  type="button"
                  onClick={() => setLanguage('English')}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 ${language === 'English' ? 'text-blue-600 font-bold' : 'text-slate-700'}`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('বাংলা')}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 ${language === 'বাংলা' ? 'text-blue-600 font-bold' : 'text-slate-700'}`}
                >
                  বাংলা (Bengali)
                </button>
              </div>
            </div>

            {/* Login button */}
            <button
              onClick={onOpenLogin}
              className="hidden sm:inline-flex text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-lg text-slate-800 hover:bg-slate-200/70 transition-colors"
            >
              Sign In
            </button>

            {/* SignUp >> Primary Action Button */}
            <button
              onClick={onOpenSignUp}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#0b1325] hover:bg-[#162340] text-white rounded-lg text-sm font-bold tracking-wide transition-all shadow-md active:scale-95"
            >
              <span>SignUp</span>
              <span className="text-blue-400 font-black">»</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION (Identical to Screenshot 1.PNG) */}
      <section id="home" className="relative pt-20 pb-28 overflow-hidden">
        {/* Floating 3D Geometric Vector Shapes from 1.PNG */}
        <div className="absolute left-6 md:left-24 lg:left-36 top-1/2 -translate-y-12">
          <FloatingWireframePrism />
        </div>

        <div className="absolute right-6 md:right-28 lg:right-40 bottom-16 md:bottom-24">
          <FloatingBlueTorus />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {/* Subtitle kicker from screenshot */}
          <p className="text-sm md:text-base font-semibold text-slate-600 tracking-normal mb-8">
            {language === 'বাংলা'
              ? 'পারফরম্যান্স মার্কেটিংয়ের জন্য মাল্টিসোর্স অনলাইন বিজ্ঞাপন প্ল্যাটফর্ম'
              : 'Multisource Online Advertising Platform for Performance Marketing'}
          </p>

          {/* Giant Bold Headline from screenshot */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0b1325] tracking-tight leading-[1.08] mb-12 uppercase font-display">
            PREMIUM<br />
            ADVERTISING<br />
            NETWORK
          </h1>

          {/* Dual Action Buttons from screenshot 1.PNG */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Publisher >> (Dark filled button) */}
            <button
              onClick={onEnterPublisher}
              className="w-full sm:w-auto min-w-[170px] inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0b1325] hover:bg-[#182647] text-white text-base font-bold rounded-lg transition-all shadow-md hover:shadow-xl active:scale-95"
            >
              <span>Publisher</span>
              <span className="text-blue-400 text-lg">»</span>
            </button>

            {/* Advertiser >> (Outlined / light button) */}
            <button
              onClick={onEnterAdvertiser}
              className="w-full sm:w-auto min-w-[170px] inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#eef1f6] hover:bg-white text-[#0b1325] border border-[#0b1325]/30 hover:border-[#0b1325] text-base font-bold rounded-lg transition-all shadow-sm active:scale-95"
            >
              <span>Advertiser</span>
              <span className="text-[#0b1325] text-lg">»</span>
            </button>
          </div>

          <div className="mt-8 text-xs text-slate-500 font-medium">
            <span>Instant Access · Test Account Pre-loaded (<strong className="text-slate-800">shafiq07</strong>) · Zero Setup Delay</span>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM PERFORMANCE METRICS */}
      <section className="bg-white py-14 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="text-center pt-4 md:pt-0">
              <div className="text-3xl md:text-4xl font-extrabold text-[#0b1325] font-tabular">500M+</div>
              <div className="text-xs md:text-sm text-slate-500 font-medium mt-1">Monthly Impressions</div>
            </div>
            <div className="text-center pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl md:text-4xl font-extrabold text-[#0084ff] font-tabular">99.8%</div>
              <div className="text-xs md:text-sm text-slate-500 font-medium mt-1">Global Fill Rate</div>
            </div>
            <div className="text-center pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl md:text-4xl font-extrabold text-[#0b1325] font-tabular">240+</div>
              <div className="text-xs md:text-sm text-slate-500 font-medium mt-1">Countries & Geos</div>
            </div>
            <div className="text-center pt-4 md:pt-0 md:pl-6">
              <div className="text-3xl md:text-4xl font-extrabold text-emerald-600 font-tabular">$0.003</div>
              <div className="text-xs md:text-sm text-slate-500 font-medium mt-1">Minimum Click Cost</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AD FORMATS SHOWCASE (Matching 4.PNG Formats) */}
      <section id="formats" className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">High-Performance Units</div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
              8 Standard High-Yield Ad Formats
            </h2>
            <p className="text-slate-600 mt-3 text-sm">
              Engineered for maximum user engagement, viewability, and publisher revenue across mobile and desktop devices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AD_TYPES.map((ad) => {
              const badgeColors = {
                'Banner': 'bg-emerald-50 text-emerald-700 border-emerald-200',
                'Direct Link': 'bg-purple-50 text-purple-700 border-purple-200',
                'Article/Feed': 'bg-rose-50 text-rose-700 border-rose-200',
              };

              return (
                <div
                  key={ad.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-900">{ad.name}</h3>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${badgeColors[ad.category]}`}>
                        {ad.category}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Width:</span>
                        <span className="font-semibold text-slate-800 font-tabular">{ad.width}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Height:</span>
                        <span className="font-semibold text-slate-800 font-tabular">{ad.height}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-200/60">
                        <span className="text-slate-400">Avg. CPM:</span>
                        <span className="font-bold text-blue-600 font-tabular">${ad.cpmRate.toFixed(2)}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed mb-6">
                      {ad.description}
                    </p>
                  </div>

                  <button
                    onClick={onEnterAdvertiser}
                    className="w-full py-2.5 bg-[#0b1325] hover:bg-[#182647] text-white text-xs font-bold rounded-lg transition-colors text-center shadow-sm"
                  >
                    Buy Plan
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. PUBLISHER VS ADVERTISER VALUE PROPOSITION */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Advertiser Box */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-8 relative overflow-hidden">
              <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 font-display">For Advertisers</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Reach high-intent audiences worldwide with precision geo-targeting, transparent real-time bidding, and real-time conversion tracking.
              </p>

              <ul className="space-y-3 text-xs text-slate-700 font-medium mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant deposit via bKash, Nagad, USDT & Cards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Live campaign tracker with CTR, CPC, and daily limits</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>AI bot filtering ensures 100% genuine user traffic</span>
                </li>
              </ul>

              <button
                onClick={onEnterAdvertiser}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0b1325] hover:bg-[#182647] text-white text-xs font-bold rounded-lg transition-colors"
              >
                <span>Open Advertiser Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Publisher Box */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-8 relative overflow-hidden">
              <div className="w-12 h-12 bg-emerald-600/10 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 font-display">For Publishers</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Monetize your websites, blogs, apps, and feeds with industry-highest eCPMs and rapid automated weekly payouts.
              </p>

              <ul className="space-y-3 text-xs text-slate-700 font-medium mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Simple JS/HTML ad code snippet ready in 60 seconds</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% fill rate for global desktop and mobile visitors</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Low minimum payout threshold ($10 via bKash / USDT)</span>
                </li>
              </ul>

              <button
                onClick={onEnterPublisher}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0b1325] hover:bg-[#182647] text-white text-xs font-bold rounded-lg transition-colors"
              >
                <span>Monetize as Publisher</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BLOGS SECTION */}
      <section id="blogs" className="py-20 bg-[#f1f3f6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Industry Knowledge</span>
              <h2 className="text-3xl font-black text-slate-900 font-display mt-1">Latest From Trafficadu Blog</h2>
            </div>
            <p className="text-xs text-slate-500 mt-2 md:mt-0">Updated weekly with performance marketing strategies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs text-blue-600 font-semibold mb-2">Performance Guide</div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  How to Scale High-Converting Push Notification Campaigns in 2026
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Discover targeting strategies, optimal bids, and click-through optimizations for push ad formats.
                </p>
              </div>
              <div className="text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span>March 24, 2026</span>
                <span>4 min read</span>
              </div>
            </article>

            <article className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs text-emerald-600 font-semibold mb-2">Publisher Monetization</div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  Maximizing Website eCPM with Responsive Native & In-Feed Ad Blocks
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Placement tactics that keep user experience pristine while boosting click rates and publisher revenue.
                </p>
              </div>
              <div className="text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span>March 18, 2026</span>
                <span>6 min read</span>
              </div>
            </article>

            <article className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs text-purple-600 font-semibold mb-2">AdTech Trends</div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  Direct Link Marketing: The Zero-Friction Route to Instant Conversions
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Why smart traffic brokers and affiliate media buyers are investing heavily in smart direct link traffic.
                </p>
              </div>
              <div className="text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span>March 11, 2026</span>
                <span>3 min read</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 7. CONTACT US */}
      <section id="contact" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 font-display">Get In Touch With Trafficadu</h2>
            <p className="text-sm text-slate-600 mt-2">
              Have questions regarding advertiser billing, publisher API, or customized traffic feeds?
            </p>
          </div>

          <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-8 shadow-sm">
            {contactSent ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Message Received!</h4>
                <p className="text-xs text-slate-500 mt-1">Our team will reply to {contactForm.email || 'your email'} shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Shafiqul Islam"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address*</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. shafiq@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message*</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your traffic or campaign goals..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0b1325] hover:bg-[#182647] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-[#0b1325] text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <TrafficaduLogo size="md" className="brightness-125" />
            </div>

            <div className="flex items-center gap-6 text-xs font-medium text-slate-300">
              <a href="#home" className="hover:text-white transition-colors">Home</a>
              <a href="#about" className="hover:text-white transition-colors">About Us</a>
              <a href="#formats" className="hover:text-white transition-colors">Ad Formats</a>
              <a href="#blogs" className="hover:text-white transition-colors">Blog</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              <button onClick={onEnterAdvertiser} className="hover:text-white transition-colors text-blue-400">
                Advertiser Panel
              </button>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              © {new Date().getFullYear()} Trafficadu. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top button matching 1.PNG */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 w-11 h-11 bg-white hover:bg-slate-100 text-[#0b1325] rounded-full flex items-center justify-center shadow-lg border border-slate-200 transition-all hover:scale-105 active:scale-95 z-40"
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
      </button>
    </div>
  );
};
