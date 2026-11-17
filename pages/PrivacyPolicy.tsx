
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-24 max-w-4xl mx-auto px-6">
      <h1 className="text-4xl font-bold uppercase tracking-tighter mb-12 border-b border-neutral-200 pb-8">Privacy Policy</h1>
      <div className="prose prose-neutral max-w-none text-neutral-600 space-y-8 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-widest mb-4">1. Data Collection & Purpose</h2>
          <p>
            Alam Exports collects business-related information including company names, authorized representative contacts, tax IDs (where applicable), and specific sourcing requirements. This data is used exclusively for processing wholesale inquiries, generating proforma invoices, and managing international shipping documentation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-widest mb-4">2. Proprietary Design Protection</h2>
          <p>
            We recognize the importance of intellectual property in the home furnishings industry. Any custom designs or technical specifications provided by clients for manufacturing are treated as strictly confidential and are protected under non-disclosure protocols within our production facility.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-widest mb-4">3. Data Sharing with Third-Parties</h2>
          <p>
            For the purpose of fulfilling export orders, we share necessary data with licensed freight forwarders, customs brokerage firms, and banking institutions. We do not sell or lease corporate contact lists to third-party marketing agencies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-widest mb-4">4. Cookies & Analytics</h2>
          <p>
            This website utilizes standard analytics cookies to monitor traffic patterns and improve the user experience for our global distribution partners. No personal financial data is stored on our servers.
          </p>
        </section>

        <div className="bg-stone-100 p-8 mt-12 border border-neutral-200 italic text-sm">
          Last Updated: October 2023. For specific data requests, please contact our Compliance Department at privacy@alamexports.com.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
