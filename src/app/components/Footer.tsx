'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useLanguage } from '../contexts/LanguageContext';

// 语言文本配置
const translations = {
  zh: {
    copyright: '© {year} DareChain - Developed by',
    developer: 'Akiyama',
    developed: ''
  },
  en: {
    copyright: '© {year} DareChain - Developed by',
    developer: 'Akiyama',
    developed: ''
  }
};

export default function Footer() {
  const { theme } = useTheme();
  const { language, isLoaded } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [hoverTwitter, setHoverTwitter] = useState(false);
  
  // 确保在客户端完全加载前使用默认的暗色/亮色模式
  const isDark = mounted ? theme === 'dark' : false;
  
  // 获取当前语言的文本，确保在加载前使用默认值
  const t = translations[isLoaded ? language : 'en'];
  
  // 在组件挂载后设置mounted状态
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const currentYear = new Date().getFullYear();

  const footerStyle = {
    backgroundColor: isDark ? '#111827' : '#ffffff',
    borderTop: `1px solid ${isDark ? '#1f2937' : '#e5e7eb'}`,
    padding: '2rem 0'
  };

  const containerStyle = {
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '0 1rem',
  };

  const flexColumnStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    gap: '1rem'
  };

  const copyrightStyle = {
    textAlign: 'center' as const,
    marginBottom: '1rem',
    color: isDark ? '#9ca3af' : '#6b7280'
  };

  const authorNameStyle = {
    fontWeight: '600'
  };

  const twitterLinkStyle = {
    color: hoverTwitter ? '#1da1f2' : (isDark ? '#d1d5db' : '#4b5563'),
    transition: 'color 0.3s ease'
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={flexColumnStyle}>
          <div style={copyrightStyle}>
            <p>
              {t.copyright.replace('{year}', currentYear.toString())} <span style={authorNameStyle}>{t.developer}</span> {t.developed}
            </p>
          </div>
          <div>
            {mounted && (
              <Link 
                href="https://x.com/lchngy502188733" 
                target="_blank" 
                rel="noopener noreferrer"
                style={twitterLinkStyle}
                onMouseEnter={() => setHoverTwitter(true)}
                onMouseLeave={() => setHoverTwitter(false)}
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
} 