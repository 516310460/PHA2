<script>
import pako from 'pako'
import depthChart from './depth-chart'
import chartFeed from './js/chart-feed.js'
import chartprovider from './js/chart-provider'
import moment from 'moment-timezone';
import TradingView from './js/chart-base'
import socket from './datafeeds/socket.js'
import datafeeds from './datafeeds/datafees.js'
import data from "@/assets/data";

const timezone = [
  'Etc/UTC',
  'Africa/Cairo',
  'Africa/Johannesburg',
  'Africa/Lagos',
  'America/Argentina/Buenos_Aires',
  'America/Bogota',
  'America/Caracas',
  'America/Chicago',
  'America/El_Salvador',
  'America/Juneau',
  'America/Lima',
  'America/Los_Angeles',
  'America/Mexico_City',
  'America/New_York',
  'America/Phoenix',
  'America/Santiago',
  'America/Sao_Paulo',
  'America/Toronto',
  'America/Vancouver',
  'Asia/Almaty',
  'Asia/Ashkhabad',
  'Asia/Bahrain',
  'Asia/Bangkok',
  'Asia/Chongqing',
  'Asia/Dubai',
  'Asia/Ho_Chi_Minh',
  'Asia/Hong_Kong',
  'Asia/Jakarta',
  'Asia/Jerusalem',
  'Asia/Kathmandu',
  'Asia/Kolkata',
  'Asia/Kuwait',
  'Asia/Muscat',
  'Asia/Qatar',
  'Asia/Riyadh',
  'Asia/Seoul',
  'Asia/Shanghai',
  'Asia/Singapore',
  'Asia/Taipei',
  'Asia/Tehran',
  'Asia/Tokyo',
  'Atlantic/Reykjavik',
  'Australia/ACT',
  'Australia/Adelaide',
  'Australia/Brisbane',
  'Australia/Sydney',
  'Europe/Athens',
  'Europe/Belgrade',
  'Europe/Berlin',
  'Europe/Copenhagen',
  'Europe/Helsinki',
  'Europe/Istanbul',
  'Europe/London',
  'Europe/Luxembourg',
  'Europe/Madrid',
  'Europe/Moscow',
  'Europe/Paris',
  'Europe/Riga',
  'Europe/Rome',
  'Europe/Stockholm',
  'Europe/Tallinn',
  'Europe/Vilnius',
  'Europe/Warsaw',
  'Europe/Zurich',
  'Pacific/Auckland',
  'Pacific/Chatham',
  'Pacific/Fakaofo',
  'Pacific/Honolulu',
  'Pacific/Norfolk',
  'US/Mountain'
]
export default {
  name: 'Home',
  components: {
    'buybit-depth-chart': depthChart
  },
  // props: ['from', 'to', 'symbleParameString', 'ispro', 'fullWidth'],
  props: ['symbleParameString', 'ispro', 'fullWidth', 'width', 'height', 'KlineSingeData','DepthData'],
  data () {
    return {
      klineParams: {
        width: 750,
        height: 500,
        theme: "dark",
        language: "zh-cn",
        ranges: ["1w", "1d", "4h", "1h", "30m", "15m", "5m", "1m", "line"],
        symbol: "BTC",
        symbolName: "BTC/USD",
        intervalTime: 5000,
        depthWidth: 50,
        count: 1,
      },
      symbol: 'xusdt',
      // "周期:1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M(m -> 分钟; h -> 小时; d -> 天; w -> 周; M -> 月)"
      interval: "15m",//当前时间
      oldInterval: null,//上一次时间
      orderbook: {},
      connState: 0,//websocket状态 0为关闭 1为开启 2为加载数据 3为直接抛出不做任何动作
      loadingCount: 1,//k线加载历史数据次数
      //K线数据
      depthsData: {
        'asks': [],
        'bids': []
      },
      KlineData: {
        data: {
          'depths': {
            'asks': [],
            'bids': []
          },
          'lines': {},
        },
        success: false
      },

      widget: null,
      socket: new socket(),
      datafeeds: new datafeeds(this),
      cacheData: {},
      lastTime: null,
      getBarTimer: null,
      isLoading: true,

      bg: '#131722',
      widgetloading: true,
      widgetReady: false,
      history: {},

      resolutionInterval: 4,
      feed: null,
      bars: [],
      fullscreen: false,
      activeChart: 1,
      dayOverrides: {
        'scalesProperties.backgroundColor': "#ffffff",
        'paneProperties.background': "#ffffff",
        'scalesProperties.lineColor': "#DDDDE4",
      },
      nightOverrides: {
        'scalesProperties.backgroundColor': "#131722",
        'paneProperties.background': "#131722",
        'scalesProperties.lineColor': "#383655",
      },
      defaultOverrides: {
        'editorFontsList': [''],
        "volumePaneSize": "medium",//小: tiny, 中: medium 大: large(默认)
        //表格线
        'paneProperties.crossHairProperties.color': "#646B8C",
        'paneProperties.crossHairProperties.width': 1,
        'paneProperties.crossHairProperties.style': 0,
        'paneProperties.vertGridProperties.color': "RGBA(61, 118, 76, 0.15)",
        'paneProperties.horzGridProperties.color': "RGBA(61, 118, 76, 0.15)",
        //刻度线
        'scalesProperties.backgroundColor': "#131722",
        'scalesProperties.fontSize': 11,
        'scalesProperties.lineColor': "#383655",
        'scalesProperties.textColor': "#646B8C",
        //蜡烛
        'mainSeriesProperties.candleStyle.upColor': "#46B05D",
        'mainSeriesProperties.candleStyle.downColor': "#CD4559",
        'mainSeriesProperties.candleStyle.drawWick': true,
        'mainSeriesProperties.candleStyle.drawBorder': false,
        'mainSeriesProperties.candleStyle.wickUpColor': '#46B05D',
        'mainSeriesProperties.candleStyle.wickDownColor': '#CD4559',
        'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false,
        //分时线
        'mainSeriesProperties.areaStyle.color1': "rgba(111, 143, 241, 0.05)",
        'mainSeriesProperties.areaStyle.color2': "rgba(111, 143, 241, 0.02)",
        'mainSeriesProperties.areaStyle.linecolor': "#02AD8F",
        'mainSeriesProperties.areaStyle.linestyle': 0,
        'mainSeriesProperties.areaStyle.linewidth': 1,
        'mainSeriesProperties.areaStyle.priceSource': "close"
      },
      sub: '',
      timezone: '',
      lockReconnect: false,//避免重复连接
      currentState: true,
      pricescale: 100, // 精度，100是2位小数
      isLoadingState: false,//加载一次性数据是否成功
      timeInterval: null,//轮询对象
      initState: false,//是否初始化过
      symbleParameArray: '',
      from: '',
      to: '',
      background: '',
      isOpenState: false,//是否开盘
    }
  },
  watch: {
    // wh: {
    //   // immediate: true,
    //   handler (val) {
    //     if (this.activeChart == 0) {
    //       // this.requestData()
    //     }
    //   }
    // },
    'KlineSingeData': {
      handler(val){
        this.onMessage(val, true)
      }
    },
    'DepthData':{
      handler(val){
        // this.depthsData.bids=val.bids;
        // this.depthsData.asks=val.asks;
      }

    },
    '$store.state.background': function (val) {
      if (val) {
        // this.setBackground()
      }
    },
    '$store.state.locale': function () {
      this.setLanguage()
    },
    //设置均线种类 均线样式
    'widgetReady': function (val) {
      if (val) {
        this.hideLegend()
        // this.setBackground()
        this.setLanguage()
        this.widget.chart().createStudy("Moving Average", false, false, [
          5
        ], function (guid) {

        },
          { "plot.color.0": "#ff131a" }
        )
        this.widget.chart().createStudy("Moving Average", false, false, [
          10
        ], function (guid) {

        },
          { "plot.color.0": "#ff131a" }
        )
        this.widget.chart().createStudy("Moving Average", false, false, [
          30
        ], function (guid) {

        },
          { "plot.color.0": "#ffd700" }
        )
        this.widget.chart().createStudy("Moving Average", false, false, [
          60
        ], function (guid) {

        },
          { "plot.color.0": "#ffd700" }
        )
      }
    }
  },
  //销毁前调用
  destroyed () {
    clearInterval(this.timeInterval)
    this.ws.close();
    this.currentState = false
  },
  mounted () {
    this.$nextTick(() => {
      if (this.activeChart == 0) {
        // this.refreshKlineData(900000);// 进入页面时执行,默认聚合时间900000毫秒(15分钟)
      }

      // setTimeout(() => {
      //   console.log(222)
      //   this.requestData()
      // }, 300);

      window.addEventListener('resize', () => {
        if (this.activeChart == 0) {
          // this.requestData()
        }
      })

      this.interval = this.$store.state.interval
      this.resolutionInterval = this.$store.state.intervalType

      this.background = this.$store.state.background

      this.symbleParameArray = !this.$route.params.id ? null : (this.$route.params.id.split('_').length != 2 ? null : this.$route.params.id.split('_'))
      //获取产品
      this.from = this.symbleParameArray ? this.symbleParameArray[0].toUpperCase() : '--'
      //获取货币
      this.to = this.symbleParameArray ? this.symbleParameArray[1].toUpperCase() : '--'
      this.$bus.on("destroyedSocket", () => {
        this.ws.close();
      })

      // this.widgetloading = true
      this.init();
    })
  },
  created () {
    this.sub = `market.${this.symbleParameString}.kline.1min`
  },
  beforeDestroy () {
    for (const _t in chartprovider.timer) {
      clearTimeout(chartprovider.timer[_t])
      chartprovider.timer[_t] = -1
    }
    for (const _t in chartprovider.pollingtimer) {
      clearTimeout(chartprovider.pollingtimer[_t])
      chartprovider.pollingtimer[_t] = -1
    }
  },
  methods: {
    requestData (startTime, endTime) {
      /*测试用的  请求服务器请用下面的*/
      let newFromTime = this.timeScreening(this.switchSetTimeInterval(this.interval + '')) * 1000;
      let newToTime = Math.round(new Date().getTime());
      let params = {
        "pair": `${this.from}/${this.to}`,// "交易对"
        "interval": this.switchSetTimeInterval(this.interval + ''),// "周期:1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M(m -> 分钟; h -> 小时; d -> 天; w -> 周; M -> 月)"
        "startTime": startTime || newFromTime || 0,// "开始时间"
        "endTime": endTime || newToTime || 0,// "截止时间"
      }
      this.$api.Market.GetKLineDepth(params).then(res => {
        if (res.isSuccess) {
          this.klineData = {
            data: res.data,
            success: true
          };
          this.depthsData = res.data.depths
          this.onMessage(this.klineData)
          if (this.$refs.callMethods && this.$refs.callMethods.kline && this.$refs.callMethods.kline.chartMgr) {
            //强制更改缓存中的lines值,防止显示不同步
            this.$refs.callMethods.kline.chartMgr.getChart().updateDataAndDisplay(this.klineData.data.lines);
            this.$refs.callMethods.resize(document.getElementsByClassName("buybit-chart")[0].clientWidth, document.getElementsByClassName("buybit-chart")[0].clientHeight);
          }
        }
      })
    },
    refreshKlineData (option) {  //你点击页面上的周期会触发这个方法
      if (option === 900000) {   //如果时间等于15分钟
        console.log("进入")
        // this.requestData();
      } else if (option === 300000) {//如果5分钟
        console.log("5分钟" + option)
      } else {
        console.log("其他时间" + option) //其他时间
      }
    },
    async init () {
      //获取交易对配置
      await this.getCoinTeamConfig();
      this.ws = new WebSocket("wss://www.buybit.com" + '/api/v1/buybit/power/ws/kline');
      this.ws.onopen = () => {
      }
      this.ws.onmessage = (event) => {
        let reader = new FileReader();
        let that = this;
        reader.readAsText(event.data, "utf-8");
        reader.onload = function (e) {
          that.handleData(e.target.result);
        };
        this.initView()
      }
      this.ws.onclose = () => {
        console.log('close2');
        // this.init();
        this.reconnect()
      }
      this.ws.onerror = err => {
        console.log('error', err);
        // this.init();
        this.reconnect()
      }
    },
    //获取交易配置
    getCoinTeamConfig () {
      let obj = `${this.from}-${this.to}`
      // this.$api.HashRate.getCoinTeamConfig(obj).then((res) => {
      //   if (res && res.status === 200) {
      //     //key:配置类型 value:配置内容;1:最小交易量,2:最大交易量,3:价格最大小数位,4:数量最大小数位,5:taker手续分百分比,6:maker手续分百分比,7:限价买是否可购买,8:限价卖是否出售,9:市价买是否可购买，10:市价卖是否可出售
      //     this.pricescale = Number(this.$commonFn.Transformation(res.data.data[3] || 0))
      //   }
      // })
    },
    //短线重连
    reconnect () {
      if (this.lockReconnect || !this.currentState) return;
      this.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      setTimeout(() => {
        console.log('没连接上会一直重连，设置延迟避免请求过多')
        this.lockReconnect = false;
      }, 5000); //这里设置重连间隔(ms)
    },
    //获取websocket一次性数据
    reqWebsocketData (rangeStartDate) {
      if (this.interval) {
        let newFromTime = this.timeScreening(this.interval) * 1000;
        let newToTime = Math.round(new Date().getTime());
        if (this.connState == 0) {
          this.requestData(newFromTime, newToTime)
          this.connState = 1;
        } else {
          this.requestData(this.newFromTimeFrom(this.switchSetTimeInterval(this.interval), this.lastTime), this.lastTime)
        }
      }
      this.isLoadingState = false;
    },
    /*
    * @time 时间类型
    * @newFromTime 初始化的结束时间（k线最左边）
    * @type 是否是开始时间类型
    */
    newFromTimeFrom (time, newFromTime, type) {
      time += '';
      // 一天为86400 写76400是因为币池不允许超过一天的数据 以5分钟的为例
      // 周期:1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
      let _time
      switch (time) {
        case '1m':
          // 1000(1秒) * 60 * 1000(多少条)
          _time = newFromTime - (1000 * 60) * 1000
          break;
        case '5m':
          _time = newFromTime - (1000 * 60 * 5) * 1000
          break;
        case '15m':
          _time = newFromTime - (1000 * 60 * 15) * 1000
          break
        case '30m':
          _time = newFromTime - (1000 * 60 * 30) * 1000
          break
        case '1h':
          _time = newFromTime - (1000 * 60 * 60) * 1000
          break
        case '2h':
          _time = newFromTime - (1000 * 60 * 120) * 1000
          break
        case '4h':
          _time = newFromTime - (1000 * 60 * 240) * 1000
          break
        case '6h':
          _time = newFromTime - (1000 * 60 * 360) * 1000
          break
        case '8h':
          _time = newFromTime - (1000 * 60 * 480) * 1000
          break
        case '12h':
          _time = newFromTime - (1000 * 60 * 720) * 1000
          break
        case '1d':
          _time = newFromTime - (1000 * 60 * 1440) * 1000
          break
        case '3d':
          _time = newFromTime - (1000 * 60 * 4320) * 1000
          break
        case '1w':
          _time = newFromTime - (1000 * 60 * 10080) * 1000
          break
        case '1M':
          _time = newFromTime - (1000 * 60 * 44640) * 1000
          break
      }
      return _time
    },
    //k线历史数据加载每个时段的筛选
    timeScreening (time) {
      time += '';
      // 一天为86400 写76400是因为币池不允许超过一天的数据 以5分钟的为例
      let _time
      switch (time) {
        case '1m':
          _time = Math.round(new Date().getTime() / 1000) - (86400 / 5)
          break;
        case '5m':
          _time = Math.round(new Date().getTime() / 1000) - 86400
          break;
        case '15m':
          _time = Math.round(new Date().getTime() / 1000) - (86400 * 3)
          break
        case '30m':
          _time = Math.round(new Date().getTime() / 1000) - (86400 * 6)
          break
        case '1h':
          _time = Math.round(new Date().getTime() / 1000) - (86400 * 12)
          break
        case '4h':
          _time = Math.round(new Date().getTime() / 1000) - (86400 * 12 * 4)
          break
        case '1d':
          _time = Math.round(new Date().getTime() / 1000) - (86400 * 12 * 15)
          break
        case '1w':
          _time = Math.round(new Date().getTime() / 1000) - (86400 * 7 * 300)
          break
        case '1M':
          _time = Math.round(new Date().getTime() / 1000) - (86400 * 12 * 15 * 9)
          break
      }
      return _time
    },
    // 处理接收到的信息
    handleData (msg) {
      if (msg == '"连接成功!"') {
        return
      }
      let data = JSON.parse(msg);
      if (data.data) {
        // this.onMessage(data);
      }
    },

    // 发送响应信息
    sendHeartMessage (pong) {
      this.ws.send(JSON.stringify({
        "ping": pong
      }));
    },

    async setBackground () {
      await this.$nextTick(() => { })
      const val = this.$store.state.background
      const tradingview = await document.querySelector('iframe[id^="tradingview"]')
      const contentWindow = await tradingview.contentWindow.document
      const chartPage = contentWindow.querySelector('.chart-page')
      chartPage.className = chartPage.className.replace(/day/g, '').replace(/night/g, '')
      if (val == 'day') {
        chartPage.className += ' day';
      } else {
        chartPage.className += ' night'
      }
      try {
        this.widget.applyOverrides(val == 'day' ? this.dayOverrides : this.nightOverrides)
        this.widget.applyStudiesOverrides({
          toolbar_bg: val == 'day' ? '#ffffff' : '#131722'
        })
      } catch (e) {
      }
    },
    hideLegend () {
      let clickEvent
      if (document.createEvent) {
        clickEvent = document.createEvent("MouseEvent");
        clickEvent.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      }
      else {
        clickEvent = new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': false
        });
      }
      const contentWindow = document.getElementById(this.widget._id).contentWindow
      const a = contentWindow.document.querySelector('a.pane-legend-minbtn.apply-common-tooltip.apply')
      if (a) {
        a.dispatchEvent(clickEvent)
      }
    },
    getintervalvalue (list, key) {
      return list.find((item) => {
        return item.key == key
      }).value
    },
    // 时间过滤
    switchSetTimeInterval (time) {
      let interval = ""
      switch (time) {
        case '1':
          interval = '1m'
          break;
        case '5':
          interval = '5m'
          break;
        case '10':
          interval = '10m'
          break;
        case '15':
          interval = '15m'
          break;
        case '30':
          interval = '30m'
          break;
        case '60':
          interval = '1h'
          break;
        case '120':
          interval = '2h'
          break;
        case '240':
          interval = '4h'
          break;
        case '360':
          interval = '6h'
          break;
        case '720':
          interval = '12h'
        case '1D':
          interval = '1d'
          break;
        case '10080':
          interval = '1w'
          break;
        case '43200':
          interval = '1M'
          break;
      }
      return interval
    },
    //设置时间间隔
    setTimeInterval (time) {
      time = Number(time)
      this.resolutionInterval = time
      let interval = ''
      switch (time) {
        case 2:
          interval = '1'
          break;
        case 3:
          interval = '5'
          break;
        case 14:
          interval = '10'
          break;
        case 4:
          interval = '15'
          break;
        case 5:
          interval = '30'
          break;
        case 6:
          interval = '60'
          break;
        case 7:
          interval = '1D'
          break;
        case 8:
          interval = '10080'
          break;
        case 9:
          interval = '43200'
          break;
        case 10:
          interval = '120'
          break;
        case 11:
          interval = '240'
          break;
        case 12:
          interval = '360'
          break;
        case 13:
          interval = '720'
          break;
      }
      return interval
    },
    setLanguage () {
      try {
        this.widget.chart().setLanguage(this.getlanguage())
      } catch (e) {
      }
    },
    async setResolution (time) {
      try {
        for (let i in chartprovider.history) {
          delete chartprovider.history[i].firstBar
        }
        const interval = this.setTimeInterval(time)
        this.$store.commit('SET_INTERVALTYPE', Number(time))
        this.$store.commit('SET_INTERVAL', interval)
        const chart = this.selectChartType('STYLE_CANDLES')
        //判断不能同时点击同一个时间
        if (this.interval != interval) {
          this.oldInterval = this.interval
          this.interval = interval;
          this.loadingCount = 1;
          //需要重新获取
          this.connState = 0;
          //清楚缓存数据
          this.cacheData = [];
        }
        /* 分时线切换 */
        // 3 代表类型 分时， 普通分钟按钮 1 
        this.widget.chart().setChartType(chart)
        // 1代表1分钟  
        this.widget.chart().setResolution(interval, function (e) { })
        this.requestData()
      } catch (e) {
      }
    },
    selectChartType (type) {
      let typenum
      switch (type) {
        // 美国线
        case 'STYLE_BARS':
          typenum = 0
          break;
        // K线图
        case 'STYLE_CANDLES':
          typenum = 1
          break;
        // 面积图
        case 'STYLE_AREA':
          typenum = 3
          break
        // 线形图
        case 'STYLE_LINE':
          typenum = 2
          break
        // 平均K线图
        case 'STYLE_HEIKEN_ASHI':
          typenum = 8
          break
      }
      return typenum
    },
    //设置图表类型
    setChartType (type) {
      try {
        const chart = this.selectChartType(type)
        this.resolutionInterval = 1
        this.widget.chart().setChartType(chart)
        this.widget.chart().resetData()
      } catch (e) {
      }
    },
    //设置弹窗
    setOtherWindows (val) {
      this.widget.chart().executeActionById(val)
    },
    //全屏
    toggleFullScreen () {
      this.fullscreen = !this.fullscreen
      this.$refs['fullscreen'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
    getlanguage () {
      if (this.$store.state.locale == 'zh-CN') {
        return "zh"
      } else if (this.$store.state.locale == 'zh-TW') {
        return "zh_TW"
      } else if (this.$store.state.locale == 'en-US') {
        return "en"
      }
    },
    initView () {
      if (!this.widget) {
        let tz = moment.tz.guess()
        if (timezone.indexOf(tz) < 0) {
          tz = 'Etc/UTC'
        }
        const overrides = Object.assign(this.defaultOverrides, this.$store.state.background == 'day' ? this.dayOverrides : this.nightOverrides)
        this.timezone = tz
        let symbol = this.symbleParameString
        this.symbol = symbol;
        this.widget = new TradingView.widget({
          width: '100%',
          toolbar_bg: this.$store.state.background == "day" ? "#ffffff" : "15202a",
          symbol: symbol.toLowerCase(),
          interval: this.interval,
          container_id: "coinpool-chart-content",
          datafeed: this.datafeeds,
          library_path: "/chart/",
          timezone: tz,
          locale: this.getlanguage(),
          debug: false,
          autosize: true,
          // 自定义指标
          // indicators_file_name: '../../static/chart/static/myindicators.js',
          disabled_features: [
            'header_widget_dom_node',
            'save_chart_properties_to_local_storage',
            "use_localstorage_for_settings",
            'volume_force_overlay',
            'timeframes_toolbar',//底部时间栏
            'header_screenshot',//快照
            'header_saveload',//保存
            'header_symbol_search',//头部搜索
            'header_chart_type',
            'header_indicators',
            'header_undo_redo',
            'header_compare',
            'header_resolutions',
            'items_favoriting',
            'header_interval_dialog_button',
            'show_interval_dialog_on_key_press',
          ],
          studies_overrides: {
            //显示交易量的移动平均线
            'volume.show ma': false
          },
          overrides: overrides,
          custom_css_url: "css/trade.css",
          enabled_features: [
            "study_templates",
            // 'hide_left_toolbar_by_default'
          ],
          // charts_storage_url: 'http://saveload.tradingview.com',
          charts_storage_api_version: "1.1",
          client_id: 'coinpool.com',
          user_id: 'public_user_id'
        })
        this.widget.onChartReady(() => {
          const wd = document.getElementById(this.widget._id)
          if (wd) {
            wd.style.visibility = 'visible'
          }
          // 使用指标
          // this.widget.chart().createStudy("EMA Cross", false, false, [12, 50])
          // this.widgetloading = false
          this.widgetReady = true
        });
      }
    },
    sendMessage (data) {
      if (this.socket.checkOpen()) {
        this.socket.send(data)
      } else {
        this.socket.on('open', () => {
          this.socket.send(data)
        })
      }
    },
    //K线返回的数据
    onMessage (data, isSinge) {
      clearInterval(this.timeInterval)
      this.timeInterval = setInterval(() => {
        this.ws.send(JSON.stringify({
          "ping": new Date().getTime()
        }));
      }, 3000)
      if (this.interval) {
        if (this.interval == '4hour') {
          this.interval = '240'
        } else if (this.interval == '1day') {
          this.interval = '1D'
        } else if (this.interval == '1week' || this.interval == '10080') {
          this.interval = '10080'
        } else if (this.interval == '1mon' || this.interval == '43200') {
          this.interval = '43200'
        }
      }
      const ticker = `${this.symbol}-${this.interval}`
      let tickerstate = ticker + "state";
      let tickerCallback = ticker + "Callback";
      let onLoadedCallback = this.cacheData[tickerCallback];
      //第一次获取数据 或则数组存在其一就进入
      if (!isSinge && data.data && data.data.lines && data.data.lines.length) {
        //加载一次性数据是成功
        this.isLoadingState = true;
        if (data.data.lines.length < 180) {
          this.connState = 2
        }
        const list = []
        data.data.lines.forEach((item) => {
          list.push({
            time: item[0],
            open: item[1],//当天开盘价
            high: item[2],//当天最高价
            low: item[3],//当天最低价
            close: item[4],//当天收盘价
            volume: item[5]//当天成交量
          })
        })
        //如果没有缓存数据，则直接填充，发起订阅
        if (!this.cacheData[ticker]) {
          this.cacheData[ticker] = list;
        }
        //新数据即当前时间段需要的数据，直接喂给图表插件
        if (onLoadedCallback) {
          onLoadedCallback(list);
          delete this.cacheData[tickerCallback];
        }
        //请求完成，设置状态为false
        this.cacheData[tickerstate] = !1;
        //记录当前缓存时间，即数组最后一位的时间
        // this.lastTime = list[list.length - 1].time
        this.lastTime = list[0].time
        // if (data.data.lines.length < 50) {
        //   this.isLoadingState = true
        //   onLoadedCallback([], { noData: true })
        // }
      } else {
        this.isLoadingState = true
        onLoadedCallback([], { noData: true })
      }
      // if (data.data && data.data.coinTeam) {
      if (isSinge) {
        this.depthsData = data.depth
        // 单挑数据加载
        const list = []
        const ticker = `${this.symbol}-${this.interval}`
        let tickerstate = ticker + "state";
        let tickerCallback = ticker + "Callback";
        let onLoadedCallback = this.cacheData[tickerCallback];
        //判断是否是初始化数据为空 initState 判断是否初始化过了
        // if (!data.data.length && !this.cacheData[ticker] && this.initState) {
          // list.push({
          //   time: data[0],
          //   open: data[1],//当天开盘价
          //   high: data[2],//当天最高价
          //   low: data[3],//当天最低价
          //   close: data[4],//当天收盘价
          //   volume: data[5]//当天成交量
          // })
          // //如果没有缓存数据，则直接填充，发起订阅
          // if (!this.cacheData[ticker]) {
          //   this.cacheData[ticker] = list;
          // }
          // //新数据即当前时间段需要的数据，直接喂给图表插件
          // if (onLoadedCallback) {
          //   onLoadedCallback(list);
          //   delete this.cacheData[tickerCallback];
          // }
          // //请求完成，设置状态为false
          // this.cacheData[tickerstate] = !1;
          // //记录当前缓存时间，即数组最后一位的时间
          // this.lastTime = list[list.length - 1].time
          // this.datafeeds.barsUpdater.updateData()
          // return
        // }
        // 实时更新浏览器标题
        document.title = `${data.data[4]} ${this.from.toLocaleUpperCase()}/${this.to.toLocaleUpperCase()} | ${this.$t('HashRate.pro.title')}`;
        const barsData = {
            time: data.data[0],
            open: data.data[1],//当天开盘价
            high: data.data[2],//当天最高价
            low: data.data[3],//当天最低价
            close: data.data[4],//当天收盘价
            volume: data.data[5]//当天成交量
        }
        //如果增量更新数据的时间大于缓存时间，而且缓存有数据，数据长度大于0
        if (barsData.time > this.lastTime && this.cacheData[ticker] && this.cacheData[ticker].length) {
          //增量更新的数据直接加入缓存数组
          this.cacheData[ticker].push(barsData)
          //修改缓存时间
          this.lastTime = barsData.time
        } else if (barsData.time >= this.lastTime && this.cacheData[ticker] && this.cacheData[ticker].length) {
          //如果增量更新的时间等于缓存时间，即在当前时间颗粒内产生了新数据，更新当前数据
          this.cacheData[ticker][this.cacheData[ticker].length - 1] = barsData
        }
        // 通知图表插件，可以开始增量更新的渲染了
        this.datafeeds.barsUpdater.updateData()
      }
      this.widgetloading = false
      //设置为true代表为已经初始化过了
      this.initState = true;
    },
    getBars (symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback) {
      if (this.interval) {
        if (this.interval == '4hour') {
          this.interval = resolution = '240'
        }
        if (this.interval == '1day') {
          this.interval = resolution = '1D'
        }
        if (this.interval == '1week' || this.interval == '10080') {
          this.interval = resolution = '10080'
        }
        if (this.interval == '1mon' || this.interval == '43200') {
          this.interval = resolution = '43200'
        }
      }
      let ticker = this.symbol + "-" + this.interval;
      let tickerload = ticker + "load";
      let tickerstate = ticker + "state";
      if (!this.cacheData[ticker] && !this.cacheData[tickerstate]) {
        //如果缓存没有数据，而且未发出请求，记录当前节点开始时间
        this.cacheData[tickerload] = rangeStartDate;
        //发起请求，从websocket获取当前时间段的数据
        this.initMessage(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback);
        //设置状态为true
        this.cacheData[tickerstate] = !0;
        return false;
      }
      if (!this.cacheData[tickerload] || this.cacheData[tickerload] > rangeStartDate) {
        //如果缓存有数据，但是没有当前时间段的数据，更新当前节点时间
        this.cacheData[tickerload] = rangeStartDate;
        //发起请求，从websocket获取当前时间段的数据
        this.initMessage(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback);
        //设置状态为true
        this.cacheData[tickerstate] = !0;
        return false;
      }
      if (this.cacheData[tickerstate]) {
        //正在从websocket获取数据，禁止一切操作
        // return false;
      }
      if (this.cacheData[ticker] && this.cacheData[ticker].length) {
        this.isLoading = false
        const newBars = []
        this.cacheData[ticker].forEach((item, index) => {
          if (item.time >= rangeStartDate * 1000 && item.time <= rangeEndDate * 1000) {
            newBars.push(item)
          }
        })
        onLoadedCallback(newBars)
      } else {
        this.getBarTimer = setTimeout(() => {
          this.getBars(symbolInfo, this.interval, rangeStartDate, rangeEndDate, onLoadedCallback)
        }, 10)
      }
    },
    initMessage (symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback) {
      //保留当前回调
      var tickerCallback = this.symbol + "-" + this.interval + "Callback";
      this.cacheData[tickerCallback] = onLoadedCallback;
      //获取当前时间段的数据，在onMessage中执行回调onLoadedCallback
      this.reqWebsocketData(rangeStartDate);
    },
  },
}
</script>
<template>
  <fullscreen
    id="buybit-chart"
    class="buybit-chart"
    @change="fullscreenChange"
    :fullscreen.sync="fullscreen"
    ref="fullscreen"
  >
    <!-- 是否开盘 -->
    <section
      v-if="isOpenState"
      class="isOpenState"
    >
      <section class="cl09 tc isOpenStateText">{{ $t('HashRate.pro.tradeView.opanText') }}</section>
    </section>
    <div class="buybit-chart-plugin clearfix flex items-center justify-between">
      <div class="flex-1">
        <div
          v-show="activeChart==0 || activeChart==1"
          class="plugin_interval"
        >
          <span
            class="plugin_interval_tip"
            :class="{'active':resolutionInterval==1}"
            @click="isLoadingState && setChartType('STYLE_AREA')"
          >{{ $t('HashRate.pro.tradeView.area') }}</span>
          <span
            class="plugin_interval_tip"
            :class="{'active':resolutionInterval==2}"
            @click="isLoadingState && setResolution(2)"
          >1{{ $t('HashRate.pro.tradeView.minute') }}</span>
          <span
            class="plugin_interval_tip"
            :class="{'active':resolutionInterval==3}"
            @click="isLoadingState && setResolution(3)"
          >5{{ $t('HashRate.pro.tradeView.minute') }}</span>
          <span
            class="plugin_interval_tip"
            :class="{'active':resolutionInterval==4}"
            @click="isLoadingState && setResolution(4)"
          >15{{ $t('HashRate.pro.tradeView.minute') }}</span>
          <span
            class="plugin_interval_tip"
            :class="{'active':resolutionInterval==5}"
            @click="isLoadingState && setResolution(5)"
          >30{{ $t('HashRate.pro.tradeView.minute') }}</span>
          <!--小时-->
          <span
            class="plugin_interval_tip"
            :class="{'active':resolutionInterval==6}"
            @click="isLoadingState && setResolution(6)"
          >1{{ $t('HashRate.pro.tradeView.hour') }}</span>
          <span
            class="plugin_interval_tip"
            :class="{'active':resolutionInterval==11}"
            @click="isLoadingState && setResolution(11)"
          >4{{ $t('HashRate.pro.tradeView.hour') }}</span>
          <span
            class="plugin_interval_tip"
            :class="{'active':resolutionInterval==7}"
            @click="isLoadingState && setResolution(7)"
          >{{ $t('HashRate.pro.tradeView.dailyLine') }}</span>

          <span
            class="plugin_interval_tip"
            :class="{'active':resolutionInterval==8}"
            @click="isLoadingState && setResolution(8)"
          >{{ $t('HashRate.pro.tradeView.weeklyLine') }}</span>
          <span
            class="plugin_interval_tip"
            :class="{'active':resolutionInterval==9}"
            @click="isLoadingState && setResolution(9)"
          >{{ $t('HashRate.pro.tradeView.lunarLine') }}</span>
          <el-tooltip
            v-show="activeChart==1"
            :content="$t('HashRate.pro.tradeView.set')"
            popper-class="chart_tooltip"
            placement="bottom"
          >
            <span
              class="plugin_set_button set_button"
              @click="setOtherWindows('scalesProperties')"
            ></span>
          </el-tooltip>
          <el-tooltip
            v-show="activeChart==1"
            effect="dark"
            :content="$t('HashRate.pro.tradeView.index')"
            popper-class="chart_tooltip"
            placement="bottom"
          >
            <span
              class="plugin_set_button index_button"
              @click="setOtherWindows('insertIndicator')"
            ></span>
          </el-tooltip>
          <span
            class="plugin_full"
            @click="toggleFullScreen"
          ></span>

          <!-- <span
            id="chart_show_tools"
            class="plugin_interval_tip"
          >
            画线工具
          </span> -->
        </div>
        <div
          v-show="activeChart==2"
          class="plugin_interval"
        >
          <span class="plugin_interval_tip">深度图</span>
        </div>
      </div>
      <div class="flex items-center justify-end flex-none">
        <!-- <div
          class="plugin_interval"
          @click="activeChart = 0"
        >
          <span
            :class="{'active':activeChart==0}"
            class="plugin_interval_tip"
          >Original</span>
        </div> -->
        <div
          class="plugin_interval"
          @click="activeChart = 1"
        >
          <span
            :class="{'active':activeChart==1}"
            class="plugin_interval_tip"
          >TradingView</span>
        </div>
        <div
          class="plugin_interval"
          @click="activeChart = 2"
        >
          <span
            :class="{'active':activeChart==2}"
            class="plugin_interval_tip"
          >Depth</span>
        </div>
      </div>
    </div>
    <div class="chart-content">
      <!-- <kline-main
        v-buybit-loading="widgetloading"
        :class="{'active':activeChart==0}"
        class="coinpool-chart-content buybit-loading"
        :kline-params="klineParams"
        :kline-data="klineData"
        ref="callMethods"
        @refreshKlineData="refreshKlineData"
      >
      </kline-main> -->
      <div
        id="coinpool-chart-content"
        v-buybit-loading="widgetloading"
        :class="{'active':activeChart==1}"
        ref="coinpool-chart-content"
        class="coinpool-chart-content buybit-loading"
      ></div>
      <!-- style="padding-left: 10px;" -->
      <!-- 深度图 -->
      <div
        :class="{'active':activeChart==2}"
        class="coinpool-chart-content"
      >
        <buybit-depth-chart
          :bg-color="background=='day' ? '#FFFFFF' : '#1E222A'"
          :symblefrom="from"
          :symbleto="to"
          :symble-parame-string="symbleParameString"
          :depths-data="depthsData"
          :width="width"
          :height="height"
          ref="depth-chart"
        ></buybit-depth-chart>
      </div>
    </div>
  </fullscreen>

