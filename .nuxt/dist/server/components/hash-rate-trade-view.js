exports.ids = [27,6,7,8,9,12,13,14,15,17];
exports.modules = {

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  history: {},
  timer: {},
  pollingtimer: {},
  subs: [],

  init() {
    this.history = {};
    this.timer = {};
    this.subs = [];
  },

  formatBar: function (data, this_vue, symbolInfo, overrides, newmoney) {
    const sub = this.subs.find(e => e.symbolInfo === symbolInfo.name);

    if (!sub || !sub.lastBar) {
      return false;
    }

    const lastBar = sub.lastBar;
    let resolution = sub.resolution;

    if (resolution.includes('1D')) {
      // 1 day in minutes === 1440
      resolution = 1440;
    } else if (resolution.includes('1W')) {
      // 1 week in minutes === 10080
      resolution = 10080;
    }

    const coeff = resolution * 60;
    const lastBarSec = lastBar.time / 1000;

    if (!Array.isArray(data)) {
      data = [data];
    }

    data.sort((a, b) => {
      return a.t - b.t;
    });
    const bars = data.map(el => {
      const rounded = Math.floor(el.t / coeff) * coeff;
      let _lastbar = {};

      if (rounded > lastBarSec) {
        _lastbar = {
          low: lastBar.close,
          high: lastBar.close,
          open: lastBar.close,
          close: el.c,
          volume: el.v
        }; // create a new candle, use last close as open **PERSONAL CHOICE**

        _lastbar.time = this_vue.global_get_local_time(el.t).valueOf(); //TradingView requires bar time in ms
      } else {
        _lastbar = lastBar;

        if (el.c < lastBar.low) {
          _lastbar.low = el.c;
        } else if (el.c > lastBar.high) {
          _lastbar.high = el.c;
        }

        if (!newmoney && (resolution.toString() == '1' || overrides)) {
          _lastbar.volume = el.v;
        }

        _lastbar.close = el.c;
      }

      return _lastbar;
    });
    let issub = true; //是否订阅

    bars.forEach(item => {
      const _last = item;

      if (_last.time < lastBar.time) {
        return true;
      } //更新最新一条k线


      setTimeout(() => {
        sub.listener(_last);
      }, 6);
      sub.lastBar = _last;
      this.history[symbolInfo.name].lastBar = _last;
    });
    return issub;
  },

  gettimer(interval) {
    interval = interval.toString();

    switch (interval) {
      case '1':
        return 2000;
        break;

      case '5':
        return 5000;
        break;

      case '15':
        return 5000;
        break;

      case '30':
        return 5000;
        break;

      case '60':
        return 5000;
        break;

      case '240':
        return 5000;
        break;

      case 'D':
        return 5000;
        break;

      case '1D':
        return 5000;
        break;

      case '1W':
        return 5000;
        break;

      case '1M':
        return 5000;
        break;
    }
  },

  getLastBarsOther: function (this_vue, symbolInfo, resolution, from, to, first, limit) {
    const _self = this;

    const getKline = function () {
      this_vue.$store.dispatch(this_vue.$socket.url.quotation_kline_get, {
        "type": this_vue.resolutionInterval,
        "size": 1,
        "symble": this_vue.symbleParameString
      }).then(({
        data
      }) => {
        if (data) {
          const t = _self.timer[symbolInfo.name + '_' + this_vue.resolutionInterval];

          let sub = _self.subs.find(e => e.symbolInfo === symbolInfo.name);

          if (!sub) {
            return;
          }

          if (t != -1) {
            sub = _self.formatBar.call(_self, data, this_vue, symbolInfo, true);
          }

          for (const _t in _self.timer) {
            clearTimeout(_self.timer[_t]);
            _self.timer[_t] = -1;
          }

          if (sub && t != -1) {
            _self.timer[symbolInfo.name + '_' + this_vue.resolutionInterval] = setTimeout(getKline, 15000);
          }
        }
      });
    };
    /*订阅最新价*/


    this_vue.$pubsub.subscribe(this_vue.$pubsub.changeNewMoney, (sub, res) => {
      if (res && res.symble == this_vue.symbleParameString) {
        const data = {
          t: res.ts,
          c: res.price,
          v: res.amount
        };

        _self.formatBar.call(_self, data, this_vue, symbolInfo, false, true);
      }
    });
    getKline();
  },
  getLastBars: function (this_vue, symbolInfo, resolution, from, to, first, limit) {
    //k线图
    const _self = this;

    const getKline = function () {
      this_vue.$store.dispatch(this_vue.$socket.url.quotation_kline_get, {
        "type": this_vue.resolutionInterval,
        "size": 1,
        "symble": this_vue.symbleParameString
      }).then(({
        data
      }) => {
        if (data) {
          const issub = _self.formatBar.call(_self, data, this_vue, symbolInfo);

          for (const _t in _self.pollingtimer) {
            clearTimeout(_self.pollingtimer[_t]);
            _self.pollingtimer[_t] = -1;
          }

          if (issub) {
            _self.pollingtimer[symbolInfo.name] = setTimeout(getKline, _self.gettimer(resolution));
          }
        }
      });
    };

    this_vue.$socket.invoke({
      sub: this_vue.sub,
      type: this_vue.$socket.type.quotation_kline_get
    });

    if (!this_vue.$socket.is()) {
      getKline();
    }

    this_vue.$socket.receive(this_vue.$socket.type.quotation_kline_get, res => {
      if (res && res.topic == this_vue.sub) {
        const data = res.data;
        /*k线是否订阅*/

        const issub = _self.formatBar.call(_self, data, this_vue, symbolInfo);

        if (!issub) {
          this_vue.$socket.uninvoke(this_vue.$socket.type.quotation_kline_get);
        }
      }
    });
  },
  getBars: function (this_vue, symbolInfo, resolution, from, to, first, limit) {
    //k线图
    let etime = to;

    if (this.history[symbolInfo.name] && this.history[symbolInfo.name].firstBar) {
      etime = this.history[symbolInfo.name].firstBar.time / 1000;
    }

    const klineParam = {
      //'btime': from,
      'etime': etime,
      "type": this_vue.resolutionInterval,
      //"size": 100,
      "symble": this_vue.symbleParameString
    };

    const _self = this;

    const getKline = function () {
      return this_vue.$store.dispatch('quotation_kline_get', klineParam).then(({
        data
      }) => {
        if (data) {
          data.sort((a, b) => {
            return a.t - b.t;
          });
          const bars = this_vue.bars = data.map(el => {
            return {
              time: this_vue.global_get_local_time(el.t).valueOf(),
              //TradingView requires bar time in ms
              low: el.l,
              high: el.h,
              open: el.o,
              close: el.c,
              volume: el.v
            };
          });
          _self.history[symbolInfo.name] = {
            lastBar: bars[bars.length - 1],
            firstBar: bars[0]
          };
          return bars;
        } else {
          return [];
        }
      });
    };

    return getKline();
  }
});

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(195);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("32a8b26e", content, true, context)
};

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  getContext2D(element) {
    if (element) {
      return element.getContext('2d');
    }

    return null;
  },

  isEmpty(map) {
    if (!map) {
      return true;
    }

    if (map instanceof Array) {
      return !map.length;
    }

    return !Object.keys(map).length;
  },

  toPretty(num) {
    num = num || 0;

    if (num < 100) {
      return num.toFixed(2);
    }

    if (num < 1e6) {
      return (num / 1e3).toFixed(1) + ' K';
    }

    if (num < 1e7) {
      return (num / 1e6).toFixed(1) + ' M';
    }

    if (num < 1e9) {
      return (num / 1e6).toFixed(0) + ' M';
    }

    if (num < 1e10) {
      return (num / 1e9).toFixed(1) + ' B';
    }

    return (num / 1e9).toFixed(0) + ' B';
  },

  toThousand(num = 0) {
    if (typeof num === 'undefined') {
      return 0;
    }

    return (num || 0).toString().replace(/\d+/, function (n) {
      let len = n.length;

      if (len % 3 === 0) {
        return n.replace(/(\d{3})/g, ',$1').slice(1);
      } else {
        return n.slice(0, len % 3) + n.slice(len % 3).replace(/(\d{3})/g, ',$1');
      }
    });
  }

});

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chart_provider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(146);

/* harmony default export */ __webpack_exports__["default"] = ({
  subscribeBars: function (symbolInfo, resolution, updateCb, uid, resetCache) {
    const _l = _chart_provider_js__WEBPACK_IMPORTED_MODULE_0__["default"].history[symbolInfo.name] ? _chart_provider_js__WEBPACK_IMPORTED_MODULE_0__["default"].history[symbolInfo.name].lastBar : null;

    const newSub = {
      uid,
      resolution,
      symbolInfo: symbolInfo.name,
      lastBar: _l,
      listener: updateCb
    };
    _chart_provider_js__WEBPACK_IMPORTED_MODULE_0__["default"].subs.push(newSub);
  },
  unsubscribeBars: function (uid) {
    const subIndex = _chart_provider_js__WEBPACK_IMPORTED_MODULE_0__["default"].subs.findIndex(e => e.uid === uid);

    if (subIndex === -1) {
      return;
    }

    _chart_provider_js__WEBPACK_IMPORTED_MODULE_0__["default"].subs.splice(subIndex, 1);
  }
});

/***/ }),

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

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_depth_chart_vue_vue_type_style_index_0_id_870dfd1a_scoped_true_rel_stylesheet_2Fscss_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(162);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_depth_chart_vue_vue_type_style_index_0_id_870dfd1a_scoped_true_rel_stylesheet_2Fscss_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_depth_chart_vue_vue_type_style_index_0_id_870dfd1a_scoped_true_rel_stylesheet_2Fscss_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_depth_chart_vue_vue_type_style_index_0_id_870dfd1a_scoped_true_rel_stylesheet_2Fscss_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_depth_chart_vue_vue_type_style_index_0_id_870dfd1a_scoped_true_rel_stylesheet_2Fscss_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".bk09[data-v-870dfd1a]{\n  background-color:#09b67d\n}\n.bk10[data-v-870dfd1a]{\n  background:#b8babb!important;\n  background-color:#b8babb!important\n}\n.bk19[data-v-870dfd1a]{\n  background-color:#f7f7f7\n}\n.bk29[data-v-870dfd1a]{\n  background-color:#fff\n}\n.bk34[data-v-870dfd1a]{\n  background-color:#a3acbd\n}\n.bk52[data-v-870dfd1a]{\n  background-color:#333\n}\n.bk62[data-v-870dfd1a]{\n  background-color:#0b1821\n}\n.bk88[data-v-870dfd1a]{\n  background-color:#02ad8f\n}\n.bk112[data-v-870dfd1a]{\n  background-color:#131722\n}\n.bk113[data-v-870dfd1a]{\n  background-color:#02ad8f\n}\n.bk114[data-v-870dfd1a]{\n  background-color:#222e3e\n}\n.bk117[data-v-870dfd1a]{\n  background-color:#08050c\n}\n.bk121[data-v-870dfd1a]{\n  background-color:#13181a\n}\n.bk122[data-v-870dfd1a]{\n  background-color:#162229\n}\n.cl08[data-v-870dfd1a]{\n  color:#aa5369\n}\n.cl09[data-v-870dfd1a]{\n  color:#09b67d\n}\n.cl23[data-v-870dfd1a]{\n  color:#5c5c5c\n}\n.cl24[data-v-870dfd1a]{\n  color:#858585\n}\n.cl25[data-v-870dfd1a]{\n  color:#adadad\n}\n.cl29[data-v-870dfd1a]{\n  color:#fff\n}\n.cl52[data-v-870dfd1a]{\n  color:#333\n}\n.cl75[data-v-870dfd1a]{\n  color:#959595\n}\n.cl77[data-v-870dfd1a]{\n  color:#cd332d\n}\n.cl88[data-v-870dfd1a]{\n  color:#02ad8f\n}\n.cl110[data-v-870dfd1a]{\n  color:#4adb62\n}\n.cl113[data-v-870dfd1a]{\n  color:#02ad8f\n}\n.cl123[data-v-870dfd1a]{\n  color:#c1d3df\n}\n.cl125[data-v-870dfd1a]{\n  color:#707d8f\n}\n.cl127[data-v-870dfd1a]{\n  color:#08b67e\n}\n.cl128[data-v-870dfd1a]{\n  color:#d5742c\n}\n.cl_buy[data-v-870dfd1a]{\n  color:#03bf7b\n}\n.cl_sell[data-v-870dfd1a]{\n  color:#eb4d5c\n}\n.br-cl09[data-v-870dfd1a]{\n  border:1px solid #09b67d\n}\n.br-cl13[data-v-870dfd1a]{\n  border:1px solid #47545c\n}\n.br-cl72[data-v-870dfd1a]{\n  border:1px solid #ededed\n}\n.tl[data-v-870dfd1a]{\n  text-align:left\n}\n.tc[data-v-870dfd1a]{\n  text-align:center\n}\n.tr[data-v-870dfd1a]{\n  text-align:right\n}\n.fl[data-v-870dfd1a]{\n  float:left\n}\n.fr[data-v-870dfd1a]{\n  float:right\n}\n.hover-cl09[data-v-870dfd1a]:hover{\n  cursor:pointer;\n  color:#09b67d\n}\n.chart-layout[data-v-870dfd1a]{\n  position:relative;\n  background:#1e222a\n}\n.chart-layout canvas[data-v-870dfd1a]{\n  position:absolute\n}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chart_stream_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(189);
/* harmony import */ var _chart_provider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(146);


const resolutions = ["1", "5", "10", "15", "30", "60", "120", "240", "360", "720", "4H", "1D", "1W", "1M"];
/* harmony default export */ __webpack_exports__["default"] = ({
  //创建feed
  createFeed: function (this_vue) {
    _chart_provider_js__WEBPACK_IMPORTED_MODULE_1__["default"].init();
    return {
      onReady: cb => {
        setTimeout(() => cb({
          supported_resolutions: resolutions
        }), 0);
      },
      searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {},
      resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        const symbol_stub = {
          name: this_vue.from + ":" + this_vue.to,
          ticker: this_vue.from + ":" + this_vue.to,
          type: 'crypto',
          session: '24x7',
          regular_session: '24x7',
          minmov: 1,
          pricescale: 100000000,
          has_intraday: true,
          has_daily: true,
          has_weekly_and_monthly: true,
          volume_precision: 8,
          data_status: 'streaming',
          intraday_multipliers: resolutions,
          timezone: this_vue.timezone
        };

        if (this_vue.to.toUpperCase().match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
          symbol_stub.pricescale = 100;
        }

        setTimeout(() => {
          onSymbolResolvedCallback(symbol_stub);
        }, 0);
      },
      getBars: function (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
        /*                        console.log('from----------', this_vue.global_get_local_time(from).format('YYYY-MM-DD HH:mm:ss'),from)
                                console.log('to----------', this_vue.global_get_local_time(to).format('YYYY-MM-DD HH:mm:ss'),to)*/
        _chart_provider_js__WEBPACK_IMPORTED_MODULE_1__["default"].getBars(this_vue, symbolInfo, resolution, from, to, firstDataRequest).then(bars => {
          if (bars.length) {
            setTimeout(() => {
              onHistoryCallback(bars);
              /*一分钟，5分钟 订阅最后一条*/

              if (firstDataRequest && ['1', '5'].indexOf(resolution) >= 0) {
                //监听最后一条数据socket
                _chart_provider_js__WEBPACK_IMPORTED_MODULE_1__["default"].getLastBars(this_vue, symbolInfo, resolution, from, to, firstDataRequest);
                /*获取最后一条数据接口*/

                _chart_provider_js__WEBPACK_IMPORTED_MODULE_1__["default"].getLastBarsOther(this_vue, symbolInfo, resolution, from, to, firstDataRequest);
              }
            }, 6);
          } else {
            setTimeout(() => {
              onHistoryCallback(bars, {
                noData: true
              });
            }, 6);
          }
        }).catch(err => {
          onErrorCallback(err);
        });
      },
      subscribeBars: (symbolInfo, resolution, onTick, subscriberUID, onResetCacheNeededCallback) => {
        _chart_stream_js__WEBPACK_IMPORTED_MODULE_0__["default"].subscribeBars(symbolInfo, resolution, onTick, subscriberUID, onResetCacheNeededCallback);
      },
      unsubscribeBars: subscriberUID => {
        _chart_stream_js__WEBPACK_IMPORTED_MODULE_0__["default"].unsubscribeBars(subscriberUID);
      },
      calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {},
      getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
        var markssss = function () {
          var that = this;
          var id = 1;
          var time = Date.parse(new Date()) / 1000;
          var color = {
            border: '#103bff',
            background: '#ff00e9'
          };
          var text = '这是标记: ';
          var label = 'S';
          var labelFontColor = '#ff8e53';
          var minSize = 5;
          var marks = [];

          for (var i = 0; i < 15; i++) {
            var mark = {};
            mark.id = id++;
            mark.time = time;
            time -= 28800;
            mark.color = color;
            mark.text = text + (id - 1);
            mark.label = label;
            mark.labelFontColor = labelFontColor;
            mark.minSize = minSize;
            marks.push(mark);
          }

          return marks;
        };

        setTimeout(function () {
          onDataCallback(markssss);
        }, 3000); //optional
      },
      getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {//optional
      },
      getServerTime: cb => {}
    };
  }
});

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var n = Object.assign || function (t) {
  for (var e, o = arguments, i = 1, n = arguments.length; i < n; i++) {
    e = o[i];

    for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
  }

  return t;
};

var s = {
  mobile: {
    disabled_features: ["left_toolbar", "header_widget", "timeframes_toolbar", "edit_buttons_in_legend", "context_menus", "control_bar", "border_around_the_chart"],
    enabled_features: []
  }
},
    r = {
  width: 800,
  height: 500,
  interval: "D",
  timezone: "UTC",
  container_id: "",
  library_path: "",
  locale: "en",
  widgetbar: {
    details: !1,
    watchlist: !1,
    watchlist_settings: {
      default_symbols: []
    }
  },
  overrides: {
    "mainSeriesProperties.showCountdown": !1
  },
  studies_overrides: {},
  brokerConfig: {
    configFlags: {}
  },
  fullscreen: !1,
  autosize: !1,
  disabled_features: [],
  enabled_features: [],
  debug: !1,
  logo: {},
  time_frames: [{
    text: "5y",
    resolution: "W"
  }, {
    text: "1y",
    resolution: "W"
  }, {
    text: "6m",
    resolution: "120"
  }, {
    text: "3m",
    resolution: "60"
  }, {
    text: "1m",
    resolution: "30"
  }, {
    text: "5d",
    resolution: "5"
  }, {
    text: "1d",
    resolution: "1"
  }],
  client_id: "0",
  user_id: "0",
  charts_storage_api_version: "1.0",
  favorites: {
    intervals: [],
    chartTypes: []
  }
};

