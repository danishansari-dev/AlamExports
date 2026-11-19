import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import SEO from './components/SEO';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CustomRugs from './pages/CustomRugs';
import Materials from './pages/Materials';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Disclaimer from './pages/Disclaimer';

const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      window.scrollTo(0, 0); // Scroll to top on route change
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    // Exact routes
    if (currentHash === '#/') return <Home />;
    if (currentHash === '#/about') return <About />;
    if (currentHash === '#/products') return <Products />;
    if (currentHash === '#/custom-rugs') return <CustomRugs />;
    if (currentHash === '#/materials') return <Materials />;
    if (currentHash === '#/contact') return <Contact />;
    if (currentHash === '#/privacy') return <PrivacyPolicy />;
    if (currentHash === '#/terms') return <TermsConditions />;
    if (currentHash === '#/disclaimer') return <Disclaimer />;

    // Dynamic routes
    if (currentHash.startsWith('#/category/')) return <CategoryPage />;
    if (currentHash.startsWith('#/product/')) return <ProductDetailPage />;

    return <Home />;
  };

  const getRouteSeo = () => {
    // Why: Provides route-specific titles, meta descriptions, and canonical paths for SPA hash routing
    if (currentHash === '#/about') {
      return {
        title: 'About Us | Heritage Weaving Since 1998',
        description: 'Discover the heritage of Alam Exports. Established in 1998 in Uttar Pradesh, India, delivering bespoke hand-woven carpets and luxury floor rugs worldwide.',
        canonicalPath: '#/about'
      };
    }
    if (currentHash === '#/products') {
      return {
        title: 'Product Catalog | Handcrafted Rugs, Carpets & Mats',
        description: 'Explore our complete export catalog of handcrafted jute floor rugs, artisan wool carpets, cotton bath mats, and embroidered pillow covers.',
        canonicalPath: '#/products'
      };
    }
    if (currentHash === '#/custom-rugs') {
      return {
        title: 'Custom Rugs & Bespoke Manufacturing',
        description: 'Bespoke custom rug manufacturing for architects, interior designers, and hospitality projects. Custom dimensions, color matching, and private label export.',
        canonicalPath: '#/custom-rugs'
      };
    }
    if (currentHash === '#/materials') {
      return {
        title: 'Sustainable Materials: Jute, Wool & Cotton',
        description: 'Explore our sustainable raw materials: 100% natural golden jute, premium New Zealand and Indian wool, and ring-spun organic cotton.',
        canonicalPath: '#/materials'
      };
    }
    if (currentHash === '#/contact') {
      return {
        title: 'Contact Us & Global B2B Inquiry',
        description: 'Get in touch with Alam Exports for wholesale inquiries, sample requests, and global container shipping quotes. Direct WhatsApp and email support.',
        canonicalPath: '#/contact'
      };
    }
    if (currentHash.startsWith('#/category/')) {
      const categoryName = decodeURIComponent(currentHash.replace('#/category/', '').split('?')[0]);
      return {
        title: `${categoryName} Collection | Handcrafted Rugs`,
        description: `Browse our wholesale collection of ${categoryName}. Handcrafted in India to international export quality standards.`,
        canonicalPath: currentHash
      };
    }
    if (currentHash === '#/privacy') {
      return {
        title: 'Privacy Policy',
        description: 'Alam Exports privacy policy regarding visitor data and B2B inquiry confidentiality.',
        canonicalPath: '#/privacy'
      };
    }
    if (currentHash === '#/terms') {
      return {
        title: 'Terms & Conditions',
        description: 'Commercial terms, international export guidelines, and purchasing conditions for Alam Exports.',
        canonicalPath: '#/terms'
      };
    }
    if (currentHash === '#/disclaimer') {
      return {
        title: 'Disclaimer',
        description: 'Product specifications, natural fiber variance, and website disclaimer for Alam Exports.',
        canonicalPath: '#/disclaimer'
      };
    }
    return {
      title: 'Manufacturer & Exporter of Handcrafted Rugs & Carpets',
      description: 'Premier Indian manufacturer and exporter of handcrafted luxury rugs, hand-woven carpets, natural jute floor coverings, and sustainable home textiles since 1998.',
      canonicalPath: '#/'
    };
  };

  const seo = getRouteSeo();

  return (
    <Layout>
      {/* Route-level SEO manager (ProductDetailPage has its own granular override) */}
      {!currentHash.startsWith('#/product/') && (
        <SEO 
          title={seo.title}
          description={seo.description}
          canonicalPath={seo.canonicalPath}
        />
      )}
      {renderPage()}
    </Layout>
  );
};

export default App;