</template>
<style scoped rel="stylesheet/scss" lang="scss">
.isOpenState {
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
  //让子元素上下居中
  display: flex;
  justify-content: center;
  align-items: center;
  .isOpenStateText {
    line-height: 100%;
  }
}
.el-tooltip__popper.is-dark.chart_tooltip {
  margin-top: 0;
  background: #292e39;
  .popper__arrow,
  .popper__arrow:after {
    border-bottom-color: #292e39;
  }
}

.plugin_interval_minute_tip {
  position: relative;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  text-align: center;
  padding-right: 12px;
}

.plugin_interval_minute_tip:hover,
.plugin_interval_minute_tip.active,
.buybit-chart-plugin .plugin_interval .plugin_interval_tip.active,
.buybit-chart-plugin .plugin_interval .plugin_interval_tip:hover {
  color: $cl_link;
  background-color: $cl_292E39;
}

.plugin_interval_tip.active {
  color: $cl_link;
  background-color: $cl_292E39;
}

.plugin_interval_minute_tip:after,
.plugin_interval_minute_tip.active:after {
  content: '';
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;
  position: absolute;
  width: 6px;
  height: 4px;
  background-image: url('../../static/images/arrowdown.svg');
  background-size: cover;
  right: 0;
}

.plugin_interval_minute_tip:hover:after,
.plugin_interval_tip.active .plugin_interval_minute_tip:after {
  background-image: url('../../static/images/arrowdown_active.svg');
}

