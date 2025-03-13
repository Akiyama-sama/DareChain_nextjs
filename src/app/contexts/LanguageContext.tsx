'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  isLoaded: boolean;
}

// 创建默认值，避免初始加载时的undefined
const defaultContextValue: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  isLoaded: false
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoaded, setIsLoaded] = useState(false);

  // 在客户端挂载后，根据浏览器语言设置初始语言
  useEffect(() => {
    // 使用延迟设置来确保服务器和客户端初始渲染一致
    const initLanguage = () => {
      try {
        // 首先检查本地存储中是否有保存的语言设置
        const savedLang = localStorage.getItem('language') as Language | null;
        if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
          setLanguage(savedLang);
          setIsLoaded(true);
          return;
        }
        
        // 如果没有保存的设置，则使用浏览器语言
        const browserLang = navigator.language.toLowerCase();
        // 如果浏览器语言是中文，设置为中文，否则默认为英文
        const initialLang: Language = browserLang.startsWith('zh') ? 'zh' : 'en';
        setLanguage(initialLang);
        setIsLoaded(true);
      } catch (error) {
        // 出错时使用默认英文
        console.error('Failed to get language preference:', error);
        setIsLoaded(true);
      }
    };

    // 确保在首次渲染后再初始化语言，避免水合错误
    window.setTimeout(initLanguage, 0);
  }, []);

  // 更新语言并保存到本地存储
  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    if (isLoaded) {
      try {
        localStorage.setItem('language', newLanguage);
      } catch (error) {
        console.error('Failed to save language preference:', error);
      }
    }
  };

  // 创建上下文值，即使在客户端挂载前也提供默认值
  const contextValue: LanguageContextType = {
    language,
    setLanguage: handleSetLanguage,
    isLoaded
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
} 