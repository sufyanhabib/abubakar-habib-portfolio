import { motion } from "motion/react";
import { MapPin, Navigation, Globe, Wifi } from "lucide-react";
import { useState, useEffect } from "react";

export function LocationCard() {
  const [distance, setDistance] = useState<number | null>(null);
  const [visitorCity, setVisitorCity] = useState<string>("somewhere");

  // Coordinates for Bihar, India (approximate center)
  const BIHAR_COORDS = { lat: 25.0961, lng: 85.3131 };

  useEffect(() => {
    // Simulate fetching visitor location for the "whimsical" storytelling feel
    // In a real app, you'd use a geolocation API or IP-based service
    const timer = setTimeout(() => {
      // Mocking a distance for the demo feel
      // A more complex implementation would use the Haversine formula
      const mockDistances = [1240, 5600, 8900, 12000, 450];
      const randomDist = mockDistances[Math.floor(Math.random() * mockDistances.length)];
      setDistance(randomDist);
      
      const cities = ["London", "New York", "Tokyo", "Berlin", "Dubai", "Sydney"];
      setVisitorCity(cities[Math.floor(Math.random() * cities.length)]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full aspect-square rounded-3xl overflow-hidden bg-card border border-border/50 shadow-2xl flex flex-col group"
    >
      {/* The Visual Scene */}
      <div className="relative flex-1 bg-muted/30 overflow-hidden">
        {/* Abstract Network/Map Background */}
        <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 400 400">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Abstract India Shape (Simplified) */}
          <path 
            d="M200,100 L250,150 L230,250 L180,300 L130,250 L150,150 Z" 
            fill="currentColor" 
            className="text-primary/10"
          />
          
          {/* Network Nodes */}
          {[
            { x: 180, y: 140 }, { x: 240, y: 180 }, { x: 210, y: 240 }, 
            { x: 150, y: 220 }, { x: 190, y: 280 }
          ].map((node, i) => (
            <circle key={i} cx={node.x} cy={node.y} r="2" className="fill-primary/30" />
          ))}
          
          {/* Connection Lines */}
          <path 
            d="M180,140 L240,180 L210,240 L150,220 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            className="text-primary/20"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Floating Elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Bihar Marker */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20"
          >
            <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full animate-pulse" />
            <div className="relative bg-background border-2 border-primary p-3 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="pr-2">
                <p className="text-[10px] font-mono uppercase tracking-widest text-primary leading-none mb-1">Current Base</p>
                <p className="text-sm font-bold leading-none">Bihar, India</p>
              </div>
            </div>
            
            {/* Connecting line to "Visitor" (Whimsical) */}
            <svg className="absolute top-full left-1/2 -translate-x-1/2 w-48 h-48 pointer-events-none" style={{ overflow: 'visible' }}>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
                d="M0,0 Q-100,100 -200,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="text-primary/30"
              />
            </svg>
          </motion.div>

          {/* Whimsical Avatar/Marker */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
            className="absolute top-1/4 right-1/4 p-2 bg-background border border-border rounded-full shadow-lg"
          >
            <Wifi className="h-4 w-4 text-primary" />
          </motion.div>
        </div>

        {/* Ambient Glows */}
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
      </div>

      {/* Content Area */}
      <div className="p-8 bg-background/50 backdrop-blur-sm border-t border-border/50">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-display font-bold mb-1">From Bihar to the Browser</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building modern interfaces and robust networks from the heart of India.
            </p>
          </div>
          <div className="p-2 bg-muted rounded-xl">
            <Globe className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <div className="pt-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-tighter text-muted-foreground">
              {distance ? `~${distance.toLocaleString()}km from you` : "Calculating distance..."}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-tighter text-primary/60">
            <Navigation className="h-3 w-3" />
            <span>85.3131° E</span>
          </div>
        </div>
      </div>

      {/* Whimsical Footer Note */}
      <div className="absolute bottom-2 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="text-[9px] font-mono text-muted-foreground italic">
          *Distance simulated for storytelling magic
        </p>
      </div>
    </motion.div>
  );
}
