import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;

    const idea = await prisma.idea.findUnique({
      where: {
        id,
      },
    });

    if (!idea) {
      return NextResponse.json(
        { error: '未找到指定的创意点子' },
        { status: 404 }
      );
    }

    return NextResponse.json(idea);
  } catch (error) {
    console.error('获取点子失败:', error);
    return NextResponse.json(
      { error: '获取创意点子失败' },
      { status: 500 }
    );
  }
} 