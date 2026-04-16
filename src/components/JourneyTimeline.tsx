import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect, memo } from "react";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, MapPin, Calendar, HelpCircle, ArrowUpRight } from "lucide-react";

export const JourneyTimeline = memo(function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.05, once: false });
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (isInView) {
      setStartAnimation(true);
    }
  }, [isInView]);

  // The SVG path structure (Inspired by Joy of React)
  // Extended to ~2200px to accommodate all cards with proper spacing
  const pathData = "M 200 0 C 200 150 300 300 300 450 C 300 600 100 750 100 900 C 100 1050 300 1200 300 1350 C 300 1500 100 1650 100 1800 C 100 1950 200 2100 200 2200";

  // Milestones in chronological order (Top to Bottom: MCA -> Junior Consultant)
  const experienceData = portfolioData.experience || [];
  const milestones = [
    { ...(experienceData[4] || {}), delay: 0.5 }, // MCA
    { ...(experienceData[3] || {}), delay: 1.2 }, // Open Source
    { ...(experienceData[2] || {}), delay: 1.9 }, // Summer Hackathon
    { ...(experienceData[1] || {}), delay: 2.6 }, // Trainee Engineer
    { ...(experienceData[0] || {}), delay: 3.3 }, // Junior Consultant
  ].filter(m => m.role);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-7xl mx-auto py-12 px-6 overflow-visible min-h-[2200px] lg:min-h-[2400px]">
      {/* The Path (Centered Background) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-12 bottom-12 w-[400px] hidden lg:block pointer-events-none">
        <svg
          viewBox="0 0 400 2200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF9933" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#138808" />
            </linearGradient>
          </defs>

          {/* Start Dot (Before MCA) */}
          <motion.circle
            cx="200"
            cy="0"
            r="10"
            fill="#FF9933"
            initial={{ scale: 0, opacity: 0 }}
            animate={startAnimation ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="drop-shadow-[0_0_15px_#FF9933]"
          />
          
          {/* Background Path (Subtle Texture) */}
          <path
            d={pathData}
            stroke="white"
            strokeWidth="2"
            strokeOpacity="0.05"
            strokeLinecap="round"
          />
          
          {/* Animated Path (Dotted Gradient) */}
          <motion.path
            d={pathData}
            stroke="url(#journeyGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="0 20"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: startAnimation ? 1 : 0 }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
          />

          {/* Glowing Dot following the path */}
          <motion.circle
            r="12"
            fill="#FFFFFF"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: startAnimation ? "100%" : "0%" }}
            transition={{ duration: 4, ease: "easeInOut" }}
            style={{ 
              offsetPath: `path("${pathData}")`,
            }}
            className="drop-shadow-[0_0_20px_rgba(255,255,255,1)]"
          />

          {/* Final Question Mark Box at the BOTTOM */}
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: startAnimation ? 1 : 0, 
              scale: startAnimation ? 1 : 0.5 
            }}
            transition={{ delay: 4, duration: 0.5 }}
          >
            <foreignObject x="140" y="2210" width="120" height="150">
              <button 
                onClick={scrollToContact}
                className="group/qbox flex flex-col items-center justify-center w-full h-full pointer-events-auto cursor-pointer"
              >
                <div className="relative w-20 h-20 bg-background border-2 border-[#138808] rounded-3xl flex items-center justify-center shadow-[0_0_25px_rgba(19,136,8,0.2)] group-hover/qbox:shadow-[0_0_40px_rgba(19,136,8,0.4)] transition-all duration-500">
                  <HelpCircle className="h-10 w-10 text-[#138808]" />
                  <div className="absolute -top-1 -right-1">
                    <div className="h-4 w-4 bg-[#138808] rounded-full animate-ping" />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-[12px] font-mono uppercase tracking-[0.4em] text-[#138808] font-bold">What's next?</p>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground opacity-0 group-hover/qbox:opacity-100 transition-opacity mt-1">
                    <span>Let's collaborate</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </button>
            </foreignObject>
          </motion.g>
        </svg>
      </div>

      {/* The Content (Alternating) */}
      <div className="space-y-12 lg:space-y-32 relative z-10 pt-12"> 
        {milestones.map((milestone, i) => (
          <div 
            key={i} 
            className={`flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 ${
              i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            }`}
          >
            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100, scale: 0.9 }}
              animate={startAnimation ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0.1, x: i % 2 === 0 ? -100 : 100, scale: 0.9 }}
              transition={{ duration: 0.8, delay: milestone.delay, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[42%] group"
            >
              <div className="relative bg-secondary/5 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 hover:bg-secondary/10 transition-all duration-500 shadow-2xl shadow-black/30 overflow-hidden">
                {/* Glass Highlight */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                
                <div className="flex items-center gap-3 text-[#FF9933] font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.4em] mb-4 sm:mb-6 font-bold">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {milestone.period}
                </div>
                
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-3 group-hover:text-[#FF9933] transition-colors duration-300">
                  {milestone.role}
                </h3>
                
                <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-muted-foreground mb-6 sm:mb-8 text-xs sm:text-sm">
                  <span className="flex items-center gap-2">
                    <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {milestone.company}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {milestone.location}
                  </span>
                </div>

                <p className="text-muted-foreground mb-6 sm:mb-10 leading-relaxed font-light text-base sm:text-lg">
                  {milestone.description}
                </p>

                <ul className="space-y-3 sm:space-y-5">
                  {milestone.achievements.map((achievement, j) => (
                    <li key={j} className="flex items-start gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground/90">
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#FF9933]/60 mt-2 shrink-0 shadow-[0_0_10px_#FF9933]" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Spacer for the path on desktop */}
            <div className="hidden lg:block w-[16%]" />

            {/* Empty space for alternating effect */}
            <div className="hidden lg:block w-[42%]" />
          </div>
        ))}
      </div>

      {/* Mobile Path (Simplified Vertical Line) */}
      <div className="lg:hidden absolute left-4 top-0 bottom-0 w-[3px] bg-white/5 -z-10">
        <motion.div 
          className="w-full bg-gradient-to-b from-[#FF9933] via-white to-[#138808] shadow-[0_0_15px_#FFFFFF]"
          initial={{ height: 0 }}
          animate={{ height: startAnimation ? "100%" : 0 }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
});
