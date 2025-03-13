import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const ideas = await prisma.idea.findMany({
      orderBy: {
        createTime: 'desc',
      },
    });

    return NextResponse.json(ideas);
  } catch (error) {
    console.error('获取所有点子失败:', error);
    return NextResponse.json(
      { error: '获取所有创意点子失败' },
      { status: 500 }
    );
  }
} 