import { useEffect, useRef, useState, useMemo } from "react";
import Globe from "react-globe.gl";
import { useReducedMotion } from "motion/react";

export function HeroGlobe() {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
  const shouldReduceMotion = useReducedMotion();

  // Handle resizing to keep the globe perfectly centered and sized
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const size = Math.min(width, height);
        setDimensions({ width: size, height: size });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Sample data for a "Networked World" feel
  const arcsData = useMemo(() => [...Array(12).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: ['#FF9933', '#FFFFFF', '#138808'][Math.floor(Math.random() * 3)],
    dashLength: Math.random() * 0.4 + 0.1,
    dashGap: Math.random() * 0.2 + 0.1,
    dashAnimateTime: Math.random() * 2000 + 3000
  })), []);

  const pointsData = useMemo(() => [...Array(30).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: Math.random() * 0.5 + 0.2,
    color: '#FFFFFF'
  })), []);

  useEffect(() => {
    if (globeRef.current) {
      // Configure initial camera position
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.2 });
      
      // Auto-rotation
      if (!shouldReduceMotion) {
        globeRef.current.controls().autoRotate = true;
        globeRef.current.controls().autoRotateSpeed = 0.8;
      }
      
      // Disable zoom for a cleaner "hero visual" feel
      globeRef.current.controls().enableZoom = false;
      globeRef.current.controls().enablePan = false;
    }
  }, [shouldReduceMotion]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full flex items-center justify-center bg-[#020203] overflow-hidden"
    >
      {/* Premium Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_70%)] pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/10 to-transparent blur-3xl pointer-events-none z-10" />

      <div className="relative z-0 opacity-90">
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
          showAtmosphere={true}
          atmosphereColor="#FFFFFF"
          atmosphereAltitude={0.15}
          
          // Globe Appearance
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          
          // Graticules (Lat/Lng lines)
          showGraticules={true}
          
          // Arcs (Network connections)
          arcsData={arcsData}
          arcColor="color"
          arcDashLength="dashLength"
          arcDashGap="dashGap"
          arcDashAnimateTime="dashAnimateTime"
          arcStroke={0.4}
          arcCurveResolution={64}
          
          // Points (Location nodes)
          pointsData={pointsData}
          pointColor="color"
          pointRadius="size"
          pointsMerge={true}
          
          // Interaction
          enablePointerInteraction={false}
        />
      </div>

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20" />
    </div>
  );
}
