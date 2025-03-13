'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Idea } from '@prisma/client';
import { useLanguage } from '../contexts/LanguageContext';

// 语言文本配置
const translations = {
  zh: {
    randomIdea: '随机点子',
    loading: '加载中...',
    errorLoading: '无法加载创意点子'
  },
  en: {
    randomIdea: 'Random Idea',
    loading: 'Loading...',
    errorLoading: 'Failed to load creative idea'
  }
};

export default function IdeaCard() {
  const { theme } = useTheme();
  const { language, isLoaded } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [idea, setIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  
  // 确保在客户端完全加载前使用默认的暗色/亮色模式
  const isDark = mounted ? theme === 'dark' : false;
  
  // 获取当前语言的文本，确保在加载前使用默认值
  const t = translations[isLoaded ? language : 'en'];

  // 在组件挂载后执行客户端操作
  useEffect(() => {
    setMounted(true);
    // 在组件挂载后立即获取一个随机点子
    setTimeout(() => {
      fetchRandomIdea();
    }, 0);
  }, [fetchRandomIdea]);

  // 使用useCallback包装fetchRandomIdea函数以避免无限循环
  const fetchRandomIdea = useCallback(async () => {
    setLoading(true);
    try {
      // 从API获取数据
      const response = await fetch('/api/ideas/random');
      if (!response.ok) {
        throw new Error('Failed to fetch idea');
      }
      const data = await response.json();
      setIdea(data);
      setLoading(false);
    } catch (error) {
      console.error(isLoaded && language === 'zh' ? '获取随机点子失败:' : 'Failed to fetch random idea:', error);
      setLoading(false);
    }
  }, [isLoaded, language]);

  // 基本样式
  const cardContainerStyle = {
    maxWidth: '42rem',
    width: '100%'
  };

  const cardStyle = {
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden' as const,
    transition: 'all 0.3s ease',
    padding: '2rem',
    marginBottom: '1.5rem'
  };

  const loadingContainerStyle = {
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: '4rem 0'
  };

  const contentContainerStyle = {
    marginBottom: '1rem'
  };

  const ideaTextStyle = {
    fontSize: '1.5rem',
    fontWeight: '500',
    color: isDark ? '#f3f4f6' : '#1f2937',
    lineHeight: '1.75',
    marginBottom: '1rem'
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center' as const
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center' as const,
    gap: '0.5rem',
    background: 'linear-gradient(to right, #f97316, #facc15)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    fontWeight: '500',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s ease',
    transform: isHovering ? 'scale(1.05)' : 'scale(1)',
    cursor: 'pointer',
    border: 'none',
    outline: 'none'
  };

  const errorTextStyle = {
    textAlign: 'center' as const, 
    color: isDark ? '#9ca3af' : '#6b7280', 
    padding: '2rem 0'
  };

  // 根据当前语言获取要显示的内容
  const getIdeaContent = () => {
    if (!idea) return null;
    
    if (isLoaded && language === 'zh') {
      return idea.chineseContent;
    } else {
      return idea.englishContent;
    }
  };

  // 仅在客户端渲染后显示实际内容，避免水合不匹配
  if (!mounted) {
    return (
      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <div style={loadingContainerStyle}>
            <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#f97316', borderRadius: '50%' }}></div>
          </div>
        </div>
        
        <div style={buttonContainerStyle}>
          <button
            disabled={true}
            style={{
              ...buttonStyle,
              opacity: 0.7
            }}
          >
            <span>{translations.en.loading}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={cardContainerStyle}>
      <div style={cardStyle}>
        {loading ? (
          <div style={loadingContainerStyle}>
            <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '2.5rem', color: '#f97316' }} />
          </div>
        ) : idea ? (
          <div style={contentContainerStyle}>
            <p style={ideaTextStyle}>
              {getIdeaContent()}
            </p>
          </div>
        ) : (
          <p style={errorTextStyle}>{t.errorLoading}</p>
        )}
      </div>

      <div style={buttonContainerStyle}>
        <button
          onClick={fetchRandomIdea}
          disabled={loading}
          style={{
            ...buttonStyle,
            opacity: loading ? 0.7 : 1
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <FontAwesomeIcon icon={faRandom} style={{ opacity: loading ? 0 : 1 }} />
          <span>{loading ? t.loading : t.randomIdea}</span>
        </button>
      </div>
    </div>
  );
} 