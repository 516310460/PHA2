exports.ids = [7,6];
exports.modules = {

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 数据更新器
 * 通过更新器触发datafeeds的getBars实时更新图表数据
 */
class dataUpdater {
  constructor(datafeeds, vue) {
    this.self = vue;
    this.subscribers = {};
    this.requestsPending = 0;
    this.historyProvider = datafeeds;
  }

  subscribeBars(symbolInfo, resolution, newDataCallback, listenerGuid) {
    if (this.self.interval == '4hour' || resolution == '240') {
      resolution = '240';
    }

    if (this.self.interval == '1day' || resolution == '1day') {
      resolution = '1D';
    }

    if (this.self.interval == '1week' || resolution == '1week' || this.self.interval == '10080' || resolution == '10080') {
      resolution = '10080';
    }

    if (this.self.interval == '1mon' || resolution == '1mon' || this.self.interval == '43200' || resolution == '43200') {
      resolution = '43200';
    }

    this.subscribers[listenerGuid] = {
      lastBarTime: null,
      listener: newDataCallback,
      resolution: resolution,
      symbolInfo: symbolInfo
    };
  }

  unsubscribeBars(listenerGuid) {
    delete this.subscribers[listenerGuid];
  }

  updateData() {
    //如果等于2就说明是需要加载一次性数据的那么就需要重置为0继续进行数据更新订阅
    // console.log(this.self.symbol, this.self.interval)
    // console.log(this.subscribers);
    if (this.self.connState == 2) {
      this.requestsPending = 0;
    }

    if (this.requestsPending) return;
    this.requestsPending = 0;

    for (let listenerGuid in this.subscribers) {
      this.requestsPending++;
      this.updateDataForSubscriber(listenerGuid).then(() => this.requestsPending--).catch(() => this.requestsPending--);
    }
  }

  updateDataForSubscriber(listenerGuid) {
    return new Promise((resolve, reject) => {
      const subscriptionRecord = this.subscribers[listenerGuid];
      const rangeEndTime = parseInt((Date.now() / 1000).toString());
      const rangeStartTime = rangeEndTime - this.periodLengthSeconds(subscriptionRecord.resolution, 10);
      this.historyProvider.getBars(subscriptionRecord.symbolInfo, subscriptionRecord.resolution, rangeStartTime, rangeEndTime, bars => {
        this.onSubscriberDataReceived(listenerGuid, bars);
        resolve();
      }, () => {
        reject();
      });
    });
  }

  onSubscriberDataReceived(listenerGuid, bars) {
    if (!this.subscribers.hasOwnProperty(listenerGuid)) return;
    if (!bars.length) return;
    const lastBar = bars[bars.length - 1];
    const subscriptionRecord = this.subscribers[listenerGuid];
    if (subscriptionRecord.lastBarTime !== null && lastBar.time < subscriptionRecord.lastBarTime) return;
    const isNewBar = subscriptionRecord.lastBarTime !== null && lastBar.time > subscriptionRecord.lastBarTime;

    if (isNewBar) {
      if (bars.length < 2) {
        throw new Error("Not enough bars in history for proper pulse update. Need at least 2.");
      }

      const previousBar = bars[bars.length - 2];
      subscriptionRecord.listener(previousBar);
    }

    subscriptionRecord.lastBarTime = lastBar.time;
    subscriptionRecord.listener(lastBar);
  }

  periodLengthSeconds(resolution, requiredPeriodsCount) {
    let daysCount = 0;

    if (resolution == "240") {
      daysCount = requiredPeriodsCount / 6;
    } else if (resolution === "D" || resolution === "1D") {
      daysCount = requiredPeriodsCount;
    } else if (resolution === "M" || resolution === "1M" || resolution == '43200') {
      daysCount = 31 * requiredPeriodsCount;
    } else if (resolution === "W" || resolution === "1W" || resolution == '10080') {
      daysCount = 7 * requiredPeriodsCount;
    } else {
      daysCount = requiredPeriodsCount * parseInt(resolution) / (24 * 60);
    }

    return daysCount * 24 * 60 * 60;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (dataUpdater);

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dataUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(190);
/**
 * JS API
 */


class datafeeds {
  /**
   * JS API
   * @param {*Object} vue vue实例
   */
  constructor(vue) {
    this.self = vue;
    this.barsUpdater = new _dataUpdater__WEBPACK_IMPORTED_MODULE_0__["default"](this, vue);
  }
  /**
   * @param {*Function} callback  回调函数
   * `onReady` should return result asynchronously.
   */


  onReady(callback) {
    return new Promise((resolve, reject) => {
      let configuration = this.defaultConfiguration();

      if (this.self.getConfig) {
        configuration = Object.assign(this.defaultConfiguration(), this.self.getConfig());
      }

      resolve(configuration);
    }).then(data => callback(data));
  }
  /**
   * @param {*String} symbolName  商品名称或ticker
   * @param {*Function} onSymbolResolvedCallback 成功回调
   * @param {*Function} onResolveErrorCallback   失败回调
   * `resolveSymbol` should return result asynchronously.
   */


  resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    return new Promise((resolve, reject) => {
      let symbolInfo = this.defaultSymbol();

      if (this.self.getSymbol) {
        symbolInfo = Object.assign(this.defaultSymbol(), this.self.getSymbol());
      }

      resolve(symbolInfo);
    }).then(data => onSymbolResolvedCallback(data)).catch(err => onResolveErrorCallback(err));
  }
  /**
   * @param {*Object} symbolInfo  商品信息对象
   * @param {*String} resolution  分辨率
   * @param {*Number} rangeStartDate  时间戳、最左边请求的K线时间
   * @param {*Number} rangeEndDate  时间戳、最右边请求的K线时间
   * @param {*Function} onDataCallback  回调函数
   * @param {*Function} onErrorCallback  回调函数
   */


  getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback) {
    if (this.self.interval == '4hour' || resolution == '240') {
      resolution = '240';
    }

    if (this.self.interval == '1day' || resolution == '1day') {
      resolution = '1D';
    }

    if (this.self.interval == '1week' || resolution == '1week' || this.self.interval == '10080' || resolution == '10080') {
      resolution = '10080';
    }

    if (this.self.interval == '1mon' || resolution == '1mon' || this.self.interval == '43200' || resolution == '43200') {
      resolution = '43200';
    }

    const onLoadedCallback = data => {
      data && data.length ? onDataCallback(data, {
        noData: true
      }) : onDataCallback([], {
        noData: true
      });
    };

    this.self.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback);
  }
  /**
   * 订阅K线数据。图表库将调用onRealtimeCallback方法以更新实时数据
   * @param {*Object} symbolInfo 商品信息
   * @param {*String} resolution 分辨率
   * @param {*Function} onRealtimeCallback 回调函数
   * @param {*String} subscriberUID 监听的唯一标识符
   * @param {*Function} onResetCacheNeededCallback (从1.7开始): 将在bars数据发生变化时执行
   */


  subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
    //订阅的使用 this.self.interval 当前时间类型来做判断
    if (this.self.interval == '4hour' || resolution == '240') {
      resolution = '240';
    }

    if (this.self.interval == '1day' || resolution == '1day') {
      resolution = '1D';
    }

    if (this.self.interval == '1week' || resolution == '1week' || this.self.interval == '10080' || resolution == '10080') {
      resolution = '10080';
    }

    if (this.self.interval == '1mon' || resolution == '1mon' || this.self.interval == '10080' || resolution == '10080') {
      resolution = '43200';
    } // 如果resolution为空就代表this.self.interval已经是1D、1W、1M
    // if (subscriberUID.split('_')[1] == 'D') {
    //   subscriberUID = subscriberUID.split('_')[0]
    //   subscriberUID = `${subscriberUID}_${resolution}`
    // }


    if (!resolution) {
      resolution = this.self.oldInterval;
      subscriberUID = subscriberUID.split('_')[0];
      subscriberUID = `${subscriberUID}_${resolution}`;
    } else if (subscriberUID.split('_')[1] == 'D') {
      subscriberUID = subscriberUID.split('_')[0];
      subscriberUID = `${subscriberUID}_${resolution}`; // } else {
      //   subscriberUID = subscriberUID.split('_')[0]
      //   subscriberUID = `${subscriberUID}_${resolution}`
    }

    this.barsUpdater.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback);
  }
  /**
   * 取消订阅K线数据
   * @param {*String} subscriberUID 监听的唯一标识符
   */


  unsubscribeBars(subscriberUID) {
    let resolution = null; //订阅的使用 this.self.oldInterval 上一个时间类型来做判断

    if (this.self.oldInterval == '4hour' || this.self.oldInterval == '240') {
      resolution = '240';
    }

    if (this.self.oldInterval == '1day' || this.self.oldInterval == '1D') {
      resolution = '1D';
    }

    if (this.self.oldInterval == '1week' || this.self.oldInterval == '1W' || this.self.oldInterval == '10080') {
      resolution = '10080';
    }

    if (this.self.oldInterval == '1mon' || this.self.oldInterval == '1M' || this.self.oldInterval == '43200') {
      resolution = '43200';
    } // 如果resolution为空就代表this.self.interval已经是1D、1W、1M
    // console.log('需要取消订阅的标识符', subscriberUID, this.self.interval)
    // if (subscriberUID.split('_')[1] == 'D') {
    //   subscriberUID = subscriberUID.split('_')[0]
    //   subscriberUID = `${subscriberUID}_${resolution}`
    // }


    if (!resolution) {
      resolution = this.self.oldInterval;
      subscriberUID = subscriberUID.split('_')[0];
      subscriberUID = `${subscriberUID}_${resolution}`;
    } else if (subscriberUID.split('_')[1] == 'D') {
      subscriberUID = subscriberUID.split('_')[0];
      subscriberUID = `${subscriberUID}_${resolution}`; // } else {
      //   subscriberUID = subscriberUID.split('_')[0]
      //   subscriberUID = `${subscriberUID}_${resolution}`
    }

    this.barsUpdater.unsubscribeBars(subscriberUID);
  }
  /**
   * 默认配置
   */


  defaultConfiguration() {
    return {
      supports_search: true,
      supports_group_request: false,
      supported_resolutions: ['1', '5', '15', '30', '60', '240', '10080', '43200', '1D', '2D', '3D', '1W', '1M'],
      supports_marks: true,
      supports_timescale_marks: true,
      supports_time: true
    };
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
      pricescale: Number(this.self.pricescale) ? Number(this.self.pricescale) : 100,
      // 精度，100是2位小数
      ticker: this.self.symbol.toLowerCase(),
      supported_resolutions: ['1', '5', '15', '30', '60', '240', '10080', '43200', '1D', '2D', '3D', '1W', '1M']
    };
  }

}

/* harmony default export */ __webpack_exports__["default"] = (datafeeds);

/***/ })

};;
//# sourceMappingURL=hash-rate-datafeeds-datafees.js.map