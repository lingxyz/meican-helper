module.exports = (db) => {
  db.serialize(() => {
    /* 创建表：用户配置表 */
    db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT COMMENT '美餐用户名。默认手机号@shinho.net.cn',
      password TEXT COMMENT '美餐密码。初始密码123456' DEFAULT '123456',
      uid TEXT COMMENT 'wxpusher推送id。 若新增用户，需扫码关注 https://wxpusher.zjiecode.com/api/qrcode/R3Y5lCFAWquwQQ3voYpdcQcL4LALBKJcPHeHIMWroucNwBAgB1ZnMWsQKSKelwCj.jpg',
      defaultOrderType TEXT COMMENT '默认方式选择：全部随机random、第一个=0（说明：当商家变动，自定义失效时）' DEFAULT 'random',
      orderTypeDate TEXT COMMENT '自定义点餐-日期。全部/周几(周日=0，周一=1)' DEFAULT 'all',
      orderTypeKeyword TEXT COMMENT '自定义点餐-关键字。若不为空，则按照关键字筛选。再根据筛选结果随机。',
      status INTEGER COMMENT '状态：1开启，0未开启' DEFAULT 1)`)
    // db.run("INSERT INTO users (username, password, uid) VALUES ('13127977660@shinho.net.cn', '123456', 'UID_5MkDcdqLsVHEJdxIoA6JwjUwnHvB')");

    /* 创建表：任务执行日志表 */
    db.run("CREATE TABLE IF NOT EXISTS schedule_log (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')))");
    // 插入数据
    db.run("INSERT INTO schedule_log (text) VALUES ('应用初始化成功')");
  });
}