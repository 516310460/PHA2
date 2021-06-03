exports.ids = [6];
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

/***/ })

};;
//# sourceMappingURL=hash-rate-datafeeds-data-updater.js.map