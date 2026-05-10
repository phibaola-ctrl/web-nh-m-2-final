import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageOff, Tent } from 'lucide-react';

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  priority?: boolean;
}

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200',
];

export default function SafeImage({ src, alt, className = '', fallbackText, priority = false }: SafeImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(src ? 'loading' : 'error');
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (src) {
      setStatus('loading');
      setCurrentSrc(src);
    } else {
      setStatus('error');
    }
  }, [src]);

  const handleError = () => {
    if (retryCount < FALLBACK_IMAGES.length) {
      setCurrentSrc(FALLBACK_IMAGES[retryCount]);
      setRetryCount(prev => prev + 1);
    } else {
      setStatus('error');
    }
  };

  const handleLoad = () => {
    setStatus('loaded');
  };

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      <AnimatePresence mode="wait">
        {status === 'loading' && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <div className="w-full h-full bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-shimmer bg-[length:200%_100%]" />
          </motion.div>
        )}

        {status === 'error' ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900/40 to-slate-950 p-4 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
              <Tent className="w-6 h-6 text-indigo-400 opacity-50" />
            </div>
            {fallbackText && (
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] leading-tight max-w-[80%] italic">
                {fallbackText}
              </span>
            )}
          </motion.div>
        ) : (
          <motion.img
            key={currentSrc}
            src={currentSrc}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={handleLoad}
            onError={handleError}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ 
              opacity: status === 'loaded' ? 1 : 0,
              scale: status === 'loaded' ? 1 : 1.05
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`w-full h-full object-cover transition-transform duration-700 ${status === 'loaded' ? 'scale-100' : 'scale-105'}`}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
