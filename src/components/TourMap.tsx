import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { Tour } from '../data/tours';
import { Star, MapPin, X } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import SafeImage from './SafeImage';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

interface TourMapProps {
  tours: Tour[];
  onTourClick: (tour: Tour) => void;
}

interface MarkerWithInfoWindowProps {
  tour: Tour;
  onClick: (tour: Tour) => void;
  key?: string | number;
}

function MarkerWithInfoWindow({ tour, onClick }: MarkerWithInfoWindowProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={tour.coordinates}
        onClick={() => setInfoWindowShown(true)}
        title={tour.name}
      >
        <Pin background={'#4f46e5'} borderColor={'#fff'} glyphColor={'#fff'} />
      </AdvancedMarker>

      {infoWindowShown && (
        <InfoWindow
          anchor={marker}
          onCloseClick={() => setInfoWindowShown(false)}
        >
          <div className="p-2 max-w-[200px] bg-[#0a0d14] text-white rounded-lg overflow-hidden border border-white/10">
            <SafeImage src={tour.images[0]} alt={tour.name} className="w-full h-24 object-cover rounded-md mb-2" fallbackText={tour.name} />
            <div className="space-y-1">
              <h4 className="font-bold text-xs truncate uppercase tracking-tighter italic">{tour.name}</h4>
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <MapPin className="w-3 h-3" />
                {tour.location}, {tour.country}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-indigo-400 font-bold text-[10px]">{formatPrice(tour.price)}</span>
                <div className="flex items-center gap-0.5 text-[10px] text-yellow-500 font-black">
                  <Star className="w-2.5 h-2.5 fill-yellow-500" />
                  {tour.rating}
                </div>
              </div>
              <button 
                onClick={() => onClick(tour)}
                className="w-full mt-2 bg-indigo-600 text-white text-[9px] font-black py-1.5 rounded-md hover:bg-indigo-500 transition-colors uppercase tracking-widest"
              >
                CHI TIẾT
              </button>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default function TourMap({ tours, onTourClick }: TourMapProps) {
  if (!hasValidKey) {
    return (
      <div className="w-full h-[600px] rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-8 overflow-hidden relative">
        <div className="max-w-md text-center space-y-6 z-10">
          <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto border border-indigo-500/30">
            <MapPin className="w-8 h-8 text-indigo-500" />
          </div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">Yêu cầu Google Maps API Key</h2>
          <div className="space-y-4 text-sm text-slate-400 text-left bg-black/40 p-6 rounded-2xl border border-white/5">
            <p className="font-medium text-white flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              Để xem bản đồ, vui lòng thực hiện:
            </p>
            <ol className="list-decimal list-inside space-y-3 leading-relaxed">
              <li>Lấy API Key tại <a href="https://console.cloud.google.com/google/maps-apis/start" target="_blank" rel="noopener" className="text-indigo-400 underline decoration-indigo-400/30 hover:decoration-indigo-400">Google Cloud Console</a></li>
              <li>Mở <strong>Settings</strong> (biểu tượng bánh răng)</li>
              <li>Chọn <strong>Secrets</strong></li>
              <li>Thêm <code>GOOGLE_MAPS_PLATFORM_KEY</code> và dán key của bạn</li>
            </ol>
            <p className="text-[11px] italic opacity-60">Ứng dụng sẽ tự động tải lại sau khi bạn thêm secret.</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 to-transparent blur-3xl" />
      </div>
    );
  }

  // Calculate center of all markers
  const center = tours.length > 0 
    ? tours.reduce(
        (acc, t) => ({ lat: acc.lat + t.coordinates.lat / tours.length, lng: acc.lng + t.coordinates.lng / tours.length }),
        { lat: 0, lng: 0 }
      )
    : { lat: 20.95, lng: 107.08 }; // Default to Halong Bay

  return (
    <div className="w-full h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={center}
          defaultZoom={4}
          mapId="TOUR_MAP_VIEW"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          className="w-full h-full"
          colorScheme="DARK"
          disableDefaultUI={false}
          gestureHandling="greedy"
        >
          {tours.map(tour => (
            <MarkerWithInfoWindow key={tour.id} tour={tour} onClick={onTourClick} />
          ))}
        </Map>
      </APIProvider>
      
      {/* Attribution overlay / branding element */}
      <div className="absolute bottom-4 left-4 bg-[#0a0d14]/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2 pointer-events-none">
        <div className="w-4 h-4 bg-indigo-500 rounded flex items-center justify-center text-[10px] font-black text-white">B</div>
        <span className="text-[9px] font-black text-white uppercase tracking-widest">BLINDTRIP TRAVEL MAP</span>
      </div>
    </div>
  );
}
