/**
 * 入口文件
 */
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const router = require('./controllers');
const schedules = require('./schedules');

const app = new Koa();
app.use(bodyParser());
/* 加载后端接口 */
app.use(router.routes());
/* 加载前端文件 */
app.use(serve('views'));

/* 开启服务 */
app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});

/* 开启定时任务 */
schedules();