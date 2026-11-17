
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* About Hero */}
      <section className="relative py-40 bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1594897030264-ab7d87efc473?auto=format&fit=crop&q=80&w=1920" 
            alt="Factory Floor" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-neutral-900/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-neutral-400 mb-6 block">Legacy of Craftsmanship</span>
          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-8">Heritage & Scale</h1>
          <p className="text-neutral-300 max-w-2xl mx-auto text-xl font-light leading-relaxed">
            From a small weaving unit to a global export hub, our journey is defined by a 
            commitment to quality and social responsibility.
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-4 block">Our Manufacturing Unit</span>
            <h2 className="text-4xl font-bold tracking-tighter mb-8 uppercase text-neutral-900">Located in the heart of India's textile belt.</h2>
            <div className="space-y-8 text-neutral-600 font-light leading-relaxed">
              <p>
                Based in Pilibhit, Uttar Pradesh, Alam Exports operates out of a state-of-the-art 
                manufacturing facility spanning over 50,000 square feet. We combine traditional 
                hand-weaving techniques with modern dyeing and finishing technology.
              </p>
              <p>
                Our facility is strategically located to leverage local heritage weaving skills 
                passed down through generations, ensuring every rug that leaves our floor is a 
                masterpiece of artisan expertise.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center text-xs font-bold uppercase tracking-widest text-neutral-900">
                  <span className="w-8 h-[1px] bg-neutral-900 mr-4"></span>
                  ISO 9001:2015 Certified Management
                </li>
                <li className="flex items-center text-xs font-bold uppercase tracking-widest text-neutral-900">
                  <span className="w-8 h-[1px] bg-neutral-900 mr-4"></span>
                  OEKO-TEX Standard Material Sourcing
                </li>
                <li className="flex items-center text-xs font-bold uppercase tracking-widest text-neutral-900">
                  <span className="w-8 h-[1px] bg-neutral-900 mr-4"></span>
                  Social Audit Compliant Facility
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <img src="https://picsum.photos/seed/about1/800/1000" className="w-full aspect-[3/4] object-cover shadow-xl" alt="Factory 1" />
            <img src="https://picsum.photos/seed/about2/800/1000" className="w-full aspect-[3/4] object-cover shadow-xl mt-12" alt="Factory 2" />
          </div>
        </div>
      </section>

      {/* Corporate Values */}
      <section className="bg-stone-50 py-32 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center p-12 bg-white shadow-sm border border-neutral-100">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-6">Sustainability</h3>
            <p className="text-sm text-neutral-500 font-light leading-relaxed">
              We prioritize natural fibers like jute, wool, and hemp, and employ zero-liquid discharge dyeing units.
            </p>
          </div>
          <div className="text-center p-12 bg-white shadow-sm border border-neutral-100">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-6">Social Impact</h3>
            <p className="text-sm text-neutral-500 font-light leading-relaxed">
              Empowering over 500 artisan families through fair-wage practices and community development programs.
            </p>
          </div>
          <div className="text-center p-12 bg-white shadow-sm border border-neutral-100">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-6">Global Quality</h3>
            <p className="text-sm text-neutral-500 font-light leading-relaxed">
              Rigorous 5-point quality inspection on every batch ensures zero-defect delivery to international ports.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
