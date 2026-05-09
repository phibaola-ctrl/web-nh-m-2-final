import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice, cn } from '../lib/utils';

interface BlindBagProps {
  onOpen: (basePrice: number) => void;
  isLoading: boolean;
}

const BAG_TYPES = [
  {
    id: 'mystery',
    name: 'Mystery',
    price: 5000000,
    emoji: '?',
    color: 'from-indigo-600 to-purple-800',
    glow: 'bg-indigo-500/20',
    border: 'border-indigo-400/30'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 12000000,
    emoji: '✨',
    color: 'from-purple-600 to-pink-800',
    glow: 'bg-purple-500/30',
    border: 'border-purple-400/50',
    isHot: true
  },
  {
    id: 'luxury',
    name: 'Luxury',
    price: 25000000,
    emoji: '💎',
    color: 'from-cyan-600 to-blue-800',
    glow: 'bg-cyan-500/20',
    border: 'border-cyan-400/30'
  }
];

export default function BlindBag({ onOpen, isLoading }: BlindBagProps) {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % BAG_TYPES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + BAG_TYPES.length) % BAG_TYPES.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className={cn(
          "w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-1000",
          BAG_TYPES[activeIndex].glow
        )} />
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-5xl h-[450px] flex items-center justify-center pointer-events-auto">
        {/* Navigation Buttons */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 z-50 pointer-events-none">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all pointer-events-auto backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all pointer-events-auto backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* The Cards */}
        <div className="relative flex items-center justify-center w-full h-full">
          {BAG_TYPES.map((bag, index) => {
            const isActive = index === activeIndex;
            const position = index - activeIndex;
            
            // Horizontal position logic
            let xPos = position * 300;
            if (position > 0) xPos = position * 280;
            if (position < 0) xPos = position * 280;

            return (
              <motion.div
                key={bag.id}
                initial={false}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 100) handlePrev();
                  else if (info.offset.x < -100) handleNext();
                }}
                animate={{
                  x: xPos,
                  scale: isActive ? 1.15 : 0.85,
                  z: isActive ? 0 : -100,
                  rotateY: position * -15,
                  opacity: Math.abs(position) > 1 ? 0 : 1 - (Math.abs(position) * 0.4),
                  filter: isActive ? 'blur(0px) brightness(1)' : 'blur(2px) brightness(0.5)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20
                }}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "absolute w-64 h-80 md:w-72 md:h-96 rounded-[2.5rem] cursor-pointer flex flex-col items-center justify-center p-8 transition-all duration-500 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] bg-gradient-to-br border-2 group",
                  bag.color,
                  isActive ? bag.border : "border-white/5"
                )}
              >
                {/* Spotlight Effect */}
                {isActive && (
                  <>
                    <motion.div
                      layoutId="spotlight-outer"
                      className="absolute -inset-16 rounded-[6rem] bg-white/[0.03] blur-[100px] pointer-events-none z-[-1]"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                    <motion.div 
                      layoutId="spotlight-ring"
                      className="absolute -inset-[3px] rounded-[2.7rem] border-2 border-white/20 blur-[2px] pointer-events-none"
                      animate={{ 
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.01, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="absolute inset-0 bg-white/5 rounded-[2.3rem] pointer-events-none" />
                  </>
                )}

                {bag.isHot && (
                  <div className="absolute -top-4 bg-white text-black text-[10px] font-black px-4 py-1 rounded-full shadow-xl shadow-white/20 uppercase tracking-tighter italic">
                    RECOMMENDED
                  </div>
                )}

                <motion.div 
                  animate={isActive && isLoading ? {
                    rotate: [0, -5, 5, -5, 5, 0],
                    scale: [1, 1.05, 1, 1.05, 1],
                  } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-7xl mb-8 filter drop-shadow-2xl"
                >
                  {bag.emoji}
                </motion.div>

                <div className="text-center space-y-2">
                  <h3 className="text-white font-black text-3xl tracking-tighter uppercase italic">{bag.name}</h3>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Open Blind Bag</p>
                </div>

                <div className="mt-8 px-6 py-2 bg-black/40 backdrop-blur-xl rounded-full text-sm font-black text-white ring-1 ring-white/10 shadow-inner">
                  {formatPrice(bag.price)}
                </div>

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-[2.3rem]" />
                
                {/* Tooltip */}
                {!isActive && (
                  <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/10 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-lg text-[9px] font-black text-white uppercase tracking-widest whitespace-nowrap pointer-events-none">
                    Click to select
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Action */}
      <div className="mt-12 flex flex-col items-center gap-6 relative z-[60]">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onOpen(BAG_TYPES[activeIndex].price)}
          disabled={isLoading}
          className="relative group overflow-hidden bg-white text-black font-black px-12 py-5 rounded-full text-lg shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
        >
          <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-3 italic tracking-tighter">
            {isLoading ? 'ĐANG KHAI THÁC...' : 'MỞ NGẪU NHIÊN'}
            <Sparkles className="w-5 h-5" />
          </span>
        </motion.button>
        
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
          Ăn Miếng Bánh Uống Miếng Nước Và Mỉm Cười Thật Tươi Để Cuộc Đời Lại Đẹp
        </p>
      </div>

      {/* Slider Indicators */}
      <div className="mt-10 flex gap-2">
        {BAG_TYPES.map((_, i) => (
          <div 
            key={i}
            className={cn(
              "h-1 transition-all duration-500 rounded-full",
              i === activeIndex ? "w-8 bg-indigo-500" : "w-2 bg-white/10"
            )}
          />
        ))}
      </div>
    </div>
  );
}

