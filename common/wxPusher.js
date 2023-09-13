/**
 * wxpusher推送
 * 若新增用户，需扫码关注 https://wxpusher.zjiecode.com/api/qrcode/R3Y5lCFAWquwQQ3voYpdcQcL4LALBKJcPHeHIMWroucNwBAgB1ZnMWsQKSKelwCj.jpg
 */

const request = require('sync-request')

module.exports = function(summary, content, uid) {
  const body = request('POST', 'http://wxpusher.zjiecode.com/api/send/message', {
    json: {
      "appToken":"AT_XrUjpNo2UDSx86NCkcYE6aMRsTefJpFK",
      "summary": summary || "消息摘要未设置", //消息摘要，显示在微信聊天页面或者模版消息卡片上，限制长度100，可以不传，不传默认截取content前面的内容。
      "content": content || "消息内容未设置",
      "contentType":1,//内容类型 1表示文字  2表示html(只发送body标签内部的数据即可，不包括body标签) 3表示markdown
      "topicIds":[ //发送目标的topicId，是一个数组！！！，也就是群发，使用uids单发的时候， 可以不传。
          // 123
      ],
      "uids":[//发送目标的UID，是一个数组。注意uids和topicIds可以同时填写，也可以只填写一个。
        uid || 'UID_5MkDcdqLsVHEJdxIoA6JwjUwnHvB'
      ],
      "url":"https://workbench.zhangling.site/" //原文链接，可选参数
    }
  }).getBody().toString()

  console.log(`${new Date().toLocaleString()}: wxpusher execute result: ${body}`)

}