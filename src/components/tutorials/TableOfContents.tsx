import { motion } from 'motion/react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const activeId = useActiveSection(items.map(item => item.id));

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-32 h-fit max-w-[240px] w-full">
      <div className="flex items-center gap-2 mb-6 text-foreground/40 font-mono text-[10px] uppercase tracking-[0.2em]">
        <List className="w-3.5 h-3.5" />
        Table of Contents
      </div>
      
      <div className="space-y-1 relative">
        {/* Vertical Line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
        
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`
              block w-full text-left py-2 pl-4 pr-2 text-xs transition-all border-l-2 -ml-px
              ${activeId === item.id 
                ? 'text-primary border-primary font-medium bg-primary/5' 
                : 'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
              }
              ${item.level === 3 ? 'pl-8' : ''}
            `}
          >
            {item.title}
          </button>
        ))}
      </div>
    </nav>
  );
}
