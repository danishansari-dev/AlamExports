
import React from 'react';
import { CATEGORIES, WHATSAPP_NUMBER } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Redesigned High-Impact Hero Section with significantly reduced top spacing */}
      <section className="relative min-h-[65vh] bg-neutral-900 overflow-hidden flex items-center pt-6">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544413647-ad3473121111?auto=format&fit=crop&q=80&w=1920" 
            alt="Manufacturing Facility" 
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-transparent to-neutral-900"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (Messaging) */}
            <div className="lg:col-span-7 text-white">
              <div className="inline-flex items-center space-x-4 mb-4">
                <span className="h-[1px] w-12 bg-neutral-500"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-400">
                  EST. 1998 | PILIBHIT, INDIA
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.8] mb-6 uppercase animate-in slide-in-from-left duration-1000">
                Global<br />
                <span className="text-neutral-500">Sourcing</span><br />
                Excellence<span className="text-white">.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-neutral-400 max-w-xl mb-8 font-light leading-relaxed">
                Standardizing hand-made luxury for global distribution. ISO certified manufacturing 
                specializing in bespoke floor coverings, hand-woven carpets, and sustainable home textiles.
              </p>
              
              <div className="flex flex-wrap gap-5">
                <a href="#/products" className="group relative bg-white text-neutral-900 px-10 py-4 font-bold uppercase tracking-widest text-[11px] overflow-hidden transition-all shadow-2xl">
                  <span className="relative z-10">Explore Catalog</span>
                  <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </a>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`} 
                  target="_blank" 
                  className="border border-white/20 backdrop-blur-md px-10 py-4 font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-neutral-900 transition-all flex items-center"
                >
                  <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Quick Inquiry
                </a>
              </div>
            </div>

            {/* Right Side (Visual Balance - Eliminating Empty Space) */}
            <div className="lg:col-span-5 relative hidden lg:block animate-in fade-in slide-in-from-right duration-1000 delay-300">
              <div className="relative group">
                {/* Main Feature Frame */}
                <div className="aspect-[4/5] bg-neutral-800 border-[15px] border-neutral-800/50 overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                  <img 
                    src="https://images.unsplash.com/photo-1594897030264-ab7d87efc473?auto=format&fit=crop&q=80&w=1200" 
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
                    alt="Artisan Craftsmanship"
                  />
                  {/* Decorative Accents */}
                  <div className="absolute inset-0 border border-white/10 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-neutral-900/40 to-transparent"></div>
                </div>

                {/* Overlapping Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white p-8 text-neutral-900 shadow-2xl border border-neutral-100 transform -rotate-2 group-hover:rotate-0 transition-all duration-500">
                  <div className="relative">
                    <p className="text-4xl font-black tracking-tighter leading-none mb-2">B2B</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">Direct Export Unit</p>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Floating Dimension Tag */}
                <div className="absolute top-8 -right-8 bg-neutral-900/80 backdrop-blur-md p-5 border border-white/10 hidden xl:block">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Technical Insight</p>
                  <p className="text-white text-xs font-light leading-relaxed">
                    Custom weaving specs <br />
                    calibrated to <br />
                    <span className="font-bold">Global Standards</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Verticals Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold tracking-tight text-neutral-900 mb-6 uppercase">Our Product Verticals</h2>
            <p className="text-neutral-500 text-lg font-light leading-relaxed">
              Tailored collections for overseas distributors, buying houses, and high-end retail chains. 
              Each vertical is managed by dedicated quality control leads.
            </p>
          </div>
          <a href="#/products" className="text-xs font-bold border-b-2 border-neutral-900 pb-2 uppercase tracking-[0.3em] hover:opacity-70 transition-opacity">
            View Complete Catalog
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {CATEGORIES.slice(0, 6).map((cat, idx) => (
            <a 
              key={cat} 
              href={`#/category/${encodeURIComponent(cat)}`}
              className="group relative h-[400px] overflow-hidden bg-neutral-100 shadow-sm"
            >
              <img 
                src={`https://picsum.photos/seed/carpet_v2_${idx}/1000/1000`} 
                alt={cat} 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-2 block">Premium Range</span>
                <h3 className="text-3xl font-bold mb-4 uppercase tracking-tighter">{cat}</h3>
                <div className="h-[1px] w-0 group-hover:w-full bg-white transition-all duration-500"></div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
