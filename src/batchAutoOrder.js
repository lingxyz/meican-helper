const config = require('../config')
const autoOrder = require('./autoOrder')

/**
 * 批量自动点餐
 */
module.exports = function() {
  config.users.forEach(item => {
    const timer = Math.round(Math.random()*10) // 随机等待0-10秒
    setTimeout(() => autoOrder(item), timer) // 调用autoOrder
  })
}
