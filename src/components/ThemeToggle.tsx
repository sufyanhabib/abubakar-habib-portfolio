import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useSound } from "@/components/SoundProvider";

export function ThemeToggle() {
  const { playThemeSound } = useSound();
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      
      // Default to 'dark' if no theme is found in localStorage or system preferences
      return "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove("dark");
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      playThemeSound(next);
      return next;
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 cursor-pointer relative overflow-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: 20, rotate: 90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -20, rotate: -90, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          {theme === "light" ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
