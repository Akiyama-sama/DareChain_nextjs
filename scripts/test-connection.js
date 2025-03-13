// 测试Prisma是否能正确连接到Supabase
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('正在连接到数据库...');
    
    // 尝试查询数据库
    const count = await prisma.idea.count();
    console.log(`成功! 数据库中有 ${count} 条创意点子记录。`);
    
    // 尝试获取前3条记录
    const ideas = await prisma.idea.findMany({
      take: 3,
    });
    
    console.log('前3条记录:');
    console.log(JSON.stringify(ideas, null, 2));
    
    return { success: true, count, ideas };
  } catch (error) {
    console.error('连接或查询数据库时出错:', error);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(result => {
    if (!result.success) {
      process.exit(1);
    }
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  }); 