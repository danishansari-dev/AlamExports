
import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../data';
import { CATEGORIES, MATERIALS } from '../constants';
import { ProductCategory, Material } from '../types';
import ProductCard from '../components/ProductCard';

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.split('?')[1]);
    const catParam = params.get('category');
    if (catParam && CATEGORIES.includes(catParam as ProductCategory)) {
      setSelectedCategory(catParam as ProductCategory);
    }
  }, []);

  const toggleMaterial = (mat: Material) => {
    setSelectedMaterials(prev => 
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const materialMatch = selectedMaterials.length === 0 || 
        product.material.some(m => selectedMaterials.includes(m));
      return categoryMatch && materialMatch;
    });
  }, [selectedCategory, selectedMaterials]);

  return (
    <div className="bg-white min-h-screen">
      {/* Premium Catalog Hero */}
      <section className="relative py-48 bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=1920" 
            alt="Handmade Rug Craftsmanship" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-transparent to-neutral-900"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.6em] text-white/50 mb-8 px-4 py-2 border border-white/10 bg-white/5 backdrop-blur-md">
              Master Export Catalog
            </span>
            <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter text-white mb-10 leading-[0.8] animate-in slide-in-from-left duration-1000">
              Manufacturing<br /><span className="text-neutral-500">Excellence.</span>
            </h1>
            <p className="text-neutral-400 text-xl font-light leading-relaxed max-w-2xl mb-12">
              Access technical specifications and high-resolution CAD designs for our global inventory. 
              ISO 9001 certified facility direct products.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-72 flex-shrink-0 space-y-16">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-900 mb-10 border-b border-neutral-100 pb-5">
                Product Verticals
              </h3>
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className={`text-left text-sm transition-all py-1 ${selectedCategory === 'All' ? 'font-bold text-neutral-900 pl-4 border-l-4 border-neutral-900' : 'text-neutral-400 hover:text-neutral-900 hover:pl-4 border-l-4 border-transparent'}`}
                >
                  Global Inventory
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat as ProductCategory)}
                    className={`text-left text-sm transition-all py-1 ${selectedCategory === cat ? 'font-bold text-neutral-900 pl-4 border-l-4 border-neutral-900' : 'text-neutral-400 hover:text-neutral-900 hover:pl-4 border-l-4 border-transparent'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-900 mb-10 border-b border-neutral-100 pb-5">
                Technical Materials
              </h3>
              <div className="space-y-5">
                {MATERIALS.map(mat => (
                  <label key={mat} className="flex items-center space-x-4 cursor-pointer group">
                    <input 
                      type="checkbox"
                      className="w-5 h-5 border-neutral-300 focus:ring-0 accent-neutral-900 rounded-none cursor-pointer"
                      checked={selectedMaterials.includes(mat as Material)}
                      onChange={() => toggleMaterial(mat as Material)}
                    />
                    <span className="text-xs text-neutral-500 group-hover:text-neutral-900 transition-colors uppercase tracking-widest font-medium">
                      {mat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Support Widget */}
            <div className="p-10 bg-neutral-900 text-white relative overflow-hidden group border border-white/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4 relative z-10">Technical Desk</h4>
              <p className="text-xs font-light leading-relaxed text-neutral-400 relative z-10 mb-8">
                Need CAD files or custom material certifications? Connect with our technical team.
              </p>
              <a href="#/contact" className="relative z-10 inline-block text-[10px] font-bold uppercase tracking-[0.3em] border-b-2 border-white pb-1 hover:text-neutral-400 transition-colors">
                Request Assets
              </a>
            </div>
          </aside>

          {/* Grid View */}
          <main className="flex-grow">
            <div className="flex justify-between items-center mb-20 pb-8 border-b border-neutral-100">
              <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-400">
                Displaying <span className="text-neutral-900 font-black">{filteredProducts.length}</span> Master SKUs
              </div>
              <div className="hidden md:flex items-center space-x-6 text-[9px] uppercase font-bold text-neutral-400 tracking-[0.2em]">
                <span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Inventory Ready</span>
                <span className="w-[1px] h-4 bg-neutral-200"></span>
                <span>Port: Mundra / Nhava Sheva</span>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-64 text-center border-2 border-dashed border-neutral-100 bg-neutral-50">
                <p className="text-neutral-300 font-bold uppercase tracking-[0.6em] text-xs mb-10">No Catalog Matches Found</p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSelectedMaterials([]); }}
                  className="px-12 py-5 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl hover:bg-neutral-800 transition-all"
                >
                  Clear Catalog Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* RE-DESIGNED PREMIUM SOURCING BANNER */}
      <section className="bg-neutral-950 py-32 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-neutral-500 mb-6 block animate-pulse">Global Trust Matrix</span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white">Supply Chain Excellence</h2>
            <div className="w-20 h-1 bg-neutral-800 mx-auto mt-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 shadow-2xl">
            <div className="p-16 bg-neutral-950 hover:bg-neutral-900 transition-all duration-500 group relative">
              <div className="absolute top-0 right-0 p-8 text-white/5 font-black text-6xl group-hover:text-white/10 transition-colors">01</div>
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-10 group-hover:bg-white group-hover:text-neutral-950 transition-all duration-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-bold uppercase tracking-[0.2em] text-xs mb-6 text-white">Quality Audits</h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed uppercase tracking-widest font-light group-hover:text-neutral-300 transition-colors">
                5-Step standard verification. Intertek & SGS inspections welcomed for all volume shipments.
              </p>
            </div>

            <div className="p-16 bg-neutral-950 hover:bg-neutral-900 transition-all duration-500 group relative">
              <div className="absolute top-0 right-0 p-8 text-white/5 font-black text-6xl group-hover:text-white/10 transition-colors">02</div>
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-10 group-hover:bg-white group-hover:text-neutral-950 transition-all duration-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h3 className="font-bold uppercase tracking-[0.2em] text-xs mb-6 text-white">Bulk Logistics</h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed uppercase tracking-widest font-light group-hover:text-neutral-300 transition-colors">
                FCL and LCL experts. We handle all export documentation for EU, USA, and Oceania ports.
              </p>
            </div>

            <div className="p-16 bg-neutral-950 hover:bg-neutral-900 transition-all duration-500 group relative">
              <div className="absolute top-0 right-0 p-8 text-white/5 font-black text-6xl group-hover:text-white/10 transition-colors">03</div>
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-10 group-hover:bg-white group-hover:text-neutral-950 transition-all duration-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 11h.01M7 15h.01M13 7h.01M13 11h.01M13 15h.01M17 7h.01M17 11h.01M17 15h.01" /></svg>
              </div>
              <h3 className="font-bold uppercase tracking-[0.2em] text-xs mb-6 text-white">Private Label</h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed uppercase tracking-widest font-light group-hover:text-neutral-300 transition-colors">
                White labeling and custom packaging. High-volume contract manufacturing for global retail.
              </p>
            </div>

            <div className="p-16 bg-neutral-950 hover:bg-neutral-900 transition-all duration-500 group relative">
              <div className="absolute top-0 right-0 p-8 text-white/5 font-black text-6xl group-hover:text-white/10 transition-colors">04</div>
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-10 group-hover:bg-white group-hover:text-neutral-950 transition-all duration-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-bold uppercase tracking-[0.2em] text-xs mb-6 text-white">Flexible MOQs</h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed uppercase tracking-widest font-light group-hover:text-neutral-300 transition-colors">
                Tailored solutions for growing distributors. Low minimums on stock programs for fast turnarounds.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
