
import React from 'react';
import { BRAND_NAME, FOOTER_LINKS, EMAIL_CONTACT, MAP_LINK } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-neutral-800 pb-16">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold tracking-tighter mb-6">{BRAND_NAME.toUpperCase()}</h2>
          <p className="text-neutral-400 max-w-md leading-relaxed mb-6">
            Premier manufacturer and exporter of rugs and home furnishings from India. 
            Supplying high-quality, handmade products to global markets including 
            USA, Germany, UK, France, Australia, and Canada.
          </p>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Manufacturing Facility & Registered Office:</p>
            <address className="not-italic text-neutral-400 text-sm leading-relaxed mb-4">
              Vill. Mahadewa, P.O. Mirpur Bahanpur,<br />
              Teh. Bisalpur, Distt. Pilibhit,<br />
              State - Uttar Pradesh, Pin code - 262201, India
            </address>
            <a 
              href={MAP_LINK} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-white border-b border-white/20 pb-0.5 hover:border-white transition-colors"
            >
              <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              View on Google Maps
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">Global Sales</h3>
          <ul className="space-y-4 text-sm">
            <li><span className="text-neutral-500 block text-[10px] uppercase font-bold mb-1">Inquiry Email:</span> <a href={`mailto:${EMAIL_CONTACT}`} className="hover:text-neutral-300 text-base">{EMAIL_CONTACT}</a></li>
            <li><span className="text-neutral-500 block text-[10px] uppercase font-bold mb-1">Business Hours:</span> Mon - Sat, 9AM - 7PM IST</li>
            <li className="pt-4">
              <span className="bg-neutral-800 border border-neutral-700 px-3 py-1.5 rounded-sm text-[10px] uppercase font-bold text-neutral-400 tracking-widest">Wholesale Export Only</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">Legal & Governance</h3>
          <ul className="space-y-4 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.path}>
                <a href={link.path} className="text-neutral-400 hover:text-white transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-neutral-500 space-y-4 md:space-y-0">
        <p>© {new Date().getFullYear()} {BRAND_NAME}. Manufactured in India.</p>
        <p>No Online Retail | GST & IEC Compliant</p>
      </div>
    </footer>
  );
};

export default Footer;
