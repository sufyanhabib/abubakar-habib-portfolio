import { ContentBlock } from '@/types/tutorial';
import { CodeBlock } from './CodeBlock';
import { motion } from 'motion/react';
import { Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

interface BlockRendererProps {
  block: ContentBlock;
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case "heading":
      return (
        <h3 className="text-2xl font-display font-bold text-foreground/90 mt-16 mb-6 tracking-tight">
          {block.value as string}
        </h3>
      );
    case "paragraph":
      return (
        <p className="text-muted-foreground/90 text-base sm:text-lg md:text-xl leading-[1.8] font-light mb-8 sm:mb-10 selection:bg-primary/10">
          {block.value as string}
        </p>
      );
    case "blockquote":
      return (
        <blockquote className="my-8 sm:my-12 pl-6 sm:pl-8 border-l-4 border-primary/30 italic">
          <p className="text-xl sm:text-2xl md:text-3xl text-foreground/80 font-display font-light leading-relaxed">
            {block.value as string}
          </p>
          {block.author && (
            <cite className="block mt-6 text-sm font-mono text-muted-foreground uppercase tracking-widest not-italic">
              — {block.author}
            </cite>
          )}
        </blockquote>
      );
    case "image":
      return (
        <figure className="my-12 rounded-[2rem] overflow-hidden border border-border/50 bg-muted/20 group shadow-2xl shadow-primary/5">
          <img 
            src={block.src} 
            alt={block.alt} 
            className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-[1.05]" 
            referrerPolicy="no-referrer"
          />
          {block.alt && (
            <figcaption className="p-5 text-center text-[10px] text-muted-foreground font-mono uppercase tracking-[0.3em] border-t border-border/50 bg-card/50">
              {block.alt}
            </figcaption>
          )}
        </figure>
      );
    case "bullets":
      return (
        <ul className="space-y-4 my-8 sm:my-10 ml-2">
          {(block.value as string[]).map((item, iIdx) => (
            <li key={iIdx} className="flex gap-4 text-muted-foreground/90 text-base sm:text-lg md:text-xl font-light leading-relaxed">
              <div className="h-1.5 w-1.5 rounded-full bg-primary/40 mt-3 sm:mt-3.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "code":
    case "terminal":
      return (
        <CodeBlock 
          code={block.value as string} 
          language={block.language}
          filename={block.filename}
          isTerminal={block.type === "terminal" || (block.value as string).startsWith('$')}
        />
      );
    case "table":
      return (
        <div className="my-8 sm:my-12 overflow-x-auto rounded-2xl border border-border/30 bg-muted/5 shadow-sm">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <tbody className="divide-y divide-border/30">
              {(block.value as string[][]).map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-muted/10 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className={`p-4 sm:p-6 text-sm sm:text-base ${cIdx === 0 ? 'font-mono text-primary/70 font-bold w-1/3' : 'text-muted-foreground/80 font-light'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      const icons = {
        info: Info,
        warning: AlertTriangle,
        error: AlertCircle,
        success: CheckCircle
      };
      const Icon = icons[block.variant || "info"];
      const colors = {
        info: "bg-blue-500/5 border-blue-500/20 text-blue-500",
        warning: "bg-amber-500/5 border-amber-500/20 text-amber-500",
        error: "bg-red-500/5 border-red-500/20 text-red-500",
        success: "bg-emerald-500/5 border-emerald-500/20 text-emerald-500"
      };
      
      return (
        <div className={`my-8 sm:my-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border flex flex-col sm:flex-row gap-4 sm:gap-6 ${colors[block.variant || "info"]}`}>
          <Icon className="w-6 h-6 shrink-0 mt-1" />
          <div className="text-base sm:text-lg font-light leading-relaxed text-foreground/80">
            {block.value as string}
          </div>
        </div>
      );
    default:
      return null;
  }
}
