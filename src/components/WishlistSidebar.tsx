import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, ArrowRight, Trash2, Compass } from 'lucide-react';
import { Tour } from '../data/tours';
import { formatPrice } from '../lib/utils';

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedTours: Tour[];
  onRemove: (tourId: string) => void;
  onShowDetail: (tour: Tour) => void;
}

export default function WishlistSidebar({ isOpen, onClose, wishlistedTours, onRemove, onShowDetail }: WishlistSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[400] bg-black/80 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[401] w-full max-w-md h-full bg-[#0a0d14] border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">DANH SÁCH LƯU</h2>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                  {wishlistedTours.length} Chuyến đi được yêu thích
                </p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
              {wishlistedTours.length > 0 ? (
                wishlistedTours.map((tour) => (
                  <motion.div
                    key={tour.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-4 overflow-hidden hover:border-indigo-500/30 transition-all"
                  >
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-white/10">
                        <img 
                          src={tour.images[0]} 
                          alt={tour.name} 
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{tour.category}</div>
                          <h3 className="text-white font-bold text-sm leading-tight truncate">{tour.name}</h3>
                          <div className="text-emerald-400 font-black text-sm mt-1">{formatPrice(tour.price)}</div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => onShowDetail(tour)}
                            className="text-[10px] font-black text-white px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 hover:bg-white hover:text-black transition-all uppercase tracking-tighter"
                          >
                            Chi tiết
                          </button>
                          <button 
                             onClick={() => onRemove(tour.id)}
                            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-red-500/20 hover:text-red-500 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 pt-20">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                    <Heart className="w-8 h-8 text-white/10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white font-bold uppercase italic tracking-widest">Trống trải quá...</h3>
                    <p className="text-slate-500 text-xs leading-relaxed max-w-[200px]">
                      Hãy lưu lại những chuyến đi mà bạn cảm thấy ấn tượng nhất.
                    </p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="bg-indigo-600 text-white font-black px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
                  >
                    Bắt đầu khám phá
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {wishlistedTours.length > 0 && (
              <div className="p-8 border-t border-white/5 bg-[#0d1017]">
                <button className="w-full bg-white text-black font-black py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-200 transition-all uppercase tracking-tighter italic text-sm shadow-xl shadow-white/5">
                  LÊN KẾ HOẠCH NGAY
                  <Compass className="w-5 h-5 text-indigo-600" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