.plugin_interval_minute {
  position: relative;
}

.plugin_interval_minute_content {
  position: absolute;
  font-size: 12px;
  color: #ffffff;
  left: 0;
  line-height: 36px;
  background-color: #292e39;
  width: 80px;
  z-index: 2;
  top: 30px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
  border-radius: 2px;
}

.plugin_interval_minute_content li {
  padding: 0 10px;
  cursor: pointer;
}

.plugin_interval_minute_content li:hover,
.plugin_interval_minute_content li.active {
  background-color: #333946;
}

.buybit-chart {
  height: 100%;
  // height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.buybit-chart.fullscreen {
  background-color: #131722 !important;
}

.buybit-chart.fullscreen .coinpool-chart-content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}

.buybit-chart-plugin {
  font-size: 12px;
  position: relative;
  z-index: 2;
  border-bottom: 1px solid $cl_292E39;
  background-color: $cl_content;
  // margin-bottom: 5px;
  .plugin_set_button {
    float: left;
    width: 24px;
    height: 30px;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: 14px;
    background-position: center;
    margin-left: 10px;
    cursor: pointer;
  }
  .set_button {
    background-image: url('../../static/images/klin_set.svg');
  }
  .set_button:hover {
    background-image: url('../../static/images/klin_set_active.svg');
  }
  .index_button {
    background-image: url('../../static/images/klin_zhibiao.svg');
  }
  .index_button:hover {
    background-image: url('../../static/images/klin_zhibiao_active.svg');
  }
  .plugin_major_button {
    float: left;
    display: inline-block;
    width: 36px;
    height: 30px;
    border-right: 1px solid #292e39;
    border-left: 1px solid #292e39;
    background-size: 16px;
    background-repeat: no-repeat;
    background-image: url('../../static/images/klin_zhuanye.svg');
    background-position: center;
    cursor: pointer;
  }
  .plugin_major_button:hover {
    background-image: url('../../static/images/klin_zhuanye_active.svg');
  }
}

