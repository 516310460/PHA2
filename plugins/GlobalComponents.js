import Vue from 'vue'
import QrcodeVue from 'qrcode.vue'
import { GridLayout, GridItem } from 'vue-grid-layout'
import fullscreen from 'vue-fullscreen'
import ICountUp from 'vue-countup-v2'

Vue.use(fullscreen)

// 二维码
Vue.component('QrcodeVue', QrcodeVue)
// 格子拖拽
Vue.component('GridLayout', GridLayout)
Vue.component('GridItem', GridItem)
// 数字
Vue.component('ICountUp', ICountUp)
