
import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppWidget from './WhatsAppWidget';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Global site layout wrapper providing header navigation, page content structure, and persistent contact widgets
 * @danishansari-dev children - Child page elements to render in main view
 * @returns Primary page layout tree
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      {/* Why: Provides global access to instant WhatsApp messaging across all catalog and information pages */}
      <WhatsAppWidget />
    </div>
  );
};

export default Layout;
