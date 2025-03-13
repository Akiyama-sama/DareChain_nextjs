import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 获取所有点子的总数
    const count = await prisma.idea.count();
    
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
  } catch (error) {
    console.error('Error fetching random idea:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 