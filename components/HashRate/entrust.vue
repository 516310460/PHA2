<style scoped rel="stylesheet/scss" lang="scss">
.entrust-list {
  width: 280px;
  background-color: $cl_content;
  display: inline-block;
  height: 782px;
  float: left;

  .entrust-list_title {
    padding-right: 10px;
    color: $cl_CED3DD;
    line-height: 30px;
    font-size: 12px;
    border-bottom: 1px solid $cl_292E39;
    position: relative;

    &.clearfix {
      font-size: 14px;
      color: #8790a1;
      padding-left: 10px;
      border-bottom: 1px solid #292e39;
      span {
        line-height: 30px;
        font-weight: bold;
      }
    }

    &.entrust-list_Bottom {
      border-bottom: 0 !important;
    }

    .dot_right {
      font-weight: normal;
    }

    .dot_tip {
      font-size: 12px;
      color: $cl_5E6573;
      margin-right: 8px;
    }

    .dot_tip_select {
      display: inline-block;
      position: relative;
      color: $cl_CED3DD;
    }

    .dot_tip_select_content {
      position: absolute;
      font-size: 12px;
      color: #ffffff;
      right: 0;
      text-align: center;
      line-height: 36px;
      background-color: #292e39;
      width: 70px;
      z-index: 2;
      top: 30px;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
      border-radius: 2px;
    }

    .dot_tip_select_content li {
      cursor: pointer;
    }

    .dot_tip_select_content li:hover,
    .dot_tip_select_content li.active {
      background-color: #333946;
    }

    .dot_tip_select_tip {
      font-size: 12px;
      color: $cl_CED3DD;
      cursor: pointer;
    }

    .dot_tip_select_tip:after {
      content: '';
      display: inline-block;
      margin-left: 4px;
      vertical-align: middle;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 3px 0 3px;
      border-color: $cl_CED3DD transparent transparent transparent;
    }

    .select_list_tab {
      display: inline-block;
      height: 30px;

      .all,
      .buy,
      .sell {
        display: inline-block;
        width: 34px;
        height: 30px;
        background-size: 14px 14px;
        background-repeat: no-repeat;
        cursor: pointer;
        background-position: center;
      }

      .active {
        background-color: #131722;
      }

      .all {
        background-image: url('../../static/images/exchange_trading_icon_center.png');
      }

      .all:hover,
      .all.active {
        background-image: url('../../static/images/exchange_trading_icon_center.png');
      }

      .sell {
        background-image: url('../../static/images/exchange_trading_icon_up.png');
      }

      .sell:hover,
      .sell.active {
        background-image: url('../../static/images/exchange_trading_icon_up.png');
      }

      .sell.active,
      .all.active {
        // border-top: 2px solid $cl_link;
      }

      .buy {
        background-image: url('../../static/images/exchange_trading_icon_down.png');
      }

      .buy:hover,
      .buy.active {
        background-image: url('../../static/images/exchange_trading_icon_down.png');
      }

      .buy.active {
        // border-top: 2px solid $cl_link;
      }
    }
  }

  .entrust-list_content_4 {
    dt span.price,
    dd span.price {
      // text-align: left;
      min-width: 90px;
    }

    .body.buying .price {
      color: $cl_sell;
    }

    .body.average .price {
      color: $cl_buy;
    }

    dt span.num,
    dd span.num {
      // text-align: right;
      min-width: 75px;
    }

    dt span.money,
    dd span.money {
      // text-align: right;
      width: 40%;
      padding-right: 8px;
    }

    body:hover {
      background-color: #383655;
    }

    .title {
      min-width: 43px;
      color: $cl_sell;
      padding-left: 8px;
    }

    dt span.price.title-price,
    .average .price,
    dd span.price {
      // padding-left: 10px;
    }
    .title-price {
      .imgMiddle {
        margin-top: -1px;
        width: 12px;
      }
    }
  }

  /*委托列表*/
  .entrust-list_content {
    font-size: 12px;
    line-height: 22px;
    width: 100%;
    color: $cl_CED3DD;

    #buyWS {
      position: absolute;
      left: 0;
      width: 100%;
      bottom: 0;
      &.activelisttab3 {
        // top: 0;
      }
    }

    .header {
      line-height: 30px;
      height: 30px;
      // padding: 0 2px;
      display: table;
      width: 100%;
      color: $cl_5E6573;
      padding: 0 5px;
    }

    .body {
      display: table;
      width: 100%;
      cursor: pointer;
      position: relative;
      // margin: 2px 0;
      padding: 0 5px;

      &:hover {
        background-color: #383655;
      }
    }

    dt span,
    dd span {
      display: table-cell;
      white-space: nowrap;
      z-index: 1;
      position: relative;
    }

    .progress {
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      z-index: 0;
      // margin: 0 2px;
    }

    .buying .progress {
      background: rgba(233, 108, 66, 0.1);
    }

    .average .progress {
      background: rgba(3, 191, 123, 0.1);
    }
  }

  .entrust-list_content_center {
    font-size: 13px;
    line-height: 40px;
    height: 40px;
    padding: 0 8px;
    border-top: 1px solid #292e39;
    border-bottom: 1px solid #292e39;

    .new-money-dot {
      font-size: 18px;
      font-weight: 600;
    }

    > span {
      float: left;
      width: 33.333%;
      color: $cl_c5c;
      padding: 0 5px;
      text-align: right;
    }

    .price {
      text-align: center;
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .num {
      width: 25%;
    }

    .money {
      width: 33%;
    }

    .tip {
      margin-left: 10px;
    }

    .rise {
      color: $cl_buy;
    }

    .fall {
      color: $cl_sell;
    }
  }
}

