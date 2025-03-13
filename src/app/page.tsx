'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import IdeaCard from '@/app/components/IdeaCard';
import { useLanguage } from './contexts/LanguageContext';

// 语言文本配置
const translations = {
  zh: {
    discover: '你敢说我就敢做',
    aiDriven: '',
    description: '由"你敢说我就敢拍"系列所启发的随机点子网站，数据来源于评论区'
  },
  en: {
    discover: 'DareChain',
    aiDriven: '"If you dare to say it, I dare to do it."',
    description: 'A random idea generator inspired by the "If you dare to say it, I dare to do it." series, with data sourced from comments'
  }
};

export default function Home() {
  const { theme } = useTheme();
  const { language, isLoaded } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  // 确保在客户端完全加载前使用默认的暗色/亮色模式
  const isDark = mounted ? theme === 'dark' : false;
  
  // 获取当前语言的文本，确保在加载前使用默认值
  const t = translations[isLoaded ? language : 'en'];

  // 在组件挂载后设置mounted状态
  useEffect(() => {
    setMounted(true);
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minHeight: '80vh',
    padding: '3rem 1rem',
    background: isDark 
      ? 'linear-gradient(to bottom, #111827, #030712)'
      : 'linear-gradient(to bottom, #fffbeb, #fff)',
  };

  const headingStyle = {
    textAlign: 'center' as const,
    marginBottom: '2.5rem'
  };

  const gradientTextStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    background: 'linear-gradient(to right, #f97316, #facc15)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent'
  };

  const gradientSubheadingStyle = {
    ...gradientTextStyle,
    fontSize: '3.75rem',
    marginBottom: '1.5rem'
  };

  const descriptionStyle = {
    fontSize: '1.25rem',
    color: isDark ? '#d1d5db' : '#4b5563',
    maxWidth: '42rem',
    margin: '0 auto'
  };

  return (
    <div style={containerStyle}>
      <div style={headingStyle}>
        <h1 style={gradientTextStyle}>
          {t.discover}
        </h1>
        <h2 style={gradientSubheadingStyle}>
          {t.aiDriven}
        </h2>
        <p style={descriptionStyle}>
          {t.description}
        </p>
      </div>
      
      <IdeaCard />
    </div>
  );
}
