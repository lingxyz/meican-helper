const axios = require('axios')
const FormData = require('form-data');
/**
 * 美餐API请求封装
 */

/**
 * 登录接口
 */
async function login(username, password) {
  var data = new FormData();
  data.append('grant_type', 'password');
  data.append('meican_credential_type', 'password');
  data.append('username', username);
  data.append('password', password);
  data.append('username_type', 'mobile');

  var config = {
    method: 'post',
    url: 'https://meican.com/preference/preorder/api/v2.0/oauth/token?remember=true&client_id=Xqr8w0Uk4ciodqfPwjhav5rdxTaYepD&client_secret=vD11O6xI9bG3kqYRu9OyPAHkRGxLh4E',
    headers: { 
      ...data.getHeaders()
    },
    data : data
  };
  const response = await axios(config)
  const remember = response.headers['set-cookie'][0].split(';')[0].split('=')[1]
  response.data.remember = remember
  return response.data
}

/**
 * 点餐结果
 */
async function ordersShow(remember) {
  var config = {
    method: 'get',
    url: 'https://meican.com/preorder/api/v2.1/orders/show?uniqueId=a4dc5b310ec3&type=CORP_ORDER&progressMarkdownSupport=true&x=1641263359228&client_id=Xqr8w0Uk4ciodqfPwjhav5rdxTaYepD&client_secret=vD11O6xI9bG3kqYRu9OyPAHkRGxLh4E',
    headers: { 
      'Cookie': `remember=${remember};`
    }
  };
  const { data } = await axios(config)
  return data
}

/**
 * todo: 商家列表
 */
 async function calendaritemsList() {

}

/**
 * todo: 下单
 */
async function order() {

}


module.exports = {
	login,
  ordersShow
}