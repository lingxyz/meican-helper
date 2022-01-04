const schedule = require('./lib/schedule')
const autoOrder = require('./src/autoOrder')

/**
 * 入口文件（主逻辑）
 */
// test: 立即执行一次
// autoOrder()
// 每天0点10分 8点 跑一次自动点餐脚本
const crons = ['0 10 0 * * *', '0 0 8 * * *']
// const crons = ['* * * * * *']
crons.forEach(cron => schedule(cron, autoOrder))