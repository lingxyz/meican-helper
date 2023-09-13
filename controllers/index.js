const Router = require('koa-router');
const router = new Router();
const service = require('../services');

// 用户配置：查询
router.get('/api/users', async (ctx) => {
  try {
    const users = await service.getUsers();
    ctx.body = { status: 200, data: users };
  } catch (err) {
    ctx.throw(500, err);
  }
});

// 用户配置：新增
router.post('/api/users', async (ctx) => {
  const username = ctx.request.body.username;
  const password = ctx.request.body.password;
  const uid = ctx.request.body.uid;

  try {
    await service.addUser(username, password, uid);
    ctx.body = { status: 200, message: 'user config added' };
  } catch (err) {
    ctx.throw(500, err);
  }
});

// 定时任务日志：查询
router.get('/api/schedule/logs', async (ctx) => {
  try {
    const logs = await service.getLogs();
    ctx.body = { status: 200, data: logs };
  } catch (err) {
    ctx.throw(500, err);
  }
});

// 定时任务日志：新增
router.post('/api/schedule/logs', async (ctx) => {
  const text = ctx.request.body.text;

  try {
    await service.addLogs(text);
    ctx.body = { status: 200, message: 'Schedule log added' };
  } catch (err) {
    ctx.throw(500, err);
  }
});

module.exports = router