import { motion, AnimatePresence } from 'motion/react';
import { Heart, Info, CheckCircle2, XCircle, X } from 'lucide-react';
import { useEffect } from 'react';

export type ToastType = 'success' | 'info' | 'wishlist-add' | 'wishlist-remove' | 'error';

interface NotificationToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export default function NotificationToast({ message, type, isVisible, onClose }: NotificationToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const getStyles = () => {
    switch (type) {
      case 'wishlist-add':
        return {
          icon: <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />,
          bgColor: 'bg-pink-500/10',
          borderColor: 'border-pink-500/20',
          textColor: 'text-pink-500'
        };
      case 'wishlist-remove':
        return {
          icon: <Heart className="w-5 h-5 text-slate-400" />,
          bgColor: 'bg-slate-500/10',
          borderColor: 'border-slate-500/20',
          textColor: 'text-slate-500'
        };
      case 'success':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
          bgColor: 'bg-emerald-500/10',
          borderColor: 'border-emerald-500/20',
          textColor: 'text-emerald-500'
        };
      case 'error':
        return {
          icon: <XCircle className="w-5 h-5 text-red-500" />,
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/20',
          textColor: 'text-red-500'
        };
      default:
        return {
          icon: <Info className="w-5 h-5 text-indigo-500" />,
          bgColor: 'bg-indigo-500/10',
          borderColor: 'border-indigo-500/20',
          textColor: 'text-indigo-400'
        };
    }
  };

  const styles = getStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, x: 50, scale: 0.9 }}
          className={`fixed bottom-8 right-8 z-[500] ${styles.bgColor} ${styles.borderColor} border backdrop-blur-md rounded-2xl p-4 shadow-2xl flex items-center gap-4 min-w-[280px]`}
        >
          <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center border border-white/5">
            {styles.icon}
          </div>
          <div className="flex-1">
            <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${styles.textColor} mb-0.5`}>
              Thông báo
            </div>
            <div className="text-white font-bold text-xs tracking-tight">
              {message}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-500 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
