<template>
  <!-- <div class="limit exchange-block_content clearfix bk112"> -->
  <div class="limit exchange-block_content clearfix w-full flex items-center justify-center space-x-10 mx-4">
    <div
      :class="isChangeType ? 'w-2/3 mx-auto' : 'w-1/2'"
      v-if="buyAndSellType == 1 || !isChangeType"
    >
      <div>
        <div class="exchange-block_input  ipt_hover">
          <!-- 触发价 -->
          <span class="before fs12">{{ $t('HashRate.pro.limit.triggerPrice') }}</span>
          <span class="after fs12">{{ symbleto }}</span>
          <div class="input-number ipt_hover">
            <input
              type="text"
              v-model="buyTriggerPrice"
              @input="inputBuyTriggerPrice"
            />
          </div>
        </div>
        <div class="exchange-block_input  ipt_hover">
          <!-- 价格 -->
          <span class="before fs12">{{ $t('HashRate.pro.limit.price') }}</span>
          <span class="after fs12">{{ symbleto }}</span>
          <div class="input-number ipt_hover">
            <input
              type="text"
              v-model="copeEntrustBuyRate"
              @input="inputCopeEntrustBuyRate"
            />
          </div>
        </div>
        <!-- 数量 -->
        <div class="exchange-block_input  ipt_hover">
          <span class="before fs12">{{ $t('HashRate.pro.limit.num') }}</span>
          <span class="after fs12">{{ symblefrom }}</span>
          <div class="input-number ipt_hover">
            <input
              type="text"
              v-model="copeEntrustBuyNum"
              @input="inputCopeEntrustBuyNum(true)"
              :placeholder="`${$t('HashRate.pro.limit.minNum')}${findConfigsData.minTradeNum}${symblefrom}`"
            />
          </div>
          <!-- <span
            v-show="mostBuyPurchases"
            class="exchange-block_owner_tip"
          >最多购买：
          </span> -->
        </div>
        <buybit-slider
          :dot-color="'buy'"
          :dec="getbuydec"
          :numdecimals="buyProportion"
          @click.native="clickBuyNum"
          @slider:change="getEntrustBuyNum"
        ></buybit-slider>
        <!-- 金额 -->
        <div class="exchange-block_input  ipt_hover">
          <span class="before fs12">{{ $t('HashRate.pro.limit.money') }}</span>
          <span class="after fs12">{{ symbleto }}</span>
          <div class="input-number ipt_hover">
            <input
              type="text"
              v-model="copeEntrustBuyMoney"
              @input="inputCopeEntrustBuyMoney(true)"
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
          {{ findConfigsData.isBuyTransaction ? $t('HashRate.pro.limit.buy') : $t('HashRate.pro.limit.notTrade') }} {{ symblefrom }}
        </div>
        <section
          @click="buyAndSellType = 2"
          v-if="isChangeType"
          class="border bc-F24845 cuso flex items-center justify-center space-x-1 cursor-pointer rounded-sm"
          :class="{'isChangeTypeRight fl': isChangeType}"
        >
          <i class="el-icon-sort clF24845 isChangeTypeRight-Icon"></i>
          <section class="isChangeTypeRight-Text fl cl77">
            <section>{{ $t('HashRate.pro.limit.sell') }}</section>
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
        >{{ $t('HashRate.pro.limit.login') }}</a>
        <span style="color: #8790A1">/</span>

        <a
          href="#"
          class="repeal"
          @click="showRegModalBox"
        > {{ $t('HashRate.pro.limit.reg') }}</a>
      </div>
    </div>
    <div
      :class="isChangeType ? 'w-2/3 mx-auto' : 'w-1/2'"
      v-if="buyAndSellType == 2 || !isChangeType"
    >
      <div>
        <!-- 触发价 -->
        <div class="exchange-block_input">
          <span class="before fs12">{{ $t('HashRate.pro.limit.triggerPrice') }}</span>
          <span class="after fs12">{{ symbleto }}</span>
          <div class="input-number ipt_hover">
            <input
              type="text"
              v-model="saleTriggerPrice"
              @input="inputSaleTriggerPrice"
            />
          </div>
        </div>
        <!-- 价格 -->
        <div class="exchange-block_input">
          <span class="before fs12">{{ $t('HashRate.pro.limit.price') }}</span>
          <span class="after fs12">{{ symbleto }}</span>
          <div class="input-number ipt_hover">
            <input
              type="text"
              v-model="copeEntrustSaleRate"
              @input="inputCopeEntrustSaleRate"
            />
          </div>
        </div>
        <!-- 数量 -->
        <div class="exchange-block_input">
          <span class="before fs12">{{ $t('HashRate.pro.limit.num') }}</span>
          <span class="after fs12">{{ symblefrom }}</span>
          <div class="input-number ipt_hover">
            <input
              type="text"
              v-model="copeEntrustSaleNum"
              @input="inputCopeEntrustSaleNum(false)"
              :placeholder="`${$t('HashRate.pro.limit.minNum')}${findConfigsData.minTradeNum}${symblefrom}`"
            />
          </div>
          <!-- <span
            v-show="mostSaleAvailable"
            class="exchange-block_owner_tip"
          >最多可得：
          </span> -->
        </div>
        <buybit-slider
          :dot-color="'sell'"
          :dec="getsaledec"
          :numdecimals="saleProportion"
          @click.native="clickSaleNum"
          @slider:change="getEntrustSaleNum"
        ></buybit-slider>
        <!-- 金额 -->
        <div class="exchange-block_input  ipt_hover">
          <span class="before fs12">{{ $t('HashRate.pro.limit.money') }}</span>
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
          {{ findConfigsData.isSaleTransaction ? $t('HashRate.pro.limit.sell') : $t('HashRate.pro.limit.notTrade') }} {{ symblefrom }}
        </div>
        <section
          @click="buyAndSellType = 1"
          v-if="isChangeType"
          class="border bc-02AD8F cuso flex items-center justify-center space-x-1 cursor-pointer rounded-sm"
          :class="{'isChangeTypeRight fl': isChangeType}"
        >
          <i class="el-icon-sort cl02AD8F isChangeTypeRight-Icon"></i>
          <section class="isChangeTypeRight-Text fl cl09">
            <section>{{ $t('HashRate.pro.limit.buy') }}</section>
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
        >{{ $t('HashRate.pro.limit.login') }}</a>
        <span style="color: #8790A1">/</span>
        <a
          href="#"
          class="repeal"
          @click="showRegModalBox"
        > {{ $t('HashRate.pro.limit.reg') }}</a>
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
    }
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
      buyTriggerPrice:'',//购买触发价
      copeEntrustBuyRate: this.entrustBuyRate,//买单价格
      saleTriggerPrice:'',//卖出触发价
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
        isBuyTransaction: false,//限价买是否可购买
        isSaleTransaction: false,//限价卖是否可购买
      },
      inputState: false,//是否在输入
      buyProportion: 0,//买单数量比例值取值0到100
      saleProportion: 0,//卖单数量比例值取值0到100
      buyBalance: 0,//买单的可用余额 基准币 BTC-USDT USDT
      saleBalance: 0,//卖单的可用余额 非基准币 BTC-USDT BTC
      isBuyInputState: false,//买单输入中状态
      isSaleInputState: false,//卖单输入中状态
      BuyNum: 0,//买入两滚动条
      SaleNum: 0,//买入两滚动条
      getbuydec: 0,//买小数
      getsaledec: 0,//卖小数
      symbleParameArray: '',
      symblefrom: '',
      symbleto: '',
      initPriceState: 0,
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

      // //接收价格和CNY价格到限价
      this.$bus.on('limitHashRatePriceObj', (data) => {
        //深拷贝对象以免数据被污染
        let newData = this.$commonFn._.cloneDeep(data);
        /*
        * 1. 买入框的价格为卖一价，卖出框的价格为买一价
        * 2. 如果没有买一或者卖一价 就都显示最新价 
        * 3. 如果也没有最新价就显示空
        */
        //价格不存在的时候才进行赋值（买）
        // if (newData.buy.length) {
        // this.copeEntrustBuyRate = newData.buy.length ? newData.buy[0].price : ''
        this.copeEntrustSaleRate = newData.buy.length ? newData.buy[0].price : (data.newPrice ? data.newPrice : '')
        // }
        //价格不存在的时候才进行赋值（卖）
        // if (newData.sell.length) {
        // this.copeEntrustSaleRate = newData.sell.length ? newData.sell[newData.sell.length - 1].price : ''
        this.copeEntrustBuyRate = newData.sell.length ? newData.sell[newData.sell.length - 1].price : (data.newPrice ? data.newPrice : '')
        // }
      })
      // //
      // this.$bus.on('limitHashRatePriceBuyObj', (data) => {
      //   this.initPriceState++
      //   if (this.initPriceState > 4) {
      //     return
      //   }
      //   this.copeEntrustBuyRate = data
      // })
      // this.$bus.on('limitHashRatePriceBuyPrice', (data) => {
      //   this.initPriceState++
      //   if (this.initPriceState > 4) {
      //     return
      //   }
      //   this.copeEntrustBuyRate = data
      // })

      // this.$bus.on('limitHashRatePriceSellObj', (data) => {
      //   this.initPriceState++
      //   if (this.initPriceState > 4) {
      //     return
      //   }
      //   this.copeEntrustSaleRate = data
      // })
      // this.$bus.on('limitHashRatePriceSellPrice', (data) => {
      //   this.initPriceState++
      //   if (this.initPriceState > 4) {
      //     return
      //   }
      //   this.copeEntrustSaleRate = data
      // })
      // //监听点击盘口列表将价格赋值给买卖限价价格
      // this.$bus.on('limitHashRatePrice', (data) => {
      //   this.copeEntrustBuyRate = data
      //   this.copeEntrustSaleRate = data
      //   this.inputCopeEntrustBuyRate()
      //   this.inputCopeEntrustSaleRate()
      // })
      // //撤销订单监听更新余额
      // this.$bus.on('currentOrder', () => {
      //   //重新获取资产余额
      //   if (this.token) {
      //     this.findByAssetNames()
      //   }
      // })
      // // 注销登录
      // this.$bus.on("user-logout", () => {
      //   //将data重置
      //   // Object.assign(this.$data, this.$options.data())
      //   this.allBalance = [];
      //   // this.copeEntrustBuyRate = ''
      //   this.copeEntrustBuyNum = ''
      //   this.copeEntrustBuyMoney = ''
      //   // this.copeEntrustSaleRate = ''
      //   this.copeEntrustSaleNum = ''
      //   this.copeEntrustSaleMoney = ''
      //   this.buyProportion = 0
      //   this.saleProportion = 0
      //   this.init();
      // });
      // // 登录成功
      // this.$bus.on("Login-Success", () => {
      //   this.allBalance = [];
      //   // this.copeEntrustBuyRate = ''
      //   this.copeEntrustBuyNum = ''
      //   this.copeEntrustBuyMoney = ''
      //   // this.copeEntrustSaleRate = ''
      //   this.copeEntrustSaleNum = ''
      //   this.copeEntrustSaleMoney = ''
      //   this.buyProportion = 0
      //   this.saleProportion = 0
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
      // //如果为true就是通过滚动条进来的否则就是输入数量进来的
      // if (this.buyBalance && Number(this.copeEntrustBuyRate)) {
      //   let newVal = this.$np.round(this.$np.divide(Number(this.$np.times(Number(this.copeEntrustBuyNum), Number(this.copeEntrustBuyRate))), Number(this.buyBalance)), 6) * 100
      //   this.buyProportion = newVal > 100 ? 100 : newVal;
      // }
      //点击时计算滚动条百分比
      this.buyProportion = this.BuyNum * 100
      // if (this.buyBalance && !this.isBuyInputState && this.BuyNum != 1) {
      if (this.buyBalance && !this.isBuyInputState) {
        //判断可用余额是否存在 当前滚动条百分比*可用余额 改变金额
        // this.copeEntrustBuyMoney = this.$np.round(this.$np.times(this.BuyNum, this.buyBalance), this.findConfigsData.valuation)
        this.copeEntrustBuyMoney = this.$np.times(this.BuyNum, this.buyBalance)
        this.copeEntrustBuyMoney = this.$limitInputNum(this.copeEntrustBuyMoney, 9, this.findConfigsData.valuation);
        //如果为true代表目前手动输入
        if (Number(this.copeEntrustBuyMoney) && Number(this.copeEntrustBuyRate)) {
          //判断当前金额存在
          // this.copeEntrustBuyNum = this.$np.round(this.$np.divide(this.copeEntrustBuyMoney, Number(this.copeEntrustBuyRate)), this.findConfigsData.benchmark)
          this.copeEntrustBuyNum = this.$np.divide(this.copeEntrustBuyMoney, Number(this.copeEntrustBuyRate))
          this.copeEntrustBuyNum = this.$limitInputNum(this.copeEntrustBuyNum, 9, this.findConfigsData.benchmark);
        }
        if (Number(this.copeEntrustBuyNum) && Number(this.copeEntrustBuyRate)) {
          this.copeEntrustBuyMoney = this.$np.times(Number(this.copeEntrustBuyNum), Number(this.copeEntrustBuyRate))
          this.copeEntrustBuyMoney = this.$limitInputNum(this.BuyNum == 1 ? this.buyBalance : this.copeEntrustBuyMoney, 9, this.findConfigsData.valuation);
        }
        //如果为true代表目前手动输入
        if (!Number(this.copeEntrustBuyMoney) || !Number(this.copeEntrustBuyRate)) {
          //判断当前金额存在并且价格为0 数量直接为0
          this.copeEntrustBuyNum = 0
        }
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
      // if (this.saleBalance && !this.isSaleInputState && this.SaleNum != 1) {
      if (this.saleBalance && !this.isSaleInputState) {
        //判断可用余额是否存在 当前滚动条百分比*可用余额 改变数量
        // this.copeEntrustSaleNum = this.$np.round(this.$np.times(this.SaleNum, this.saleBalance), this.findConfigsData.benchmark)
        this.copeEntrustSaleNum = this.$np.times(this.SaleNum, this.saleBalance)
        this.copeEntrustSaleNum = this.$limitInputNum(this.SaleNum == 1 ? this.saleBalance : this.copeEntrustSaleNum, 9, this.findConfigsData.benchmark);
        if (Number(this.copeEntrustSaleNum) && Number(this.copeEntrustSaleRate)) {
          //判断数量存在就进行计算金额
          // this.copeEntrustSaleMoney = this.$np.round(this.$np.times(this.copeEntrustSaleRate, this.copeEntrustSaleNum), this.findConfigsData.valuation)
          this.copeEntrustSaleMoney = this.$np.times(this.copeEntrustSaleRate, this.copeEntrustSaleNum)
          this.copeEntrustSaleMoney = this.$limitInputNum(this.copeEntrustSaleMoney, 9, this.findConfigsData.valuation);
        }
        if (!Number(this.copeEntrustSaleNum) || !Number(this.copeEntrustSaleRate)) {
          this.copeEntrustSaleMoney = 0
        }
      }
      if (this.SaleNum == 0) {
        this.copeEntrustSaleNum = '';
        this.copeEntrustSaleMoney = '';
      }
    },
    //设置买入量
    getEntrustBuyNum (num) {
      this.BuyNum = num;
      // if (this.buyBalance && !this.isBuyInputState && num != 1) {
      if (this.buyBalance && !this.isBuyInputState) {
        //判断可用余额是否存在 当前滚动条百分比*可用余额 改变金额
        // this.copeEntrustBuyMoney = this.$np.round(this.$np.times(num, this.buyBalance), this.findConfigsData.valuation)
        this.copeEntrustBuyMoney = this.$np.times(num, this.buyBalance)
        this.copeEntrustBuyMoney = this.$limitInputNum(this.copeEntrustBuyMoney, 9, this.findConfigsData.valuation);
        //如果为true代表目前手动输入
        if (Number(this.copeEntrustBuyMoney) && Number(this.copeEntrustBuyRate)) {
          //判断当前金额存在
          // this.copeEntrustBuyNum = this.$np.round(this.$np.divide(this.copeEntrustBuyMoney, Number(this.copeEntrustBuyRate)), this.findConfigsData.benchmark)
          this.copeEntrustBuyNum = this.$np.divide(this.copeEntrustBuyMoney, Number(this.copeEntrustBuyRate))
          this.copeEntrustBuyNum = this.$limitInputNum(this.copeEntrustBuyNum, 9, this.findConfigsData.benchmark);
        }
        //判断可用余额是否存在 当前滚动条百分比*可用余额 改变金额
        if (Number(this.copeEntrustBuyNum) && Number(this.copeEntrustBuyRate)) {
          this.copeEntrustBuyMoney = this.$np.times(Number(this.copeEntrustBuyNum), Number(this.copeEntrustBuyRate))
          this.copeEntrustBuyMoney = this.$limitInputNum(num == 1 ? this.buyBalance : this.copeEntrustBuyMoney, 9, this.findConfigsData.valuation);
        }
        //如果为true代表目前手动输入
        if (!Number(this.copeEntrustBuyMoney) || !Number(this.copeEntrustBuyRate)) {
          //判断当前金额存在并且价格为0 数量直接为0
          this.copeEntrustBuyNum = 0
        }
      }
      if (num == 0) {
        this.copeEntrustBuyNum = '';
        this.copeEntrustBuyMoney = '';
      }
      this.isBuyInputState = false
    },
    //设置卖出量
    getEntrustSaleNum (num) {
      this.SaleNum = num;
      // if (this.saleBalance && !this.isSaleInputState && num != 1) {
      if (this.saleBalance && !this.isSaleInputState) {
        //判断可用余额是否存在 当前滚动条百分比*可用余额 改变数量
        // this.copeEntrustSaleNum = this.$np.round(this.$np.times(num, this.saleBalance), this.findConfigsData.benchmark)
        this.copeEntrustSaleNum = this.$np.times(num, this.saleBalance)
        this.copeEntrustSaleNum = this.$limitInputNum(num == 1 ? this.saleBalance : this.copeEntrustSaleNum, 9, this.findConfigsData.benchmark);
        if (Number(this.copeEntrustSaleNum) && Number(this.copeEntrustSaleRate)) {
          //判断数量存在就进行计算金额
          // this.copeEntrustSaleMoney = this.$np.round(this.$np.times(this.copeEntrustSaleRate, this.copeEntrustSaleNum), this.findConfigsData.valuation)
          this.copeEntrustSaleMoney = this.$np.times(this.copeEntrustSaleRate, this.copeEntrustSaleNum)
          this.copeEntrustSaleMoney = this.$limitInputNum(this.copeEntrustSaleMoney, 9, this.findConfigsData.valuation);
        }
        if (!Number(this.copeEntrustSaleNum) || !Number(this.copeEntrustSaleRate)) {
          this.copeEntrustSaleMoney = 0
        }
      }
      if (num == 0) {
        this.copeEntrustSaleNum = '';
        this.copeEntrustSaleMoney = '';
      }
      this.isSaleInputState = false
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
      //购买价格不能为0
      if (!Number(this.copeEntrustBuyRate)) {
        return this.$commonFn.TipsMessage(this.$t('HashRate.pro.limit.notBuyPrice'))
      }
      //购买数量不能为0
      if (!Number(this.copeEntrustBuyNum)) {
        return this.$commonFn.TipsMessage(this.$t('HashRate.pro.limit.notBuyNum'))
      }
      //购买总金额不能为0
      if (!Number(this.copeEntrustBuyMoney)) {
        return this.$commonFn.TipsMessage(this.$t('HashRate.pro.limit.notBuyMoney'))
      }
      //不能小于最小量
      if (Number(this.copeEntrustBuyNum) < Number(this.findConfigsData.minTradeNum)) {
        return this.$commonFn.TipsMessage(this.$t('HashRate.pro.limit.notBuyMinNum'))
      }
      //判断购买金额是否大于可用余额
      if (Number(this.copeEntrustBuyMoney) > this.buyBalance) {
        return this.$commonFn.TipsMessage(this.$t('HashRate.pro.limit.notBuyMaxMoney'))
      }
      this.buyState = true
      let obj = {
        direction: 1,//买or卖
        triggerPrice:this.buyTriggerPrice,//触发价
        advertPrice: this.copeEntrustBuyRate,//价格
        num: Number(this.copeEntrustBuyNum),//数量
        tradePair: `${this.symblefrom}/${this.symbleto}`,//交易对
        // total: Number(this.copeEntrustBuyMoney),//总金额
        // isMarket: false,//市价or限价
        // platform: 1,//平台：1是自己，2是币池，3okey，4币池
      }
      this.$api.Trade.SaveRiskrule(obj).then((res) => {
        if (res.isSuccess) {
          // this.copeEntrustBuyRate = 0
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
      //卖出价格不能为0
      if (!Number(this.copeEntrustSaleRate)) {
        return this.$commonFn.TipsMessage(this.$t('HashRate.pro.limit.notSellPrice'))
      }
      //卖出数量不能为0
      if (!Number(this.copeEntrustSaleNum)) {
        return this.$commonFn.TipsMessage(this.$t('HashRate.pro.limit.notSellNum'))
      }
      //卖出总金额不能为0
      if (!Number(this.copeEntrustSaleMoney)) {
        return this.$commonFn.TipsMessage(this.$t('HashRate.pro.limit.notSellMoney'))
      }
      //不能小于最小量
      if (Number(this.copeEntrustSaleNum) < Number(this.findConfigsData.minTradeNum)) {
        return this.$commonFn.TipsMessage(this.$t('HashRate.pro.limit.notSellMinNum'))
      }
      //判断卖出金额是否大于可用余额
      if (Number(this.copeEntrustSaleNum) > this.saleBalance) {
        return this.$commonFn.TipsMessage(this.$t('HashRate.pro.limit.notSellMaxMoney'))
      }
      this.saleState = true
      let obj = {
        direction: 2,//买or卖
        triggerPrice:this.saleTriggerPrice,//触发价
        advertPrice: this.copeEntrustSaleRate,//价格
        num: Number(this.copeEntrustSaleNum),//数量
        tradePair: `${this.symblefrom}/${this.symbleto}`,//交易对
        // total: Number(this.copeEntrustSaleMoney),//总金额
        // isMarket: false,//市价or限价
        // platform: 1,//平台：1是自己，2是币池，3okey，4币池
      }
      this.$api.Trade.SaveRiskrule(obj).then((res) => {
        if (res.isSuccess) {
          // this.copeEntrustSaleRate = 0
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
    //输入触发价
    inputBuyTriggerPrice(){
      //处理金额小数位
      this.buyTriggerPrice = this.$limitInputNum(this.buyTriggerPrice, 9, this.findConfigsData.valuation);
    },
    //输入买单价格
    inputCopeEntrustBuyRate () {
      //处理金额小数位
      this.copeEntrustBuyRate = this.$limitInputNum(this.copeEntrustBuyRate, 9, this.findConfigsData.valuation);
      if (!Number(this.copeEntrustBuyRate) || !Number(this.copeEntrustBuyNum)) {
        //如果当前价格不存在就设置金额为空
        this.copeEntrustBuyMoney = 0;
        this.buyProportion = 0
      }
      //如果为true就是通过滚动条进来的否则就是输入数量进来的
      if (this.buyBalance && Number(this.copeEntrustBuyRate)) {
        let newVal = this.$np.round(this.$np.divide(Number(this.$np.times(Number(this.copeEntrustBuyNum), Number(this.copeEntrustBuyRate))), Number(this.buyBalance)), 6) * 100
        this.buyProportion = newVal > 100 ? 100 : newVal;
      }
      if (Number(this.copeEntrustBuyRate) && Number(this.copeEntrustBuyNum)) {
        //判断数量存在就进行计算金额
        // this.copeEntrustBuyMoney = this.$np.round(this.$np.times(this.copeEntrustBuyRate, this.copeEntrustBuyNum), this.findConfigsData.valuation)
        this.copeEntrustBuyMoney = this.$np.times(this.copeEntrustBuyRate, this.copeEntrustBuyNum)
      }
    },
    //输入买单数量
    inputCopeEntrustBuyNum (state) {
      this.isBuyInputState = true
      this.copeEntrustBuyNum = this.$limitInputNum(this.copeEntrustBuyNum, 9, this.findConfigsData.benchmark);
      //如果数量不存在那么金额也就不存在
      if (!Number(this.copeEntrustBuyRate) || !Number(this.copeEntrustBuyNum)) {
        this.copeEntrustBuyMoney = 0;
        this.buyProportion = 0
      }
      //如果为true就是通过滚动条进来的否则就是输入数量进来的
      if (this.buyBalance && Number(this.copeEntrustBuyRate)) {
        let newVal = this.$np.round(this.$np.divide(Number(this.$np.times(Number(this.copeEntrustBuyNum), Number(this.copeEntrustBuyRate))), Number(this.buyBalance)), 6) * 100
        this.buyProportion = newVal > 100 ? 100 : newVal;
      }
      if (state && Number(this.copeEntrustBuyRate) && Number(this.copeEntrustBuyNum)) {
        //如果当前价格存在并且当前数量也存在
        // this.copeEntrustBuyMoney = this.$np.round(this.$np.times(this.copeEntrustBuyNum, this.copeEntrustBuyRate), this.findConfigsData.valuation)
        this.copeEntrustBuyMoney = this.$np.times(this.copeEntrustBuyNum, this.copeEntrustBuyRate)
      }
    },
    //输入买单金额
    inputCopeEntrustBuyMoney (state) {
      this.isBuyInputState = true
      this.copeEntrustBuyMoney = this.$limitInputNum(this.copeEntrustBuyMoney, 9, this.findConfigsData.valuation);
      //如果买单金额不存在 滚动条为0 数量为0
      if (!Number(this.copeEntrustBuyMoney)) {
        this.copeEntrustBuyNum = 0
        this.buyProportion = 0
      }
      // //数量不存在 并且价格为0
      // if (!this.copeEntrustBuyNum && this.copeEntrustBuyRate == 0) {
      //   this.copeEntrustBuyNum = 0
      // }
      //如果为true就是通过滚动条进来的否则就是输入数量进来的
      if (state && this.buyBalance) {
        // let newVal = this.$np.round(this.$np.divide(Number(this.$np.times(Number(this.copeEntrustBuyNum), Number(this.copeEntrustBuyRate))), Number(this.buyBalance)), 6) * 100
        let newVal = this.$np.round(this.$np.divide(Number(this.copeEntrustBuyMoney), Number(this.buyBalance)), 6) * 100
        this.buyProportion = newVal > 100 ? 100 : newVal;
      }
      //如果为true代表目前手动输入
      if (state && Number(this.copeEntrustBuyMoney) && Number(this.copeEntrustBuyRate)) {
        //判断当前金额存在
        this.copeEntrustBuyNum = this.$np.round(this.$np.divide(this.copeEntrustBuyMoney, Number(this.copeEntrustBuyRate)), this.findConfigsData.benchmark)
      }
      //如果为true代表目前手动输入
      if (state && Number(this.copeEntrustBuyMoney) && !Number(this.copeEntrustBuyRate)) {
        //判断当前金额存在并且价格为0 数量直接为0
        this.copeEntrustBuyNum = 0
      }
      //如果为false代表目前自动输入
      if (!state && Number(this.copeEntrustBuyRate) && Number(this.copeEntrustBuyNum)) {
        //如果当前价格存在并且当前数量也存在
        this.copeEntrustBuyMoney = this.$np.round(this.$np.times(this.copeEntrustBuyNum, this.copeEntrustBuyRate), this.findConfigsData.valuation)
      }
    },
    //卖单触发价
    inputSaleTriggerPrice(){
      //处理金额小数位
      this.saleTriggerPrice = this.$limitInputNum(this.saleTriggerPrice, 9, this.findConfigsData.valuation);
    },
    //卖单价格
    inputCopeEntrustSaleRate () {
      //处理金额小数位
      this.copeEntrustSaleRate = this.$limitInputNum(this.copeEntrustSaleRate, 9, this.findConfigsData.valuation);
      // if (!Number(this.copeEntrustSaleMoney) || !Number(this.copeEntrustSaleRate)) {
      //   this.copeEntrustSaleMoney = 0;
      // }
      if (!Number(this.copeEntrustSaleRate) || !Number(this.copeEntrustSaleNum)) {
        //如果当前价格不存在就设置金额为空
        this.copeEntrustSaleMoney = 0;
        this.saleProportion = 0
      }
      if (Number(this.copeEntrustSaleNum) && Number(this.copeEntrustSaleRate)) {
        //乘 小数四舍五入保留基准币位数
        // this.copeEntrustSaleMoney = this.$np.round(this.$np.times(this.copeEntrustSaleNum, this.copeEntrustSaleRate), this.findConfigsData.valuation)
        this.copeEntrustSaleMoney = this.$np.times(this.copeEntrustSaleNum, this.copeEntrustSaleRate)
      }
    },
    //卖单数量
    inputCopeEntrustSaleNum (state) {
      this.isSaleInputState = true
      //如果为true就是通过滚动条进来的否则就是输入数量进来的
      this.copeEntrustSaleNum = this.$limitInputNum(this.copeEntrustSaleNum, 9, this.findConfigsData.benchmark);
      // if (!this.copeEntrustSaleNum) {
      //   //如果当前卖单数量不存在那么金额就为空  
      //   this.copeEntrustSaleMoney = '';
      //   this.saleProportion = 0
      // }
      if (!Number(this.copeEntrustSaleRate) || !Number(this.copeEntrustSaleNum)) {
        //如果当前价格不存在就设置金额为空
        this.copeEntrustSaleMoney = 0;
        this.saleProportion = 0
      }
      //如果为true就是通过滚动条进来的否则就是输入数量进来的
      if (this.saleBalance && Number(this.copeEntrustSaleNum)) {
        let newVal = this.$np.round(this.$np.divide(Number(this.copeEntrustSaleNum), Number(this.saleBalance)), 6) * 100
        this.saleProportion = newVal > 100 ? 100 : newVal;
      }
      if (!state && Number(this.copeEntrustSaleNum) && Number(this.copeEntrustSaleRate)) {
        //乘 小数四舍五入保留基准币位数
        // this.copeEntrustSaleMoney = this.$np.round(this.$np.times(Number(this.copeEntrustSaleNum), Number(this.copeEntrustSaleRate)), this.findConfigsData.valuation)
        this.copeEntrustSaleMoney = this.$np.times(Number(this.copeEntrustSaleNum), Number(this.copeEntrustSaleRate))
      }
      // if (this.copeEntrustSaleNum && this.copeEntrustSaleMoney && !this.copeEntrustSaleRate) {
      //   //除 如果当前价格不存在 数量存在 金额存在 就计算价格   当前数量/金额=价格
      //   this.copeEntrustSaleRate = this.$np.round(this.$np.divide(this.copeEntrustSaleNum, this.copeEntrustSaleMoney), this.findConfigsData.benchmark)
      // }
    },
    //卖单金额
    inputCopeEntrustSaleMoney (val) {
      this.isSaleInputState = true
      //处理金额小数位
      this.copeEntrustSaleMoney = this.$limitInputNum(this.copeEntrustSaleMoney, 9, this.findConfigsData.valuation);
      //如果卖单金额为空数量就设置为空
      if (!Number(this.copeEntrustSaleMoney)) {
        this.copeEntrustSaleNum = 0
        this.saleProportion = 0
      }
      // if (!this.copeEntrustSaleNum) {
      //   //如果当前卖单数量不存在那么金额就为空
      //   this.copeEntrustSaleMoney = '';
      // }
      //如果为true就是通过滚动条进来的否则就是输入数量进来的
      if (this.saleBalance && Number(this.copeEntrustSaleNum)) {
        let newVal = this.$np.round(this.$np.divide(Number(this.copeEntrustSaleNum), Number(this.saleBalance)), 6) * 100
        this.saleProportion = newVal > 100 ? 100 : newVal;
      }
      if (Number(this.copeEntrustSaleMoney) && Number(this.copeEntrustSaleRate)) {
        //除 小数四舍五入保留计价币位数
        this.copeEntrustSaleNum = this.$np.round(this.$np.divide(this.copeEntrustSaleMoney, this.copeEntrustSaleRate), this.findConfigsData.benchmark)
      }
      //如果为true代表目前手动输入
      if (Number(this.copeEntrustSaleMoney) && !Number(this.copeEntrustSaleRate)) {
        //判断当前金额存在并且价格为0 数量直接为0
        this.copeEntrustSaleNum = 0
      }
    },
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
.limit {
  padding-top: 25px !important;
  padding-bottom: 15px !important;
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
.exchange-block .exchange-block_input{
  margin-bottom: 4px;
}
.marketBtn{
  margin-top: 10px;
}
</style>
