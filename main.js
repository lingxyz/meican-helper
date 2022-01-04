const schedule = require('./lib/schedule')
const meicanApi = require('./lib/meicanApi')
const config = require('./config')

/**
 * 入口文件（主逻辑）
 */
;(async function main() {
  // todo: 改为循环用户，且随机等待1-5秒
  const { username, password } = config.users[0]
	// 登录，拿到 remember = token
	const { remember } = await meicanApi.login(username, password)
	// 请求当前点餐状态
	const { restaurantItemList } = await meicanApi.ordersShow(remember)
	if (restaurantItemList?.length === 0) {
		// todo: 拉取商家和商品列表
		// todo: 下单
	} else {
		console.log("用户XXX已点餐，自动点餐失败！")
	}
})()

// 每天0点10分 8点 跑一次自动点餐脚本
const crons = ['0 10 0 * * *', '0 0 8 * * *']
// const crons = ['* * * * * *']
crons.forEach(cron => schedule(cron, meicanApi.login))