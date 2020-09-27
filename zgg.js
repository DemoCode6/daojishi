//获取应用实例
const app = getApp()
// 注意点1: 这里初始化全局的 定时器对象 ，保证一次只有一个定时器在计时
var interval = new Object();
Page({
  data: {
    // 初始显示时间
    countDownDay: 10,
    countDownHour: 10,
    countDownMinute: 10,
    countDownSecond: 10,
  },
 
  onLoad: function() {
 
  },
  onShow: function() {
    //注意点2: 因为下拉刷新 或者重新加载界面（从子界面返回）都会走此方法，所以在注意点3处，需要清空上次的定时器
 
    // 第一种 开始计时方式 请求到数据就开始计时
    this.startTimer(100000);
  },
  // 点击按钮 开启定时器
  startTimeTap: function() {
    // 调用定时器 600s 开始倒计时
    //  第二种开始计时方式 点击按钮
    this.startTimer(100000);
  },
  //开始计时
  startTimer: function(currentstartTimer) {
 
    //注意点3: 清除定时器 为了保证每次只有一个定时器，和下拉刷新 配合，否则会导致 计时数据跳动，因为创建了多个定时器。
    clearInterval(interval);
    interval = setInterval(function() {
      // 秒数
      var second = currentstartTimer;
      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr; 
      // 小时位
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
 
      // 分钟位
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
 
      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
 
      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      currentstartTimer--;
      console.log("---12-12---- " + currentstartTimer);
      if (currentstartTimer <= 0) {
        clearInterval(interval);
        this.setData({
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(this), 1000);
  },
 
  // 下拉刷新
  onPullDownRefresh: function() {
    // 第二种开始计时方式 下拉刷新
    this.startTimer(600);
  },
 
})