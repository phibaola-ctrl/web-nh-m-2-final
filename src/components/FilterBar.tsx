import { Search, MapPin, DollarSign, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

interface FilterBarProps {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  priceRange: string;
  setPriceRange: (v: string) => void;
}

export default function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  priceRange,
  setPriceRange
}: FilterBarProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm địa điểm, giá tour..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-slate-300 focus:outline-none hover:bg-white/[0.08] transition-all cursor-pointer min-w-[160px]"
          >
            <option value="All" className="bg-[#0a0d14]">Loại hình: Tất cả</option>
            <option value="Nature" className="bg-[#0a0d14]">Thiên nhiên</option>
            <option value="City" className="bg-[#0a0d14]">Thành phố</option>
            <option value="Beach" className="bg-[#0a0d14]">Biển đảo</option>
            <option value="Adventure" className="bg-[#0a0d14]">Mạo hiểm</option>
            <option value="Cultural" className="bg-[#0a0d14]">Văn hóa</option>
          </select>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-slate-300 focus:outline-none hover:bg-white/[0.08] transition-all cursor-pointer min-w-[160px]"
          >
            <option value="All" className="bg-[#0a0d14]">Giá: Mọi mức giá</option>
            <option value="Low" className="bg-[#0a0d14]">Dưới 10 triệu</option>
            <option value="Mid" className="bg-[#0a0d14]">10tr - 30 triệu</option>
            <option value="High" className="bg-[#0a0d14]">Trên 30 triệu</option>
          </select>

          <button className="flex items-center gap-2 bg-indigo-600 text-white font-black px-8 py-3.5 rounded-xl hover:bg-indigo-500 transition-all whitespace-nowrap text-xs uppercase tracking-widest shadow-lg shadow-indigo-900/40">
            <Filter className="w-4 h-4" />
            Lọc nâng cao
          </button>
        </div>
      </div>
      
      {/* Popular Tags */}
      <div className="flex flex-wrap gap-2 pt-2">
        <span className="text-slate-600 text-[10px] uppercase tracking-[0.2em] font-black mr-2 self-center">Trending:</span>
        {['Nhật Bản', 'Bản sắc Việt', 'Châu Âu', 'Nghỉ dưỡng Bali'].map((tag) => (
          <button
            key={tag}
            onClick={() => setSearch(tag)}
            className="text-[10px] font-bold text-slate-400 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full hover:bg-indigo-500/20 hover:text-indigo-300 transition-all uppercase tracking-widest"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
