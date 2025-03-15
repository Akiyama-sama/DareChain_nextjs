import { PrismaClient } from '@prisma/client';

// 创建Prisma客户端实例
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // 在生产环境中创建新的PrismaClient实例
  prisma = new PrismaClient({
    log: ['error', 'warn', 'query'],  // 增加日志级别，以便调试
  });
  
  // 尝试连接并记录任何连接问题
  prisma.$connect()
    .then(() => console.log('Production: Successfully connected to the database'))
    .catch(e => console.error('Production: Failed to connect to the database:', e));
    
} else {
  // 在开发环境中，为了防止热重载导致多个实例，使用全局变量
  // @ts-expect-error - 全局变量扩展
  globalThis.__prisma = globalThis.__prisma || new PrismaClient({
    log: ['query', 'error', 'warn'],
  });
  // @ts-expect-error - 全局变量扩展
  prisma = globalThis.__prisma;
  
  // 确保连接使用的是最新的环境变量
  prisma.$connect()
    .then(() => console.log('Development: Successfully connected to the database'))
    .catch(e => console.error('Development: Failed to connect to the database:', e));
}

export { prisma }; 