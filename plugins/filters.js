/*
 *定义所有的全局的过滤器..
 */
import Vue from 'vue'

const globalFilter = {}

//第一个参数为起始位置，第二个参数为结束位置
// 移除数组中的第二项
// array.remove(1);
// Array.prototype.remove = function (from, to) {
//   var rest = this.slice((to || from) + 1 || this.length);
//   this.length = from < 0 ? this.length + from : from;
//   return this.push.apply(this, rest);
// };

globalFilter.formatDate = now => {
  now = new Date(now);
  let year = now.getFullYear();
  let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1);
  let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
  let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
  let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
  let second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

// 截取商家名字..
globalFilter.sliceMerchantName = merchantName => {
  // merchantName: 商家名字..

  // 如果商家名字超过8位字符, 截取前8位字符..
  if (merchantName) {
    return merchantName.length > 8 ?
      merchantName.slice(0, 8) + '...' :
      merchantName
  } else {
    return merchantName
  }
}
// 截取价钱名字..
globalFilter.slicePriceName = merchantName => {
  // merchantName: 商家名字..

  // 如果商家名字超过8位字符, 截取前8位字符..
  if (merchantName) {
    return merchantName.length > 9 ?
      merchantName.slice(0, 6) + '...' :
      merchantName
  } else {
    return merchantName
  }
}

globalFilter.formatDateTable = (now, format = 'yyyy-MM-dd') => {
  if (!now) return ''
  now = new Date(now)
  var args = {
    'M+': now.getMonth() + 1,
    'd+': now.getDate(),
    'h+': now.getHours(),
    'm+': now.getMinutes(),
    's+': now.getSeconds(),
    'q+': Math.floor((now.getMonth() + 3) / 3), //quarter
    S: now.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (now.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var i in args) {
    var n = args[i]
    if (new RegExp('(' + i + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? n : ('00' + n).substr(('' + n).length)
      )
    }
  }
  return format
}

export default globalFilter

Object.keys(globalFilter).forEach(key => {
  Vue.filter(key, globalFilter[key])
})
