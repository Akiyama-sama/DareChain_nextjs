import { PrismaClient } from '@prisma/client';

// 创建Prisma客户端实例
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // 在生产环境中创建新的PrismaClient实例
  prisma = new PrismaClient({
    log: ['error'],
  });
} else {
  // 在开发环境中，为了防止热重载导致多个实例，使用全局变量
  // @ts-expect-error - 全局变量扩展
  globalThis.__prisma = globalThis.__prisma || new PrismaClient({
    log: ['query', 'error', 'warn'],
  });
  // @ts-expect-error - 全局变量扩展
  prisma = globalThis.__prisma;
  
  // 确保连接使用的是最新的环境变量
  prisma.$connect();
}

export { prisma }; 