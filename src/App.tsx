import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, Flame, TrendingUp, Tag, History, ShoppingBag, Heart, Star, CheckCircle2, AlertTriangle, MessageCircle } from 'lucide-react';
import { TOURS, Tour } from './data/tours';
import FilterBar from './components/FilterBar';
import TourCard from './components/TourCard';
import TourModal from './components/TourModal';
import BlindBag from './components/BlindBag';
import GachaReveal from './components/GachaReveal';
import TourMap from './components/TourMap';
import Footer from './components/Footer';
import SupportModal from './components/SupportModal';
import WishlistSidebar from './components/WishlistSidebar';
import SafeImage from './components/SafeImage';
import NotificationToast, { ToastType } from './components/NotificationToast';
import { formatPrice } from './lib/utils';

export default function App() {
  // UI State
  const [search, setSearch] = useState(() => localStorage.getItem('tour_search') || '');
  const [category, setCategory] = useState(() => localStorage.getItem('tour_category') || 'All');
  const [priceRange, setPriceRange] = useState(() => localStorage.getItem('tour_priceRange') || 'All');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmBookingOpen, setIsConfirmBookingOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [pendingTour, setPendingTour] = useState<Tour | null>(null);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [bookedTour, setBookedTour] = useState<Tour | null>(null);
  
  // Notification State
  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: '',
    type: 'info',
    isVisible: false
  });
  
  // Pagination State
  const ITEMS_PER_PAGE = 8;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  
  // Gacha State
  const [revealedTour, setRevealedTour] = useState<Tour | null>(null);
  const [isGachaOpen, setIsGachaOpen] = useState(false);
  const [isOpeningBag, setIsOpeningBag] = useState(false);
  const [openedHistory, setOpenedHistory] = useState<string[]>([]);
  
  // Refs for scrolling
  const tourRefs = useMemo(() => new Map<string, HTMLDivElement | null>(), []);

  // Filtering Logic
  const filteredTours = useMemo(() => {
    return TOURS.filter(tour => {
      const matchSearch = tour.name.toLowerCase().includes(search.toLowerCase()) || 
                          tour.location.toLowerCase().includes(search.toLowerCase()) ||
                          tour.country.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'All' || tour.category === category;
      const matchPrice = priceRange === 'All' || (
        priceRange === 'Low' ? tour.price < 10000000 :
        priceRange === 'Mid' ? tour.price >= 10000000 && tour.price <= 30000000 :
        tour.price > 30000000
      );
      return matchSearch && matchCategory && matchPrice;
    });
  }, [search, category, priceRange]);

  const scrollToTour = useCallback((tourId: string) => {
    // 1. Check if it's in filtered results but not visible
    const tourIndex = filteredTours.findIndex(t => t.id === tourId);
    if (tourIndex !== -1 && tourIndex >= visibleCount) {
      // Expand visible count to include this tour
      setVisibleCount(tourIndex + 1);
    }

    // 2. Wait for DOM update and scroll
    setTimeout(() => {
      const element = tourRefs.get(tourId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-4', 'ring-indigo-500/50', 'ring-offset-4', 'ring-offset-[#05070a]', 'transition-all', 'duration-500');
        setTimeout(() => {
          element.classList.remove('ring-4', 'ring-indigo-500/50', 'ring-offset-4', 'ring-offset-[#05070a]');
        }, 3000);
      }
    }, 300);
  }, [tourRefs, filteredTours, visibleCount]);

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tour_wishlist');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      // Ensure we only have valid, non-empty string IDs
      return Array.isArray(parsed) 
        ? parsed.filter(id => typeof id === 'string' && id.trim() !== '') 
        : [];
    } catch (e) {
      console.error('Error parsing wishlist:', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('tour_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('tour_search', search);
    localStorage.setItem('tour_category', category);
    localStorage.setItem('tour_priceRange', priceRange);
    setVisibleCount(ITEMS_PER_PAGE); // Reset pagination on filter change
  }, [search, category, priceRange]);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type, isVisible: true });
  };

  const toggleWishlist = useCallback((tourId: string) => {
    const tour = TOURS.find(t => t.id === tourId);
    setWishlist(prev => {
      const isCurrentlyWishlisted = prev.includes(tourId);
      if (isCurrentlyWishlisted) {
        showToast(`Đã xóa ${tour?.name} khỏi danh sách lưu`, 'wishlist-remove');
        return prev.filter(id => id !== tourId);
      } else {
        showToast(`Đã lưu ${tour?.name} vào danh sách`, 'wishlist-add');
        return [...prev, tourId];
      }
    });
  }, []);

  const wishlistedTours = useMemo(() => {
    return TOURS.filter(t => wishlist.includes(t.id));
  }, [wishlist]);

  const displayedTours = useMemo(() => {
    return filteredTours.slice(0, visibleCount);
  }, [filteredTours, visibleCount]);

  // Sections
  const hotTours = useMemo(() => TOURS.slice(0, 3), []);
  const trendingTours = useMemo(() => TOURS.slice(3, 7), []);

  // Gacha Logic
  const openBlindBag = useCallback((basePrice: number) => {
    if (isOpeningBag) return;
    
    setIsOpeningBag(true);
    
    // Simulate server delay/loading (2s for animation sync)
    setTimeout(() => {
      // 1. Avoid repeats: filter out recently opened tours (last 3)
      const recentIds = openedHistory.slice(-3);
      const availableTours = TOURS.filter(t => !recentIds.includes(t.id));
      
      // 2. Strict price range: basePrice + 1,000,000 to basePrice + 2,000,000 VNĐ
      const minPrice = basePrice + 1000000;
      const maxPrice = basePrice + 2000000;
      
      let pool = availableTours.filter(t => t.price >= minPrice && t.price <= maxPrice);
      
      // 3. Fallback: If no tour in range, pick the 3 absolute closest matches
      if (pool.length === 0) {
        const targetPrice = basePrice + 1500000;
        pool = [...availableTours]
          .sort((a, b) => Math.abs(a.price - targetPrice) - Math.abs(b.price - targetPrice))
          .slice(0, 3); 
      }
      
      // 4. Final selection
      const result = pool[Math.floor(Math.random() * pool.length)];
      
      setRevealedTour(result);
      setIsOpeningBag(false);
      setIsGachaOpen(true);
      setOpenedHistory(prev => [...prev, result.id]);
    }, 2000);
  }, [isOpeningBag, openedHistory]);

  const handleRevealConfirm = () => {
    setIsGachaOpen(false);
    setSelectedTour(revealedTour);
    setIsModalOpen(true);
    if (revealedTour) {
      scrollToTour(revealedTour.id);
    }
  };

  const handleShowDetail = (tour: Tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const handleBooking = (tour: Tour) => {
    setPendingTour(tour);
    setIsModalOpen(false);
    setIsConfirmBookingOpen(true);
  };

  const handleConfirmBooking = () => {
    if (pendingTour) {
      setBookedTour(pendingTour);
      setIsConfirmBookingOpen(false);
      setIsBookingSuccess(true);
      scrollToTour(pendingTour.id);
      setPendingTour(null);
    }
  };

  const handleCancelBooking = () => {
    setIsConfirmBookingOpen(false);
    setPendingTour(null);
    setIsModalOpen(true); // Re-open modal if cancelled
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 selection:bg-indigo-500 selection:text-white">
      {/* Header / Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0d14]/80 backdrop-blur-md border-b border-white/10 h-16 px-8 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform">
            <span className="text-white font-bold">2</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase">
            NHÓM <span className="text-indigo-400">2</span>
          </span>
        </div>
        
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
            >
              <Heart className={`w-4 h-4 ${wishlistedTours.length > 0 ? 'text-pink-500 fill-pink-500' : 'text-slate-400'} group-hover:scale-110 transition-transform`} />
              {wishlistedTours.length > 0 && (
                <span className="text-[10px] font-black text-white">{wishlistedTours.length}</span>
              )}
            </button>
            {['Hot Tours', 'Cộng Đồng', 'Hỗ Trợ'].map(item => (
            <button 
              key={item} 
              onClick={() => item === 'Hỗ Trợ' ? setIsSupportOpen(true) : null}
              className="text-xs uppercase font-semibold tracking-widest text-slate-400 hover:text-indigo-400 transition-colors"
            >
              {item}
            </button>
          ))}
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-500 border border-white/20"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 relative overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#05070a] to-[#05070a]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-7xl mx-auto px-8 text-center space-y-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              VẬN MAY CỦA BẠN LÀ GÌ?
            </h2>
            <p className="max-w-xl mx-auto text-slate-400 text-sm font-medium">
              Chọn một hộp quà bí ẩn từ Nhóm 2 để bắt đầu chuyến phiêu lưu không giới hạn. Mỗi lựa chọn chứa đựng một điểm đến tuyệt vời đang chờ bạn khám phá.
            </p>
          </motion.div>

          <BlindBag onOpen={openBlindBag} isLoading={isOpeningBag} />
        </div>
      </header>

      {/* Main Listing Section */}
      <section className="py-20 bg-[#070a0f] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-12">
            <div className="space-y-1 text-left">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Khám phá kho tour</h3>
              <div className="flex items-center gap-6">
                <h2 className="text-3xl font-black text-white tracking-tight uppercase">Danh sách địa điểm</h2>
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      viewMode === 'list' 
                      ? 'bg-white text-black shadow-lg shadow-white/10' 
                      : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    DANH SÁCH
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      viewMode === 'map' 
                      ? 'bg-white text-black shadow-lg shadow-white/10' 
                      : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    BẢN ĐỒ
                  </button>
                </div>
              </div>
            </div>
          </div>

          <FilterBar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

          <div className="mt-12">
            <AnimatePresence mode="wait">
              {viewMode === 'list' ? (
                <motion.div
                  key="list-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {displayedTours.map((tour) => (
                    <motion.div
                      key={tour.id}
                      ref={(el) => tourRefs.set(tour.id, el as HTMLDivElement)}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TourCard 
                        tour={tour} 
                        onClick={handleShowDetail} 
                        isWishlisted={wishlist.includes(tour.id)}
                        onToggleWishlist={() => toggleWishlist(tour.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="map-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <TourMap tours={filteredTours} onTourClick={handleShowDetail} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {viewMode === 'list' && visibleCount < filteredTours.length && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 flex justify-center"
            >
              <button 
                onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                className="group relative bg-[#0a0d14] border border-white/10 px-10 py-4 rounded-2xl flex items-center gap-3 hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-tighter text-sm font-black italic shadow-xl shadow-white/5"
              >
                <span>TẢI THÊM TOUR</span>
                <TrendingUp className="w-5 h-5 group-hover:translate-y-[-2px] group-hover:translate-x-[2px] transition-transform duration-300" />
                <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </motion.div>
          )}

          {filteredTours.length === 0 && (
            <div className="py-32 text-center flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                <Compass className="w-10 h-10 text-white/20" />
              </div>
              <h3 className="text-xl font-bold text-white/40 uppercase tracking-widest italic">
                Không tìm thấy kết quả phù hợp
              </h3>
            </div>
          )}
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-32 space-y-32 overflow-hidden">
        {/* Hot Tours */}
        <div className="max-w-7xl mx-auto px-8 relative">
          <div className="flex items-center gap-4 mb-12">
             <div className="h-px flex-1 bg-white/10" />
             <div className="flex items-center gap-3">
               <Flame className="w-6 h-6 text-orange-500" />
               <h2 className="text-3xl font-black text-white tracking-tight uppercase">Tour Hot</h2>
             </div>
             <div className="h-px flex-1 bg-white/10" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hotTours.map(tour => (
              <TourCard 
                key={tour.id} 
                tour={tour} 
                onClick={handleShowDetail} 
                isWishlisted={wishlist.includes(tour.id)}
                onToggleWishlist={() => toggleWishlist(tour.id)}
              />
            ))}
          </div>
        </div>

        {/* Trending */}
        <div className="bg-[#0a0d14] py-32 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6 text-left">
              <h3 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Xu hướng 2024</h3>
              <h2 className="text-5xl font-black text-white tracking-tight uppercase leading-tight">
                ĐIỂM ĐẾN <br/> ĐANG ĐƯỢC <span className="text-indigo-500">SĂN ĐÓN</span>
              </h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-lg">
                Khám phá những vùng đất đang làm mưa làm gió trong cộng đồng những người đam mê xê dịch. Những lựa chọn hàng đầu được yêu thích nhất.
              </p>
              <button className="bg-white text-black font-black px-10 py-4 rounded-xl flex items-center gap-3 hover:bg-slate-200 transition-all uppercase tracking-tighter text-sm shadow-xl shadow-white/5">
                XEM TẤT CẢ
                <Compass className="w-5 h-5 text-indigo-600" />
              </button>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4">
              {trendingTours.slice(0, 4).map((tour, idx) => (
                <motion.div
                  key={tour.id}
                  whileHover={{ scale: 1.05 }}
                  className={idx % 2 === 1 ? 'mt-8' : ''}
                >
                  <div 
                    onClick={() => handleShowDetail(tour)}
                    className="aspect-[3/4] rounded-2xl bg-white/5 p-1 border border-white/10 cursor-pointer overflow-hidden shadow-2xl group"
                  >
                    <SafeImage 
                      src={tour.images[0]} 
                      className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700" 
                      alt={tour.name}
                      fallbackText={tour.name}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Budget Section */}
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter flex items-center gap-3 mr-auto">
              <Tag className="w-8 h-8 text-emerald-500" />
              Tour Giá Rẻ
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {TOURS.filter(t => t.price < 15000000).slice(0, 4).map(tour => (
              <TourCard 
                key={tour.id} 
                tour={tour} 
                onClick={handleShowDetail} 
                isWishlisted={wishlist.includes(tour.id)}
                onToggleWishlist={() => toggleWishlist(tour.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onOpenSupport={() => setIsSupportOpen(true)} />

      {/* Floating Support Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsSupportOpen(true)}
        className="fixed bottom-8 left-8 z-[150] w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.4)] md:w-16 md:h-16 group transition-all hover:bg-indigo-500"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 group-hover:rotate-12 transition-transform" />
        <div className="absolute left-full ml-4 px-4 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none md:block hidden">
          Hỗ trợ trực tuyến 24/7
        </div>
      </motion.button>

      {/* Modals & Overlays */}
      <TourModal
        tour={selectedTour}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBook={handleBooking}
        isWishlisted={selectedTour ? wishlist.includes(selectedTour.id) : false}
        onToggleWishlist={() => selectedTour && toggleWishlist(selectedTour.id)}
      />

      <GachaReveal
        tour={revealedTour}
        isOpen={isGachaOpen}
        onConfirm={handleRevealConfirm}
      />

      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      <WishlistSidebar
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedTours={wishlistedTours}
        onRemove={toggleWishlist}
        onShowDetail={(tour) => {
          setSelectedTour(tour);
          setIsModalOpen(true);
          setIsWishlistOpen(false);
        }}
      />

      <NotificationToast
        {...toast}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />

      {/* Booking Confirmation Modal */}
      <AnimatePresence>
        {isConfirmBookingOpen && pendingTour && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancelBooking}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0d14] border border-white/20 rounded-3xl p-8 text-center space-y-6 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto border border-indigo-500/30">
                <AlertTriangle className="w-8 h-8 text-indigo-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white uppercase italic">XÁC NHẬN ĐẶT TOUR</h3>
                <p className="text-slate-400 text-sm">
                  Bạn có chắc chắn muốn đặt tour <span className="text-white font-bold">{pendingTour.name}</span> này không?
                </p>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleCancelBooking}
                  className="flex-1 bg-white/5 border border-white/10 text-white font-black py-4 rounded-xl text-sm hover:bg-white/10 transition-all uppercase tracking-tighter italic"
                >
                  HỦY BỎ
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-white text-black font-black py-4 rounded-xl text-sm hover:bg-slate-200 transition-all uppercase tracking-tighter italic shadow-xl shadow-white/5"
                >
                  XÁC NHẬN
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Success Modal */}
      <AnimatePresence>
        {isBookingSuccess && bookedTour && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingSuccess(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0d14] border border-white/20 rounded-3xl p-10 text-center space-y-6 shadow-[0_0_50px_rgba(79,70,229,0.3)]"
            >
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white uppercase italic">ĐẶT TOUR THÀNH CÔNG!</h3>
                <p className="text-slate-400 text-sm">
                  Cảm ơn bạn đã tin tưởng dịch vụ Nhóm 2. <br/>
                  Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-left">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Mã đơn hàng: #BK{Math.floor(Math.random() * 1000000)}</div>
                <div className="text-white font-bold text-lg leading-tight mb-2">{bookedTour.name}</div>
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <Star className="w-4 h-4 fill-indigo-400" />
                  {formatPrice(bookedTour.price)}
                </div>
              </div>

              <button
                onClick={() => setIsBookingSuccess(false)}
                className="w-full bg-white text-black font-black py-4 rounded-xl text-sm hover:bg-slate-200 transition-all uppercase tracking-tighter italic"
              >
                TUYỆT VỜI
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Global Toast Placeholder (if needed) */}
      <div className="fixed bottom-8 right-8 z-[200]">
        <AnimatePresence>
          {openedHistory.length > 0 && !isGachaOpen && !isModalOpen && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="bg-[#0a0d14]/80 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/5">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Vừa mở</div>
                <div className="text-white font-bold text-xs tracking-tight truncate max-w-[150px]">
                  {TOURS.find(t => t.id === openedHistory[openedHistory.length - 1])?.name}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
