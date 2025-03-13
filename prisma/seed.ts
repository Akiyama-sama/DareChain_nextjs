import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
  },
  {
    chineseContent: "去水果摊试吃多点，说这么好吃不买可惜了，然后转头就走",
    englishContent: "Sample a lot of fruit at a fruit stand, say \"It's a shame not to buy something this delicious,\" and then walk away."
  },
  {
    chineseContent: "去彩票店买彩票，老板帮忙刮，然后说又不是我刮的付什么钱？",
    englishContent: "Buy a lottery ticket, have the owner scratch it, then say, \"Why should I pay?  I didn't scratch it.\""
  },
  {
    chineseContent: "问别人现在是几几年，然后大喊一声“我成功了”",
    englishContent: "Ask someone what year it is, then yell \"I did it!\" or \"It worked!\""
  },
  {
    chineseContent: "买一粒白糖",
    englishContent: "Buy a single grain of sugar."
  },
  {
    chineseContent: "买避孕套一直问有没有更小的，直到最小的时候问有没有便宜的，最后买保鲜膜",
    englishContent: "Keep asking for smaller condoms until you reach the smallest size, then ask if they have anything cheaper, and finally buy plastic wrap."
  },
  {
    chineseContent: "左手炸鸡右手冰淇淋去健身房站在别人面前说辛苦你了",
    englishContent: "Go to the gym with fried chicken in one hand and ice cream in the other, stand in front of someone working out, and say \"You're working hard.\""
  },
  {
    chineseContent: "买个姨妈巾，问收银员有没有男士款的",
    englishContent: "Buy a sanitary pad and ask the cashier if they have a men's version."
  },
  {
    chineseContent: "去苹果手机店里问老板有没有安卓手机",
    englishContent: "Go to an Apple Store and ask the owner if they have any Android phones."
  },
  {
    chineseContent: "去蜜雪冰城买四块钱的柠檬水，现金付一块，微信付一块，支付宝付一块，再跟路人借一块",
    englishContent: "Buy a 4-yuan lemonade at Mixue Ice Cream & Tea, paying 1 yuan in cash, 1 yuan with WeChat Pay, 1 yuan with Alipay, and borrowing 1 yuan from a passerby."
  },
  {
    chineseContent: "去超市里面买避孕套，然后问收银员怎么用？",
    englishContent: "Buy condoms at a supermarket and then ask the cashier how to use them."
  },
  {
    chineseContent: "买瓶矿泉水和一个面包给环卫工人吃",
    englishContent: "Buy a bottle of water and a bread roll for a sanitation worker."
  },
  {
    chineseContent: "去拿苹果手机去小米之家说华为万岁",
    englishContent: "Take an iPhone to a Xiaomi store and say \"Long live Huawei!\""
  },
  {
    chineseContent: "去餐馆买东西吃 吃完的时候 跟老板说这顿饭能不能拿东西换 在老板疑惑的时候 拿钱跟老板换",
    englishContent: "Eat at a restaurant, and when finished, ask the owner if you can exchange something for the meal. When the owner looks confused, offer to exchange money for the meal."
  },
  {
    chineseContent: "在出租车上问司机是做什么工作的",
    englishContent: "Ask a taxi driver what their job is."
  },
  {
    chineseContent: "去小米手机店问小米多少钱一斤",
    englishContent: "Go to a Xiaomi store and ask how much millet (the grain) costs per jin (a unit of weight)."
  },
  {
    chineseContent: "去买一块钱的东西，然后跟老板说便宜一块钱行不行？",
    englishContent: "Go to buy something that costs 1 yuan and ask the owner if they can make it 1 yuan cheaper."
  },
  {
    chineseContent: "去蜜雪冰城买一个冰淇淋，跟店员说我吃不了冷的，帮我加热",
    englishContent: "Buy an ice cream at Mixue Ice Cream & Tea and tell the staff you can't eat cold things, asking them to heat it up."
  },
  {
    chineseContent: "拿模型机去修手机",
    englishContent: "Take a dummy phone to a phone repair shop."
  },
  {
    chineseContent: "带着麦当劳鸡块去肯德基，然后给店员说少了一块儿",
    englishContent: "Take McDonald's chicken nuggets to KFC and tell the staff one is missing."
  },
  {
    chineseContent: "去买女士内衣然后问店员有没有男士款能不能试穿一下，最后让店员推荐一款",
    englishContent: "Go to buy women's underwear and ask the staff if they have a men's version and if you can try it on, then ask the staff to recommend one."
  },
  {
    chineseContent: "去麦当劳大喊肯德基万岁",
    englishContent: "Shout \"Long live KFC!\" in a McDonald's."
  },
  {
    chineseContent: "去超市买一大包纸巾，然后在结账的时候大声说今晚能爽一爽了",
    englishContent: "Buy a large pack of tissues at the supermarket and loudly say \"Tonight's going to be great!\" at checkout."
  },
  {
    chineseContent: "给妈妈买一朵花然后说妈妈我爱你",
    englishContent: "Buy a flower for your mom and tell her you love her."
  },
  {
    chineseContent: "去超市买商品的商标",
    englishContent: "Try to buy just the product label at a supermarket."
  },
  {
    chineseContent: "去星巴克点一杯星巴克，不管店员说什么都说我就要一杯星巴克，最后走的时候怒气冲冲的说一句星巴克都没有开什么星克",
    englishContent: "Go to Starbucks and order a \"Starbucks.\" No matter what the barista says, keep insisting you just want a \"Starbucks.\"  Leave angrily, saying, \"Why open a Starbucks if you don't even have Starbucks?\""
  },
  {
    chineseContent: "去网吧听数学网课，然后再问邻桌的人数学题",
    englishContent: "Go to an internet cafe to listen to an online math class, then ask the person next to you math questions."
  },
  {
    chineseContent: "随机找一位路人礼貌问路，但是问他家在哪儿",
    englishContent: "Politely ask a random passerby for directions, but ask them where *their* house is."
  },
  {
    chineseContent: "去刮彩票，无论中了多少都要大叫加跳起来",
    englishContent: "Scratch a lottery ticket and shout and jump up and down, regardless of how much you win."
  },
  {
    chineseContent: "找一家人多的小餐馆，点一碗招牌，尝一口。然后大声喊：“太好吃了！妈妈的味道，妈妈！",
    englishContent: "Find a busy small restaurant, order their signature dish, take a bite, and shout: \"It's so delicious!  It tastes like Mom's cooking!  Mom!\""
  },
  {
    chineseContent: "在广州塔下大喊：东方明珠太壮观啦！",
    englishContent: "Stand under the Canton Tower and shout: \"The Oriental Pearl Tower is so magnificent!\""
  },
  {
    chineseContent: "去一个人多的厕所，出来的时候抹一嘴花生酱，在厕所门口找个路人指着厕所对他说：避雷这家店，没农村旱厕好吃",
    englishContent: "Go to a crowded restroom, smear peanut butter on your mouth, and tell a passerby outside, pointing to the restroom: \"Avoid this place, it's not as good as a rural outhouse.\""
  },
  {
    chineseContent: "买盒避孕套，结账时问老板这种泡泡糖什么味道的，边说边拿出一个递给老板",
    englishContent: "Buy a box of condoms, ask the owner at checkout what flavor this \"bubble gum\" is, and offer one to the owner."
  },
  {
    chineseContent: "去超市买一大块冰",
    englishContent: "Buy a large block of ice at the supermarket."
  },
  {
    chineseContent: "在大街上随便找一个陌生人激动的跟他说好久不见",
    englishContent: "Enthusiastically greet a random stranger on the street as if you haven't seen them in a long time."
  },
  {
    chineseContent: "去驿站找工作人员大声问：我买的飞机杯怎么还没到",
    englishContent: "Loudly ask a parcel station worker: \"Where's the masturbator I ordered?\""
  },
  {
    chineseContent: "在人多的地方大声倒数十声过后走开",
    englishContent: "Loudly count down from ten in a crowded place and then walk away."
  },
  {
    chineseContent: "买一粒大米",
    englishContent: "Buy a single grain of rice."
  },
  {
    chineseContent: "多买点一次性筷子，在商场厕所门口守着，给每个进去的人都发一双，同时说句用餐愉快",
    englishContent: "Buy a lot of disposable chopsticks, stand outside a mall restroom, and give a pair to everyone who enters, saying \"Enjoy your meal.\""
  },
  {
    chineseContent: "在游泳馆的泳池里钓鱼",
    englishContent: "Go fishing in a swimming pool."
  },
  {
    chineseContent: "点两杯奶茶，等外卖小哥送到的时候给外卖小哥一杯",
    englishContent: "Order two cups of milk tea and give one to the delivery person when they arrive."
  },
  {
    chineseContent: "去宠物医院给自己体检",
    englishContent: "Go to a pet hospital for a personal checkup."
  },
 {
    chineseContent: "买鱼去钓鱼佬旁边放生",
    englishContent: "Buy a fish and release it next to someone who is fishing."
  },
  {
    chineseContent: "拿一支笔去找送传单的，当他递传单的时候签个名",
    englishContent: "Take a pen to someone handing out flyers and sign the flyer when they offer it to you."
  },
  {
    chineseContent: "去彩票店买彩票，刮完大喊我穿越回来就是为了今天",
     englishContent: "Buy a lottery ticket at a lottery shop, scratch it off, and then shout, 'I traveled through time just for this!'"
  },
  {
    chineseContent: "去药店买晕车药 故意说成避晕药",
    englishContent: "Go to a pharmacy and ask for motion sickness medicine, but intentionally mispronounce it to a similar-sounding nonsensical word like 'anti-dizzying medicine'."
  },
  {
    chineseContent: "去理发店跟老板说能帮我把头发剪长点吗",
    englishContent: "Go to a barbershop and ask the barber if they can cut your hair longer."
  },
  {
    chineseContent: "去水果店里买菠萝，问店员这是比奇堡吗",
    englishContent: "Go to a fruit store, buy a pineapple, and ask the clerk, 'Is this Bikini Bottom?'"
  },
  {
    chineseContent: "去水果店问不甜能不要钱吗，然后买一大袋柠檬",
    englishContent: "Go to a fruit store and ask if you don't have to pay if the fruit isn't sweet, and then buy a large bag of lemons."
  },
  {
    chineseContent: "拿三好学生奖状去网吧，问能不能打折",
    englishContent: "Take a 'Three Goods Student' award certificate (for good morals, studies, and health) to an internet cafe and ask if it qualifies you for a discount."
  },
  {
    chineseContent: "拿炸鸡去宠物医院让医生救一下",
    englishContent: "Take fried chicken to a pet hospital and ask the vet to save it."
  },
    {
    chineseContent: "戴上假发去理发店剪头，剪完头后把假发摘下来说剪的真不错",
    englishContent: "Wear a wig to a barber shop, and remove it after the haircut, and say, 'nice job on the haircut'."
  },
  {
    chineseContent: "8月31日去问招不招暑假工",
    englishContent: "Go to ask if they are hiring for summer jobs on August 31st."
  },
    {
    chineseContent: "印几张自己的寻人启事发给别人",
    englishContent: "Print a few missing person posters of yourself and give them to people."
  },
    {
    chineseContent: "拿个手机去手机店问老板：抢来的收不收。然后说最后说是抢购抢来的",
    englishContent: "Take a phone to a phone store and ask the boss: 'Do you buy stolen phones?'. Then clarify you meant 'snatched up during a flash sale'."
  },
 {
    chineseContent: "去小米之家问店员小米多少钱一斤",
    englishContent: "Go to a Xiaomi Store and ask the staff how much millet (the grain) costs per jin (a unit of weight)."
  },
    {
    chineseContent: "尾随一条狗",
    englishContent: "Follow a dog around."
  },
    {
    chineseContent: "去公园看大爷下棋，不管大爷下哪里都摇头叹气",
    englishContent: "Go to a park, watch elderly men play chess, and shake your head and sigh disappointedly, regardless of the moves they make."
  },
    {
    chineseContent: "买东西时随便跟着一个路人，他买什么你就买什么",
    englishContent: "Follow a random person while shopping and buy whatever they buy."
  },
      {
    chineseContent: "坐出租车兜一圈回到原地",
    englishContent: "Take a taxi ride in a circle back to your starting point."
  },
{
    chineseContent: "去超市用购物车装满避孕套并在里面逛一圈",
    englishContent: "Fill a shopping cart with condoms and walk around the supermarket."
  },
{
    chineseContent: "在背上写数学题， 跟医生说背后有问题",
    englishContent: "Write math problems on your back and tell the doctor you have a problem on your back."
  },
 {
    chineseContent: "带蚂蚁去宠物店洗澡",
    englishContent: "Take ants to a pet store for a bath."
  },
{
    chineseContent: "买避孕套的时候跟老板说，我上次吃这个口香糖被噎到了",
    englishContent: "While buying condoms, tell the cashier, 'I choked on this gum last time'."
  },
  {
    chineseContent: "去理发店门口看见一个人理完出来就笑他",
    englishContent: "Stand outside a barbershop and laugh at someone after they get a haircut."
  },
    {
    chineseContent: "去打印店偷拍老板。然后叫他打印出来贴在他的店",
    englishContent: "Take a secret photo of the owner of a print shop. Then ask them to print it out and stick it in their shop."
  },
 {
    chineseContent: "去理发店门口看见一个人理完出来就笑他",
    englishContent: "Stand outside a barbershop and laugh at someone after they get a haircut."
  },
    {
    chineseContent: "当看店家的面点他家的外卖，地址填家，然后做外卖小哥的车回家",
    englishContent: "Order takeout from a restaurant while sitting inside. Enter your home address, then ride home with the delivery driver."
  },
    {
    chineseContent: "去没去过的饭店，说“老样子”",
    englishContent: "Go to a restaurant you've never been to before and say, 'The usual'."
  },
   {
    chineseContent: "去超市结账时，从一堆冥币里面拿出真币结账，并说：抱歉啊，刚复活有点不习惯",
    englishContent: "At the supermarket checkout, pull out real money from a pile of joss paper (hell money) and say, 'Sorry, I just got resurrected, I'm still getting used to things'."
  },
   {
    chineseContent: "游乐场坐旋转木马全程尖叫",
    englishContent: "Ride a carousel at an amusement park and scream the entire time."
  },
   {
    chineseContent: "在多人的地方向空气下跪求婚，说就算只有我看得见你，我也要娶你",
    englishContent: "In a crowded place, get down on one knee and propose to the air, saying, 'Even if only I can see you, I want to marry you'."
  },
   {
    chineseContent: "去漫展找不cos的人合影",
    englishContent: "Go to a comic convention and take photos with people *not* in cosplay."
  },
{
    chineseContent: "买东西结账装哑巴，打字表示自己想说的话，最后一直打不出来急的语音输入",
    englishContent: "Pretend to be mute when paying for something, type what you want to say, and when you can't 'type' it out, urgently use voice input."
  },
   {
    chineseContent: "在艺术馆，对着空白的墙进行鉴赏",
    englishContent: "In an art museum, contemplate and appreciate a blank wall."
  },
   {
    chineseContent: "去打印一张自己的照片，告诉路人是自己的双胞胎弟弟走丢了，等过个五分钟再去找这个路人，还是拿着这张照片说自己的双胞胎哥哥走丢了",
    englishContent: "Print a picture of yourself. Tell a stranger that your twin brother is missing.  Five minutes later, find the same person, show them the same picture, and say your twin *brother* is missing."
  },
    {
    chineseContent: "去开锁店叫师傅开共享电动车的锁",
    englishContent: "Go to a locksmith and ask them to unlock a shared electric scooter."
  },
  {
    chineseContent: "去宠物店问问能不能做绝育，然后自己躺在手术台上",
    englishContent: "Go to a pet store and ask if they can perform a sterilization procedure, then lie down on the operating table."
  },
   {
    chineseContent: "把象棋里的车带去车店里面洗车",
    englishContent: "Take the chariot/rook piece from a Chinese chess set to a car wash."
  },
    {
    chineseContent: "和爸妈说我有对象了，以后掏出象棋里的两个象。请把这些数据改成数据格式那样的输出，englishContent字段由你自己翻译，能让英语母语者理解就可以了",
    englishContent: "Tell your parents you have a partner, then show them two elephant pieces from a Chinese chess set."
  },
];

async function main() {
  await prisma.idea.createMany({
    data: ideas,

  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });