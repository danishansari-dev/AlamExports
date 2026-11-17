
import React from 'react';

const TermsConditions: React.FC = () => {
  return (
    <div className="py-24 max-w-4xl mx-auto px-6">
      <h1 className="text-4xl font-bold uppercase tracking-tighter mb-12 border-b border-neutral-200 pb-8">Terms & Conditions</h1>
      <div className="text-neutral-600 space-y-10 leading-relaxed">
        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">A. Wholesale Eligibility</h2>
          <p className="text-sm">
            Alam Exports is a B2B manufacturing entity. Access to our catalog and pricing is restricted to registered wholesalers, retailers, buying agents, and interior design firms. We do not fulfill individual retail orders or provide drop-shipping services.
          </p>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">B. Minimum Order Quantities (MOQ)</h2>
          <p className="text-sm">
            Standard export MOQs apply to all collections:
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Floor Rugs: 50 units per color/design.</li>
              <li>Bath Mats & Cushions: 500 units per style.</li>
              <li>Custom Manufacturing: Minimum order value of $5,000 USD applies.</li>
            </ul>
          </p>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">C. Payment & Financing</h2>
          <p className="text-sm">
            Standard payment terms for new export clients are:
            <br />• 30% Advance Deposit via Wire Transfer (T/T) upon order confirmation.
            <br />• 70% Balance against Scanned Copy of Bill of Lading (B/L) or Confirmed Irrevocable Letter of Credit (L/C) at sight.
          </p>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">D. Quality & Inspection</h2>
          <p className="text-sm">
            Clients have the right to appoint third-party inspection agencies (SGS, Intertek, etc.) prior to shipment. All claims regarding manufacturing defects must be submitted within 15 days of cargo arrival at the destination port.
          </p>
        </section>

        <div className="pt-10 border-t border-neutral-100 text-[10px] uppercase font-bold tracking-widest">
          Governing Law: Jurisdiction of High Court, Uttar Pradesh, India.
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
