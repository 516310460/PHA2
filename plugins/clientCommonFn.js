import Vue from 'vue'
import Kline from "../components/kline/js/kline.js";

// 全量引入，包含所有内置的技术指标和绘图标记
import { init } from 'klinecharts'
// // 引入部分功能，不包含内置的绘图标记
// import { init } from 'klinecharts/index.blank'
// // 引入基础功能，不包含内置的技术指标和绘图标记
// import { init } from 'klinecharts/index.simple'

export default (context, inject) => {

  context.$KlineInit = init
  inject('KlineInit', init)

  context.$Kline = Kline
  inject('Kline', Kline)
}