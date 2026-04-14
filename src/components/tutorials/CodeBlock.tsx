import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CodeBlockProps {
  code: string;
  language?: string;
  isTerminal?: boolean;
}

export function CodeBlock({ code, language = 'bash', isTerminal = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-8 rounded-2xl overflow-hidden border border-border bg-muted/30 shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          {isTerminal ? (
            <>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
              </div>
              <span className="ml-2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                <Terminal className="w-3 h-3" /> Terminal
              </span>
            </>
          ) : (
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              {language}
            </span>
          )}
        </div>
        
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          title="Copy code"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <Copy className="w-3.5 h-3.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Code */}
      <div className="relative">
        <pre className="p-6 font-mono text-sm overflow-x-auto leading-relaxed text-primary/90 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