function e(t, o) {
  var i = n({}, t);

  for (var s in o) "object" != typeof t[s] || null === t[s] || Array.isArray(t[s]) ? void 0 !== o[s] && (i[s] = o[s]) : i[s] = e(t[s], o[s]);

  return i;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  widget: function () {
    function t(t) {
      if (this._id = "coinpool_" + (1048576 * (1 + Math.random()) | 0).toString(16).substring(1), this._ready = !1, this._readyHandlers = [], this._onWindowResize = this._autoResizeChart.bind(this), !t.datafeed) throw new Error("Datafeed is not defined");

      if (this._options = e(r, t), t.preset) {
        var o = s[t.preset];
        o ? (void 0 !== this._options.disabled_features ? this._options.disabled_features = this._options.disabled_features.concat(o.disabled_features) : this._options.disabled_features = o.disabled_features, void 0 !== this._options.enabled_features ? this._options.enabled_features = this._options.enabled_features.concat(o.enabled_features) : this._options.enabled_features = o.enabled_features) : console.warn("Unknown preset: `" + t.preset + "`");
      }

      this._create();
    }

    return t.prototype.onChartReady = function (t) {
      this._ready ? t.call(this) : this._readyHandlers.push(t);
    }, t.prototype.onGrayedObjectClicked = function (t) {
      this._innerAPI().onGrayedObjectClicked(t);
    }, t.prototype.onShortcut = function (t, e) {
      this._innerWindow().createShortcutAction(t, e);
    }, t.prototype.subscribe = function (t, e) {
      this._innerAPI().subscribe(t, e);
    }, t.prototype.unsubscribe = function (t, e) {
      this._innerAPI().unsubscribe(t, e);
    }, t.prototype.chart = function (t) {
      return this._innerAPI().chart(t);
    }, t.prototype.setLanguage = function (t) {
      this.remove(), this._options.locale = t, this._create();
    }, t.prototype.setSymbol = function (t, e, o) {
      this._innerAPI().changeSymbol(t, e + "", o);
    }, t.prototype.remove = function () {
      window.removeEventListener("resize", this._onWindowResize), this._readyHandlers.splice(0, this._readyHandlers.length), delete window[this._id];

      var t = this._getIFrameElement();

      t.contentWindow.destroyChart(), t.parentNode && t.parentNode.removeChild(t);
    }, t.prototype.closePopupsAndDialogs = function () {
      this._innerAPI().closePopupsAndDialogs();
    }, t.prototype.selectLineTool = function (t) {
      this._innerAPI().selectLineTool(t);
    }, t.prototype.selectedLineTool = function () {
      return this._innerAPI().selectedLineTool();
    }, t.prototype.save = function (t) {
      this._innerAPI().saveChart(t);
    }, t.prototype.load = function (t, e) {
      this._innerAPI().loadChart({
        json: t,
        extendedData: e
      });
    }, t.prototype.getSavedCharts = function (t) {
      this._innerAPI().getSavedCharts(t);
    }, t.prototype.loadChartFromServer = function (t) {
      this._innerAPI().loadChartFromServer(t);
    }, t.prototype.saveChartToServer = function (t, e, o, i) {
      this._innerAPI().saveChartToServer(t, e, o, i);
    }, t.prototype.removeChartFromServer = function (t, e) {
      this._innerAPI().removeChartFromServer(t, e);
    }, t.prototype.onContextMenu = function (t) {
      this._innerAPI().onContextMenu(t);
    }, t.prototype.createButton = function (t) {
      return this._innerWindow().createButton(t);
    }, t.prototype.showNoticeDialog = function (t) {
      this._innerAPI().showNoticeDialog(t);
    }, t.prototype.showConfirmDialog = function (t) {
      this._innerAPI().showConfirmDialog(t);
    }, t.prototype.showLoadChartDialog = function () {
      this._innerAPI().showLoadChartDialog();
    }, t.prototype.showSaveAsChartDialog = function () {
      this._innerAPI().showSaveAsChartDialog();
    }, t.prototype.symbolInterval = function () {
      return this._innerAPI().getSymbolInterval();
    }, t.prototype.mainSeriesPriceFormatter = function () {
      return this._innerAPI().mainSeriesPriceFormatter();
    }, t.prototype.getIntervals = function () {
      return this._innerAPI().getIntervals();
    }, t.prototype.getStudiesList = function () {
      return this._innerAPI().getStudiesList();
    }, t.prototype.addCustomCSSFile = function (t) {
      this._innerWindow().addCustomCSSFile(t);
    }, t.prototype.applyOverrides = function (t) {
      this._options = e(this._options, {
        overrides: t
      }), this._innerWindow().applyOverrides(t);
    }, t.prototype.applyStudiesOverrides = function (t) {
      this._innerWindow().applyStudiesOverrides(t);
    }, t.prototype.watchList = function () {
      return this._innerAPI().watchlist();
    }, t.prototype.activeChart = function () {
      return this._innerAPI().activeChart();
    }, t.prototype.chartsCount = function () {
      return this._innerAPI().chartsCount();
    }, t.prototype.layout = function () {
      return this._innerAPI().layout();
    }, t.prototype.setLayout = function (t) {
      this._innerAPI().setLayout(t);
    }, t.prototype._getIFrameElement = function () {
      var t = document.getElementById(this._id);
      if (null === t) throw new Error("There is no such iframe");
      return t;
    }, t.prototype._innerAPI = function () {
      return this._getIFrameElement().contentWindow.tradingViewApi;
    }, t.prototype._innerWindow = function () {
      return this._getIFrameElement().contentWindow;
    }, t.prototype._autoResizeChart = function () {
      this._options.fullscreen && (this._getIFrameElement().style.height = window.innerHeight + "px");
    }, t.prototype._create = function () {
      var t = this,
          e = this._render(),
          o = document.getElementById(this._options.container_id);

      if (null === o) throw new Error("There is no such element - #" + this._options.container_id);
      o.innerHTML = e;

      var i = this._getIFrameElement();

      (this._options.autosize || this._options.fullscreen) && (i.style.width = "100%", this._options.fullscreen || (i.style.height = "100%")), window.addEventListener("resize", this._onWindowResize), this._onWindowResize();

      var n = function () {
        i.removeEventListener("load", n, !1), i.contentWindow.widgetReady(function () {
          t._ready = !0;

          for (var e = 0, o = t._readyHandlers; e < o.length; e++) {
            o[e].call(t);
          }

          i.contentWindow.initializationFinished();
        });
      };

      i.addEventListener("load", n, !1);
    }, t.prototype._render = function () {
      var t = window;
      t[this._id] = {
        datafeed: this._options.datafeed,
        customFormatters: this._options.customFormatters,
        brokerFactory: this._options.brokerFactory,
        overrides: this._options.overrides,
        studiesOverrides: this._options.studies_overrides,
        disabledFeatures: this._options.disabled_features,
        enabledFeatures: this._options.enabled_features,
        brokerConfig: this._options.brokerConfig,
        restConfig: this._options.restConfig,
        favorites: this._options.favorites,
        logo: this._options.logo,
        numeric_formatting: this._options.numeric_formatting,
        rss_news_feed: this._options.rss_news_feed,
        newsProvider: this._options.news_provider,
        loadLastChart: this._options.load_last_chart,
        saveLoadAdapter: this._options.save_load_adapter,
        loading_screen: this._options.loading_screen,
        settingsAdapter: this._options.settings_adapter
      }, this._options.saved_data && (t[this._id].chartContent = {
        json: this._options.saved_data
      });
      var e = (this._options.library_path || "") + "static/tv-chart.630b704a2b9d0eaf1593.html#localserver=1&symbol=" + encodeURIComponent(this._options.symbol) + "&interval=" + encodeURIComponent(this._options.interval) + (this._options.timeframe ? "&timeframe=" + encodeURIComponent(this._options.timeframe) : "") + (this._options.toolbar_bg ? "&toolbarbg=" + this._options.toolbar_bg.replace("#", "") : "") + (this._options.studies_access ? "&studiesAccess=" + encodeURIComponent(JSON.stringify(this._options.studies_access)) : "") + "&widgetbar=" + encodeURIComponent(JSON.stringify(this._options.widgetbar)) + (this._options.drawings_access ? "&drawingsAccess=" + encodeURIComponent(JSON.stringify(this._options.drawings_access)) : "") + "&timeFrames=" + encodeURIComponent(JSON.stringify(this._options.time_frames)) + "&locale=" + encodeURIComponent(this._options.locale) + "&uid=" + encodeURIComponent(this._id) + "&clientId=" + encodeURIComponent(String(this._options.client_id)) + "&userId=" + encodeURIComponent(String(this._options.user_id)) + (this._options.charts_storage_url ? "&chartsStorageUrl=" + encodeURIComponent(this._options.charts_storage_url) : "") + (this._options.charts_storage_api_version ? "&chartsStorageVer=" + encodeURIComponent(this._options.charts_storage_api_version) : "") + (this._options.indicators_file_name ? "&indicatorsFile=" + encodeURIComponent(this._options.indicators_file_name) : "") + (this._options.custom_css_url ? "&customCSS=" + encodeURIComponent(this._options.custom_css_url) : "") + (this._options.auto_save_delay ? "&autoSaveDelay=" + encodeURIComponent(String(this._options.auto_save_delay)) : "") + "&debug=" + this._options.debug + (this._options.snapshot_url ? "&snapshotUrl=" + encodeURIComponent(this._options.snapshot_url) : "") + (this._options.timezone ? "&timezone=" + encodeURIComponent(this._options.timezone) : "") + (this._options.study_count_limit ? "&studyCountLimit=" + encodeURIComponent(String(this._options.study_count_limit)) : "") + (this._options.symbol_search_request_delay ? "&ssreqdelay=" + encodeURIComponent(String(this._options.symbol_search_request_delay)) : "");
      return '<iframe id="' + this._id + '" name="' + this._id + '"  src="' + e + '"' + (this._options.autosize || this._options.fullscreen ? "" : ' width="' + this._options.width + '" height="' + this._options.height + '"') + ' frameborder="0" allowTransparency="true" scrolling="no" allowfullscreen style="visibility: hidden;"></iframe>';
    }, t;
  }()
});

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class socket {
  constructor(url = 'wss://api.fcoin.com/v2/ws', options) {
    this.heartBeatTimer = null;
    this.options = options;
    this.messageMap = {};
    this.connState = 0;
    this.socket = null;
    this.url = url;
  }

  doOpen() {
    if (this.connState) return;
    this.connState = 1;
    this.afterOpenEmit = [];
    const BrowserWebSocket = window.WebSocket || window.MozWebSocket;
    const socket = new BrowserWebSocket(this.url);
    socket.binaryType = 'arraybuffer';

    socket.onopen = evt => this.onOpen(evt);

    socket.onclose = evt => this.onClose(evt);

    socket.onmessage = evt => this.onMessage(evt.data);

    socket.onerror = err => this.onError(err);

    this.socket = socket;
  }

  onOpen(evt) {
    this.connState = 2;
    this.heartBeatTimer = setInterval(this.checkHeartbeat.bind(this), 20000);
    this.onReceiver({
      Event: 'open'
    });
  }

  checkOpen() {
    return this.connState === 2;
  }

  onClose() {
    this.connState = 0;

    if (this.connState) {
      this.onReceiver({
        Event: 'close'
      });
    }
  }

  send(data) {
    this.socket.send(JSON.stringify(data));

    if (this.socket.bufferedAmount === 0) {// 发送完毕
      // console.log('发送完毕')
    } else {// 发送还没结束
        // console.log('发送还没结束')
      }
  }

  emit(data) {
    return new Promise(resolve => {
      this.socket.send(JSON.stringify(data));
      this.on('message', data => {
        resolve(data);
      });
    });
  }

  onMessage(message) {
    try {
      const data = JSON.parse(message);
      this.onReceiver({
        Event: 'message',
        Data: data
      });
    } catch (err) {
      console.error(' >> Data parsing error:', err);
    }
  }

  checkHeartbeat() {
    const data = {
      'cmd': 'ping',
      'args': [Date.parse(new Date())]
    };
    this.send(data);
  }

  onError(err) {}

  onReceiver(data) {
    const callback = this.messageMap[data.Event];
    if (callback) callback(data.Data);
  }

  on(name, handler) {
    this.messageMap[name] = handler;
  }

  doClose() {
    this.socket.close();
  }

  destroy() {
    if (this.heartBeatTimer) {
      clearInterval(this.heartBeatTimer);
      this.heartBeatTimer = null;
    }

    this.doClose();
    this.messageMap = {};
    this.connState = 0;
    this.socket = null;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (socket);

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

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(282);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("70a82bb6", content, true, context)
};

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/HashRate/depth-chart.vue?vue&type=template&id=870dfd1a&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"depth-chart",staticClass:"depth-chart"},[_vm._ssrNode("<div class=\"chart-layout\""+(_vm._ssrStyle(null,_vm.wrapStyles, null))+" data-v-870dfd1a><canvas"+(_vm._ssrAttr("width",_vm.fWidth * 2))+(_vm._ssrAttr("height",_vm.fHeight * 2))+" class=\"chart\""+(_vm._ssrStyle(null,_vm.chartStyles, null))+" data-v-870dfd1a></canvas> <canvas"+(_vm._ssrAttr("width",_vm.fWidth))+(_vm._ssrAttr("height",_vm.fHeight))+" class=\"chart-mask\" data-v-870dfd1a></canvas> <canvas"+(_vm._ssrAttr("width",_vm.fWidth))+" height=\"24\" class=\"chart-x\""+(_vm._ssrStyle(null,_vm.xStyles, null))+" data-v-870dfd1a></canvas> <canvas width=\"48\""+(_vm._ssrAttr("height",_vm.fHeight))+" class=\"chart-y\""+(_vm._ssrStyle(null,_vm.yStyles, null))+" data-v-870dfd1a></canvas></div>")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/HashRate/depth-chart.vue?vue&type=template&id=870dfd1a&scoped=true&

// EXTERNAL MODULE: ./components/HashRate/js/utils.js
var utils = __webpack_require__(188);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/HashRate/depth-chart.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var depth_chartvue_type_script_lang_js_ = ({
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
        }
      }
    }
  },

  data() {
    return {
      chart: null,
      context: null,
      maskChart: null,
      maskContext: null,
      xChart: null,
      xChartContext: null,
      yChart: null,
      yChartContext: null,
      finalOptions: { ...this.options
      },
      fHeight: 0,
      fWidth: 0,
      width: 0,
      height: 0,
      hasPaint: false,
      args: null,
      valueMap: new Map(),
      valueData: [],
      //实时买卖数据
      buyData: [],
      //买单数据
      sellData: [],
      //卖单数据
      initState: false,
      timeInterval: null,
      buyInitState: false,
      //买单数据初始化状态
      sellInitState: false,
      //卖单数据初始化状态
      timer: null
    };
  },

  computed: {
    wrapStyles() {
      return {
        height: this.fHeight + 24 + 'px'
      };
    },

    chartStyles() {
      return {
        backgroundColor: this.bgColor,
        width: this.fWidth + 'px',
        height: this.fHeight + 'px'
      };
    },

    xStyles() {
      return {
        top: this.fHeight + 'px',
        left: 0
      };
    },

    yStyles() {
      return {
        top: 0,
        left: this.fWidth + 'px'
      };
    },

    isEmptyData() {
      let res = {
        buy: this.buyData,
        sell: this.sellData
      };
      return utils["default"].isEmpty(res);
    }

  },
  watch: {
    depthsData: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        // do something, 可使用this
        if (newV.bids.length) {
          let newArray = [];
          newV.bids.forEach((item, index) => {
            newArray.push({
              index: index,
              price: item[0],
              total: item[1],
              volume: item[1]
            });
          });
          this.buyData = newArray;
        }

        if (newV.asks.length) {
          let newArray = [];
          newV.asks.forEach((item, index) => {
            newArray.push({
              index: index,
              price: item[0],
              total: item[1],
              volume: item[1]
            });
          });
          this.sellData = newArray.reverse();
        }

        if (!this.sellData.length || !this.sellData[0].total || !this.buyData.length || !this.buyData[0].total) return;

        this._initChart();
      },

      deep: true
    }
  },

  //离开当前页面就显示底部
  destroyed() {
    clearInterval(this.timeInterval);
    clearTimeout(this.timer);
  },

  mounted() {
    this.$nextTick(() => {
      this.timer = setTimeout(() => {
        this.handleResize();
      });
      window.addEventListener('resize', this.handleResize); //如果切换了主题就重新渲染

      this.$bus.on('changeTheme', () => {
        if (!this.sellData.length || !this.sellData[0].total || !this.buyData.length || !this.buyData[0].total) return;

        this._initChart();
      });
    });
  },

  beforeDestroy() {
    this._resetChart();
  },

  methods: {
    //获取当前屏幕宽度和高度
    handleResize() {
      //如果一样的高宽不做改变 直接return
      if (this.width && this.width == this.$refs['depth-chart'].clientWidth && this.height == this.$refs['depth-chart'].clientHeight) {
        return;
      }

      this.width = this.$refs['depth-chart'].clientWidth;
      this.height = this.$refs['depth-chart'].clientHeight;
      this.fHeight = parseFloat(this.height) - 24;
      this.fWidth = parseFloat(this.width) - 48;
      this.initState = false;
    },

    _initChart() {
      this.chart = this.$refs['chart'];
      this.context = utils["default"].getContext2D(this.chart);
      this.maskChart = this.$refs['chartMask'];
      this.maskContext = utils["default"].getContext2D(this.maskChart);
      this.xChart = this.$refs['xChart'];
      this.xChartContext = utils["default"].getContext2D(this.xChart);
      this.yChart = this.$refs['yChart'];
      this.yChartContext = utils["default"].getContext2D(this.yChart);
      if (!this.maskContext || !this.xChartContext || !this.yChartContext) return; //清除竖线

      this.maskContext.clearRect(0, 0, parseFloat(this.fWidth), parseFloat(this.fHeight)); //清除x轴画布

      this.xChartContext.clearRect(0, 0, parseFloat(this.fWidth), 24); //清除y轴画布

      this.yChartContext.clearRect(0, 0, parseFloat(this.fHeight), parseFloat(this.fHeight)); // this._drawChart(this._initChartData());

      let res = {
        buy: this.buyData,
        sell: this.sellData
      };

      this._drawChart(res);
    },

    //深度数据填充
    _initChartData() {
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

      console.log(result);
      return result;
    },

    _resetChart() {
      this.chart = this.maskChart = this.xChart = this.yChart = null;
    },

    _drawChart(data) {
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

    _calcArgs(data, width, height) {
      if (!this.isEmptyData || data.sell.length && !data.sell[data.sell.length - 1].total || data.buy.length && !data.buy[data.buy.length - 1].total) {
        // const maxAmount = Math.max(data.sell[0].total, data.buy[data.buy.length - 1].total);
        const maxAmount = Math.max(data.sell[data.sell.length - 1].total, data.buy[data.buy.length - 1].total);
        const scaleH = maxAmount / height;
        const scaleW = width / 2 / data.sell.length;
        return {
          maxAmount,
          scaleH,
          scaleW
        };
      }

      return null;
    },

    //堆积深度图
    _drawMainCanvas(context, data, width, height, args) {
      if (!args) {
        throw new Error('args not ok');
      }

      if (this.hasPaint) {
        context.clearRect(0, 0, width, height);
      } //深度图背景色


      context.fillStyle = this.$store.state.background == 'day' ? '#FFFFFF' : '#1E222A'; // context.fillStyle = '#FFFBF6';

      context.fillRect(0, 0, width, height);

      if (!this.initState) {
        this.initState = true;
        this.context.scale(2, 2);
      }

      const {
        maxAmount
      } = args;
      const paddingTop = this.paddingTop;
      const gap = this.gap;
      const equalWidth = width / 2;
      let tempList = [];
      let x = 0;
      let y = paddingTop;
      let lastPoint = {
        x,
        y
      };
      let buyLength = data.buy.length;
      let sellLength = data.sell.length; // console.log(data.buy[0])

      if (buyLength) {
        const scaleW = equalWidth / (buyLength ? buyLength : 1);
        context.beginPath();
        context.fillStyle = this.buyFillColor;

        for (let i in data.buy) {
          let item = data.buy[i];
          x = equalWidth - i * scaleW - gap;
          y = height - item.total / maxAmount * (height - 24); //设置买单深度高度

          if (Number(i) === 0 && x > 0) {
            context.lineTo(x, height);
          }

          if (x <= 2) {
            x = 2;
          }

          tempList.push({
            x,
            y,
            value: item,
            side: 'buy'
          });

          if (this.jagged) {
            context.lineTo(x, lastPoint.y);
          }

          context.lineTo(x, y);
          context.stroke();
          lastPoint = {
            x,
            y
          };
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
          y = height - item.total / maxAmount * (height - 24); //设置卖单深度高度

          if (x > width - 2) {
            x = width - 2;
          }

          tempList.push({
            x,
            y,
            value: item,
            side: 'sell'
          });

          if (this.jagged) {
            context.lineTo(x, lastPoint.y);
          }

          context.lineTo(x, y);
          lastPoint = {
            x,
            y
          };
        }

        context.lineWidth = 3;
        context.strokeStyle = '#8F223A';
        context.lineTo(width + gap, y);
        context.lineTo(width + gap, height);
        context.lineTo(equalWidth + gap, height);
        context.stroke();
        context.fill();
        context.closePath(); //删除最后一个数组

        tempList.pop();
        tempList = tempList.sort((a, b) => a.x - b.x); // console.log(tempList[0])
        // tempList.forEach((item) => this.valueMap.set([item.x, item.y, item.side], item.value));
        // console.log(this.valueMap.keys())

        let newArray = []; //组装深度图竖线实时可变数据

        tempList.forEach(item => {
          newArray.push({
            x: item.x,
            y: item.y,
            side: item.side,
            value: item.value
          });
        });
        this.valueData = newArray;
      }
    },

    //深度图x轴
    _drawXLine(data) {
      const context = this.xChartContext;
      const width = parseFloat(this.fWidth);

      if (this.hasPaint) {
        context.clearRect(0, 0, width, 24);
      }

      context.font = '10px Sans-Serif'; //深度图x坐标轴背景色

      context.fillStyle = this.$store.state.background == 'day' ? '#1E222A' : '#ffffff'; // context.fillStyle = "rgba(0, 0, 0, 0.35)";

      let buyLength = data.buy.length;
      let sellLength = data.sell.length;
      const equalWidth = width / 2;
      const step = width <= 650 ? 3 : 4;

      this._xPagesFn(buyLength, equalWidth, step, context, data, 'buy', width);

      this._xPagesFn(sellLength, equalWidth, step, context, data, 'sell', width);
    },

    _xPagesFn(length, equalWidth, step, context, data, type, width) {
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
    _drawYLine() {
      let x = 0;
      let y = 0;
      const height = parseFloat(this.fHeight);
      const {
        maxAmount
      } = this.args;
      const context = this.yChartContext;

      if (this.hasPaint) {
        context.clearRect(0, 0, 48, height);
      }

      context.font = '10px Sans-Serif'; //深度图y坐标轴背景色

      context.fillStyle = this.$store.state.background == 'day' ? '#1E222A' : '#ffffff'; // context.fillStyle = "rgba(0, 0, 0, 0.35)";
      // 计算Y轴的每个阶段的值

      let seg = maxAmount / 5; // for (let i = 1; i < 6; i++) {
      // Y轴从0 开始

      for (let i = 0; i < 6; i++) {
        x = 6; // y = height - seg * (i - 1) / maxAmount * (height - 24);

        y = height - seg * i / maxAmount * (height - 24);
        context.fillText(utils["default"].toPretty(seg * i), x, y);
      }
    },

    handleMouseMove({
      offsetX,
      offsetY
    }) {
      const valueMap = this.valueMap;
      const valueData = this.valueData;
      const maskContext = this.maskContext;
      const width = this.fWidth;
      const height = this.fHeight;
      const Half = width / 2;
      if (!this.maskContext) return;
      maskContext.clearRect(0, 0, width, height); // for (let key of valueMap.keys()) {

      for (let key of valueData) {
        const x = key.x;
        const y = key.y;
        const side = key.side; // const result = valueMap.get(key);

        const result = key.value; //买卖竖线的颜色

        const colorsDepth = side === 'buy' ? 'rgb(3, 191, 123, 1)' : 'rgb(235, 77, 92)';
        const colorsDepthArc = side === 'buy' ? 'rgba(13, 118, 128, 0.35)' : 'rgba(143, 34, 58, 0.35)';
        const isLeft = offsetX < Half;

        if (offsetX < x) {
          maskContext.strokeStyle = colorsDepth;
          maskContext.lineWidth = 2;
          maskContext.setLineDash([3]);
          maskContext.clearRect(0, 0, width, height); // maskContext.beginPath();
          // maskContext.moveTo(0, y);
          // maskContext.lineTo(width, y);
          // maskContext.stroke();
          // maskContext.closePath();

          maskContext.beginPath();
          maskContext.moveTo(x, y);
          maskContext.lineTo(x, height);
          maskContext.stroke();
          maskContext.closePath();
          maskContext.beginPath(); // maskContext.shadowBlur = 10;
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
          let maxTextWidth = Math.max(maskContext.measureText(this.$t('HashRate.pro.depthChart.title1')).width, maskContext.measureText(this.$t('HashRate.pro.depthChart.title2')).width); // if(maxTextWidth + 20 > widthOffset) {
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
          const textPos = isLeft ? leftPosAndMargin : rightPosAndMargin; // maskContext.fillRect(left, top, widthOffset, heightOffset);

          this.drawRoundedRect(maskContext, isLeft ? leftPos : rightPos, top, widthOffset, heightOffset, 4, true, false);
          maskContext.fillStyle = colorsDepth;
          maskContext.fillRect(leftPos, top, 2, heightOffset);
          maskContext.textAlign = 'left'; // maskContext.shadowBlur = 6;
          // maskContext.shadowColor = 'rgba(255, 206, 167, 0.5)';
          // maskContext.fillStyle = 'rgba(0, 0, 0, 0.65)';

          maskContext.fillStyle = this.$store.state.background == 'day' ? 'rgb(19, 23, 34)' : '#ffffff';
          maskContext.fillText(this.$t('HashRate.pro.depthChart.title1'), textPos, top + marginTop);
          maskContext.fillStyle = this.$store.state.background == 'day' ? 'rgb(19, 23, 34)' : '#ffffff'; // maskContext.fillStyle = 'black';

          maskContext.fillText(utils["default"].toThousand(result.price), textPos, top + marginTop + 16);
          maskContext.fillStyle = this.$store.state.background == 'day' ? 'rgb(19, 23, 34)' : '#ffffff'; // maskContext.fillStyle = 'rgba(0, 0, 0, 0.65)';

          maskContext.fillText(this.$t('HashRate.pro.depthChart.title2'), textPos, top + marginTop + lineHeight + 24);
          maskContext.fillStyle = this.$store.state.background == 'day' ? 'rgb(19, 23, 34)' : '#ffffff'; // maskContext.fillStyle = 'black';

          maskContext.fillText(utils["default"].toThousand(result.total), textPos, top + marginTop + lineHeight + 40);
          maskContext.closePath();
          break;
        }
      }
    },

    handleMouseOut() {
      const maskContext = this.maskContext;
      const width = this.fWidth;
      const height = this.fHeight;
      if (!this.maskContext) return;
      maskContext.clearRect(0, 0, width, height);
    },

    drawRoundedRect(ctx, x, y, width, height, r, fill, stroke) {
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
});
// CONCATENATED MODULE: ./components/HashRate/depth-chart.vue?vue&type=script&lang=js&
 /* harmony default export */ var HashRate_depth_chartvue_type_script_lang_js_ = (depth_chartvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./components/HashRate/depth-chart.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(194)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  HashRate_depth_chartvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "870dfd1a",
  "e6e25a82"
  
)

/* harmony default export */ var depth_chart = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_tradeView_vue_vue_type_style_index_0_id_77f374d8_scoped_true_rel_stylesheet_2Fscss_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(231);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_tradeView_vue_vue_type_style_index_0_id_77f374d8_scoped_true_rel_stylesheet_2Fscss_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_tradeView_vue_vue_type_style_index_0_id_77f374d8_scoped_true_rel_stylesheet_2Fscss_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_tradeView_vue_vue_type_style_index_0_id_77f374d8_scoped_true_rel_stylesheet_2Fscss_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_tradeView_vue_vue_type_style_index_0_id_77f374d8_scoped_true_rel_stylesheet_2Fscss_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 282:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(13);
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(283);
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(284);
var ___CSS_LOADER_URL_IMPORT_2___ = __webpack_require__(285);
var ___CSS_LOADER_URL_IMPORT_3___ = __webpack_require__(286);
var ___CSS_LOADER_URL_IMPORT_4___ = __webpack_require__(287);
var ___CSS_LOADER_URL_IMPORT_5___ = __webpack_require__(288);
var ___CSS_LOADER_URL_IMPORT_6___ = __webpack_require__(289);
var ___CSS_LOADER_URL_IMPORT_7___ = __webpack_require__(290);
var ___CSS_LOADER_URL_IMPORT_8___ = __webpack_require__(291);
var ___CSS_LOADER_URL_IMPORT_9___ = __webpack_require__(292);
var ___CSS_LOADER_URL_IMPORT_10___ = __webpack_require__(293);
var ___CSS_LOADER_URL_IMPORT_11___ = __webpack_require__(294);
var ___CSS_LOADER_URL_IMPORT_12___ = __webpack_require__(295);
var ___CSS_LOADER_URL_IMPORT_13___ = __webpack_require__(296);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_9___);
var ___CSS_LOADER_URL_REPLACEMENT_10___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_10___);
var ___CSS_LOADER_URL_REPLACEMENT_11___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_11___);
var ___CSS_LOADER_URL_REPLACEMENT_12___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_12___);
var ___CSS_LOADER_URL_REPLACEMENT_13___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_13___);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".bk09[data-v-77f374d8]{\n  background-color:#09b67d\n}\n.bk10[data-v-77f374d8]{\n  background:#b8babb!important;\n  background-color:#b8babb!important\n}\n.bk19[data-v-77f374d8]{\n  background-color:#f7f7f7\n}\n.bk29[data-v-77f374d8]{\n  background-color:#fff\n}\n.bk34[data-v-77f374d8]{\n  background-color:#a3acbd\n}\n.bk52[data-v-77f374d8]{\n  background-color:#333\n}\n.bk62[data-v-77f374d8]{\n  background-color:#0b1821\n}\n.bk88[data-v-77f374d8]{\n  background-color:#02ad8f\n}\n.bk112[data-v-77f374d8]{\n  background-color:#131722\n}\n.bk113[data-v-77f374d8]{\n  background-color:#02ad8f\n}\n.bk114[data-v-77f374d8]{\n  background-color:#222e3e\n}\n.bk117[data-v-77f374d8]{\n  background-color:#08050c\n}\n.bk121[data-v-77f374d8]{\n  background-color:#13181a\n}\n.bk122[data-v-77f374d8]{\n  background-color:#162229\n}\n.cl08[data-v-77f374d8]{\n  color:#aa5369\n}\n.cl09[data-v-77f374d8]{\n  color:#09b67d\n}\n.cl23[data-v-77f374d8]{\n  color:#5c5c5c\n}\n.cl24[data-v-77f374d8]{\n  color:#858585\n}\n.cl25[data-v-77f374d8]{\n  color:#adadad\n}\n.cl29[data-v-77f374d8]{\n  color:#fff\n}\n.cl52[data-v-77f374d8]{\n  color:#333\n}\n.cl75[data-v-77f374d8]{\n  color:#959595\n}\n.cl77[data-v-77f374d8]{\n  color:#cd332d\n}\n.cl88[data-v-77f374d8]{\n  color:#02ad8f\n}\n.cl110[data-v-77f374d8]{\n  color:#4adb62\n}\n.cl113[data-v-77f374d8]{\n  color:#02ad8f\n}\n.cl123[data-v-77f374d8]{\n  color:#c1d3df\n}\n.cl125[data-v-77f374d8]{\n  color:#707d8f\n}\n.cl127[data-v-77f374d8]{\n  color:#08b67e\n}\n.cl128[data-v-77f374d8]{\n  color:#d5742c\n}\n.cl_buy[data-v-77f374d8]{\n  color:#03bf7b\n}\n.cl_sell[data-v-77f374d8]{\n  color:#eb4d5c\n}\n.br-cl09[data-v-77f374d8]{\n  border:1px solid #09b67d\n}\n.br-cl13[data-v-77f374d8]{\n  border:1px solid #47545c\n}\n.br-cl72[data-v-77f374d8]{\n  border:1px solid #ededed\n}\n.tl[data-v-77f374d8]{\n  text-align:left\n}\n.tc[data-v-77f374d8]{\n  text-align:center\n}\n.tr[data-v-77f374d8]{\n  text-align:right\n}\n.fl[data-v-77f374d8]{\n  float:left\n}\n.fr[data-v-77f374d8]{\n  float:right\n}\n.hover-cl09[data-v-77f374d8]:hover{\n  cursor:pointer;\n  color:#09b67d\n}\n.isOpenState[data-v-77f374d8]{\n  width:100%;\n  position:absolute;\n  height:100%;\n  top:0;\n  left:0;\n  z-index:999;\n  background:rgba(0,0,0,.8);\n  display:flex;\n  justify-content:center;\n  align-items:center\n}\n.isOpenState .isOpenStateText[data-v-77f374d8]{\n  line-height:100%\n}\n.el-tooltip__popper.is-dark.chart_tooltip[data-v-77f374d8]{\n  margin-top:0;\n  background:#292e39\n}\n.el-tooltip__popper.is-dark.chart_tooltip .popper__arrow[data-v-77f374d8],.el-tooltip__popper.is-dark.chart_tooltip .popper__arrow[data-v-77f374d8]:after{\n  border-bottom-color:#292e39\n}\n.plugin_interval_minute_tip[data-v-77f374d8]{\n  position:relative;\n  cursor:pointer;\n  height:30px;\n  line-height:30px;\n  display:inline-block;\n  text-align:center;\n  padding-right:12px\n}\n.buybit-chart-plugin .plugin_interval .plugin_interval_tip.active[data-v-77f374d8],.buybit-chart-plugin .plugin_interval .plugin_interval_tip[data-v-77f374d8]:hover,.plugin_interval_minute_tip.active[data-v-77f374d8],.plugin_interval_minute_tip[data-v-77f374d8]:hover,.plugin_interval_tip.active[data-v-77f374d8]{\n  color:#02ad8f;\n  background-color:#292e39\n}\n.plugin_interval_minute_tip.active[data-v-77f374d8]:after,.plugin_interval_minute_tip[data-v-77f374d8]:after{\n  content:\"\";\n  top:50%;\n  transform:translateY(-50%);\n  display:inline-block;\n  position:absolute;\n  width:6px;\n  height:4px;\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size:cover;\n  right:0\n}\n.plugin_interval_minute_tip[data-v-77f374d8]:hover:after,.plugin_interval_tip.active .plugin_interval_minute_tip[data-v-77f374d8]:after{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ")\n}\n.plugin_interval_minute[data-v-77f374d8]{\n  position:relative\n}\n.plugin_interval_minute_content[data-v-77f374d8]{\n  position:absolute;\n  font-size:12px;\n  color:#fff;\n  left:0;\n  line-height:36px;\n  background-color:#292e39;\n  width:80px;\n  z-index:2;\n  top:30px;\n  box-shadow:0 2px 6px 0 rgba(0,0,0,.15);\n  border-radius:2px\n}\n.plugin_interval_minute_content li[data-v-77f374d8]{\n  padding:0 10px;\n  cursor:pointer\n}\n.plugin_interval_minute_content li.active[data-v-77f374d8],.plugin_interval_minute_content li[data-v-77f374d8]:hover{\n  background-color:#333946\n}\n.buybit-chart[data-v-77f374d8]{\n  height:100%;\n  position:relative;\n  display:flex;\n  flex-direction:column\n}\n.buybit-chart.fullscreen[data-v-77f374d8]{\n  background-color:#131722!important\n}\n.buybit-chart.fullscreen .coinpool-chart-content[data-v-77f374d8]{\n  width:100%;\n  height:100%;\n  position:absolute;\n  top:0\n}\n.buybit-chart-plugin[data-v-77f374d8]{\n  font-size:12px;\n  position:relative;\n  z-index:2;\n  border-bottom:1px solid #292e39;\n  background-color:#1e222a\n}\n.buybit-chart-plugin .plugin_set_button[data-v-77f374d8]{\n  float:left;\n  width:24px;\n  height:30px;\n  display:inline-block;\n  background-repeat:no-repeat;\n  background-size:14px;\n  background-position:50%;\n  margin-left:10px;\n  cursor:pointer\n}\n.buybit-chart-plugin .set_button[data-v-77f374d8]{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ")\n}\n.buybit-chart-plugin .set_button[data-v-77f374d8]:hover{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ")\n}\n.buybit-chart-plugin .index_button[data-v-77f374d8]{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ")\n}\n.buybit-chart-plugin .index_button[data-v-77f374d8]:hover{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ")\n}\n.buybit-chart-plugin .plugin_major_button[data-v-77f374d8]{\n  float:left;\n  display:inline-block;\n  width:36px;\n  height:30px;\n  border-right:1px solid #292e39;\n  border-left:1px solid #292e39;\n  background-size:16px;\n  background-repeat:no-repeat;\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ");\n  background-position:50%;\n  cursor:pointer\n}\n.buybit-chart-plugin .plugin_major_button[data-v-77f374d8]:hover{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ")\n}\n.chart-content[data-v-77f374d8]{\n  position:relative;\n  width:100%;\n  flex:1\n}\n.coinpool-chart-content[data-v-77f374d8]{\n  background:#1e222a;\n  height:100%;\n  position:absolute;\n  width:100%;\n  top:0;\n  left:0;\n  z-index:0\n}\n.coinpool-chart-content div[data-v-77f374d8]{\n  width:100%;\n  height:100%\n}\n.coinpool-chart-content.active[data-v-77f374d8]{\n  z-index:1\n}\n.buybit-chart-plugin .plugin_interval[data-v-77f374d8]{\n  color:#8790a1\n}\n.buybit-chart-plugin .plugin_interval .plugin_interval_tip[data-v-77f374d8]{\n  cursor:pointer;\n  height:30px;\n  line-height:30px;\n  display:inline-block;\n  padding:0 10px;\n  float:left\n}\n.buybit-chart-plugin .plugin_full[data-v-77f374d8]{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ");\n  background-size:16px;\n  background-repeat:no-repeat;\n  background-position:50%;\n  display:inline-block;\n  float:left;\n  width:36px;\n  height:30px;\n  cursor:pointer\n}\n.fullscreen .plugin_full[data-v-77f374d8]{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ")\n}\n.buybit-chart-plugin .plugin_chart_nav[data-v-77f374d8]{\n  color:#c5c3dd;\n  display:inline-block;\n  position:relative;\n  float:left\n}\n.buybit-chart-plugin .plugin_chart_nav .depth[data-v-77f374d8],.buybit-chart-plugin .plugin_chart_nav .trading[data-v-77f374d8]{\n  float:left;\n  background-size:16px 16px;\n  background-repeat:no-repeat;\n  background-position:50%;\n  display:inline-block;\n  width:28px;\n  height:30px\n}\n.buybit-chart-plugin .plugin_chart_nav .trading[data-v-77f374d8]{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_10___ + ")\n}\n.buybit-chart-plugin .plugin_chart_nav .trading.active[data-v-77f374d8]{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_11___ + ")\n}\n.buybit-chart-plugin .plugin_chart_nav .depth[data-v-77f374d8]{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_12___ + ")\n}\n.buybit-chart-plugin .plugin_chart_nav .depth.active[data-v-77f374d8]{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_13___ + ")\n}\n.buybit-chart-plugin .plugin_chart_nav span[data-v-77f374d8]{\n  text-align:center;\n  padding:0 10px;\n  display:inline-block;\n  cursor:pointer;\n  height:30px\n}\n.buybit-chart-plugin .plugin_chart_nav span.active[data-v-77f374d8]{\n  background-color:#292e39;\n  color:#8790a1\n}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 283:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "40ebb29686eca88f80451fbab6fb4045.svg";

/***/ }),

