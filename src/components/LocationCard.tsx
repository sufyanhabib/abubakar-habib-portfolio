import { motion, AnimatePresence } from "motion/react";
import { MapPin, Navigation, Globe, Radio, Compass, Zap, Info, ShieldCheck, LocateFixed } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Component to handle map centering and zooming
function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    if (map) {
      map.setView(center, zoom, { animate: true });
    }
  }, [center, zoom, map]);
  
  return null;
}

export function LocationCard() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationMethod, setLocationMethod] = useState<"gps" | "ip" | null>(null);
  const [mapZoom, setMapZoom] = useState(4);
  const [isMounted, setIsMounted] = useState(false);

  const BIHAR_COORDS: [number, number] = [25.0961, 85.3131];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGeolocation = () => {
    if (!("geolocation" in navigator)) {
      handleIpFallback();
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        const dist = calculateDistance(BIHAR_COORDS[0], BIHAR_COORDS[1], latitude, longitude);
        setDistance(dist);
        setLocationMethod("gps");
        setIsLocating(false);
        setMapZoom(3);
      },
      (error) => {
        console.error("Geolocation error:", error);
        handleIpFallback();
      },
      { timeout: 10000 }
    );
  };

  const handleIpFallback = async () => {
    setIsLocating(true);
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      if (data.latitude && data.longitude) {
        setUserLocation([data.latitude, data.longitude]);
        const dist = calculateDistance(BIHAR_COORDS[0], BIHAR_COORDS[1], data.latitude, data.longitude);
        setDistance(dist);
        setLocationMethod("ip");
        setMapZoom(3);
      }
    } catch (err) {
      console.error("IP fallback error:", err);
    } finally {
      setIsLocating(false);
    }
  };

  const mapCenter = useMemo(() => {
    if (userLocation) {
      return [
        (BIHAR_COORDS[0] + userLocation[0]) / 2,
        (BIHAR_COORDS[1] + userLocation[1]) / 2
      ] as [number, number];
    }
    return BIHAR_COORDS;
  }, [userLocation]);

  // Custom Marker Icon
  const customIcon = useMemo(() => L.divIcon({
    className: "custom-div-icon",
    html: `<div class="relative flex items-center justify-center">
            <div class="absolute inset-0 bg-primary/40 blur-md rounded-full animate-pulse"></div>
            <div class="relative h-4 w-4 bg-primary rounded-full border-2 border-background shadow-lg"></div>
          </div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  }), []);

  if (!isMounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] bg-secondary/5 border border-border/50 shadow-2xl group"
    >
      <div className="flex flex-col lg:flex-row h-full min-h-[700px] sm:min-h-[650px] lg:min-h-[550px]">
        {/* Left Panel: Identity & Info */}
        <div className="w-full lg:w-[45%] p-6 sm:p-8 lg:p-12 flex flex-col justify-between bg-background/40 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-white/5 relative z-20">
          <div className="space-y-8 sm:space-y-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Radio className="h-3 w-3 text-primary animate-pulse" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-primary font-bold">Identity Node</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-secondary/30 rounded-lg border border-white/5">
                  <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight leading-tight">
                From Bihar <br />
                <span className="text-muted-foreground">to the Browser</span>
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
                Engineering robust systems and refined interfaces, anchored in a foundation of network infrastructure and a trajectory into intelligent systems.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-secondary/10 border border-white/5 space-y-4 sm:space-y-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-2.5 bg-primary/10 rounded-lg sm:rounded-xl border border-primary/20">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-primary/60 mb-0.5 sm:mb-1">Origin Node</p>
                    <p className="text-sm sm:text-base font-bold tracking-tight">Bihar, India</p>
                  </div>
                </div>
                
                <div className="h-px bg-white/5 w-full" />

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-2.5 bg-secondary/20 rounded-lg sm:rounded-xl border border-white/5">
                    <Compass className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-0.5 sm:mb-1">Coordinates</p>
                    <p className="text-xs sm:text-sm font-mono text-foreground/80">25.0961° N, 85.3131° E</p>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {distance !== null ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/10 shadow-[0_0_30px_rgba(var(--primary),0.05)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-primary/60">Network Distance</p>
                        <p className="text-sm font-medium">
                          <span className="text-primary font-bold text-lg">{distance.toLocaleString()} km</span> from origin
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-muted-foreground/60">
                      <ShieldCheck className="h-3 w-3" />
                      <span>Verified via {locationMethod === "gps" ? "Satellite GPS" : "Network IP"}</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/5 border border-white/5">
                      <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Activate the live signal to visualize your position in my global network. We respect your privacy and only use this for distance calculation.
                      </p>
                    </div>
                    <button 
                      onClick={handleGeolocation}
                      disabled={isLocating}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-[0.2em] hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                      {isLocating ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                          <span>Pinging Network...</span>
                        </>
                      ) : (
                        <>
                          <LocateFixed className="h-4 w-4" />
                          <span>Activate Live Signal</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 flex items-center justify-between border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-muted-foreground">System Status: Operational</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-muted-foreground/30">
              <Radio className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <Navigation className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
          </div>
        </div>

        {/* Right Panel: Interactive Map */}
        <div className="w-full lg:w-[55%] relative min-h-[350px] sm:min-h-[400px] lg:min-h-full overflow-hidden z-10">
          <div className="absolute inset-0 bg-background/10 z-0 pointer-events-none" />
          
          <MapContainer 
            center={BIHAR_COORDS} 
            zoom={mapZoom} 
            scrollWheelZoom={false}
            className="h-full w-full grayscale-[0.8] invert-[0.9] hue-rotate-[180deg] brightness-[0.8] contrast-[1.2]"
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <Marker position={BIHAR_COORDS} icon={customIcon}>
              <Popup>
                <div className="p-2 font-display">
                  <p className="font-bold text-primary">Bihar, India</p>
                  <p className="text-[10px] text-muted-foreground">Origin Node</p>
                </div>
              </Popup>
            </Marker>

            {userLocation && (
              <Marker position={userLocation} icon={customIcon}>
                <Popup>
                  <div className="p-2 font-display">
                    <p className="font-bold">You</p>
                    <p className="text-[10px] text-muted-foreground">Current Node</p>
                  </div>
                </Popup>
              </Marker>
            )}

            <MapController center={mapCenter} zoom={mapZoom} />
          </MapContainer>

          {/* Map Overlay UI */}
          <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-[1000] flex flex-col gap-3">
            <div className="p-3 sm:p-4 bg-background/80 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl">
              <div className="flex flex-col gap-2 sm:gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest font-bold">Origin: Bihar</span>
                </div>
                {userLocation && (
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-muted-foreground" />
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest font-bold">Node: You</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 z-[1000]">
            <div className="px-4 sm:px-5 py-2 sm:py-2.5 bg-background/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl flex items-center gap-2 sm:gap-3 group/mesh">
              <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary group-hover:rotate-90 transition-transform duration-700" />
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] font-bold">Real-time Network Mesh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scanline Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent h-[200%] -translate-y-1/2 pointer-events-none animate-[scanline_10s_linear_infinite] z-30" />
    </motion.div>
  );
}
