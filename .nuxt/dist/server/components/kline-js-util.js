exports.ids = [34];
exports.modules = {

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return Util; });
class Util {
  static fromFloat(v, fractionDigits) {
    let text = v.toFixed(fractionDigits);

    for (let i = text.length - 1; i >= 0; i--) {
      if (text[i] === '.') return text.substring(0, i);
      if (text[i] !== '0') return text.substring(0, i + 1);
    }
  }

  static formatTime(v) {
    return v < 10 ? "0" + v.toString() : v.toString();
  }

  static isInstance(obj, clazz) {
    if (obj === null || obj === undefined) {
      return false;
    }

    return obj instanceof clazz;
  }

}

/***/ })

};;
//# sourceMappingURL=kline-js-util.js.map