import { ArticleSection } from '@/types/tutorial';
import { BlockRenderer } from './BlockRenderer';
import { motion } from 'motion/react';

interface TutorialArticleProps {
  sections: ArticleSection[];
}

export function TutorialArticle({ sections }: TutorialArticleProps) {
  return (
    <div className="space-y-24">
      {sections.map((section, idx) => {
        const sectionId = section.heading.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        
        return (
          <motion.section 
            key={idx} 
            id={sectionId} 
            className="scroll-mt-32"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-10 tracking-tight">
              {section.heading}
            </h2>
            
            <div className="space-y-4">
              {section.blocks.map((block, bIdx) => (
                <div key={bIdx}>
                  <BlockRenderer block={block} />
                </div>
              ))}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