.chart-content {
  position: relative;
  width: 100%;
  flex: 1;
}

.coinpool-chart-content {
  background: $cl_content;
  width: 100%;
  height: 100%;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  div {
    width: 100%;
    height: 100%;
  }
}

.coinpool-chart-content.active {
  z-index: 1;
}

.buybit-chart-plugin .plugin_interval {
  color: $cl_8790A1;
}

.buybit-chart-plugin .plugin_interval .plugin_interval_tip {
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  padding: 0 10px;
  float: left;
}

.buybit-chart-plugin .plugin_full {
  background-image: url('../../static/images/full.svg');
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  float: left;
  width: 36px;
  height: 30px;
  cursor: pointer;
}

.fullscreen .plugin_full {
  background-image: url('../../static/images/full_active.svg');
}

.buybit-chart-plugin .plugin_chart_nav {
  color: #c5c3dd;
  display: inline-block;
  position: relative;
  float: left;
  .trading,
  .depth {
    float: left;
    background-size: 16px 16px;
    background-repeat: no-repeat;
    background-position: center;
    display: inline-block;
    width: 28px;
    height: 30px;
  }
  .trading {
    background-image: url('../../static/images/klin.svg');
  }
  .trading.active {
    background-image: url('../../static/images/klin_active.svg');
  }
  .depth {
    background-image: url('../../static/images/depth.svg');
  }
  .depth.active {
    background-image: url('../../static/images/depth_active.svg');
  }
}

.buybit-chart-plugin .plugin_chart_nav span {
  text-align: center;
  padding: 0 10px;
  display: inline-block;
  cursor: pointer;
  height: 30px;
}

.buybit-chart-plugin .plugin_chart_nav span.active {
  background-color: $cl_292E39;
  color: $cl_8790A1;
}
</style>

