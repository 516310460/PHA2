<template>
    <div class="myPopper" @mousedown.stop>
        <div class="popper-inner">
          <slot></slot>
        </div>
    <div ref="tri"></div>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    maxHt: {
      type: Number,
      default: 400,
    },
    width: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {}
  },
  mounted() {
    //要求父元素的大小和父元素的input输入框的大小一致
    let pt = this.$parent.$el
    let el = this.$el
    let docElm = document.documentElement
    let body = document.body //pt.removeChild(el);
    body.appendChild(el)
    // 组件监听页面resize只能用addEventListener，否则不会生效
    window.addEventListener('resize', this.checkTransfer, false)
    // 监听scroll事件的事件传递必须使用捕获阶段，让外部元素事件先触发
    document.addEventListener('scroll', this.checkTransfer, true)
  },
  watch: {
    visible: function (val) {
      if (val) {
        let list = document.querySelectorAll('.myPopper')
        for (let i = 0; i < list.length; i++) {
          list[i].style.display = 'none'
        }
        let pt = this.$parent.$el
        let rect = pt.getBoundingClientRect()
        let _w = document.documentElement.clientWidth
        let _h = document.documentElement.clientHeight
        let scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop
        let scrollLeft =
          document.documentElement.scrollLeft ||
          window.pageXOffset ||
          document.body.scrollLeft
        let top = rect.top
        let bottom = _h - rect.bottom
        let left = rect.left
        let width = rect.width
        if (bottom > top) {
          let maxht = bottom < this.maxHt ? bottom : this.maxHt
          this.$el.style.cssText =
            'max-height:' +
            maxht +
            'px;width:' +
            (this.width == -1 ? width : this.width) +
            'px;left:' +
            left +
            'px;top:' +
            rect.bottom +
            'px;display:block;'
        //   this.$refs.tri.style.cssText =
        //     'border-width:6px;border-color:transparent;border-style:solid;left:20px;top:-1px;border-bottom-color:#DCDDDF'
        } else {
          let maxht = top < this.maxHt ? top : this.maxHt
          this.$el.style.cssText =
            'max-height:' +
            maxht +
            'px;width:' +
            (this.width == -1 ? width : this.width) +
            'px;left:' +
            left +
            'px;bottom:' +
            (bottom - -rect.height) +
            'px;display:block'
        //   this.$refs.tri.style.cssText =
        //     'border-width:6px;border-color:transparent;border-style:solid;left:20px;bottom:-1px;border-top-color:#DCDDDF;'
        }
      } else {
        this.$el.style.display = 'none'
      }
    },
  },
  methods:{
      checkTransfer(){
          if (this.visible) {
        let list = document.querySelectorAll('.myPopper')
        for (let i = 0; i < list.length; i++) {
          list[i].style.display = 'none'
        }
        let pt = this.$parent.$el
        let rect = pt.getBoundingClientRect()
        let _w = document.documentElement.clientWidth
        let _h = document.documentElement.clientHeight
        let scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop
        let scrollLeft =
          document.documentElement.scrollLeft ||
          window.pageXOffset ||
          document.body.scrollLeft
        let top = rect.top
        let bottom = _h - rect.bottom
        let left = rect.left
        let width = rect.width
        if (bottom > top) {
          let maxht = bottom < this.maxHt ? bottom : this.maxHt
          this.$el.style.cssText =
            'max-height:' +
            maxht +
            'px;width:' +
            (this.width == -1 ? width : this.width) +
            'px;left:' +
            left +
            'px;top:' +
            rect.bottom +
            'px;display:block;'
        //   this.$refs.tri.style.cssText =
        //     'border-width:6px;border-color:transparent;border-style:solid;left:20px;top:-1px;border-bottom-color:#DCDDDF'
        } else {
          let maxht = top < this.maxHt ? top : this.maxHt
          this.$el.style.cssText =
            'max-height:' +
            maxht +
            'px;width:' +
            (this.width == -1 ? width : this.width) +
            'px;left:' +
            left +
            'px;bottom:' +
            (bottom - -rect.height) +
            'px;display:block'
        //   this.$refs.tri.style.cssText =
        //     'border-width:6px;border-color:transparent;border-style:solid;left:20px;bottom:-1px;border-top-color:#DCDDDF;'
        }
      } else {
        this.$el.style.display = 'none'
      }
      }
  },
  beforeDestory() {
    document.body.removeChild(this.$el)
  },
}
</script>
<style>
.myPopper {
  position: absolute;
  z-index: 20000;
  box-sizing: border-box;
  padding: 10px 0;
  display: none;
  margin: 3px 0;
}
.popper-inner {
  background: #f6f6f6;
  border: 1px solid #DCDDDF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  height: 100%;
  box-sizing: border-box;
  padding: 5px;
  overflow: auto;
  border-radius: 4px;
}
.popper-triangle {
  position: absolute;
  z-index: 2;
  width: 0;
  height: 0;
}
</style>