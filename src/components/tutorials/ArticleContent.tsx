import { motion } from 'motion/react';
import { CodeBlock } from './CodeBlock';

interface ContentBlock {
  type: "heading" | "paragraph" | "image" | "bullets" | "code" | "table";
  value?: string | string[];
  src?: string;
  alt?: string;
}

interface ContentSection {
  heading: string;
  text?: string;
  code?: string;
  blocks?: ContentBlock[];
}

interface ArticleContentProps {
  sections: ContentSection[];
}

export function ArticleContent({ sections }: ArticleContentProps) {
  return (
    <div className="space-y-16">
      {sections.map((section, idx) => {
        const sectionId = section.heading.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        
        return (
          <section key={idx} id={sectionId} className="scroll-mt-32">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8 tracking-tight">
              {section.heading}
            </h2>
            
            <div className="space-y-6">
              {section.blocks ? (
                section.blocks.map((block, bIdx) => {
                  switch (block.type) {
                    case "heading":
                      return (
                        <h3 key={bIdx} className="text-xl font-display font-bold text-foreground/90 mt-12 mb-4">
                          {block.value}
                        </h3>
                      );
                    case "paragraph":
                      return (
                        <p key={bIdx} className="text-muted-foreground text-lg leading-relaxed font-light whitespace-pre-wrap">
                          {block.value}
                        </p>
                      );
                    case "image":
                      return (
                        <figure key={bIdx} className="my-10 rounded-3xl overflow-hidden border border-border bg-muted/20 group/img">
                          <img 
                            src={block.src} 
                            alt={block.alt} 
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover/img:scale-[1.02]" 
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://picsum.photos/seed/${block.alt || 'tech'}/1200/600`;
                            }}
                          />
                          {block.alt && (
                            <figcaption className="p-4 text-center text-xs text-muted-foreground font-mono uppercase tracking-widest border-t border-border bg-card/50">
                              {block.alt}
                            </figcaption>
                          )}
                        </figure>
                      );
                    case "bullets":
                      return (
                        <ul key={bIdx} className="space-y-4 my-8 ml-2">
                          {(block.value as string[]).map((item, iIdx) => (
                            <li key={iIdx} className="flex gap-4 text-muted-foreground text-lg font-light leading-relaxed">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-3 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    case "code":
                      return (
                        <div key={bIdx}>
                          <CodeBlock 
                            code={block.value as string} 
                            isTerminal={block.value?.toString().startsWith('$')}
                          />
                        </div>
                      );
                    case "table":
                      return (
                        <div key={bIdx} className="my-10 overflow-hidden rounded-2xl border border-border bg-muted/10">
                          <table className="w-full text-left border-collapse">
                            <tbody className="divide-y divide-border">
                              {(block.value as unknown as string[][]).map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-muted/20 transition-colors">
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className={`p-4 text-sm ${cIdx === 0 ? 'font-mono text-primary font-medium w-1/3' : 'text-muted-foreground font-light'}`}>
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    default:
                      return null;
                  }
                })
              ) : (
                <div className="space-y-6">
                  <p className="text-muted-foreground text-lg leading-relaxed font-light whitespace-pre-wrap">
                    {section.text}
                  </p>
                  {section.code && (
                    <div key="section-code">
                      <CodeBlock code={section.code} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
