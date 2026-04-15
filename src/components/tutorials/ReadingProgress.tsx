import { motion } from 'motion/react';
import { useReadingProgress } from '@/hooks/useReadingProgress';

export function ReadingProgress() {
  const completion = useReadingProgress('tutorial-scroll-container');

  return (
    <div className="sticky top-0 left-0 w-full h-1 z-[150] pointer-events-none">
      <motion.div
        className="h-full bg-primary origin-left shadow-[0_0_10px_rgba(var(--primary),0.5)]"
        style={{ scaleX: completion / 100 }}
        transition={{ type: "spring", stiffness: 100, damping: 30, restDelta: 0.001 }}
      />
    </div>
  );
}
