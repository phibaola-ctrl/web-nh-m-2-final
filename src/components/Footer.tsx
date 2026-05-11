import { motion } from 'motion/react';
import { Compass, Instagram, Twitter, Facebook, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenSupport?: () => void;
}

export default function Footer({ onOpenSupport }: FooterProps) {
  return (
    <footer className="w-full bg-[#05070a] border-t border-white/5 pt-20 pb-10 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-6 max-w-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white uppercase">
              BLIND<span className="text-indigo-400">TRIP</span>
            </span>
          </div>
          <p className="text-slate-500 text-xs font-medium leading-relaxed uppercase tracking-widest opacity-80">
            Cách mạng hóa cách bạn khám phá thế giới với trải nghiệm du lịch bí ẩn và đầy bất ngờ.
          </p>
        </div>

        <div className="flex gap-12 md:gap-24">
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Dịch vụ</h4>
            <ul className="space-y-4 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
              {['Mystery Tours', 'Luxury Packs', 'Gacha Deals'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Liên kết</h4>
            <ul className="space-y-4 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
              {['Điều khoản', 'Bảo mật', 'Liên hệ'].map(item => (
                <li key={item}>
                  <button 
                    onClick={item === 'Liên hệ' ? onOpenSupport : undefined}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Chúng tôi đang trực tuyến</span>
            <div className="flex items-center gap-2 justify-end text-xs font-black text-white uppercase tracking-tight">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              1,245 Active Users
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/[0.03] mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
          © 2026 BLINDTRIP. MODERN TRAVEL GACHA.
        </p>
        <div className="flex items-center gap-1 text-slate-700 text-[10px] font-black uppercase tracking-widest">
          SYSTEM STATUS: <span className="text-indigo-400/50 italic font-medium">STABLE v2.4.0</span>
          <Sparkles className="w-3 h-3 text-indigo-500/20 ml-2" />
        </div>
      </div>
    </footer>
  );
}
