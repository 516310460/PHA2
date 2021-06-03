import Vue from 'vue'
import Element from 'element-ui'

// 全局修改dialog点击蒙层不可关闭状态
Element.Dialog.props.closeOnClickModal.default = false // 全局关闭

/**重置message，防止重复点击重复弹出message弹框 */
const showMessage = Symbol('showMessage')
class DoneMessage {
  [showMessage](type, options, single) {
      if (single) {
          if (document.getElementsByClassName('el-message').length === 0) {
              Element.Message[type](options)
          }
      } else {
          Element.Message[type](options)
      }
  }
  info(options, single = true) {
      this[showMessage]('info', options, single)
  }
  warning(options, single = true) {
      this[showMessage]('warning', options, single)
  }
  error(options, single = true) {
      this[showMessage]('error', options, single)
  }
  success(options, single = true) {
      this[showMessage]('success', options, single)
  }
}
// export const message = new DoneMessage();

/* 按需引入 */
export default (context, inject) => {
  Vue.use(Element)
  context.$message = new DoneMessage()
  inject('message', new DoneMessage())
}
