<template>
  <!-- <div class="market exchange-block_content clearfix bk112"> -->
  <div class="market exchange-block_content clearfix w-full flex items-center justify-center space-x-10 mx-4">
    <div
      :class="isChangeType ? 'w-2/3 mx-auto' : 'w-1/2'"
      v-if="buyAndSellType == 1 || !isChangeType"
    >
      <div>
        <div class="exchange-block_input  ipt_hover">
          <!-- 以市场上最优价格买入 -->
          <span class="before fs12">{{ $t('HashRate.pro.Market.price') }}</span>
          <span class="after fs12">{{ symbleto }}</span>
          <div class="input-number ipt_hover">
            {{ $t('HashRate.pro.Market.buyTips') }}
          </div>
        </div>
        <!-- 价格 -->
        <!-- <div class="exchange-block_input  ipt_hover display-none">
          <span class="before fs12">{{ $t('HashRate.pro.Market.price') }}</span>
          <span class="after fs12">{{ symbleto }}</span>
          <div class="input-number ipt_hover">
            <input
              type="text"
              v-model="copeEntrustBuyRate"
              @input="inputCopeEntrustBuyRate"
            />
          </div>
        </div> -->
        <!-- 数量 -->
        <div class="exchange-block_input  ipt_hover display-none">
          <span class="before fs12">{{ $t('HashRate.pro.Market.num') }}</span>
          <span class="after fs12">{{ symblefrom }}</span>
          <div class="input-number ipt_hover">
            <input
              type="text"
              v-model="copeEntrustBuyNum"
              @input="inputCopeEntrustBuyNum"
            />
          </div>
          <!-- <span
            v-show="mostBuyPurchases"
            class="exchange-block_owner_tip"
          >最多购买：
          </span> -->
        </div>
        <buybit-slider
          :dec="getbuydec"
          :dot-color="'buy'"
          :numdecimals="buyProportion"
          :is-input-state="isInputState"
          @click.native="clickBuyNum"
          @slider:change="getEntrustBuyNum"
        ></buybit-slider>
        <!-- 金额 -->
        <div class="exchange-block_input  ipt_hover">
          <span class="before fs12">{{ $t('HashRate.pro.Market.money') }}</span>
          <span class="after fs12">{{ symbleto }}</span>
          <div class="input-number ipt_hover">
            <input
              type="text"
              v-model="copeEntrustBuyMoney"
              @input="inputCopeEntrustBuyMoney(false)"
            />
          </div>
        </div>
      </div>
      <section
        class="marketBtn"
        v-if="token"
      >
        <div
          class="exchange-block_button_buy"
          v-loading="buyState"
          @click="findConfigsData.isBuyTransaction && buyDeal()"
          :class="{'exchange-block_button--unavailable':(buyState), 'isChangeTypeLeft fl': isChangeType, 'bk10 not-allowed': !findConfigsData.isBuyTransaction}"
        >
          {{ findConfigsData.isBuyTransaction ? $t('HashRate.pro.Market.buy') : $t('HashRate.pro.Market.notTrade') }} {{ symblefrom }}
        </div>
        <section
          @click="buyAndSellType = 2"
          v-if="isChangeType"
          class="border bc-F24845 cuso flex items-center justify-center space-x-1 cursor-pointer rounded-sm"
          :class="{'isChangeTypeRight fl': isChangeType}"
        >
          <i class="el-icon-sort clF24845 isChangeTypeRight-Icon"></i>
          <section class="isChangeTypeRight-Text fl cl77">
            <section>{{ $t('HashRate.pro.Market.sell') }}</section>
          </section>
        </section>
      </section>
      <div
        class="exchange-block_button_buy no_login"
        v-else
      >
        <a
          href="#"
          class="repeal"
          @click="showLoginModalBox"
        >{{ $t('HashRate.pro.Market.login') }}</a>
        <span style="color: #A9B3B8">/</span>
        <a
          href="#"
          class="repeal"
          @click="showRegModalBox"
        > {{ $t('HashRate.pro.Market.reg') }}</a>
      </div>
    </div>
    <div
      :class="isChangeType ? 'w-2/3 mx-auto' : 'w-1/2'"
      v-if="buyAndSellType == 2 || !isChangeType"
    >
      <div v-if="buyAndSellType == 2 || !isChangeType">
        <div class="exchange-block_input  ipt_hover">
          <!-- 以市场上最优价格卖出 -->
          <span class="before fs12">{{ $t('HashRate.pro.Market.price') }}</span>
          <span class="after fs12">{{ symbleto }}</span>
          <div class="input-number ipt_hover">
            {{ $t('HashRate.pro.Market.sellTips') }}
          </div>
        </div>
        <!-- 价格 -->
        <!-- <div class="exchange-block_input display-none">
          <span class="before fs12">{{ $t('HashRate.pro.Market.price') }}</span>
          <span class="after fs12">{{ symbleto }}</span>
          <div class="input-number ipt_hover">
            <input
              type="text"
              v-model="copeEntrustSaleRate"
              @input="inputCopeEntrustSaleRate"
            />
          </div>
        </div> -->
        <!-- 数量 -->
        <div class="exchange-block_input">
          <span class="before fs12">{{ $t('HashRate.pro.Market.num') }}</span>
          <span class="after fs12">{{ symblefrom }}</span>
          <div class="input-number ipt_hover">
            <input
              type="text"
              v-model="copeEntrustSaleNum"
              @input="inputCopeEntrustSaleNum(false)"
              :placeholder="`${$t('HashRate.pro.Market.minNum')}${findConfigsData.minTradeNum}${symblefrom}`"
            />
          </div>
          <!-- <span
            v-show="mostSaleAvailable"
            class="exchange-block_owner_tip"
          >最多可得：
          </span> -->
        </div>
        <buybit-slider
          :dec="getsaledec"
          :dot-color="'sell'"
          :numdecimals="saleProportion"
          :is-input-state="isInputState"
          @click.native="clickSaleNum"
          @slider:change="getEntrustSaleNum"
        ></buybit-slider>
        <!-- 金额 -->
        <div class="exchange-block_input  ipt_hover display-none">
          <span class="before fs12">{{ $t('HashRate.pro.Market.money') }}</span>
          <span class="after fs12">{{ symbleto }}</span>
          <div class="input-number ipt_hover">
            <input
              type="text"
              v-model="copeEntrustSaleMoney"
              @input="inputCopeEntrustSaleMoney"
            />
          </div>
        </div>
      </div>
      <section
        class="marketBtn"
        v-if="token && (buyAndSellType == 2 || !isChangeType)"
      >
        <div
          class="exchange-block_button_sale"
          v-loading="saleState"
          @click="findConfigsData.isSaleTransaction && saleDeal()"
          :class="{'exchange-block_button--unavailable':(buyState), 'isChangeTypeLeft fl': isChangeType, 'bk10 not-allowed': !findConfigsData.isSaleTransaction}"
        >
          {{ findConfigsData.isSaleTransaction ? $t('HashRate.pro.Market.sell') : $t('HashRate.pro.Market.notTrade') }} {{ symblefrom }}
        </div>
        <section
          @click="buyAndSellType = 1"
          v-if="isChangeType"
          class="border bc-02AD8F cuso flex items-center justify-center space-x-1 cursor-pointer rounded-sm"
          :class="{'isChangeTypeRight fl': isChangeType}"
        >
          <i class="el-icon-sort cl02AD8F isChangeTypeRight-Icon"></i>
          <section class="isChangeTypeRight-Text fl cl09">
            <section>{{ $t('HashRate.pro.Market.buy') }}</section>
          </section>
        </section>
      </section>
      <div
        class="exchange-block_button_sale no_login"
        v-else-if="(!token && buyAndSellType == 2) || !isChangeType"
      >
        <a
          href="#"
          class="repeal"
          @click="showLoginModalBox"
        >{{ $t('HashRate.pro.Market.login') }}</a>
        <span style="color: #A9B3B8">/</span>
        <a
          href="#"
          class="repeal"
          @click="showRegModalBox"
        > {{ $t('HashRate.pro.Market.reg') }}</a>
      </div>
    </div>
  </div>

