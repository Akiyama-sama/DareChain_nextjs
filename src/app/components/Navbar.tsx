'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faCode, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../contexts/LanguageContext';

// 语言文本配置
const translations = {
  zh: {
    siteName: 'DareChain',
    api: 'API',
    language: '语言'
  },
  en: {
    siteName: 'DareChain',
    api: 'API',
    language: 'Language'
  }
};

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, isLoaded } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [hoverApi, setHoverApi] = useState(false);
  const [hoverLang, setHoverLang] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  
  // 确保在客户端完全加载前使用默认的暗色/亮色模式
  const isDark = mounted ? theme === 'dark' : false;
  
  // 获取当前语言的文本，确保在加载前使用默认值
  const t = translations[isLoaded ? language : 'en'];

  // 在组件挂载后才渲染主题切换按钮，避免水合错误
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (mounted) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  const toggleLanguageMenu = () => {
    if (isLoaded) {
      setLangMenuOpen(!langMenuOpen);
    }
  };

  const changeLanguage = (newLanguage: 'zh' | 'en') => {
    if (isLoaded) {
      setLanguage(newLanguage);
      setLangMenuOpen(false);
    }
  };

  const navStyle = {
    position: 'sticky' as const,
    top: 0,
    zIndex: 10,
    backdropFilter: 'blur(12px)',
    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    borderBottom: `1px solid ${isDark ? '#1f2937' : '#e5e7eb'}`
  };

  const containerStyle = {
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '0 1rem'
  };

  const flexBetweenStyle = {
    display: 'flex',
    justifyContent: 'space-between' as const,
    height: '4rem'
  };

  const flexCenterStyle = {
    display: 'flex',
    alignItems: 'center' as const
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#f97316',
    marginRight: '0.5rem'
  };

  const apiLinkStyle = {
    color: hoverApi ? '#f97316' : (isDark ? '#d1d5db' : '#374151'),
    transition: 'color 0.3s ease'
  };

  const langButtonStyle = {
    color: hoverLang ? '#f97316' : (isDark ? '#d1d5db' : '#374151'),
    transition: 'color 0.3s ease',
    cursor: 'pointer',
    position: 'relative' as const
  };

  const flexWithGapStyle = {
    display: 'flex',
    alignItems: 'center' as const,
    gap: '1rem'
  };

  const iconWithTextStyle = {
    display: 'flex',
    alignItems: 'center' as const,
    gap: '0.25rem'
  };

  const themeButtonStyle = {
    padding: '0.5rem',
    borderRadius: '9999px',
    backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
    color: isDark ? '#d1d5db' : '#374151',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer'
  };

  const langMenuStyle = {
    position: 'absolute' as const,
    top: '100%',
    right: 0,
    width: '8rem',
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    marginTop: '0.5rem',
    overflow: 'hidden',
    zIndex: 20,
    display: langMenuOpen ? 'block' : 'none'
  };

  const langOptionStyle = (isActive: boolean) => ({
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    backgroundColor: isActive ? (isDark ? '#374151' : '#f3f4f6') : 'transparent',
    color: isDark ? '#d1d5db' : '#374151',
    ':hover': {
      backgroundColor: isDark ? '#374151' : '#f3f4f6'
    }
  });

  // 确保在客户端渲染前后DOM结构一致
  const renderLanguageMenu = () => {
    if (!mounted) return null;
    
    return (
      <div style={langMenuStyle}>
        <div 
          style={langOptionStyle(language === 'zh')}
          onClick={(e) => {
            e.stopPropagation();
            changeLanguage('zh');
          }}
        >
          中文
        </div>
        <div 
          style={langOptionStyle(language === 'en')}
          onClick={(e) => {
            e.stopPropagation();
            changeLanguage('en');
          }}
        >
          English
        </div>
      </div>
    );
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <div style={flexBetweenStyle}>
          <div style={flexCenterStyle}>
            <Link href="/" style={flexCenterStyle}>
              <span style={logoStyle}>{t.siteName}</span>
            </Link>
          </div>
          <div style={flexWithGapStyle}>
            {/* 只有在客户端加载后才显示语言切换按钮 */}
            {mounted && (
              <div 
                style={langButtonStyle}
                onMouseEnter={() => setHoverLang(true)}
                onMouseLeave={() => setHoverLang(false)}
                onClick={toggleLanguageMenu}
              >
                <div style={iconWithTextStyle}>
                  <FontAwesomeIcon icon={faLanguage} />
                  <span>{t.language}</span>
                </div>
                
                {renderLanguageMenu()}
              </div>
            )}
            
            <Link 
              href="/api" 
              style={apiLinkStyle}
              onMouseEnter={() => setHoverApi(true)}
              onMouseLeave={() => setHoverApi(false)}
            >
              <div style={iconWithTextStyle}>
                <FontAwesomeIcon icon={faCode} />
                <span>{t.api}</span>
              </div>
            </Link>
            {mounted && (
              <button
                onClick={toggleTheme}
                style={themeButtonStyle}
                aria-label="切换主题"
              >
                {theme === 'light' ? (
                  <FontAwesomeIcon icon={faMoon} />
                ) : (
                  <FontAwesomeIcon icon={faSun} />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 