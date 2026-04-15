import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ReadingProgress } from './ReadingProgress';

interface TutorialShellProps {
  children: ReactNode;
  toc: ReactNode;
}

export function TutorialShell({ children, toc }: TutorialShellProps) {
  return (
    <div className="relative min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <div className="sticky top-0 z-[150] w-full">
        <ReadingProgress />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-24">
          {/* Main Content Column */}
          <main className="w-full">
            <article className="relative max-w-[70ch] mx-auto lg:mx-0">
              {children}
            </article>
          </main>

          {/* Right Sidebar - TOC Rail */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              {toc}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
