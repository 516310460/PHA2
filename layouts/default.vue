<template>
  <div class="h-full">
    <el-scrollbar
      ref="myScrollbar"
      class="h-full MainScrollbar"
    >
      <el-container style="height: 100vh;">
        <el-header class="relative z-10 bk222E4B">
          <Header />
        </el-header>
        <nuxt />
        <!-- <Footer v-if="isShowFooter" /> -->
      </el-container>
    </el-scrollbar>

    <NetWorkError v-if="$coinpool.isOffline"></NetWorkError>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      clientHeight: 0,
      dialogVisible: true,
      isShowFooter: true,//是否显示底部
      ws: null
    }
  },
  computed: {
    ...mapState(['isCollapse', 'pageLoading', 'token', 'publicToken'])
  },
  watch: {
    $route (to, from) {

      //只有在币币交易、算力交易k线页面才会隐藏底部
      if (this.$route.name && (this.$route.name.includes('lang-Trade-pro-id') || this.$route.name.includes('lang-HashRate-pro-id'))) {
        this.isShowFooter = false;
      } else {
        this.isShowFooter = true;
      }
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
    // 聊天历史记录
    this.$bus.$off("Chat")

    this.$bus.$off("getKline")
    this.$bus.$off("getDepth")
    this.$bus.$off("getOrder")
    this.$bus.$off("getMarket24hr")
    this.$bus.$off("getMarketCoin")
    this.$bus.$off("getMarket24hrSignle")

    // 取消订阅
    this.$bus.$off("UnsubKline")
    this.$bus.$off("UnsubDepth")
    this.$bus.$off("UnsubOrder")
    this.$bus.$off("UnsubMarket24hr")
    this.$bus.$off("UnsubMarketCoin")
    this.$bus.$off("UnsubMarket24hrSignle")
  },
  created () {
    //只有在币币交易、算力交易k线页面才会隐藏底部
    if (this.$route.name && (this.$route.name.includes('lang-Trade-pro-id') || this.$route.name.includes('lang-HashRate-pro-id'))) {
      this.isShowFooter = false;
    }
  },
  mounted () {
    this.$nextTick(() => {

      this.ws = new this.$WebSocketClient(`ws://192.168.1.88:6600/stream`)
      this.ws.doOpen()
      this.ws.on('message', this.onMessage)


      this.$bus.on("getKline", (data) => {
        this.ws.send({ "ID": null, "Key": "Kline", "Type": "sub", "Data": data.pair })
      })
      this.$bus.on("getDepth", (data) => {
        this.ws.send({ "ID": null, "Key": "Depth", "Type": "sub", "Data": data.pair })
      })
      this.$bus.on("getOrder", (data) => {
        this.ws.send({ "ID": null, "Key": "Order", "Type": "sub", "Data": data.pair })
      })
      this.$bus.on("getMarket24hrSignle", (data) => {
        this.ws.send({ "ID": null, "Key": "Market24hrSignle", "Type": "sub", "Data": data.pair })
      })
      this.$bus.on("getMarket24hr", (data) => {
        this.ws.send({ "ID": null, "Key": "Market24hr", "Type": "sub" })
      })
      this.$bus.on("getMarketCoin", (data) => {
        this.ws.send({ "ID": null, "Key": "MarketCoin", "Type": "sub" })
      })
      //取消订阅k线
      this.$bus.on("UnsubKline", (data) => {
        this.ws.send({ "ID": null, "Key": "Kline", "Type": "unsub", "Data": data.pair })
      })
      //取消订阅深度
      this.$bus.on("UnsubDepth", (data) => {
        this.ws.send({ "ID": null, "Key": "Depth", "Type": "unsub", "Data": data.pair })
      })
      //取消订阅最新交易
      this.$bus.on("UnsubOrder", (data) => {
        this.ws.send({ "ID": null, "Key": "Order", "Type": "unsub", "Data": data.pair })
      })
      //取消订阅最新交易
      this.$bus.on("UnsubMarket24hr", () => {
        this.ws.send({ "ID": null, "Key": "Market24hr", "Type": "unsub" })
      })
      //取消订阅最新交易
      this.$bus.on("UnsubMarketCoin", () => {
        this.ws.send({ "ID": null, "Key": "MarketCoin", "Type": "unsub" })
      })
      //取消订阅单交易对24小时行情信息
      this.$bus.on("UnsubMarket24hrSignle", (data) => {
        this.ws.send({ "ID": null, "Key": "Market24hrSignle", "Type": "unsub", "Data": data.pair })
      })
      // 聊天历史记录
      this.$bus.on("Chat", data => {
        this.ws.send(data)
      })

      this.$bus.on("OnReload", () => {
        this.reload()

        // 路由跳转时销毁当前的websocket
        this.$router.afterEach((to, from) => {
          //只有在币币交易k线页面才会隐藏底部
          if (this.$route.name && (this.$route.name.includes('lang-Trade-pro-id') || this.$route.name.includes('lang-HashRate-pro-id'))) {
            this.isShowFooter = false;
          }
        });
        this.$bus.on("hideFooter", (data) => {
          this.isShowFooter = data.isShow;
        })
      })
    })
  },
  methods: {
    ...mapMutations({
      setStoreData: 'setStoreData',
      setBreadcrumb: 'setBreadcrumb'
    }),
    onMessage (data) {
      // 聊天历史记录
      if (data.sub == 'Chat') {
        this.$bus.emit("GetChat", data.data)
      }
      if (data.sub == "Kline") {
        this.$bus.emit("Kline", data.data)
      }
      if (data.sub == "Depth") {
        this.$bus.emit("Depth", data.data)
      }
      if (data.sub == "Order") {
        this.$bus.emit("Order", data.data)
      }
      if (data.sub == "Market24hr") {
        this.$bus.emit("Market24hr", data.data)
      }
      if (data.sub == "MarketCoin") {
        this.$bus.emit("MarketCoin", data.data)
      }
      if (data.sub == "Market24hrSignle") {
        this.$bus.emit("Market24hrSignle", data.data)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.el-header {
  padding: 0;
}
</style>
