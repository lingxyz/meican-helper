const meicanApi = require('../lib/meicanApi')
const config = require('../config')

/**
 * 自动点餐
 */
module.exports = function(username, password) {
  ;(async function main() {
    // 登录，拿到 remember = token
    const { remember } = await meicanApi.login(username, password)
    // 请求当前点餐结果
    const { dateList } = await meicanApi.ordersShow(remember)
    const tabUniqueId = dateList[0].calendarItemList[0].userTab.uniqueId
    const isOrdered = !!dateList[0].calendarItemList[0].corpOrderUser
    if (isOrdered) {
      console.log(`用户 ${username} 已点餐，自动点餐失败！`)
      return
    }
    // 拉取餐厅列表
    const { restaurantList } = await meicanApi.restaurantsList(remember, tabUniqueId)
    // 获取餐品列表
    // todo: 循环 restaurantList，promise.all请求，拼凑结果
    const { dishList } = await meicanApi.restaurantsShow(remember, tabUniqueId, restaurantList[0].uniqueId)
    // 下单
    // todo: dishList从1开始，0为标题，下单自定义，抽离
    try {
      const orderResponseData = await meicanApi.orderAdd(remember, tabUniqueId, dishList[1].id)
      if (orderResponseData.status === 'SUCCESSFUL') {
        console.log(`用户 ${username} 自动点餐成功，餐品为 ${dishList[1].name}`)
      }
    } catch (error) {
      console.log(`用户 ${username} 已点餐，自动点餐失败！`)
    }
  })()
}