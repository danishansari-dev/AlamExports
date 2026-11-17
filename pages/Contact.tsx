
import React, { useMemo } from 'react';
import InquiryForm from '../components/InquiryForm';
import { EMAIL_CONTACT, WHATSAPP_NUMBER, MAP_LINK } from '../constants';

const Contact: React.FC = () => {
  const productFromQuery = useMemo(() => {
    const hash = window.location.hash;
    const queryString = hash.split('?')[1];
    if (!queryString) return undefined;
    const params = new URLSearchParams(queryString);
    return params.get('product') || undefined;
  }, [window.location.hash]);

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 animate-in fade-in duration-700">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-2 block">Direct Sourcing Channel</span>
        <h1 className="text-4xl font-bold mb-8 uppercase tracking-tighter text-neutral-900">B2B Inquiry Desk</h1>
        <p className="text-neutral-600 mb-12 leading-relaxed text-lg font-light">
          Connect with our export department for bulk orders, custom samples, and long-term distribution partnerships. We specialize in catering to international retailers and hospitality procurement firms.
        </p>
        
        <div className="space-y-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">WhatsApp / Signal</p>
            <p className="text-2xl font-bold text-neutral-900 underline underline-offset-8 decoration-neutral-200">
              <a href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">{WHATSAPP_NUMBER}</a>
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Corporate Email</p>
            <p className="text-2xl font-bold text-neutral-900 underline underline-offset-8 decoration-neutral-200 hover:decoration-neutral-900 transition-all">
              <a href={`mailto:${EMAIL_CONTACT}`}>{EMAIL_CONTACT}</a>
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Address</p>
            <div className="space-y-3">
              <address className="not-italic text-sm text-neutral-600 leading-relaxed uppercase tracking-tight">
                Vill. Mahadewa, P.O. Mirpur Bahanpur,<br />
                Teh. Bisalpur, Distt. Pilibhit,<br />
                Uttar Pradesh - 262201, India
              </address>
              <a 
                href={MAP_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-neutral-900 border border-neutral-900 px-4 py-2 hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
              >
                <svg className="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 p-6 border border-neutral-200 bg-stone-50">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Notice to Importers:</p>
          <p className="text-xs text-neutral-500 italic">
            Physical visits to our manufacturing facility are strictly by appointment only. Please contact our export manager to schedule a guided facility tour.
          </p>
        </div>
      </div>
      
      <div className="bg-white shadow-2xl">
        <InquiryForm productTitle={productFromQuery} />
      </div>
    </div>
  );
};

export default Contact;
