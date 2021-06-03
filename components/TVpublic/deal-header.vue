<template>
  <div class='header media-screen'>
    <div class="head-menu fl">
      <div class="new-money">
        <div class="money-type">
          <span class="type-normal">{{symblefrom}}/{{symbleto}}</span>
        </div>
        <div class="new-money-list">
          <div class="new-money-list-content">
            <span class="new-money-title">最新价</span>
            <p
              class="new-money-num"
              v-if="countData.close"
            >
              <span class="new-money-dot">{{countData.close || ''}}</span>
            </p>
            <p
              v-else
              class="new-money-num"
            >
              <span class="new-money-dot">--</span>
            </p>
          </div>
          <div class="new-money-list-content">
            <span class="new-money-title">24H涨跌</span>
            <p
              class="new-money-num"
              v-if="countData.percent"
            >
              <span
                class="new-money-dot"
                :class="countData.percent >= 0 ? 'rise' : 'fall'"
              >{{countData.percent || '0'}} %</span>
            </p>
            <p
              v-else
              class="new-money-num"
            >
              <span class="new-money-dot">--</span>
            </p>
          </div>
          <div class="new-money-list-content">
            <span class="new-money-title">24H最高价</span>
            <p
              class="new-money-num"
              v-if="countData.high"
            >
              <span class="new-money-dot">{{countData.high || ''}}</span>
            </p>
            <p
              v-else
              class="new-money-num"
            >
              <span class="new-money-dot">--</span>
            </p>
          </div>
          <div class="new-money-list-content">
            <span class="new-money-title">24H最低价</span>
            <p
              class="new-money-num"
              v-if="countData.low"
            >
              <span class="new-money-dot">{{countData.low || ''}}</span>
            </p>
            <p
              v-else
              class="new-money-num"
            >
              <span class="new-money-dot">--</span>
            </p>
          </div>
          <div class="new-money-list-content">
            <span class="new-money-title">24H成交量</span>
            <p
              class="new-money-num"
              v-if="countData.vol"
            >
              <span class="new-money-dot">{{countData.vol || ''}}</span>
            </p>
            <p
              v-else
              class="new-money-num"
            >
              <span class="new-money-dot">--</span>
            </p>
          </div>
        </div>
        <section class="money-theme fr">
          <i
            v-if="background == 'day'"
            @click="changeTheme(true)"
            class="iconfont icon-Exchange_trading_night cl24 cuso"
          ></i>
          <i
            v-else
            @click="changeTheme(false)"
            class="iconfont icon-Exchange_trading_day cl24 cuso"
          ></i>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import * as jsCokie from 'js-cookie'

export default {
  components: {
  },
  props: {
    symbleParameArray: '',
    dailyDetail: {
      type: Object,
      default: function () {
        return {}
      }
    },
    dcs: {
      type: Object,
      default: function () {
        return {}
      }
    },
    symblefrom: '',
    symbleto: ''
  },
  data () {
    return {
      count: [],//24小时累计
      countData: [],//24小时累计
      background: '',
    };
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.background = this.$store.state.background
      this.init();
    })
  },
  methods: {
    init () {
      let coinid = this.$route.params.id ? this.$route.params.id.replace('_', '-') : '';
      coinid = coinid.toUpperCase();
      this.count = null;
      this.count = this.$sseApi.Trade.countData(coinid);
      this.count.addEventListener('TodayCount', (e) => {
        let res = JSON.parse(e.data)
        this.countData = res
        if (this.countData) {
          this.$bus.emit('newClose', this.countData);
        }
      });
    },
    //切换主题颜色
    changeTheme (state) {
      if (state) {
        this.$store.commit('SET_BACKGROUND', 'night')
      } else {
        this.$store.commit('SET_BACKGROUND', 'day')
      }
      this.$bus.emit("changeTheme");
    }
  },
  //销毁前调用
  destroyed () {
    this.count.close();
  },
}

</script>

