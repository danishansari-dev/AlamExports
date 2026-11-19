
import React, { useMemo, useState } from 'react';
import { PRODUCTS } from '../data';
import ProductImageGallery from '../components/ProductImageGallery';
import InquiryForm from '../components/InquiryForm';
import { analyzeImage } from '../lib/gemini';
import SEO from '../components/SEO';

const ProductDetailPage: React.FC = () => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const product = useMemo(() => {
    const hash = window.location.hash;
    const parts = hash.split('/');
    const idWithParams = parts[parts.length - 1];
    const id = idWithParams.split('?')[0];
    return PRODUCTS.find(p => p.id === id);
  }, [window.location.hash]);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold uppercase tracking-widest">Product Not Found</h2>
        <a href="#/products" className="text-neutral-500 underline mt-4 inline-block">Back to Collections</a>
      </div>
    );
  }

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // For demo, we use the static URL and fetch it as base64
      const response = await fetch(product.image);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const result = await analyzeImage(base64, "Analyze the weaving technique, potential material quality, and design style of this rug for a B2B export report.");
        setAnalysis(result);
        setIsAnalyzing(false);
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      console.error(e);
      setIsAnalyzing(false);
    }
  };

  const galleryImages = [
    product.image,
    `https://picsum.photos/seed/${product.id}-texture/800/800`,
    `https://picsum.photos/seed/${product.id}-edge/800/800`,
    `https://picsum.photos/seed/${product.id}-backing/800/800`,
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-6">
      {/* Why: Injects product-specific title, description, and Open Graph tags for search engine optimization */}
      <SEO 
        title={product.title}
        description={`${product.title}: ${product.description} Available for bulk B2B wholesale and custom export from India.`}
        canonicalPath={`#/product/${product.id}`}
        image={product.image}
        keywords={`${product.title}, ${product.category}, ${product.material.join(', ')}, wholesale rugs India`}
        type="product"
      />

      <nav className="mb-8 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
        <a href="#/" className="hover:text-neutral-900 transition-colors">Home</a>
        <span className="mx-2">/</span>
        <a href="#/products" className="hover:text-neutral-900 transition-colors">Products</a>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
        {/* Gallery Section */}
        <div className="lg:col-span-7">
          <ProductImageGallery images={galleryImages} />
          
          {product.video && (
            <div className="mt-12">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-6 flex items-center">
                <span className="w-8 h-[1px] bg-neutral-900 mr-3"></span>
                Manufacturing Process & Showcase
              </h3>
              <div className="aspect-video bg-neutral-900 border border-neutral-200 overflow-hidden shadow-lg relative group">
                <video 
                  src={product.video} 
                  controls 
                  className="w-full h-full object-cover"
                  poster={product.image}
                />
              </div>
            </div>
          )}

          {/* AI Analysis Feature */}
          <div className="mt-12 bg-stone-100 p-8 border border-neutral-200 rounded-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">Technical AI Analysis</h3>
              <button 
                onClick={handleAIAnalysis}
                disabled={isAnalyzing}
                className="bg-neutral-900 text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 disabled:opacity-50 transition-all"
              >
                {isAnalyzing ? 'Analyzing Pattern...' : 'Run Pattern Analysis'}
              </button>
            </div>
            {analysis ? (
              <div className="text-sm text-neutral-700 leading-relaxed font-light whitespace-pre-wrap animate-in fade-in slide-in-from-bottom-2 duration-500">
                {analysis}
              </div>
            ) : (
              <p className="text-[10px] uppercase text-neutral-400 tracking-widest text-center py-4">
                Click to generate a technical report on this product using Gemini 3 Pro Vision.
              </p>
            )}
          </div>
        </div>
        
        {/* Sticky Detail Sidebar */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
          <div className="mb-8">
            <span className="inline-block bg-neutral-900 text-white px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] mb-4">
              Export Grade SKU: {product.id.toUpperCase()}
            </span>
            <h1 className="text-4xl font-bold uppercase tracking-tighter text-neutral-900 mb-6 leading-none">
              {product.title}
            </h1>
            <p className="text-neutral-600 text-lg leading-relaxed font-light mb-8">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-10">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 border-b border-neutral-100 pb-2">
                Technical Specifications
              </h3>
              <ul className="space-y-4">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex items-center text-sm text-neutral-800 font-medium">
                    <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full mr-3"></span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 border-b border-neutral-100 pb-2">
                Certified Materials
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.material.map(m => (
                  <span key={m} className="px-3 py-1 bg-white border border-neutral-200 text-[10px] font-bold uppercase text-neutral-600 shadow-sm">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-10">
            <div className="flex items-center justify-between p-4 bg-stone-50 border border-neutral-200">
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Global MOQ</span>
              <span className="text-xs font-bold text-neutral-900">500 Units / 20ft Container</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-stone-50 border border-neutral-200">
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Lead Time</span>
              <span className="text-xs font-bold text-neutral-900">60-75 Days ARO</span>
            </div>
          </div>

          <a 
            href="#contact-section"
            className="w-full bg-neutral-900 text-white text-center block py-5 font-bold uppercase tracking-widest text-sm hover:bg-neutral-800 transition-all shadow-xl hover:translate-y-[-2px] active:translate-y-0"
          >
            Inquire for Pricing
          </a>
        </div>
      </div>

      {/* Inquiry Form Section */}
      <div id="contact-section" className="max-w-4xl mx-auto pt-24 border-t border-neutral-200">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-neutral-400 mb-2 block">Direct Export Inquiry</span>
          <h2 className="text-3xl font-bold uppercase tracking-tighter text-neutral-900">Sourcing Request</h2>
          <p className="text-neutral-500 mt-4 max-w-md mx-auto">
            Our export manager will review your technical requirements for <span className="text-neutral-900 font-bold">{product.title}</span>.
          </p>
        </div>
        <InquiryForm productTitle={product.title} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
