const meicanApi = require('../common/meicanApi')
const wxPusher = require("../common/wxPusher")
const services = require('../services')

/**
 * 自动点餐
 */
module.exports = function({username, password, uid, defaultOrderType, orderTypeDate, orderTypeKeyword}) {
  ;(async function main() {
    try {
      /* step1: 登录，拿到 remember = token */
      const { data: {remember, access_token} } = await meicanApi.login(username, password)
      console.log('remember: ', remember)
      console.log('access_token: ', access_token)
      /* step2: 请求当前点餐结果 */
      // todo: 由于总是返回前一已点餐品，所以终止检查逻辑
      const { dateList } = await meicanApi.ordersShow(remember, access_token)

      const tabUniqueId = dateList[0].calendarItemList[0].userTab.uniqueId
      // const isOrdered = !!dateList[0].calendarItemList[0].corpOrderUser
      // if (isOrdered) {
      //   console.log(`用户 ${username} 已点餐，自动点餐失败！餐品为 ${dateList[0].calendarItemList[0].corpOrderUser.restaurantItemList[0].dishItemList[0].dish.name}`)
      //   return
      // }
      /* step3: 拉取餐厅列表 */
      const { restaurantList } = await meicanApi.restaurantsList(remember, tabUniqueId, access_token)
      // console.log("餐厅列表拉取成功！", restaurantList)
      /* step4: 获取餐品列表 */
      let dishLists = [];
      for (const item of restaurantList) {
        const { dishList } = await meicanApi.restaurantsShow(remember, tabUniqueId, item.uniqueId, access_token)
        // dishList餐品从1开始。0为标题，不可点餐，需要去除。
        dishList.shift();
        // console.log("餐品列表拉取成功！", dishList)
        dishLists = dishLists.concat(dishList);
      }
      console.log("餐品列表拉取成功！", dishLists)
      /* step5: 下单 */
      // 下单自定义
      let dishId;
      // if (orderType.length) {
        // todo: 自定义下单逻辑实现
      // }
      // 关键字随机
      // 兜底：指定第几个 / 全部随机
      if (!dishId) {
        if (defaultOrderType === 0) {
          dishId = dishLists[0].id
        } else {
          var randomIndex = Math.floor(Math.random() * dishLists.length);
          dishId = dishLists[randomIndex].id
        }
      }
      console.log('>>>>>>>>', dishId)
      const orderResponseData = await meicanApi.orderAdd(remember, tabUniqueId, dishId, access_token)
      if (orderResponseData.status === 'SUCCESSFUL') {
        console.log(`用户 ${username} 自动点餐成功，餐品为 ${dishLists[randomIndex].name}`);
        services.addLogs(`用户 ${username} 自动点餐成功，餐品为 ${dishLists[randomIndex].name}`);
      } else throw new Error('点餐失败');
    } catch (error) {
      const errorMessage = `code: ${error.response.status}, data: ${JSON.stringify(error.response.data)}`
      /* 点餐失败推送通知 */
      if (error.response.data.error == 'CORP_MEMBER_ORDER_EXISTS') {// 已点餐。不推送。但记录日志。
        wxPusher(`用户 ${username} 自动点餐失败！请手动点餐！`, `点击上方链接重新点餐！↑↑↑\n账号：${username}\npassword:${password}\n报错信息：${errorMessage}`, uid)
      }
      console.log(`用户 ${username} 自动点餐失败！error信息：` + errorMessage);
      services.addLogs(`用户 ${username} 自动点餐失败！error信息：` + errorMessage);
    }
  })()
}