const autoOrder = require('./autoOrder')
const service = require('../services');

/**
 * 批量自动点餐
 */

module.exports = async () => {
  const users = await service.getUsers();
  users.forEach(item => {
    const timer = Math.round(Math.random()*10) // 随机等待0-10秒
    setTimeout(() => autoOrder(item), timer) // 调用autoOrder
  })
}
