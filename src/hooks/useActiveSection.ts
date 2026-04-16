import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[], optionsOrRootId?: IntersectionObserverInit | string) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    let options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    if (typeof optionsOrRootId === 'string') {
      const root = document.getElementById(optionsOrRootId);
      if (root) {
        options.root = root;
      }
    } else if (optionsOrRootId) {
      options = { ...options, ...optionsOrRootId };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [sectionIds, optionsOrRootId]);

  return activeSection;
}
