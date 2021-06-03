<template>
  <div>
    <div class="market-echart-time">
      <div class="echart-time-text">{{$t('HashRate.pro.entrust.xuanzheshijian')}}</div>
      <div class="echart-time-list">
        <div
          :class="{'active': type == 1}"
          @click="getOpenPriceOpenPrice(1)"
        >1月</div>
        <div
          :class="{'active': type == 3}"
          @click="getOpenPriceOpenPrice(3)"
        >3月</div>
        <div
          :class="{'active': type == 6}"
          @click="getOpenPriceOpenPrice(6)"
        >6月</div>
        <div
          :class="{'active': type == 12}"
          @click="getOpenPriceOpenPrice(12)"
        >1年</div>
      </div>
    </div>
    <div
      v-show="xArray.length != 0 && xArray.length != 0"
      class="info-mid-right"
      style="width: 477PX;height: 220px;"
      id="earningChart"
    ></div>
    <div
      v-show="xArray.length == 0 && xArray.length == 0"
      style="text-align: center;line-height: 200px;color: #909399;font-size: 14px;"
    >暂无数据</div>
  </div>
</template>

<script>
export default {
  name: "xbit-trend",
  data () {
    return {
      earningChart: '',
      yesterdayData: {},
      xArray: [],
      yArray: [],
      type: 1,
      marchshow: false,
      juneShow: false,
      decemberShow: false
    };
  },
  created () {
    this.getOpenPriceOpenPrice(1)
    let listParam3 = '?coinTeam=XBIT-USDT&distanceMonth=3'
    this.$api.HashRate.getOpenPricePowerShow(listParam3).then(res => {
      if (res.data.code === 200) {
        this.marchshow = res.data.data
      }
    });
    let listParam6 = '?coinTeam=XBIT-USDT&distanceMonth=6'
    this.$api.HashRate.getOpenPricePowerShow(listParam6).then(res => {
      if (res.data.code === 200) {
        this.juneShow = res.data.data
      }
    });
    let listParam12 = '?coinTeam=XBIT-USDT&distanceMonth=12'
    this.$api.HashRate.getOpenPricePowerShow(listParam12).then(res => {
      if (res.data.code === 200) {
        this.decemberShow = res.data.data
      }
    });
  },
  mounted () {
    this.$nextTick(() => {

    });
  },
  methods: {
    getOpenPriceOpenPrice (month) {
      if (month == 3 && !this.marchshow) {
        return this.$commonFn.TipsMessage('3月' + this.$t('common.DiscountArea.noData'))
      } else if (month == 6 && !this.juneShow) {
        return this.$commonFn.TipsMessage('6月' + this.$t('common.DiscountArea.noData'))
      } else if (month == 12 && !this.decemberShow) {
        return this.$commonFn.TipsMessage('1年' + this.$t('common.DiscountArea.noData'))
      }
      this.type = month
      let listParams = '?coinTeam=XBIT-USDT' + '&distanceMonth=' + month
      this.$api.HashRate.getOpenPriceCountOpenPrice(listParams).then(res => {
        if (res.data.code === 200) {
          this.xArray = res.data.data.xaxis
          this.yArray = res.data.data.series
          this.earningChart = this.$echarts.init(document.getElementById('earningChart'));
          this.earningChartConfig(this.earningChart, this.xArray);
        }
      });
    },
    /*
     * 配置XBIT 走势
     * chartDom : 图表dom
     * chartData: 图表数据
     * */
    earningChartConfig (chartDom, xaxisInterval) {
      let option = {
        title: {
          // text: '近7日收益曲线',
          x: 'right',
          y: -5,
          textStyle: {
            color: '#606060',
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
        tooltip: {
          trigger: 'axis',
        },
        // xAxis: {
        //   type: 'category',
        //   axisLine: {
        //     lineStyle: {
        //       color: '#D7D4D7'
        //     }
        //   },
        //   axisLabel: {
        //     color: '#99908B',
        //     interval (index, value) {
        //       if (index == 0) {
        //         return true
        //       } else if (index == xaxisInterval.length - 1) {
        //         return true
        //       } else if (index == Math.ceil((xaxisInterval.length - 1) / 2)) {
        //         return true
        //       } else if (index == Math.ceil((xaxisInterval.length - 2) / 4)) {
        //         return true
        //       } else if (index == Math.ceil((xaxisInterval.length - 2) * 0.75)) {
        //         return true
        //       }
        //     },
        //     rotate: 0
        //   },
        //   boundaryGap: false,
        //   data: this.xArray
        // },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: '#D7D4D7'
            }
          },
          axisLabel: {
            color: "#99908B",
            rotate: 0
          },
          boundaryGap: false,
          data: this.xArray
        },
        yAxis: {
          type: 'value',
          // name: 'BTC',
          splitNumber: 4,
          nameTextStyle: {
            color: '#606060',
            fontSize: 16,
            fontWeight: 'bold',
          },
          axisTick: {
            lineStyle: {
              color: '#D7D4D7'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#D7D4D7',

            }
          },
          axisLabel: {
            color: '#99908B'
          },
        },
        series: [
          {
            symbol: "none",
            data: this.yArray,
            type: 'line',
            smooth: true,
            areaStyle: {
              normal: {
                color: '#EEF9F8' //改变区域颜色
              }
            },
            itemStyle: {
              normal: {
                color: '#07B67E', //改变折线点的颜色
                lineStyle: {
                  color: '#07B67E'
                }
              }
            },
          }
        ],
        grid: {
          top: '30px',
          right: '40px',
          bottom: '25%',
          left: '54px'
        },
        color: ['#EEF9F8']
      };
      chartDom.setOption(option);
      window.onresize = chartDom.resize;
    },
  }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.my-asset-wrap {
  width: 1000px;
  padding-bottom: 40px;
  .info-mid {
    height: 290px;
    padding: 30px;
    background-color: #f5f5f5;
    border-radius: 4px;
    line-height: 1;
    font-weight: bold;
    margin: 20px 0;
    .info-mid-chart {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      height: 190px;
    }
    .info-mid-left {
      width: 260px;
      display: flex;
      flex-direction: column;
    }
    .info-mid-right {
      flex: 1;
      height: 153px;
    }
    .info-mid-tip {
      height: 70px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