.body_full .entrust-list_content.sell_content .flex-to-bottom {
  display: flex !important;
  flex-direction: column;
  justify-content: flex-end;
}

.entrust-list .entrust-list_content.sell_content {
  .flex-to-bottom .body {
    margin: 0 0 2px 0;
  }
}

.entrust-list_body {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.entrust-list {
  display: flex;
  flex-direction: column;
}

.entrust-list_body.body_full {
  .entrust-list_content {
    height: 50%;
    overflow: hidden;
    position: relative;
  }
}

.entrust-list_body.body_single {
  .entrust-list_content {
    flex: 1;
    overflow: hidden;
    position: relative;
  }
}
</style>
<template>
  <div class="entrust-list">
    <div
      v-if="!isShowTitle"
      class="entrust-list_title clearfix"
    >
      <span>{{$t('HashRate.pro.entrust.title')}}</span>
    </div>

    <!--header-->
    <!-- <dl class="entrust-list_content_title entrust-list_content entrust-list_content_4 bk112">
      <dt class="header">
        <span class="price title-price tl">价格 ({{symbleto}})</span>
        <span class="num tl">数量 ({{symblefrom}})</span>
        <span class="money tr">累计 ({{symblefrom}})</span>
      </dt>
    </dl> -->
    <el-row class="entrust-list_content_title entrust-list_content entrust-list_content_4 bk112">
      <el-col
        class="header"
        :span="24"
      >
        <el-col
          class="price title-price tl"
          :span="8"
        >
          {{$t('HashRate.pro.entrust.table1')}} ({{symbleto}})
        </el-col>
        <el-col
          class="num tr"
          :span="8"
        >
          {{$t('HashRate.pro.entrust.table2')}} ({{symblefrom}})
        </el-col>
        <el-col
          class="money tr"
          :span="8"
        >
          {{$t('HashRate.pro.entrust.table3')}} ({{symblefrom}})
        </el-col>
      </el-col>
    </el-row>
    <div
      class="entrust-list_body bk112"
      v-buybit-loading="isLoading"
      :class="{'body_full':activelisttab==1,'body_single':activelisttab!=1}"
    >
      <!--卖盘-->
      <dl
        class="entrust-list_content entrust-list_content_4 sell_content"
        v-if="activelisttab!=2"
      >
        <!-- v-bar -->
        <div ref="entrustsell">
          <div
            :class="`activelisttab${activelisttab}`"
            id="buyWS"
          >
            <!-- <dd
              class="body buying"
              ref="selling"
              v-for="(item, index) in sellData"
              :key="index"
              @click="clickPrice(item)"
            >
              <span
                class="progress"
                :style="{'width':`calc(${getsellprogress(item, sellData)}% - 4px)`}"
              ></span>
              <span class="price title-price tl">
                {{item.price}}
              </span>
              <span class="num tl">{{item.number}}</span>
              <span class="money tr">{{item.total}}</span>
            </dd> -->
            <el-row
              class="body buying"
              ref="selling"
              v-for="(item, index) in sellData"
              :key="index"
              @click.native="clickPrice(item)"
            >
              <el-col :span="24">
                <el-col
                  class="progress"
                  :span="24"
                  :style="{'width':`calc(${getsellprogress(item, sellData)}%)`}"
                >
                </el-col>
                <el-col
                  class="price title-price tl"
                  :span="8"
                >
                  {{item.price}}
                </el-col>
                <el-col
                  class="num tr"
                  :span="8"
                >
                  {{item.number}}
                </el-col>
                <el-col
                  class="money tr"
                  :span="8"
                >
                  {{item.total}}
                </el-col>
              </el-col>
            </el-row>
          </div>
        </div>
      </dl>
      <!--最新价-->
      <!-- v-if="activelisttab == 1 && !isLoading" -->
      <div class="entrust-list_content_center">
        <p class="price">
          <span
            class="new-money-dot"
            :class="newData.price == 0 ? ($store.state.background == 'day' ? 'cl52' : 'cl29') : (newData.isBuy?'rise':'fall')"
          >{{newData.price}}</span>
          <span
            class="tip"
            :class="newData.price == 0 ? ($store.state.background == 'day' ? 'cl52' : 'cl29') : (newData.isBuy?'rise':'fall')"
          >≈ {{newData.priceCNY}} CNY</span>
        </p>
      </div>
      <!--买盘-->
      <dl
        class="entrust-list_content entrust-list_content_4"
        v-if="activelisttab!=3"
      >
        <!-- v-bar -->
        <div>
          <div>
            <!-- <dd
              class="body average"
              ref="selling"
              v-for="(item, index) in buyData"
              :key="index"
              @click="clickPrice(item)"
            >
              <span
                class="progress"
                :style="{'width':`calc(${getsellprogress(item, buyData)}% - 4px)`}"
              ></span>
              <span class="price title-price tl">
                {{item.price}}
              </span>
              <span class="num tl">{{item.number}}</span>
              <span class="money tr">{{item.total}}</span>
            </dd> -->
            <el-row
              class="body average"
              ref="selling"
              v-for="(item, index) in buyData"
              :key="index"
              @click.native="clickPrice(item)"
            >
              <el-col :span="24">
                <el-col
                  :span="24"
                  class="progress"
                  :style="{'width':`calc(${getsellprogress(item, buyData)}%)`}"
                >
                </el-col>
                <el-col
                  class="price title-price tl"
                  :span="8"
                >
                  {{item.price}}
                </el-col>
                <el-col
                  class="num tr"
                  :span="8"
                >
                  {{item.number}}
                </el-col>
                <el-col
                  class="money tr"
                  :span="8"
                >
                  {{item.total}}
                </el-col>
              </el-col>
            </el-row>
          </div>
        </div>
      </dl>
    </div>

    <div class="entrust-list_title entrust-list_Bottom clearfix">
      <div class="select_list_tab left">
        <span
          class="all"
          :class="{'active':activelisttab==1}"
          :title="$t('HashRate.pro.entrust.buyAndSellTitle')"
          @click="activelisttab = 1"
        ></span>
        <span
          class="buy"
          :class="{'active':activelisttab==2}"
          :title="$t('HashRate.pro.entrust.buyTitle')"
          @click="activelisttab = 2"
        ></span>
        <span
          class="sell"
          :class="{'active':activelisttab==3}"
          :title="$t('HashRate.pro.entrust.sellTitle')"
          @click="activelisttab = 3"
        ></span>
      </div>
      <!-- <div class="dot_right right">
        <div class="dot_tip_select">
          <span
            class="dot_tip_select_tip"
            @click.stop="showDot"
          >深度{{dotType}}</span>
        </div>
      </div>
      <ul
        class="dot_tip_select_content"
        v-show="isshowDot"
      >
        <li
          v-for="(m,index) in dotList"
          :key="index"
          :class="{'active':dotType==m.key}"
          @click="setDotType(m)"
        >深度{{m.key}}
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'articles',
  props: {
    dcs: {
      type: Object,
      default: function () {
        return {}
      }
    },
    dailyDetail: {
      type: Object,
      default: function () {
        return {}
      }
    },
    symbleParameString: '',
    symblefrom: '',
    symbleto: '',
    isShowTitle: true
  },
  data () {
    return {
      initBuyState: false,//买单是否初始化了
      initSaleState: false,//卖单是否初始化了
      dotTypeLoading: true,
      entrustsaleFirst: false,
      entrustbuyFirst: false,
      activelisttab: 1,
      dotList: [{
        key: 1,
        value: ''
      }, {
        key: 2,
        value: '2'
      }, {
        key: 3,
        value: '3'
      }, {
        key: 4,
        value: '4'
      }, {
        key: 5,
        value: '5'
      }],
      dotType: 1,
      dotValue: '',//深度切换时需要的值
      lastdotType: 8,
      isshowDot: false,
      buyData: [],//深度买盘数据
      sellData: [],//深度卖盘数据
      newData: {
        open: 0,//开盘价
        platform: 1,//平台
        isBuy: false,//是否买卖
        price: 0,//价格
        priceCNY: 0,//人民币价格
      },//最新数据
      isLoading: true,//买卖深度数据是否有数据
      findConfigsData: {//交易输入配置
        minTradeNum: 0,//交易对最小交易量
        maxTradeNum: 0,//交易对最大交易量
        valuation: 0,//计价币最大数位小数位数
        benchmark: 0,//基准币最大小数位
        rate: 0,//交易对手续百分比
      },
    }
  },
  mounted () {
    this.$nextTick(() => {
      //获取最新实时成交数据
      // this.$bus.on('tradeHashRateRecordData', (data) => {
      //   // this.newData.isBuy = data.data[0].isBuy;
      //   // this.newData.platform = data.data[0].platform;
      // })

      //将最新实时信息发送给深度、实时、限价
      this.$bus.on('HashRateNewTitleData', data => {
        this.newData.isBuy = data.open < data.close
        this.newData.open = data.open
        this.newData.price = data.close
        this.newData.priceCNY = data.cnyClose
        // //发送价格和CNY价格到限价
        // this.$bus.emit('limitHashRatePriceObj', this.newData)
      })
      //接受监听深度盘口
      this.$bus.on('DepthHashRateData', data => {
        this.onMessage(data)
      })
      // this.init()
      document.addEventListener('click', () => {
        this.isshowDot = false
      })
    });
  },
  created () {
  },
  methods: {
    init () {
      // this.getCoinTeamConfig();
    },
    async onMessage (data) {
      if (data.data && data.data.length) {
        let res = data.data
        // console.log(res)
        //判断第一条数据是买还是卖
        if (res[0].isBuy) {
          this.buyData = []
        } else {
          this.sellData = []
        }
        res.forEach((item, index) => {
          if (item.isBuy) {
            //判断如果为true就是买就push到买盘数组  
            if (item.number == 0) return
            this.buyData.push(item)
          } else {
            //判断如果为false就是卖就push到卖盘数组
            if (item.number == 0) return
            this.sellData.push(item)
          }
        });
        if (!res[0].isBuy) {
          this.sellData = this.sellData.reverse()
        }
        await this.$bus.emit('buyHashRateDepthData', this.buyData)
        await this.$bus.emit('sellHashRateDepthData', this.sellData)
        if (!this.initBuyState) {
          //发送价格和CNY价格到限价
          this.$bus.emit('limitHashRatePriceObj', {
            buy: this.buyData,
            sell: this.sellData,
            newPrice: this.newData.price
          })
          this.initBuyState = true;
        }
        if (!this.initSaleState && this.sellData.length) {
          //发送价格和CNY价格到限价
          this.$bus.emit('limitHashRatePriceObj', {
            buy: this.buyData,
            sell: this.sellData,
            newPrice: this.newData.price
          })
          this.initSaleState = true;
        }
        this.isLoading = false;
      }
    },
    // //获取交易配置
    // getCoinTeamConfig () {
    //   let obj = `${this.symblefrom}-${this.symbleto}`
    //   this.$api.HashRate.getCoinTeamConfig(obj).then((res) => {
    //     if (res && res.status === 200) {
    //       //key:配置类型 value:配置内容;1:最小交易量,2:最大交易量,3:价格最大小数位,4:数量最大小数位,5:taker手续分百分比,6:maker手续分百分比,7:限价买是否可购买,8:限价卖是否出售,9:市价买是否可购买，10:市价卖是否可出售
    //       this.findConfigsData = {
    //         minTradeNum: res.data.data[1] || 0,//交易对最小交易量
    //         maxTradeNum: res.data.data[2] || 0,//交易对最大交易量
    //         valuation: res.data.data[3] || 0,//计价币最大数位小数位数
    //         benchmark: res.data.data[4] || 0,//基准币最大小数位
    //         rate: res.data.data[5] || 0,//交易对手续百分比
    //       }
    //     }
    //   })
    // },
    getsellprogress (item, all) {
      let newArray = [];
      let maxVal = null;
      for (const childItem of all) {
        newArray.push(childItem.number)
      }
      //获取最大数量
      maxVal = Math.max.apply(null, newArray);
      if (item.number) {
        // 当前数量/最大数量*100
        return this.$Calculation.accMul(this.$Calculation.accDiv(item.number, maxVal), 100)
      }
    },
    setDotType (item) {
      /*请求的数据是否加载完*/
      // if (this.sellData.length && this.buyData.length) {
      // if (this.isLoading == false) {
      this.buyData = []
      this.sellData = []
      this.dotTypeLoading = false
      this.lastdotType = this.dotType
      this.dotType = item.key
      this.dotValue = item.value
      //取消订阅
      this.subSource.close();
      this.init();
      // }
      // }
      // this.showDot()
      // this.$socket.cleartimer(this.$socket.url.quotation_marketing_depth_get)
      // if (val != 8) {
      //   this.$socket.uninvoke(this.$socket.type.quotation_marketing_depth_get)
      //   this._getDaily()
      // } else {
      //   this.getDaily()
      // }
    },
    showDot (val) {
      // if (typeof val == "boolean") {
      //   this.isshowDot = val
      // } else {
      this.isshowDot = !this.isshowDot
      // }
    },
    //点击盘口列表将价格传递给限价
    clickPrice (item) {
      this.$bus.emit('limitHashRatePrice', item.price)
    }
  },
  //销毁前调用
  destroyed () {
  },
}
</script>
