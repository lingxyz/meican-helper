const schedule = require('node-schedule');

/**
 * 定时任务二次封装
 * @param {*} cron 
 * @param {*} cb 
 */
module.exports = function(cron, cb) {
  schedule.scheduleJob(cron, () => {
    cb()
    console.log(`schedule execute at ${cron}`);
  });
}