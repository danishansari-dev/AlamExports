
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="py-24 max-w-3xl mx-auto px-6">
      <div className="bg-neutral-900 p-12 md:p-20 text-center text-white border-t-8 border-neutral-400">
        <h1 className="text-3xl font-bold uppercase tracking-tighter mb-8">B2B Legal Disclaimer</h1>
        
        <div className="space-y-6 text-sm text-neutral-400 font-light leading-relaxed">
          <p>
            <strong className="text-white">Commercial Intent:</strong> This digital platform is designed exclusively as a sourcing tool for international business-to-business (B2B) trade. It is not an e-commerce storefront for general consumers.
          </p>
          <p>
            <strong className="text-white">Transaction Protocol:</strong> No direct payments are processed through this website. Any pricing discussed is indicative and subject to change based on raw material costs and order volume. A binding contract only exists upon the issuance of a formal Proforma Invoice by Alam Exports.
          </p>
          <p>
            <strong className="text-white">Visual Representation:</strong> Hand-made rugs and textiles may exhibit natural variations in weave, shade, and texture. Digital displays may vary; we recommend requesting physical swatches for color-critical projects.
          </p>
        </div>

        <div className="mt-12 pt-12 border-t border-neutral-800">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Alam Exports Manufacturing Unit</p>
          <p className="text-[10px] text-neutral-500 mt-2">Certified for Global Export Standards</p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <a href="#/" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors">Return to Homepage</a>
      </div>
    </div>
  );
};

export default Disclaimer;
