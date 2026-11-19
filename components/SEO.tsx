import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  keywords?: string;
  type?: 'website' | 'article' | 'product';
}

/**
 * Dynamic Head & Meta Tag Manager for Client-Side Hash Routing
 * 
 * Why this code exists:
 * In a Single Page Application (SPA) using hash routing, browser document title,
 * canonical links, and social Open Graph tags do not automatically update on navigation.
 * This component synchronizes document head metadata to ensure search engine crawlers,
 * social scrapers, and browser tabs always reflect the exact current page or product.
 * 
 * @danishansari-dev title - Custom page title segment
 * @danishansari-dev description - Page-specific meta description for search engine SERP snippets
 * @danishansari-dev canonicalPath - Relative or hash path to generate the canonical URL
 * @danishansari-dev image - High-res preview image for Open Graph and Twitter cards
 * @danishansari-dev keywords - Targeted search keywords for the specific route
 * @danishansari-dev type - Open Graph object type
 * @returns null - Side-effect only component
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description = "Premier Indian manufacturer and exporter of handcrafted luxury rugs, hand-woven carpets, natural jute floor coverings, and sustainable home textiles since 1998.",
  canonicalPath,
  image = "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=1200",
  keywords,
  type = "website"
}) => {
  useEffect(() => {
    // 1. Update Document Title
    const baseTitle = "Alam Exports | Manufacturer & Exporter of Fine Rugs";
    const fullTitle = title ? `${title} | Alam Exports` : baseTitle;
    document.title = fullTitle;

    // Helper to safely set or create a <meta> tag
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    if (keywords) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    // 3. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', image);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', type);

    // 4. Twitter Tags
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', image);

    // 5. Canonical Link
    const canonicalUrl = canonicalPath
      ? `https://www.alamexports.com/${canonicalPath.startsWith('/') ? canonicalPath.slice(1) : canonicalPath}`
      : 'https://www.alamexports.com/';
    
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [title, description, canonicalPath, image, keywords, type]);

  return null;
};

export default SEO;
