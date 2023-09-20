const path = require('path');

const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, '..', 'database', 'database.db');
const db = new sqlite3.Database(dbPath);

/* 初始化数据库 */
const database = require('../database');

database(db);

// 获取用户配置信息
exports.getUsers = async (status) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users ' + (status != undefined ? 'WHERE status = ? ' : '') + 'ORDER BY id DESC', [status], (err, rows) => {
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

// 用户配置：修改状态
exports.editStatus = async (id, status) => {
  return new Promise((resolve, reject) => {
    db.run("UPDATE users SET status = ? WHERE id = ?", [status, id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// 用户配置：删除用户
exports.deleteUser = async (id, status) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM users WHERE id = ?", [id], (err) => {
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