/***/ 284:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "be8a71d645de4ac565b6a014c8be7d49.svg";

/***/ }),

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "21c8718b41fcd05a544b193a25c57bd1.svg";

/***/ }),

/***/ 286:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e285b2d60e4731f41dd7b8275eb41173.svg";

/***/ }),

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4198c87508bed984aa72c49c56573a14.svg";

/***/ }),

/***/ 288:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a2d5580588def96d424839a8a1816067.svg";

/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b82b1a125050f20e04375f906cb74ae1.svg";

/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "7f7e27e7c12222309743702583be1173.svg";

/***/ }),

/***/ 291:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a7b220093620e64d85ba01210501e2a7.svg";

/***/ }),

/***/ 292:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "32bd13d784ad93d1ac4d8e27aa44debe.svg";

/***/ }),

/***/ 293:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5b704bcf14874434cb15ec4b39f84d4e.svg";

/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6cd99eced30a0d84fcbcb30a3f711b54.svg";

/***/ }),

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "917ed719cd506e7e8d87e04774f72b0e.svg";

/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6e2da2d1818ef3d927ee4891353605c8.svg";

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/HashRate/tradeView.vue?vue&type=template&id=77f374d8&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('fullscreen',{ref:"fullscreen",staticClass:"buybit-chart",attrs:{"id":"buybit-chart","fullscreen":_vm.fullscreen},on:{"change":_vm.fullscreenChange,"update:fullscreen":function($event){_vm.fullscreen=$event}}},[(_vm.isOpenState)?_c('section',{staticClass:"isOpenState"},[_c('section',{staticClass:"cl09 tc isOpenStateText"},[_vm._v(_vm._s(_vm.$t('HashRate.pro.tradeView.opanText')))])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"buybit-chart-plugin clearfix flex items-center justify-between"},[_c('div',{staticClass:"flex-1"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeChart==0 || _vm.activeChart==1),expression:"activeChart==0 || activeChart==1"}],staticClass:"plugin_interval"},[_c('span',{staticClass:"plugin_interval_tip",class:{'active':_vm.resolutionInterval==1},on:{"click":function($event){_vm.isLoadingState && _vm.setChartType('STYLE_AREA')}}},[_vm._v(_vm._s(_vm.$t('HashRate.pro.tradeView.area')))]),_vm._v(" "),_c('span',{staticClass:"plugin_interval_tip",class:{'active':_vm.resolutionInterval==2},on:{"click":function($event){_vm.isLoadingState && _vm.setResolution(2)}}},[_vm._v("1"+_vm._s(_vm.$t('HashRate.pro.tradeView.minute')))]),_vm._v(" "),_c('span',{staticClass:"plugin_interval_tip",class:{'active':_vm.resolutionInterval==3},on:{"click":function($event){_vm.isLoadingState && _vm.setResolution(3)}}},[_vm._v("5"+_vm._s(_vm.$t('HashRate.pro.tradeView.minute')))]),_vm._v(" "),_c('span',{staticClass:"plugin_interval_tip",class:{'active':_vm.resolutionInterval==4},on:{"click":function($event){_vm.isLoadingState && _vm.setResolution(4)}}},[_vm._v("15"+_vm._s(_vm.$t('HashRate.pro.tradeView.minute')))]),_vm._v(" "),_c('span',{staticClass:"plugin_interval_tip",class:{'active':_vm.resolutionInterval==5},on:{"click":function($event){_vm.isLoadingState && _vm.setResolution(5)}}},[_vm._v("30"+_vm._s(_vm.$t('HashRate.pro.tradeView.minute')))]),_vm._v(" "),_c('span',{staticClass:"plugin_interval_tip",class:{'active':_vm.resolutionInterval==6},on:{"click":function($event){_vm.isLoadingState && _vm.setResolution(6)}}},[_vm._v("1"+_vm._s(_vm.$t('HashRate.pro.tradeView.hour')))]),_vm._v(" "),_c('span',{staticClass:"plugin_interval_tip",class:{'active':_vm.resolutionInterval==11},on:{"click":function($event){_vm.isLoadingState && _vm.setResolution(11)}}},[_vm._v("4"+_vm._s(_vm.$t('HashRate.pro.tradeView.hour')))]),_vm._v(" "),_c('span',{staticClass:"plugin_interval_tip",class:{'active':_vm.resolutionInterval==7},on:{"click":function($event){_vm.isLoadingState && _vm.setResolution(7)}}},[_vm._v(_vm._s(_vm.$t('HashRate.pro.tradeView.dailyLine')))]),_vm._v(" "),_c('span',{staticClass:"plugin_interval_tip",class:{'active':_vm.resolutionInterval==8},on:{"click":function($event){_vm.isLoadingState && _vm.setResolution(8)}}},[_vm._v(_vm._s(_vm.$t('HashRate.pro.tradeView.weeklyLine')))]),_vm._v(" "),_c('span',{staticClass:"plugin_interval_tip",class:{'active':_vm.resolutionInterval==9},on:{"click":function($event){_vm.isLoadingState && _vm.setResolution(9)}}},[_vm._v(_vm._s(_vm.$t('HashRate.pro.tradeView.lunarLine')))]),_vm._v(" "),_c('el-tooltip',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeChart==1),expression:"activeChart==1"}],attrs:{"content":_vm.$t('HashRate.pro.tradeView.set'),"popper-class":"chart_tooltip","placement":"bottom"}},[_c('span',{staticClass:"plugin_set_button set_button",on:{"click":function($event){return _vm.setOtherWindows('scalesProperties')}}})]),_vm._v(" "),_c('el-tooltip',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeChart==1),expression:"activeChart==1"}],attrs:{"effect":"dark","content":_vm.$t('HashRate.pro.tradeView.index'),"popper-class":"chart_tooltip","placement":"bottom"}},[_c('span',{staticClass:"plugin_set_button index_button",on:{"click":function($event){return _vm.setOtherWindows('insertIndicator')}}})]),_vm._v(" "),_c('span',{staticClass:"plugin_full",on:{"click":_vm.toggleFullScreen}})],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeChart==2),expression:"activeChart==2"}],staticClass:"plugin_interval"},[_c('span',{staticClass:"plugin_interval_tip"},[_vm._v("深度图")])])]),_vm._v(" "),_c('div',{staticClass:"flex items-center justify-end flex-none"},[_c('div',{staticClass:"plugin_interval",on:{"click":function($event){_vm.activeChart = 1}}},[_c('span',{staticClass:"plugin_interval_tip",class:{'active':_vm.activeChart==1}},[_vm._v("TradingView")])]),_vm._v(" "),_c('div',{staticClass:"plugin_interval",on:{"click":function($event){_vm.activeChart = 2}}},[_c('span',{staticClass:"plugin_interval_tip",class:{'active':_vm.activeChart==2}},[_vm._v("Depth")])])])]),_vm._v(" "),_c('div',{staticClass:"chart-content"},[_c('div',{directives:[{name:"buybit-loading",rawName:"v-buybit-loading",value:(_vm.widgetloading),expression:"widgetloading"}],ref:"coinpool-chart-content",staticClass:"coinpool-chart-content buybit-loading",class:{'active':_vm.activeChart==1},attrs:{"id":"coinpool-chart-content"}}),_vm._v(" "),_c('div',{staticClass:"coinpool-chart-content",class:{'active':_vm.activeChart==2}},[_c('buybit-depth-chart',{ref:"depth-chart",attrs:{"bg-color":_vm.background=='day' ? '#FFFFFF' : '#1E222A',"symblefrom":_vm.from,"symbleto":_vm.to,"symble-parame-string":_vm.symbleParameString,"depths-data":_vm.depthsData,"width":_vm.width,"height":_vm.height}})],1)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/HashRate/tradeView.vue?vue&type=template&id=77f374d8&scoped=true&

// EXTERNAL MODULE: external "pako"
var external_pako_ = __webpack_require__(139);

// EXTERNAL MODULE: ./components/HashRate/depth-chart.vue + 4 modules
var depth_chart = __webpack_require__(245);

// EXTERNAL MODULE: ./components/HashRate/js/chart-feed.js
var chart_feed = __webpack_require__(227);

// EXTERNAL MODULE: ./components/HashRate/js/chart-provider.js
var chart_provider = __webpack_require__(146);

// EXTERNAL MODULE: external "moment-timezone"
var external_moment_timezone_ = __webpack_require__(140);
var external_moment_timezone_default = /*#__PURE__*/__webpack_require__.n(external_moment_timezone_);

// EXTERNAL MODULE: ./components/HashRate/js/chart-base.js
var chart_base = __webpack_require__(228);

// EXTERNAL MODULE: ./components/HashRate/datafeeds/socket.js
var socket = __webpack_require__(229);

// EXTERNAL MODULE: ./components/HashRate/datafeeds/datafees.js
var datafees = __webpack_require__(230);

// CONCATENATED MODULE: ./assets/data.js
/* harmony default export */ var data = ({
  'success': true,
  'data': {
    'depths': {
      'asks': [[102.91, 74.18], [102.9, 5.76], [102.89, 79.46], [102.87, 20.58], [102.86, 19.68], [102.85, 82.83], [102.74, 33.85], [102.72, 12.49], [102.46, 35.37], [102.45, 17.61], [102.44, 61.33], [102.43, 57.71], [101.78, 82.9], [101.77, 38.13], [101.75, 45.88], [101.74, 5.73], [101.73, 83.65], [101.72, 57.02], [101.71, 1.22], [101.69, 11.69], [101.68, 35.26], [101.67, 18.13], [101.45, 100], [101.23, 27.93], [101.22, 3.66], [101.2, 43.76], [101.19, 57.76], [101.18, 31.21], [101.17, 4.99]],
      'bids': [[101.16, 49.24], [101.15, 20.91], [100.93, 52.11], [100.92, 35.25], [100.91, 8.47], [100.9, 33.11], [100.89, 51.01], [100.88, 62.17], [100.87, 9.39], [100.85, 31.87], [100.84, 6.68], [100.83, 19.1], [100.51, 53.97], [100.02, 24.01], [99.69, 71.27], [97.85, 73.9], [97.84, 75.75], [97.83, 10.93], [97.55, 84.18], [97.54, 15.71], [97.53, 75.43], [97.51, 12.72], [97.49, 58.5], [97.48, 13.86], [97.46, 86.2], [97.45, 7.13], [97.44, 9.78], [97.43, 5.61]]
    },
    'lines': [[15121452e5, 91.29, 91.29, 91.29, 91.29, 0], [151214526e4, 91.29, 91.29, 91.29, 91.29, 0], [151214532e4, 91.29, 91.29, 91.29, 91.29, 0], [151214538e4, 91.29, 91.31, 91.26, 91.27, 556.97], [151214544e4, 91.27, 91.27, 91.27, 91.27, 0], [15121455e5, 91.27, 91.27, 91.27, 91.27, 0], [151214556e4, 91.27, 91.27, 91.27, 91.27, 0], [151214562e4, 91.62, 91.62, 91.62, 91.62, 320.09], [151214568e4, 91.62, 91.99, 91.62, 91.98, 1059.01], [151214574e4, 91.98, 92.36, 91.97, 92.36, 1273.92], [15121458e5, 92.35, 92.39, 92.35, 92.37, 873.51], [151214586e4, 92.37, 92.37, 92.37, 92.37, 86.54], [151214592e4, 92.37, 92.38, 92.37, 92.38, 670.04], [151214598e4, 92.38, 92.38, 92.34, 92.36, 902.19], [151214604e4, 92.36, 92.37, 92.34, 92.37, 1190.46], [15121461e5, 92.38, 92.44, 92.36, 92.43, 1203.18], [151214616e4, 92.44, 92.78, 92.44, 92.44, 637.48], [151214622e4, 92.44, 94.9, 92.44, 92.77, 805.05], [151214628e4, 92.76, 93.04, 92.63, 92.8, 649], [151214634e4, 92.8, 92.8, 92.44, 92.72, 663.47], [15121464e5, 92.44, 92.46, 92.44, 92.45, 321.34], [151214646e4, 92.45, 92.45, 92.45, 92.45, 0], [151214652e4, 92.45, 92.72, 92.36, 92.72, 362.1], [151214658e4, 92.72, 92.99, 92.57, 92.6, 1150.63], [151214664e4, 92.87, 92.87, 92.47, 92.47, 88.58], [15121467e5, 92.47, 92.47, 92.47, 92.47, 0], [151214676e4, 92.47, 92.47, 92.47, 92.47, 0], [151214682e4, 92.47, 92.47, 92.47, 92.47, 0], [151214688e4, 92.47, 92.47, 92.47, 92.47, 0], [151214694e4, 92.47, 92.47, 92.47, 92.47, 0], [1512147e6, 92.87, 92.87, 92.75, 92.75, 307.01], [151214706e4, 92.75, 92.81, 92.46, 92.46, 731.29], [151214712e4, 92.46, 92.48, 92.46, 92.47, 372.7], [151214718e4, 92.47, 93.03, 92.47, 92.98, 785.36], [151214724e4, 92.98, 92.98, 92.48, 92.95, 1093.14], [15121473e5, 92.95, 92.96, 92.9, 92.91, 1199.99], [151214736e4, 92.91, 92.91, 92.87, 92.87, 1288.41], [151214742e4, 92.87, 92.87, 92.7, 92.7, 1159.76], [151214748e4, 92.7, 92.7, 92.47, 92.68, 227.97], [151214754e4, 92.68, 92.69, 92.45, 92.45, 97.78], [15121476e5, 92.7, 92.82, 92.7, 92.82, 120.86], [151214766e4, 92.82, 92.82, 92.82, 92.82, 0], [151214772e4, 92.34, 92.86, 92.33, 92.84, 957.53], [151214778e4, 92.85, 92.87, 92.83, 92.85, 1152.93], [151214784e4, 92.85, 92.87, 92.79, 92.79, 1152.12], [15121479e5, 92.79, 92.83, 92.79, 92.81, 1110.33], [151214796e4, 92.81, 92.92, 92.8, 92.91, 751.87], [151214802e4, 92.91, 93.03, 92.85, 93.03, 343.18], [151214808e4, 93.03, 93.33, 92.85, 93.08, 1197.49], [151214814e4, 93.08, 93.4, 92.85, 93.03, 989.79], [15121482e5, 93.03, 93.39, 93.03, 93.03, 549.02], [151214826e4, 93.03, 93.05, 92.85, 92.85, 315.72], [151214832e4, 92.85, 92.86, 92, 92.37, 918.88], [151214838e4, 92.36, 92.59, 92.31, 92.58, 850.35], [151214844e4, 92.58, 92.84, 92.49, 92.56, 889.74], [15121485e5, 92.56, 92.83, 92.31, 92.32, 756.28], [151214856e4, 92.32, 92.81, 92.32, 92.32, 671.02], [151214862e4, 92.32, 92.33, 92.32, 92.33, 128.99], [151214868e4, 92.33, 92.8, 92.31, 92.78, 676.9], [151214874e4, 92.78, 92.78, 92.76, 92.76, 904.74], [15121488e5, 92.76, 92.76, 92.76, 92.76, 6.16], [151214886e4, 92.76, 92.77, 92.76, 92.76, 1082.26], [151214892e4, 92.77, 92.83, 92.77, 92.83, 1156.18], [151214898e4, 92.83, 93.04, 92.82, 93.02, 1264.57], [151214904e4, 93.02, 93.02, 92.98, 92.99, 1230.12], [15121491e5, 92.99, 93.36, 92.98, 93, 772.58], [151214916e4, 93, 93.35, 93, 93.01, 434.73], [151214922e4, 93.01, 93.02, 93.01, 93.02, 160.66], [151214928e4, 93.35, 93.37, 93.35, 93.37, 773.19], [151214934e4, 93.37, 93.83, 93.37, 93.75, 1046.69], [15121494e5, 93.8, 93.81, 93.47, 93.81, 470.96], [151214946e4, 93.81, 93.83, 93.48, 93.48, 734.29], [151214952e4, 93.48, 93.49, 93.39, 93.39, 536.46], [151214958e4, 93.4, 93.8, 93.38, 93.77, 584.85], [151214964e4, 93.77, 93.77, 93.77, 93.77, 0], [15121497e5, 93.77, 93.77, 93.77, 93.77, 0], [151214976e4, 93.49, 93.49, 93.02, 93.39, 164.18], [151214982e4, 93.39, 93.77, 93.03, 93.03, 741.76], [151214988e4, 93.03, 93.03, 92.79, 92.79, 758.98], [151214994e4, 92.8, 92.8, 92.75, 92.78, 1271.75], [151215e7, 92.78, 92.79, 92.75, 92.75, 1416.97], [151215006e4, 92.78, 92.8, 92.77, 92.79, 1235.96], [151215012e4, 92.8, 92.85, 92.79, 92.84, 1329.73], [151215018e4, 92.84, 93.41, 92.84, 93.02, 1059.62], [151215024e4, 93.02, 93.02, 93.02, 93.02, 0], [15121503e5, 93.02, 93.02, 93.02, 93.02, 0], [151215036e4, 93.02, 93.02, 92.83, 92.85, 599.43], [151215042e4, 92.84, 92.84, 92.31, 92.33, 726.52], [151215048e4, 92.33, 92.33, 92.01, 92.01, 290.95], [151215054e4, 92.3, 92.34, 92.3, 92.34, 415.04], [15121506e5, 92.34, 92.36, 92.01, 92.36, 363.13], [151215066e4, 92.36, 93, 92.36, 92.86, 853.04], [151215072e4, 92.99, 92.99, 92.01, 92.01, 914.3], [151215078e4, 92.01, 92.4, 92.01, 92.32, 598.09], [151215084e4, 92.32, 92.35, 91.98, 91.98, 956.69], [15121509e5, 91.99, 91.99, 91.94, 91.96, 1222.91], [151215096e4, 91.95, 92.31, 91.95, 92.3, 1236.32], [151215102e4, 92.29, 92.6, 92.25, 92.25, 1145.5], [151215108e4, 92.25, 92.25, 92.21, 92.22, 1335.85], [151215114e4, 92.22, 92.6, 92.21, 92.6, 1364.01], [15121512e5, 92.6, 93.31, 92.6, 93.29, 1097.12], [151215126e4, 93.29, 93.3, 93.26, 93.28, 1254.14], [151215132e4, 93.28, 93.78, 93.27, 93.67, 1279.73], [151215138e4, 93.66, 93.78, 93.59, 93.78, 1203.97], [151215144e4, 93.78, 94.1, 93.62, 93.62, 692.82], [15121515e5, 93.62, 93.75, 93.4, 93.4, 450.88], [151215156e4, 93.4, 93.41, 93.4, 93.4, 350.98], [151215162e4, 93.75, 93.79, 93.72, 93.76, 823.27], [151215168e4, 93.77, 94.06, 93.4, 93.45, 669.79], [151215174e4, 93.45, 93.46, 93.45, 93.45, 223.33], [15121518e5, 93.45, 93.45, 93.45, 93.45, 0], [151215186e4, 93.45, 93.45, 93.42, 93.42, 291.89], [151215192e4, 93.42, 93.42, 93.4, 93.4, 193.8], [151215198e4, 93.4, 93.44, 93.28, 93.3, 673.84], [151215204e4, 93.3, 93.32, 93.3, 93.32, 398.49], [15121521e5, 93.32, 93.33, 93.32, 93.32, 299.72], [151215216e4, 93.32, 93.32, 93.32, 93.32, 0], [151215222e4, 93.32, 93.32, 93.32, 93.32, 0], [151215228e4, 93.32, 93.32, 93.32, 93.32, 0], [151215234e4, 93.78, 94.09, 93.7, 93.76, 335.44], [15121524e5, 93.76, 94.08, 93.32, 93.72, 534.05], [151215246e4, 93.72, 93.72, 93.72, 93.72, 0], [151215252e4, 93.72, 93.72, 93.72, 93.72, 0], [151215258e4, 94.08, 94.09, 94.08, 94.09, 189.04], [151215264e4, 94.09, 94.1, 94.08, 94.09, 1158.91], [15121527e5, 94.09, 94.89, 94.08, 94.47, 748.68], [151215276e4, 94.46, 94.46, 94.45, 94.45, 198.73], [151215282e4, 94.45, 94.45, 94.45, 94.45, 0], [151215288e4, 94.45, 94.45, 94.09, 94.09, 250.5], [151215294e4, 94.09, 94.47, 94.09, 94.45, 880.71], [1512153e6, 94.46, 94.48, 94.45, 94.46, 1230], [151215306e4, 94.47, 94.76, 94.09, 94.38, 1210.15], [151215312e4, 94.39, 94.71, 94.39, 94.4, 697.89], [151215318e4, 94.4, 94.4, 94.4, 94.4, 0], [151215324e4, 94.4, 94.4, 94.4, 94.4, 0], [15121533e5, 94.4, 94.4, 94.4, 94.4, 0], [151215336e4, 94.4, 94.4, 94.4, 94.4, 0], [151215342e4, 94.4, 94.4, 94.4, 94.4, 0], [151215348e4, 94.39, 94.4, 94.09, 94.1, 589.59], [151215354e4, 94.1, 94.37, 93.72, 94.06, 929.45], [15121536e5, 94.06, 94.36, 93.72, 94.03, 910.7], [151215366e4, 93.73, 94.22, 93.73, 93.76, 661.42], [151215372e4, 93.76, 93.76, 93.76, 93.76, 0], [151215378e4, 94.2, 94.2, 94.2, 94.2, 24.08], [151215384e4, 94.21, 94.22, 94.2, 94.2, 1130.58], [15121539e5, 94.21, 94.35, 93.76, 94.07, 778.99], [151215396e4, 94.07, 94.1, 94.07, 94.1, 644.98], [151215402e4, 94.1, 94.1, 94.09, 94.09, 388.79], [151215408e4, 94.09, 94.09, 94.09, 94.09, 0], [151215414e4, 94.09, 94.09, 94.09, 94.09, 0], [15121542e5, 94.09, 94.1, 93.76, 93.77, 735.3], [151215426e4, 93.77, 93.77, 93.73, 93.76, 693.97], [151215432e4, 93.76, 93.76, 93.71, 93.71, 638], [151215438e4, 93.71, 93.72, 93.71, 93.72, 673.49], [151215444e4, 93.72, 93.72, 93.33, 93.72, 620.53], [15121545e5, 93.73, 94.09, 93.7, 94.07, 691.31], [151215456e4, 94.07, 94.07, 94.07, 94.07, 0], [151215462e4, 93.7, 94.07, 93.33, 93.68, 414.35], [151215468e4, 93.68, 94.05, 93.34, 93.69, 1129.27], [151215474e4, 93.68, 93.7, 93.68, 93.69, 1332.49], [15121548e5, 93.69, 94.33, 93.68, 94.31, 1055.48], [151215486e4, 94.31, 94.33, 94.31, 94.32, 1296.18], [151215492e4, 94.33, 94.69, 94.32, 94.68, 1149.19], [151215498e4, 94.68, 94.68, 94.32, 94.36, 1274.17], [151215504e4, 94.36, 94.66, 94.36, 94.65, 754.61], [15121551e5, 94.65, 94.65, 94.65, 94.65, 0], [151215516e4, 94.65, 94.65, 94.65, 94.65, 0], [151215522e4, 94.65, 94.66, 94.65, 94.65, 557.57], [151215528e4, 94.65, 94.74, 94.65, 94.72, 1336.43], [151215534e4, 94.72, 95.23, 94.7, 94.91, 1032.08], [15121554e5, 94.91, 94.91, 94.66, 94.68, 606.44], [151215546e4, 94.68, 95.22, 94.68, 95.02, 933.76], [151215552e4, 95.01, 95.23, 95.01, 95.21, 1237], [151215558e4, 95.21, 96.94, 95.21, 95.23, 847.82], [151215564e4, 95.23, 95.23, 95.02, 95.02, 513.85], [15121557e5, 95.02, 95.23, 94.72, 95.23, 1002.64], [151215576e4, 95.22, 95.64, 95.21, 95.21, 751.63], [151215582e4, 95.21, 95.21, 95.21, 95.21, 294.94], [151215588e4, 95.21, 95.21, 95.21, 95.21, 80.2], [151215594e4, 95.21, 95.21, 95.21, 95.21, 0], [1512156e6, 95.21, 95.44, 95.12, 95.39, 443.04], [151215606e4, 95.39, 95.4, 95.12, 95.13, 512.25], [151215612e4, 95.14, 95.17, 95.14, 95.17, 515.14], [151215618e4, 95.44, 95.64, 95.44, 95.63, 146.28], [151215624e4, 95.63, 95.63, 95.62, 95.62, 115.12], [15121563e5, 95.62, 95.62, 95.62, 95.62, 11.9], [151215636e4, 95.62, 95.92, 95.17, 95.87, 1048.93], [151215642e4, 95.87, 96.68, 95.86, 96.16, 1086.68], [151215648e4, 95.92, 96.15, 95.92, 95.92, 306.82], [151215654e4, 95.92, 95.92, 95.92, 95.92, 0], [15121566e5, 96.15, 96.93, 96.15, 96.23, 1107.08], [151215666e4, 95.94, 96.44, 95.94, 95.97, 719.04], [151215672e4, 95.95, 95.98, 95.95, 95.98, 418.21], [151215678e4, 96.44, 96.93, 95.98, 95.99, 259.73], [151215684e4, 96.46, 96.46, 96.45, 96.46, 198.13], [15121569e5, 96.45, 96.75, 95.99, 96.38, 466.79], [151215696e4, 96.38, 96.38, 96.38, 96.38, 0], [151215702e4, 96.74, 96.74, 96.74, 96.74, 129.48], [151215708e4, 96.75, 96.92, 96.66, 96.67, 660.86], [151215714e4, 96.67, 96.94, 96.67, 96.94, 746.68], [15121572e5, 96.93, 97.12, 96.77, 97.11, 865.83], [151215726e4, 96.79, 97.11, 96.79, 97.11, 368.74], [151215732e4, 97.11, 97.12, 96.8, 97.08, 724.55], [151215738e4, 97.08, 97.08, 96.8, 96.99, 806.07], [151215744e4, 96.8, 97.29, 96.8, 97.29, 652.29], [15121575e5, 97.29, 97.29, 97.29, 97.29, 0], [151215756e4, 97.29, 97.29, 97.29, 97.29, 17.54], [151215762e4, 97.29, 97.59, 97.19, 97.5, 836.62], [151215768e4, 97.49, 97.49, 97.47, 97.47, 1006.49], [151215774e4, 97.26, 97.49, 97.2, 97.2, 843.04], [15121578e5, 97.48, 97.49, 97.44, 97.44, 1079.04], [151215786e4, 97.48, 97.48, 96.66, 96.81, 956.86], [151215792e4, 96.81, 97.18, 96.81, 96.81, 642.35], [151215798e4, 96.82, 97.16, 96.82, 96.83, 780.1], [151215804e4, 96.83, 96.83, 96.66, 96.8, 879.24], [15121581e5, 96.8, 96.81, 96.37, 96.37, 691.39], [151215816e4, 96.37, 96.82, 96, 96.81, 674.65], [151215822e4, 96.81, 96.81, 96.79, 96.8, 645.26], [151215828e4, 96.79, 96.87, 96.42, 96.43, 1096.93], [151215834e4, 96.43, 96.85, 96.43, 96.78, 240.45], [15121584e5, 96.78, 97.14, 96.43, 97.13, 1056.29], [151215846e4, 97.13, 97.13, 97.09, 97.09, 704.67], [151215852e4, 97.09, 97.09, 97.09, 97.09, 58.42], [151215858e4, 97.09, 97.09, 97.09, 97.09, 0], [151215864e4, 97.09, 97.11, 97.08, 97.1, 757.11], [15121587e5, 97.1, 97.45, 97.08, 97.45, 1189.31], [151215876e4, 97.45, 97.45, 97.11, 97.16, 436.78], [151215882e4, 97.44, 97.44, 97.15, 97.43, 245.22], [151215888e4, 97.43, 97.43, 97.43, 97.43, 0], [151215894e4, 97.43, 97.43, 97.43, 97.43, 0], [1512159e6, 97.43, 97.43, 97.43, 97.43, 0], [151215906e4, 97.43, 97.43, 97.43, 97.43, 0], [151215912e4, 97.43, 97.43, 97.43, 97.43, 0], [151215918e4, 97.43, 97.45, 97.43, 97.43, 334.74], [151215924e4, 97.43, 97.44, 97.42, 97.43, 764.67], [15121593e5, 97.44, 97.49, 97.44, 97.48, 954.65], [151215936e4, 97.48, 97.49, 97.47, 97.47, 730.37], [151215942e4, 97.47, 97.47, 97.44, 97.44, 513.88], [151215948e4, 97.44, 97.49, 97.43, 97.49, 1136.26], [151215954e4, 97.49, 97.51, 97.47, 97.5, 1143.34], [15121596e5, 97.5, 99.56, 97.5, 97.9, 1200.47], [151215966e4, 97.9, 98.76, 97.57, 98.07, 1117.46], [151215972e4, 98.06, 98.06, 98.04, 98.06, 1100.69], [151215978e4, 98.05, 98.05, 97.81, 97.83, 690.21], [151215984e4, 97.83, 98.06, 97.83, 97.83, 581.29], [15121599e5, 97.83, 97.83, 97.58, 97.58, 591.86], [151215996e4, 97.58, 98.07, 97.58, 98.07, 680.41], [151216002e4, 98.07, 98.09, 97.59, 97.6, 665.31], [151216008e4, 97.6, 97.62, 97.6, 97.62, 258.14], [151216014e4, 98.09, 98.09, 98.09, 98.09, 22.62], [15121602e5, 98.13, 98.17, 97.62, 97.89, 944.06], [151216026e4, 97.89, 98.06, 97.62, 97.63, 296.39], [151216032e4, 98.06, 98.36, 98.06, 98.36, 236.16], [151216038e4, 98.13, 98.46, 97.63, 98.45, 688.58], [151216044e4, 98.06, 98.44, 98.06, 98.43, 697.36], [15121605e5, 98.06, 98.07, 97.63, 97.63, 495.32], [151216056e4, 97.62, 97.62, 97.5, 97.5, 351.59], [151216062e4, 97.47, 97.47, 96.45, 96.69, 1201.34], [151216068e4, 96.69, 97.47, 96.68, 97.46, 1010.25], [151216074e4, 97.46, 97.5, 97.45, 97.46, 879.56], [15121608e5, 97.46, 98, 97.45, 97.76, 1077.91], [151216086e4, 98.05, 98.35, 97.76, 98, 766.38], [151216092e4, 98, 98.3, 98, 98.03, 709.42], [151216098e4, 98.03, 98.03, 97.76, 97.76, 728.8], [151216104e4, 98.02, 98.02, 97.75, 97.77, 603.12], [15121611e5, 97.77, 97.82, 97.2, 97.21, 1078.69], [151216116e4, 97.21, 97.8, 97.21, 97.53, 1009.5], [151216122e4, 97.53, 97.81, 97.24, 97.53, 1015.62], [151216128e4, 97.53, 97.8, 97.25, 97.78, 1045.35], [151216134e4, 97.78, 97.78, 97.49, 97.76, 1200.18], [15121614e5, 97.76, 97.76, 97.24, 97.24, 693.4], [151216146e4, 97.24, 97.72, 97.19, 97.71, 482.07], [151216152e4, 97.71, 97.74, 97.24, 97.74, 1171.24], [151216158e4, 97.74, 97.75, 97.25, 97.73, 1035.33], [151216164e4, 97.73, 97.73, 97.73, 97.73, 154.18], [15121617e5, 97.73, 97.73, 97.73, 97.73, 0], [151216176e4, 97.73, 97.73, 97.73, 97.73, 0], [151216182e4, 97.73, 97.74, 97.73, 97.74, 186.67], [151216188e4, 97.74, 97.78, 97.73, 97.77, 1190.58], [151216194e4, 97.77, 97.82, 97.77, 97.82, 525.02], [1512162e6, 97.82, 98.28, 97.82, 97.82, 764.97], [151216206e4, 98.27, 98.27, 97.82, 97.82, 743.54], [151216212e4, 97.82, 98.27, 97.82, 98.27, 272.92], [151216218e4, 98.27, 98.3, 98.26, 98.29, 991.54], [151216224e4, 98.29, 98.29, 98.29, 98.29, 130.06], [15121623e5, 98.29, 98.29, 98.29, 98.29, 0], [151216236e4, 98.29, 98.29, 98.29, 98.29, 0], [151216242e4, 98.29, 98.29, 98.29, 98.29, 0], [151216248e4, 98.29, 98.29, 98.29, 98.29, 0], [151216254e4, 98.3, 98.3, 98.3, 98.3, 17.49], [15121626e5, 98.3, 98.43, 98.12, 98.41, 770.51], [151216266e4, 98.4, 98.4, 98.39, 98.4, 916.15], [151216272e4, 98.4, 98.4, 98.13, 98.13, 838.57], [151216278e4, 98.13, 98.16, 98.13, 98.16, 566.35], [151216284e4, 98.16, 98.16, 98.15, 98.15, 172.74], [15121629e5, 98.15, 98.16, 98.1, 98.1, 930.69], [151216296e4, 98.09, 98.1, 98.08, 98.1, 1101.33], [151216302e4, 98.1, 98.1, 98.07, 98.07, 845.28], [151216308e4, 98.07, 98.07, 97.75, 97.8, 859.99], [151216314e4, 97.81, 98.05, 97.81, 98.04, 756.66], [15121632e5, 98.04, 98.1, 98.04, 98.1, 1251.85], [151216326e4, 98.11, 98.8, 98.1, 98.8, 1091.73], [151216332e4, 98.8, 99.04, 98.72, 98.73, 443.11], [151216338e4, 98.73, 98.73, 98.72, 98.72, 276.16], [151216344e4, 98.72, 98.72, 98.72, 98.72, 302.39], [15121635e5, 98.72, 99.03, 98.72, 99.03, 388.44], [151216356e4, 99.03, 99.03, 99.01, 99.01, 212.37], [151216362e4, 99.01, 100.58, 99.01, 99.34, 693.57], [151216368e4, 99.33, 99.33, 99.04, 99.04, 161.2], [151216374e4, 99.04, 99.04, 99.04, 99.04, 0], [15121638e5, 99.04, 99.04, 99.04, 99.04, 0], [151216386e4, 99.04, 99.04, 99.04, 99.04, 0], [151216392e4, 99.34, 99.64, 99.32, 99.62, 790], [151216398e4, 99.62, 99.62, 99.33, 99.34, 545.97], [151216404e4, 99.34, 99.37, 99.34, 99.37, 445.91], [15121641e5, 99.37, 99.92, 99.37, 99.92, 582.6], [151216416e4, 99.92, 99.92, 99.65, 99.66, 434.93], [151216422e4, 99.66, 99.68, 99.6, 99.6, 680.91], [151216428e4, 99.61, 99.9, 99.6, 99.85, 931.14], [151216434e4, 99.85, 99.85, 99.62, 99.62, 826.16], [15121644e5, 99.62, 99.63, 99.38, 99.39, 508], [151216446e4, 99.39, 99.83, 99.39, 99.81, 656.64], [151216452e4, 99.81, 99.81, 99.79, 99.79, 265.03], [151216458e4, 99.79, 99.79, 99.79, 99.79, 0], [151216464e4, 99.39, 99.39, 99.04, 99.34, 525.52], [15121647e5, 99.54, 99.54, 98.46, 98.46, 1060.24], [151216476e4, 98.41, 98.71, 98.16, 98.43, 974.08], [151216482e4, 98.16, 98.42, 98.16, 98.42, 968.61], [151216488e4, 98.4, 98.69, 98.19, 98.21, 759], [151216494e4, 98.22, 98.23, 98.22, 98.23, 194.21], [1512165e6, 98.68, 98.98, 98.23, 98.23, 518.5], [151216506e4, 98.23, 98.99, 98.23, 98.65, 1205.07], [151216512e4, 98.68, 99.27, 98.68, 99, 663.96], [151216518e4, 99.26, 99.53, 99, 99.48, 1220.01], [151216524e4, 99.21, 99.23, 99.21, 99.23, 368.79], [15121653e5, 99.23, 99.24, 98.95, 98.95, 642.91], [151216536e4, 98.95, 98.96, 98.56, 98.56, 1006.86], [151216542e4, 98.56, 98.61, 98.25, 98.25, 551.14], [151216548e4, 98.61, 99.21, 98.61, 98.97, 439.32], [151216554e4, 98.97, 99.47, 98.97, 99.47, 1056.59], [15121656e5, 99.47, 99.47, 98.62, 98.62, 825.91], [151216566e4, 98.61, 98.97, 98.25, 98.5, 826.52], [151216572e4, 98.54, 98.9, 98.54, 98.6, 793.27], [151216578e4, 98.6, 98.6, 98.5, 98.52, 379.18], [151216584e4, 98.52, 98.55, 98.25, 98.25, 454.07], [15121659e5, 98.24, 98.24, 98.22, 98.24, 286.72], [151216596e4, 98.23, 98.23, 98.15, 98.17, 956.77], [151216602e4, 98.15, 98.22, 98.11, 98.22, 1015.36], [151216608e4, 98.22, 98.58, 98.22, 98.22, 848.65], [151216614e4, 98.58, 98.58, 98.22, 98.56, 803.67], [15121662e5, 98.56, 98.56, 98.25, 98.27, 613.6], [151216626e4, 98.27, 98.27, 98.27, 98.27, 49.88], [151216632e4, 98.56, 98.86, 98.56, 98.59, 457.32], [151216638e4, 98.89, 98.89, 98.59, 98.89, 776.2], [151216644e4, 98.89, 98.97, 98.59, 98.6, 783.8], [15121665e5, 98.6, 98.62, 98.6, 98.62, 521.66], [151216656e4, 98.62, 98.65, 98.62, 98.65, 554.62], [151216662e4, 98.66, 99.22, 98.66, 99.22, 594.61], [151216668e4, 99.22, 99.47, 98.97, 99.18, 1244.79], [151216674e4, 99.18, 99.47, 99.18, 99.46, 871.29], [15121668e5, 99.46, 99.46, 99.42, 99.44, 918.33], [151216686e4, 99.44, 99.46, 99.43, 99.45, 1244.57], [151216692e4, 99.45, 99.47, 99.44, 99.46, 1251.87], [151216698e4, 99.48, 99.79, 99.48, 99.79, 654.73], [151216704e4, 99.79, 99.84, 99.79, 99.84, 695.13], [15121671e5, 99.84, 99.84, 98.97, 98.97, 714.72], [151216716e4, 99.21, 99.54, 98.92, 98.98, 950.44], [151216722e4, 98.98, 98.98, 98.61, 98.61, 760.47], [151216728e4, 98.6, 98.97, 98.59, 98.67, 827.74], [151216734e4, 98.67, 98.67, 98.24, 98.57, 972.26], [15121674e5, 98.28, 98.28, 98.21, 98.22, 481.87], [151216746e4, 98.22, 98.22, 97.26, 97.26, 1054.6], [151216752e4, 97.26, 97.74, 96.72, 97.21, 1048.73], [151216758e4, 97.21, 97.23, 96.72, 97.23, 950.68], [151216764e4, 97.24, 98.25, 97.24, 98.25, 1107.62], [15121677e5, 98.25, 98.26, 98.11, 98.12, 961.18], [151216776e4, 98.11, 98.14, 97.75, 98.11, 711.1], [151216782e4, 98.26, 98.27, 98.26, 98.27, 147.43], [151216788e4, 98.12, 98.58, 98.12, 98.52, 705.76], [151216794e4, 98.52, 98.52, 98.51, 98.51, 219.66], [1512168e6, 98.51, 98.51, 98.51, 98.51, 0], [151216806e4, 98.51, 98.51, 98.51, 98.51, 0], [151216812e4, 98.12, 98.12, 97.82, 97.82, 166.81], [151216818e4, 97.82, 98.26, 97.76, 97.77, 1095.59], [151216824e4, 97.77, 97.77, 97.77, 97.77, 900], [15121683e5, 97.77, 97.77, 97.77, 97.77, 900], [151216836e4, 97.77, 97.77, 97.77, 97.77, 1220.58], [151216842e4, 97.77, 97.77, 97.26, 97.27, 1060.42], [151216848e4, 97.27, 97.28, 97.24, 97.24, 1151.53], [151216854e4, 97.24, 97.24, 96, 96.02, 1314.44], [15121686e5, 96.42, 96.45, 96.42, 96.45, 222.89], [151216866e4, 96.46, 97.2, 96.46, 97.2, 808.66], [151216872e4, 97.21, 97.73, 96.97, 97.37, 1237.41], [151216878e4, 97.38, 97.98, 97.38, 97.65, 1035.33], [151216884e4, 97.64, 97.64, 97.61, 97.63, 1224.05], [15121689e5, 97.63, 97.68, 97.62, 97.65, 1319.92], [151216896e4, 97.65, 97.97, 97.46, 97.66, 1255.56], [151216902e4, 97.95, 98.51, 97.95, 98.23, 1145.43], [151216908e4, 98.23, 98.23, 97.91, 97.91, 1043.79], [151216914e4, 97.91, 98.21, 97.88, 97.88, 882.6], [15121692e5, 97.88, 97.88, 97.39, 97.39, 755.47], [151216926e4, 97.39, 97.39, 97.39, 97.39, 1008.13], [151216932e4, 97.39, 97.39, 97.39, 97.39, 864.11], [151216938e4, 97.39, 97.39, 97.39, 97.39, 860.97], [151216944e4, 97.39, 97.39, 97.39, 97.39, 1117.34], [15121695e5, 97.39, 97.85, 97.39, 97.84, 850.06], [151216956e4, 97.84, 97.85, 97.39, 97.85, 754.48], [151216962e4, 97.84, 97.84, 97.37, 97.41, 1104.49], [151216968e4, 97.41, 97.82, 97, 97.55, 1038.22], [151216974e4, 97.55, 97.55, 97.55, 97.55, 35.82], [15121698e5, 97.55, 97.55, 97.52, 97.52, 607.47], [151216986e4, 97.51, 97.51, 97.5, 97.5, 470.96], [151216992e4, 97.5, 97.5, 97.5, 97.5, 66.24], [151216998e4, 97.5, 97.5, 97.5, 97.5, 0], [151217004e4, 97.5, 97.5, 97.5, 97.5, 0], [15121701e5, 97.5, 97.5, 97.5, 97.5, 0], [151217016e4, 97.25, 97.25, 97.25, 97.25, 7.59], [151217022e4, 97.25, 97.5, 97, 97, 900.44], [151217028e4, 96.99, 97, 96.71, 96.76, 780.68], [151217034e4, 96.76, 96.81, 96.75, 96.81, 725.65], [15121704e5, 96.81, 96.82, 96.75, 96.82, 1233.7], [151217046e4, 96.82, 96.86, 96.7, 96.7, 1252.76], [151217052e4, 96.7, 96.77, 96.48, 96.77, 824.14], [151217058e4, 96.77, 96.79, 96.49, 96.5, 901.41], [151217064e4, 96.5, 96.51, 96.46, 96.48, 1003.17], [15121707e5, 96.48, 96.84, 96.48, 96.84, 749.81], [151217076e4, 96.86, 97.5, 96.86, 97.23, 778.23], [151217082e4, 97.2, 97.24, 96.8, 97.15, 965.03], [151217088e4, 97.14, 97.44, 97.09, 97.13, 1216.59], [151217094e4, 97.13, 97.42, 96.81, 97.11, 1017.81], [1512171e6, 97.11, 97.4, 97.03, 97.11, 1345.66], [151217106e4, 97.11, 97.55, 96.81, 97.55, 1072.35], [151217112e4, 97.54, 97.56, 96.89, 97.22, 981.86], [151217118e4, 97.22, 97.23, 96.46, 96.5, 1065.07], [151217124e4, 96.5, 96.51, 95.17, 95.17, 1034.9], [15121713e5, 95.16, 95.95, 95.06, 95.95, 940.65], [151217136e4, 95.96, 96.78, 95.95, 96.78, 932.17], [151217142e4, 96.78, 97.13, 96.51, 96.65, 1021.65], [151217148e4, 96.66, 97.22, 96.66, 97.21, 728.27], [151217154e4, 97.19, 97.23, 96.69, 96.96, 1008.37], [15121716e5, 96.97, 97.01, 96.97, 97, 776.94], [151217166e4, 96.99, 97.03, 96.99, 97.03, 649.74], [151217172e4, 97.03, 97.05, 97.02, 97.05, 818.07], [151217178e4, 97.05, 97.08, 97.04, 97.04, 840.8], [151217184e4, 97.04, 97.05, 96.96, 96.98, 1184.32], [15121719e5, 96.98, 97.11, 96.97, 97.08, 1051.4], [151217196e4, 97.08, 97.11, 97.08, 97.11, 774.09], [151217202e4, 97.11, 97.24, 97.08, 97.16, 913.56], [151217208e4, 97.16, 97.84, 97.16, 97.84, 418.83], [151217214e4, 97.84, 97.85, 97.51, 97.84, 800.89], [15121722e5, 97.84, 98.21, 97.84, 97.9, 1208.28], [151217226e4, 97.9, 98.19, 97.84, 98.19, 1195.29], [151217232e4, 98.19, 98.19, 97.52, 97.52, 850.44], [151217238e4, 97.51, 97.88, 97.51, 97.88, 948.76], [151217244e4, 97.88, 98.22, 97.88, 98.2, 1351.38], [15121725e5, 98.2, 98.23, 97.86, 97.91, 1103.53], [151217256e4, 98.14, 98.14, 97.63, 98.12, 1091.15], [151217262e4, 97.63, 97.63, 97.5, 97.5, 534.84], [151217268e4, 97.5, 98.11, 97.5, 97.82, 1196.79], [151217274e4, 97.83, 98.11, 97.53, 97.8, 1007.76], [15121728e5, 97.8, 98.1, 97.54, 98.03, 1170.43], [151217286e4, 98.03, 98.03, 97.55, 98.01, 445.41], [151217292e4, 98.01, 98.01, 98.01, 98.01, 0], [151217298e4, 98.01, 98.01, 98.01, 98.01, 0], [151217304e4, 98.01, 98.01, 98.01, 98.01, 0], [15121731e5, 97.55, 97.55, 97.55, 97.55, 12.38], [151217316e4, 98.02, 98.02, 98.02, 98.02, 24.53], [151217322e4, 98.02, 98.02, 97.53, 97.54, 951.36], [151217328e4, 97.54, 97.54, 97.54, 97.54, 30.66], [151217334e4, 97.54, 97.54, 97.54, 97.54, 0], [15121734e5, 97.54, 97.54, 97.54, 97.54, 0], [151217346e4, 97.54, 97.54, 97.54, 97.54, 0], [151217352e4, 97.54, 97.54, 97.54, 97.54, 0], [151217358e4, 97.54, 97.54, 97.54, 97.54, 0], [151217364e4, 98.01, 98.11, 97.78, 98.11, 925.31], [15121737e5, 98.1, 98.55, 98.1, 98.54, 1308.27], [151217376e4, 98.55, 99.18, 98.55, 98.93, 1016.29], [151217382e4, 98.93, 99.2, 98.93, 99.2, 1090.54], [151217388e4, 99.23, 99.49, 99.23, 99.25, 554.63], [151217394e4, 99.25, 99.25, 99.21, 99.21, 583.4], [1512174e6, 99.21, 99.23, 98.94, 98.95, 973.9], [151217406e4, 99.21, 99.21, 98.95, 98.95, 543.1], [151217412e4, 99.21, 99.21, 99.18, 99.18, 764.82], [151217418e4, 99.19, 99.47, 99.18, 99.45, 1091.54], [151217424e4, 99.44, 99.44, 98.96, 99.41, 927.92], [15121743e5, 99.4, 99.4, 99.4, 99.4, 89.62], [151217436e4, 99.4, 99.4, 99.4, 99.4, 0], [151217442e4, 98.96, 98.96, 98.87, 98.87, 195.18], [151217448e4, 98.87, 98.99, 98.59, 98.97, 830.9], [151217454e4, 98.98, 99.39, 98.94, 98.98, 1139.2], [15121746e5, 98.97, 99.38, 98.94, 98.95, 655.64], [151217466e4, 98.95, 99.38, 98.94, 98.94, 372.36], [151217472e4, 98.94, 98.94, 98.89, 98.9, 801.71], [151217478e4, 98.9, 98.93, 98.9, 98.93, 1268.4], [151217484e4, 98.93, 99.23, 98.93, 98.93, 183.19], [15121749e5, 98.93, 98.93, 98.93, 98.93, 0], [151217496e4, 98.9, 98.9, 98.9, 98.9, 13.87], [151217502e4, 98.89, 99.22, 98.58, 98.62, 933.72], [151217508e4, 98.62, 98.62, 98.23, 98.23, 1122.38], [151217514e4, 98.24, 98.27, 98.24, 98.27, 495.53], [15121752e5, 98.27, 98.27, 98.24, 98.24, 465.54], [151217526e4, 98.24, 98.3, 98.23, 98.3, 972.43], [151217532e4, 98.3, 98.3, 98.28, 98.29, 325.73], [151217538e4, 98.62, 98.62, 98.62, 98.62, 16.2], [151217544e4, 98.59, 98.8, 98.3, 98.8, 1111.86], [15121755e5, 98.8, 98.89, 98.3, 98.6, 1095.75], [151217556e4, 98.6, 98.89, 98.31, 98.61, 1150.85], [151217562e4, 98.62, 99.22, 98.62, 99.22, 1252.65], [151217568e4, 98.72, 99.22, 98.71, 98.89, 1206.68], [151217574e4, 98.88, 98.88, 98.85, 98.86, 774.08], [15121758e5, 98.86, 98.86, 98.86, 98.86, 0], [151217586e4, 98.86, 98.86, 98.86, 98.86, 0], [151217592e4, 98.64, 98.64, 98.31, 98.6, 1199.85], [151217598e4, 98.31, 98.86, 98.31, 98.59, 1266.13], [151217604e4, 98.58, 98.58, 98.31, 98.31, 203.02], [15121761e5, 98.3, 98.3, 98.3, 98.3, 27.67], [151217616e4, 98.3, 98.3, 98.28, 98.3, 790.43], [151217622e4, 98.3, 98.3, 98.3, 98.3, 0], [151217628e4, 98.3, 98.3, 98.3, 98.3, 0], [151217634e4, 98.3, 98.3, 98.3, 98.3, 23.05], [15121764e5, 98.3, 98.3, 98.03, 98.03, 1159.38], [151217646e4, 97.79, 98.02, 97.79, 98.02, 810.65], [151217652e4, 98.02, 98.57, 98.01, 98.56, 1065.3], [151217658e4, 98.57, 98.57, 98.52, 98.52, 1224.25], [151217664e4, 98.54, 98.55, 98.48, 98.49, 1155.48], [15121767e5, 98.49, 98.58, 98.48, 98.58, 1043.19], [151217676e4, 98.58, 98.86, 98.52, 98.53, 1040.1], [151217682e4, 98.53, 98.59, 98.3, 98.58, 1095.2], [151217688e4, 98.59, 98.9, 98.59, 98.9, 1052.11], [151217694e4, 98.9, 98.9, 98.86, 98.9, 1216.74], [1512177e6, 98.89, 99.21, 98.87, 99.21, 852], [151217706e4, 99.21, 99.21, 99.21, 99.21, 0], [151217712e4, 98.88, 98.88, 98.86, 98.86, 180.88], [151217718e4, 98.85, 99.21, 98.85, 98.9, 1094.41], [151217724e4, 98.91, 99.43, 98.89, 99.42, 1245.53], [15121773e5, 99.42, 99.48, 99.41, 99.47, 1274.33], [151217736e4, 99.47, 99.83, 99.47, 99.49, 646.39], [151217742e4, 99.49, 99.83, 99.49, 99.82, 325.37], [151217748e4, 99.82, 99.82, 99.82, 99.82, 0], [151217754e4, 99.82, 99.82, 99.82, 99.82, 28.63], [15121776e5, 99.82, 99.84, 99.79, 99.81, 1250.59], [151217766e4, 99.81, 99.88, 99.81, 99.84, 379.55], [151217772e4, 99.84, 100.26, 99.84, 99.91, 221.59], [151217778e4, 99.91, 99.91, 99.81, 99.81, 186.87], [151217784e4, 99.79, 99.81, 99.5, 99.5, 156.33], [15121779e5, 99.5, 99.5, 99.5, 99.5, 105.26], [151217796e4, 99.5, 99.51, 99.5, 99.51, 102.71], [151217802e4, 99.51, 99.53, 99.51, 99.52, 134.83], [151217808e4, 99.52, 99.53, 99.52, 99.53, 267.66], [151217814e4, 99.53, 99.54, 99.52, 99.54, 302.16], [15121782e5, 99.54, 99.55, 99.54, 99.55, 169.24], [151217826e4, 99.55, 99.55, 99.55, 99.55, 13.52], [151217832e4, 99.55, 99.55, 99.55, 99.55, 0], [151217838e4, 99.55, 99.55, 99.55, 99.55, 0], [151217844e4, 99.9, 99.91, 99.9, 99.91, 24.84], [15121785e5, 99.91, 99.91, 99.91, 99.91, 0], [151217856e4, 99.91, 99.91, 99.91, 99.91, 0], [151217862e4, 99.91, 99.91, 99.91, 99.91, 0], [151217868e4, 99.91, 99.91, 99.91, 99.91, 0], [151217874e4, 99.91, 99.91, 99.91, 99.91, 0], [15121788e5, 99.91, 99.91, 99.91, 99.91, 0], [151217886e4, 99.91, 99.91, 99.91, 99.91, 0], [151217892e4, 99.91, 99.91, 99.91, 99.91, 0], [151217898e4, 99.91, 99.91, 99.91, 99.91, 0], [151217904e4, 99.91, 99.91, 99.91, 99.91, 0], [15121791e5, 99.91, 99.91, 99.91, 99.91, 0], [151217916e4, 99.91, 99.91, 99.91, 99.91, 0], [151217922e4, 99.91, 99.91, 99.91, 99.91, 0], [151217928e4, 99.91, 99.91, 99.91, 99.91, 0], [151217934e4, 99.91, 99.91, 99.91, 99.91, 0], [15121794e5, 99.91, 99.91, 99.91, 99.91, 0], [151217946e4, 99.91, 99.91, 99.91, 99.91, 0], [151217952e4, 99.55, 99.55, 99.54, 99.54, 50.95], [151217958e4, 99.53, 99.53, 99.37, 99.37, 631.16], [151217964e4, 99.37, 99.39, 99.24, 99.24, 358.3], [15121797e5, 99.24, 99.52, 99.24, 99.52, 285.58], [151217976e4, 99.52, 99.8, 99.32, 99.69, 816.18], [151217982e4, 99.69, 99.79, 99.34, 99.34, 536.15], [151217988e4, 99.34, 99.77, 99.34, 99.76, 403.39], [151217994e4, 99.76, 99.76, 99.76, 99.76, 14.12], [151218e7, 99.76, 99.76, 99.76, 99.76, 0], [151218006e4, 99.34, 99.5, 98.91, 98.91, 326.58], [151218012e4, 98.91, 99.49, 98.9, 98.91, 918.38], [151218018e4, 98.91, 98.92, 98.9, 98.92, 503.72], [151218024e4, 98.6, 98.61, 98.6, 98.61, 438.36], [15121803e5, 98.61, 99.19, 98.61, 98.87, 710.44], [151218036e4, 98.86, 98.86, 98.63, 98.64, 671.57], [151218042e4, 98.64, 98.83, 98.62, 98.63, 863.06], [151218048e4, 98.62, 98.64, 98.3, 98.58, 912.13], [151218054e4, 98.3, 98.58, 98.14, 98.56, 886.5], [15121806e5, 98.56, 98.56, 98.15, 98.56, 416], [151218066e4, 98.56, 98.56, 98.56, 98.56, 0], [151218072e4, 98.56, 98.56, 98.56, 98.56, 0], [151218078e4, 98.56, 98.56, 98.56, 98.56, 0], [151218084e4, 98.56, 98.57, 98.56, 98.56, 664.14], [15121809e5, 98.56, 98.85, 98.56, 98.85, 721.91], [151218096e4, 98.6, 98.85, 98.17, 98.5, 301.11], [151218102e4, 98.17, 98.87, 98.17, 98.87, 1333.61], [151218108e4, 98.91, 98.91, 98.49, 98.9, 976.15], [151218114e4, 98.9, 98.9, 98.53, 98.53, 544.16], [15121812e5, 98.53, 98.53, 98.53, 98.53, 0], [151218126e4, 98.53, 98.53, 98.53, 98.53, 0], [151218132e4, 98.53, 98.53, 98.53, 98.53, 0], [151218138e4, 98.9, 98.9, 98.9, 98.9, 50.55], [151218144e4, 98.9, 98.9, 98.9, 98.9, 0], [15121815e5, 98.53, 98.84, 98.52, 98.55, 456.96], [151218156e4, 98.55, 99.2, 98.55, 99.17, 596.24], [151218162e4, 99.17, 99.17, 98.86, 99.04, 922.02], [151218168e4, 99.04, 99.13, 98.87, 98.87, 822.52], [151218174e4, 98.87, 98.88, 98.86, 98.86, 482.21], [15121818e5, 98.86, 98.87, 98.72, 98.84, 1175.1], [151218186e4, 99.12, 99.12, 99.07, 99.07, 567.37], [151218192e4, 99.06, 99.07, 99.05, 99.05, 345.59], [151218198e4, 99.05, 99.07, 98.78, 98.84, 1212.29], [151218204e4, 98.84, 99.05, 98.84, 98.87, 502.37], [15121821e5, 98.87, 98.88, 98.87, 98.87, 720.76], [151218216e4, 98.87, 98.88, 98.87, 98.87, 731.79], [151218222e4, 98.87, 98.88, 98.86, 98.86, 744.22], [151218228e4, 98.85, 99.1, 98.84, 98.86, 1017.24], [151218234e4, 98.85, 99.13, 98.73, 98.74, 597.12], [15121824e5, 98.74, 99.17, 98.74, 99.16, 947.79], [151218246e4, 99.16, 99.24, 98.74, 99.22, 786.15], [151218252e4, 99.22, 99.47, 99.13, 99.46, 563], [151218258e4, 99.46, 99.46, 99.13, 99.13, 786.57], [151218264e4, 99.13, 99.46, 99.13, 99.46, 407.93], [15121827e5, 99.46, 99.47, 99.44, 99.47, 1111.56], [151218276e4, 99.48, 99.49, 99.42, 99.43, 1157.22], [151218282e4, 99.43, 99.43, 99.4, 99.41, 1253.88], [151218288e4, 99.41, 99.5, 99.16, 99.5, 907.12], [151218294e4, 99.5, 100.09, 99.5, 99.75, 1108.52], [1512183e6, 99.75, 99.8, 99.51, 99.51, 790.12], [151218306e4, 99.51, 100.25, 99.51, 99.84, 777.63], [151218312e4, 99.84, 100.13, 99.84, 99.84, 286.02], [151218318e4, 99.84, 99.84, 99.84, 99.84, 83.1], [151218324e4, 99.84, 99.84, 99.84, 99.84, 97.1], [15121833e5, 99.84, 99.84, 99.84, 99.84, 118.83], [151218336e4, 99.84, 99.84, 99.84, 99.84, 83.1], [151218342e4, 99.84, 99.84, 99.84, 99.84, 87], [151218348e4, 99.84, 99.84, 99.83, 99.83, 118.15], [151218354e4, 99.83, 99.9, 99.51, 99.81, 1055.44], [15121836e5, 100.11, 100.11, 99.51, 99.79, 764.27], [151218366e4, 99.79, 100.09, 99.51, 99.81, 1010.34], [151218372e4, 99.81, 100.11, 99.51, 99.81, 1077.94], [151218378e4, 99.81, 100.12, 99.71, 99.72, 1056.81], [151218384e4, 99.72, 100.07, 99.72, 99.72, 471.18], [15121839e5, 99.72, 100.06, 99.12, 99.12, 880.57], [151218396e4, 99.11, 99.12, 98.74, 99.08, 684.4], [151218402e4, 99.07, 99.08, 98.76, 99.08, 528.05], [151218408e4, 99.08, 99.32, 98.8, 98.82, 817.45], [151218414e4, 99.06, 99.31, 98.71, 98.72, 898.2], [15121842e5, 98.72, 98.77, 98.71, 98.74, 1232.37], [151218426e4, 98.72, 98.8, 98.53, 98.59, 1107.39], [151218432e4, 98.59, 99.09, 98.59, 98.59, 628.11], [151218438e4, 98.59, 99.04, 98.53, 98.76, 815.67], [151218444e4, 98.76, 99.03, 98.76, 98.76, 1004.73], [15121845e5, 98.76, 99, 98.75, 98.98, 413.34], [151218456e4, 98.98, 98.99, 98.98, 98.98, 213.05], [151218462e4, 98.98, 98.99, 98.98, 98.98, 466.05], [151218468e4, 98.99, 99, 98.99, 98.99, 176.06], [151218474e4, 98.98, 99.03, 98.98, 99.03, 1298.18], [15121848e5, 99.03, 99.03, 98.75, 98.75, 610.59], [151218486e4, 98.56, 98.56, 98.51, 98.53, 481.93], [151218492e4, 98.52, 98.74, 98.51, 98.71, 814.94], [151218498e4, 98.71, 98.75, 98.7, 98.74, 1297.95], [151218504e4, 98.98, 98.98, 98.98, 98.98, 71.72], [15121851e5, 98.98, 98.98, 98.98, 98.98, 123.52], [151218516e4, 98.98, 98.99, 98.98, 98.98, 352.67], [151218522e4, 98.97, 99, 98.96, 98.98, 1051.19], [151218528e4, 98.99, 99.02, 98.99, 99.01, 379.85], [151218534e4, 99.02, 99.04, 99, 99.02, 1242.65], [15121854e5, 99.04, 99.29, 99.02, 99.1, 1039.8], [151218546e4, 99.1, 99.1, 98.99, 99.09, 1029.25], [151218552e4, 99.09, 99.09, 98.74, 98.74, 700.67], [151218558e4, 98.74, 99.09, 98.74, 98.75, 371.95], [151218564e4, 98.75, 99.28, 98.75, 99.28, 668.16], [15121857e5, 99.28, 99.28, 99.24, 99.24, 821.35], [151218576e4, 99.24, 99.27, 99.23, 99.27, 1251.82], [151218582e4, 99.27, 99.69, 99.27, 99.69, 1354.5], [151218588e4, 99.68, 99.68, 99.62, 99.63, 982.9], [151218594e4, 99.62, 99.65, 99.27, 99.34, 1162.58], [1512186e6, 99.38, 99.63, 99.19, 99.54, 1038.89], [151218606e4, 99.54, 99.54, 99.19, 99.21, 416.66], [151218612e4, 99.21, 99.53, 99.21, 99.48, 625.54], [151218618e4, 99.48, 99.48, 99.45, 99.45, 307.34], [151218624e4, 99.45, 99.47, 99.18, 99.18, 1099.8], [15121863e5, 99.19, 99.19, 99.16, 99.18, 1204.09], [151218636e4, 99.19, 99.43, 99.19, 99.43, 215.19], [151218642e4, 99.43, 99.43, 99.43, 99.43, 0], [151218648e4, 99.43, 99.43, 99.43, 99.43, 0], [151218654e4, 99.43, 99.43, 99.43, 99.43, 0], [15121866e5, 99.43, 99.43, 99.43, 99.43, 0], [151218666e4, 99.43, 99.44, 99.43, 99.44, 43.42], [151218672e4, 99.44, 99.47, 99.43, 99.46, 792], [151218678e4, 99.46, 99.5, 99.46, 99.48, 1393.04], [151218684e4, 99.48, 99.49, 99.43, 99.43, 1026.7], [15121869e5, 99.43, 99.46, 99.43, 99.46, 505.46], [151218696e4, 99.47, 99.5, 99.45, 99.48, 1427.2], [151218702e4, 99.48, 99.5, 99.2, 99.5, 1023.97], [151218708e4, 99.5, 99.5, 99.2, 99.2, 523.25], [151218714e4, 99.2, 99.49, 99.09, 99.47, 664.98], [15121872e5, 99.47, 99.47, 99.45, 99.45, 252.61], [151218726e4, 99.45, 99.45, 99.45, 99.45, 0], [151218732e4, 99.46, 99.47, 99.45, 99.47, 673.82], [151218738e4, 99.47, 99.48, 99.45, 99.46, 1003.02], [151218744e4, 99.46, 99.46, 98.76, 98.76, 838.6], [15121875e5, 99.18, 99.43, 98.76, 99.43, 227.78], [151218756e4, 99.43, 99.43, 99.43, 99.43, 0], [151218762e4, 99.09, 99.1, 98.76, 99.09, 790.27], [151218768e4, 99.09, 99.39, 98.78, 98.8, 832.21], [151218774e4, 98.8, 98.82, 98.76, 98.8, 700.87], [15121878e5, 98.8, 98.8, 98.45, 98.45, 969.31], [151218786e4, 98.45, 98.46, 98.45, 98.46, 642.73], [151218792e4, 98.46, 98.73, 98.18, 98.47, 969.02], [151218798e4, 98.73, 98.73, 98.47, 98.68, 688.26], [151218804e4, 98.68, 98.68, 98.46, 98.47, 228.76], [15121881e5, 98.47, 98.47, 98.47, 98.47, 0], [151218816e4, 98.18, 98.18, 98, 98.07, 868.44], [151218822e4, 98.06, 98.06, 97.78, 97.79, 443.54], [151218828e4, 97.99, 98.07, 97.53, 98.06, 703.78], [151218834e4, 98.06, 98.06, 97.78, 98.05, 917.66], [15121884e5, 98.05, 98.05, 97.51, 97.53, 1089.53], [151218846e4, 97.46, 97.65, 97.15, 97.15, 533.61], [151218852e4, 97.14, 98.03, 97.12, 98.02, 1270.88], [151218858e4, 98.02, 98.06, 97.76, 97.76, 1201.47], [151218864e4, 97.76, 97.76, 97.15, 97.17, 1312.99], [15121887e5, 97.09, 97.13, 97.09, 97.11, 795.11], [151218876e4, 97.11, 97.13, 97.11, 97.13, 926.86], [151218882e4, 97.13, 97.79, 97.11, 97.79, 1117.03], [151218888e4, 97.79, 97.79, 97.12, 97.21, 1218.56], [151218894e4, 97.71, 97.71, 97.12, 97.12, 1382.33], [1512189e6, 97.12, 97.41, 97.12, 97.39, 701.1], [151218906e4, 97.39, 97.63, 97.13, 97.14, 664.74], [151218912e4, 97.63, 97.72, 97.62, 97.72, 682.99], [151218918e4, 97.73, 98.05, 97.72, 98.01, 789.7], [151218924e4, 97.98, 98.07, 97.63, 98.07, 779], [15121893e5, 98.07, 98.67, 98.07, 98.36, 1146.55], [151218936e4, 98.36, 98.38, 98.08, 98.08, 700.13], [151218942e4, 98.07, 98.33, 97.65, 98.01, 720.55], [151218948e4, 98.34, 98.36, 98.34, 98.35, 564.61], [151218954e4, 98.35, 98.67, 98.01, 98.01, 960.62], [15121896e5, 98.01, 98.31, 97.99, 97.99, 844.77], [151218966e4, 97.99, 98, 97.63, 97.65, 1127.65], [151218972e4, 97.65, 97.67, 97.62, 97.66, 1085.07], [151218978e4, 97.66, 97.69, 97.14, 97.41, 1177.21], [151218984e4, 97.41, 97.7, 97.41, 97.44, 796.58], [15121899e5, 97.44, 97.99, 97.44, 97.75, 855.52], [151218996e4, 97.75, 98, 97.75, 97.79, 738.8], [151219002e4, 98, 98.07, 97.79, 98.07, 933.7], [151219008e4, 98.07, 98.08, 97.76, 97.78, 1034.29], [151219014e4, 97.79, 97.82, 97.79, 97.82, 657.34], [15121902e5, 97.82, 98.08, 97.82, 97.85, 513.62], [151219026e4, 97.85, 97.85, 97.85, 97.85, 0], [151219032e4, 97.85, 97.85, 97.85, 97.85, 0], [151219038e4, 97.85, 97.85, 97.85, 97.85, 0], [151219044e4, 97.85, 97.85, 97.85, 97.85, 0], [15121905e5, 97.85, 97.85, 97.85, 97.85, 0], [151219056e4, 98.31, 98.66, 97.85, 98.27, 615.9], [151219062e4, 98.28, 98.65, 98.28, 98.29, 782.8], [151219068e4, 98.29, 98.3, 98.29, 98.3, 610.52], [151219074e4, 98.29, 98.65, 98.29, 98.62, 626.35], [15121908e5, 98.62, 98.62, 98.62, 98.62, 0], [151219086e4, 98.62, 98.62, 98.62, 98.62, 0], [151219092e4, 98.29, 98.29, 98.25, 98.28, 80.88], [151219098e4, 98.28, 98.28, 97.82, 97.82, 1058.34], [151219104e4, 97.81, 97.82, 97.44, 97.44, 1170.64], [15121911e5, 97.78, 97.79, 97.44, 97.44, 270.14], [151219116e4, 97.44, 97.81, 97.44, 97.48, 850.68], [151219122e4, 97.48, 97.83, 97.48, 97.83, 655.21], [151219128e4, 97.83, 98.27, 97.55, 97.92, 1022.68], [151219134e4, 97.93, 97.98, 97.93, 97.98, 903.6], [15121914e5, 97.98, 97.98, 97.95, 97.95, 782.18], [151219146e4, 97.94, 97.95, 97.56, 97.56, 1185.9], [151219152e4, 97.56, 98.25, 97.56, 97.9, 917.63], [151219158e4, 97.9, 98.23, 97.56, 97.74, 1158.56], [151219164e4, 97.74, 97.74, 97.74, 97.74, 51.46], [15121917e5, 97.74, 97.74, 97.74, 97.74, 0], [151219176e4, 97.74, 97.74, 97.74, 97.74, 0], [151219182e4, 97.74, 97.74, 97.74, 97.74, 0], [151219188e4, 97.74, 97.74, 97.74, 97.74, 0], [151219194e4, 97.74, 97.74, 97.74, 97.74, 0], [1512192e6, 97.74, 97.74, 97.74, 97.74, 0], [151219206e4, 97.74, 97.74, 97.74, 97.74, 0], [151219212e4, 97.74, 97.74, 97.74, 97.74, 0], [151219218e4, 97.74, 97.74, 97.74, 97.74, 0], [151219224e4, 97.74, 97.74, 97.74, 97.74, 0], [15121923e5, 97.74, 97.74, 97.74, 97.74, 0], [151219236e4, 97.74, 97.74, 97.74, 97.74, 0], [151219242e4, 97.73, 97.73, 97.72, 97.73, 195.5], [151219248e4, 97.74, 97.91, 97.55, 97.56, 1223.86], [151219254e4, 97.56, 97.89, 97.47, 97.6, 1114.79], [15121926e5, 97.6, 97.65, 97.6, 97.65, 696.61], [151219266e4, 97.65, 97.66, 97.59, 97.63, 1102.13], [151219272e4, 97.63, 97.68, 97.49, 97.68, 1121.26], [151219278e4, 97.68, 97.69, 97.49, 97.53, 830.77], [151219284e4, 97.54, 98.18, 97.54, 97.89, 1096.07], [15121929e5, 97.89, 98.18, 97.55, 97.83, 984.19], [151219296e4, 97.84, 97.87, 97.84, 97.87, 570.47], [151219302e4, 97.87, 97.9, 97.87, 97.87, 721.44], [151219308e4, 97.87, 97.91, 97.86, 97.9, 656.12], [151219314e4, 98.17, 98.23, 98.17, 98.23, 1069.57], [15121932e5, 98.23, 98.62, 98.23, 98.62, 692.51], [151219326e4, 98.63, 98.63, 98.62, 98.62, 200.26], [151219332e4, 98.62, 98.62, 98.62, 98.62, 0], [151219338e4, 98.62, 98.62, 98.62, 98.62, 0], [151219344e4, 98.63, 98.64, 98.63, 98.63, 350.96], [15121935e5, 98.63, 98.64, 98.62, 98.64, 1072.93], [151219356e4, 98.64, 99.02, 98.64, 99.02, 1068.39], [151219362e4, 99.01, 99.01, 98.64, 98.64, 769.83], [151219368e4, 98.64, 98.99, 98.64, 98.98, 726.4], [151219374e4, 98.98, 99.02, 98.98, 98.98, 1220.28], [15121938e5, 99, 99.44, 98.97, 99.43, 1032.9], [151219386e4, 99.44, 99.44, 99.43, 99.43, 187.51], [151219392e4, 99.01, 99.01, 98.97, 98.97, 160.57], [151219398e4, 98.97, 99.42, 98.97, 99.29, 965.16], [151219404e4, 99.29, 99.42, 98.99, 98.99, 579.47], [15121941e5, 98.99, 99.39, 98.98, 99.36, 1070.06], [151219416e4, 99.36, 99.41, 98.72, 99.37, 926.49], [151219422e4, 99.37, 99.44, 99.36, 99.43, 1115.28], [151219428e4, 99.44, 99.47, 99.31, 99.45, 1142.59], [151219434e4, 99.45, 99.52, 99.45, 99.52, 1242.46], [15121944e5, 99.52, 99.53, 99.27, 99.28, 724.03], [151219446e4, 99.28, 99.28, 99.28, 99.28, 122], [151219452e4, 99.28, 99.54, 99.28, 99.52, 506.58], [151219458e4, 99.52, 99.67, 99.29, 99.67, 994.95], [151219464e4, 99.67, 100.06, 99.62, 99.67, 1109.51], [15121947e5, 99.68, 100.06, 99.68, 99.75, 428.37], [151219476e4, 99.75, 100.04, 99.74, 100, 911.15], [151219482e4, 100.01, 100.27, 100, 100.26, 958.63], [151219488e4, 100.27, 100.57, 100.09, 100.09, 361.03], [151219494e4, 100.09, 100.1, 100.09, 100.1, 85.48], [1512195e6, 100.1, 100.11, 100.1, 100.11, 107.83], [151219506e4, 100.11, 100.11, 100.11, 100.11, 69.22], [151219512e4, 100.11, 102.43, 100.11, 100.56, 598.28], [151219518e4, 101.7, 101.7, 100.57, 100.81, 852.24], [151219524e4, 100.82, 100.83, 100.57, 100.81, 801.53], [15121953e5, 100.81, 101.11, 100.57, 100.82, 427.41], [151219536e4, 100.81, 101.1, 100.57, 100.81, 659.27], [151219542e4, 100.81, 101.39, 100.81, 101.12, 694.05], [151219548e4, 101.12, 101.39, 101.12, 101.39, 264.33], [151219554e4, 101.39, 103.26, 100.82, 101.14, 586.03], [15121956e5, 101.14, 101.38, 101.09, 101.12, 309.55], [151219566e4, 101.12, 101.12, 100.82, 101.1, 165.18], [151219572e4, 101.1, 101.1, 100.57, 100.66, 955.57], [151219578e4, 100.66, 100.82, 100.57, 100.74, 677.15], [151219584e4, 100.74, 101.09, 100.57, 100.81, 824.89], [15121959e5, 100.81, 101.07, 100.57, 100.57, 397.35], [151219596e4, 100.57, 100.58, 100.57, 100.58, 227.9], [151219602e4, 100.58, 101.08, 100.58, 101.06, 591.45], [151219608e4, 101.06, 101.38, 101.06, 101.36, 1051.08], [151219614e4, 101.35, 101.35, 100.59, 101.09, 879.93], [15121962e5, 101.09, 101.32, 100.59, 101.28, 784.74], [151219626e4, 101.29, 101.35, 101.29, 101.34, 1156.68], [151219632e4, 101.34, 101.65, 101.34, 101.4, 643.29], [151219638e4, 101.39, 101.65, 101.35, 101.36, 360.51], [151219644e4, 101.37, 101.38, 101.28, 101.28, 463.47], [15121965e5, 101.28, 101.39, 100.96, 101.39, 537.1], [151219656e4, 101.39, 101.64, 100.96, 101.29, 711.1], [151219662e4, 101.29, 101.64, 101.29, 101.3, 680.67], [151219668e4, 101.3, 101.3, 100.96, 101.29, 806.4], [151219674e4, 101.29, 101.29, 100.96, 100.96, 584.14], [15121968e5, 100.96, 101.59, 100.96, 101.46, 616.42], [151219686e4, 100.96, 101.59, 100.96, 101.58, 1157.54], [151219692e4, 101.58, 101.64, 101.54, 101.54, 1306.81], [151219698e4, 101.54, 101.66, 101.54, 101.54, 821.43], [151219704e4, 101.54, 103.46, 101.54, 101.78, 709.57], [15121971e5, 101.77, 101.8, 101.76, 101.79, 724.24], [151219716e4, 101.8, 102.78, 101.79, 102.12, 971.24], [151219722e4, 102.12, 102.44, 101.8, 102.43, 969.69], [151219728e4, 102.43, 102.43, 102.41, 102.41, 259.39], [151219734e4, 102.41, 102.41, 102.41, 102.41, 0], [15121974e5, 102.41, 102.41, 102.41, 102.41, 0], [151219746e4, 102.41, 102.41, 102.41, 102.41, 0], [151219752e4, 102.41, 102.41, 102.37, 102.4, 1240.04], [151219758e4, 102.4, 102.42, 102.38, 102.42, 1133.63], [151219764e4, 102.41, 102.41, 102.36, 102.36, 837.64], [15121977e5, 102.36, 102.36, 101.78, 102.06, 506.17], [151219776e4, 102.06, 102.06, 101.78, 101.79, 115.74], [151219782e4, 101.79, 101.79, 101.79, 101.79, 64.88], [151219788e4, 101.79, 101.8, 101.79, 101.8, 56.18], [151219794e4, 101.8, 101.8, 101.54, 101.54, 340.36], [1512198e6, 101.27, 101.53, 100.59, 101.53, 922.38], [151219806e4, 101.52, 101.52, 101.2, 101.2, 1167.19], [151219812e4, 101.2, 101.21, 100.59, 100.59, 664.3], [151219818e4, 100.59, 100.59, 97.86, 100.28, 394.24], [151219824e4, 99.88, 100.63, 99.88, 100.51, 951.46], [15121983e5, 100.51, 100.56, 100.19, 100.19, 643], [151219836e4, 100.19, 100.19, 100.19, 100.19, 287.18], [151219842e4, 100.57, 100.62, 100.19, 100.19, 438.05], [151219848e4, 100.19, 100.19, 100.18, 100.18, 263.65], [151219854e4, 99.89, 100.25, 99.89, 100.14, 432.76], [15121986e5, 100.14, 100.62, 100.13, 100.15, 673.68], [151219866e4, 100.15, 100.63, 100.15, 100.5, 1005.81], [151219872e4, 100.51, 100.51, 99.89, 99.89, 408.55], [151219878e4, 99.89, 99.89, 99.89, 99.89, 374.33], [151219884e4, 99.89, 99.91, 99.89, 99.9, 375.9], [15121989e5, 99.9, 100.51, 99.9, 100.51, 601.94], [151219896e4, 100.56, 100.99, 100.56, 100.91, 1002.69], [151219902e4, 101.07, 101.2, 100.91, 100.91, 396.78], [151219908e4, 100.91, 101.21, 100.91, 101.21, 376.67], [151219914e4, 101.21, 101.22, 100.91, 101.2, 573.04], [15121992e5, 101.2, 102.05, 100.93, 101.24, 617.8], [151219926e4, 101.24, 102.04, 101.24, 101.24, 510.26], [151219932e4, 101.24, 101.64, 101.24, 101.24, 388.23], [151219938e4, 101.24, 101.24, 101.23, 101.23, 176.59], [151219944e4, 101.23, 101.26, 100.94, 101.19, 622.02], [15121995e5, 101.19, 101.26, 101.19, 101.19, 254.5], [151219956e4, 101.19, 101.19, 101.19, 101.19, 0], [151219962e4, 101.19, 101.19, 101.19, 101.19, 0], [151219968e4, 101.19, 101.19, 101.19, 101.19, 0], [151219974e4, 101.54, 101.54, 101.54, 101.54, 13.88], [15121998e5, 101.54, 101.69, 101.47, 101.47, 1114.76], [151219986e4, 101.47, 102.03, 101.19, 102.01, 981.22], [151219992e4, 102.01, 102.01, 101.99, 101.99, 325.76], [151219998e4, 101.99, 101.99, 101.99, 101.99, 0], [151220004e4, 101.99, 101.99, 101.97, 101.97, 471.84], [15122001e5, 101.97, 101.97, 101.93, 101.93, 425.4], [151220016e4, 101.93, 101.96, 101.93, 101.95, 584.73], [151220022e4, 101.95, 101.98, 101.95, 101.98, 223.55], [151220028e4, 101.98, 102.02, 101.98, 102.02, 1166.79], [151220034e4, 102.02, 102.33, 102.02, 102.32, 760.74], [15122004e5, 102.07, 102.32, 102.01, 102.31, 728.5], [151220046e4, 102.31, 102.31, 102.01, 102.31, 259.2], [151220052e4, 102.31, 102.31, 102.31, 102.31, 0], [151220058e4, 102.31, 102.31, 102.31, 102.31, 0], [151220064e4, 102.32, 102.35, 102.32, 102.35, 751.05], [15122007e5, 102.35, 102.4, 102.34, 102.39, 1276.35], [151220076e4, 102.39, 102.41, 102.37, 102.4, 1334.92], [151220082e4, 102.4, 104.43, 102.4, 102.88, 790.08], [151220088e4, 102.88, 102.88, 102.84, 102.84, 406.81], [151220094e4, 102.42, 102.42, 102.02, 102.02, 240.08], [1512201e6, 102.02, 102.03, 102.02, 102.03, 54.8], [151220106e4, 102.03, 102.41, 102.03, 102.41, 118.31], [151220112e4, 102.4, 102.45, 102.05, 102.34, 695.05], [151220118e4, 102.2, 102.21, 102.05, 102.05, 143.84], [151220124e4, 102.05, 102.34, 102.05, 102.06, 91.02], [15122013e5, 102.06, 102.44, 102.06, 102.35, 398.55], [151220136e4, 102.35, 102.35, 102.35, 102.35, 79.95], [151220142e4, 102.35, 102.74, 102.35, 102.35, 234.11], [151220148e4, 102.35, 102.72, 102.05, 102.38, 407.54], [151220154e4, 102.38, 102.38, 102.22, 102.23, 195.78], [15122016e5, 102.23, 102.38, 102.23, 102.38, 107.55], [151220166e4, 102.38, 102.72, 102.22, 102.22, 190.86], [151220172e4, 102.21, 102.47, 102.05, 102.05, 411.56], [151220178e4, 102.05, 102.45, 102, 102, 447.25], [151220184e4, 101.97, 101.98, 101.96, 101.96, 319.16], [15122019e5, 101.96, 102.16, 101.54, 101.9, 669.84], [151220196e4, 101.89, 102.18, 101.89, 102.15, 797.28], [151220202e4, 101.9, 102.45, 101.9, 102.43, 869.98], [151220208e4, 102.43, 102.43, 101.9, 102.13, 707.29], [151220214e4, 101.9, 102.13, 101.9, 101.91, 506.96], [15122022e5, 102.13, 102.13, 101.92, 101.93, 658.75], [151220226e4, 101.93, 102.15, 101.93, 101.96, 539.47], [151220232e4, 101.96, 102.42, 101.96, 102.17, 539.63], [151220238e4, 102.16, 102.16, 101.92, 101.92, 611.65], [151220244e4, 101.92, 101.92, 97.86, 101.8, 652.56], [15122025e5, 101.79, 101.79, 100.84, 101.29, 993.63], [151220256e4, 101.29, 101.77, 100.84, 100.84, 673.22], [151220262e4, 100.84, 101.77, 100.84, 101.03, 645.12], [151220268e4, 101.04, 101.41, 101.04, 101.06, 480.1], [151220274e4, 101.06, 101.09, 101.06, 101.09, 514.78], [15122028e5, 101.09, 101.77, 101.09, 101.77, 598.15], [151220286e4, 101.77, 101.77, 101.73, 101.75, 793.53], [151220292e4, 101.74, 101.75, 101.73, 101.75, 719.21], [151220298e4, 101.75, 101.88, 101.75, 101.85, 1372.35], [151220304e4, 101.85, 102.42, 101.85, 102.16, 857.14], [15122031e5, 102.16, 102.17, 101.92, 101.93, 291.58], [151220316e4, 102.17, 102.17, 102.17, 102.17, 17.31], [151220322e4, 102.17, 102.17, 102.17, 102.17, 0], [151220328e4, 102.17, 102.17, 102.17, 102.17, 0], [151220334e4, 102.17, 102.17, 102.17, 102.17, 0], [15122034e5, 102.17, 102.17, 102.17, 102.17, 0], [151220346e4, 102.17, 102.17, 102.17, 102.17, 0], [151220352e4, 102.17, 102.17, 102.17, 102.17, 0], [151220358e4, 101.92, 102.17, 101.9, 101.91, 197.59], [151220364e4, 101.91, 101.92, 101.79, 101.92, 548.58], [15122037e5, 101.79, 101.79, 101.74, 101.74, 293.62], [151220376e4, 101.75, 101.79, 101.41, 101.49, 540.77], [151220382e4, 101.75, 102.08, 101.49, 101.5, 516.67], [151220388e4, 101.5, 101.5, 101.5, 101.5, 266.29], [151220394e4, 101.5, 101.76, 101.41, 101.41, 817.78], [1512204e6, 101.41, 101.74, 101.07, 101.07, 680.89], [151220406e4, 101.47, 101.47, 101.3, 101.3, 824.28], [151220412e4, 101.3, 101.3, 101.27, 101.27, 781.14], [151220418e4, 101.26, 101.3, 101.25, 101.26, 1065.73], [151220424e4, 101.26, 101.26, 101.23, 101.23, 501.69], [15122043e5, 101.24, 101.25, 101.24, 101.25, 314.98], [151220436e4, 101.25, 101.25, 101.21, 101.23, 1162.8], [151220442e4, 101.25, 101.38, 101.24, 101.38, 1105.27], [151220448e4, 101.67, 101.74, 101.67, 101.71, 689.2], [151220454e4, 101.71, 101.71, 101.3, 101.3, 910.46], [15122046e5, 101.29, 101.32, 101.21, 101.23, 997.43], [151220466e4, 101.23, 101.33, 101.01, 101.01, 1006.78], [151220472e4, 101.01, 101.18, 101.01, 101.04, 1024.63], [151220478e4, 101.04, 101.05, 98.36, 98.36, 913.16], [151220484e4, 98.36, 101, 98.36, 101, 526.15], [15122049e5, 101.01, 101.15, 100.52, 100.85, 775.82], [151220496e4, 101.15, 101.15, 100.85, 100.86, 542.71], [151220502e4, 100.86, 100.91, 100.86, 100.91, 595.87], [151220508e4, 100.91, 100.92, 100.9, 100.92, 557.18], [151220514e4, 100.92, 101.15, 100.92, 101.15, 564]]
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/HashRate/tradeView.vue?vue&type=script&lang=js&









const timezone = ['Etc/UTC', 'Africa/Cairo', 'Africa/Johannesburg', 'Africa/Lagos', 'America/Argentina/Buenos_Aires', 'America/Bogota', 'America/Caracas', 'America/Chicago', 'America/El_Salvador', 'America/Juneau', 'America/Lima', 'America/Los_Angeles', 'America/Mexico_City', 'America/New_York', 'America/Phoenix', 'America/Santiago', 'America/Sao_Paulo', 'America/Toronto', 'America/Vancouver', 'Asia/Almaty', 'Asia/Ashkhabad', 'Asia/Bahrain', 'Asia/Bangkok', 'Asia/Chongqing', 'Asia/Dubai', 'Asia/Ho_Chi_Minh', 'Asia/Hong_Kong', 'Asia/Jakarta', 'Asia/Jerusalem', 'Asia/Kathmandu', 'Asia/Kolkata', 'Asia/Kuwait', 'Asia/Muscat', 'Asia/Qatar', 'Asia/Riyadh', 'Asia/Seoul', 'Asia/Shanghai', 'Asia/Singapore', 'Asia/Taipei', 'Asia/Tehran', 'Asia/Tokyo', 'Atlantic/Reykjavik', 'Australia/ACT', 'Australia/Adelaide', 'Australia/Brisbane', 'Australia/Sydney', 'Europe/Athens', 'Europe/Belgrade', 'Europe/Berlin', 'Europe/Copenhagen', 'Europe/Helsinki', 'Europe/Istanbul', 'Europe/London', 'Europe/Luxembourg', 'Europe/Madrid', 'Europe/Moscow', 'Europe/Paris', 'Europe/Riga', 'Europe/Rome', 'Europe/Stockholm', 'Europe/Tallinn', 'Europe/Vilnius', 'Europe/Warsaw', 'Europe/Zurich', 'Pacific/Auckland', 'Pacific/Chatham', 'Pacific/Fakaofo', 'Pacific/Honolulu', 'Pacific/Norfolk', 'US/Mountain'];
/* harmony default export */ var tradeViewvue_type_script_lang_js_ = ({
  name: 'Home',
  components: {
    'buybit-depth-chart': depth_chart["default"]
  },
  // props: ['from', 'to', 'symbleParameString', 'ispro', 'fullWidth'],
  props: ['symbleParameString', 'ispro', 'fullWidth', 'width', 'height', 'KlineSingeData', 'DepthData'],

  data() {
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
        count: 1
      },
      symbol: 'xusdt',
      // "周期:1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M(m -> 分钟; h -> 小时; d -> 天; w -> 周; M -> 月)"
      interval: "15m",
      //当前时间
      oldInterval: null,
      //上一次时间
      orderbook: {},
      connState: 0,
      //websocket状态 0为关闭 1为开启 2为加载数据 3为直接抛出不做任何动作
      loadingCount: 1,
      //k线加载历史数据次数
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
          'lines': {}
        },
        success: false
      },
      widget: null,
      socket: new socket["default"](),
      datafeeds: new datafees["default"](this),
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
        'scalesProperties.lineColor': "#DDDDE4"
      },
      nightOverrides: {
        'scalesProperties.backgroundColor': "#131722",
        'paneProperties.background': "#131722",
        'scalesProperties.lineColor': "#383655"
      },
      defaultOverrides: {
        'editorFontsList': [''],
        "volumePaneSize": "medium",
        //小: tiny, 中: medium 大: large(默认)
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
      lockReconnect: false,
      //避免重复连接
      currentState: true,
      pricescale: 100,
      // 精度，100是2位小数
      isLoadingState: false,
      //加载一次性数据是否成功
      timeInterval: null,
      //轮询对象
      initState: false,
      //是否初始化过
      symbleParameArray: '',
      from: '',
      to: '',
      background: '',
      isOpenState: false //是否开盘

    };
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
      handler(val) {
        this.onMessage(val, true);
      }

    },
    'DepthData': {
      handler(val) {// this.depthsData.bids=val.bids;
        // this.depthsData.asks=val.asks;
      }

    },
    '$store.state.background': function (val) {
      if (val) {// this.setBackground()
      }
    },
    '$store.state.locale': function () {
      this.setLanguage();
    },
    //设置均线种类 均线样式
    'widgetReady': function (val) {
      if (val) {
        this.hideLegend(); // this.setBackground()

        this.setLanguage();
        this.widget.chart().createStudy("Moving Average", false, false, [5], function (guid) {}, {
          "plot.color.0": "#ff131a"
        });
        this.widget.chart().createStudy("Moving Average", false, false, [10], function (guid) {}, {
          "plot.color.0": "#ff131a"
        });
        this.widget.chart().createStudy("Moving Average", false, false, [30], function (guid) {}, {
          "plot.color.0": "#ffd700"
        });
        this.widget.chart().createStudy("Moving Average", false, false, [60], function (guid) {}, {
          "plot.color.0": "#ffd700"
        });
      }
    }
  },

  //销毁前调用
  destroyed() {
    clearInterval(this.timeInterval);
    this.ws.close();
    this.currentState = false;
  },

  mounted() {
    this.$nextTick(() => {
      if (this.activeChart == 0) {// this.refreshKlineData(900000);// 进入页面时执行,默认聚合时间900000毫秒(15分钟)
      } // setTimeout(() => {
      //   console.log(222)
      //   this.requestData()
      // }, 300);


      window.addEventListener('resize', () => {
        if (this.activeChart == 0) {// this.requestData()
        }
      });
      this.interval = this.$store.state.interval;
      this.resolutionInterval = this.$store.state.intervalType;
      this.background = this.$store.state.background;
      this.symbleParameArray = !this.$route.params.id ? null : this.$route.params.id.split('_').length != 2 ? null : this.$route.params.id.split('_'); //获取产品

      this.from = this.symbleParameArray ? this.symbleParameArray[0].toUpperCase() : '--'; //获取货币

      this.to = this.symbleParameArray ? this.symbleParameArray[1].toUpperCase() : '--';
      this.$bus.on("destroyedSocket", () => {
        this.ws.close();
      }); // this.widgetloading = true

      this.init();
    });
  },

  created() {
    this.sub = `market.${this.symbleParameString}.kline.1min`;
  },

  beforeDestroy() {
    for (const _t in chart_provider["default"].timer) {
      clearTimeout(chart_provider["default"].timer[_t]);
      chart_provider["default"].timer[_t] = -1;
    }

    for (const _t in chart_provider["default"].pollingtimer) {
      clearTimeout(chart_provider["default"].pollingtimer[_t]);
      chart_provider["default"].pollingtimer[_t] = -1;
    }
  },

  methods: {
    requestData(startTime, endTime) {
      /*测试用的  请求服务器请用下面的*/
      let newFromTime = this.timeScreening(this.switchSetTimeInterval(this.interval + '')) * 1000;
      let newToTime = Math.round(new Date().getTime());
      let params = {
        "pair": `${this.from}/${this.to}`,
        // "交易对"
        "interval": this.switchSetTimeInterval(this.interval + ''),
        // "周期:1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M(m -> 分钟; h -> 小时; d -> 天; w -> 周; M -> 月)"
        "startTime": startTime || newFromTime || 0,
        // "开始时间"
        "endTime": endTime || newToTime || 0 // "截止时间"

      };
      this.$api.Market.GetKLineDepth(params).then(res => {
        if (res.isSuccess) {
          this.klineData = {
            data: res.data,
            success: true
          };
          this.depthsData = res.data.depths;
          this.onMessage(this.klineData);

          if (this.$refs.callMethods && this.$refs.callMethods.kline && this.$refs.callMethods.kline.chartMgr) {
            //强制更改缓存中的lines值,防止显示不同步
            this.$refs.callMethods.kline.chartMgr.getChart().updateDataAndDisplay(this.klineData.data.lines);
            this.$refs.callMethods.resize(document.getElementsByClassName("buybit-chart")[0].clientWidth, document.getElementsByClassName("buybit-chart")[0].clientHeight);
          }
        }
      });
    },

    refreshKlineData(option) {
      //你点击页面上的周期会触发这个方法
      if (option === 900000) {
        //如果时间等于15分钟
        console.log("进入"); // this.requestData();
      } else if (option === 300000) {
        //如果5分钟
        console.log("5分钟" + option);
      } else {
        console.log("其他时间" + option); //其他时间
      }
    },

    async init() {
      //获取交易对配置
      await this.getCoinTeamConfig();
      this.ws = new WebSocket("wss://www.buybit.com" + '/api/v1/buybit/power/ws/kline');

      this.ws.onopen = () => {};

      this.ws.onmessage = event => {
        let reader = new FileReader();
        let that = this;
        reader.readAsText(event.data, "utf-8");

        reader.onload = function (e) {
          that.handleData(e.target.result);
        };

        this.initView();
      };

      this.ws.onclose = () => {
        console.log('close2'); // this.init();

        this.reconnect();
      };

      this.ws.onerror = err => {
        console.log('error', err); // this.init();

        this.reconnect();
      };
    },

    //获取交易配置
    getCoinTeamConfig() {
      let obj = `${this.from}-${this.to}`; // this.$api.HashRate.getCoinTeamConfig(obj).then((res) => {
      //   if (res && res.status === 200) {
      //     //key:配置类型 value:配置内容;1:最小交易量,2:最大交易量,3:价格最大小数位,4:数量最大小数位,5:taker手续分百分比,6:maker手续分百分比,7:限价买是否可购买,8:限价卖是否出售,9:市价买是否可购买，10:市价卖是否可出售
      //     this.pricescale = Number(this.$commonFn.Transformation(res.data.data[3] || 0))
      //   }
      // })
    },

    //短线重连
    reconnect() {
      if (this.lockReconnect || !this.currentState) return;
      this.lockReconnect = true; //没连接上会一直重连，设置延迟避免请求过多

      setTimeout(() => {
        console.log('没连接上会一直重连，设置延迟避免请求过多');
        this.lockReconnect = false;
      }, 5000); //这里设置重连间隔(ms)
    },

    //获取websocket一次性数据
    reqWebsocketData(rangeStartDate) {
      if (this.interval) {
        let newFromTime = this.timeScreening(this.interval) * 1000;
        let newToTime = Math.round(new Date().getTime());

        if (this.connState == 0) {
          this.requestData(newFromTime, newToTime);
          this.connState = 1;
        } else {
          this.requestData(this.newFromTimeFrom(this.switchSetTimeInterval(this.interval), this.lastTime), this.lastTime);
        }
      }

      this.isLoadingState = false;
    },

    /*
    * @time 时间类型
    * @newFromTime 初始化的结束时间（k线最左边）
    * @type 是否是开始时间类型
    */
    newFromTimeFrom(time, newFromTime, type) {
      time += ''; // 一天为86400 写76400是因为币池不允许超过一天的数据 以5分钟的为例
      // 周期:1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M

      let _time;

      switch (time) {
        case '1m':
          // 1000(1秒) * 60 * 1000(多少条)
          _time = newFromTime - 1000 * 60 * 1000;
          break;

        case '5m':
          _time = newFromTime - 1000 * 60 * 5 * 1000;
          break;

        case '15m':
          _time = newFromTime - 1000 * 60 * 15 * 1000;
          break;

        case '30m':
          _time = newFromTime - 1000 * 60 * 30 * 1000;
          break;

        case '1h':
          _time = newFromTime - 1000 * 60 * 60 * 1000;
          break;

        case '2h':
          _time = newFromTime - 1000 * 60 * 120 * 1000;
          break;

        case '4h':
          _time = newFromTime - 1000 * 60 * 240 * 1000;
          break;

        case '6h':
          _time = newFromTime - 1000 * 60 * 360 * 1000;
          break;

        case '8h':
          _time = newFromTime - 1000 * 60 * 480 * 1000;
          break;

        case '12h':
          _time = newFromTime - 1000 * 60 * 720 * 1000;
          break;

        case '1d':
          _time = newFromTime - 1000 * 60 * 1440 * 1000;
          break;

        case '3d':
          _time = newFromTime - 1000 * 60 * 4320 * 1000;
          break;

        case '1w':
          _time = newFromTime - 1000 * 60 * 10080 * 1000;
          break;

        case '1M':
          _time = newFromTime - 1000 * 60 * 44640 * 1000;
          break;
      }

      return _time;
    },

    //k线历史数据加载每个时段的筛选
    timeScreening(time) {
      time += ''; // 一天为86400 写76400是因为币池不允许超过一天的数据 以5分钟的为例

      let _time;

      switch (time) {
        case '1m':
          _time = Math.round(new Date().getTime() / 1000) - 86400 / 5;
          break;

        case '5m':
          _time = Math.round(new Date().getTime() / 1000) - 86400;
          break;

        case '15m':
          _time = Math.round(new Date().getTime() / 1000) - 86400 * 3;
          break;

        case '30m':
          _time = Math.round(new Date().getTime() / 1000) - 86400 * 6;
          break;

        case '1h':
          _time = Math.round(new Date().getTime() / 1000) - 86400 * 12;
          break;

        case '4h':
          _time = Math.round(new Date().getTime() / 1000) - 86400 * 12 * 4;
          break;

        case '1d':
          _time = Math.round(new Date().getTime() / 1000) - 86400 * 12 * 15;
          break;

        case '1w':
          _time = Math.round(new Date().getTime() / 1000) - 86400 * 7 * 300;
          break;

        case '1M':
          _time = Math.round(new Date().getTime() / 1000) - 86400 * 12 * 15 * 9;
          break;
      }

      return _time;
    },

    // 处理接收到的信息
    handleData(msg) {
      if (msg == '"连接成功!"') {
        return;
      }

      let data = JSON.parse(msg);

      if (data.data) {// this.onMessage(data);
      }
    },

    // 发送响应信息
    sendHeartMessage(pong) {
      this.ws.send(JSON.stringify({
        "ping": pong
      }));
    },

    async setBackground() {
      await this.$nextTick(() => {});
      const val = this.$store.state.background;
      const tradingview = await document.querySelector('iframe[id^="tradingview"]');
      const contentWindow = await tradingview.contentWindow.document;
      const chartPage = contentWindow.querySelector('.chart-page');
      chartPage.className = chartPage.className.replace(/day/g, '').replace(/night/g, '');

      if (val == 'day') {
        chartPage.className += ' day';
      } else {
        chartPage.className += ' night';
      }

      try {
        this.widget.applyOverrides(val == 'day' ? this.dayOverrides : this.nightOverrides);
        this.widget.applyStudiesOverrides({
          toolbar_bg: val == 'day' ? '#ffffff' : '#131722'
        });
      } catch (e) {}
    },

    hideLegend() {
      let clickEvent;

      if (document.createEvent) {
        clickEvent = document.createEvent("MouseEvent");
        clickEvent.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      } else {
        clickEvent = new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': false
        });
      }

      const contentWindow = document.getElementById(this.widget._id).contentWindow;
      const a = contentWindow.document.querySelector('a.pane-legend-minbtn.apply-common-tooltip.apply');

      if (a) {
        a.dispatchEvent(clickEvent);
      }
    },

    getintervalvalue(list, key) {
      return list.find(item => {
        return item.key == key;
      }).value;
    },

    // 时间过滤
    switchSetTimeInterval(time) {
      let interval = "";

      switch (time) {
        case '1':
          interval = '1m';
          break;

        case '5':
          interval = '5m';
          break;

        case '10':
          interval = '10m';
          break;

        case '15':
          interval = '15m';
          break;

        case '30':
          interval = '30m';
          break;

        case '60':
          interval = '1h';
          break;

        case '120':
          interval = '2h';
          break;

        case '240':
          interval = '4h';
          break;

        case '360':
          interval = '6h';
          break;

        case '720':
          interval = '12h';

        case '1D':
          interval = '1d';
          break;

        case '10080':
          interval = '1w';
          break;

        case '43200':
          interval = '1M';
          break;
      }

      return interval;
    },

    //设置时间间隔
    setTimeInterval(time) {
      time = Number(time);
      this.resolutionInterval = time;
      let interval = '';

      switch (time) {
        case 2:
          interval = '1';
          break;

        case 3:
          interval = '5';
          break;

        case 14:
          interval = '10';
          break;

        case 4:
          interval = '15';
          break;

        case 5:
          interval = '30';
          break;

        case 6:
          interval = '60';
          break;

        case 7:
          interval = '1D';
          break;

        case 8:
          interval = '10080';
          break;

        case 9:
          interval = '43200';
          break;

        case 10:
          interval = '120';
          break;

        case 11:
          interval = '240';
          break;

        case 12:
          interval = '360';
          break;

        case 13:
          interval = '720';
          break;
      }

      return interval;
    },

    setLanguage() {
      try {
        this.widget.chart().setLanguage(this.getlanguage());
      } catch (e) {}
    },

    async setResolution(time) {
      try {
        for (let i in chart_provider["default"].history) {
          delete chart_provider["default"].history[i].firstBar;
        }

        const interval = this.setTimeInterval(time);
        this.$store.commit('SET_INTERVALTYPE', Number(time));
        this.$store.commit('SET_INTERVAL', interval);
        const chart = this.selectChartType('STYLE_CANDLES'); //判断不能同时点击同一个时间

        if (this.interval != interval) {
          this.oldInterval = this.interval;
          this.interval = interval;
          this.loadingCount = 1; //需要重新获取

          this.connState = 0; //清楚缓存数据

          this.cacheData = [];
        }
        /* 分时线切换 */
        // 3 代表类型 分时， 普通分钟按钮 1 


        this.widget.chart().setChartType(chart); // 1代表1分钟  

        this.widget.chart().setResolution(interval, function (e) {});
        this.requestData();
      } catch (e) {}
    },

    selectChartType(type) {
      let typenum;

      switch (type) {
        // 美国线
        case 'STYLE_BARS':
          typenum = 0;
          break;
        // K线图

        case 'STYLE_CANDLES':
          typenum = 1;
          break;
        // 面积图

        case 'STYLE_AREA':
          typenum = 3;
          break;
        // 线形图

        case 'STYLE_LINE':
          typenum = 2;
          break;
        // 平均K线图

        case 'STYLE_HEIKEN_ASHI':
          typenum = 8;
          break;
      }

      return typenum;
    },

    //设置图表类型
    setChartType(type) {
      try {
        const chart = this.selectChartType(type);
        this.resolutionInterval = 1;
        this.widget.chart().setChartType(chart);
        this.widget.chart().resetData();
      } catch (e) {}
    },

    //设置弹窗
    setOtherWindows(val) {
      this.widget.chart().executeActionById(val);
    },

    //全屏
    toggleFullScreen() {
      this.fullscreen = !this.fullscreen;
      this.$refs['fullscreen'].toggle();
    },

    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },

    getlanguage() {
      if (this.$store.state.locale == 'zh-CN') {
        return "zh";
      } else if (this.$store.state.locale == 'zh-TW') {
        return "zh_TW";
      } else if (this.$store.state.locale == 'en-US') {
        return "en";
      }
    },

    initView() {
      if (!this.widget) {
        let tz = external_moment_timezone_default.a.tz.guess();

        if (timezone.indexOf(tz) < 0) {
          tz = 'Etc/UTC';
        }

        const overrides = Object.assign(this.defaultOverrides, this.$store.state.background == 'day' ? this.dayOverrides : this.nightOverrides);
        this.timezone = tz;
        let symbol = this.symbleParameString;
        this.symbol = symbol;
        this.widget = new chart_base["default"].widget({
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
          disabled_features: ['header_widget_dom_node', 'save_chart_properties_to_local_storage', "use_localstorage_for_settings", 'volume_force_overlay', 'timeframes_toolbar', //底部时间栏
          'header_screenshot', //快照
          'header_saveload', //保存
          'header_symbol_search', //头部搜索
          'header_chart_type', 'header_indicators', 'header_undo_redo', 'header_compare', 'header_resolutions', 'items_favoriting', 'header_interval_dialog_button', 'show_interval_dialog_on_key_press'],
          studies_overrides: {
            //显示交易量的移动平均线
            'volume.show ma': false
          },
          overrides: overrides,
          custom_css_url: "css/trade.css",
          enabled_features: ["study_templates" // 'hide_left_toolbar_by_default'
          ],
          // charts_storage_url: 'http://saveload.tradingview.com',
          charts_storage_api_version: "1.1",
          client_id: 'coinpool.com',
          user_id: 'public_user_id'
        });
        this.widget.onChartReady(() => {
          const wd = document.getElementById(this.widget._id);

          if (wd) {
            wd.style.visibility = 'visible';
          } // 使用指标
          // this.widget.chart().createStudy("EMA Cross", false, false, [12, 50])
          // this.widgetloading = false


          this.widgetReady = true;
        });
      }
    },

    sendMessage(data) {
      if (this.socket.checkOpen()) {
        this.socket.send(data);
      } else {
        this.socket.on('open', () => {
          this.socket.send(data);
        });
      }
    },

    //K线返回的数据
    onMessage(data, isSinge) {
      clearInterval(this.timeInterval);
      this.timeInterval = setInterval(() => {
        this.ws.send(JSON.stringify({
          "ping": new Date().getTime()
        }));
      }, 3000);

      if (this.interval) {
        if (this.interval == '4hour') {
          this.interval = '240';
        } else if (this.interval == '1day') {
          this.interval = '1D';
        } else if (this.interval == '1week' || this.interval == '10080') {
          this.interval = '10080';
        } else if (this.interval == '1mon' || this.interval == '43200') {
          this.interval = '43200';
        }
      }

      const ticker = `${this.symbol}-${this.interval}`;
      let tickerstate = ticker + "state";
      let tickerCallback = ticker + "Callback";
      let onLoadedCallback = this.cacheData[tickerCallback]; //第一次获取数据 或则数组存在其一就进入

      if (!isSinge && data.data && data.data.lines && data.data.lines.length) {
        //加载一次性数据是成功
        this.isLoadingState = true;

        if (data.data.lines.length < 180) {
          this.connState = 2;
        }

        const list = [];
        data.data.lines.forEach(item => {
          list.push({
            time: item[0],
            open: item[1],
            //当天开盘价
            high: item[2],
            //当天最高价
            low: item[3],
            //当天最低价
            close: item[4],
            //当天收盘价
            volume: item[5] //当天成交量

          });
        }); //如果没有缓存数据，则直接填充，发起订阅

        if (!this.cacheData[ticker]) {
          this.cacheData[ticker] = list;
        } //新数据即当前时间段需要的数据，直接喂给图表插件


        if (onLoadedCallback) {
          onLoadedCallback(list);
          delete this.cacheData[tickerCallback];
        } //请求完成，设置状态为false


        this.cacheData[tickerstate] = !1; //记录当前缓存时间，即数组最后一位的时间
        // this.lastTime = list[list.length - 1].time

        this.lastTime = list[0].time; // if (data.data.lines.length < 50) {
        //   this.isLoadingState = true
        //   onLoadedCallback([], { noData: true })
        // }
      } else {
        this.isLoadingState = true;
        onLoadedCallback([], {
          noData: true
        });
      } // if (data.data && data.data.coinTeam) {


      if (isSinge) {
        this.depthsData = data.depth; // 单挑数据加载

        const list = [];
        const ticker = `${this.symbol}-${this.interval}`;
        let tickerstate = ticker + "state";
        let tickerCallback = ticker + "Callback";
        let onLoadedCallback = this.cacheData[tickerCallback]; //判断是否是初始化数据为空 initState 判断是否初始化过了
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
          open: data.data[1],
          //当天开盘价
          high: data.data[2],
          //当天最高价
          low: data.data[3],
          //当天最低价
          close: data.data[4],
          //当天收盘价
          volume: data.data[5] //当天成交量

        }; //如果增量更新数据的时间大于缓存时间，而且缓存有数据，数据长度大于0

        if (barsData.time > this.lastTime && this.cacheData[ticker] && this.cacheData[ticker].length) {
          //增量更新的数据直接加入缓存数组
          this.cacheData[ticker].push(barsData); //修改缓存时间

          this.lastTime = barsData.time;
        } else if (barsData.time >= this.lastTime && this.cacheData[ticker] && this.cacheData[ticker].length) {
          //如果增量更新的时间等于缓存时间，即在当前时间颗粒内产生了新数据，更新当前数据
          this.cacheData[ticker][this.cacheData[ticker].length - 1] = barsData;
        } // 通知图表插件，可以开始增量更新的渲染了


        this.datafeeds.barsUpdater.updateData();
      }

      this.widgetloading = false; //设置为true代表为已经初始化过了

      this.initState = true;
    },

    getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback) {
      if (this.interval) {
        if (this.interval == '4hour') {
          this.interval = resolution = '240';
        }

        if (this.interval == '1day') {
          this.interval = resolution = '1D';
        }

        if (this.interval == '1week' || this.interval == '10080') {
          this.interval = resolution = '10080';
        }

        if (this.interval == '1mon' || this.interval == '43200') {
          this.interval = resolution = '43200';
        }
      }

      let ticker = this.symbol + "-" + this.interval;
      let tickerload = ticker + "load";
      let tickerstate = ticker + "state";

      if (!this.cacheData[ticker] && !this.cacheData[tickerstate]) {
        //如果缓存没有数据，而且未发出请求，记录当前节点开始时间
        this.cacheData[tickerload] = rangeStartDate; //发起请求，从websocket获取当前时间段的数据

        this.initMessage(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback); //设置状态为true

        this.cacheData[tickerstate] = !0;
        return false;
      }

      if (!this.cacheData[tickerload] || this.cacheData[tickerload] > rangeStartDate) {
        //如果缓存有数据，但是没有当前时间段的数据，更新当前节点时间
        this.cacheData[tickerload] = rangeStartDate; //发起请求，从websocket获取当前时间段的数据

        this.initMessage(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback); //设置状态为true

        this.cacheData[tickerstate] = !0;
        return false;
      }

      if (this.cacheData[tickerstate]) {//正在从websocket获取数据，禁止一切操作
        // return false;
      }

      if (this.cacheData[ticker] && this.cacheData[ticker].length) {
        this.isLoading = false;
        const newBars = [];
        this.cacheData[ticker].forEach((item, index) => {
          if (item.time >= rangeStartDate * 1000 && item.time <= rangeEndDate * 1000) {
            newBars.push(item);
          }
        });
        onLoadedCallback(newBars);
      } else {
        this.getBarTimer = setTimeout(() => {
          this.getBars(symbolInfo, this.interval, rangeStartDate, rangeEndDate, onLoadedCallback);
        }, 10);
      }
    },

    initMessage(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback) {
      //保留当前回调
      var tickerCallback = this.symbol + "-" + this.interval + "Callback";
      this.cacheData[tickerCallback] = onLoadedCallback; //获取当前时间段的数据，在onMessage中执行回调onLoadedCallback

      this.reqWebsocketData(rangeStartDate);
    }

  }
});
// CONCATENATED MODULE: ./components/HashRate/tradeView.vue?vue&type=script&lang=js&
 /* harmony default export */ var HashRate_tradeViewvue_type_script_lang_js_ = (tradeViewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./components/HashRate/tradeView.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(281)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  HashRate_tradeViewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "77f374d8",
  "1a592ed4"
  
)

/* harmony default export */ var tradeView = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=hash-rate-trade-view.js.map