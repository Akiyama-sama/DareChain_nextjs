import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    console.log('尝试获取随机点子');
    
    // 验证数据库连接
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log('数据库连接正常');
    } catch (connErr) {
      console.error('数据库连接测试失败:', connErr);
      return NextResponse.json(
        { error: '数据库连接失败', details: connErr instanceof Error ? connErr.message : String(connErr) },
        { status: 500 }
      );
    }
    
    // 获取所有点子的总数
    const count = await prisma.idea.count();
    console.log(`数据库中共有 ${count} 条点子`);
    
    // 如果没有数据，返回404
    if (count === 0) {
      console.log('没有找到点子');
      return NextResponse.json(
        { error: 'No ideas found' },
        { status: 404 }
      );
    }
    
    // 随机选择一个偏移量
    const skip = Math.floor(Math.random() * count);
    console.log(`随机偏移量: ${skip}`);
    
    // 获取随机点子
    const randomIdea = await prisma.idea.findFirst({
      skip: skip,
      take: 1,
    });

    if (!randomIdea) {
      console.log('通过偏移量未找到点子');
      return NextResponse.json(
        { error: 'No ideas found' },
        { status: 404 }
      );
    }

    console.log('成功获取随机点子:', { id: randomIdea.id });
    return NextResponse.json(randomIdea);
  } catch (error: unknown) {
    console.error('获取随机点子时出错:', error);
    
    // 详细记录错误信息
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('错误详情:', {
      message: errorMessage,
      stack: errorStack,
      env: process.env.NODE_ENV,
      hasDbUrl: !!process.env.DATABASE_URL,
      dbUrlLength: process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0
    });
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 