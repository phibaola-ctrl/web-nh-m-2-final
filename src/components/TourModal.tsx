import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Clock, Star, CheckCircle2, ChevronRight, Play, Info, Heart, MessageSquare, Calendar } from 'lucide-react';
import { Tour } from '../data/tours';
import { cn, formatPrice } from '../lib/utils';

interface TourModalProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
  onBook?: (tour: Tour) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: () => void;
}

export default function TourModal({ tour, isOpen, onClose, onBook, isWishlisted, onToggleWishlist }: TourModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const itineraryRef = useRef<HTMLDivElement>(null);

  if (!tour) return null;

  const scrollToMore = () => {
    if (itineraryRef.current) {
      itineraryRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-[#0a0d14] border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] z-50 p-1 flex flex-col md:flex-row"
          >
            {/* Header Actions */}
            <div className="absolute top-6 right-6 z-10 flex gap-2">
              <button
                onClick={onToggleWishlist}
                className={cn(
                  "p-2 rounded-full border transition-all duration-300 backdrop-blur-md",
                  isWishlisted 
                    ? "bg-pink-600 border-pink-400 text-white shadow-lg shadow-pink-500/50" 
                    : "bg-black/50 border-white/10 text-white/70 hover:text-white"
                )}
              >
                <Heart className={cn("w-5 h-5", isWishlisted && "fill-white")} />
              </button>
              <button
                onClick={onClose}
                className="bg-black/50 hover:bg-zinc-800 text-white p-2 rounded-full border border-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left Side: Images & Visuals */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto relative bg-slate-800 overflow-hidden">
              <img
                src={tour.images[activeImage]}
                alt={tour.name}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Image Navigation */}
              <div className="absolute bottom-8 left-8 right-8 flex gap-3">
                {tour.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shadow-xl",
                      activeImage === idx ? "border-indigo-500 scale-110" : "border-white/10 opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} loading="lazy" className="w-full h-full object-cover" alt={`${tour.name} thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>

              {/* Status Badge */}
              <div className="absolute top-8 left-8">
                <div className="flex items-center gap-2 mb-2">
                   <span className="px-3 py-1 bg-indigo-600 text-[10px] font-black rounded-lg text-white uppercase tracking-widest shadow-lg shadow-indigo-950/50">
                     {tour.country}
                   </span>
                   <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{tour.location}</span>
                </div>
              </div>
            </div>

            {/* Right Side: Details */}
            <div className="flex-1 flex flex-col min-w-0">
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Thông Tin Tour</h4>
                    <h2 className="text-4xl font-black text-white tracking-tight uppercase leading-none">
                      {tour.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    <span className="text-white/90 text-xs font-bold ml-1">{tour.rating}</span>
                  </div>
                </div>

                <div className="space-y-10">
                  <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 border-indigo-500/30 pl-5 py-1">
                    "{tour.description}"
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-1">Thời gian hành trình</p>
                      <p className="text-lg font-black text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        {tour.duration}
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-1">Giá Tour Gốc</p>
                      <p className="text-xl font-black text-white">
                        {formatPrice(tour.price)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Đặc quyền chuyến đi</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {tour.features.map(f => (
                        <div key={f} className="flex items-center gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/[0.03]">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                          <span className="text-xs text-slate-400 font-medium">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div ref={itineraryRef} className="space-y-6 pt-10 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Lịch trình tham khảo</h3>
                    </div>
                    <div className="space-y-6">
                      {tour.itinerary.map((item, idx) => (
                        <div key={idx} className="relative pl-8 border-l border-white/10">
                          <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
                          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Ngày {item.day}</div>
                          <div className="text-sm font-bold text-white mb-1">{item.title}</div>
                          <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feedback */}
                  {tour.feedback && tour.feedback.length > 0 && (
                    <div className="space-y-8 pt-10 border-t border-white/5 pb-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-indigo-500" />
                          <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Đánh giá từ khách hàng</h3>
                        </div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          {tour.feedback.length} Đánh giá
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-6">
                        {tour.feedback.map((f, idx) => (
                          <div key={f.user + idx} className="group relative bg-white/[0.02] rounded-3xl p-6 border border-white/[0.05] hover:border-indigo-500/30 transition-all duration-500">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-indigo-500/20">
                                {f.user.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="flex-1 space-y-3">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-bold text-white uppercase tracking-tighter italic">{f.user}</h4>
                                  <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className={cn("w-3 h-3", i < f.rating ? "fill-yellow-400 text-yellow-400" : "fill-white/10 text-white/10")} />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-sm text-slate-400 italic leading-relaxed">
                                  "{f.comment}"
                                </p>
                              </div>
                            </div>
                            
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sticky Actions */}
              <div className="p-8 md:px-12 border-t border-white/5 flex gap-4 bg-[#0a0d14]/80 backdrop-blur-md">
                <button 
                  onClick={() => onBook?.(tour)}
                  className="flex-1 bg-white text-black font-black py-4 rounded-xl text-sm hover:bg-slate-200 transition-all uppercase tracking-tighter italic shadow-xl shadow-white/5"
                >
                  ĐẶT TOUR NGAY
                </button>
                <button 
                  onClick={scrollToMore}
                  className="px-8 bg-white/5 border border-white/10 text-white font-black py-4 rounded-xl text-sm hover:bg-white/10 transition-all uppercase tracking-tighter italic"
                >
                  CHI TIẾT
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
