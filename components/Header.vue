<template>
  <div class="h-full">
    <div class="head flex items-center h-full xl:w-1200 px-4 xl:px-0 mx-auto">
      <nuxt-link
        :to="`/${locale}`"
        class="pc_show base_width router-link-exact-active router-link-active"
      >
        <img
          style="height: 40px;"
          src="/img/logo.jpg"
          alt=""
        >
        <!-- <span class="clffffff font-bold fs30">盛曼网络</span> -->
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import intializePwa from '~/plugins/pwa'
import * as jsCokie from 'js-cookie'
export default {
  data () {
    return {
      showInstallPrompt: null,
      LoingToken: '',
      exchangerateDialogVisible: false,
      currentExchangeRate: "CNY - ￥",
      exchangerate: ['CNY - ￥', 'USD - $', 'EUR - €', 'RUB - ₽', 'VND - ₫', 'TRY - ₺', 'ARS - ARS$']
    }
  },
  computed: {
    ...mapState(['locale', 'token', 'UserInfo']),
  },
  async mounted () {
    // if(!this.$store.state.publicToken){
    //   this.$store.dispatch('SignToken');
    // }
    this.LoingToken = this.token;
    this.showInstallPrompt = await intializePwa()
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    window.addEventListener('beforeunload', (e) => this.beforeunloadFn())
    window.addEventListener('unload', (e) => this.unloadFn())
  },
  destroyed () {
    window.removeEventListener('beforeunload', e => this.beforeunloadFn());
    window.removeEventListener('unload', e => this.unloadFn());
  },
  methods: {
    unloadFn () {
      this._gap_time = new Date().getTime() - this._beforeUnload_time
      if (this._gap_time <= 5) {
        jsCokie.set('publicToken', '')
        jsCokie.set('token', '')
        var storage = window.localStorage
        storage.clear()
      }
    },
    beforeunloadFn () {
      this._beforeUnload_time = new Date().getTime()
    },
    walletTolink (item) {
      this.$router.push({ path: item })
      this.$store.commit('SET_MENU', 'wallet')
    },
    orderTolink (item) {
      this.$router.push({ path: item })
      this.$store.commit('SET_MENU', 'order')
    },
    userTolink (item) {
      if (item == '/user/logout') {
        this.$api.User.LoingOut().then((res) => {
          if (res.isSuccess) {
            this.$store.commit('SET_TOKEN', '')
            this.$message({
              message: '退出成功',
              center: true,
              type: 'success',
            })
            setTimeout(() => {
              this.$router.push(`/${this.locale}/Login`)
            }, 200)
          }
        })
        return false
      }
      this.$router.push({ path: item })
      this.$store.commit('SET_MENU', 'user')
    },
    SelectLangType (item) {
      if (this.locale !== item) {
        const link = this.$route.path.replace(
          `/${this.$store.state.locale}`,
          ''
        )
        this.$store.commit('SET_LANG', item)
        let hashValue = this.$route.hash
        this.$nextTick(() => {
          this.$router.replace(`${this.$i18n.getPath(link)}${hashValue}`)
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.dropdown-menu.el-dropdown-menu {
  background-color: #1d2538;
  border: none;
  border-radius: 0;
  padding: 0;
  width: 146px;
  /deep/.el-dropdown-menu__item {
    padding: 4px 10px;
    color: #fff;
  }
  /deep/.el-dropdown-menu__item:not(.is-disabled):hover,
  /deep/.el-dropdown-menu__item:focus {
    background-color: #4a5160;
    color: #02ad8f;
  }
  /deep/.popper__arrow {
    display: none;
  }
}
.border-cl010920 {
  border-color: #010920;
}
.exchangerate {
  /deep/.el-dialog__header {
    padding: 0;
  }
}
</style>