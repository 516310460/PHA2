<style scoped rel="stylesheet/scss" lang="scss">
.knockdown-list {
  float: left;
  width: 280px;
  height: 388px;
  background-color: $cl_content;
  margin: 0 6px 6px 0;
  .knockdown-list_title {
    font-size: 14px;
    color: $cl_8790A1;
    padding-left: 10px;
    border-bottom: 1px solid $cl_292E39;
    > span {
      line-height: 30px;
      font-weight: bold;
    }
  }
  .knockdown-list_content {
    font-size: 12px;
    width: 100%;
    color: $cl_CED3DD;
    line-height: 25px;
    position: relative;
    .header {
      line-height: 30px;
      height: 30px;
      // padding: 0 2px;
      display: table;
      width: 100%;
      padding: 0 5px;
      // padding: 0 1%;
      color: $cl_5E6573;
      background: $co112;
      .knockdown-list_content_body-left {
        width: 90px;
      }
      .knockdown-list_content_body-center {
        width: 78px;
      }
      .knockdown-list_content_body-right {
        width: 93px;
        padding-right: 5px;
      }
    }
    .body {
      height: 25px;
      line-height: 25px;
      display: table;
      width: 100%;
      padding: 0 5px;
      // padding: 0 1%;
      // transition: background-color 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
      .imgMiddle {
        margin-top: -1px;
        width: 12px;
      }
      &:hover {
        // transition: none;
        background-color: #383655;
      }
      .knockdown-list_content_body-left {
        width: 90px;
      }
      .knockdown-list_content_body-center {
        width: 78px;
      }
      .knockdown-list_content_body-right {
        width: 93px;
        padding-right: 5px;
      }
    }
    .body.new {
      background-color: $cl_282D37;
    }

    .time {
      // padding-left: 8px;
    }
    .money {
      // padding-right: 16px;
    }

    .knockdown-list_content_body {
      width: 100%;
      // padding: 0 1%;
      overflow-y: auto;
      height: 328px;
      background: $co112;
      /deep/.MsgScrollbar {
        height: 100%;
        .el-scrollbar__wrap {
          overflow-x: hidden !important;
        }
      }
      .num.buy {
        color: $cl_buy;
      }

      .num.sale {
        color: $cl_sell;
      }

      dd:hover {
        // transition: none;
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
    /*      dd:hover {
              background-color: $cl_282D37;
            }*/

    dt span.time,
    dd span.time {
      width: 20%;
      // display: block;
      // float: left;
    }

    dt span.num,
    dd span.num {
      width: 39%;
      // width: 25%;
      // display: block;
      // float: left;
    }

    dt span.money,
    dd span.money {
      width: 41%;
      // display: block;
      // float: left;
    }
  }
}
</style>
<template>
  <div class="knockdown-list">
    <div
      v-if="!isShowTitle"
      class="knockdown-list_title"
    >
      <span @click="setOrderType('new')">{{$t('HashRate.pro.knockdown.title')}}</span>
    </div>
    <dl class="knockdown-list_content">
      <el-row>
        <el-col
          class="header"
          :span="24"
        >
          <section class="num tl knockdown-list_content_body-left fl">
            {{$t('HashRate.pro.knockdown.table1')}} ({{symbleto}})
          </section>
          <section class="num tr knockdown-list_content_body-center fl">
            {{$t('HashRate.pro.knockdown.table2')}} ({{symblefrom}})
          </section>
          <section class="money tr knockdown-list_content_body-right fl">
            {{$t('HashRate.pro.knockdown.table3')}}
          </section>
          <!-- <el-col
            class="price title-price tl"
            :span="10"
          >
            成交价 ({{symbleto}})
          </el-col>
          <el-col
            class="num tr"
            :span="8"
          >
            数量 ({{symblefrom}})
          </el-col>
          <el-col
            class="money tr"
            :span="6"
          >
            时间 ({{symblefrom}})
          </el-col> -->
        </el-col>
      </el-row>

      <!-- v-bar -->
      <div
        class="knockdown-list_content_body buybit-loading"
        v-buybit-loading="isLoading"
      >
        <el-scrollbar
          class="MsgScrollbar"
          ref="TransactionPairsScrollbar"
        >
          <div>
            <!-- <dd
              class="body"
              v-for="(item, index) in RealTimeTradeData"
              :key="index"
            >
              <span
                class="num tl"
                :class="item.isBuy ? 'buy' : 'sale'"
              >
                {{item.price}}
              </span>
              <span class="money tl">{{item.number}}</span>
              <span class="time">{{item.createTime ? item.createTime.split(' ')[1] : ''}}</span>
            </dd> -->
            <el-row
              class="body"
              v-for="(item, index) in RealTimeTradeData"
              :key="index"
            >
              <el-col :span="24">
                <section
                  class="num tl knockdown-list_content_body-left fl"
                  :class="item.isBuy ? 'buy' : 'sale'"
                >
                  {{item.price}}
                </section>
                <section class="num tr knockdown-list_content_body-center fl">
                  {{item.number}}
                </section>
                <section class="num tr knockdown-list_content_body-right fl">
                  {{item.createTime ? item.createTime.split(' ')[1] : ''}}
                </section>
                <!-- <el-col
                  :span="10"
                  class="num tl"
                  :class="item.isBuy ? 'buy' : 'sale'"
                >
                  {{item.price}}
                </el-col>
                <el-col
                  class="money tr knockdown-list_content_body-center"
                  :span="8"
                >
                  {{item.number}}
                </el-col>
                <el-col
                  class="time tr knockdown-list_content_body-right"
                  :span="6"
                >
                  {{item.createTime ? item.createTime.split(' ')[1] : ''}}
                </el-col> -->
              </el-col>
            </el-row>
          </div>
        </el-scrollbar>
      </div>
    </dl>
  </div>
</template>
<script>

export default {
  name: 'articles',
  computed: {},
  props: ['symbleParameString', 'symblefrom', 'symbleto', 'dcs', 'isShowTitle'],
  // head () {
  //   return {
  //     title: this.title
  //   }
  // },
  head () {
    return {
      title: this.$t('HashRate.pro.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('HashRate.Home.headTitle')
        },
        {
          name: "keywords",
          content: this.$t('HashRate.Home.headTitle')
        }
      ]
    }
  },
  data () {
    return {
      //交易明细
      tradingDetail: {
        'new': [],
        'own': []
      },
      orderType: 'new',
      loading: true,
      detailsub: `market.${this.symbleParameString}.detail`,
      sub: `market.${this.symbleParameString}.trade.detail`,
      pagehidden: false,
      // title: 'BuyBit | ' + '币买-数字资产场外交易平台',
      RealTimeTrade: null,//实时交易对象
      RealTimeTradeData: [],//实时交易数据
      isLoading: true,//实时交易数据是否有数据
      open: 0,//开盘价
    }
  },
  mounted () {
    this.$nextTick(() => {

      //接受监听实时成交
      this.$bus.on('TradeHashRateData', data => {
        this.onMessage(data)
      })

      //最新成交
      this.init();

      //激活页面
      document.addEventListener("visibilitychange", () => {
        this.pagehidden = document.hidden
      })
    });
  },
  created () {
  },
  methods: {
    async init () {
      //将最新实时信息发送给深度、实时、限价
      this.$bus.on('HashRateNewTitleData', async data => {
        this.open = await data.open;
        //必须要有开盘价才能判断颜色
        if (this.RealTimeTradeData && this.RealTimeTradeData.length && this.open) {
          let newArray = []
          for (var i = this.RealTimeTradeData.length - 1; i >= 0; i--) {
            newArray.push({
              coinTeam: this.RealTimeTradeData[i].coinTeam,
              createTime: this.RealTimeTradeData[i].createTime,
              dealWay: this.RealTimeTradeData[i].dealWay,
              id: this.RealTimeTradeData[i].id,
              isBuy: this.RealTimeTradeData[i].price >= Number(this.open) ? true : false,//判断价格是否大于开盘价 大于为涨 小于为false
              joinOid: this.RealTimeTradeData[i].joinOid,
              number: this.RealTimeTradeData[i].number,
              oid: this.RealTimeTradeData[i].oid,
              poundage: this.RealTimeTradeData[i].poundage,
              price: this.RealTimeTradeData[i].price,
              remark: this.RealTimeTradeData[i].remark,
              totalPrice: this.RealTimeTradeData[i].totalPrice,
              uid: this.RealTimeTradeData[i].uid,
            })
          }
          // this.RealTimeTradeData.forEach((item, index) => {
          //   newArray.push({
          //     coinTeam: item.coinTeam,
          //     createTime: item.createTime,
          //     dealWay: item.dealWay,
          //     id: item.id,
          //     isBuy: item.price >= Number(this.open) ? true : false,//判断价格是否大于开盘价 大于为涨 小于为false
          //     joinOid: item.joinOid,
          //     number: item.number,
          //     oid: item.oid,
          //     poundage: item.poundage,
          //     price: item.price,
          //     remark: item.remark,
          //     totalPrice: item.totalPrice,
          //     uid: item.uid,
          //   })
          // });
          this.RealTimeTradeData = newArray
          this.busPushData()
        }
      })
    },
    onMessage (data) {
      if (data.data && data.data.length) {
        //多条数据
        let res = data.data
        let newArray = []
        for (var i = res.length - 1; i >= 0; i--) {
          newArray.push({
            coinTeam: res[i].coinTeam,
            createTime: res[i].createTime,
            dealWay: res[i].dealWay,
            id: res[i].id,
            isBuy: res[i].price >= Number(this.open) ? true : false,//判断价格是否大于开盘价 大于为涨 小于为false
            joinOid: res[i].joinOid,
            number: res[i].number,
            oid: res[i].oid,
            poundage: res[i].poundage,
            price: res[i].price,
            remark: res[i].remark,
            totalPrice: res[i].totalPrice,
            uid: res[i].uid,
          })
        }
        // res.forEach((item, index) => {
        //   newArray.push({
        //     coinTeam: item.coinTeam,
        //     createTime: item.createTime,
        //     dealWay: item.dealWay,
        //     id: item.id,
        //     isBuy: item.price >= Number(this.open) ? true : false,//判断价格是否大于开盘价 大于为涨 小于为false
        //     joinOid: item.joinOid,
        //     number: item.number,
        //     oid: item.oid,
        //     poundage: item.poundage,
        //     price: item.price,
        //     remark: item.remark,
        //     totalPrice: item.totalPrice,
        //     uid: item.uid,
        //   })
        // });
        this.RealTimeTradeData = newArray
      } else if (data.data && !data.data.length && this.RealTimeTradeData && this.RealTimeTradeData.length) {
        //单条数据并且有历史数据数组存在给第一条数据加入数组
        this.RealTimeTradeData.unshift({
          coinTeam: data.data.coinTeam,
          createTime: data.data.createTime,
          dealWay: data.data.dealWay,
          id: data.data.id,
          isBuy: data.data.price >= Number(this.open) ? true : false,//判断价格是否大于开盘价 大于为涨 小于为false
          joinOid: data.data.joinOid,
          number: data.data.number,
          oid: data.data.oid,
          poundage: data.data.poundage,
          price: data.data.price,
          remark: data.data.remark,
          totalPrice: data.data.totalPrice,
          uid: data.data.uid,
        })
      } else if (data.data && !data.data.length && !this.RealTimeTradeData.length) {
        //单条数据并且没有历史数据数组存在push到RealTimeTradeData对象
        this.RealTimeTradeData.push({
          coinTeam: data.data.coinTeam,
          createTime: data.data.createTime,
          dealWay: data.data.dealWay,
          id: data.data.id,
          isBuy: data.data.price >= Number(this.open) ? true : false,//判断价格是否大于开盘价 大于为涨 小于为false
          joinOid: data.data.joinOid,
          number: data.data.number,
          oid: data.data.oid,
          poundage: data.data.poundage,
          price: data.data.price,
          remark: data.data.remark,
          totalPrice: data.data.totalPrice,
          uid: data.data.uid,
        })
      }
      this.busPushData()
      this.isLoading = false;
    },
    //获取到数据都需要调用该方法进行数据传递
    busPushData () {
      let tradeRecordData = {
        newBuyData: [],
        newSellData: []
      };
      for (const item of this.RealTimeTradeData) {
        if (item.isBuy) {
          tradeRecordData.newBuyData.push(item)
        } else {
          tradeRecordData.newSellData.push(item)
        }
      }
      // if (tradeRecordData.newBuyData.length || tradeRecordData.newSellData.length) {
      //   //提交最新实时成交数据
      //   this.$bus.emit('tradeHashRateRecordData', {
      //     data: this.RealTimeTradeData,
      //     buyAndSellData: tradeRecordData
      //   });
      // }
    },
    //设置订单类型
    setOrderType (num) {
      this.orderType = num
    }
  },
  //销毁前调用
  destroyed () {
  },
  beforeDestroy () {
  }
}
</script>
