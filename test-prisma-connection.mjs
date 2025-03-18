// test-prisma-connection.js
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

// 加载环境变量
config();

// 验证环境变量
console.log('DATABASE_URL 是否存在:', !!process.env.DATABASE_URL);
// 只打印部分URL以保护安全性
if (process.env.DATABASE_URL) {
  const url = process.env.DATABASE_URL;
  console.log('DATABASE_URL 前10个字符:', url.substring(0, 10) + '...');
}

// 测试Prisma连接
const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('尝试连接数据库...');
    // 使用一个简单的查询测试连接
    const count = await prisma.idea.count();
    console.log('连接成功! 数据库中有', count, '条记录');
    return true;
  } catch (error) {
    console.error('连接失败:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

testConnection()
  .then((success) => {
    console.log('测试完成，结果:', success ? '成功' : '失败');
    process.exit(success ? 0 : 1);
  }); 