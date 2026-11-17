
import React, { useState, useRef } from 'react';
import { askGeminiPro, generateProductImage, generateVeoVideo, searchTrends, editImage } from '../lib/gemini';

const AISourcingAssistant: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'lab' | 'trends' | 'edit'>('chat');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [generatedVid, setGeneratedVid] = useState<string | null>(null);
  const [editedImg, setEditedImg] = useState<string | null>(null);
  const [sourceImgForEdit, setSourceImgForEdit] = useState<string | null>(null);
  const [trends, setTrends] = useState<{ text: string, sources: any[] } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChat = async () => {
    if (!prompt) return;
    setLoading(true);
    const userMsg = prompt;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setPrompt('');
    try {
      const response = await askGeminiPro(`As a professional B2B rug export assistant, answer: ${userMsg}`, true);
      setMessages(prev => [...prev, { role: 'ai', text: response || 'I am sorry, I could not process that.' }]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGenImage = async () => {
    setLoading(true);
    try {
      const res = await generateProductImage(prompt, "1:1", "1K");
      setGeneratedImg(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGenVideo = async () => {
    setLoading(true);
    try {
      const res = await generateVeoVideo(prompt);
      setGeneratedVid(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEditImage = async () => {
    if (!sourceImgForEdit || !prompt) return;
    setLoading(true);
    try {
      const base64 = sourceImgForEdit.split(',')[1];
      const res = await editImage(base64, prompt);
      setEditedImg(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleTrends = async () => {
    setLoading(true);
    try {
      const res = await searchTrends(prompt || 'Rugs and Home Furnishings');
      setTrends(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImgForEdit(reader.result as string);
        setEditedImg(null); // Reset result when new source is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white border border-neutral-200 shadow-2xl rounded-sm overflow-hidden flex flex-col h-[650px] w-full max-w-4xl mx-auto transition-all duration-300">
      <div className="bg-neutral-900 p-4 flex justify-between items-center text-white">
        <h3 className="text-sm font-bold uppercase tracking-widest">Alam AI Sourcing Hub</h3>
        <div className="flex space-x-4 overflow-x-auto">
          <button onClick={() => setActiveTab('chat')} className={`text-[10px] uppercase font-bold tracking-widest whitespace-nowrap transition-colors ${activeTab === 'chat' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}>Assistant</button>
          <button onClick={() => setActiveTab('lab')} className={`text-[10px] uppercase font-bold tracking-widest whitespace-nowrap transition-colors ${activeTab === 'lab' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}>Design Lab</button>
          <button onClick={() => setActiveTab('edit')} className={`text-[10px] uppercase font-bold tracking-widest whitespace-nowrap transition-colors ${activeTab === 'edit' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}>AI Editor</button>
          <button onClick={() => setActiveTab('trends')} className={`text-[10px] uppercase font-bold tracking-widest whitespace-nowrap transition-colors ${activeTab === 'trends' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}>Market Intelligence</button>
        </div>
      </div>

      <div className="flex-grow p-6 overflow-y-auto bg-stone-50">
        {activeTab === 'chat' && (
          <div className="space-y-4">
            <div className="bg-neutral-100 p-4 rounded-sm border border-neutral-200">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Capabilities</p>
              <ul className="text-xs text-neutral-600 space-y-1">
                <li>• Ask about technical weaving specifications</li>
                <li>• Inquire about global MOQ standards</li>
                <li>• Request shipping and export advice</li>
              </ul>
            </div>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-sm text-sm ${m.role === 'user' ? 'bg-neutral-900 text-white shadow-md' : 'bg-white border border-neutral-200 text-neutral-800 shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-[10px] uppercase tracking-widest text-neutral-400 animate-pulse">Assistant is thinking...</div>}
          </div>
        )}

        {activeTab === 'lab' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="aspect-square bg-white border border-neutral-200 flex flex-col items-center justify-center overflow-hidden relative group">
                {generatedImg ? (
                  <>
                    <img src={generatedImg} className="w-full h-full object-cover" alt="Generated" />
                    <button 
                      onClick={() => { setSourceImgForEdit(generatedImg); setActiveTab('edit'); }}
                      className="absolute bottom-4 right-4 bg-white/90 text-neutral-900 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-neutral-200"
                    >
                      Send to Editor
                    </button>
                  </>
                ) : (
                  <span className="text-[10px] uppercase text-neutral-300 tracking-widest">Generated Prototype</span>
                )}
              </div>
              <div className="aspect-video bg-white border border-neutral-200 flex items-center justify-center overflow-hidden">
                {generatedVid ? <video src={generatedVid} controls className="w-full h-full object-cover" /> : <span className="text-[10px] uppercase text-neutral-300 tracking-widest">Generated Product Film</span>}
              </div>
            </div>
            <div className="flex flex-col space-y-4">
               <p className="text-[10px] text-neutral-500 uppercase tracking-widest text-center">Describe the rug design and let Gemini 3 Pro & Veo build it.</p>
               <div className="flex space-x-2">
                <button onClick={handleGenImage} disabled={loading} className="flex-1 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest py-3 hover:bg-neutral-800 disabled:opacity-50 transition-all">Generate Image</button>
                <button onClick={handleGenVideo} disabled={loading} className="flex-1 border border-neutral-900 text-neutral-900 text-[10px] font-bold uppercase tracking-widest py-3 hover:bg-neutral-100 disabled:opacity-50 transition-all">Generate Video (Veo)</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'edit' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">Original / Source</p>
                <div 
                  className="aspect-square bg-white border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:bg-neutral-50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {sourceImgForEdit ? (
                    <img src={sourceImgForEdit} className="w-full h-full object-cover" alt="Source" />
                  ) : (
                    <div className="text-center p-4">
                      <svg className="w-8 h-8 text-neutral-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-[9px] uppercase text-neutral-400 tracking-widest">Upload Reference Image</span>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">AI Edited Result</p>
                <div className="aspect-square bg-neutral-100 border border-neutral-200 flex items-center justify-center overflow-hidden">
                  {loading ? (
                    <div className="flex flex-col items-center">
                       <div className="w-6 h-6 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mb-2"></div>
                       <span className="text-[9px] uppercase text-neutral-400 tracking-widest">Gemini is editing...</span>
                    </div>
                  ) : editedImg ? (
                    <img src={editedImg} className="w-full h-full object-cover animate-in fade-in duration-500" alt="Result" />
                  ) : (
                    <span className="text-[10px] uppercase text-neutral-300 tracking-widest">Modified Product View</span>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white p-4 border border-neutral-200">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-3">Suggested Edits</p>
              <div className="flex flex-wrap gap-2">
                {["Add a retro filter", "Professional studio lighting", "Place in a modern living room", "Remove background", "Change to grayscale"].map(tag => (
                  <button 
                    key={tag} 
                    onClick={() => setPrompt(tag)}
                    className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-full text-[9px] font-bold uppercase tracking-tight transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={handleEditImage} 
              disabled={loading || !sourceImgForEdit || !prompt} 
              className="w-full bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest py-4 hover:bg-neutral-800 disabled:opacity-50 transition-all shadow-xl"
            >
              Apply AI Edit
            </button>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-4">
            {trends ? (
              <div className="bg-white p-6 border border-neutral-200 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                <h4 className="text-xs font-bold uppercase mb-4 tracking-widest border-b pb-2">Global Market Insights</h4>
                <p className="text-sm text-neutral-700 leading-relaxed mb-6 whitespace-pre-line">{trends.text}</p>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Grounding Sources:</p>
                  <div className="flex flex-wrap gap-2">
                    {trends.sources.map((s, i) => (
                      <a key={i} href={s.web?.uri} target="_blank" className="inline-block bg-blue-50 border border-blue-100 px-3 py-1 rounded text-[10px] text-blue-600 hover:bg-blue-100 transition-colors">{s.web?.title || 'External Source'}</a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <svg className="w-12 h-12 text-neutral-100 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                <div className="text-neutral-400 uppercase text-xs tracking-widest">Enter a query to research global trends</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-neutral-200 flex items-center space-x-2">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (activeTab === 'chat') handleChat();
              else if (activeTab === 'trends') handleTrends();
              else if (activeTab === 'edit') handleEditImage();
              else if (activeTab === 'lab') handleGenImage();
            }
          }}
          placeholder={
            activeTab === 'chat' ? "Ask about MOQs, materials, or shipping..." : 
            activeTab === 'edit' ? "e.g. 'Add a vintage film look'..." :
            "Describe the design or query..."
          }
          className="flex-grow p-3 border border-neutral-300 focus:outline-neutral-900 text-sm placeholder:text-neutral-300"
        />
        <button 
          onClick={() => {
            if (activeTab === 'chat') handleChat();
            else if (activeTab === 'trends') handleTrends();
            else if (activeTab === 'edit') handleEditImage();
            else if (activeTab === 'lab') handleGenImage();
          }}
          disabled={loading}
          className="bg-neutral-900 text-white p-3 px-6 text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all disabled:opacity-50"
        >
          {loading ? 'Processing' : 'Process'}
        </button>
      </div>
    </div>
  );
};

export default AISourcingAssistant;
