import { useState, useEffect } from 'react';
import { Language } from '@/types/tutorial';

export function usePersistedLanguage(defaultLang: Language = 'hinglish') {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('preferred_lang') as Language) || defaultLang;
    }
    return defaultLang;
  });

  useEffect(() => {
    localStorage.setItem('preferred_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'hinglish' ? 'english' : 'hinglish');
  };

  return { language, setLanguage, toggleLanguage };
}
