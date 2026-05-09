import { motion, AnimatePresence } from 'motion/react';
import { Tour } from '../data/tours';
import { formatPrice } from '../lib/utils';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
import { Sparkles, Trophy, MapPin, ArrowRight } from 'lucide-react';

interface GachaRevealProps {
  tour: Tour | null;
  isOpen: boolean;
  onConfirm: () => void;
}

export default function GachaReveal({ tour, isOpen, onConfirm }: GachaRevealProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen && tour) {
      const timer = setTimeout(() => {
        setShowContent(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#ffffff', '#fbbf24']
        });
        
        // Play sound if needed
        // const audio = new Audio('/win.mp3');
        // audio.play().catch(e => console.log('Audio blocked'));
      }, 2000); // Wait for shake animation
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen, tour]);

  if (!tour) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Atmospheric Lights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-3xl overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
          </motion.div>

          <div className="relative">
            {/* Shake/Flash Layer */}
            {!showContent && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  rotate: [0, -10, 10, -10, 10, 0]
                }}
                className="flex flex-col items-center"
              >
                <div className="w-48 h-48 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-3xl flex items-center justify-center shadow-[0_0_100px_rgba(79,70,229,0.4)]">
                  <Sparkles className="w-24 h-24 text-white animate-spin" />
                </div>
                <h2 className="text-white font-black text-4xl mt-12 italic tracking-tighter uppercase animate-pulse">
                  ĐANG GIẢI MÃ...
                </h2>
              </motion.div>
            )}

            {/* Content Reveal */}
            {showContent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-lg bg-[#0a0d14] border border-white/20 rounded-[40px] overflow-hidden shadow-[0_0_150px_rgba(79,70,229,0.15)]"
              >
                <div className="relative h-64">
                  <img
                    src={tour.images[0]}
                    alt={tour.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] to-transparent" />
                  
                  <div className="absolute top-6 left-6 bg-indigo-600/80 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-300" />
                    <span className="text-white font-black text-xs uppercase italic tracking-widest">Tuyệt vời!</span>
                  </div>
                </div>

                <div className="p-8 text-center space-y-6">
                  <div>
                    <div className="flex items-center justify-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-[10px] mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {tour.location}, {tour.country}
                    </div>
                    <h3 className="text-white text-3xl font-black leading-tight uppercase tracking-tight">
                      {tour.name}
                    </h3>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto italic opacity-80">
                    "{tour.description}"
                  </p>

                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5">
                    <div className="text-center">
                      <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1 opacity-60">Giá trị hời</div>
                      <div className="text-white font-black text-xl">
                        {formatPrice(tour.price)}
                      </div>
                    </div>
                    <div className="text-center border-l border-white/5">
                      <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1 opacity-60">Hành trình</div>
                      <div className="text-white font-black text-xl">{tour.duration}</div>
                    </div>
                  </div>

                  <button
                    onClick={onConfirm}
                    className="w-full bg-white hover:bg-slate-100 text-black font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 text-lg uppercase tracking-tighter italic shadow-xl shadow-white/5"
                  >
                    KHÁM PHÁ CHI TIẾT
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
