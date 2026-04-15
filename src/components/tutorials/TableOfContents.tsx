import { motion } from 'motion/react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { List, Hash, ChevronRight } from 'lucide-react';
import { TOCItem } from '@/types/tutorial';

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const activeId = useActiveSection(items.map(item => item.id), 'tutorial-scroll-container');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const container = document.getElementById('tutorial-scroll-container');
    
    if (element && container) {
      const offset = 40; // Reduced offset since we're scrolling within a container
      const elementRect = element.getBoundingClientRect().top;
      const containerRect = container.getBoundingClientRect().top;
      const relativeTop = elementRect - containerRect + container.scrollTop;
      
      container.scrollTo({
        top: relativeTop - offset,
        behavior: 'smooth'
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-32 h-fit max-w-[240px] w-full">
      <div className="flex items-center gap-3 mb-10 text-foreground/40 font-mono text-[10px] uppercase tracking-[0.4em]">
        <div className="p-2 rounded-lg bg-primary/5 border border-primary/10">
          <List className="w-3.5 h-3.5 text-primary/60" />
        </div>
        On this page
      </div>
      
      <div className="space-y-1 relative">
        {/* Vertical Line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border/30" />
        
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`
              group flex items-start gap-3 w-full text-left py-3 pl-6 pr-2 text-[11px] transition-all border-l-2 -ml-px relative
              ${activeId === item.id 
                ? 'text-primary border-primary font-bold bg-primary/5' 
                : 'text-muted-foreground border-transparent hover:text-foreground hover:border-border/50'
              }
              ${item.level === 3 ? 'pl-10' : ''}
            `}
          >
            {activeId === item.id && (
              <motion.div
                layoutId="toc-active"
                className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-primary"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <ChevronRight className={`w-3 h-3 mt-0.5 transition-all ${activeId === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0'}`} />
            <span className="line-clamp-2 leading-relaxed">{item.title}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
