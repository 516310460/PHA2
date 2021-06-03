exports.ids = [32];
exports.modules = {

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEvent", function() { return MEvent; });
class MEvent {
  constructor() {
    this._handlers = [];
  }

  addHandler(o, f) {
    if (this.indexOf(o, f) < 0) this._handlers.push({
      obj: o,
      func: f
    });
  }

  removeHandler(o, f) {
    let i = this.indexOf(o, f);
    if (i >= 0) this._handlers.splice(i, 1);
  }

  raise(s, g) {
    let a = this._handlers;
    let e,
        i,
        c = a.length;

    for (i = 0; i < c; i++) {
      e = a[i];
      e.func(s, g);
    }
  }

  indexOf(o, f) {
    let a = this._handlers;
    let e,
        i,
        c = a.length;

    for (i = 0; i < c; i++) {
      e = a[i];
      if (o === e.obj && f === e.func) return i;
    }

    return -1;
  }

}

/***/ })

};;
//# sourceMappingURL=kline-js-mevent.js.map