const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

/* 初始化数据库 */
const database = require('../database');

database(db);

// 获取用户配置信息
exports.getUsers = async () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users ORDER BY id DESC", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// 添加用户配置信息
exports.addUser = async (username, password, uid) => {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO users (username, password, uid) VALUES (?, ?, ?)", [username, password, uid], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// 获取定时任务执行log
exports.getLogs = async () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM schedule_log ORDER BY created_at DESC", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// 添加新的定时任务log
exports.addLogs = async (text) => {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO schedule_log (text) VALUES (?)", [text], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
