const { PrismaClient } = require('@prisma/client')

const ideas = [
  {
    chineseContent: "挑战找别人要微信，然后当面删掉",
    englishContent: "Ask for someone's WeChat, then delete it right in front of them"
  },
  {
    chineseContent: "在公交车上喊：我看看哪个小朋友坐得最笔直，最端正",
    englishContent: "Announce on the bus: Let's see which child sits the most upright and properly"
  },
  {
    chineseContent: "随机找一个小孩，称自己是十年后的他",
    englishContent: "Approach a random child and claim to be their future self from ten years later."
  },
  {
    chineseContent: "问出租车司机走不走司机说走你说那你走吧",
    englishContent: "Ask a taxi driver if they're going.  If they say yes, tell them \"Then go ahead.\""
  },
  {
    chineseContent: "找个小孩说：我是你未来的儿子",
    englishContent: "Tell a child: \"I am your future son.\""
  },
  {
    chineseContent: "装哑巴去超市买东西结完账以后说一声谢谢",
    englishContent: "Pretend to be mute while shopping at a supermarket, then say \"Thank you\" after paying."
  },
  {
    chineseContent: "去超市公共厕所喊一声，我吃饱了",
    englishContent: "Shout \"I'm full!\" in a supermarket public restroom."
  },
  {
    chineseContent: "去便利店拿一盒避孕套，问店员多少钱，然后露出失望的表情拿一盒保鲜膜",
    englishContent: "At a convenience store, pick up a box of condoms, ask the price, then look disappointed and grab a box of plastic wrap instead."
  },
  {
    chineseContent: "把购车买了看看店员什么反应",
    englishContent: "Fill a shopping cart and see how the store clerk reacts."
  },
  {
    chineseContent: "去商店买一条黑丝，并笑嘻嘻的说回去有的玩了",
    englishContent: "Buy a pair of black stockings at a store and say with a grin, \"I'm going to have some fun with these.\""
  }
] // 为了避免一次性添加太多数据，我们先添加前10条

const prisma = new PrismaClient()

async function main() {
  console.log('开始导入数据...')
  try {
    // 批量创建数据
    const result = await prisma.idea.createMany({
      data: ideas,
      skipDuplicates: true, // 跳过重复数据
    })
    
    console.log(`成功导入 ${result.count} 条数据`)
    
    // 验证导入的数据
    const count = await prisma.idea.count()
    console.log(`数据库中现有 ${count} 条数据`)
    
  } catch (error) {
    console.error('导入过程中发生错误:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 