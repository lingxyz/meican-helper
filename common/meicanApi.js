const axios = require('axios')
const FormData = require('form-data');
const qs = require('qs');
const moment = require('moment')
/**
 * 美餐API请求封装
 */
const date = () => moment().format('YYYY-MM-DD')
const time = '10:00'

/**
 * 登录接口
 */
async function login(username, password) {
  var data = new FormData();
  data.append('grant_type', 'password');
  data.append('meican_credential_type', 'password');
  data.append('username', username);
  data.append('password', password);
  data.append('username_type', 'mobile'); // username / mobile

  var config = {
    method: 'post',
    url: 'https://meican.com/preference/preorder/api/v2.0/oauth/token?remember=true&client_id=Xqr8w0Uk4ciodqfPwjhav5rdxTaYepD&client_secret=vD11O6xI9bG3kqYRu9OyPAHkRGxLh4E',
    headers: {
      ...data.getHeaders()
    },
    data : data
  };

  let response
  try {
    response = await axios(config)
  } catch (error) {
    console.log(error)
  }

  const remember = response.headers['set-cookie'][0].split(';')[0].split('=')[1]
  response.data.remember = remember
  console.log(`用户 ${username} 登陆成功！${Date()}`)
  return response.data
}

/**
 * 获取点餐结果和tabUniqueId参数
 * 已点餐: dateList[0].calendarItemList[0].corpOrderUser.restaurantItemList[0].dishItemList.length > 1
 * tabUniqueId: dateList[0].calendarItemList[0].userTab.uniqueId
 */
async function ordersShow(remember, access_token) {
  var config = {
    method: 'get',
    url: `https://meican.com/forward/api/v2.1/calendaritems/list?withOrderDetail=false&beginDate=${date()}&endDate=${date()}&client_id=Xqr8w0Uk4ciodqfPwjhav5rdxTaYepD&client_secret=vD11O6xI9bG3kqYRu9OyPAHkRGxLh4E`,
    headers: {
      'Cookie': `remember=${remember};`,
      'Authorization': `bearer ${access_token}`
    }
  };
  const { data } = await axios(config)
  return data
}

/**
 * 餐厅列表
 */
 async function restaurantsList(remember, tabUniqueId, access_token) {
  var config = {
    method: 'get',
    url: `https://meican.com/forward/api/v2.1/restaurants/list?tabUniqueId=${tabUniqueId}&targetTime=${date()}+${time}&client_id=Xqr8w0Uk4ciodqfPwjhav5rdxTaYepD&client_secret=vD11O6xI9bG3kqYRu9OyPAHkRGxLh4E`,
    headers: {
      'Cookie': `remember=${remember};`,
      'Authorization': `bearer ${access_token}`
    }
  };
  const { data } = await axios(config)
  return data
}

/**
 * 餐品列表
 */
async function restaurantsShow(remember, tabUniqueId, uniqueId, access_token) {
  var config = {
    method: 'get',
    url: `https://meican.com/forward/api/v2.1/restaurants/show?tabUniqueId=${tabUniqueId}&targetTime=${date()}+${time}&restaurantUniqueId=${uniqueId}&client_id=Xqr8w0Uk4ciodqfPwjhav5rdxTaYepD&client_secret=vD11O6xI9bG3kqYRu9OyPAHkRGxLh4E`,
    headers: {
      'Cookie': `remember=${remember};`,
      'Authorization': `bearer ${access_token}`
    }
  };
  const { data } = await axios(config)
  return data
}

/**
 * 下单
 */
async function orderAdd(remember, tabUniqueId, dishId, access_token) {
  var data = {
    order: JSON.stringify([{ count: 1, dishId: dishId }]),
    remarks: JSON.stringify([{ dishId: dishId, remark: '' }]),
    tabUniqueId: tabUniqueId,
    targetTime: `${date()} ${time}`
  };

  var config = {
    method: 'post',
    url: 'https://meican.com/forward/api/v2.1/orders/add?client_id=Xqr8w0Uk4ciodqfPwjhav5rdxTaYepD&client_secret=vD11O6xI9bG3kqYRu9OyPAHkRGxLh4E',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': `remember=${remember};`,
      'Authorization': `bearer ${access_token}`
    },
    data : qs.stringify(data)
  };
  const response = await axios(config)
  return response.data
}

module.exports = {
	login,
  ordersShow,
  restaurantsList,
  restaurantsShow,
  orderAdd
}