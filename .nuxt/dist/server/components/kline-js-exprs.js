exports.ids = [31];
exports.modules = {

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExprEnv", function() { return ExprEnv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Expr", function() { return Expr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenExpr", function() { return OpenExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HighExpr", function() { return HighExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LowExpr", function() { return LowExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloseExpr", function() { return CloseExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VolumeExpr", function() { return VolumeExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConstExpr", function() { return ConstExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParameterExpr", function() { return ParameterExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpAExpr", function() { return OpAExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpABExpr", function() { return OpABExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpABCExpr", function() { return OpABCExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpABCDExpr", function() { return OpABCDExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NegExpr", function() { return NegExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddExpr", function() { return AddExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubExpr", function() { return SubExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MulExpr", function() { return MulExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DivExpr", function() { return DivExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GtExpr", function() { return GtExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeExpr", function() { return GeExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LtExpr", function() { return LtExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeExpr", function() { return LeExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EqExpr", function() { return EqExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaxExpr", function() { return MaxExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbsExpr", function() { return AbsExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RefExpr", function() { return RefExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AndExpr", function() { return AndExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrExpr", function() { return OrExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IfExpr", function() { return IfExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignExpr", function() { return AssignExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutputExpr", function() { return OutputExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RangeOutputExpr", function() { return RangeOutputExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RangeExpr", function() { return RangeExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HhvExpr", function() { return HhvExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LlvExpr", function() { return LlvExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CountExpr", function() { return CountExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SumExpr", function() { return SumExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StdExpr", function() { return StdExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaExpr", function() { return MaExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmaExpr", function() { return EmaExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpmemaExpr", function() { return ExpmemaExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmaExpr", function() { return SmaExpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SarExpr", function() { return SarExpr; });
class ExprEnv {
  static get() {
    return this.inst;
  }

  static set(env) {
    this.inst = env;
  }

  getDataSource() {
    return this._ds;
  }

  setDataSource(ds) {
    return this._ds = ds;
  }

  getFirstIndex() {
    return this._firstIndex;
  }

  setFirstIndex(n) {
    return this._firstIndex = n;
  }

}
ExprEnv.inst = null;
ExprEnv._ds = null;
ExprEnv._firstIndex = null;
class Expr {
  constructor() {
    this._rid = 0;
  }

  execute(index) {}

  reserve(rid, count) {}

  clear() {}

}
class OpenExpr extends Expr {
  execute(index) {
    return ExprEnv.get()._ds.getDataAt(index).open;
  }

}
class HighExpr extends Expr {
  execute(index) {
    return ExprEnv.get()._ds.getDataAt(index).high;
  }

}
class LowExpr extends Expr {
  execute(index) {
    return ExprEnv.get()._ds.getDataAt(index).low;
  }

}
class CloseExpr extends Expr {
  execute(index) {
    return ExprEnv.get()._ds.getDataAt(index).close;
  }

}
class VolumeExpr extends Expr {
  execute(index) {
    return ExprEnv.get()._ds.getDataAt(index).volume;
  }

}
class ConstExpr extends Expr {
  constructor(v) {
    super();
    this._value = v;
  }

  execute(index) {
    return this._value;
  }

}
class ParameterExpr extends Expr {
  constructor(name, minValue, maxValue, defaultValue) {
    super();
    this._name = name;
    this._minValue = minValue;
    this._maxValue = maxValue;
    this._value = this._defaultValue = defaultValue;
  }

  execute(index) {
    return this._value;
  }

  getMinValue() {
    return this._minValue;
  }

  getMaxValue() {
    return this._maxValue;
  }

  getDefaultValue() {
    return this._defaultValue;
  }

  getValue() {
    return this._value;
  }

  setValue(v) {
    if (v === 0) this._value = 0;else if (v < this._minValue) this._value = this._minValue;else if (v > this._maxValue) this._value = this._maxValue;else this._value = v;
  }

}
class OpAExpr extends Expr {
  constructor(a) {
    super();
    this._exprA = a;
  }

  reserve(rid, count) {
    if (this._rid < rid) {
      this._rid = rid;

      this._exprA.reserve(rid, count);
    }
  }

  clear() {
    this._exprA.clear();
  }

}
class OpABExpr extends Expr {
  constructor(a, b) {
    super();
    this._exprA = a;
    this._exprB = b;
  }

  reserve(rid, count) {
    if (this._rid < rid) {
      this._rid = rid;

      this._exprA.reserve(rid, count);

      this._exprB.reserve(rid, count);
    }
  }

  clear() {
    this._exprA.clear();

    this._exprB.clear();
  }

}
class OpABCExpr extends Expr {
  constructor(a, b, c) {
    super();
    this._exprA = a;
    this._exprB = b;
    this._exprC = c;
  }

  reserve(rid, count) {
    if (this._rid < rid) {
      this._rid = rid;

      this._exprA.reserve(rid, count);

      this._exprB.reserve(rid, count);

      this._exprC.reserve(rid, count);
    }
  }

  clear() {
    this._exprA.clear();

    this._exprB.clear();

    this._exprC.clear();
  }

}
class OpABCDExpr extends Expr {
  constructor(a, b, c, d) {
    super();
    this._exprA = a;
    this._exprB = b;
    this._exprC = c;
    this._exprD = d;
  }

  reserve(rid, count) {
    if (this._rid < rid) {
      this._rid = rid;

      this._exprA.reserve(rid, count);

      this._exprB.reserve(rid, count);

      this._exprC.reserve(rid, count);

      this._exprD.reserve(rid, count);
    }
  }

  clear() {
    this._exprA.clear();

    this._exprB.clear();

    this._exprC.clear();

    this._exprD.clear();
  }

}
class NegExpr extends OpAExpr {
  constructor(a) {
    super(a);
  }

  execute(index) {
    return -this._exprA.execute(index);
  }

}
class AddExpr extends OpABExpr {
  constructor(a, b) {
    super(a, b);
  }

  execute(index) {
    return this._exprA.execute(index) + this._exprB.execute(index);
  }

}
class SubExpr extends OpABExpr {
  constructor(a, b) {
    super(a, b);
  }

  execute(index) {
    return this._exprA.execute(index) - this._exprB.execute(index);
  }

}
class MulExpr extends OpABExpr {
  constructor(a, b) {
    super(a, b);
  }

  execute(index) {
    return this._exprA.execute(index) * this._exprB.execute(index);
  }

}
class DivExpr extends OpABExpr {
  constructor(a, b) {
    super(a, b);
  }

  execute(index) {
    let a = this._exprA.execute(index);

    let b = this._exprB.execute(index);

    if (a === 0) return a;
    if (b === 0) return a > 0 ? 1000000 : -1000000;
    return a / b;
  }

}
class GtExpr extends OpABExpr {
  constructor(a, b) {
    super(a, b);
  }

  execute(index) {
    return this._exprA.execute(index) > this._exprB.execute(index) ? 1 : 0;
  }

}
class GeExpr extends OpABExpr {
  constructor(a, b) {
    super(a, b);
  }

  execute(index) {
    return this._exprA.execute(index) >= this._exprB.execute(index) ? 1 : 0;
  }

}
class LtExpr extends OpABExpr {
  constructor(a, b) {
    super(a, b);
  }

  execute(index) {
    return this._exprA.execute(index) < this._exprB.execute(index) ? 1 : 0;
  }

}
class LeExpr extends OpABExpr {
  constructor(a, b) {
    super(a, b);
  }

  execute(index) {
    return this._exprA.execute(index) <= this._exprB.execute(index) ? 1 : 0;
  }

}
class EqExpr extends OpABExpr {
  constructor(a, b) {
    super(a, b);
  }

  execute(index) {
    return this._exprA.execute(index) === this._exprB.execute(index) ? 1 : 0;
  }

}
class MaxExpr extends OpABExpr {
  constructor(a, b) {
    super(a, b);
  }

  execute(index) {
    return Math.max(this._exprA.execute(index), this._exprB.execute(index));
  }

}
class AbsExpr extends OpAExpr {
  constructor(a) {
    super(a);
  }

  execute(index) {
    return Math.abs(this._exprA.execute(index));
  }

}
class RefExpr extends OpABExpr {
  constructor(a, b) {
    super(a, b);
  }

  execute(index) {
    if (this._offset === undefined || this._offset < 0) {
      this._offset = this._exprB.execute(index);

      if (this._offset < 0) {
        throw "offset < 0";
      }
    }

    index -= this._offset;

    if (index < 0) {
      throw "index < 0";
    }

    let result = this._exprA.execute(index);

    if (isNaN(result)) {
      throw "NaN";
    }

    return result;
  }

}
class AndExpr extends OpABExpr {
  constructor(a, b) {
    super(a, b);
  }

  execute(index) {
    return this._exprA.execute(index) !== 0 && this._exprB.execute(index) !== 0 ? 1 : 0;
  }

}
class OrExpr extends OpABExpr {
  constructor(a, b) {
    super(a, b);
  }

  execute(index) {
    return this._exprA.execute(index) !== 0 || this._exprB.execute(index) !== 0 ? 1 : 0;
  }

}
class IfExpr extends OpABCExpr {
  constructor(a, b, c) {
    super(a, b, c);
  }

  execute(index) {
    return this._exprA.execute(index) !== 0 ? this._exprB.execute(index) : this._exprC.execute(index);
  }

}
class AssignExpr extends OpAExpr {
  constructor(name, a) {
    super(a);
    this._name = name;
    this._buf = [];
  }

  getName() {
    return this._name;
  }

  execute(index) {
    return this._buf[index];
  }

  assign(index) {
    this._buf[index] = this._exprA.execute(index);

    if (ExprEnv.get()._firstIndex >= 0) {
      if (isNaN(this._buf[index]) && !isNaN(this._buf[index - 1])) {
        throw this._name + ".assign(" + index + "): NaN";
      }
    }
  }

  reserve(rid, count) {
    if (this._rid < rid) {
      for (let c = count; c > 0; c--) {
        this._buf.push(NaN);
      }
    }

    super.reserve(rid, count);
  }

  clear() {
    super.clear();
    this._buf = [];
  }

}
class OutputExpr extends AssignExpr {
  constructor(name, a, style, color) {
    super(name, a);
    this._style = style === undefined ? OutputExpr.outputStyle.Line : style;
    this._color = color;
  }

  getStyle() {
    return this._style;
  }

  getColor() {
    return this._color;
  }

}
OutputExpr.outputStyle = {
  None: 0,
  Line: 1,
  VolumeStick: 2,
  MACDStick: 3,
  SARPoint: 4
};
class RangeOutputExpr extends OutputExpr {
  constructor(name, a, style, color) {
    super(name, a, style, color);
  }

  getName() {
    return this._name + this._exprA.getRange();
  }

}
class RangeExpr extends OpABExpr {
  constructor(a, b) {
    super(a, b);
    this._range = -1;
    this._buf = [];
  }

  getRange() {
    return this._range;
  }

  initRange() {
    this._range = this._exprB.execute(0);
  }

  execute(index) {
    if (this._range < 0) {
      this.initRange();
    }

    let rA = this._buf[index].resultA = this._exprA.execute(index);

    return this._buf[index].result = this.calcResult(index, rA);
  }

  reserve(rid, count) {
    if (this._rid < rid) {
      for (let c = count; c > 0; c--) {
        this._buf.push({
          resultA: NaN,
          result: NaN
        });
      }
    }

    super.reserve(rid, count);
  }

  clear() {
    super.clear();
    this._range = -1;
    this._buf = [];
  }

}
class HhvExpr extends RangeExpr {
  constructor(a, b) {
    super(a, b);
  }

  calcResult(index, resultA) {
    if (this._range === 0) {
      return NaN;
    }

    let first = ExprEnv.get()._firstIndex;

    if (first < 0) {
      return resultA;
    }

    if (index > first) {
      let n = this._range;
      let result = resultA;
      let start = index - n + 1;
      let i = Math.max(first, start);

      for (; i < index; i++) {
        let p = this._buf[i];

        if (result < p.resultA) {
          result = p.resultA;
        }
      }

      return result;
    } else {
      return resultA;
    }
  }

}
class LlvExpr extends RangeExpr {
  constructor(a, b) {
    super(a, b);
  }

  calcResult(index, resultA) {
    if (this._range === 0) return NaN;

    let first = ExprEnv.get()._firstIndex;

    if (first < 0) return resultA;

    if (index > first) {
      let n = this._range;
      let result = resultA;
      let start = index - n + 1;
      let i = Math.max(first, start);

      for (; i < index; i++) {
        let p = this._buf[i];
        if (result > p.resultA) result = p.resultA;
      }

      return result;
    } else {
      return resultA;
    }
  }

}
class CountExpr extends RangeExpr {
  constructor(a, b) {
    super(a, b);
  }

  calcResult(index, resultA) {
    if (this._range === 0) return NaN;

    let first = ExprEnv.get()._firstIndex;

    if (first < 0) return 0;

    if (index >= first) {
      let n = this._range - 1;
      if (n > index - first) n = index - first;
      let count = 0;

      for (; n >= 0; n--) {
        if (this._buf[index - n].resultA !== 0.0) count++;
      }

      return count;
    } else {
      return 0;
    }
  }

}
class SumExpr extends RangeExpr {
  constructor(a, b) {
    super(a, b);
  }

  calcResult(index, resultA) {
    let first = ExprEnv.get()._firstIndex;

    if (first < 0) return resultA;

    if (index > first) {
      let n = this._range;

      if (n === 0 || n >= index + 1 - first) {
        return this._buf[index - 1].result + resultA;
      }

      return this._buf[index - 1].result + resultA - this._buf[index - n].resultA;
    } else {
      return resultA;
    }
  }

}
class StdExpr extends RangeExpr {
  constructor(a, b) {
    super(a, b);
  }

  calcResult(index, resultA) {
    if (this._range === 0) return NaN;
    let stdData = this._stdBuf[index];

    let first = ExprEnv.get()._firstIndex;

    if (first < 0) {
      stdData.resultMA = resultA;
      return 0.0;
    }

    if (index > first) {
      let n = this._range;

      if (n >= index + 1 - first) {
        n = index + 1 - first;
        stdData.resultMA = this._stdBuf[index - 1].resultMA * (1.0 - 1.0 / n) + resultA / n;
      } else {
        stdData.resultMA = this._stdBuf[index - 1].resultMA + (resultA - this._buf[index - n].resultA) / n;
      }

      let sum = 0;

      for (let i = index - n + 1; i <= index; i++) sum += Math.pow(this._buf[i].resultA - stdData.resultMA, 2);

      return Math.sqrt(sum / n);
    }

    stdData.resultMA = resultA;
    return 0.0;
  }

  reserve(rid, count) {
    if (this._rid < rid) {
      for (let c = count; c > 0; c--) this._stdBuf.push({
        resultMA: NaN
      });
    }

    super.reserve(rid, count);
  }

  clear() {
    super.clear();
    this._stdBuf = [];
  }

}
class MaExpr extends RangeExpr {
  constructor(a, b) {
    super(a, b);
  }

  calcResult(index, resultA) {
    if (this._range === 0) return NaN;

    let first = ExprEnv.get()._firstIndex;

    if (first < 0) return resultA;

    if (index > first) {
      let n = this._range;

      if (n >= index + 1 - first) {
        n = index + 1 - first;
        return this._buf[index - 1].result * (1.0 - 1.0 / n) + resultA / n;
      }

      return this._buf[index - 1].result + (resultA - this._buf[index - n].resultA) / n;
    } else {
      return resultA;
    }
  }

}
class EmaExpr extends RangeExpr {
  constructor(a, b) {
    super(a, b);
  }

  initRange() {
    super.initRange();
    this._alpha = 2.0 / (this._range + 1);
  }

  calcResult(index, resultA) {
    if (this._range === 0) return NaN;

    let first = ExprEnv.get()._firstIndex;

    if (first < 0) return resultA;

    if (index > first) {
      let prev = this._buf[index - 1];
      return this._alpha * (resultA - prev.result) + prev.result;
    }

    return resultA;
  }

}
class ExpmemaExpr extends EmaExpr {
  constructor(a, b) {
    super(a, b);
  }

  calcResult(index, resultA) {
    let first = ExprEnv.get()._firstIndex;

    if (first < 0) return resultA;

    if (index > first) {
      let n = this._range;
      let prev = this._buf[index - 1];

      if (n >= index + 1 - first) {
        n = index + 1 - first;
        return prev.result * (1.0 - 1.0 / n) + resultA / n;
      }

      return this._alpha * (resultA - prev.result) + prev.result;
    }

    return resultA;
  }

}
class SmaExpr extends RangeExpr {
  constructor(a, b, c) {
    super(a, b);
    this._exprC = c;
    this._mul = null;
  }

  initRange() {
    super.initRange();
    this._mul = this._exprC.execute(0);
  }

  calcResult(index, resultA) {
    if (this._range === 0) return NaN;

    let first = ExprEnv.get()._firstIndex;

    if (first < 0) return resultA;

    if (index > first) {
      let n = this._range;
      if (n > index + 1 - first) n = index + 1 - first;
      return ((n - 1) * this._buf[index - 1].result + resultA * this._mul) / n;
    }

    return resultA;
  }

}
class SarExpr extends OpABCDExpr {
  constructor(a, b, c, d) {
    super(a, b, c, d);
    this._buf = [];
    this._range = -1;
    this._min = null;
    this._step = null;
    this._max = null;
  }

  execute(index) {
    if (this._range < 0) {
      this._range = this._exprA.execute(0);
      this._min = this._exprB.execute(0) / 100.0;
      this._step = this._exprC.execute(0) / 100.0;
      this._max = this._exprD.execute(0) / 100.0;
    }

    let data = this._buf[index];
    let exprEnv = ExprEnv.get();
    let first = exprEnv._firstIndex;

    if (first < 0) {
      data.longPos = true;
      data.sar = exprEnv._ds.getDataAt(index).low;
      data.ep = exprEnv._ds.getDataAt(index).high;
      data.af = 0.02;
    } else {
      let high = exprEnv._ds.getDataAt(index).high;

      let low = exprEnv._ds.getDataAt(index).low;

      let prev = this._buf[index - 1];
      data.sar = prev.sar + prev.af * (prev.ep - prev.sar);

      if (prev.longPos) {
        data.longPos = true;

        if (high > prev.ep) {
          data.ep = high;
          data.af = Math.min(prev.af + this._step, this._max);
        } else {
          data.ep = prev.ep;
          data.af = prev.af;
        }

        if (data.sar > low) {
          data.longPos = false;
          let i = index - this._range + 1;

          for (i = Math.max(i, first); i < index; i++) {
            let h = exprEnv._ds.getDataAt(i).high;

            if (high < h) high = h;
          }

          data.sar = high;
          data.ep = low;
          data.af = 0.02;
        }
      } else {
        data.longPos = false;

        if (low < prev.ep) {
          data.ep = low;
          data.af = Math.min(prev.af + this._step, this._max);
        } else {
          data.ep = prev.ep;
          data.af = prev.af;
        }

        if (data.sar < high) {
          data.longPos = true;
          let i = index - this._range + 1;

          for (i = Math.max(i, first); i < index; i++) {
            let l = exprEnv._ds.getDataAt(i).low;

            if (low > l) low = l;
          }

          data.sar = low;
          data.ep = high;
          data.af = 0.02;
        }
      }
    }

    return data.sar;
  }

  reserve(rid, count) {
    if (this._rid < rid) {
      for (let c = count; c > 0; c--) this._buf.push({
        longPos: true,
        sar: NaN,
        ep: NaN,
        af: NaN
      });
    }

    super.reserve(rid, count);
  }

  clear() {
    super.clear();
    this._range = -1;
  }

}

/***/ })

};;
//# sourceMappingURL=kline-js-exprs.js.map