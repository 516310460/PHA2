<template>
  <div
    class="depth-chart"
    ref="depth-chart"
  >
    <div
      class="chart-layout"
      :style="wrapStyles"
    >
      <canvas
        class="chart"
        ref="chart"
        :width="fWidth * 2"
        :height="fHeight * 2"
        :style="chartStyles"
      ></canvas>
      <canvas
        class="chart-mask"
        ref="chartMask"
        :width="fWidth"
        :height="fHeight"
        @mousemove="handleMouseMove"
        @mouseout="handleMouseOut"
      >
      </canvas>
      <canvas
        class="chart-x"
        ref="xChart"
        :width="fWidth"
        height="24"
        :style="xStyles"
      ></canvas>
      <canvas
        class="chart-y"
        ref="yChart"
        width="48"
        :height="fHeight"
        :style="yStyles"
      ></canvas>
    </div>
  </div>
</template>

<script>
import utils from "./js/utils";
export default {
  name: 'HelloWorld',
  props: {
    bgColor: {
      type: String,
      default: '#1E222A'
    },
    options: {
      type: Object,
      default: null
    },
    //买竖线的颜色
    buyFillColor: {
      type: String,
      default: 'rgb(3, 191, 123, 1)'
    },
    //卖竖线的颜色
    sellFillColor: {
      type: String,
      default: 'rgb(235, 77, 92)'
    },
    gap: {
      type: Number,
      default: 10
    },
    // 锯齿
    jagged: {
      type: Boolean,
      default: false
    },
    paddingTop: {
      type: Number,
      default: 10
    },
    depthsData: {
      type: Object,
      default: {
        'depths': {
          'asks': [],
          'bids': []
        },
      }
    }
  },
  data () {
    return {
      chart: null,
      context: null,
      maskChart: null,
      maskContext: null,
      xChart: null,
      xChartContext: null,
      yChart: null,
      yChartContext: null,
      finalOptions: { ...this.options },
      fHeight: 0,
      fWidth: 0,
      width: 0,
      height: 0,
      hasPaint: false,
      args: null,
      valueMap: new Map(),
      valueData: [],//实时买卖数据
      buyData: [],//买单数据
      sellData: [],//卖单数据
      initState: false,
      timeInterval: null,
      buyInitState: false,//买单数据初始化状态
      sellInitState: false,//卖单数据初始化状态
      timer: null
    }
  },
  computed: {
    wrapStyles () {
      return {
        height: this.fHeight + 24 + 'px'
      }
    },
    chartStyles () {
      return {
        backgroundColor: this.bgColor,
        width: this.fWidth + 'px',
        height: this.fHeight + 'px'
      }
    },
    xStyles () {
      return {
        top: this.fHeight + 'px',
        left: 0
      }
    },
    yStyles () {
      return {
        top: 0,
        left: this.fWidth + 'px'
      }
    },
    isEmptyData () {
      let res = {
        buy: this.buyData,
        sell: this.sellData
      }
      return utils.isEmpty(res)
    },
  },
  watch: {
    depthsData: { //深度监听，可监听到对象、数组的变化
      handler (newV, oldV) {
        // do something, 可使用this
        if (newV.bids.length) {
          let newArray = []
          newV.bids.forEach((item, index) => {
            newArray.push({
              index: index,
              price: item[0],
              total: item[1],
              volume: item[1]
            })
          });
          this.buyData = newArray
        }
        if (newV.asks.length) {
          let newArray = []
          newV.asks.forEach((item, index) => {
            newArray.push({
              index: index,
              price: item[0],
              total: item[1],
              volume: item[1]
            })
          });
          this.sellData = newArray.reverse()
        }
        if (!this.sellData.length || !this.sellData[0].total || !this.buyData.length || !this.buyData[0].total) return
        this._initChart();
      },
      deep: true
    }
  },
  //离开当前页面就显示底部
  destroyed () {
    clearInterval(this.timeInterval)
    clearTimeout(this.timer)
  },
  mounted () {
    this.$nextTick(() => {
      this.timer = setTimeout(() => {
        this.handleResize()
      })
      window.addEventListener('resize', this.handleResize);
      //如果切换了主题就重新渲染
      this.$bus.on('changeTheme', () => {
        if (!this.sellData.length || !this.sellData[0].total || !this.buyData.length || !this.buyData[0].total) return
        this._initChart();
      })
    })
  },
  beforeDestroy () {
    this._resetChart();
  },
  methods: {
    //获取当前屏幕宽度和高度
    handleResize () {
      //如果一样的高宽不做改变 直接return
      if (this.width && this.width == this.$refs['depth-chart'].clientWidth && this.height == this.$refs['depth-chart'].clientHeight) {
        return
      }
      this.width = this.$refs['depth-chart'].clientWidth;
      this.height = this.$refs['depth-chart'].clientHeight;
      this.fHeight = parseFloat(this.height) - 24;
      this.fWidth = parseFloat(this.width) - 48;
      this.initState = false;
    },
    _initChart () {
      this.chart = this.$refs['chart'];
      this.context = utils.getContext2D(this.chart);
      this.maskChart = this.$refs['chartMask'];
      this.maskContext = utils.getContext2D(this.maskChart);
      this.xChart = this.$refs['xChart'];
      this.xChartContext = utils.getContext2D(this.xChart);
      this.yChart = this.$refs['yChart'];
      this.yChartContext = utils.getContext2D(this.yChart);
      if (!this.maskContext || !this.xChartContext || !this.yChartContext) return
      //清除竖线
      this.maskContext.clearRect(0, 0, parseFloat(this.fWidth), parseFloat(this.fHeight));
      //清除x轴画布
      this.xChartContext.clearRect(0, 0, parseFloat(this.fWidth), 24);
      //清除y轴画布
      this.yChartContext.clearRect(0, 0, parseFloat(this.fHeight), parseFloat(this.fHeight));

      // this._drawChart(this._initChartData());
      let res = {
        buy: this.buyData,
        sell: this.sellData
      }
      this._drawChart(res);
    },
    //深度数据填充
    _initChartData () {
      const buyLength = this.buyData.length;
      const sellLength = this.sellData.length;

      let gap;
      let indexFilter;
      let result = {};

      if (buyLength && sellLength) {
        const buy = this.buyData;
        const buyFirstPrice = Number(buy[0].price);
        const buyLastPrice = Number(buy[buy.length - 1].price);
        const buyGap = buy.length > 1 ? Number(buyFirstPrice - buyLastPrice) : buy[0].price;


        const sell = this.sellData;
        const sellFirstPrice = Number(sell[0].price);
        const sellLastPrice = Number(sell[sell.length - 1].price);
        const sellGap = Number(sellLastPrice - sellFirstPrice);

        const isBuySmall = buyGap < sellGap;

        if (isBuySmall) {
          gap = Number(sellFirstPrice + buyGap);

          result['buy'] = this.buyData;

          for (let i = 0; i < this.sellData.length; i++) {
            let item = this.sellData[i];
            if (gap === item.price) {
              indexFilter = i;
              break;
            } else if (item.price > gap) {
              indexFilter = i;
              break;
            }
          }

          result['sell'] = this.sellData.filter((item, index) => indexFilter >= index);
        } else {
          gap = Number(buyLastPrice + sellGap);

          result['sell'] = this.sellData;

          for (let i = 0; i < this.buyData.length; i++) {
            let item = this.buyData[i];
            if (gap === item.price) {
              indexFilter = i;
              break;
            } else if (item.price > gap) {
              indexFilter = i;
              break;
            }
          }

          result['buy'] = this.buyData.filter((item, index) => indexFilter <= index);
        }
      }

      console.log(result)

      return result;
    },
    _resetChart () {
      this.chart = this.maskChart = this.xChart = this.yChart = null
    },
    _drawChart (data) {
      // if (!this.args) {
      // this.args = this._calcArgs(data, this.fWidth, this.fHeight);
      // }
      //实时监听最大值
      this.args = this._calcArgs(data, this.fWidth, this.fHeight);

      if (!this.isEmptyData) {
        const context = this.context;
        const width = parseFloat(this.fWidth);
        const height = parseFloat(this.fHeight);
        this._drawMainCanvas(context, data, width, height, this.args);
        this._drawXLine(data);
        this._drawYLine();
        this.hasPaint = true;
      }
    },
    _calcArgs (data, width, height) {
      if (!this.isEmptyData || (data.sell.length && !data.sell[data.sell.length - 1].total) || (data.buy.length && !data.buy[data.buy.length - 1].total)) {
        // const maxAmount = Math.max(data.sell[0].total, data.buy[data.buy.length - 1].total);
        const maxAmount = Math.max(data.sell[data.sell.length - 1].total, data.buy[data.buy.length - 1].total);
        const scaleH = maxAmount / height;
        const scaleW = width / 2 / data.sell.length;

        return {
          maxAmount,
          scaleH,
          scaleW
        }
      }

      return null;
    },
    //堆积深度图
    _drawMainCanvas (context, data, width, height, args) {
      if (!args) {
        throw new Error('args not ok');
      }

      if (this.hasPaint) {
        context.clearRect(0, 0, width, height);
      }
      //深度图背景色
      context.fillStyle = this.$store.state.background == 'day' ? '#FFFFFF' : '#1E222A';
      // context.fillStyle = '#FFFBF6';
      context.fillRect(0, 0, width, height);

      if (!this.initState) {
        this.initState = true;
        this.context.scale(2, 2)
      }

      const { maxAmount } = args;
      const paddingTop = this.paddingTop;
      const gap = this.gap;
      const equalWidth = width / 2;

      let tempList = [];
      let x = 0;
      let y = paddingTop;
      let lastPoint = { x, y };
      let buyLength = data.buy.length;
      let sellLength = data.sell.length;

      // console.log(data.buy[0])
      if (buyLength) {

        const scaleW = equalWidth / (buyLength ? buyLength : 1);

        context.beginPath();
        context.fillStyle = this.buyFillColor;

        for (let i in data.buy) {
          let item = data.buy[i];

          x = equalWidth - i * scaleW - gap;
          y = height - item.total / maxAmount * (height - 24);//设置买单深度高度

          if (Number(i) === 0 && x > 0) {
            context.lineTo(x, height);
          }

          if (x <= 2) {
            x = 2
          }

          tempList.push({
            x, y,
            value: item,
            side: 'buy'
          });

          if (this.jagged) {
            context.lineTo(x, lastPoint.y);
          }

          context.lineTo(x, y);
          context.stroke();
          lastPoint = { x, y };
        }

        context.lineWidth = 3;
        context.strokeStyle = '#0D7680';
        context.lineTo(0, y);
        context.lineTo(0, height);
        context.lineTo(equalWidth - gap, height);
        context.stroke();
        context.fill();
        context.closePath();
      }

      if (sellLength) {

        const scaleW = equalWidth / (sellLength ? sellLength : 1);

        context.beginPath();
        context.fillStyle = this.sellFillColor;
        context.moveTo(equalWidth + gap, height);

        lastPoint = {
          x: equalWidth + gap,
          y: height
        };

        for (let i in data.sell) {
          let item = data.sell[i];

          x = equalWidth + i * scaleW + gap;
          y = height - item.total / maxAmount * (height - 24);//设置卖单深度高度

          if (x > width - 2) {
            x = width - 2;
          }

          tempList.push({
            x, y,
            value: item,
            side: 'sell'
          });

          if (this.jagged) {
            context.lineTo(x, lastPoint.y);
          }

          context.lineTo(x, y);
          lastPoint = { x, y };
        }

        context.lineWidth = 3;
        context.strokeStyle = '#8F223A';
        context.lineTo(width + gap, y);
        context.lineTo(width + gap, height);
        context.lineTo(equalWidth + gap, height);
        context.stroke();
        context.fill();
        context.closePath();

        //删除最后一个数组
        tempList.pop()
        tempList = tempList.sort((a, b) => a.x - b.x);
        // console.log(tempList[0])

        // tempList.forEach((item) => this.valueMap.set([item.x, item.y, item.side], item.value));
        // console.log(this.valueMap.keys())
        let newArray = [];
        //组装深度图竖线实时可变数据
        tempList.forEach((item) => {
          newArray.push({
            x: item.x,
            y: item.y,
            side: item.side,
            value: item.value
          })
        });
        this.valueData = newArray
      }
    },
    //深度图x轴
    _drawXLine (data) {
      const context = this.xChartContext;
      const width = parseFloat(this.fWidth);

      if (this.hasPaint) {
        context.clearRect(0, 0, width, 24);
      }

      context.font = '10px Sans-Serif';
      //深度图x坐标轴背景色
      context.fillStyle = this.$store.state.background == 'day' ? '#1E222A' : '#ffffff';
      // context.fillStyle = "rgba(0, 0, 0, 0.35)";

      let buyLength = data.buy.length;
      let sellLength = data.sell.length;

      const equalWidth = width / 2;
      const step = width <= 650 ? 3 : 4;

      this._xPagesFn(buyLength, equalWidth, step, context, data, 'buy', width);
      this._xPagesFn(sellLength, equalWidth, step, context, data, 'sell', width);
    },
    _xPagesFn (length, equalWidth, step, context, data, type, width) {
      if (length) {
        let x = 0;
        let y = 16;
        const scaleW = equalWidth / (length ? length : 1);
        const Divisor = Math.ceil(length / step);

        for (let i = 0; i < length; i++) {
          let item = data[type][i];

          if (i % Divisor) {
            continue;
          }

          let text = item.price;
          let textWidth = Math.floor(context.measureText(text).width);

          if (type === 'sell') {
            x = equalWidth + 16 + i * scaleW;
          } else {
            x = equalWidth - i * scaleW - textWidth;
          }

          if (x + textWidth >= width) {
            x = width - textWidth;
          }

          context.fillText(text, x, y);
        }
      }
    },
    //深度图y轴
    _drawYLine () {
      let x = 0;
      let y = 0;
      const height = parseFloat(this.fHeight);
      const { maxAmount } = this.args;
      const context = this.yChartContext;

      if (this.hasPaint) {
        context.clearRect(0, 0, 48, height);
      }

      context.font = '10px Sans-Serif';
      //深度图y坐标轴背景色
      context.fillStyle = this.$store.state.background == 'day' ? '#1E222A' : '#ffffff';
      // context.fillStyle = "rgba(0, 0, 0, 0.35)";
      // 计算Y轴的每个阶段的值
      let seg = maxAmount / 5;
      // for (let i = 1; i < 6; i++) {
      // Y轴从0 开始
      for (let i = 0; i < 6; i++) {
        x = 6;
        // y = height - seg * (i - 1) / maxAmount * (height - 24);
        y = height - seg * i / maxAmount * (height - 24);
        context.fillText(utils.toPretty(seg * i), x, y);
      }
    },
    handleMouseMove ({ offsetX, offsetY }) {
      const valueMap = this.valueMap;
      const valueData = this.valueData;
      const maskContext = this.maskContext;
      const width = this.fWidth;
      const height = this.fHeight;
      const Half = width / 2;

      if (!this.maskContext) return

      maskContext.clearRect(0, 0, width, height);

      // for (let key of valueMap.keys()) {
      for (let key of valueData) {
        const x = key.x;
        const y = key.y;
        const side = key.side;
        // const result = valueMap.get(key);
        const result = key.value;
        //买卖竖线的颜色
        const colorsDepth = side === 'buy' ? 'rgb(3, 191, 123, 1)' : 'rgb(235, 77, 92)';
        const colorsDepthArc = side === 'buy' ? 'rgba(13, 118, 128, 0.35)' : 'rgba(143, 34, 58, 0.35)';
        const isLeft = offsetX < Half;

        if (offsetX < x) {
          maskContext.strokeStyle = colorsDepth;
          maskContext.lineWidth = 2;
          maskContext.setLineDash([3]);
          maskContext.clearRect(0, 0, width, height);
          // maskContext.beginPath();
          // maskContext.moveTo(0, y);
          // maskContext.lineTo(width, y);
          // maskContext.stroke();
          // maskContext.closePath();

          maskContext.beginPath();
          maskContext.moveTo(x, y);
          maskContext.lineTo(x, height);
          maskContext.stroke();
          maskContext.closePath();

          maskContext.beginPath();
          // maskContext.shadowBlur = 10;
          // maskContext.shadowColor = 'rgba(0, 0, 0, 0.8)';

          maskContext.fillStyle = colorsDepthArc;
          maskContext.arc(x, y, 10, 0, 2 * Math.PI);
          maskContext.fill();
          maskContext.closePath();

          maskContext.beginPath();
          maskContext.fillStyle = colorsDepth;
          maskContext.arc(x, y, 5, 0, 2 * Math.PI);
          maskContext.fill();
          maskContext.closePath();


          maskContext.beginPath();
          maskContext.fillStyle = this.$store.state.background == 'day' ? 'rgb(248, 249, 251)' : 'rgb(19, 23, 34, .9)';
          maskContext.font = '12px bold';


          let widthOffset = 152;
          let heightOffset = 96;
          let left = x - widthOffset / 2;
          let top = y - heightOffset - 10;
          let maxTextWidth = Math.max(maskContext.measureText(this.$t('HashRate.pro.depthChart.title1')).width, maskContext.measureText(this.$t('HashRate.pro.depthChart.title2')).width);

          // if(maxTextWidth + 20 > widthOffset) {
          //   widthOffset = maxTextWidth + 20;
          // }
          //
          // if(left < 0) {
          //   left = 0
          // }

          // if(left >= width - widthOffset) {
          //   left = width - widthOffset;
          // }

          if (top <= 0) {
            top = y + 10;
          }

          const marginLeft = 10;
          const marginTop = 24;
          const lineHeight = 20;
          const leftPos = left + widthOffset / 2;
          const leftPosAndMargin = left + marginLeft + widthOffset / 2 + 6;
          const rightPos = left - widthOffset / 2;
          const rightPosAndMargin = left - marginLeft + widthOffset - 206;
          const textPos = isLeft ? leftPosAndMargin : rightPosAndMargin;

          // maskContext.fillRect(left, top, widthOffset, heightOffset);
          this.drawRoundedRect(maskContext, isLeft ? leftPos : rightPos, top, widthOffset, heightOffset, 4, true, false);

          maskContext.fillStyle = colorsDepth;
          maskContext.fillRect(leftPos, top, 2, heightOffset);
          maskContext.textAlign = 'left';
          // maskContext.shadowBlur = 6;
          // maskContext.shadowColor = 'rgba(255, 206, 167, 0.5)';

          // maskContext.fillStyle = 'rgba(0, 0, 0, 0.65)';
          maskContext.fillStyle = this.$store.state.background == 'day' ? 'rgb(19, 23, 34)' : '#ffffff';
          maskContext.fillText(this.$t('HashRate.pro.depthChart.title1'), textPos, top + marginTop);
          maskContext.fillStyle = this.$store.state.background == 'day' ? 'rgb(19, 23, 34)' : '#ffffff';
          // maskContext.fillStyle = 'black';
          maskContext.fillText(utils.toThousand(result.price), textPos, top + marginTop + 16);
          maskContext.fillStyle = this.$store.state.background == 'day' ? 'rgb(19, 23, 34)' : '#ffffff';
          // maskContext.fillStyle = 'rgba(0, 0, 0, 0.65)';
          maskContext.fillText(this.$t('HashRate.pro.depthChart.title2'), textPos, top + marginTop + lineHeight + 24);
          maskContext.fillStyle = this.$store.state.background == 'day' ? 'rgb(19, 23, 34)' : '#ffffff';
          // maskContext.fillStyle = 'black';
          maskContext.fillText(utils.toThousand(result.total), textPos, top + marginTop + lineHeight + 40);
          maskContext.closePath();
          break;
        }
      }
    },
    handleMouseOut () {
      const maskContext = this.maskContext;
      const width = this.fWidth;
      const height = this.fHeight;
      if (!this.maskContext) return
      maskContext.clearRect(0, 0, width, height)
    },
    drawRoundedRect (ctx, x, y, width, height, r, fill, stroke) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + width, y, x + width, y + r, r);
      ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
      ctx.arcTo(x, y + height, x, y + height - r, r);
      ctx.arcTo(x, y, x + r, y, r);

      if (fill) {
        ctx.fill();
      }

      if (stroke) {
        ctx.stroke();
      }

      ctx.restore();
    }
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.chart-layout {
  position: relative;
  background: #1e222a;
}

.chart-layout canvas {
  position: absolute;
  // background: #1E222A;
}
</style>
