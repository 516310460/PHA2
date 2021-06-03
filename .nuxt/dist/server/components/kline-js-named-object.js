exports.ids = [33,30];
exports.modules = {

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NamedObject", function() { return NamedObject; });
/* harmony import */ var _cname__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(185);

class NamedObject {
  constructor(name) {
    this._name = name;
    this._nameObj = new _cname__WEBPACK_IMPORTED_MODULE_0__["CName"](name);
  }

  getFrameName() {
    return this._nameObj.getName(0);
  }

  getDataSourceName() {
    return this._nameObj.getName(1);
  }

  getAreaName() {
    return this._nameObj.getName(2);
  }

  getName() {
    return this._nameObj.getName(-1);
  }

  getNameObject() {
    return this._nameObj;
  }

  getRectCrossPt(rect, startPt, endPt) {
    let crossPt;
    let firstPt = {
      x: -1,
      y: -1
    };
    let secondPt = {
      x: -1,
      y: -1
    };
    let xdiff = endPt.x - startPt.x;
    let ydiff = endPt.y - startPt.y;

    if (Math.abs(xdiff) < 2) {
      firstPt = {
        x: startPt.x,
        y: rect.top
      };
      secondPt = {
        x: endPt.x,
        y: rect.bottom
      };
      crossPt = [firstPt, secondPt];
      return crossPt;
    }

    let k = ydiff / xdiff;
    secondPt.x = rect.right;
    secondPt.y = startPt.y + (rect.right - startPt.x) * k;
    firstPt.x = rect.left;
    firstPt.y = startPt.y + (rect.left - startPt.x) * k;
    crossPt = [firstPt, secondPt];
    return crossPt;
  }

}

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CName", function() { return CName; });
class CName {
  constructor(name) {
    this._names = [];
    this._comps = [];

    if (name instanceof CName) {
      this._names = name._names;
      this._comps = name._comps;
    } else {
      let comps = name.split(".");
      let dotNum = comps.length - 1;

      if (dotNum > 0) {
        this._comps = comps;

        this._names.push(comps[0]);

        for (let i = 1; i <= dotNum; i++) {
          this._names.push(this._names[i - 1] + "." + comps[i]);
        }
      } else {
        this._comps.push(name);

        this._names.push(name);
      }
    }
  }

  getCompAt(index) {
    if (index >= 0 && index < this._comps.length) return this._comps[index];
    return "";
  }

  getName(index) {
    if (index < 0) {
      if (this._names.length > 0) return this._names[this._names.length - 1];
    } else if (index < this._names.length) {
      return this._names[index];
    }

    return "";
  }

}

/***/ })

};;
//# sourceMappingURL=kline-js-named-object.js.map