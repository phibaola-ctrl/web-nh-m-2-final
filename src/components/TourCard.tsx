import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, ArrowRight, Star, Heart } from 'lucide-react';
import { Tour } from '../data/tours';
import { formatPrice, cn } from '../lib/utils';
import SafeImage from './SafeImage';

interface TourCardProps {
  key?: string;
  tour: Tour;
  onClick: (tour: Tour) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (e: React.MouseEvent) => void;
}

export default function TourCard({ tour, onClick, isWishlisted, onToggleWishlist }: TourCardProps) {
  // Optimize Unsplash image for card size (width=600 for card)
  const optimizedImage = tour.images[0]?.includes('unsplash.com') 
    ? `${tour.images[0].split('?')[0]}?auto=format&fit=crop&q=80&w=600`
    : tour.images[0];

  return (
    <motion.div
      whileHover={{ 
        y: -12,
        scale: 1.02,
        boxShadow: "0 20px 40px -15px rgba(79, 70, 229, 0.2)"
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-[#0a0d14] border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
      onClick={() => onClick(tour)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-white/5">
        <SafeImage
          src={optimizedImage}
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          fallbackText={tour.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/20 to-transparent transition-all duration-500" />
        
        {/* Category Tag */}
        <div className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest shadow-lg">
          {tour.category}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white border border-white/10 px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-bold">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          {tour.rating}
        </div>
      </div>

      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors duration-500 pointer-events-none" />
      
      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <div className="flex items-center gap-1 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-1.5 opacity-80">
            <MapPin className="w-3 h-3" />
            {tour.location}
          </div>
          <h3 className="text-white font-bold text-lg leading-tight group-hover:text-white transition-colors uppercase tracking-tight group-hover:translate-x-1 duration-500">
            {tour.name}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium uppercase tracking-tight group-hover:text-slate-300 transition-colors">
            <Clock className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
            {tour.duration}
          </div>
          <div className="text-right">
            <span className="text-slate-500 text-[9px] block uppercase font-bold tracking-widest opacity-60">Từ</span>
            <span className="text-white font-black text-lg group-hover:text-indigo-400 transition-colors duration-500">
              {formatPrice(tour.price)}
            </span>
          </div>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClick(tour);
          }}
          className="w-full flex items-center justify-center gap-2 py-3.5 mt-1 bg-white/5 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white border border-white/10 group-hover:border-indigo-500 rounded-xl text-xs font-black uppercase tracking-tighter transition-all duration-500 shadow-sm"
        >
          Xem chi tiết
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-500" />
        </button>
      </div>
    </motion.div>
  );
}
