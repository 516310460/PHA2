<template>
  <div class="h-full">
    <nuxt v-if="isReload" />
    <!-- 离线展示 -->
    <NetWorkError v-if="$coinpool.isOffline"></NetWorkError>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      token: '',
      clientHeight: 0,
      isReload: true,
      dialogVisible: true
    }
  },
  computed: {
    ...mapState(['isCollapse', 'isChildCollapse'])
  },
  watch: {
    $route (to, from) {
      //此处使用这个可以等节点渲染后再获取节点
      this.$nextTick(() => {
        if (this.$refs['myScrollbar']) {
          this.$refs['myScrollbar'].wrap.scrollTop = 0;  //这句重置滚动条高度
        }
      })
    }
  },
  destroyed () {
    this.$bus.$off("OnReload")
  },
  created () { },
  mounted () {
    this.$nextTick(() => {
      this.$bus.on("OnReload", () => {
        this.reload()
      })
    })
  },
  methods: {
    ...mapMutations({
      setStoreData: 'setStoreData',
      setBreadcrumb: 'setBreadcrumb'
    }),
    reload () {
      this.isReload = false
      this.$nextTick(() => {
        this.isReload = true
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.el-header {
  padding: 0;
}
</style>
