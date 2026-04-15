import { useState, useEffect } from 'react';

export function useReadingProgress(containerId?: string) {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const container = containerId ? document.getElementById(containerId) : window;
    
    const updateScrollCompletion = () => {
      let currentProgress = 0;
      let scrollHeight = 0;

      if (container instanceof HTMLElement) {
        currentProgress = container.scrollTop;
        scrollHeight = container.scrollHeight - container.clientHeight;
      } else {
        currentProgress = window.scrollY;
        scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      }

      if (scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100
        );
      }
    };

    const target = containerId ? document.getElementById(containerId) : window;
    if (target) {
      target.addEventListener('scroll', updateScrollCompletion);
    }

    return () => {
      if (target) {
        target.removeEventListener('scroll', updateScrollCompletion);
      }
    };
  }, [containerId]);

  return completion;
}