</template>
<script>
import number from '@/components/TVpublic/number'
import slider from '@/components/TVpublic/slider'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Articles',
  components: {
    'buybit-number': number,
    'buybit-slider': slider,
  },
  props: {
    dailyDetail: {
      type: Object,
      default: function () {
        return {}
      }
    },
    //买入卖出价
    entrustSaleRate: {
      type: String,
      default: ""
    },
    entrustBuyRate: {
      type: String,
      default: ""
    },
    //设置限价买入卖出量
    entrustBuyNum: {
      type: String,
      default: ""
    },
    entrustSaleNum: {
      type: String,
      default: ""
    },
    //设置限价金额
    entrustBuyMoney: {
      type: String,
      default: ""
    },
    entrustSaleMoney: {
      type: String,
      default: ""
    },
    tradingDealFrom: {
      type: Object,
      default: function () {
        return {
          canuseamount: 0
        }
      }
    },
    tradingDealTo: {
      type: Object,
      default: function () {
        return {
          canuseamount: 0
        }
      }
    },
    dcs: {
      type: Object,
      default: function () {
        return {}
      }
    },
    isChangeType: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      buyAndSellType: 1,//0为都显示 1为买显示 2为卖显示
      //下单状态
      buyState: false,
      saleState: false,
      //最多购买状态
      mostBuyPricePurchases: false,
      mostBuyPurchases: false,
      mostSaleAvailable: false,
      mostSalePricePurchases: false,
      oldCopeEntrustSaleRate: '',//历史卖单价格
      copeEntrustBuyRate: this.entrustBuyRate,//买单价格
      copeEntrustSaleRate: this.entrustSaleRate,//卖单价格
      copeEntrustBuyNum: this.entrustBuyNum,//买单数量
      copeEntrustSaleNum: this.entrustSaleNum,//卖单数量
      copeEntrustBuyMoney: '',//买单金额
      copeEntrustSaleMoney: '',//卖单金额
      buydecimals: 0,
      saledecimals: 0,
      //订单数据模型
      dealModel: {
        ctid: '',
        ordertype: 1,
        direction: 1,
        price: 0,
        amount: 0,
        paypassword: '',
        ordersource: 1
      },
      buyData: 0,//买入最优价格 取卖单第一条数据
      sellData: 0,//卖出最优价格 取买单第一条数据
      // ExchangeRate: 0,//CNY汇率
      allBalance: [],//所有币种余额
      // oneBuyState: false,//是否是第一次获取买单限价价格
      // oneSaleState: false,//是否是第一次获取卖单限价价格
      findConfigsData: {//交易输入配置
        minTradeNum: 0,//交易对最小交易量
        maxTradeNum: 0,//交易对最大交易量
        valuation: 0,//计价币最大数位小数位数
        benchmark: 0,//基准币最大小数位
        rate: 0,//交易对手续百分比
        isBuyTransaction: false,//市价买是否可购买
        isSaleTransaction: false,//市价卖是否可出售
      },
      inputState: false,//是否在输入
      buyProportion: 0,//买单数量比例值取值0到100
      saleProportion: 0,//卖单数量比例值取值0到100
      buyBalance: 0,//买单的可用余额 基准币 BTC-USDT USDT
      saleBalance: 0,//卖单的可用余额 非基准币 BTC-USDT BTC
      isInputState: false,
      newClose: 0,//最新成交价
      BuyNum: 0,
      SaleNum: 0,
      getbuydec: 0,//买小数
      getsaledec: 0,//卖小数
      symbleParameArray: '',
      symblefrom: '',
      symbleto: '',
    }
  },
  computed: {
    ...mapState(['token'])
  },
  mounted () {
    this.$nextTick(() => {

      this.symbleParameArray = !this.$route.params.id ? null : (this.$route.params.id.split('_').length != 2 ? null : this.$route.params.id.split('_'))
      //获取产品
      this.symblefrom = this.symbleParameArray ? this.symbleParameArray[0].toUpperCase() : '--'
      //获取货币
      this.symbleto = this.symbleParameArray ? this.symbleParameArray[1].toUpperCase() : '--'

      // this.getbuydec = !this.buyable ? 0 : ((this.copeEntrustBuyNum / this.buyable) * 100)
      // this.getsaledec = !this.tradingDealFrom.canuseamount ? 0 : ((this.copeEntrustSaleNum / this.tradingDealFrom.canuseamount) * 100);
      // // 注销登录
      // this.$bus.on("user-logout", () => {
      //   //将data重置
      //   // Object.assign(this.$data, this.$options.data())
      //   this.allBalance = [];
      //   this.init();
      // });
      // //将最新实时信息发送给深度、实时、限价
      // this.$bus.on('HashRateNewTitleData', data => {
      //   this.newClose = Number(data.close) > 0 ? Number(data.close) : 1
      // })
      // //撤销订单监听更新余额
      // this.$bus.on('currentOrder', () => {
      //   //重新获取资产余额
      //   if (this.token) {
      //     this.findByAssetNames()
      //   }
      // })
      // // 登录成功
      // this.$bus.on("Login-Success", () => {
      //   this.allBalance = [];
      //   this.init();
      // });
      this.init();
    })
  },
  subscribe () {
    return {
      //订阅下单状态
      changeDealState () {
        this.buyState = false
        this.saleState = false
      }
    }
  },
  created () {
  },
  methods: {
    init () {
      if (this.token) {
        this.findByAssetNames()
      }
      this.getCoinTeamConfig();
    },
    //获取交易配置
    getCoinTeamConfig () {
      let obj = {pair:`${this.symblefrom}/${this.symbleto}`}
      this.$api.Trade.GetTradepairDetail(obj).then((res) => {
        if (res.isSuccess) {
          //key:配置类型 value:配置内容;1:最小交易量,2:最大交易量,3:价格最大小数位,4:数量最大小数位,5:taker手续分百分比,6:maker手续分百分比,7:限价买是否可购买,8:限价卖是否出售,9:市价买是否可购买，10:市价卖是否可出售
          this.findConfigsData = {
            minTradeNum: res.data.minTradeNum || 0,//交易对最小交易量
            maxTradeNum: res.data.maxTradeNum || 0,//交易对最大交易量
            valuation: res.data.exchangeCoin.afterDigit || 0,//计价币最大数位小数位数
            benchmark: res.data.baseCoin.afterDigit || 0,//基准币最大小数位
            rate: res.data.feeRate || 0,//交易对手续百分比
            isBuyTransaction: res.data.isBuyTransaction,//限价买是否可购买
            isSaleTransaction: res.data.isSaleTransaction,//限价卖是否可购买
          }
        }
      })
    },
    //获取用户多个币种资产
    findByAssetNames () {
      this.$api.Trade.GetAssets().then((res) => {
        if (res.isSuccess) {
          this.allBalance = res.data
          if (this.allBalance.length) {
            this.allBalance.forEach((item, index) => {
              if (item.code == this.symbleto) {
                this.buyBalance = item.free
              }
              if (item.code == this.symblefrom) {
                this.saleBalance = item.free
              }
            });
          }
        }
      })
    },
    getfix (val) {
      let fix
      if (val >= 500) {
        fix = 2
      } else if (val >= 100) {
        fix = 3
      } else if (val >= 0) {
        fix = 4
      }
      return fix
    },
    //点击买入量滚动条
    clickBuyNum () {
      //点击时计算滚动条百分比
      this.buyProportion = this.BuyNum * 100
      if (this.buyBalance) {
        //判断可用余额是否存在 当前滚动条百分比*可用余额 改变金额
        // this.copeEntrustBuyMoney = this.$np.round(this.$np.times(this.BuyNum, this.buyBalance), this.findConfigsData.valuation)
        this.copeEntrustBuyMoney = this.$np.times(this.BuyNum, this.buyBalance)
        this.copeEntrustBuyMoney = this.$limitInputNum(this.BuyNum == 1 ? this.buyBalance : this.copeEntrustBuyMoney, 9, this.findConfigsData.valuation);
      }
      if (this.BuyNum == 0) {
        this.copeEntrustBuyNum = '';
        this.copeEntrustBuyMoney = '';
      }
    },
    //点击卖出量滚动条
    clickSaleNum () {
      //点击时计算滚动条百分比
      this.saleProportion = this.SaleNum * 100
      if (this.saleBalance) {
        //判断可用余额是否存在 当前滚动条百分比*可用余额 改变数量
        // this.copeEntrustSaleNum = this.$np.round(this.$np.times(this.SaleNum, this.saleBalance), this.findConfigsData.benchmark)
        this.copeEntrustSaleNum = this.$np.times(this.SaleNum, this.saleBalance)
        this.copeEntrustSaleNum = this.$limitInputNum(this.BuyNum == 1 ? this.saleBalance : this.copeEntrustSaleNum, 9, this.findConfigsData.benchmark);
      }
      if (this.SaleNum == 0) {
        this.copeEntrustSaleNum = '';
        this.copeEntrustSaleMoney = '';
      }
    },
    //设置买入量  
    getEntrustBuyNum (num) {
      if (this.buyBalance && !this.isInputState) {
        //判断可用余额是否存在 当前滚动条百分比*可用余额 改变金额
        // this.copeEntrustBuyMoney = this.$np.round(this.$np.times(num, this.buyBalance), this.findConfigsData.valuation)
        this.copeEntrustBuyMoney = this.$np.times(num, this.buyBalance)
        this.copeEntrustBuyMoney = this.$limitInputNum(num == 1 ? this.buyBalance : this.copeEntrustBuyMoney, 9, this.findConfigsData.valuation);
      }
      this.BuyNum = num
      this.isInputState = false
    },
    //设置卖出量
    getEntrustSaleNum (num) {
      if (this.saleBalance && !this.isInputState) {
        //判断可用余额是否存在 当前滚动条百分比*可用余额 改变数量
        // this.copeEntrustSaleNum = this.$np.round(this.$np.times(num, this.saleBalance), this.findConfigsData.benchmark)
        this.copeEntrustSaleNum = this.$np.times(num, this.saleBalance)
        this.copeEntrustSaleNum = this.$limitInputNum(num == 1 ? this.saleBalance : this.copeEntrustSaleNum, 9, this.findConfigsData.benchmark);
      }
      if (num == 0) {
        this.copeEntrustSaleNum = ''
      }
      this.SaleNum = num
      this.isInputState = false
    },
    showBuyFocus () {
      this.mostBuyPurchases = !this.mostBuyPurchases
    },
    showBuyPriceFocus () {
      this.mostBuyPricePurchases = !this.mostBuyPricePurchases
    },
    showSalePriceFocus () {
      this.mostSalePricePurchases = !this.mostSalePricePurchases
    },
    showSaleFocus () {
      this.mostSaleAvailable = !this.mostSaleAvailable
    },
    //买入交易
    buyDeal () {
      if (this.buyState) return
      //计算最小加入金额
      let newNum = this.$np.divide(Number(this.copeEntrustBuyMoney), this.newClose)
      //购买总金额不能为0
      if (!Number(this.copeEntrustBuyMoney)) {
        return this.$commonFn.TipsMessage(this.$t('HashRate.pro.Market.notBuyMoney'))
      }
      //不能小于最小量
      if (Number(newNum) < Number(this.findConfigsData.minTradeNum)) {
        return this.$commonFn.TipsMessage(this.$t('HashRate.pro.Market.minPrice'))
      }
      //判断购买金额是否大于可用余额
      if (Number(this.copeEntrustBuyMoney) > this.buyBalance) {
        return this.$commonFn.TipsMessage(this.$t('HashRate.pro.Market.notBuyMaxMoney'))
      }
      this.buyState = true
      let obj = {
        direction: 1,//买or卖
        num: Number(this.copeEntrustBuyNum),//数量
        total: Number(this.copeEntrustBuyMoney),//总金额
        tradePair: `${this.symblefrom}/${this.symbleto}`,//交易对
        isMarket: true,//市价or限价
      }
      this.$api.Trade.AddMarketPrice(obj).then((res) => {
        if (res.isSuccess) {
          this.copeEntrustBuyRate = 0
          this.copeEntrustBuyNum = 0
          this.copeEntrustBuyMoney = 0
          this.buyProportion = 0
          //重新获取资产余额
          if (this.token) {
            this.findByAssetNames()
          }
          this.$bus.emit('tradeAddOrade')
        }
        this.buyState = false
      });
    },
    //卖出交易
    saleDeal () {
      if (this.saleState) return
      //卖出数量不能为0
      if (!Number(this.copeEntrustSaleNum)) {
        return this.$commonFn.TipsMessage(this.$t('HashRate.pro.Market.notSellNum'))
      }
      //不能小于最小量
      if (Number(this.copeEntrustSaleNum) < Number(this.findConfigsData.minTradeNum)) {
        return this.$commonFn.TipsMessage(this.$t('HashRate.pro.Market.notSellMinNum'))
      }
      //判断卖出金额是否大于可用余额
      if (Number(this.copeEntrustSaleNum) > this.saleBalance) {
        return this.$commonFn.TipsMessage(this.$t('HashRate.pro.Market.notSellMaxMoney'))
      }
      this.saleState = true
      let obj = {
        direction: 2,//买or卖
        num: Number(this.copeEntrustSaleNum),//数量
        tradePair: `${this.symblefrom}/${this.symbleto}`,//交易对
        isMarket: true,//市价or限价
      }
      this.$api.Trade.AddMarketPrice(obj).then((res) => {
        if (res.isSuccess) {
          this.copeEntrustSaleRate = 0
          this.copeEntrustSaleNum = 0
          this.copeEntrustSaleMoney = 0
          this.saleProportion = 0
          //重新获取资产余额
          if (this.token) {
            this.findByAssetNames()
          }
          this.$bus.emit('tradeAddOrade')
        }
        this.saleState = false
      });
    },
    //输入买单价格
    inputCopeEntrustBuyRate () { },
    //输入买单数量
    inputCopeEntrustBuyNum () { },
    //输入买单金额
    inputCopeEntrustBuyMoney (state) {
      this.isInputState = true
      //处理金额小数位
      this.copeEntrustBuyMoney = this.$limitInputNum(this.copeEntrustBuyMoney, 9, this.findConfigsData.valuation);
      //如果为true就是通过滚动条进来的否则就是输入数量进来的
      if (!state) {
        let newVal = this.$np.round(this.$np.divide(Number(this.copeEntrustBuyMoney), Number(this.buyBalance)), 2) * 100
        this.buyProportion = newVal > 100 ? 100 : newVal;
      }
    },
    //卖单价格
    inputCopeEntrustSaleRate () { },
    //卖单数量
    inputCopeEntrustSaleNum (state) {
      this.isInputState = true
      //处理金额小数位
      this.copeEntrustSaleNum = this.$limitInputNum(this.copeEntrustSaleNum, 9, this.findConfigsData.benchmark);
      //如果为true就是通过滚动条进来的否则就是输入数量进来的
      if (!state) {
        let newVal = this.$np.round(this.$np.divide(Number(this.copeEntrustSaleNum), Number(this.saleBalance)), 2) * 100
        this.saleProportion = newVal > 100 ? 100 : newVal;
      }
    },
    //卖单金额
    inputCopeEntrustSaleMoney (val) { },
    //显示登录
    showLoginModalBox () {
      this.$bus.$emit("BusClick");
    },
    //显示注册
    showRegModalBox () {
      this.$bus.$emit("BusRegClick");
    },
  }
}
</script>
<style lang="scss" scoped>
.market {
  padding-top: 25px !important;
  padding-bottom: 65px !important;
}
.exchange-block .exchange-block_input .ipt_hover {
  padding-left: 60px !important;
  padding-right: 20px !important;
  color: #8790a1;
}
input {
  background: transparent;
  color: inherit;
}

.input-number {
  position: relative;
  input::placeholder {
    color: #8790a1;
  }
}

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.decrement-button,
.increment-button {
  position: absolute;
  z-index: 1;
  right: 45px;
  cursor: pointer;
  display: inline-block;
  height: 50%;
  text-align: center;
  width: 20px;
}

.increment-button {
  top: 0;
}

.decrement-button {
  bottom: 0;
}

.increment-button:hover:after {
  border-color: transparent transparent #02ad8f transparent;
}

.decrement-button:hover:after {
  border-color: #02ad8f transparent transparent transparent;
}

.increment-button:after,
.decrement-button:after {
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
}

.increment-button:after {
  content: '';
  position: relative;
  top: -8px;
  border-width: 0 4px 6px 4px;
  border-color: transparent transparent #5e6573 transparent;
}

.decrement-button:after {
  content: '';
  border-width: 6px 4px 0 4px;
  border-color: #5e6573 transparent transparent transparent;
  top: -13px;
  position: relative;
}
</style>
