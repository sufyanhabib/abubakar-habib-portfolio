import { useState, useEffect, useRef } from 'react';

export function useActiveSection(itemIds: string[], containerId?: string) {
  const [activeId, setActiveId] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const container = containerId ? document.getElementById(containerId) : null;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (visibleEntry) {
        setActiveId(visibleEntry.target.id);
      }
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      root: container,
      rootMargin: '-20% 0% -70% 0%',
      threshold: 0.1,
    });

    itemIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.current?.observe(element);
    });

    return () => observer.current?.disconnect();
  }, [itemIds]);

  return activeId;
}
