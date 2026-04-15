import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  isLevelingUp: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, isLevelingUp }) => {
  return (
    <div className="relative h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
      {/* Background Glow */}
      <AnimatePresence>
        {isLevelingUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#00FF9F]/10 blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Progress Fill */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ 
          type: "spring", 
          stiffness: isLevelingUp ? 50 : 100, 
          damping: 20,
          mass: 1
        }}
        className={cn(
          "h-full rounded-full relative",
          "bg-gradient-to-r from-[#00FF9F] to-[#00C2FF]"
        )}
      >
        {/* Animated Shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine-slow" />
        
        {/* Tip Glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 bg-white rounded-full blur-md opacity-50" />
      </motion.div>

      {/* Level Up Burst Effect */}
      <AnimatePresence>
        {progress === 100 && isLevelingUp && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: [0, 1, 0] }}
            transition={{ duration: 0.8 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#00FF9F] rounded-full blur-xl pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
