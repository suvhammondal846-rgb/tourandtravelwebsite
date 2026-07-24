import React, { useState, useRef, useEffect } from 'react';
import { 
  Compass, MessageSquare, Send, Sparkles, X, Calendar, 
  MapPin, Activity, CheckCircle, AlertCircle, Loader2, 
  ChevronDown, ChevronUp, Printer 
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

// Types for structured itinerary
interface ActivityItem {
  time: string;
  title: string;
  description: string;
}

interface ItineraryDay {
  day: number;
  theme: string;
  activities: ActivityItem[];
}

interface ItineraryResult {
  title: string;
  summary: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  tips: string[];
  packing: string[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function AITravelPlanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'planner' | 'chat'>('planner');
  
  // Trip Planner States
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('3');
  const [style, setStyle] = useState('Balanced (Adventure & Relaxation)');
  const [isPlanning, setIsPlanning] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryResult | null>(null);
  const [planError, setPlanError] = useState<string | null>(null);
  const [expandedDays, setExpandedDays] = useState<{ [key: number]: boolean }>({ 1: true });

  // Chat States
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi there! I am your Traviou AI travel assistant. Ask me anything about flight packing hacks, local customs, or recommend some hidden gem destinations!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handlePlanTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    setIsPlanning(true);
    setPlanError(null);
    setItinerary(null);

    try {
      const response = await fetch('/api/plan-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destination, duration, style }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Server error planning trip.');
      }

      const data: ItineraryResult = await response.json();
      setItinerary(data);
      // Auto-expand day 1
      setExpandedDays({ 1: true });
    } catch (err: any) {
      console.error(err);
      setPlanError(err.message || 'Failed to generate itinerary. Please try again.');
    } finally {
      setIsPlanning(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const userMsg = inputMessage;
    setInputMessage('');
    const updatedMessages = [...chatMessages, { role: 'user' as const, content: userMsg }];
    setChatMessages(updatedMessages);
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Server error sending message.');
      }

      const data = await response.json();
      setChatMessages([...updatedMessages, { role: 'assistant', content: data.content }]);
    } catch (err: any) {
      console.error(err);
      setChatMessages([
        ...updatedMessages,
        { role: 'assistant', content: '⚠️ Error: Sorry, I am having trouble connecting to the travel guide server right now.' }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const toggleDay = (day: number) => {
    setExpandedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer select-none group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 opacity-50 blur-md group-hover:opacity-75 transition duration-200"></span>
        <span className="relative flex items-center gap-2">
          {isOpen ? <X size={24} /> : <Compass className="animate-spin-slow" size={24} />}
          {!isOpen && <span className="font-semibold hidden md:inline-block pr-1">Traviou AI Planner</span>}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[92vw] sm:w-[480px] h-[75vh] md:h-[650px] bg-white/95 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-[0_20px_50px_rgba(30,58,138,0.15)] z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-5 flex justify-between items-center relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="bg-white/15 p-2 rounded-xl">
                  <Sparkles className="text-orange-400 fill-orange-400" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Traviou Travel Assistant</h3>
                  <p className="text-xs text-blue-200">Powered by Gemini 2.0 Flash</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-blue-50/50 p-1.5 gap-1 shrink-0 border-b border-blue-50">
              <button
                onClick={() => setActiveTab('planner')}
                className={`flex-1 py-2.5 px-3 rounded-2xl text-sm font-semibold transition flex items-center justify-center gap-2 ${
                  activeTab === 'planner'
                    ? 'bg-white text-blue-900 shadow-sm border border-blue-100/50'
                    : 'text-gray-500 hover:text-blue-900'
                }`}
              >
                <Calendar size={16} />
                AI Trip Planner
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2.5 px-3 rounded-2xl text-sm font-semibold transition flex items-center justify-center gap-2 ${
                  activeTab === 'chat'
                    ? 'bg-white text-blue-900 shadow-sm border border-blue-100/50'
                    : 'text-gray-500 hover:text-blue-900'
                }`}
              >
                <MessageSquare size={16} />
                AI Travel Guide
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-5">
              {activeTab === 'planner' ? (
                <div className="space-y-6">
                  {!itinerary ? (
                    <form onSubmit={handlePlanTrip} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5">Where are we going?</label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            placeholder="e.g. Kyoto, Japan or Amalfi Coast, Italy"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition text-sm font-medium text-gray-800"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5">How many days?</label>
                          <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition text-sm font-medium text-gray-800"
                          >
                            {[1, 2, 3, 4, 5, 7, 10, 14].map((d) => (
                              <option key={d} value={d}>{d} {d === 1 ? 'Day' : 'Days'}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1.5">Travel Style</label>
                          <select
                            value={style}
                            onChange={(e) => setStyle(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition text-sm font-medium text-gray-800"
                          >
                            <option value="Balanced (Adventure & Relaxation)">Balanced</option>
                            <option value="Adventure & Outdoors">Adventure</option>
                            <option value="Relaxation & Wellness">Relaxing</option>
                            <option value="History, Art & Culture">Cultural</option>
                            <option value="Local Food & Culinary">Culinary</option>
                            <option value="Budget Backpacker">Budget-Friendly</option>
                            <option value="Luxury & Exclusive">Premium Luxury</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isPlanning || !destination.trim()}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white rounded-2xl font-bold text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isPlanning ? (
                          <>
                            <Loader2 className="animate-spin" size={18} />
                            Curating your itinerary...
                          </>
                        ) : (
                          <>
                            <Sparkles size={16} />
                            Plan My Trip
                          </>
                        )}
                      </button>

                      {planError && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs flex gap-2.5 items-start">
                          <AlertCircle size={16} className="shrink-0 mt-0.5" />
                          <span>{planError}</span>
                        </div>
                      )}
                    </form>
                  ) : (
                    /* Display Itinerary Result */
                    <div id="tracked-ticket-outlet" className="space-y-6 animate-fade-in print:p-0">
                      {/* Itinerary Title Section */}
                      <div className="border-b border-gray-100 pb-5">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-extrabold text-blue-900 text-2xl">{itinerary.title}</h4>
                          <button 
                            onClick={handlePrint}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 p-2 rounded-xl transition print:hidden"
                            title="Print Itinerary"
                          >
                            <Printer size={16} />
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm mt-2 leading-relaxed">{itinerary.summary}</p>
                      </div>

                      {/* Highlights */}
                      <div>
                        <h5 className="font-bold text-blue-900 text-sm uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Activity size={16} className="text-orange-500" />
                          Highlights
                        </h5>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-gray-700">
                          {itinerary.highlights.map((h, i) => (
                            <li key={i} className="flex items-center gap-2 bg-blue-50/50 px-3 py-2.5 rounded-xl">
                              <CheckCircle size={14} className="text-blue-600 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Daily Itinerary Timeline */}
                      <div>
                        <h5 className="font-bold text-blue-900 text-sm uppercase tracking-wider mb-3">Day-by-Day Timeline</h5>
                        <div className="space-y-3">
                          {itinerary.itinerary.map((day) => (
                            <div key={day.day} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white">
                              <button
                                onClick={() => toggleDay(day.day)}
                                className="w-full flex justify-between items-center p-4 bg-gray-50/50 hover:bg-gray-50 transition text-left"
                              >
                                <div>
                                  <span className="inline-block px-2.5 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider mb-1">
                                    Day {day.day}
                                  </span>
                                  <h6 className="font-extrabold text-blue-900 text-sm">{day.theme}</h6>
                                </div>
                                {expandedDays[day.day] ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                              </button>
                              
                              {expandedDays[day.day] && (
                                <div className="p-4 border-t border-gray-50 bg-white space-y-4">
                                  {day.activities.map((act, index) => (
                                    <div key={index} className="flex gap-3 relative pb-4 last:pb-0">
                                      {index !== day.activities.length - 1 && (
                                        <span className="absolute left-2.5 top-6 bottom-0 w-[1.5px] bg-gray-100"></span>
                                      )}
                                      <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                        {index + 1}
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-[10px] font-bold uppercase text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
                                            {act.time}
                                          </span>
                                          <span className="font-bold text-blue-900 text-xs">{act.title}</span>
                                        </div>
                                        <p className="text-gray-500 text-xs mt-1 leading-relaxed">{act.description}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Travel Tips & Packing */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-orange-50/30 p-4 border border-orange-100/50 rounded-2xl">
                          <h6 className="font-bold text-orange-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            💡 Local Tips
                          </h6>
                          <ul className="space-y-1.5 text-xs text-orange-950 font-medium">
                            {itinerary.tips.map((t, i) => (
                              <li key={i} className="flex gap-2">
                                <span className="shrink-0">•</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-blue-50/30 p-4 border border-blue-100/50 rounded-2xl">
                          <h6 className="font-bold text-blue-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            🎒 Packing Essentials
                          </h6>
                          <ul className="space-y-1.5 text-xs text-blue-950 font-medium">
                            {itinerary.packing.map((p, i) => (
                              <li key={i} className="flex gap-2">
                                <span className="shrink-0">✓</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Reset Button */}
                      <button
                        onClick={() => {
                          setItinerary(null);
                          setDestination('');
                        }}
                        className="w-full py-3 border border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-gray-800 rounded-xl text-xs font-semibold transition print:hidden cursor-pointer"
                      >
                        Plan Another Trip
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* General Chat Room */
                <div className="flex flex-col h-full min-h-[400px]">
                  {/* Messages Bubble List */}
                  <div className="flex-1 space-y-4 mb-4">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                              : 'bg-gray-100 text-gray-800 rounded-tl-none font-normal'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isSending && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-500 px-4 py-3 rounded-2xl rounded-tl-none text-xs flex items-center gap-1.5 font-medium">
                          <Loader2 className="animate-spin" size={14} />
                          Guide is thinking...
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Predefined prompts */}
                  {chatMessages.length === 1 && (
                    <div className="mb-4 space-y-2 shrink-0">
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Common Questions</p>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          'What are some packing hacks?',
                          'How do I budget for Europe?',
                          'What is the best time to visit Bali?',
                          'Recommend safe travel gear'
                        ].map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setInputMessage(q);
                            }}
                            className="bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-900 border border-gray-100 hover:border-blue-100 px-3 py-1.5 rounded-xl text-xs transition cursor-pointer text-left font-medium"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Send Input Bar */}
                  <form onSubmit={handleSendMessage} className="flex gap-2 shrink-0 relative">
                    <input
                      type="text"
                      placeholder="Ask the Traviou travel guide..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      disabled={isSending}
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none text-xs font-semibold text-gray-800 transition disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isSending || !inputMessage.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-2xl transition disabled:opacity-50 cursor-pointer flex items-center justify-center shadow"
                    >
                      <Send size={16} />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