<style scoped rel="stylesheet/scss" lang="scss">
@media screen and (max-width: 1760px) {
  .media-screen {
    .new-money {
      .new-money-list .new-money-list-content {
        padding-right: 20px;
      }
    }
  }
}

@media screen and (max-width: 1600px) {
  .media-screen {
    .header-user-info_wallet {
      display: none;
    }
    .new-money .money-type {
      // margin: 0 10px;
    }
    .new-money .money-type:after {
      margin-left: 10px;
    }
  }
}

@media screen and (max-width: 1300px) {
  .media-screen.header {
    // padding: 0 15px;
  }

  .media-screen {
    .beta {
      margin: 0 15px 0 10px;
    }
  }
}

@media screen and (max-width: 1280px) {
  .media-screen {
    .language .login,
    .language .register {
      padding: 0 15px;
    }
  }
}

@media screen and (max-width: 1200px) {
  .media-screen.header {
    // padding: 0 10px;
  }

  .media-screen {
    .new-money .money-type {
      // margin: 0 10px;
    }
    .language .login,
    .language .register {
      padding: 0 10px;
    }
  }
}

.header-user-info {
  .user-info-block {
    float: left;
  }
}

.new-money {
  position: relative;
  height: 100%;

  .select_background {
    display: inline-block;
    height: 24px;
    border: 1px solid #1e222a;
    background-color: #1e222a;
    line-height: 24px;
    border-radius: 2px;
    text-align: center;
    margin-left: 10px;
    vertical-align: middle;
  }

  .select_background .select_background_day,
  .select_background .select_background_night {
    display: inline-block;
    height: 22px;
    width: 24px;
    background-size: 14px 14px;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
  .select_background .active {
    background-color: #15181f;
  }

  .select_background_day {
    background-image: url('../../static/images/day.svg');
  }

  .select_background_day.active {
    background-image: url('../../static/images/day-active.svg');
  }

  .select_background_night {
    background-image: url('../../static/images/night.svg');
  }

  .select_background_night.active {
    background-image: url('../../static/images/night-active.svg');
  }

  .right-content {
    height: 100%;
    line-height: 56px;
    position: relative;
    float: right;
  }
  .money-type {
    cursor: pointer;
    float: left;
    height: 100%;
    margin-left: 10px;
    margin-right: 60px;
    padding-right: 5px;
    // border-left: 1px solid $cl_292E39;
    // border-right: 1px solid $cl_292E39;
    .type-weight {
      font-size: 24px;
      color: $cl_fff;
      font-weight: bold;
    }

    .type-normal {
      color: $cl_c5c;
      font-size: 18px;
    }

    .icon-logo {
      width: 30px;
      height: 30px;
      position: relative;
      top: 9px;
      display: inline-block;
      border-radius: 50%;
      margin-right: 10px;
    }

    .type-logo {
      width: 30px;
      height: 30px;
      border: 0;
      margin: 3px;
    }

    .type-tip {
      color: $cl_c5c;
      font-size: 18px;
      margin: 6px;
    }
  }
  .new-money-list {
    display: inline-block;
    height: 100%;
  }

  .new-money-list:after {
    content: '';
    display: block;
    clear: both;
  }

  .new-money-list .new-money-list-content {
    line-height: 1.4;
    vertical-align: middle;
    padding-right: 50px;
    display: inline-block;
  }

  .new-money-title {
    font-size: 12px;
    color: $cl_8790A1;
  }

  .money-theme {
    margin-right: 10px;
  }

  .new-money-num {
  }

  .new-money-dot {
    color: $cl_fff;
    font-size: 14px;
    font-weight: 600;
  }
  .new-money-dot.rise {
    color: $cl_buy;
  }

  .new-money-dot.fall {
    color: $cl_sell;
  }
  .new-money-dot.rise:after,
  .new-money-dot.fall:after {
    content: '';
    display: inline-block;
    width: 8px;
    height: 10px;
    background-size: cover;
    margin-left: 4px;
  }

  .new-money-dot.rise:after {
    background-image: url('../../static/images/rise.svg');
  }

  .new-money-dot.fall:after {
    background-image: url('../../static/images/decline.svg');
  }

  .new-money-price {
    color: $cl_c5c;
    font-size: 12px;
    margin-left: 10px;
  }
}

.memter_center:hover {
  color: $cl_link;
}

.sanj {
  border-color: rgba(41, 46, 57, 1);
  background: rgba(41, 46, 57, 1);
}

.tolink_memberCenter {
  height: 88px;
  background: #292e39;
  border-bottom: 1px solid rgba(34, 38, 48, 1);
}

.cl_gray {
  color: rgba(135, 144, 161, 1);
}

.cl_white {
  color: rgba(225, 224, 236, 1);
}

.header {
  width: auto;
  height: 50px;
  line-height: 50px;
  min-height: 50px;
  // padding: 0 30px;
  background: $cl_content;
  color: white;
  font-size: 14px;
  // min-width: 1000px;
}

.logo {
  width: 70px;
  vertical-align: middle;
  cursor: pointer;
}

.beta {
  color: #767f9a;
  border: 1px solid #767f9a;
  margin: 0 40px 0 10px;
  padding: 0 4px;
  border-radius: 2px;
  font-size: 12px;
}

.language {
  .login,
  .register {
    color: white;
    text-align: center;
    padding: 0 20px;
    vertical-align: middle;
  }

  .register {
    border: none;
    border-left: 1px solid rgba(94, 101, 115, 1);
  }
  .login:hover,
  .register:hover {
    color: $cl_link;
  }
}

.set-currency {
  display: inline-block;
  position: relative;
}

.set-currency_icon {
  background-image: url('../../static/images/ICO_set.svg');
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  background-size: cover;
  cursor: pointer;
}

.set-currency:hover .set-currency_icon {
  background-image: url('../../static/images/ICO_set_check.svg');
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  background-size: cover;
  cursor: pointer;
}

.set-currency_content {
  position: absolute;
  width: 94px;
  padding: 15px 0px;
  right: -29px;
  z-index: 15;
  line-height: normal;
  background: rgba(41, 46, 57, 1);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.set-currency_content_text {
  font-weight: 900;
  color: rgba(135, 144, 161, 1);
  border-bottom: 1px solid rgba(34, 38, 48, 1);
  margin-bottom: 5px;
  padding-bottom: 5px;
  text-align: center;
}

.set-currency_content:before {
  content: '';
  display: inline-block;
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 7.5px 10px 7.5px;
  border-color: transparent transparent rgba(41, 46, 57, 1) transparent;
  top: -10px;
  right: 30px;
}

.set-currency_content_exchange .left.active {
  color: $cl_link;
}

.set-currency_content_exchange {
  color: $cl_fff;
  margin-top: 15px;
  padding: 0 19px;
}

.set-currency_content_exchange .left {
  width: 100%;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
}

.set-currency_content_exchange .left:last-child {
  margin-top: 15px;
}

.set-currency_content_exchange .left:before {
  content: '';
  display: inline-block;
  position: absolute;
  left: 0;
  background-image: url('../../static/images/select_cricle.png');
  background-size: cover;
  width: 14px;
  height: 14px;
  top: 50%;
  transform: translateY(-50%);
}

.set-currency_content_exchange .left.active:before {
  background-image: url('../../static/images/select_cricle_active.svg');
}

.head-menu {
  width: 100%;
  height: 100%;
  position: relative;
  div {
    color: white;
  }
  .coin {
    position: absolute;
    background: rgba(41, 46, 57, 1);
    z-index: 10000;
    width: 640px;
    top: 50px;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
  }
}

.bg1c {
  background: #1c1b36;
}

ol.public {
  border-bottom: 1px solid #eee;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #333;
  background: #fff;
  overflow-y: auto;
  li {
    cursor: pointer;
    float: left;
    width: 160px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
  }
  li.before:after {
    background: url('../../static/images/security/an_select_down.png') no-repeat
      center center;
    content: '';
    display: inline-block;
    vertical-align: middle;
    width: 12px;
    height: 12px;
    background-size: 10px auto;
  }
  li.before.cur {
    background: #02AD8F;
    color: white;
  }
  li.before.cur:after {
    background: url('../../static/images/security/head_white.png') no-repeat
      center center;
    content: '';
    display: inline-block;
    vertical-align: middle;
    width: 12px;
    height: 12px;
    background-size: 10px auto;
  }
  li.last {
    width: 220px;
    float: right;
    margin-right: 10px;
    .search {
      padding: 10px 0;
      input {
        width: 157px;
        height: 30px;
        border: 1px solid #dddddd;
        font-size: 14px;
        line-height: 20px;
        padding-left: 10px;
        box-sizing: border-box;
      }
      button {
        height: 30px;
        width: 58px;
        outline: none;
        border: 1px solid #02AD8F;
        background: #02AD8F;
        color: white;
        font-size: 14px;
      }
    }
  }
}

.header-menu-title {
  user-select: none;
  margin-right: 30px;
  display: inline-block;
}

.header-menu-title.hover {
  color: $cl_link;
}

.header-menu-title .meuns {
  position: relative;
}

.header-menu-title .meuns:hover {
  color: $cl_link;
}

.header-user-info .header-user-info_content {
  position: absolute;
  right: -83px;
  z-index: 200;
  width: 208px;
  height: 244px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  .client_amount {
    text-align: left;
    margin-top: 10px;
  }
  .client_amount.cion {
    font-size: 16px;
  }
  .email {
    background: rgba(41, 46, 57, 1);
    padding: 0 20px 15px;
    font-size: 12px;
    line-height: 20px;
  }
  .userid {
    background: rgba(41, 46, 57, 1);
    padding: 20px 20px 10px;
    font-size: 16px;
    line-height: 22px;
    color: rgba(225, 224, 236, 1);
  }
  .userid:after {
    background: url('../../static/images/head-arrow-right.svg') no-repeat right
      center;
    content: '';
    display: inline-block;
    vertical-align: middle;
    width: 12px;
    height: 14px;
    background-size: auto 13px;
    position: absolute;
    right: 20px;
    top: 25px;
  }
  .estimate {
    padding: 20px;
    background: rgba(41, 46, 57, 1);
    font-size: 14px;
    line-height: 20px;
    height: 116px;
    border-bottom: 1px solid rgba(34, 38, 48, 1);
    position: relative;
    p {
      height: 17px;
      font-size: 12px;
    }
    .estimate-link:after {
      background: url('../../static/images/head-arrow-right.svg') no-repeat
        right center;
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 12px;
      height: 14px;
      background-size: auto 13px;
      position: absolute;
      right: 20px;
      top: 25px;
    }
  }
  button {
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 35px;
    border: none;
    background: rgba(41, 46, 57, 1);
    position: absolute;
    bottom: 0;
    border-radius: 0;
  }
}

.signIn {
  display: inline-block;
  margin: 0 20px;
}

.signIn .sign-icon,
.signIn:hover .sign-icon {
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  background-size: auto 100%;
  cursor: pointer;
  background-repeat: no-repeat;
}

.signIn .sign-icon {
  background-image: url('../../static/images/loginIn.svg');
}

.signIn:hover .sign-icon {
  background-image: url('../../static/images/loginIn_check.svg');
}

.signIn.hover .user {
  display: block;
}

.signIn.hover .user {
  display: block;
}

.language .deal,
.language .wallet {
  display: inline-block;
  margin-right: 30px;
  cursor: pointer;
  color: rgba(255, 255, 255, 1);
}

.deal:hover,
.wallet:hover {
  color: $cl_link;
}

.cursor.wallet,
.cursor.deal {
  display: block;
  margin-right: 0;
  line-height: 40px;
  color: rgba(51, 51, 51, 1);
  padding: 0 20px;
}

.cursor.wallet:hover,
.cursor.deal:hover {
  background: rgba(240, 239, 247, 1);
  color: rgba(40, 149, 251, 1);
}

.cursor.cl_gray:hover {
  color: rgba(233, 108, 66, 1);
}
</style>
