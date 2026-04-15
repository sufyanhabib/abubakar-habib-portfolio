import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface SharinganEffectProps {
  onActivate?: () => void;
}

export const SharinganEffect: React.FC<SharinganEffectProps> = ({ onActivate }) => {
  useEffect(() => {
    // Trigger activation sound when mounted if needed
    // or when some condition is met.
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Left Eye Glow */}
      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [0.8, 1.1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[42%] left-[38%] w-3 h-3 bg-red-600 rounded-full blur-[6px] mix-blend-screen"
      />

      {/* Right Eye Glow */}
      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [0.8, 1.1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
        className="absolute top-[42%] right-[38%] w-3 h-3 bg-red-600 rounded-full blur-[6px] mix-blend-screen"
      />

      {/* Subtle Eye Pulse */}
      <motion.div
        animate={{
          opacity: [0, 0.1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-red-900/10"
      />
    </div>
  );
};
