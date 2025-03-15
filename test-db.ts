import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // 创建测试数据
    const newIdea = await prisma.idea.create({
      data: {
        chineseContent: "测试内容",
        englishContent: "Test content"
      }
    })
    console.log('Created new idea:', newIdea)

    // 查询所有数据
    const allIdeas = await prisma.idea.findMany()
    console.log('All ideas:', allIdeas)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 