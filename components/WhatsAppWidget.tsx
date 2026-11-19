import React, { useState, useEffect, useRef } from 'react';
import { WHATSAPP_NUMBER, BRAND_NAME } from '../constants';

/**
 * Floating WhatsApp Widget offering instant B2B buyer communication and custom export inquiries
 * @danishansari-dev - Author tag
 * @returns Floating widget JSX component
 */
const WhatsAppWidget: React.FC = () => {
  // Why: Manages the open/collapsed state of the WhatsApp inquiry dialog box
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const widgetRef = useRef<HTMLDivElement>(null);

  // Why: B2B buyers arriving on the catalog may miss contact options;
  // subtle reminder prompt appears after 4 seconds to improve conversion
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Tricky logic: Close widget when clicking outside so it doesn't obstruct background page reading
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  /**
   * Sanitizes phone number and initiates WhatsApp chat session with pre-filled message
   * @danishansari-dev customText - Optional pre-formatted inquiry text
   * @returns void
   */
  const handleStartChat = (customText?: string) => {
    // Why: Strips all non-digit characters so the wa.me international link formats correctly
    const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, '');
    const messageToSend = customText || userMessage || "Hello! I am interested in sourcing handmade rugs from Alam Exports.";
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageToSend)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const quickInquiries = [
    "📦 Request Wholesale Pricing & MOQ",
    "🎨 Inquire about Custom Rug Sampling",
    "📑 Request 2026 Export Catalog",
    "🚚 International Shipping & Freight Estimates"
  ];

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Pop-up Chat Card */}
      {isOpen && (
        <div 
          className="mb-4 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-neutral-200 overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-bottom-4"
          role="dialog"
          aria-label="WhatsApp Inquiry Window"
        >
          {/* Card Header */}
          <div className="bg-emerald-700 px-5 py-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm tracking-wider uppercase border border-white/30">
                  AE
                </div>
                {/* Active Online Indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-700 rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight">{BRAND_NAME} Export Desk</h4>
                <p className="text-[11px] text-emerald-100 flex items-center space-x-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse inline-block" />
                  <span>Online | Bhadohi, India</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-stone-50 max-h-96 overflow-y-auto space-y-3">
            {/* Automated Greeting Bubble */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-neutral-100 max-w-[90%]">
              <p className="text-xs text-neutral-800 leading-relaxed">
                Namaste! 🙏 Welcome to <span className="font-semibold">{BRAND_NAME}</span>. How can our rug export and custom manufacturing specialists help you today?
              </p>
              <span className="text-[9px] text-neutral-400 block text-right mt-1">Just now</span>
            </div>

            {/* Quick Sourcing Prompts */}
            <div className="pt-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Quick Inquiries
              </p>
              <div className="space-y-1.5">
                {quickInquiries.map((inquiry, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleStartChat(inquiry)}
                    className="w-full text-left text-xs bg-white hover:bg-emerald-50 hover:border-emerald-300 text-neutral-700 px-3 py-2 rounded-xl border border-neutral-200 transition-all text-ellipsis overflow-hidden whitespace-nowrap block"
                  >
                    {inquiry}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Inquiry Input Area */}
            <div className="pt-2">
              <label htmlFor="wa-custom-msg" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                Or type custom message
              </label>
              <textarea
                id="wa-custom-msg"
                rows={2}
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="E.g., Inquiring about hand-knotted wool rugs in 8x10 ft..."
                className="w-full text-xs p-2.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-neutral-800"
              />
            </div>
          </div>

          {/* Card Footer: Action Button */}
          <div className="p-3 bg-white border-t border-neutral-100 flex items-center justify-between">
            <span className="text-[10px] text-neutral-400 flex items-center">
              <svg className="w-3.5 h-3.5 text-emerald-600 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.58 1.961.948 3.197.948 3.181 0 5.767-2.587 5.768-5.766.001-3.182-2.585-5.769-5.768-5.769zm0 10.375c-.958 0-1.892-.266-2.701-.767l-.193-.119-1.58.414.423-1.539-.126-.197c-.551-.861-.842-1.859-.841-2.888 0-2.825 2.299-5.124 5.124-5.124 2.825 0 5.124 2.299 5.124 5.124 0 2.826-2.299 5.125-5.124 5.125z" />
              </svg>
              Direct WhatsApp connect
            </span>
            <button
              onClick={() => handleStartChat()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-md hover:shadow-lg transition-all"
            >
              <span>Chat Now</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button with Callout Bubble */}
      <div className="flex items-center space-x-2">
        {/* Subtle Callout Toast when collapsed */}
        {!isOpen && hasPrompted && (
          <div 
            onClick={() => setIsOpen(true)}
            className="cursor-pointer bg-white px-3.5 py-2 rounded-xl shadow-lg border border-neutral-200 text-neutral-800 text-xs flex items-center space-x-2 hover:bg-stone-50 transition-all animate-in fade-in slide-in-from-right-3"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span className="font-medium text-neutral-700">Chat with Export Team</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHasPrompted(false);
              }}
              className="text-neutral-400 hover:text-neutral-600 ml-1 text-xs"
              aria-label="Dismiss callout"
            >
              ✕
            </button>
          </div>
        )}

        {/* WhatsApp Icon Button */}
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 relative group"
          aria-label="Open WhatsApp conversation"
        >
          {/* Animated Glow / Ping effect */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-30 animate-pulse pointer-events-none" />

          {isOpen ? (
            // Close icon
            <svg className="w-6 h-6 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // WhatsApp Official Logo SVG
            <svg className="w-7 h-7 text-white fill-current relative z-10" viewBox="0 0 24 24">
              <path d="M12.031 2c-5.518 0-9.988 4.471-9.988 9.989 0 1.764.459 3.486 1.332 5.006L2 22l5.161-1.353c1.464.798 3.109 1.218 4.87 1.218 5.517 0 9.987-4.471 9.987-9.989 0-5.518-4.47-9.988-9.987-9.988zm0 18.281c-1.523 0-3.013-.409-4.307-1.182l-.309-.186-3.2 0.839.854-3.118-.204-.325c-.854-1.36-1.306-2.943-1.306-4.509 0-4.57 3.719-8.289 8.289-8.289 4.57 0 8.289 3.719 8.289 8.289 0 4.57-3.719 8.289-8.289 8.289zm4.545-6.208c-.249-.125-1.474-.728-1.703-.811-.228-.083-.394-.125-.56.125-.166.249-.644.811-.789.977-.145.166-.291.187-.54.062-.249-.125-1.052-.388-2.003-1.236-.74-.66-1.24-1.475-1.385-1.724-.145-.249-.015-.384.11-.508.112-.112.249-.291.374-.436.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.436-.062-.125-.56-1.349-.768-1.849-.203-.488-.409-.422-.56-.43-.145-.008-.312-.01-.478-.01-.166 0-.436.062-.664.312-.228.249-.872.852-.872 2.077 0 1.225.893 2.41 1.018 2.576.125.166 1.758 2.685 4.26 3.766.595.257 1.06.411 1.423.526.598.19 1.142.163 1.572.099.48-.072 1.474-.602 1.681-1.183.208-.581.208-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default WhatsAppWidget;
