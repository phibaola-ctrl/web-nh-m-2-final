import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { Tour } from '../data/tours';
import { Message, getConciergeResponse } from '../services/geminiService';
import { cn } from '../lib/utils';

interface BookingChatbotProps {
  tour: Tour;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: () => void;
}

export default function BookingChatbot({ tour, isOpen, onClose, onConfirmBooking }: BookingChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "model",
          text: `Chào bạn! Tôi là trợ lý du lịch từ BLINDTRIP. Rất tuyệt vời khi bạn quan tâm đến tour "${tour.name}". Bạn có thắc mắc gì về lịch trình tại ${tour.location} hay cần tôi hỗ trợ gì trước khi đặt chỗ không?`
        }
      ]);
    }
  }, [isOpen, tour, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await getConciergeResponse([...messages, userMessage], tour);
    
    setMessages(prev => [...prev, { role: "model", text: responseText || "..." }]);
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg h-[600px] bg-[#0a0d14] border border-white/20 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(79,70,229,0.2)]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase tracking-tighter text-sm">Travel Concierge</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Đang trực tuyến</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
            >
              {messages.map((m, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "flex gap-4 max-w-[85%]",
                    m.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border",
                    m.role === 'user' 
                      ? "bg-white/10 border-white/10" 
                      : "bg-indigo-500/10 border-indigo-500/20"
                  )}>
                    {m.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed",
                    m.role === 'user' 
                      ? "bg-indigo-600 text-white rounded-tr-none" 
                      : "bg-white/5 text-slate-300 border border-white/5 rounded-tl-none"
                  )}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20">
                    <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                  </div>
                  <div className="p-4 bg-white/5 text-slate-400 border border-white/5 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-white/10 bg-white/[0.01]">
              <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
                {["Lịch trình thế nào?", "Thời tiết ra sao?", "Dịch vụ đã bao gồm gì?"].map(hint => (
                  <button
                    key={hint}
                    onClick={() => setInput(hint)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[10px] font-bold text-slate-400 hover:text-white hover:border-white/20 transition-all uppercase tracking-tight"
                  >
                    {hint}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center hover:bg-slate-200 transition-all disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6">
                <button
                  onClick={onConfirmBooking}
                  className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl text-sm hover:bg-indigo-500 transition-all uppercase tracking-tighter italic shadow-xl shadow-indigo-500/20"
                >
                  XÁC NHẬN ĐẶT TOUR NGAY
                </button>
                <p className="text-center text-[10px] text-slate-500 mt-3 font-semibold uppercase tracking-widest opacity-60">
                  Phản hồi được hỗ trợ bởi AI v3.0
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
