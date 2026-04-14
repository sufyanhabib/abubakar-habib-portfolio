import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ReadingProgress } from './ReadingProgress';

interface TutorialLayoutProps {
  children: ReactNode;
  toc: ReactNode;
}

export function TutorialLayout({ children, toc }: TutorialLayoutProps) {
  return (
    <div className="relative min-h-screen bg-card">
      <ReadingProgress />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-16">
          {/* Left Sidebar - TOC */}
          <aside className="hidden lg:block">
            {toc}
          </aside>

          {/* Main Content */}
          <main className="max-w-[800px] w-full mx-auto lg:mx-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
