import { PrismaClient } from '@prisma/client';

// 创建一个全局变量来存储Prisma客户端实例
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 声明prisma客户端
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// 在开发环境中，为每次热重载保留连接
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma; 