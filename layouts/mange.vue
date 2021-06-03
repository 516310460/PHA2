<template>
  <div class="bkffffff h-full">
    <el-scrollbar
      ref="myScrollbar"
      class="h-full MainScrollbar"
    >
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container style="max-height:100%;min-height:100vh;">
        <el-aside width="200px">
          <client-only>
            <el-menu
              text-color="#454545"
              class="h-full"
              active-text-color="#02AD8F"
              :default-active="activeIndex"
              @select="selectFun"
              router
            >
              <client-only><NavMenu :nav-menus="menuType=='user'?userMenuData:menuType=='wallet'?walletMenuData:orderMenuData"></NavMenu></client-only>
            </el-menu>
          </client-only>
        </el-aside>
        <el-container>
          <el-main class="bkF8F8F8">
            <nuxt />
          </el-main>
        </el-container>
      </el-container>
      <Footer />
    </el-container>
    </el-scrollbar>
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
      dialogVisible: true,
      isShowFooter: true,//是否显示底部activeIndex: 'aa',
      activeIndex: '',
      userMenuData: [
        {
          //一级
          entity: {
            id: 0,
            name: "/user",
            icon: "icon-my",
            alias: "总览",
            value: '/user'
          }
        }, {
          //一级
          entity: {
            id: 1,
            name: "/user/payment",
            icon: "icon-shoukuan",
            alias: "收款方式",
            value: '/user/payment'
          }
        }, {
          //一级
          entity: {
            id: 2,
            name: "/user/security",
            icon: "icon-security",
            alias: "账户安全",
            value: '/user/security'
          }
        }, {
          //一级
          entity: {
            id: 3,
            name: "/user/taskCenter",
            icon: "el-icon-document",
            alias: "任务中心",
            value: '/user/taskCenter'
          }
        },
        {
          //一级
          entity: {
            id: 4,
            name: "systemManage",
            icon: "icon-form_adjust",
            alias: "设置"
          },
          //二级
          childs: [
            {
              entity: {
                id: 5,
                name: "/user/site/basicInfo",
                icon: "",
                alias: "基本信息",
                value: "/user/site/basicInfo"
              }
            },
            {
              entity: {
                id: 6,
                name: "/user/site/preference",
                icon: "",
                alias: "偏好设置",
                value: "/user/site/preference"
              }
            }
          ]
        },
        {
          //一级
          entity: {
            id: 7,
            name: "/rebate/Index",
            icon: "el-icon-message",
            alias: "返佣",
            value: "/rebate/Index"
          }
        },
      ],
      walletMenuData: [
        {
          //一级
          entity: {
            id: 0,
            name: "/wallet/Index",
            icon: "icon-pay_selected",
            alias: "钱包总览",
            value: "/wallet/Index"
          }
        }, {
          //一级
          entity: {
            id: 1,
            name: "/wallet/spotAccount/main",
            icon: "",
            alias: "现货账户",
            value: "/wallet/spotAccount/main"
          }
        }, {
          //一级
          entity: {
            id: 2,
            name: "/wallet/c2c/Index",
            icon: "",
            alias: "C2C账户",
            value: "/wallet/c2c/Index"
          }
        }, {
          //一级
          entity: {
            id: 3,
            name: "/wallet/history",
            icon: "",
            alias: "钱包历史记录",
            value: '/wallet/history'
          }
        }
      ],
      orderMenuData: [
        {
          //一级
          entity: {
            id: 4,
            name: "systemManage",
            icon: "icon-pay_selected",
            alias: "现货订单"
          },
          //二级
          childs: [
            {
              entity: {
                id: 5,
                name: "/order/commission/current",
                icon: "",
                alias: "当前委托",
                value: "/order/commission/current"
              }
            },
            {
              entity: {
                id: 6,
                name: "/order/commission/history",
                icon: "",
                alias: "历史委托",
                value: "/order/commission/history"
              }
            },
            {
              entity: {
                id: 6,
                name: "/order/commission/historyDeal",
                icon: "",
                alias: "历史成交",
                value: "/order/commission/historyDeal"
              }
            }
          ]
        }, {
          //一级
          entity: {
            id: 7,
            name: "/Buycoins/FiatOrder",
            icon: "icon-tuandui",
            alias: "C2C订单",
            value: "/Buycoins/FiatOrder"
          }
        },
      ]
    }
  },
  computed: {
    ...mapState(['isCollapse', 'isChildCollapse', 'menuType'])
  },
  watch: {
    $route (to, from) {
      //此处使用这个可以等节点渲染后再获取节点
      this.$nextTick(() => {
        this.activeIndex = this.$route.path;
        if (this.$refs['myScrollbar']) {
          this.$refs['myScrollbar'].wrap.scrollTop = 0;  //这句重置滚动条高度
        }
      })
    }
  },
  mounted () {
    this.$nextTick(()=>{
      if(this.$route.path.indexOf('user')!=-1){
        this.$store.commit('SET_MENU','user')
      }else if (this.$route.path.indexOf('wallet')!=-1){
        this.$store.commit('SET_MENU','wallet')
      }else if (this.$route.path.indexOf('order')!=-1){
        this.$store.commit('SET_MENU','order')
      }
      this.activeIndex = this.$route.path;
    })

  },
  destroyed () {
    this.$bus.$off("OnReload")
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
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    selectFun (e) {
      console.log('激活', e)
    }
  }
}
</script>

<style lang='scss' scoped>
.el-header {
  padding: 0;
}
.el-main {
  padding: 0;
}
</style>
