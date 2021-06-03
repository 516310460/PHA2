import Vue from 'vue';
import Loading from '../components/TVpublic/page-loading';

const Mask = Vue.extend(Loading);

const directive = {};
directive.install = Vue => {
  if (Vue.prototype.$isServer) return;

  const toggleLoading = (el, binding) => {
      if (binding.value) {
          el.appendChild(el.mask);
          el.domInserted = true;
      } else {
          el.mask.style.opacity = 0
          setTimeout(() => {
              el.mask.parentNode && el.mask.parentNode.removeChild(el.mask)
          }, 200)
      }
  }
  Vue.directive('buybit-loading', {
      bind(el, binding, vnode, oldVnode) {
          const mask = new Mask({
              el: document.createElement('div')
          });
          el.instance = mask
          el.mask = mask.$el
          binding.value && toggleLoading(el, binding)
      },
      update: function(el, binding) {
          if (binding.oldValue !== binding.value) {
              toggleLoading(el, binding)
          }
      },
      unbind: function(el, binding) {
          if (el.domInserted) {
              el.mask &&
                  el.mask.parentNode &&
                  el.mask.parentNode.removeChild(el.mask);
          }
      }
  })


  Vue.directive('focus', {
      inserted: function(el) {
          el.focus()
      }
  })

  /***
   * 防抖 单位时间只触发最后一次
   *  @param {?Number|300} time - 间隔时间
   *  @param {Function} fn - 执行事件
   *  @param {?String|"click"} event - 事件类型 例："click"
   *  @param {Array} binding.value - [fn,event,time]
   *  例：<el-button v-debounce="[reset,`click`,300]">刷新</el-button>
   *  也可简写成：<el-button v-debounce="[reset]">刷新</el-button>
   */
  Vue.directive('debounce', {
    inserted: function(el, binding) {
        let [fn, event = "click", time = 300] = binding.value
        let timer
        el.addEventListener(event, () => {
            timer && clearTimeout(timer)
            timer = setTimeout(() => fn(), time)
        })
    }
  })

  /***
  *  节流 每单位时间可触发一次
  *  第一次瞬间触发，最后一次不管是否达到间隔时间依然触发
  * 【考虑到input的change事件】
  *  @param {?Number|300} time - 间隔时间
  *  @param {Function} fn - 执行事件
  *  @param {?String|"click"} event - 事件类型 例："click"
  *  @param {Array} binding.value - [fn,event,time]
  *  例：<el-button v-throttle="[reset,`click`,300]">刷新</el-button>
  *  传递参数则：<el-button v-throttle="[()=>reset(param),`click`,300]">刷新</el-button>
  */
  Vue.directive('throttle', {
    inserted: function(el, binding) {
        let [fn, event = "click", time = 300] = binding.value
        let timer, timer_end;
        el.addEventListener(event, () => {
            if (timer) {
                clearTimeout(timer_end);
                return timer_end = setTimeout(() => fn(), time);
            }
            fn();
            timer = setTimeout(() => timer = null, time)
        })
    }
  })

  // 点击区域之外
  Vue.directive('clickOutside', {
    /*
    @param el 指令所绑定的元素
    @param binding {Object} 
    @param vnode vue编译生成的虚拟节点
    * 使用：v-click-outside="refreshShow = false"
    */
    bind: function (el, binding, vNode) {
      if (!validate(binding)) return
  
      // Define Handler and cache it on the element
      function handler(e) {
        if (!vNode.context) return
  
        // some components may have related popup item, on which we shall prevent the click outside event handler.
        var elements = e.path || (e.composedPath && e.composedPath())
        elements && elements.length > 0 && elements.unshift(e.target)
  
        if (el.contains(e.target) || isPopup(vNode.context.popupItem, elements)) return
  
        el.__vueClickOutside__.callback(e)
      }
  
      // add Event Listeners
      el.__vueClickOutside__ = {
        handler: handler,
        callback: binding.value
      }
      const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
      !isServer(vNode) && document.addEventListener(clickHandler, handler)
    },
  
    update: function (el, binding) {
      if (validate(binding)) el.__vueClickOutside__.callback = binding.value
    },
  
    unbind: function (el, binding, vNode) {
      // Remove Event Listeners
      const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
      !isServer(vNode) && el.__vueClickOutside__ && document.removeEventListener(clickHandler, el.__vueClickOutside__.handler)
      delete el.__vueClickOutside__
    }
  });

}

function validate(binding) {
  if (typeof binding.value !== 'function') {
    console.warn('[Vue-click-outside:] provided expression', binding.expression, 'is not a function.')
    return false
  }

  return true
}

function isPopup(popupItem, elements) {
  if (!popupItem || !elements)
    return false

  for (var i = 0, len = elements.length; i < len; i++) {
    try {
      if (popupItem.contains(elements[i])) {
        return true
      }
      if (elements[i].contains(popupItem)) {
        return false
      }
    } catch(e) {
      return false
    }
  }

  return false
}

function isServer(vNode) {
  return typeof vNode.componentInstance !== 'undefined' && vNode.componentInstance.$isServer
}

export default directive;