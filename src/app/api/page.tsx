import { Metadata } from 'next';
import ApiDocsContent from './ApiDocsContent';

export const metadata: Metadata = {
  title: 'API文档 - 创意点子生成器',
  description: '了解如何使用创意点子生成器API获取随机创意点子和所有点子',
};

export default function ApiDocsPage() {
  return <ApiDocsContent />;
} 