<template>
  <div class="w-full trade-box">
    <div class="clE7EEFF flex items-center">
      <div class="m-auto w-full h220 text-center bgd-buy">
        <div class="clffffff fs26 css-1voejji flex justify-center">
          <span class="inline-block w16 h16 left-angle"></span>
          <span>快捷买卖数字货币</span>
          <span class="inline-block w16 h16 right-angle"></span>
        </div>
        <div class="css-q1xouo fs18 line my-4">0手续费交易数字货币</div>
        <el-collapse-transition>
          <div class="py-2 fs18 w595 m-auto">
            币池C2C是一个点对点交易平台，用户可以在币池C2C直接与商家用想要的价格和付款方式买卖比特币和其他数字货币。
          </div>
        </el-collapse-transition>
      </div>
    </div>
    <div class="nav-menu w1348 m-auto h60 flex justify-between">
      <ul class="flex items-center h60">
        <li
          @click="activeMenu = '自选区'"
          :class="activeMenu == '自选区' && 'selected-co02AD8F'"
          class="hover-cl02AD8F h28"
        >
          <nuxt-link
            class="hover-cl02AD8F h28 flex items-center justify-center"
            :to="`/${locale}/Buycoins/Trade`"
          >
            <span
              :class="activeMenu == '自选区' ? 'clffffff' : 'cl9FA9C0'"
              class="fs14 h28"
            >自选区</span>
          </nuxt-link>
        </li>
        <li
          @click="activeMenu = '快捷区'"
          :class="activeMenu == '快捷区' && 'selected-co02AD8F'"
          class="ml-10"
        >
          <nuxt-link
            class="hover-cl02AD8F h28 flex items-center justify-center"
            :to="`/${locale}/Buycoins/QuickTrade`"
          >
            <span
              :class="activeMenu == '快捷区' ? 'clffffff' : 'cl9FA9C0'"
              class="fs14 h28"
            >快捷区</span>
          </nuxt-link>
        </li>
      </ul>
      <ul class="flex items-center h60 clffffff">
        <li class="hover-cl02AD8F mx-4 flex items-center justify-center">
          <img
            class="h16"
            src="/img/icons/icon_video.svg"
            alt=""
          />
          <span class="ml-1 mb-0.5">视频教程</span>
        </li>
        <li
          v-show="token"
          @click="activeMenu = '订单'"
          :class="activeMenu == '订单' && 'selected-co02AD8F'"
          class="ml-10 mr-4"
        >
          <nuxt-link
            class="hover-cl02AD8F h28 flex items-center justify-center"
            :to="`/${locale}/Buycoins/FiatOrder`"
          >
            <img
              class="h16"
              src="/img/icons/icon_order.svg"
              alt=""
            />
            <span class="ml-1 mb-0.5">订单</span>
          </nuxt-link>
        </li>
        <li
          v-show="token"
          class="hover-cl02AD8F mx-4 flex items-center"
        >
          <el-dropdown trigger="click">
            <span class="el-dropdown-link flex items-center clffffff">
              <img
                class="h16"
                src="/img/icons/icon_more.svg"
                alt=""
              />
              <span class="ml-1 mb-0.5">更多</span>
            </span>
            <el-dropdown-menu
              :append-to-body="false"
              class="dropdown-menu top-1 inline-block w-40"
              slot="dropdown"
              style="top: 21px; left: -90px"
            >
              <el-dropdown-item class="clffffff flex items-center">
                <div
                  @click="settingPay()"
                  class="clffffff w-full flex items-center"
                >
                  <img
                    class="i-icon"
                    src="/img/icons/icon_setup.svg"
                    alt=""
                  />
                  <span class="ml-1">支付设置</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div
                  v-show="UserInfo.userType == 2"
                  class="clffffff flex items-center"
                  @click="$verification.isOpenPayment()"
                >
                  <img
                    class="i-icon"
                    src="/img/icons/icon_addto.svg"
                    alt=""
                  />
                  <span class="ml-1">发布新广告</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item class="clffffff flex items-center">
                <nuxt-link
                  v-show="UserInfo.userType == 2"
                  :to="`/${locale}/Buycoins/Business/AD/MyList`"
                >
                  <img
                    class="i-icon"
                    src="/img/icons/icon_advertisement.svg"
                    alt=""
                  />
                  <span class="ml-1">我的广告</span>
                </nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <nuxt-link
                  v-show="UserInfo.userType == 1"
                  class="clffffff flex items-center"
                  :to="`/${locale}/Buycoins/Business/Apply`"
                >
                  <img
                    class="i-icon"
                    src="/svg/icon_authentication.svg"
                    alt=""
                  />
                  <span class="ml-1">申请商家</span>
                </nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item class="clffffff flex items-center">
                <nuxt-link
                  class="clffffff flex items-center"
                  :to="`/${locale}/commonProblem/_index`"
                >
                  <img
                    class="i-icon"
                    src="/img/icons/icon_problem.svg"
                    alt=""
                  />
                  <span class="ml-1">常见问题</span>
                </nuxt-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Header',
  props: {
    currentMenu: {
      type: String,
      default: '自选区',
    },
  },
  data () {
    return {
      activeMenu: '',
    }
  },
  computed: {
    ...mapState(['locale', 'UserInfo', 'token']),
  },
  mounted () {
    this.$nextTick(() => {
      this.activeMenu = this.currentMenu
    })
  },
  methods: {
    settingPay () {
      this.$store.commit('SET_MENU', 'user')
      this.$router.push(`/${this.locale}/user/payment`)
    },
  },
}
</script>

<style lang='scss' scoped>
.trade-box {
  .bgd-buy {
    padding: 18px 0;
    min-height: 128px;
    background: url('/img/Home/bgd-more1.png') top center no-repeat;
    background-size: 100% 220px;
  }
}

.dropdown-menu.el-dropdown-menu {
  background-color: #101728;
  border: none;
  border-radius: 0;
  padding: 0;
  /deep/.el-dropdown-menu__item {
    padding: 0 10px;
  }
  /deep/.el-dropdown-menu__item:not(.is-disabled):hover,
  /deep/.el-dropdown-menu__item:focus {
    background-color: #172036;
    color: #fff;
  }
  /deep/.popper__arrow {
    display: none;
  }
}

.i-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-size: 100%;
}
.left-angle {
  background: url('/img/buy/left-angle.png') no-repeat;
}
.right-angle {
  background: url('/img/buy/right-angle.png') no-repeat;
  margin-top: 23px;
}
</style>