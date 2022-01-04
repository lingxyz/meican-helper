const config = require('../config')
const autoOrder = require('./autoOrder')

/**
 * 批量自动点餐
 */
module.exports = function() {
  config.users.forEach(item => {
    const { username, password } = item
    // todo: 随机等待1-5秒
    // 调用autoOrder
    autoOrder(username, password)
  })
}
