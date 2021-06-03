/**
 * JS API
 */
import dataUpdater from './dataUpdater'
class datafeeds {
  /**
   * JS API
   * @param {*Object} vue vue实例
   */
  constructor(vue) {
    this.self = vue
    this.barsUpdater = new dataUpdater(this, vue)
  }

  /**
   * @param {*Function} callback  回调函数
   * `onReady` should return result asynchronously.
   */
  onReady(callback) {
    return new Promise((resolve, reject) => {
      let configuration = this.defaultConfiguration()
      if (this.self.getConfig) {
        configuration = Object.assign(
          this.defaultConfiguration(),
          this.self.getConfig()
        )
      }
      resolve(configuration)
    }).then(data => callback(data))
  }

  /**
   * @param {*String} symbolName  商品名称或ticker
   * @param {*Function} onSymbolResolvedCallback 成功回调
   * @param {*Function} onResolveErrorCallback   失败回调
   * `resolveSymbol` should return result asynchronously.
   */
  resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    return new Promise((resolve, reject) => {
        let symbolInfo = this.defaultSymbol()
        if (this.self.getSymbol) {
          symbolInfo = Object.assign(this.defaultSymbol(), this.self.getSymbol())
        }
        resolve(symbolInfo)
      })
      .then(data => onSymbolResolvedCallback(data))
      .catch(err => onResolveErrorCallback(err))
  }

  /**
   * @param {*Object} symbolInfo  商品信息对象
   * @param {*String} resolution  分辨率
   * @param {*Number} rangeStartDate  时间戳、最左边请求的K线时间
   * @param {*Number} rangeEndDate  时间戳、最右边请求的K线时间
   * @param {*Function} onDataCallback  回调函数
   * @param {*Function} onErrorCallback  回调函数
   */
  getBars(
    symbolInfo,
    resolution,
    rangeStartDate,
    rangeEndDate,
    onDataCallback,
    onErrorCallback
  ) {
    if (this.self.interval == '4hour' || resolution == '240') {
      resolution = '240'
    }
    if (this.self.interval == '1day' || resolution == '1day') {
      resolution = '1D'
    }
    if (this.self.interval == '1week' || resolution == '1week' || this.self.interval == '10080' || resolution == '10080') {
      resolution = '10080'
    }
    if (this.self.interval == '1mon' || resolution == '1mon' || this.self.interval == '43200' || resolution == '43200') {
      resolution = '43200'
    }
    const onLoadedCallback = data => {
      data && data.length ?
        onDataCallback(data, {
          noData: true
        }) :
        onDataCallback([], {
          noData: true
        })
    }
    this.self.getBars(
      symbolInfo,
      resolution,
      rangeStartDate,
      rangeEndDate,
      onLoadedCallback
    )
  }

  /**
   * 订阅K线数据。图表库将调用onRealtimeCallback方法以更新实时数据
   * @param {*Object} symbolInfo 商品信息
   * @param {*String} resolution 分辨率
   * @param {*Function} onRealtimeCallback 回调函数
   * @param {*String} subscriberUID 监听的唯一标识符
   * @param {*Function} onResetCacheNeededCallback (从1.7开始): 将在bars数据发生变化时执行
   */
  subscribeBars(
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback
  ) {
    //订阅的使用 this.self.interval 当前时间类型来做判断
    if (this.self.interval == '4hour' || resolution == '240') {
      resolution = '240'
    }
    if (this.self.interval == '1day' || resolution == '1day') {
      resolution = '1D'
    }
    if (this.self.interval == '1week' || resolution == '1week' || this.self.interval == '10080' || resolution == '10080') {
      resolution = '10080'
    }
    if (this.self.interval == '1mon' || resolution == '1mon' || this.self.interval == '10080' || resolution == '10080') {
      resolution = '43200'
    }
    // 如果resolution为空就代表this.self.interval已经是1D、1W、1M
    // if (subscriberUID.split('_')[1] == 'D') {
    //   subscriberUID = subscriberUID.split('_')[0]
    //   subscriberUID = `${subscriberUID}_${resolution}`
    // }
    if (!resolution) {
      resolution = this.self.oldInterval
      subscriberUID = subscriberUID.split('_')[0]
      subscriberUID = `${subscriberUID}_${resolution}`
    } else if (subscriberUID.split('_')[1] == 'D') {
      subscriberUID = subscriberUID.split('_')[0]
      subscriberUID = `${subscriberUID}_${resolution}`
      // } else {
      //   subscriberUID = subscriberUID.split('_')[0]
      //   subscriberUID = `${subscriberUID}_${resolution}`
    }
    this.barsUpdater.subscribeBars(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback
    )
  }

  /**
   * 取消订阅K线数据
   * @param {*String} subscriberUID 监听的唯一标识符
   */
  unsubscribeBars(subscriberUID) {
    let resolution = null
    //订阅的使用 this.self.oldInterval 上一个时间类型来做判断
    if (this.self.oldInterval == '4hour' || this.self.oldInterval == '240') {
      resolution = '240'
    }
    if (this.self.oldInterval == '1day' || this.self.oldInterval == '1D') {
      resolution = '1D'
    }
    if (this.self.oldInterval == '1week' || this.self.oldInterval == '1W' || this.self.oldInterval == '10080') {
      resolution = '10080'
    }
    if (this.self.oldInterval == '1mon' || this.self.oldInterval == '1M' || this.self.oldInterval == '43200') {
      resolution = '43200'
    }
    // 如果resolution为空就代表this.self.interval已经是1D、1W、1M
    // console.log('需要取消订阅的标识符', subscriberUID, this.self.interval)
    // if (subscriberUID.split('_')[1] == 'D') {
    //   subscriberUID = subscriberUID.split('_')[0]
    //   subscriberUID = `${subscriberUID}_${resolution}`
    // }
    if (!resolution) {
      resolution = this.self.oldInterval
      subscriberUID = subscriberUID.split('_')[0]
      subscriberUID = `${subscriberUID}_${resolution}`
    } else if (subscriberUID.split('_')[1] == 'D') {
      subscriberUID = subscriberUID.split('_')[0]
      subscriberUID = `${subscriberUID}_${resolution}`
      // } else {
      //   subscriberUID = subscriberUID.split('_')[0]
      //   subscriberUID = `${subscriberUID}_${resolution}`
    }
    this.barsUpdater.unsubscribeBars(subscriberUID)
  }

  /**
   * 默认配置
   */
  defaultConfiguration() {
    return {
      supports_search: true,
      supports_group_request: false,
      supported_resolutions: [
        '1',
        '5',
        '15',
        '30',
        '60',
        '240',
        '10080',
        '43200',
        '1D',
        '2D',
        '3D',
        '1W',
        '1M'
      ],
      supports_marks: true,
      supports_timescale_marks: true,
      supports_time: true
    }
  }

  /**
   * 默认商品信息
   */
  defaultSymbol() {
    return {
      name: this.self.symbol.toLowerCase(),
      timezone: 'Asia/Shanghai',
      minmov: 1,
      minmov2: 0,
      pointvalue: 1,
      fractional: false,
      session: '24x7',
      has_intraday: true,
      has_no_volume: false,
      description: this.self.symbol.toLowerCase(),
      pricescale: Number(this.self.pricescale) ? Number(this.self.pricescale) : 100, // 精度，100是2位小数
      ticker: this.self.symbol.toLowerCase(),
      supported_resolutions: [
        '1',
        '5',
        '15',
        '30',
        '60',
        '240',
        '10080',
        '43200',
        '1D',
        '2D',
        '3D',
        '1W',
        '1M'
      ]
    }
  }
}

export default datafeeds
