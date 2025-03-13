import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    // 获取所有点子的总数
    const count = await prisma.idea.count();
    
    // 如果没有数据，返回404
    if (count === 0) {
      return NextResponse.json(
        { error: 'No ideas found' },
        { status: 404 }
      );
    }
    
    // 随机选择一个偏移量
    const skip = Math.floor(Math.random() * count);
    
    // 获取随机点子
    const randomIdea = await prisma.idea.findFirst({
      skip: skip,
      take: 1,
    });

    if (!randomIdea) {
      return NextResponse.json(
        { error: 'No ideas found' },
        { status: 404 }
      );
    }

    return NextResponse.json(randomIdea);
  } catch (error: unknown) {
    console.error('Error fetching random idea:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
} 