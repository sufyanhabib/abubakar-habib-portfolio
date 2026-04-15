import { useState } from 'react';
import { Check, Copy, Terminal, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
  isTerminal?: boolean;
  filename?: string;
}

export function CodeBlock({ code, language = 'javascript', isTerminal = false, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const textToCopy = isTerminal ? code.replace(/^\$ /gm, '') : code;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const customStyle = {
    margin: 0,
    padding: '2.5rem',
    background: 'transparent',
    fontSize: '0.875rem',
    lineHeight: '1.7',
  };

  return (
    <div className="group relative my-12 rounded-[2rem] overflow-hidden border border-border/50 bg-[#0d1117] shadow-2xl shadow-primary/5 transition-all duration-500 hover:border-primary/30">
      {/* Header / Chrome */}
      <div className="flex items-center justify-between px-8 py-5 bg-[#161b22] border-b border-border/30">
        <div className="flex items-center gap-6">
          {isTerminal ? (
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-80" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f] opacity-80" />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em] flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" /> zsh
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-primary/80 font-bold uppercase tracking-[0.4em]">
                {language}
              </span>
              {filename && (
                <>
                  <div className="h-4 w-[1px] bg-border/30" />
                  <span className="text-[10px] font-mono text-muted-foreground/60 tracking-wider flex items-center gap-2">
                    <Hash className="w-3.5 h-3.5" /> {filename}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
        
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-primary/10 hover:text-primary transition-all duration-300 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80"
          title="Copy code"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-500">Copied!</span>
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Code Area */}
      <div className="relative overflow-hidden">
        <SyntaxHighlighter
          language={isTerminal ? 'bash' : language.toLowerCase()}
          style={vscDarkPlus}
          customStyle={customStyle}
          codeTagProps={{
            style: {
              fontFamily: 'inherit',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
