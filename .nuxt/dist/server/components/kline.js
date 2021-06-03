exports.ids = [0,30,31,32,33,34];
exports.modules = {

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartManager", function() { return ChartManager; });
/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(205);
/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(337);
/* harmony import */ var _indicators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(338);
/* harmony import */ var _ranges__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(243);
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(206);
/* harmony import */ var _data_sources__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(152);
/* harmony import */ var _chart_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(186);
/* harmony import */ var _data_providers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(211);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(187);
/* harmony import */ var _plotters__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(209);
/* harmony import */ var _ctools__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(208);
/* harmony import */ var _areas__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(204);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(158);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(137);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_13__);















__webpack_require__(141);

class ChartManager {
  constructor() {
    this._dataSources = {};
    this._dataSourceCache = {};
    this._dataProviders = {};
    this._frames = {};
    this._areas = {};
    this._timelines = {};
    this._ranges = {};
    this._plotters = {};
    this._themes = {};
    this._titles = {};
    this._frameMousePos = {};
    this._dsChartStyle = {};
    this._dragStarted = false;
    this._oldX = 0;
    this._fakeIndicators = {};
    this._captureMouseWheelDirectly = true;
    this._chart = {};
    this._chart.defaultFrame = new _chart__WEBPACK_IMPORTED_MODULE_1__["Chart"]();
    this._drawingTool = ChartManager.DrawingTool["CrossCursor"];
    this._beforeDrawingTool = this._drawingTool;
    this._language = "zh-cn";
    this._mainCanvas = null;
    this._overlayCanvas = null;
    this._mainContext = null;
    this._overlayContext = null;

    if (!ChartManager.created) {
      ChartManager.instance = this;
      ChartManager.created = true;
    }

    return ChartManager.instance;
  }

  redraw(layer, refresh) {
    if (layer === undefined || refresh) {
      layer = "All";
    }

    if (layer === "All" || layer === "MainCanvas") {
      if (refresh) {
        this.getFrame("frame0").setChanged(true);
      }

      this.layout(this._mainContext, "frame0", 0, 0, this._mainCanvas.width, this._mainCanvas.height);
      this.drawMain("frame0", this._mainContext);
    }

    if (layer === "All" || layer === "OverlayCanvas") {
      this._overlayContext.clearRect(0, 0, this._overlayCanvas.width, this._overlayCanvas.height);

      this.drawOverlay("frame0", this._overlayContext);
    }
  }

  bindCanvas(layer, canvas) {
    if (layer === "main") {
      this._mainCanvas = canvas;
      this._mainContext = canvas.getContext("2d");
    } else if (layer === "overlay") {
      this._overlayCanvas = canvas;
      this._overlayContext = canvas.getContext("2d");

      if (this._captureMouseWheelDirectly) {
        jquery__WEBPACK_IMPORTED_MODULE_13___default()(this._overlayCanvas).bind('mousewheel', _control__WEBPACK_IMPORTED_MODULE_0__["Control"].mouseWheel);
      }
    }
  }

  getCaptureMouseWheelDirectly() {
    return this._captureMouseWheelDirectly;
  }

  setCaptureMouseWheelDirectly(v) {
    this._captureMouseWheelDirectly = v;
    if (v) jquery__WEBPACK_IMPORTED_MODULE_13___default()(this._overlayCanvas).bind('mousewheel', _control__WEBPACK_IMPORTED_MODULE_0__["Control"].mouseWheel);else jquery__WEBPACK_IMPORTED_MODULE_13___default()(this._overlayCanvas).unbind('mousewheel');
  }

  getChart(nouseParam) {
    return this._chart["defaultFrame"];
  }

  init() {
    delete this._ranges['frame0.k0.indic1'];
    delete this._ranges['frame0.k0.indic1Range'];
    delete this._areas['frame0.k0.indic1'];
    delete this._areas['frame0.k0.indic1Range'];
    _templates__WEBPACK_IMPORTED_MODULE_4__["DefaultTemplate"].loadTemplate("frame0.k0", "");
    this.redraw('All', true);
  }

  setCurrentDrawingTool(paramTool) {
    this._drawingTool = ChartManager.DrawingTool[paramTool];
    this.setRunningMode(this._drawingTool);
  }

  getLanguage() {
    return this._language;
  }

  setLanguage(lang) {
    this._language = lang;
  }

  setThemeName(frameName, themeName) {
    if (themeName === undefined) themeName = "Dark";
    let theme;

    switch (themeName) {
      case "Light":
        theme = new _themes__WEBPACK_IMPORTED_MODULE_8__["LightTheme"]();
        break;

      default:
        themeName = "Dark";
        theme = new _themes__WEBPACK_IMPORTED_MODULE_8__["DarkTheme"]();
        break;
    }

    this._themeName = themeName;
    this.setTheme(frameName, theme);
    this.getFrame(frameName).setChanged(true);
  }

  getChartStyle(dsName) {
    let chartStyle = this._dsChartStyle[dsName];
    if (chartStyle === undefined) return "CandleStick";
    return chartStyle;
  }

  setChartStyle(dsName, style) {
    if (this._dsChartStyle[dsName] === style) return;
    let areaName = dsName + ".main";
    let dpName = areaName + ".main";
    let plotterName = areaName + ".main";
    let dp, plotter;

    switch (style) {
      case "CandleStick":
      case "CandleStickHLC":
      case "OHLC":
        dp = this.getDataProvider(dpName);

        if (dp === undefined || !_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(dp, _data_providers__WEBPACK_IMPORTED_MODULE_7__["MainDataProvider"])) {
          dp = new _data_providers__WEBPACK_IMPORTED_MODULE_7__["MainDataProvider"](dpName);
          this.setDataProvider(dpName, dp);
          dp.updateData();
        }

        this.setMainIndicator(dsName, _chart_settings__WEBPACK_IMPORTED_MODULE_6__["ChartSettings"].get().charts.mIndic);

        switch (style) {
          case "CandleStick":
            plotter = new _plotters__WEBPACK_IMPORTED_MODULE_9__["CandlestickPlotter"](plotterName);
            break;

          case "CandleStickHLC":
            plotter = new _plotters__WEBPACK_IMPORTED_MODULE_9__["CandlestickHLCPlotter"](plotterName);
            break;

          case "OHLC":
            plotter = new _plotters__WEBPACK_IMPORTED_MODULE_9__["OHLCPlotter"](plotterName);
            break;
        }

        this.setPlotter(plotterName, plotter);
        plotter = new _plotters__WEBPACK_IMPORTED_MODULE_9__["MinMaxPlotter"](areaName + ".decoration");
        this.setPlotter(plotter.getName(), plotter);
        break;

      case "Line":
        dp = new _data_providers__WEBPACK_IMPORTED_MODULE_7__["IndicatorDataProvider"](dpName);
        this.setDataProvider(dp.getName(), dp);
        dp.setIndicator(new _indicators__WEBPACK_IMPORTED_MODULE_2__["HLCIndicator"]());
        this.removeMainIndicator(dsName);
        plotter = new _plotters__WEBPACK_IMPORTED_MODULE_9__["IndicatorPlotter"](plotterName);
        this.setPlotter(plotterName, plotter);
        this.removePlotter(areaName + ".decoration");
        break;
    }

    this.getArea(plotter.getAreaName()).setChanged(true);
    this._dsChartStyle[dsName] = style;
  }

  setNormalMode() {
    this._drawingTool = this._beforeDrawingTool;
    jquery__WEBPACK_IMPORTED_MODULE_13___default()(".chart_dropdown_data").removeClass("chart_dropdown-hover");
    jquery__WEBPACK_IMPORTED_MODULE_13___default()("#chart_toolpanel .chart_toolpanel_button").removeClass("selected");
    jquery__WEBPACK_IMPORTED_MODULE_13___default()("#chart_CrossCursor").parent().addClass("selected");

    if (this._drawingTool === ChartManager.DrawingTool.Cursor) {
      this.showCursor();
      jquery__WEBPACK_IMPORTED_MODULE_13___default()("#mode a").removeClass("selected");
      jquery__WEBPACK_IMPORTED_MODULE_13___default()("#chart_toolpanel .chart_toolpanel_button").removeClass("selected");
      jquery__WEBPACK_IMPORTED_MODULE_13___default()("#chart_Cursor").parent().addClass("selected");
    } else {
      this.hideCursor();
    }
  }

  setRunningMode(mode) {
    let pds = this.getDataSource("frame0.k0");
    let curr_o = pds.getCurrentToolObject();

    if (curr_o !== null && curr_o.state !== _ctools__WEBPACK_IMPORTED_MODULE_10__["CToolObject"].state.AfterDraw) {
      pds.delToolObject();
    }

    if (pds.getToolObjectCount() > 10) {
      this.setNormalMode();
      return;
    }

    this._drawingTool = mode;

    if (mode === ChartManager.DrawingTool.Cursor) {
      this.showCursor();
    } else {}

    switch (mode) {
      case ChartManager.DrawingTool.Cursor:
        {
          this._beforeDrawingTool = mode;
          break;
        }

      case ChartManager.DrawingTool.ArrowLine:
        {
          pds.addToolObject(new _ctools__WEBPACK_IMPORTED_MODULE_10__["CArrowLineObject"]("frame0.k0"));
          break;
        }

      case ChartManager.DrawingTool.BandLine:
        {
          pds.addToolObject(new _ctools__WEBPACK_IMPORTED_MODULE_10__["CBandLineObject"]("frame0.k0"));
          break;
        }

      case ChartManager.DrawingTool.BiParallelLine:
        {
          pds.addToolObject(new _ctools__WEBPACK_IMPORTED_MODULE_10__["CBiParallelLineObject"]("frame0.k0"));
          break;
        }

      case ChartManager.DrawingTool.BiParallelRayLine:
        {
          pds.addToolObject(new _ctools__WEBPACK_IMPORTED_MODULE_10__["CBiParallelRayLineObject"]("frame0.k0"));
          break;
        }

      case ChartManager.DrawingTool.CrossCursor:
        {
          this._beforeDrawingTool = mode;
          break;
        }

      case ChartManager.DrawingTool.DrawFibFans:
        {
          pds.addToolObject(new _ctools__WEBPACK_IMPORTED_MODULE_10__["CFibFansObject"]("frame0.k0"));
          break;
        }

      case ChartManager.DrawingTool.DrawFibRetrace:
        {
          pds.addToolObject(new _ctools__WEBPACK_IMPORTED_MODULE_10__["CFibRetraceObject"]("frame0.k0"));
          break;
        }

      case ChartManager.DrawingTool.DrawLines:
        {
          pds.addToolObject(new _ctools__WEBPACK_IMPORTED_MODULE_10__["CStraightLineObject"]("frame0.k0"));
          break;
        }

      case ChartManager.DrawingTool.HoriRayLine:
        {
          pds.addToolObject(new _ctools__WEBPACK_IMPORTED_MODULE_10__["CHoriRayLineObject"]("frame0.k0"));
          break;
        }

      case ChartManager.DrawingTool.HoriSegLine:
        {
          pds.addToolObject(new _ctools__WEBPACK_IMPORTED_MODULE_10__["CHoriSegLineObject"]("frame0.k0"));
          break;
        }

      case ChartManager.DrawingTool.HoriStraightLine:
        {
          pds.addToolObject(new _ctools__WEBPACK_IMPORTED_MODULE_10__["CHoriStraightLineObject"]("frame0.k0"));
          break;
        }

      case ChartManager.DrawingTool.PriceLine:
        {
          pds.addToolObject(new _ctools__WEBPACK_IMPORTED_MODULE_10__["CPriceLineObject"]("frame0.k0"));
          break;
        }

      case ChartManager.DrawingTool.RayLine:
        {
          pds.addToolObject(new _ctools__WEBPACK_IMPORTED_MODULE_10__["CRayLineObject"]("frame0.k0"));
          break;
        }

      case ChartManager.DrawingTool.SegLine:
        {
          pds.addToolObject(new _ctools__WEBPACK_IMPORTED_MODULE_10__["CSegLineObject"]("frame0.k0"));
          break;
        }

      case ChartManager.DrawingTool.StraightLine:
        {
          pds.addToolObject(new _ctools__WEBPACK_IMPORTED_MODULE_10__["CStraightLineObject"]("frame0.k0"));
          break;
        }

      case ChartManager.DrawingTool.TriParallelLine:
        {
          pds.addToolObject(new _ctools__WEBPACK_IMPORTED_MODULE_10__["CTriParallelLineObject"]("frame0.k0"));
          break;
        }

      case ChartManager.DrawingTool.VertiStraightLine:
        {
          pds.addToolObject(new _ctools__WEBPACK_IMPORTED_MODULE_10__["CVertiStraightLineObject"]("frame0.k0"));
          break;
        }
    }
  }

  getTitle(dsName) {
    return this._titles[dsName];
  }

  setTitle(dsName, title) {
    this._titles[dsName] = title;
  }

  setCurrentDataSource(dsName, dsAlias, newData) {
    let cached = this.getCachedDataSource(dsAlias);
    /**
     * 312-325 lines is QQ "挺好!" add
     */
    // k线数据解析

    if (newData) {
      cached['_dataItems'].length = 0;
      const lines = [];
      newData.forEach(item => {
        const obj = {};
        obj['close'] = item[4];
        obj['date'] = item[0];
        obj['high'] = item[2];
        obj['low'] = item[3];
        obj['open'] = item[1];
        obj['volume'] = item[5];
        lines.push(obj);
      });
      cached['_dataItems'] = lines;
    }

    if (cached !== undefined && cached !== null) {
      this.setDataSource(dsName, cached, true);
    } else {
      cached = new _data_sources__WEBPACK_IMPORTED_MODULE_5__["MainDataSource"](dsAlias);
      this.setDataSource(dsName, cached, true);
      this.setCachedDataSource(dsAlias, cached);
    }
  }

  getDataSource(name) {
    return this._dataSources[name];
  }

  setDataSource(name, ds, forceRefresh) {
    this._dataSources[name] = ds;

    if (forceRefresh) {
      this.updateData(name, null);
    }
  }

  getCachedDataSource(name) {
    return this._dataSourceCache[name];
  }

  setCachedDataSource(name, ds) {
    this._dataSourceCache[name] = ds;
  }

  getDataProvider(name) {
    return this._dataProviders[name];
  }

  setDataProvider(name, dp) {
    this._dataProviders[name] = dp;
  }

  removeDataProvider(name) {
    delete this._dataProviders[name];
  }

  getFrame(name) {
    return this._frames[name];
  }

  setFrame(name, frame) {
    this._frames[name] = frame;
  }

  removeFrame(name) {
    delete this._frames[name];
  }

  getArea(name) {
    return this._areas[name];
  }

  setArea(name, area) {
    this._areas[name] = area;
  }

  removeArea(name) {
    delete this._areas[name];
  }

  getTimeline(name) {
    return this._timelines[name];
  }

  setTimeline(name, timeline) {
    this._timelines[name] = timeline;
  }

  removeTimeline(name) {
    delete this._timelines[name];
  }

  getRange(name) {
    return this._ranges[name];
  }

  setRange(name, range) {
    this._ranges[name] = range;
  }

  removeRange(name) {
    delete this._ranges[name];
  }

  getPlotter(name) {
    return this._plotters[name];
  }

  setPlotter(name, plotter) {
    this._plotters[name] = plotter;
  }

  removePlotter(name) {
    delete this._plotters[name];
  }

  getTheme(name) {
    return this._themes[name];
  }

  setTheme(name, theme) {
    this._themes[name] = theme;
  }

  getFrameMousePos(name, point) {
    if (this._frameMousePos[name] !== undefined) {
      point.x = this._frameMousePos[name].x;
      point.y = this._frameMousePos[name].y;
    } else {
      point.x = -1;
      point.y = -1;
    }
  }

  setFrameMousePos(name, px, py) {
    this._frameMousePos[name] = {
      x: px,
      y: py
    };
  }

  drawArea(context, area, plotterNames) {
    let areaName = area.getNameObject().getCompAt(2);

    if (areaName === "timeline") {
      if (area.getHeight() < 20) return;
    } else {
      if (area.getHeight() < 30) return;
    }

    if (area.getWidth() < 30) return;
    areaName = area.getName();
    let plotter;
    let i,
        cnt = plotterNames.length;

    for (i = 0; i < cnt; i++) {
      plotter = this._plotters[areaName + plotterNames[i]];
      if (plotter !== undefined) plotter.Draw(context);
    }
  }

  drawAreaMain(context, area) {
    let ds = this._dataSources[area.getDataSourceName()];

    let plotterNames;
    if (ds.getDataCount() < 1) plotterNames = [".background"];else plotterNames = [".background", ".grid", ".main", ".secondary"];
    this.drawArea(context, area, plotterNames);
    area.setChanged(false);
  }

  drawAreaOverlay(context, area) {
    let ds = this._dataSources[area.getDataSourceName()];

    let plotterNames;
    if (ds.getDataCount() < 1) plotterNames = [".selection"];else plotterNames = [".decoration", ".selection", ".info", ".tool"];
    this.drawArea(context, area, plotterNames);
  }

  drawMain(frameName, context) {
    let drawn = false;

    if (!drawn) {
      for (let it in this._areas) {
        if (this._areas[it].getFrameName() === frameName && !_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(this._areas[it], _areas__WEBPACK_IMPORTED_MODULE_11__["ChartAreaGroup"])) this.drawAreaMain(context, this._areas[it]);
      }
    }

    let e;

    for (let i in this._timelines) {
      e = this._timelines[i];
      if (e.getFrameName() === frameName) e.setUpdated(false);
    }

    for (let i in this._ranges) {
      e = this._ranges[i];
      if (e.getFrameName() === frameName) e.setUpdated(false);
    }

    for (let i in this._areas) {
      e = this._areas[i];
      if (e.getFrameName() === frameName) e.setChanged(false);
    }
  }

  drawOverlay(frameName, context) {
    for (let n in this._areas) {
      let area = this._areas[n];
      if (_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(area, _areas__WEBPACK_IMPORTED_MODULE_11__["ChartAreaGroup"])) if (area.getFrameName() === frameName) {
        area.drawGrid(context);
      }
    }

    for (let n in this._areas) {
      let area = this._areas[n];
      if (_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(area, _areas__WEBPACK_IMPORTED_MODULE_11__["ChartAreaGroup"]) === false) if (area.getFrameName() === frameName) {
        this.drawAreaOverlay(context, area);
      }
    }
  }

  updateData(dsName, data) {
    let ds = this.getDataSource(dsName);

    if (ds === undefined || ds === null) {
      return;
    }

    if (data !== undefined && data !== null) {
      if (!ds.update(data)) {
        return false;
      }

      if (ds.getUpdateMode() === _data_sources__WEBPACK_IMPORTED_MODULE_5__["DataSource"].UpdateMode.DoNothing) return true;
    } else {
      ds.setUpdateMode(_data_sources__WEBPACK_IMPORTED_MODULE_5__["DataSource"].UpdateMode.Refresh);
    }

    let timeline = this.getTimeline(dsName);

    if (timeline !== undefined && timeline !== null) {
      timeline.update();
    }

    if (ds.getDataCount() < 1) {
      return true;
    }

    let dpNames = [".main", ".secondary"];
    let area, areaName;

    for (let n in this._areas) {
      area = this._areas[n];

      if (_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(area, _areas__WEBPACK_IMPORTED_MODULE_11__["ChartAreaGroup"])) {
        continue;
      }

      if (area.getDataSourceName() !== dsName) {
        continue;
      }

      areaName = area.getName();

      for (let i = 0; i < dpNames.length; i++) {
        let dp = this.getDataProvider(areaName + dpNames[i]);

        if (dp !== undefined && dp !== null) {
          dp.updateData();
        }
      }
    }

    return true;
  }

  updateRange(dsName) {
    let ds = this.getDataSource(dsName);

    if (ds.getDataCount() < 1) {
      return;
    }

    let dpNames = [".main", ".secondary"];
    let area, areaName;

    for (let n in this._areas) {
      area = this._areas[n];
      if (_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(area, _areas__WEBPACK_IMPORTED_MODULE_11__["ChartAreaGroup"])) continue;
      if (area.getDataSourceName() !== dsName) continue;
      areaName = area.getName();

      for (let i = 0; i < dpNames.length; i++) {
        let dp = this.getDataProvider(areaName + dpNames[i]);

        if (dp !== undefined && dp !== null) {
          dp.updateRange();
        }
      }

      let timeline = this.getTimeline(dsName);

      if (timeline !== undefined && timeline.getMaxItemCount() > 0) {
        let range = this.getRange(areaName);

        if (range !== undefined && range !== null) {
          range.update();
        }
      }
    }
  }

  layout(context, frameName, left, top, right, bottom) {
    let frame = this.getFrame(frameName);
    frame.measure(context, right - left, bottom - top);
    frame.layout(left, top, right, bottom);

    for (let n in this._timelines) {
      let e = this._timelines[n];
      if (e.getFrameName() === frameName) e.onLayout();
    }

    for (let n in this._dataSources) {
      if (n.substring(0, frameName.length) === frameName) this.updateRange(n);
    }
  }

  SelectRange(pArea, y) {
    for (let ee in this._ranges) {
      let _1 = this._ranges[ee].getAreaName();

      let _2 = pArea.getName();

      if (_1 === _2) this._ranges[ee].selectAt(y);else this._ranges[ee].unselect();
    }
  }

  scale(s) {
    if (this._highlightedFrame === null) return;

    let hiArea = this._highlightedFrame.getHighlightedArea();

    if (this.getRange(hiArea.getName()) !== undefined) {
      let dsName = hiArea.getDataSourceName();
      let timeline = this.getTimeline(dsName);

      if (timeline !== null) {
        timeline.scale(s);
        this.updateRange(dsName);
      }
    }
  }

  showCursor(cursor) {
    if (cursor === undefined) cursor = 'default';
    this._mainCanvas.style.cursor = cursor;
    this._overlayCanvas.style.cursor = cursor;
  }

  hideCursor() {
    this._mainCanvas.style.cursor = 'none';
    this._overlayCanvas.style.cursor = 'none';
  }

  showCrossCursor(area, x, y) {
    let e = this.getRange(area.getName());

    if (e !== undefined) {
      e.selectAt(y);
      e = this.getTimeline(area.getDataSourceName());
      if (e !== undefined) if (e.selectAt(x)) return true;
    }

    return false;
  }

  hideCrossCursor(exceptTimeline) {
    if (exceptTimeline !== null && exceptTimeline !== undefined) {
      for (let n in this._timelines) {
        let e = this._timelines[n];

        if (e !== exceptTimeline) {
          e.unselect();
        }
      }
    } else {
      for (let n in this._timelines) this._timelines[n].unselect();
    }

    for (let n in this._ranges) this._ranges[n].unselect();
  }

  clearHighlight() {
    if (this._highlightedFrame !== null && this._highlightedFrame !== undefined) {
      this._highlightedFrame.highlight(null);

      this._highlightedFrame = null;
    }
  }

  onToolMouseMove(frameName, x, y) {
    let ret = false;
    frameName += ".";

    for (let n in this._dataSources) {
      if (n.indexOf(frameName) === 0) {
        let ds = this._dataSources[n];
        if (_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(ds, _data_sources__WEBPACK_IMPORTED_MODULE_5__["MainDataSource"])) if (ds.toolManager.acceptMouseMoveEvent(x, y)) ret = true;
      }
    }

    return ret;
  }

  onToolMouseDown(frameName, x, y) {
    let ret = false;
    frameName += ".";

    for (let n in this._dataSources) {
      if (n.indexOf(frameName) === 0) {
        let ds = this._dataSources[n];
        if (_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(ds, _data_sources__WEBPACK_IMPORTED_MODULE_5__["MainDataSource"])) if (ds.toolManager.acceptMouseDownEvent(x, y)) ret = true;
      }
    }

    return ret;
  }

  onToolMouseUp(frameName, x, y) {
    let ret = false;
    frameName += ".";

    for (let n in this._dataSources) {
      if (n.indexOf(frameName) === 0) {
        let ds = this._dataSources[n];
        if (_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(ds, _data_sources__WEBPACK_IMPORTED_MODULE_5__["MainDataSource"])) if (ds.toolManager.acceptMouseUpEvent(x, y)) ret = true;
      }
    }

    return ret;
  }

  onToolMouseDrag(frameName, x, y) {
    let ret = false;
    frameName += ".";

    for (let n in this._dataSources) {
      if (n.indexOf(frameName) === 0) {
        let ds = this._dataSources[n];
        if (_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(ds, _data_sources__WEBPACK_IMPORTED_MODULE_5__["MainDataSource"])) if (ds.toolManager.acceptMouseDownMoveEvent(x, y)) ret = true;
      }
    }

    return ret;
  }

  onMouseMove(frameName, x, y, drag) {
    let frame = this.getFrame(frameName);
    if (frame === undefined) return;
    this.setFrameMousePos(frameName, x, y);
    this.hideCrossCursor();
    if (this._highlightedFrame !== frame) this.clearHighlight();

    if (this._capturingMouseArea !== null && this._capturingMouseArea !== undefined) {
      this._capturingMouseArea.onMouseMove(x, y);

      return;
    }

    let _areas = frame.contains(x, y);

    if (_areas === null) return;
    let a,
        i,
        cnt = _areas.length;

    for (i = cnt - 1; i >= 0; i--) {
      a = _areas[i];
      a = a.onMouseMove(x, y);

      if (a !== null) {
        if (!_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(a, _areas__WEBPACK_IMPORTED_MODULE_11__["ChartAreaGroup"])) {
          frame.highlight(a);
          this._highlightedFrame = frame;
        }

        return;
      }
    }
  }

  onMouseLeave(frameName, x, y, move) {
    let frame = this.getFrame(frameName);
    if (frame === undefined) return;
    this.setFrameMousePos(frameName, x, y);
    this.hideCrossCursor();
    this.clearHighlight();

    if (this._capturingMouseArea !== null && this._capturingMouseArea !== undefined) {
      this._capturingMouseArea.onMouseLeave(x, y);

      this._capturingMouseArea = null;
    }

    this._dragStarted = false;
  }

  onMouseDown(frameName, x, y) {
    let frame = this.getFrame(frameName);
    if (frame === undefined) return;
    let areas = frame.contains(x, y);
    if (areas === null) return;
    let a,
        i,
        cnt = areas.length;

    for (i = cnt - 1; i >= 0; i--) {
      a = areas[i];
      a = a.onMouseDown(x, y);

      if (a !== null) {
        this._capturingMouseArea = a;
        return;
      }
    }
  }

  onMouseUp(frameName, x, y) {
    let frame = this.getFrame(frameName);
    if (frame === undefined) return;

    if (this._capturingMouseArea) {
      if (this._capturingMouseArea.onMouseUp(x, y) === null && this._dragStarted === false) {
        if (this._selectedFrame !== null && this._selectedFrame !== undefined && this._selectedFrame !== frame) this._selectedFrame.select(null);

        if (this._capturingMouseArea.isSelected()) {
          if (!this._captureMouseWheelDirectly) jquery__WEBPACK_IMPORTED_MODULE_13___default()(this._overlayCanvas).unbind('mousewheel');
          frame.select(null);
          this._selectedFrame = null;
        } else {
          if (this._selectedFrame !== frame) if (!this._captureMouseWheelDirectly) jquery__WEBPACK_IMPORTED_MODULE_13___default()(this._overlayCanvas).bind('mousewheel', _control__WEBPACK_IMPORTED_MODULE_0__["Control"].mouseWheel);
          frame.select(this._capturingMouseArea);
          this._selectedFrame = frame;
        }
      }

      this._capturingMouseArea = null;
      this._dragStarted = false;
    }
  }

  deleteToolObject() {
    let pDPTool = this.getDataSource("frame0.k0");
    let selectObject = pDPTool.getSelectToolObjcet();
    if (selectObject !== null) pDPTool.delSelectToolObject();
    let currentObject = pDPTool.getCurrentToolObject();

    if (currentObject !== null && currentObject.getState() !== _ctools__WEBPACK_IMPORTED_MODULE_10__["CToolObject"].state.AfterDraw) {
      pDPTool.delToolObject();
    }

    this.setNormalMode();
  }

  unloadTemplate(frameName) {
    let frame = this.getFrame(frameName);
    if (frame === undefined) return;

    for (let n in this._dataSources) {
      if (n.match(frameName + ".")) delete this._dataSources[n];
    }

    for (let n in this._dataProviders) {
      if (this._dataProviders[n].getFrameName() === frameName) delete this._dataProviders[n];
    }

    delete this._frames[frameName];

    for (let n in this._areas) {
      if (this._areas[n].getFrameName() === frameName) delete this._areas[n];
    }

    for (let n in this._timelines) {
      if (this._timelines[n].getFrameName() === frameName) delete this._timelines[n];
    }

    for (let n in this._ranges) {
      if (this._ranges[n].getFrameName() === frameName) delete this._ranges[n];
    }

    for (let n in this._plotters) {
      if (this._plotters[n].getFrameName() === frameName) delete this._plotters[n];
    }

    delete this._themes[frameName];
    delete this._frameMousePos[frameName];
  }

  createIndicatorAndRange(areaName, indicName, notLoadSettings) {
    let indic, range;

    switch (indicName) {
      case "MA":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["MAIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["PositiveRange"](areaName);
        break;

      case "EMA":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["EMAIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["PositiveRange"](areaName);
        break;

      case "VOLUME":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["VOLUMEIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["ZeroBasedPositiveRange"](areaName);
        break;

      case "MACD":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["MACDIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["ZeroCenteredRange"](areaName);
        break;

      case "DMI":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["DMIIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["PercentageRange"](areaName);
        break;

      case "DMA":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["DMAIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["Range"](areaName);
        break;

      case "TRIX":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["TRIXIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["Range"](areaName);
        break;

      case "BRAR":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["BRARIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["Range"](areaName);
        break;

      case "VR":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["VRIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["Range"](areaName);
        break;

      case "OBV":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["OBVIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["Range"](areaName);
        break;

      case "EMV":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["EMVIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["Range"](areaName);
        break;

      case "RSI":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["RSIIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["PercentageRange"](areaName);
        break;

      case "WR":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["WRIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["PercentageRange"](areaName);
        break;

      case "SAR":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["SARIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["PositiveRange"](areaName);
        break;

      case "KDJ":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["KDJIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["PercentageRange"](areaName);
        break;

      case "ROC":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["ROCIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["Range"](areaName);
        break;

      case "MTM":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["MTMIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["Range"](areaName);
        break;

      case "BOLL":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["BOLLIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["Range"](areaName);
        break;

      case "PSY":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["PSYIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["Range"](areaName);
        break;

      case "StochRSI":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["STOCHRSIIndicator"]();
        range = new _ranges__WEBPACK_IMPORTED_MODULE_3__["PercentageRange"](areaName);
        break;

      default:
        return null;
    }

    if (!notLoadSettings) {
      indic.setParameters(_chart_settings__WEBPACK_IMPORTED_MODULE_6__["ChartSettings"].get().indics[indicName]);
    }

    return {
      "indic": indic,
      "range": range
    };
  }

  setMainIndicator(dsName, indicName) {
    let areaName = dsName + ".main";
    let dp = this.getDataProvider(areaName + ".main");
    if (dp === undefined || !_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(dp, _data_providers__WEBPACK_IMPORTED_MODULE_7__["MainDataProvider"])) return false;
    let indic;

    switch (indicName) {
      case "MA":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["MAIndicator"]();
        break;

      case "EMA":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["EMAIndicator"]();
        break;

      case "BOLL":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["BOLLIndicator"]();
        break;

      case "SAR":
        indic = new _indicators__WEBPACK_IMPORTED_MODULE_2__["SARIndicator"]();
        break;

      default:
        return false;
    }

    indic.setParameters(_chart_settings__WEBPACK_IMPORTED_MODULE_6__["ChartSettings"].get().indics[indicName]);
    let indicDpName = areaName + ".secondary";
    let indicDp = this.getDataProvider(indicDpName);

    if (indicDp === undefined) {
      indicDp = new _data_providers__WEBPACK_IMPORTED_MODULE_7__["IndicatorDataProvider"](indicDpName);
      this.setDataProvider(indicDp.getName(), indicDp);
    }

    indicDp.setIndicator(indic);
    let plotter = this.getPlotter(indicDpName);

    if (plotter === undefined) {
      plotter = new _plotters__WEBPACK_IMPORTED_MODULE_9__["IndicatorPlotter"](indicDpName);
      this.setPlotter(plotter.getName(), plotter);
    }

    this.getArea(areaName).setChanged(true);
    return true;
  }

  setIndicator(areaName, indicName) {
    let area = this.getArea(areaName);

    if (area === null || area === undefined || area.getNameObject().getCompAt(2) === "main") {
      return false;
    }

    let dp = this.getDataProvider(areaName + ".secondary");

    if (dp === null || dp === undefined || !_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(dp, _data_providers__WEBPACK_IMPORTED_MODULE_7__["IndicatorDataProvider"])) {
      return false;
    }

    let ret = this.createIndicatorAndRange(areaName, indicName);

    if (ret === null || ret === undefined) {
      return false;
    }

    let indic = ret.indic;
    let range = ret.range;
    this.removeDataProvider(areaName + ".main");
    this.removePlotter(areaName + ".main");
    this.removeRange(areaName);
    this.removePlotter(areaName + "Range.decoration");
    dp.setIndicator(indic);
    this.setRange(areaName, range);
    range.setPaddingTop(20);
    range.setPaddingBottom(4);
    range.setMinInterval(20);

    if (_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(indic, _indicators__WEBPACK_IMPORTED_MODULE_2__["VOLUMEIndicator"])) {
      let plotter = new _plotters__WEBPACK_IMPORTED_MODULE_9__["LastVolumePlotter"](areaName + "Range.decoration");
      this.setPlotter(plotter.getName(), plotter);
    } else if (_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(indic, _indicators__WEBPACK_IMPORTED_MODULE_2__["BOLLIndicator"]) || _util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(indic, _indicators__WEBPACK_IMPORTED_MODULE_2__["SARIndicator"])) {
      let dp = new _data_providers__WEBPACK_IMPORTED_MODULE_7__["MainDataProvider"](areaName + ".main");
      this.setDataProvider(dp.getName(), dp);
      dp.updateData();
      let plotter = new _plotters__WEBPACK_IMPORTED_MODULE_9__["OHLCPlotter"](areaName + ".main");
      this.setPlotter(plotter.getName(), plotter);
    }

    return true;
  }

  removeMainIndicator(dsName) {
    let areaName = dsName + ".main";
    let indicDpName = areaName + ".secondary";
    let indicDp = this.getDataProvider(indicDpName);
    if (indicDp === undefined || !_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(indicDp, _data_providers__WEBPACK_IMPORTED_MODULE_7__["IndicatorDataProvider"])) return;
    this.removeDataProvider(indicDpName);
    this.removePlotter(indicDpName);
    this.getArea(areaName).setChanged(true);
  }

  removeIndicator(areaName) {
    let area = this.getArea(areaName);
    if (area === undefined || area.getNameObject().getCompAt(2) === "main") return;
    let dp = this.getDataProvider(areaName + ".secondary");
    if (dp === undefined || !_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(dp, _data_providers__WEBPACK_IMPORTED_MODULE_7__["IndicatorDataProvider"])) return;
    let rangeAreaName = areaName + "Range";
    let rangeArea = this.getArea(rangeAreaName);
    if (rangeArea === undefined) return;
    let tableLayout = this.getArea(area.getDataSourceName() + ".charts");
    if (tableLayout === undefined) return;
    tableLayout.removeArea(area);
    this.removeArea(areaName);
    tableLayout.removeArea(rangeArea);
    this.removeArea(rangeAreaName);

    for (let n in this._dataProviders) {
      if (this._dataProviders[n].getAreaName() === areaName) this.removeDataProvider(n);
    }

    for (let n in this._ranges) {
      if (this._ranges[n].getAreaName() === areaName) this.removeRange(n);
    }

    for (let n in this._plotters) {
      if (this._plotters[n].getAreaName() === areaName) this.removePlotter(n);
    }

    for (let n in this._plotters) {
      if (this._plotters[n].getAreaName() === rangeAreaName) this.removePlotter(n);
    }
  }

  getIndicatorParameters(indicName) {
    let indic = this._fakeIndicators[indicName];

    if (indic === undefined) {
      let ret = this.createIndicatorAndRange("", indicName);
      if (ret === null) return null;
      this._fakeIndicators[indicName] = indic = ret.indic;
    }

    let params = [];
    let i,
        cnt = indic.getParameterCount();

    for (i = 0; i < cnt; i++) params.push(indic.getParameterAt(i));

    return params;
  }

  setIndicatorParameters(indicName, params) {
    let n, indic;

    for (n in this._dataProviders) {
      let dp = this._dataProviders[n];
      if (_util__WEBPACK_IMPORTED_MODULE_12__["Util"].isInstance(dp, _data_providers__WEBPACK_IMPORTED_MODULE_7__["IndicatorDataProvider"]) === false) continue;
      indic = dp.getIndicator();

      if (indic.getName() === indicName) {
        indic.setParameters(params);
        dp.refresh();
        this.getArea(dp.getAreaName()).setChanged(true);
      }
    }

    indic = this._fakeIndicators[indicName];

    if (indic === undefined) {
      let ret = this.createIndicatorAndRange("", indicName, true);
      if (ret === null) return;
      this._fakeIndicators[indicName] = indic = ret.indic;
    }

    indic.setParameters(params);
  }

  getIndicatorAreaName(dsName, index) {
    let tableLayout = this.getArea(dsName + ".charts");
    let cnt = tableLayout.getAreaCount() >> 1;
    if (index < 0 || index >= cnt) return "";
    return tableLayout.getAreaAt(index << 1).getName();
  }

}
ChartManager.DrawingTool = {
  Cursor: 0,
  CrossCursor: 1,
  DrawLines: 2,
  DrawFibRetrace: 3,
  DrawFibFans: 4,
  SegLine: 5,
  StraightLine: 6,
  ArrowLine: 7,
  RayLine: 8,
  HoriStraightLine: 9,
  HoriRayLine: 10,
  HoriSegLine: 11,
  VertiStraightLine: 12,
  PriceLine: 13,
  BiParallelLine: 14,
  BiParallelRayLine: 15,
  TriParallelLine: 16,
  BandLine: 17
};
ChartManager.created = false;
ChartManager.instance = null;

/***/ }),

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

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSource", function() { return DataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainDataSource", function() { return MainDataSource; });
/* harmony import */ var _named_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _ctool_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(334);
/* harmony import */ var _kline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(157);



class DataSource extends _named_object__WEBPACK_IMPORTED_MODULE_0__["NamedObject"] {
  constructor(name) {
    super(name);
  }

  getUpdateMode() {
    return this._updateMode;
  }

  setUpdateMode(mode) {
    this._updateMode = mode;
  }

  getCacheSize() {
    return 0;
  }

  getDataCount() {
    return 0;
  }

  getDataAt(index) {
    return this._dataItems[index];
  }

}
DataSource.UpdateMode = {
  DoNothing: 0,
  Refresh: 1,
  Update: 2,
  Append: 3
};
class MainDataSource extends DataSource {
  constructor(name) {
    super(name);
    this._erasedCount = 0;
    this._dataItems = [];
    this._decimalDigits = 0;
    this.toolManager = new _ctool_manager__WEBPACK_IMPORTED_MODULE_1__["CToolManager"](name);
  }

  getCacheSize() {
    return this._dataItems.length;
  }

  getDataCount() {
    return this._dataItems.length;
  }

  getUpdatedCount() {
    return this._updatedCount;
  }

  getAppendedCount() {
    return this._appendedCount;
  }

  getErasedCount() {
    return this._erasedCount;
  }

  getDecimalDigits() {
    return this._decimalDigits;
  }

  calcDecimalDigits(v) {
    let str = "" + v;
    let i = str.indexOf('.');

    if (i < 0) {
      return 0;
    }

    return str.length - 1 - i;
  }

  getLastDate() {
    let count = this.getDataCount();

    if (count < 1) {
      return -1;
    }

    return this.getDataAt(count - 1).date;
  }

  getDataAt(index) {
    return this._dataItems[index];
  }

  update(data) {
    this._updatedCount = 0;
    this._appendedCount = 0;
    this._erasedCount = 0;
    let len = this._dataItems.length;

    if (len > 0) {
      let lastIndex = len - 1;
      let lastItem = this._dataItems[lastIndex];
      let e,
          i,
          cnt = data.length;

      for (i = 0; i < cnt; i++) {
        e = data[i];

        if (e[0] === lastItem.date) {
          if (lastItem.open === e[1] && lastItem.high === e[2] && lastItem.low === e[3] && lastItem.close === e[4] && lastItem.volume === e[5]) {
            this.setUpdateMode(DataSource.UpdateMode.DoNothing);
          } else {
            this.setUpdateMode(DataSource.UpdateMode.Update);
            this._dataItems[lastIndex] = {
              date: e[0],
              open: e[1],
              high: e[2],
              low: e[3],
              close: e[4],
              volume: e[5]
            };
            this._updatedCount++;
          }

          i++;

          if (i < cnt) {
            this.setUpdateMode(DataSource.UpdateMode.Append);

            for (; i < cnt; i++, this._appendedCount++) {
              e = data[i];

              this._dataItems.push({
                date: e[0],
                open: e[1],
                high: e[2],
                low: e[3],
                close: e[4],
                volume: e[5]
              });
            }
          }

          return true;
        }
      }

      if (cnt < _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.limit) {
        this.setUpdateMode(DataSource.UpdateMode.DoNothing);
        return false;
      }
    }

    this.setUpdateMode(DataSource.UpdateMode.Refresh);
    this._dataItems = [];
    let d,
        n,
        e,
        i,
        cnt = data.length;

    for (i = 0; i < cnt; i++) {
      e = data[i];

      for (n = 1; n <= 4; n++) {
        d = this.calcDecimalDigits(e[n]);
        if (this._decimalDigits < d) this._decimalDigits = d;
      }

      this._dataItems.push({
        date: e[0],
        open: e[1],
        high: e[2],
        low: e[3],
        close: e[4],
        volume: e[5]
      });
    }

    return true;
  }

  select(id) {
    this.toolManager.selecedObject = id;
  }

  unselect() {
    this.toolManager.selecedObject = -1;
  }

  addToolObject(toolObject) {
    this.toolManager.addToolObject(toolObject);
  }

  delToolObject() {
    this.toolManager.delCurrentObject();
  }

  getToolObject(index) {
    return this.toolManager.getToolObject(index);
  }

  getToolObjectCount() {
    return this.toolManager.toolObjects.length;
  }

  getCurrentToolObject() {
    return this.toolManager.getCurrentObject();
  }

  getSelectToolObjcet() {
    return this.toolManager.getSelectedObject();
  }

  delSelectToolObject() {
    this.toolManager.delSelectedObject();
  }

}

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Kline; });
/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(205);
/* harmony import */ var _chart_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(142);
/* harmony import */ var _chart_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(186);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(137);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);




class Kline {
  constructor(option) {
    this.element = "#kline_container";
    this.chartMgr = null;
    this.timer = null;
    this.buttonDown = false;
    this.init = false;
    this.requestParam = "";
    this.isSized = false;
    this.data = {};
    this.width = 1200;
    this.height = 650;
    this.symbol = "";
    this.symbolName = "";
    this.range = null;
    this.url = "";
    this.count = 2;
    this.limit = 1000;
    this.intervalTime = 5000;
    this.debug = true;
    this.language = "zh-cn";
    this.theme = "dark";
    this.ranges = ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"];
    this.depthWidth = 100;
    this.periodMap = {
      "01w": 7 * 86400 * 1000,
      "03d": 3 * 86400 * 1000,
      "01d": 86400 * 1000,
      "12h": 12 * 3600 * 1000,
      "06h": 6 * 3600 * 1000,
      "04h": 4 * 3600 * 1000,
      "02h": 2 * 3600 * 1000,
      "01h": 3600 * 1000,
      "30m": 30 * 60 * 1000,
      "15m": 15 * 60 * 1000,
      "05m": 5 * 60 * 1000,
      "03m": 3 * 60 * 1000,
      "01m": 60 * 1000,
      "line": 60 * 1000
    };
    this.tagMapPeriod = {
      "1w": "01w",
      "3d": "03d",
      "1d": "01d",
      "12h": "12h",
      "6h": "06h",
      "4h": "04h",
      "2h": "02h",
      "1h": "01h",
      "30m": "30m",
      "15m": "15m",
      "5m": "05m",
      "3m": "03m",
      "1m": "01m",
      "line": "line"
    }; //event

    this.onResize = null;
    this.onLangChange = null;
    this.onSymbolChange = null;
    this.onThemeChange = null;
    this.onRangeChange = null;
    this.onRequestData = null;
    Object.assign(this, option);

    if (!Kline.created) {
      Kline.instance = this;
      Kline.created = true;
    }

    return Kline.instance;
  }
  /*********************************************
   * Methods
   *********************************************/


  draw() {
    Kline.chartMgr = new _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"]();
    let view = jquery__WEBPACK_IMPORTED_MODULE_3___default()(this.element);

    for (let k in this.ranges) {
      let res = jquery__WEBPACK_IMPORTED_MODULE_3___default()(view).find('[name="' + this.ranges[k] + '"]');
      res.each(function (i, e) {
        jquery__WEBPACK_IMPORTED_MODULE_3___default()(e).attr("style", "display:inline-block");
      });
    }

    setInterval(_control__WEBPACK_IMPORTED_MODULE_0__["Control"].refreshFunction, this.intervalTime);
    this.registerMouseEvent();
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.bindCanvas("main", document.getElementById("chart_mainCanvas"));
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.bindCanvas("overlay", document.getElementById("chart_overlayCanvas"));
    _control__WEBPACK_IMPORTED_MODULE_0__["Control"].refreshTemplate();
    _control__WEBPACK_IMPORTED_MODULE_0__["Control"].onSize(this.width, this.height);
    _control__WEBPACK_IMPORTED_MODULE_0__["Control"].readCookie();
    this.setTheme(this.theme);
    this.setLanguage(this.language);
    this.setSymbol(this.symbol, this.symbolName);
    jquery__WEBPACK_IMPORTED_MODULE_3___default()(this.element).css({
      visibility: "visible"
    });
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    _control__WEBPACK_IMPORTED_MODULE_0__["Control"].onSize(this.width, this.height);
  }

  setSymbol(symbol, symbolName) {
    this.symbol = symbol;
    this.symbolName = symbolName;
    _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchSymbol(symbol, symbolName);
    this.onSymbolChangeFunc(symbol, symbolName);
  }

  setTheme(style) {
    this.theme = style;
    _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchTheme(style);
  }

  setLanguage(lang) {
    this.language = lang;
    _control__WEBPACK_IMPORTED_MODULE_0__["Control"].chartSwitchLanguage(lang);
  }

  setIntervalTime(intervalTime) {
    this.intervalTime = intervalTime;

    if (this.debug) {
      console.log('DEBUG: interval time changed to ' + intervalTime);
    }
  }

  setDepthWidth(width) {
    this.depthWidth = width;
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.redraw('All', false);
  }
  /*********************************************
   * Events
   *********************************************/


  onResizeFunc(width, height) {
    if (this.debug) {
      console.log("DEBUG: chart resized to width: " + width + " height: " + height);
    }

    this.onResize && this.onResize(width, height);
  }

  onLangChangeFunc(lang) {
    if (this.debug) {
      console.log("DEBUG: language changed to " + lang);
    }

    this.onLangChange && this.onLangChange(lang);
  }

  onSymbolChangeFunc(symbol, symbolName) {
    if (this.debug) {
      console.log("DEBUG: symbol changed to " + symbol + " " + symbolName);
    }

    this.onSymbolChange && this.onSymbolChange(symbol, symbolName);
  }

  onThemeChangeFunc(theme) {
    if (this.debug) {
      console.log("DEBUG: themes changed to : " + theme);
    }

    this.onThemeChange && this.onThemeChange(theme);
  }

  onRangeChangeFunc(range) {
    if (this.debug) {
      console.log("DEBUG: range changed to " + range);
    }

    this.onRangeChange && this.onRangeChange(range);
  }

  onRequestDataFunc(param, callback) {
    if (this.debug) {
      console.log("DEBUG: request data to " + JSON.stringify(param));
    }

    this.onRequestData && this.onRequestData(param, callback);
  }

  registerMouseEvent() {
    jquery__WEBPACK_IMPORTED_MODULE_3___default()(document).ready(function () {
      function __resize() {
        if (navigator.userAgent.indexOf('Firefox') >= 0) {
          setTimeout(function () {
            _control__WEBPACK_IMPORTED_MODULE_0__["Control"].onSize(this.width, this.height);
          }, 200);
        } else {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].onSize(this.width, this.height);
        }
      }

      jquery__WEBPACK_IMPORTED_MODULE_3___default()('#chart_overlayCanvas').bind("contextmenu", function (e) {
        e.cancelBubble = true;
        e.returnValue = false;
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()(".chart_container .chart_dropdown .chart_dropdown_t").mouseover(function () {
        let container = jquery__WEBPACK_IMPORTED_MODULE_3___default()(".chart_container");
        let title = jquery__WEBPACK_IMPORTED_MODULE_3___default()(this);
        let dropdown = title.next();
        let containerLeft = container.offset().left;
        let titleLeft = title.offset().left;
        let containerWidth = container.width();
        let titleWidth = title.width();
        let dropdownWidth = dropdown.width();
        let d = (dropdownWidth - titleWidth) / 2 << 0;

        if (titleLeft - d < containerLeft + 4) {
          d = titleLeft - containerLeft - 4;
        } else if (titleLeft + titleWidth + d > containerLeft + containerWidth - 4) {
          d += titleLeft + titleWidth + d - (containerLeft + containerWidth - 4) + 19;
        } else {
          d += 4;
        }

        dropdown.css({
          "margin-left": -d
        });
        title.addClass("chart_dropdown-hover");
        dropdown.addClass("chart_dropdown-hover");
      }).mouseout(function () {
        jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).next().removeClass("chart_dropdown-hover");
        jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).removeClass("chart_dropdown-hover");
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()(".chart_dropdown_data").mouseover(function () {
        jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).addClass("chart_dropdown-hover");
        jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).prev().addClass("chart_dropdown-hover");
      }).mouseout(function () {
        jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).prev().removeClass("chart_dropdown-hover");
        jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).removeClass("chart_dropdown-hover");
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_btn_parameter_settings").click(function () {
        jquery__WEBPACK_IMPORTED_MODULE_3___default()('#chart_parameter_settings').addClass("clicked");
        jquery__WEBPACK_IMPORTED_MODULE_3___default()(".chart_dropdown_data").removeClass("chart_dropdown-hover");
        jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_parameter_settings").find("th").each(function () {
          let name = jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).html();
          let index = 0;
          let tmp = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();
          let value = tmp.indics[name];
          jquery__WEBPACK_IMPORTED_MODULE_3___default()(this.nextElementSibling).find("input").each(function () {
            if (value !== null && index < value.length) {
              jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).val(value[index]);
            }

            index++;
          });
        });
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()("#close_settings").click(function () {
        jquery__WEBPACK_IMPORTED_MODULE_3___default()('#chart_parameter_settings').removeClass("clicked");
      }); // 切换周期

      jquery__WEBPACK_IMPORTED_MODULE_3___default()(".chart_container .chart_toolbar_tabgroup a").click(function () {
        _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchPeriod(jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).parent().attr('name'));
      }); // 切换周期

      jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_toolbar_periods_vert ul a").click(function () {
        _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchPeriod(jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).parent().attr('name'));
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_show_depth").click(function () {
        if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).hasClass('selected')) {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchDepth("off");
        } else {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchDepth("on");
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_show_tools").click(function () {
        if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).hasClass('selected')) {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchTools('off');
        } else {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchTools('on');
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_toolpanel .chart_toolpanel_button").click(function () {
        jquery__WEBPACK_IMPORTED_MODULE_3___default()(".chart_dropdown_data").removeClass("chart_dropdown-hover");
        jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_toolpanel .chart_toolpanel_button").removeClass("selected");
        jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).addClass("selected");
        let name = jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).children().attr('name');
        Kline.instance.chartMgr.setRunningMode(_chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].DrawingTool[name]);
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()('#chart_show_indicator').click(function () {
        if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).hasClass('selected')) {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchIndic('off');
        } else {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchIndic('on');
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_tabbar li a").click(function () {
        jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_tabbar li a").removeClass('selected');
        jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).addClass('selected');
        let name = jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr('name');
        let tmp = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();
        tmp.charts.indics[1] = name;
        _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].save();
        _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart().setIndicator(1, name);
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_select_chart_style a").click(function () {
        jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_select_chart_style a").removeClass('selected');
        jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).addClass("selected");
        let tmp = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();
        tmp.charts.chartStyle = jquery__WEBPACK_IMPORTED_MODULE_3___default()(this)[0].innerHTML;
        _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].save();
        let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
        mgr.setChartStyle("frame0.k0", jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).html());
        mgr.redraw();
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()('#chart_dropdown_themes li').click(function () {
        jquery__WEBPACK_IMPORTED_MODULE_3___default()('#chart_dropdown_themes li a').removeClass('selected');
        let name = jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr('name');

        if (name === 'chart_themes_dark') {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchTheme('dark');
        } else if (name === 'chart_themes_light') {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchTheme('light');
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_select_main_indicator a").click(function () {
        jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_select_main_indicator a").removeClass('selected');
        jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).addClass("selected");
        let name = jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr('name');
        let tmp = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();
        tmp.charts.mIndic = name;
        _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].save();
        let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
        if (!mgr.setMainIndicator("frame0.k0", name)) mgr.removeMainIndicator("frame0.k0");
        mgr.redraw();
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()('#chart_toolbar_theme a').click(function () {
        jquery__WEBPACK_IMPORTED_MODULE_3___default()('#chart_toolbar_theme a').removeClass('selected');

        if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr('name') === 'dark') {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchTheme('dark');
        } else if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr('name') === 'light') {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchTheme('light');
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()('#chart_select_theme li a').click(function () {
        jquery__WEBPACK_IMPORTED_MODULE_3___default()('#chart_select_theme a').removeClass('selected');

        if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr('name') === 'dark') {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchTheme('dark');
        } else if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr('name') === 'light') {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchTheme('light');
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()('#chart_enable_tools li a').click(function () {
        jquery__WEBPACK_IMPORTED_MODULE_3___default()('#chart_enable_tools a').removeClass('selected');

        if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr('name') === 'on') {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchTools('on');
        } else if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr('name') === 'off') {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchTools('off');
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()('#chart_enable_indicator li a').click(function () {
        jquery__WEBPACK_IMPORTED_MODULE_3___default()('#chart_enable_indicator a').removeClass('selected');

        if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr('name') === 'on') {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchIndic('on');
        } else if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr('name') === 'off') {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].switchIndic('off');
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()('#chart_language_setting_div li a').click(function () {
        jquery__WEBPACK_IMPORTED_MODULE_3___default()('#chart_language_setting_div a').removeClass('selected');

        if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr('name') === 'zh-cn') {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].chartSwitchLanguage('zh-cn');
        } else if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr('name') === 'en-us') {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].chartSwitchLanguage('en-us');
        } else if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr('name') === 'zh-tw') {
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].chartSwitchLanguage('zh-tw');
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()(document).keyup(function (e) {
        if (e.keyCode === 46) {
          _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.deleteToolObject();
          _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.redraw('OverlayCanvas', false);
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()("#clearCanvas").click(function () {
        let pDPTool = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getDataSource("frame0.k0");
        let len = pDPTool.getToolObjectCount();

        for (let i = 0; i < len; i++) {
          pDPTool.delToolObject();
        }

        _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.redraw('OverlayCanvas', false);
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_overlayCanvas").mousemove(function (e) {
        let r = e.target.getBoundingClientRect();
        let x = e.clientX - r.left;
        let y = e.clientY - r.top;
        let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;

        if (Kline.instance.buttonDown === true) {
          mgr.onMouseMove("frame0", x, y, true);
          mgr.redraw("All", false);
        } else {
          mgr.onMouseMove("frame0", x, y, false);
          mgr.redraw("OverlayCanvas");
        }
      }).mouseleave(function (e) {
        let r = e.target.getBoundingClientRect();
        let x = e.clientX - r.left;
        let y = e.clientY - r.top;
        let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
        mgr.onMouseLeave("frame0", x, y, false);
        mgr.redraw("OverlayCanvas");
      }).mouseup(function (e) {
        if (e.which !== 1) {
          return;
        }

        Kline.instance.buttonDown = false;
        let r = e.target.getBoundingClientRect();
        let x = e.clientX - r.left;
        let y = e.clientY - r.top;
        let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
        mgr.onMouseUp("frame0", x, y);
        mgr.redraw("All");
      }).mousedown(function (e) {
        if (e.which !== 1) {
          _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.deleteToolObject();
          _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.redraw('OverlayCanvas', false);
          return;
        }

        Kline.instance.buttonDown = true;
        let r = e.target.getBoundingClientRect();
        let x = e.clientX - r.left;
        let y = e.clientY - r.top;
        _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.onMouseDown("frame0", x, y);
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_parameter_settings :input").change(function () {
        let name = jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr("name");
        let index = 0;
        let valueArray = [];
        let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
        jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_parameter_settings :input").each(function () {
          if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr("name") === name) {
            if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).val() !== "" && jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).val() !== null && jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).val() !== undefined) {
              let i = parseInt(jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).val());
              valueArray.push(i);
            }

            index++;
          }
        });

        if (valueArray.length !== 0) {
          mgr.setIndicatorParameters(name, valueArray);
          let value = mgr.getIndicatorParameters(name);
          let cookieArray = [];
          index = 0;
          jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_parameter_settings :input").each(function () {
            if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr("name") === name) {
              if (jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).val() !== "" && jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).val() !== null && jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).val() !== undefined) {
                jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).val(value[index].getValue());
                cookieArray.push(value[index].getValue());
              }

              index++;
            }
          });
          let tmp = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();
          tmp.indics[name] = cookieArray;
          _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].save();
          mgr.redraw('All', false);
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()("#chart_parameter_settings button").click(function () {
        let name = jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).parents("tr").children("th").html();
        let index = 0;
        let value = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getIndicatorParameters(name);
        let valueArray = [];
        jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).parent().prev().children('input').each(function () {
          if (value !== null && index < value.length) {
            jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).val(value[index].getDefaultValue());
            valueArray.push(value[index].getDefaultValue());
          }

          index++;
        });
        _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.setIndicatorParameters(name, valueArray);
        let tmp = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();
        tmp.indics[name] = valueArray;
        _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].save();
        _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.redraw('All', false);
      });
      jquery__WEBPACK_IMPORTED_MODULE_3___default()('body').on('click', '#sizeIcon', function () {
        Kline.instance.isSized = !Kline.instance.isSized;

        if (Kline.instance.isSized) {
          jquery__WEBPACK_IMPORTED_MODULE_3___default()(Kline.instance.element).css({
            position: 'fixed',
            left: '0',
            right: '0',
            top: '0',
            bottom: '0',
            width: '100%',
            height: '100%',
            zIndex: '10000'
          });
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].onSize();
          jquery__WEBPACK_IMPORTED_MODULE_3___default()('html,body').css({
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          });
        } else {
          jquery__WEBPACK_IMPORTED_MODULE_3___default()(Kline.instance.element).attr('style', '');
          jquery__WEBPACK_IMPORTED_MODULE_3___default()('html,body').attr('style', '');
          _control__WEBPACK_IMPORTED_MODULE_0__["Control"].onSize(Kline.instance.width, Kline.instance.height);
          jquery__WEBPACK_IMPORTED_MODULE_3___default()(Kline.instance.element).css({
            visibility: 'visible',
            height: Kline.instance.height + 'px'
          });
        }
      });
      let dom_canvas = document.querySelector('#chart_overlayCanvas');
      let startDistance;
      dom_canvas.addEventListener("touchstart", function (e) {
        if (e.touches.length == 2) {
          startDistance = getPointsDistance(e);
        } else {
          Kline.instance.buttonDown = true;
          let r = e.target.getBoundingClientRect();
          let x = e.touches[0].clientX - r.left;
          let y = e.touches[0].clientY - r.top;
          _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.onMouseDown("frame0", x, y);
        }
      });
      dom_canvas.addEventListener('touchmove', function (e) {
        if (e.touches.length == 2) {
          let moveDistance = getPointsDistance(e);
          let distance = moveDistance - startDistance;

          if (distance > 0) {
            _control__WEBPACK_IMPORTED_MODULE_0__["Control"].mouseWheel(e, 1);
          }

          ;

          if (distance < 0) {
            _control__WEBPACK_IMPORTED_MODULE_0__["Control"].mouseWheel(e, -1);
          }

          ;
        } else {
          let r = e.target.getBoundingClientRect();
          let x = e.touches[0].clientX - r.left;
          let y = e.touches[0].clientY - r.top;
          let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;

          if (Kline.instance.buttonDown === true) {
            mgr.onMouseMove("frame0", x, y, true);
            mgr.redraw("All", false);
          } else {
            mgr.onMouseMove("frame0", x, y, false);
            mgr.redraw("OverlayCanvas");
          }
        }
      });
      dom_canvas.addEventListener("touchend", function (e) {
        let r = e.target.getBoundingClientRect();
        let x = e.touches[0].clientX - r.left;
        let y = e.touches[0].clientY - r.top;
        let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
        mgr.onMouseLeave("frame0", x, y, false);
        mgr.redraw("OverlayCanvas");
      });

      function getPointsDistance(e) {
        let x1 = e.touches[0].pageX;
        let y1 = e.touches[0].pageY;
        let x2 = e.touches[1].pageX;
        let y2 = e.touches[1].pageY;
        let a = x1 - x2;
        let b = y1 - y2;
        return Math.sqrt(a * a + b * b); //已知两个直角边开平方得出 斜角边
      }
    });
  }

}
Kline.created = false;
Kline.instance = null;

/***/ }),

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

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartSettings", function() { return ChartSettings; });
/* harmony import */ var _chart_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(142);

class ChartSettings {
  static checkVersion() {
    if (ChartSettings._data.ver < 2) {
      ChartSettings._data.ver = 2;
      let charts = ChartSettings._data.charts;
      charts.period_weight = {};
      charts.period_weight['line'] = 8;
      charts.period_weight['1min'] = 7;
      charts.period_weight['5min'] = 6;
      charts.period_weight['15min'] = 5;
      charts.period_weight['30min'] = 4;
      charts.period_weight['1hour'] = 3;
      charts.period_weight['1day'] = 2;
      charts.period_weight['1week'] = 1;
      charts.period_weight['3min'] = 0;
      charts.period_weight['2hour'] = 0;
      charts.period_weight['4hour'] = 0;
      charts.period_weight['6hour'] = 0;
      charts.period_weight['12hour'] = 0;
      charts.period_weight['3day'] = 0;
    }

    if (ChartSettings._data.ver < 3) {
      ChartSettings._data.ver = 3;
      let charts = ChartSettings._data.charts;
      charts.areaHeight = [];
    }
  }

  static get() {
    if (ChartSettings._data === undefined) {
      ChartSettings.init();
      ChartSettings.load();
      ChartSettings.checkVersion();
    }

    return ChartSettings._data;
  }

  static init() {
    let _indic_param = {};
    let _name = ['MA', 'EMA', 'VOLUME', 'MACD', 'KDJ', 'StochRSI', 'RSI', 'DMI', 'OBV', 'BOLL', 'DMA', 'TRIX', 'BRAR', 'VR', 'EMV', 'WR', 'ROC', 'MTM', 'PSY'];

    for (let i = 0; i < _name.length; i++) {
      let _value = _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.createIndicatorAndRange('', _name[i], true);

      if (_value === null) continue;
      _indic_param[_name[i]] = [];

      let param = _value.indic.getParameters();

      for (let j = 0; j < param.length; j++) {
        _indic_param[_name[i]].push(param[j]);
      }
    }

    let _chart_style = 'CandleStick';
    let _m_indic = 'MA';
    let _indic = ['VOLUME', 'VOLUME'];
    let _range = '15m';
    let _frame = {};
    _frame.chartStyle = _chart_style;
    _frame.mIndic = _m_indic;
    _frame.indics = _indic;
    _frame.indicsStatus = 'open';
    _frame.period = _range;
    _frame.depthStatus = 'close';
    ChartSettings._data = {
      ver: 1,
      charts: _frame,
      indics: _indic_param,
      theme: "Dark"
    };
    ChartSettings.checkVersion();
  }

  static load() {
    if (document.cookie.length <= 0) return;
    let start = document.cookie.indexOf("chartSettings=");
    if (start < 0) return;
    start += "chartSettings=".length;
    let end = document.cookie.indexOf(";", start);
    if (end < 0) end = document.cookie.length;
    let json = unescape(document.cookie.substring(start, end));
    ChartSettings._data = JSON.parse(json);
  }

  static save() {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + 2);
    document.cookie = "chartSettings=" + escape(JSON.stringify(ChartSettings._data)) + ";expires=" + exdate.toGMTString();
  }

}

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Theme", function() { return Theme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DarkTheme", function() { return DarkTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LightTheme", function() { return LightTheme; });
/* harmony import */ var _kline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(157);

class Theme {
  constructor() {
    this._colors = [];
    this._fonts = [];
  }

  getColor(which) {
    return this._colors[which];
  }

  getFont(which) {
    return this._fonts[which];
  }

}
Theme.theme_color_id = 0;
Theme.theme_font_id = 0;
Theme.Color = {
  Positive: Theme.theme_color_id++,
  Negative: Theme.theme_color_id++,
  PositiveDark: Theme.theme_color_id++,
  NegativeDark: Theme.theme_color_id++,
  Unchanged: Theme.theme_color_id++,
  Background: Theme.theme_color_id++,
  Cursor: Theme.theme_color_id++,
  RangeMark: Theme.theme_color_id++,
  Indicator0: Theme.theme_color_id++,
  Indicator1: Theme.theme_color_id++,
  Indicator2: Theme.theme_color_id++,
  Indicator3: Theme.theme_color_id++,
  Indicator4: Theme.theme_color_id++,
  Indicator5: Theme.theme_color_id++,
  Grid0: Theme.theme_color_id++,
  Grid1: Theme.theme_color_id++,
  Grid2: Theme.theme_color_id++,
  Grid3: Theme.theme_color_id++,
  Grid4: Theme.theme_color_id++,
  TextPositive: Theme.theme_color_id++,
  TextNegative: Theme.theme_color_id++,
  Text0: Theme.theme_color_id++,
  Text1: Theme.theme_color_id++,
  Text2: Theme.theme_color_id++,
  Text3: Theme.theme_color_id++,
  Text4: Theme.theme_color_id++,
  LineColorNormal: Theme.theme_color_id++,
  LineColorSelected: Theme.theme_color_id++,
  CircleColorFill: Theme.theme_color_id++,
  CircleColorStroke: Theme.theme_color_id++
};
Theme.Font = {
  Default: Theme.theme_font_id++
};
class DarkTheme extends Theme {
  constructor() {
    super();
    this._colors = []; // 涨的颜色和深度线条颜色

    this._colors[Theme.Color.Positive] = "#02AD8F"; // 跌的颜色和深度线条颜色

    this._colors[Theme.Color.Negative] = "#CB374E"; // 涨的深度渐变背景颜色

    this._colors[Theme.Color.PositiveDark] = "#004718"; // 跌的深度渐变背景颜色

    this._colors[Theme.Color.NegativeDark] = "#3b0e08";
    this._colors[Theme.Color.Unchanged] = "#fff";
    this._colors[Theme.Color.Background] = "#161616"; //"#131722"
    // 十字轴线

    this._colors[Theme.Color.Cursor] = "#aaa"; // 标记字体颜色

    this._colors[Theme.Color.RangeMark] = "#f9ee30";
    this._colors[Theme.Color.Indicator0] = "#ddd";
    this._colors[Theme.Color.Indicator1] = "#f9ee30";
    this._colors[Theme.Color.Indicator2] = "#f600ff";
    this._colors[Theme.Color.Indicator3] = "#6bf";
    this._colors[Theme.Color.Indicator4] = "#a5cf81";
    this._colors[Theme.Color.Indicator5] = "#e18b89";
    this._colors[Theme.Color.Grid0] = "#555";
    this._colors[Theme.Color.Grid1] = "#555";
    this._colors[Theme.Color.Grid3] = "#888"; // 十字轴线深度Y颜色

    this._colors[Theme.Color.Grid4] = "#aaa"; // 标记Y颜色 (深度图)

    this._colors[Theme.Color.Grid5] = "#CB374E";
    this._colors[Theme.Color.TextPositive] = "#1bd357";
    this._colors[Theme.Color.TextNegative] = "#ff6f5e";
    this._colors[Theme.Color.Text0] = "#444";
    this._colors[Theme.Color.Text1] = "#666";
    this._colors[Theme.Color.Text2] = "#888";
    this._colors[Theme.Color.Text3] = "#aaa";
    this._colors[Theme.Color.Text4] = "#ccc"; // 标记字体颜色 (深度图)

    this._colors[Theme.Color.Text5] = "#CB374E";
    this._colors[Theme.Color.LineColorNormal] = "#a6a6a6";
    this._colors[Theme.Color.LineColorSelected] = "#ffffff";
    this._colors[Theme.Color.CircleColorFill] = "#161616";
    this._colors[Theme.Color.CircleColorStroke] = "#ffffff";
    this._fonts = [];
    this._fonts[Theme.Font.Default] = "12px Tahoma";
  }

}
class LightTheme extends Theme {
  constructor() {
    super();
    this._colors = [];
    this._colors[Theme.Color.Positive] = "#02AD8F";
    this._colors[Theme.Color.Negative] = "#CB374E";
    this._colors[Theme.Color.PositiveDark] = "#66d293";
    this._colors[Theme.Color.NegativeDark] = "#ffadaa";
    this._colors[Theme.Color.Unchanged] = "#fff";
    this._colors[Theme.Color.Background] = "#f6f6f6";
    this._colors[Theme.Color.Cursor] = "#aaa";
    this._colors[Theme.Color.RangeMark] = "#f27935";
    this._colors[Theme.Color.Indicator0] = "#d27972";
    this._colors[Theme.Color.Indicator1] = "#ffb400";
    this._colors[Theme.Color.Indicator2] = "#e849b9";
    this._colors[Theme.Color.Indicator3] = "#1478c8";
    this._colors[Theme.Color.Grid0] = "#aaa";
    this._colors[Theme.Color.Grid1] = "#aaa";
    this._colors[Theme.Color.Grid3] = "#bbb";
    this._colors[Theme.Color.Grid4] = "#aaa"; // 标记Y颜色 (深度图)

    this._colors[Theme.Color.Grid5] = "#CB374E";
    this._colors[Theme.Color.TextPositive] = "#53b37b";
    this._colors[Theme.Color.TextNegative] = "#db5542";
    this._colors[Theme.Color.Text0] = "#ccc";
    this._colors[Theme.Color.Text1] = "#aaa";
    this._colors[Theme.Color.Text2] = "#888";
    this._colors[Theme.Color.Text3] = "#666";
    this._colors[Theme.Color.Text4] = "#444"; // 标记字体颜色 (深度图)

    this._colors[Theme.Color.Text5] = "#CB374E";
    this._colors[Theme.Color.LineColorNormal] = "#8c8c8c";
    this._colors[Theme.Color.LineColorSelected] = "#393c40";
    this._colors[Theme.Color.CircleColorFill] = "#f6f6f6";
    this._colors[Theme.Color.CircleColorStroke] = "#393c40";
    this._fonts = [];
    this._fonts[Theme.Font.Default] = "12px Tahoma";
  }

}

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartArea", function() { return ChartArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainArea", function() { return MainArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndicatorArea", function() { return IndicatorArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainRangeArea", function() { return MainRangeArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndicatorRangeArea", function() { return IndicatorRangeArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineArea", function() { return TimelineArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartAreaGroup", function() { return ChartAreaGroup; });
/* harmony import */ var _named_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _chart_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(142);
/* harmony import */ var _mevent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(212);



class ChartArea extends _named_object__WEBPACK_IMPORTED_MODULE_0__["NamedObject"] {
  constructor(name) {
    super(name);
    this._left = 0;
    this._top = 0;
    this._right = 0;
    this._bottom = 0;
    this._changed = false;
    this._highlighted = false;
    this._pressed = false;
    this._selected = false;
    this.Measuring = new _mevent__WEBPACK_IMPORTED_MODULE_2__["MEvent"]();
  }

  getDockStyle() {
    return this._dockStyle;
  }

  setDockStyle(dockStyle) {
    this._dockStyle = dockStyle;
  }

  getLeft() {
    return this._left;
  }

  getTop() {
    return this._top;
  }

  setTop(v) {
    if (this._top !== v) {
      this._top = v;
      this._changed = true;
    }
  }

  getRight() {
    return this._right;
  }

  getBottom() {
    return this._bottom;
  }

  setBottom(v) {
    if (this._bottom !== v) {
      this._bottom = v;
      this._changed = true;
    }
  }

  getCenter() {
    return this._left + this._right >> 1;
  }

  getMiddle() {
    return this._top + this._bottom >> 1;
  }

  getWidth() {
    return this._right - this._left;
  }

  getHeight() {
    return this._bottom - this._top;
  }

  getRect() {
    return {
      X: this._left,
      Y: this._top,
      Width: this._right - this._left,
      Height: this._bottom - this._top
    };
  }

  contains(x, y) {
    if (x >= this._left && x < this._right) if (y >= this._top && y < this._bottom) return [this];
    return null;
  }

  getMeasuredWidth() {
    return this._measuredWidth;
  }

  getMeasuredHeight() {
    return this._measuredHeight;
  }

  setMeasuredDimension(width, height) {
    this._measuredWidth = width;
    this._measuredHeight = height;
  }

  measure(context, width, height) {
    this._measuredWidth = 0;
    this._measuredHeight = 0;
    this.Measuring.raise(this, {
      Width: width,
      Height: height
    });
    if (this._measuredWidth === 0 && this._measuredHeight === 0) this.setMeasuredDimension(width, height);
  }

  layout(left, top, right, bottom, forceChange) {
    left <<= 0;

    if (this._left !== left) {
      this._left = left;
      this._changed = true;
    }

    top <<= 0;

    if (this._top !== top) {
      this._top = top;
      this._changed = true;
    }

    right <<= 0;

    if (this._right !== right) {
      this._right = right;
      this._changed = true;
    }

    bottom <<= 0;

    if (this._bottom !== bottom) {
      this._bottom = bottom;
      this._changed = true;
    }

    if (forceChange) this._changed = true;
  }

  isChanged() {
    return this._changed;
  }

  setChanged(v) {
    this._changed = v;
  }

  isHighlighted() {
    return this._highlighted;
  }

  getHighlightedArea() {
    return this._highlighted ? this : null;
  }

  highlight(area) {
    this._highlighted = this === area;
    return this._highlighted ? this : null;
  }

  isPressed() {
    return this._pressed;
  }

  setPressed(v) {
    this._pressed = v;
  }

  isSelected() {
    return this._selected;
  }

  getSelectedArea() {
    return this._selected ? this : null;
  }

  select(area) {
    this._selected = this === area;
    return this._selected ? this : null;
  }

  onMouseMove(x, y) {
    return null;
  }

  onMouseLeave(x, y) {}

  onMouseDown(x, y) {
    return null;
  }

  onMouseUp(x, y) {
    return null;
  }

}
ChartArea.DockStyle = {
  Left: 0,
  Top: 1,
  Right: 2,
  Bottom: 3,
  Fill: 4
};
class MainArea extends ChartArea {
  constructor(name) {
    super(name);
    this._dragStarted = false;
    this._oldX = 0;
    this._oldY = 0;
    this._passMoveEventToToolManager = true;
  }

  onMouseMove(x, y) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    if (mgr._capturingMouseArea === this) if (this._dragStarted === false) if (Math.abs(this._oldX - x) > 1 || Math.abs(this._oldY - y) > 1) this._dragStarted = true;

    if (this._dragStarted) {
      mgr.hideCursor();
      if (mgr.onToolMouseDrag(this.getFrameName(), x, y)) return this;
      mgr.getTimeline(this.getDataSourceName()).move(x - this._oldX);
      return this;
    }

    if (this._passMoveEventToToolManager && mgr.onToolMouseMove(this.getFrameName(), x, y)) {
      mgr.hideCursor();
      return this;
    }

    switch (mgr._drawingTool) {
      case _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].DrawingTool.Cursor:
        mgr.showCursor();
        break;

      case _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].DrawingTool.CrossCursor:
        if (mgr.showCrossCursor(this, x, y)) mgr.hideCursor();else mgr.showCursor();
        break;

      default:
        mgr.hideCursor();
        break;
    }

    return this;
  }

  onMouseLeave(x, y) {
    this._dragStarted = false;
    this._passMoveEventToToolManager = true;
  }

  onMouseDown(x, y) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    mgr.getTimeline(this.getDataSourceName()).startMove();
    this._oldX = x;
    this._oldY = y;
    this._dragStarted = false;
    if (mgr.onToolMouseDown(this.getFrameName(), x, y)) this._passMoveEventToToolManager = false;
    return this;
  }

  onMouseUp(x, y) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    let ret = null;

    if (this._dragStarted) {
      this._dragStarted = false;
      ret = this;
    }

    if (mgr.onToolMouseUp(this.getFrameName(), x, y)) ret = this;
    this._passMoveEventToToolManager = true;
    return ret;
  }

}
class IndicatorArea extends ChartArea {
  constructor(name) {
    super(name);
    this._dragStarted = false;
    this._oldX = 0;
    this._oldY = 0;
  }

  onMouseMove(x, y) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;

    if (mgr._capturingMouseArea === this) {
      if (this._dragStarted === false) {
        if (this._oldX !== x || this._oldY !== y) {
          this._dragStarted = true;
        }
      }
    }

    if (this._dragStarted) {
      mgr.hideCursor();
      mgr.getTimeline(this.getDataSourceName()).move(x - this._oldX);
      return this;
    }

    switch (mgr._drawingTool) {
      case _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].DrawingTool.CrossCursor:
        if (mgr.showCrossCursor(this, x, y)) mgr.hideCursor();else mgr.showCursor();
        break;

      default:
        mgr.showCursor();
        break;
    }

    return this;
  }

  onMouseLeave(x, y) {
    this._dragStarted = false;
  }

  onMouseDown(x, y) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    mgr.getTimeline(this.getDataSourceName()).startMove();
    this._oldX = x;
    this._oldY = y;
    this._dragStarted = false;
    return this;
  }

  onMouseUp(x, y) {
    if (this._dragStarted) {
      this._dragStarted = false;
      return this;
    }

    return null;
  }

}
class MainRangeArea extends ChartArea {
  constructor(name) {
    super(name);
  }

  onMouseMove(x, y) {
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.showCursor();
    return this;
  }

}
class IndicatorRangeArea extends ChartArea {
  constructor(name) {
    super(name);
  }

  onMouseMove(x, y) {
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.showCursor();
    return this;
  }

}
class TimelineArea extends ChartArea {
  constructor(name) {
    super(name);
  }

  onMouseMove(x, y) {
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.showCursor();
    return this;
  }

}
class ChartAreaGroup extends ChartArea {
  constructor(name) {
    super(name);
    this._areas = [];
    this._highlightedArea = null;
    this._selectedArea = null;
  }

  contains(x, y) {
    let areas;
    let a,
        i,
        cnt = this._areas.length;

    for (i = 0; i < cnt; i++) {
      a = this._areas[i];
      areas = a.contains(x, y);

      if (areas !== null) {
        areas.push(this);
        return areas;
      }
    }

    return super.contains(x, y);
  }

  getAreaCount() {
    return this._areas.length;
  }

  getAreaAt(index) {
    if (index < 0 || index >= this._areas.length) {
      return null;
    }

    return this._areas[index];
  }

  addArea(area) {
    this._areas.push(area);
  }

  removeArea(area) {
    let i,
        cnt = this._areas.length;

    for (i = 0; i < cnt; i++) {
      if (area === this._areas[i]) {
        this._areas.splice(i);

        this.setChanged(true);
        break;
      }
    }
  }

  getGridColor() {
    return this._gridColor;
  }

  setGridColor(c) {
    this._gridColor = c;
  }

  getHighlightedArea() {
    if (this._highlightedArea !== null) {
      return this._highlightedArea.getHighlightedArea();
    }

    return null;
  }

  highlight(area) {
    this._highlightedArea = null;
    let e,
        i,
        cnt = this._areas.length;

    for (i = 0; i < cnt; i++) {
      e = this._areas[i].highlight(area);

      if (e !== null) {
        this._highlightedArea = e;
        return this;
      }
    }

    return null;
  }

  getSelectedArea() {
    if (this._selectedArea !== null) {
      return this._selectedArea.getSelectedArea();
    }

    return null;
  }

  select(area) {
    this._selectedArea = null;
    let e,
        i,
        cnt = this._areas.length;

    for (i = 0; i < cnt; i++) {
      e = this._areas[i].select(area);

      if (e !== null) {
        this._selectedArea = e;
        return this;
      }
    }

    return null;
  }

  onMouseLeave(x, y) {
    let i,
        cnt = this._areas.length;

    for (i = 0; i < cnt; i++) this._areas[i].onMouseLeave(x, y);
  }

  onMouseUp(x, y) {
    let a,
        i,
        cnt = this._areas.length;

    for (i = 0; i < cnt; i++) {
      a = this._areas[i].onMouseUp(x, y);
      if (a !== null) return a;
    }

    return null;
  }

}

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Control", function() { return Control; });
/* harmony import */ var _kline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(157);
/* harmony import */ var _chart_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(142);
/* harmony import */ var _chart_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(186);
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(206);
/* harmony import */ var _mevent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(212);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(137);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_5__);






class Control {
  static refreshFunction() {
    Control.refreshCounter++;
    let lang = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getLanguage();

    if (Control.refreshCounter > 3600) {
      let num = Number(Control.refreshCounter / 3600);

      if (lang === "en-us") {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_updated_time_text").html(num.toFixed(0) + "h");
      } else if (lang === "zh-tw") {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_updated_time_text").html(num.toFixed(0) + "小時");
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_updated_time_text").html(num.toFixed(0) + "小时");
      }
    } else if (Control.refreshCounter > 60 && Control.refreshCounter <= 3600) {
      let num = Number(Control.refreshCounter / 60);

      if (lang === "en-us") {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_updated_time_text").html(num.toFixed(0) + "m");
      } else if (lang === "zh-tw") {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_updated_time_text").html(num.toFixed(0) + "分鐘");
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_updated_time_text").html(num.toFixed(0) + "分钟");
      }
    } else if (Control.refreshCounter <= 60) {
      if (lang === "en-us") {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_updated_time_text").html(Control.refreshCounter + "s");
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_updated_time_text").html(Control.refreshCounter + "秒");
      }
    }
  }

  static clearRefreshCounter() {
    window.clearInterval(Control.refreshHandler);
    Control.refreshCounter = 0;
    let lang = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getLanguage();

    if (lang === "en-us") {
      jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_updated_time_text").html(Control.refreshCounter + "s");
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_updated_time_text").html(Control.refreshCounter + "秒");
    }

    Control.refreshHandler = setInterval(Control.refreshFunction, _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.intervalTime);
  }

  static requestData(showLoading) {
    window.clearTimeout(_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.timer);

    if (showLoading === true) {
      jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_loading").addClass("activated");
    }

    _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.onRequestDataFunc(_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.requestParam, function (res) {
      if (res && res.success) {
        Control.requestSuccessHandler(res);
      } else {
        if (_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.debug) {
          console.log(res);
        }

        _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.timer = setTimeout(function () {
          Control.requestData(true);
        }, _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.intervalTime);
      }
    });
  }

  static requestSuccessHandler(res) {
    if (_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.debug) {
      console.log(res);
    }

    jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_loading").removeClass("activated");
    let chart = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart();
    chart.setTitle();
    _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.data = eval(res.data);
    let updateDataRes = _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.chartMgr.updateData("frame0.k0", _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.data.lines);
    _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.requestParam = Control.setHttpRequestParam(_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.symbol, _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.range, null, _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.chartMgr.getDataSource("frame0.k0").getLastDate());
    let intervalTime = _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.intervalTime < _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.range ? _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.intervalTime : _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.range;

    if (!updateDataRes) {
      _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.timer = setTimeout(Control.requestData, intervalTime);
      return;
    }

    let tmp = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get(); //画深度图

    if (_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.data.depths && tmp.charts.depthStatus === "open") {
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart().updateDepth(_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.data.depths);
    }

    Control.clearRefreshCounter();
    _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.timer = setTimeout(Control.TwoSecondThread, intervalTime);
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.redraw('All', false);
  }

  static TwoSecondThread() {
    let f = _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.chartMgr.getDataSource("frame0.k0").getLastDate();

    if (f === -1) {
      _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.requestParam = Control.setHttpRequestParam(_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.symbol, _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.range, _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.limit, null);
    } else {
      _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.requestParam = Control.setHttpRequestParam(_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.symbol, _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.range, null, f.toString());
    }

    Control.requestData();
  }

  static readCookie() {
    _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();
    _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].save();
    let tmp = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get(); // 主图样式

    let chart_style = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_select_chart_style');
    chart_style.find('a').each(function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_5___default()(this)[0].innerHTML === tmp.charts.chartStyle) {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).addClass('selected');
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).removeClass("selected");
      }
    });
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.setChartStyle('frame0.k0', tmp.charts.chartStyle); // 交易品种

    let symbol = tmp.charts.symbol;

    if (!_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.init) {
      symbol = _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.symbol;
      _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.init = true;
    }

    _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.symbol = symbol;
    Control.switchSymbolSelected(symbol); // 周期

    let period = tmp.charts.period;
    Control.switchPeriod(period); // 技术指标

    if (tmp.charts.indicsStatus === 'close') {
      Control.switchIndic('off');
    } else if (tmp.charts.indicsStatus === 'open') {
      Control.switchIndic('on');
    } // 主指标


    let mainIndic = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_select_main_indicator');
    mainIndic.find('a').each(function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).attr('name') === tmp.charts.mIndic) {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).addClass('selected');
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).removeClass("selected");
      }
    });
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart().setMainIndicator(tmp.charts.mIndic); // 主题

    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.setThemeName('frame0', tmp.theme); // 画图工具

    Control.switchTools('off');

    if (tmp.theme === 'Dark') {
      Control.switchTheme('dark');
    } else if (tmp.theme === 'Light') {
      Control.switchTheme('light');
    } // 语言


    Control.chartSwitchLanguage(tmp.language || "zh-cn"); // 深度图

    Control.switchDepth("on"); // if(tmp.charts.depthStatus==="close"){
    //   Control.switchDepth("off")
    // }else if(tmp.charts.depthStatus==="open"){
    //   Control.switchDepth("on");
    // }
  }

  static setHttpRequestParam(symbol, range, limit, since) {
    return {
      symbol: symbol,
      range: range,
      limit: limit,
      since: since
    };
  }

  static refreshTemplate() {
    _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.chartMgr = _templates__WEBPACK_IMPORTED_MODULE_3__["DefaultTemplate"].loadTemplate("frame0.k0", "");
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.redraw('All', true);
  }

  static chartSwitchLanguage(lang) {
    let langTmp = lang.replace(/-/, '_');
    jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_language_switch_tmp').find('span').each(function () {
      let name = jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).attr('name');
      let attr = jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).attr(langTmp);
      name = '.' + name;
      let obj = jquery__WEBPACK_IMPORTED_MODULE_5___default()(name)[0];
      if (!obj) return;
      jquery__WEBPACK_IMPORTED_MODULE_5___default()(name).each(function () {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()(this)[0].innerHTML = attr;
      });
    });
    jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_language_setting_div li a[name='" + lang + "']").addClass("selected");
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.setLanguage(lang);
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart().setTitle();
    let tmp = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();
    tmp.language = lang;
    _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].save();
    _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.onLangChangeFunc(lang);
  }

  static onSize(w, h) {
    let width = w || window.innerWidth;
    let chartWidth = width;
    let height = h || window.innerHeight;
    let container = jquery__WEBPACK_IMPORTED_MODULE_5___default()(_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.element);
    container.css({
      width: width + 'px',
      height: height + 'px'
    });
    let toolBar = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_toolbar');
    let toolPanel = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_toolpanel');
    let canvasGroup = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_canvasGroup');
    let tabBar = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_tabbar');
    let toolPanelShown = toolPanel[0].style.display !== 'inline' ? false : true;
    let tabBarShown = tabBar[0].style.display !== 'block' ? false : true;
    let toolBarRect = {};
    toolBarRect.x = 0;
    toolBarRect.y = 0;
    toolBarRect.w = chartWidth;
    toolBarRect.h = 29;
    let toolPanelRect = {};
    toolPanelRect.x = 0;
    toolPanelRect.y = toolBarRect.h + 1;
    toolPanelRect.w = toolPanelShown ? 32 : 0;
    toolPanelRect.h = height - toolPanelRect.y;
    let tabBarRect = {};
    tabBarRect.w = toolPanelShown ? chartWidth - (toolPanelRect.w + 1) : chartWidth;
    tabBarRect.h = tabBarShown ? 25 : -1;
    tabBarRect.x = chartWidth - tabBarRect.w;
    tabBarRect.y = height - (tabBarRect.h + 1);
    let canvasGroupRect = {};
    canvasGroupRect.x = tabBarRect.x;
    canvasGroupRect.y = toolPanelRect.y;
    canvasGroupRect.w = tabBarRect.w;
    canvasGroupRect.h = tabBarRect.y - toolPanelRect.y;
    toolBar.css({
      left: toolBarRect.x + 'px',
      top: toolBarRect.y + 'px',
      width: toolBarRect.w + 'px',
      height: toolBarRect.h + 'px'
    });

    if (toolPanelShown) {
      toolPanel.css({
        left: toolPanelRect.x + 'px',
        top: toolPanelRect.y - 30 + 'px',
        width: toolPanelRect.w + 'px',
        height: toolPanelRect.h + 'px'
      });
    }

    canvasGroup.css({
      left: canvasGroupRect.x + 'px',
      top: canvasGroupRect.y - 30 + 'px',
      // width: canvasGroupRect.w + 'px',
      height: canvasGroupRect.h + 'px'
    });
    let mainCanvas = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_mainCanvas')[0];
    let overlayCanvas = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_overlayCanvas')[0];
    mainCanvas.width = canvasGroupRect.w;
    mainCanvas.height = canvasGroupRect.h;
    overlayCanvas.width = canvasGroupRect.w;
    overlayCanvas.height = canvasGroupRect.h;

    if (tabBarShown) {
      tabBar.css({
        left: tabBarRect.x + 'px',
        top: tabBarRect.y - 30 + 'px',
        width: tabBarRect.w + 'px',
        height: tabBarRect.h + 'px'
      });
    }

    let dlgSettings = jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_parameter_settings");
    dlgSettings.css({
      left: chartWidth - dlgSettings.width() >> 1,
      top: height - dlgSettings.height() >> 1
    });
    let dlgLoading = jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_loading");
    dlgLoading.css({
      left: chartWidth - dlgLoading.width() >> 1,
      top: height - dlgLoading.height() >> 2
    });
    let domElemCache = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_dom_elem_cache');
    let rowTheme = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_select_theme')[0];
    let rowTools = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_enable_tools')[0];
    let rowIndic = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_enable_indicator')[0];
    let symbolTitle = jquery__WEBPACK_IMPORTED_MODULE_5___default()("#symbol_title")[0]; // let periodsVert = $('#chart_toolbar_periods_vert');

    let periodsHorz = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_toolbar_periods_horz')[0];
    let showIndic = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_show_indicator')[0];
    let showTools = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_show_tools')[0];
    let selectTheme = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_toolbar_theme')[0];
    let dropDownSettings = jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_dropdown_settings'); // let periodsVertNW = symbolTitle.offsetWidth + periodsVert[0].offsetWidth;
    // let periodsHorzNW = periodsVertNW + periodsHorz.offsetWidth;
    // let showIndicNW = periodsHorzNW + showIndic.offsetWidth + 4;
    // let showToolsNW = showIndicNW + showTools.offsetWidth + 4;
    // let selectThemeNW = showToolsNW + selectTheme.offsetWidth;
    // let dropDownSettingsW = dropDownSettings.find(".chart_dropdown_t")[0].offsetWidth + 300;
    // periodsVertNW += dropDownSettingsW;
    // periodsHorzNW += dropDownSettingsW;
    // showIndicNW += dropDownSettingsW;
    // showToolsNW += dropDownSettingsW;
    // selectThemeNW += dropDownSettingsW;
    // if (chartWidth < periodsHorzNW) {
    //     domElemCache.append(periodsHorz);
    // } else {
    //     periodsVert.after(periodsHorz);
    // }
    // if (chartWidth < showIndicNW) {
    //     domElemCache.append(showIndic);
    //     rowIndic.style.display = "";
    // } else {
    //     dropDownSettings.before(showIndic);
    //     rowIndic.style.display = "none";
    // }
    // if (chartWidth < showToolsNW) {
    //     domElemCache.append(showTools);
    //     rowTools.style.display = "";
    // } else {
    //     dropDownSettings.before(showTools);
    //     rowTools.style.display = "none";
    // }
    // if (chartWidth < selectThemeNW) {
    //     domElemCache.append(selectTheme);
    //     rowTheme.style.display = "";
    // } else {
    //     dropDownSettings.before(selectTheme);
    //     rowTheme.style.display = "none";
    // }

    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.redraw('All', true);
    _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.onResizeFunc(width, height);
  }

  static mouseWheel(e, delta) {
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.scale(delta > 0 ? 1 : -1);
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.redraw("All", true);
    return false;
  }

  static switchTheme(name) {
    jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_toolbar_theme a').removeClass('selected');
    jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_select_theme a').removeClass('selected');
    jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_toolbar_theme').find('a').each(function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).attr('name') === name) {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).addClass('selected');
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_select_theme a').each(function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).attr('name') === name) {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).addClass('selected');
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_5___default()(".chart_container").attr('class', "chart_container " + name);
    jquery__WEBPACK_IMPORTED_MODULE_5___default()(".marketName_ a").attr('class', name);

    if (name === 'dark') {
      jquery__WEBPACK_IMPORTED_MODULE_5___default()(".trade_container").addClass("dark").removeClass("light");
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.setThemeName('frame0', 'Dark');
      let tmp = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();
      tmp.theme = 'Dark';
      _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].save();
    } else if (name === 'light') {
      jquery__WEBPACK_IMPORTED_MODULE_5___default()(".trade_container").addClass("light").removeClass("dark");
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.setThemeName('frame0', 'Light');
      let tmp = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();
      tmp.theme = 'Light';
      _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].save();
    }

    let a = {};
    a.command = "set current themes";
    a.content = name;
    jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_output_interface_text').val(JSON.stringify(a));
    jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_output_interface_submit').submit();
    new _mevent__WEBPACK_IMPORTED_MODULE_4__["MEvent"]().raise(name);
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.redraw();
    _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.onThemeChangeFunc(name);
  }

  static switchTools(name) {
    jquery__WEBPACK_IMPORTED_MODULE_5___default()(".chart_dropdown_data").removeClass("chart_dropdown-hover");
    jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_toolpanel .chart_toolpanel_button").removeClass("selected");
    jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_enable_tools a').removeClass('selected');

    if (name === 'on') {
      jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_show_tools').addClass('selected');
      jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_enable_tools a').each(function () {
        if (jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).attr('name') === 'on') {
          jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).addClass('selected');
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_toolpanel')[0].style.display = 'inline';

      if (_chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance._drawingTool === _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].DrawingTool.Cursor) {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_Cursor').parent().addClass('selected');
      } else if (_chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance._drawingTool === _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].DrawingTool.CrossCursor) {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_CrossCursor').parent().addClass('selected');
      }
    } else if (name === 'off') {
      jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_show_tools').removeClass('selected');
      jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_enable_tools a').each(function () {
        if (jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).attr('name') === 'off') {
          jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).addClass('selected');
        }
      });
      jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_toolpanel')[0].style.display = 'none';
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.setRunningMode(_chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance._beforeDrawingTool);
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.redraw("All", true);
    }

    if (_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.isSized) {
      Control.onSize();
    } else {
      Control.onSize(_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.width, _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.height);
    }
  }

  static switchIndic(name) {
    jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_enable_indicator a').removeClass('selected');
    jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_enable_indicator a[name='" + name + "']").addClass('selected');

    if (name === 'on') {
      jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_show_indicator').addClass('selected');
      let tmp = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();
      tmp.charts.indicsStatus = 'open';
      _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].save();
      let value = tmp.charts.indics[1];
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart().setIndicator(1, value);
      jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_tabbar").find('a').each(function () {
        if (jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).attr('name') === value) jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).addClass('selected');
      });
      jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_tabbar')[0].style.display = 'block';
    } else if (name === 'off') {
      jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_show_indicator').removeClass('selected');
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart().setIndicator(2, 'NONE');
      let tmp = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();
      tmp.charts.indicsStatus = 'close';
      _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].save();
      jquery__WEBPACK_IMPORTED_MODULE_5___default()('#chart_tabbar')[0].style.display = 'none';
      jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_tabbar a").removeClass("selected");
    }

    if (_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.isSized) {
      Control.onSize();
    } else {
      Control.onSize(_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.width, _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.height);
    }
  }

  static switchPeriod(name) {
    jquery__WEBPACK_IMPORTED_MODULE_5___default()(".chart_container .chart_toolbar_tabgroup a").removeClass("selected");
    jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_toolbar_periods_vert ul a").removeClass("selected");
    jquery__WEBPACK_IMPORTED_MODULE_5___default()(".chart_container .chart_toolbar_tabgroup a").each(function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).parent().attr('name') === name) {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).addClass('selected');
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_toolbar_periods_vert ul a").each(function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).parent().attr('name') === name) {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()(this).addClass('selected');
      }
    });
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.showCursor();
    Control.calcPeriodWeight(name);

    if (name === 'line') {
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart().strIsLine = true;
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.setChartStyle('frame0.k0', 'Line');
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart().setCurrentPeriod('line');
      let settings = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();
      settings.charts.period = name;
      _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].save();
      return;
    }

    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart().strIsLine = false;
    let p = _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.tagMapPeriod[name];
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.setChartStyle('frame0.k0', _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get().charts.chartStyle);
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart().setCurrentPeriod(p);
    let settings = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();
    settings.charts.period = name;
    _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].save();
  }

  static switchDepth(name) {
    let tmp = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();

    if (name === "on") {
      tmp.charts.depthStatus = "open";
      jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_show_depth").addClass("selected");
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart().updateDepth(_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.data.depths);
    } else if (name === "off") {
      tmp.charts.depthStatus = "close";
      jquery__WEBPACK_IMPORTED_MODULE_5___default()("#chart_show_depth").removeClass("selected");
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart().updateDepth(null);
    }

    _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].save();
  }

  static reset(symbol) {
    _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.symbol = symbol;
  }

  static switchSymbolSelected(symbol, symbolName) {
    Control.reset(symbol);
    jquery__WEBPACK_IMPORTED_MODULE_5___default()(".symbol-title").text(symbolName);
    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart()._symbol = symbol;
    let settings = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();
    settings.charts.symbol = symbol;
    _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].save();
  }

  static switchSymbol(symbol, symbolName) {
    if (_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.type === "stomp" && _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.stompClient.ws.readyState === 1) {
      _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.subscribed.unsubscribe();
      _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.subscribed = _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.stompClient.subscribe(_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.subscribePath + '/' + symbol + '/' + _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.range, Control.subscribeCallback);
    }

    Control.switchSymbolSelected(symbol, symbolName);
    let settings = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get();

    if (settings.charts.period === "line") {
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart().strIsLine = true;
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.setChartStyle('frame0.k0', 'Line');
    } else {
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart().strIsLine = false;
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.setChartStyle('frame0.k0', _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get().charts.chartStyle);
    }

    _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getChart().setSymbol(symbol);
  }

  static calcPeriodWeight(period) {
    let index = period;
    if (period !== 'line') index = _kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.periodMap[_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.tagMapPeriod[period]];
    let periodWeight = _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].get().charts.period_weight;

    for (let i in periodWeight) {
      if (periodWeight[i] > periodWeight[index]) {
        periodWeight[i] -= 1;
      }
    }

    periodWeight[index] = 8;
    _chart_settings__WEBPACK_IMPORTED_MODULE_2__["ChartSettings"].save();
  }

}
Control.refreshCounter = 0;
Control.refreshHandler = null;

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Template", function() { return Template; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultTemplate", function() { return DefaultTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateMeasuringHandler", function() { return TemplateMeasuringHandler; });
/* harmony import */ var _chart_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(142);
/* harmony import */ var _chart_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(186);
/* harmony import */ var _data_sources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(152);
/* harmony import */ var _data_providers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(211);
/* harmony import */ var _areas__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(204);
/* harmony import */ var _plotters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(209);
/* harmony import */ var _timeline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(335);
/* harmony import */ var _cname__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(185);
/* harmony import */ var _layouts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(336);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(187);
/* harmony import */ var _ranges__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(243);











class Template {
  static createCandlestickDataSource(dsAlias) {
    return new _data_sources__WEBPACK_IMPORTED_MODULE_2__["MainDataSource"](dsAlias);
  }

  static createDataSource(dsName, dsAlias, createFunc) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance;
    if (mgr.getCachedDataSource(dsAlias) === null) mgr.setCachedDataSource(dsAlias, createFunc(dsAlias));
    mgr.setCurrentDataSource(dsName, dsAlias);
    mgr.updateData(dsName, null);
  }

  static createTableComps(dsName) {
    this.createMainChartComps(dsName);
    this.createTimelineComps(dsName);
  }

  static createMainChartComps(dsName) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance;
    let tableLayout = mgr.getArea(dsName + ".charts");
    let areaName = dsName + ".main";
    let rangeAreaName = areaName + "Range";
    let area = new _areas__WEBPACK_IMPORTED_MODULE_4__["MainArea"](areaName);
    mgr.setArea(areaName, area);
    tableLayout.addArea(area);
    let rangeArea = new _areas__WEBPACK_IMPORTED_MODULE_4__["MainRangeArea"](rangeAreaName);
    mgr.setArea(rangeAreaName, rangeArea);
    tableLayout.addArea(rangeArea);
    let dp = new _data_providers__WEBPACK_IMPORTED_MODULE_3__["MainDataProvider"](areaName + ".main");
    mgr.setDataProvider(dp.getName(), dp);
    mgr.setMainIndicator(dsName, "MA");
    let range = new _ranges__WEBPACK_IMPORTED_MODULE_10__["MainRange"](areaName);
    mgr.setRange(range.getName(), range);
    range.setPaddingTop(28);
    range.setPaddingBottom(12);
    let plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["MainAreaBackgroundPlotter"](areaName + ".background");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["CGridPlotter"](areaName + ".grid");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["CandlestickPlotter"](areaName + ".main");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["MinMaxPlotter"](areaName + ".decoration");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["MainInfoPlotter"](areaName + ".info");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["SelectionPlotter"](areaName + ".selection");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["CDynamicLinePlotter"](areaName + ".tool");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["RangeAreaBackgroundPlotter"](areaName + "Range.background");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["COrderGraphPlotter"](areaName + "Range.grid");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["RangePlotter"](areaName + "Range.main");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["RangeSelectionPlotter"](areaName + "Range.selection");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["LastClosePlotter"](areaName + "Range.decoration");
    mgr.setPlotter(plotter.getName(), plotter);
  }

  static createIndicatorChartComps(dsName, indicName) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance;
    let tableLayout = mgr.getArea(dsName + ".charts");
    let areaName = dsName + ".indic" + tableLayout.getNextRowId();
    let rangeAreaName = areaName + "Range";
    let area = new _areas__WEBPACK_IMPORTED_MODULE_4__["IndicatorArea"](areaName);
    mgr.setArea(areaName, area);
    tableLayout.addArea(area);
    let rowIndex = tableLayout.getAreaCount() >> 1;
    let heights = _chart_settings__WEBPACK_IMPORTED_MODULE_1__["ChartSettings"].get().charts.areaHeight;

    if (heights.length > rowIndex) {
      let a, i;

      for (i = 0; i < rowIndex; i++) {
        a = tableLayout.getAreaAt(i << 1);
        a.setTop(0);
        a.setBottom(heights[i]);
      }

      area.setTop(0);
      area.setBottom(heights[rowIndex]);
    }

    let rangeArea = new _areas__WEBPACK_IMPORTED_MODULE_4__["IndicatorRangeArea"](rangeAreaName);
    mgr.setArea(rangeAreaName, rangeArea);
    tableLayout.addArea(rangeArea);
    let dp = new _data_providers__WEBPACK_IMPORTED_MODULE_3__["IndicatorDataProvider"](areaName + ".secondary");
    mgr.setDataProvider(dp.getName(), dp);

    if (mgr.setIndicator(areaName, indicName) === false) {
      mgr.removeIndicator(areaName);
      return;
    }

    let plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["MainAreaBackgroundPlotter"](areaName + ".background");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["CGridPlotter"](areaName + ".grid");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["IndicatorPlotter"](areaName + ".secondary");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["IndicatorInfoPlotter"](areaName + ".info");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["SelectionPlotter"](areaName + ".selection");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["RangeAreaBackgroundPlotter"](areaName + "Range.background");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["RangePlotter"](areaName + "Range.main");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["RangeSelectionPlotter"](areaName + "Range.selection");
    mgr.setPlotter(plotter.getName(), plotter);
  }

  static createTimelineComps(dsName) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance;
    let plotter;
    let timeline = new _timeline__WEBPACK_IMPORTED_MODULE_6__["Timeline"](dsName);
    mgr.setTimeline(timeline.getName(), timeline);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["TimelineAreaBackgroundPlotter"](dsName + ".timeline.background");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["TimelinePlotter"](dsName + ".timeline.main");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["TimelineSelectionPlotter"](dsName + ".timeline.selection");
    mgr.setPlotter(plotter.getName(), plotter);
  }

  static createLiveOrderComps(dsName) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance;
    let plotter;
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["BackgroundPlotter"](dsName + ".main.background");
    mgr.setPlotter(plotter.getName(), plotter); //plotter = new plotters.CLiveOrderPlotter(dsName + ".main.main");

    mgr.setPlotter(plotter.getName(), plotter);
  }

  static createLiveTradeComps(dsName) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance;
    let plotter;
    plotter = new _plotters__WEBPACK_IMPORTED_MODULE_5__["BackgroundPlotter"](dsName + ".main.background");
    mgr.setPlotter(plotter.getName(), plotter); //plotter = new plotters.CLiveTradePlotter(dsName + ".main.main");

    mgr.setPlotter(plotter.getName(), plotter);
  }

}
class DefaultTemplate extends Template {
  static loadTemplate(dsName, dsAlias) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance;
    let settings = _chart_settings__WEBPACK_IMPORTED_MODULE_1__["ChartSettings"].get();
    let frameName = new _cname__WEBPACK_IMPORTED_MODULE_7__["CName"](dsName).getCompAt(0);
    mgr.unloadTemplate(frameName);
    this.createDataSource(dsName, dsAlias, this.createCandlestickDataSource);
    let frame = new _layouts__WEBPACK_IMPORTED_MODULE_8__["DockableLayout"](frameName);
    mgr.setFrame(frame.getName(), frame);
    mgr.setArea(frame.getName(), frame);
    frame.setGridColor(_themes__WEBPACK_IMPORTED_MODULE_9__["Theme"].Color.Grid1);
    let area = new _areas__WEBPACK_IMPORTED_MODULE_4__["TimelineArea"](dsName + ".timeline");
    mgr.setArea(area.getName(), area);
    frame.addArea(area);
    area.setDockStyle(_areas__WEBPACK_IMPORTED_MODULE_4__["ChartArea"].DockStyle.Bottom);
    area.Measuring.addHandler(area, TemplateMeasuringHandler.onMeasuring);
    let tableLayout = new _layouts__WEBPACK_IMPORTED_MODULE_8__["TableLayout"](dsName + ".charts");
    mgr.setArea(tableLayout.getName(), tableLayout);
    tableLayout.setDockStyle(_areas__WEBPACK_IMPORTED_MODULE_4__["ChartArea"].DockStyle.Fill);
    frame.addArea(tableLayout);
    this.createTableComps(dsName);
    mgr.setThemeName(frameName, settings.theme);
    return mgr;
  }

}
class TemplateMeasuringHandler {
  static onMeasuring(sender, args) {
    let width = args.Width;
    let height = args.Height;
    let areaName = sender.getNameObject().getCompAt(2);

    if (areaName === "timeline") {
      sender.setMeasuredDimension(width, 22);
    }
  }

}

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPoint", function() { return CPoint; });
/* harmony import */ var _chart_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(142);
/* harmony import */ var _named_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(145);
/* harmony import */ var _data_sources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(152);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(158);




class CPoint extends _named_object__WEBPACK_IMPORTED_MODULE_1__["NamedObject"] {
  constructor(name) {
    super(name);
    this.pos = {
      index: -1,
      value: -1
    };
    this.state = CPoint.state.Hide;
  }

  getChartObjects() {
    let ppMgr = _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance;
    let ppCDS = ppMgr.getDataSource("frame0.k0");
    if (ppCDS === null || !_util__WEBPACK_IMPORTED_MODULE_3__["Util"].isInstance(ppCDS, _data_sources__WEBPACK_IMPORTED_MODULE_2__["MainDataSource"])) return null;
    let ppTimeline = ppMgr.getTimeline("frame0.k0");
    if (ppTimeline === null) return null;
    let ppRange = ppMgr.getRange("frame0.k0.main");
    if (ppRange === null) return null;
    return {
      pMgr: ppMgr,
      pCDS: ppCDS,
      pTimeline: ppTimeline,
      pRange: ppRange
    };
  }

  setPosXY(x, y) {
    let pObj = this.getChartObjects();
    let i = pObj.pTimeline.toIndex(x);
    let v = pObj.pRange.toValue(y);
    let result = this.snapValue(i, v);
    if (result !== null) v = result;
    this.setPosIV(i, v);
  }

  setPosXYNoSnap(x, y) {
    let pObj = this.getChartObjects();
    let i = pObj.pTimeline.toIndex(x);
    let v = pObj.pRange.toValue(y);
    this.setPosIV(i, v);
  }

  setPosIV(i, v) {
    this.pos = {
      index: i,
      value: v
    };
  }

  getPosXY() {
    let pObj = this.getChartObjects();

    let _x = pObj.pTimeline.toItemCenter(this.pos.index);

    let _y = pObj.pRange.toY(this.pos.value);

    return {
      x: _x,
      y: _y
    };
  }

  getPosIV() {
    return {
      i: this.pos.index,
      v: this.pos.value
    };
  }

  setState(s) {
    this.state = s;
  }

  getState() {
    return this.state;
  }

  isSelected(x, y) {
    let xy = this.getPosXY();
    if (x < xy.x - 4 || x > xy.x + 4 || y < xy.y - 4 || y > xy.y + 4) return false;
    this.setState(CPoint.state.Highlight);
    return true;
  }

  snapValue(i, v) {
    let pObj = this.getChartObjects();
    let result = null;
    let first = Math.floor(pObj.pTimeline.getFirstIndex());
    let last = Math.floor(pObj.pTimeline.getLastIndex());
    if (i < first || i > last) return result;
    let y = pObj.pRange.toY(v);
    let pData = pObj.pCDS.getDataAt(i);
    if (pData === null || pData === undefined) return result;
    let pDataPre = null;
    if (i > 0) pDataPre = pObj.pCDS.getDataAt(i - 1);else pDataPre = pObj.pCDS.getDataAt(i);
    let candleStickStyle = pObj.pMgr.getChartStyle(pObj.pCDS.getFrameName());
    let open = pObj.pRange.toY(pData.open);
    let high = pObj.pRange.toY(pData.high);
    let low = pObj.pRange.toY(pData.low);
    let close = pObj.pRange.toY(pData.close);

    if (candleStickStyle === "CandleStickHLC") {
      open = pObj.pRange.toY(pDataPre.close);
    }

    let dif_open = Math.abs(open - y);
    let dif_high = Math.abs(high - y);
    let dif_low = Math.abs(low - y);
    let dif_close = Math.abs(close - y);

    if (dif_open <= dif_high && dif_open <= dif_low && dif_open <= dif_close) {
      if (dif_open < 6) result = pData.open;
    }

    if (dif_high <= dif_open && dif_high <= dif_low && dif_high <= dif_close) {
      if (dif_high < 6) result = pData.high;
    }

    if (dif_low <= dif_open && dif_low <= dif_high && dif_low <= dif_close) {
      if (dif_low < 6) result = pData.low;
    }

    if (dif_close <= dif_open && dif_close <= dif_high && dif_close <= dif_low) {
      if (dif_close < 6) result = pData.close;
    }

    return result;
  }

}
CPoint.state = {
  Hide: 0,
  Show: 1,
  Highlight: 2
};

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CToolObject", function() { return CToolObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CBiToolObject", function() { return CBiToolObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CTriToolObject", function() { return CTriToolObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CBandLineObject", function() { return CBandLineObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CBiParallelLineObject", function() { return CBiParallelLineObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CBiParallelRayLineObject", function() { return CBiParallelRayLineObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CFibFansObject", function() { return CFibFansObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CFibRetraceObject", function() { return CFibRetraceObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHoriRayLineObject", function() { return CHoriRayLineObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHoriSegLineObject", function() { return CHoriSegLineObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHoriStraightLineObject", function() { return CHoriStraightLineObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CRayLineObject", function() { return CRayLineObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSegLineObject", function() { return CSegLineObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CStraightLineObject", function() { return CStraightLineObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CTriParallelLineObject", function() { return CTriParallelLineObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CVertiStraightLineObject", function() { return CVertiStraightLineObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPriceLineObject", function() { return CPriceLineObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CArrowLineObject", function() { return CArrowLineObject; });
/* harmony import */ var _chart_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(142);
/* harmony import */ var _named_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(145);
/* harmony import */ var _cpoint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(207);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(158);
/* harmony import */ var _data_sources__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(152);
/* harmony import */ var _plotters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(209);






class CToolObject extends _named_object__WEBPACK_IMPORTED_MODULE_1__["NamedObject"] {
  constructor(name) {
    super(name);
    this.drawer = null;
    this.state = CToolObject.state.BeforeDraw;
    this.points = [];
    this.step = 0;
  }

  getChartObjects() {
    let ppMgr = _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance;
    let ppCDS = ppMgr.getDataSource("frame0.k0");
    if (ppCDS === null || !_util__WEBPACK_IMPORTED_MODULE_3__["Util"].isInstance(ppCDS, _data_sources__WEBPACK_IMPORTED_MODULE_4__["MainDataSource"])) return null;
    let ppTimeline = ppMgr.getTimeline("frame0.k0");
    if (ppTimeline === null) return null;
    let ppArea = ppMgr.getArea('frame0.k0.main');
    if (ppArea === null) return null;
    let ppRange = ppMgr.getRange("frame0.k0.main");
    if (ppRange === null) return null;
    return {
      pMgr: ppMgr,
      pCDS: ppCDS,
      pTimeline: ppTimeline,
      pArea: ppArea,
      pRange: ppRange
    };
  }

  isValidMouseXY(x, y) {
    let pObj = this.getChartObjects();
    let areaPos = {
      left: pObj.pArea.getLeft(),
      top: pObj.pArea.getTop(),
      right: pObj.pArea.getRight(),
      bottom: pObj.pArea.getBottom()
    };
    return !(x < areaPos.left || x > areaPos.right || y < areaPos.top || y > areaPos.bottom);
  }

  getPlotter() {
    return this.drawer;
  }

  setState(s) {
    this.state = s;
  }

  getState() {
    return this.state;
  }

  addPoint(point) {
    this.points.push(point);
  }

  getPoint(i) {
    return this.points[i];
  }

  acceptMouseMoveEvent(x, y) {
    if (this.isValidMouseXY(x, y) === false) {
      return false;
    }

    if (this.state === CToolObject.state.BeforeDraw) {
      this.setBeforeDrawPos(x, y);
    } else if (this.state === CToolObject.state.Draw) {
      this.setDrawPos(x, y);
    } else if (this.state === CToolObject.state.AfterDraw) {
      this.setAfterDrawPos(x, y);
    }

    return true;
  }

  acceptMouseDownEvent(x, y) {
    if (this.isValidMouseXY(x, y) === false) {
      return false;
    }

    if (this.state === CToolObject.state.BeforeDraw) {
      this.setDrawPos(x, y);
      this.setState(CToolObject.state.Draw);
    } else if (this.state === CToolObject.state.Draw) {
      this.setAfterDrawPos(x, y);
      if (this.step === 0) this.setState(CToolObject.state.AfterDraw);
    } else if (this.state === CToolObject.state.AfterDraw) {
      if (CToolObject.prototype.isSelected(x, y)) {
        this.setDrawPos(x, y);
        this.setState(CToolObject.state.Draw);
      } else {
        this.oldx = x;
        this.oldy = y;
      }
    }

    return true;
  }

  acceptMouseDownMoveEvent(x, y) {
    if (this.isValidMouseXY(x, y) === false) {
      return false;
    }

    if (this.state === CToolObject.state.Draw) {
      this.setDrawPos(x, y);
    } else if (this.state === CToolObject.state.AfterDraw) {
      let pObj = this.getChartObjects();

      let _width = pObj.pTimeline.getItemWidth();

      let _height = pObj.pRange;
      if (Math.abs(x - this.oldx) < _width && Math.abs(y - this.oldy) === 0) return true;

      let _old_x = pObj.pTimeline.toIndex(this.oldx);

      let _old_y = pObj.pRange.toValue(this.oldy);

      let _new_x = pObj.pTimeline.toIndex(x);

      let _new_y = pObj.pRange.toValue(y);

      this.oldx = x;
      this.oldy = y;

      let _dif_x = _new_x - _old_x;

      let _dif_y = _new_y - _old_y;

      for (let index in this.points) {
        this.points[index].pos.index += _dif_x;
        this.points[index].pos.value += _dif_y;
      }
    }

    return true;
  }

  acceptMouseUpEvent(x, y) {
    if (this.isValidMouseXY(x, y) === false) {
      return false;
    }

    if (this.state === CToolObject.state.Draw) {
      this.setAfterDrawPos(x, y);
      if (this.step === 0) this.setState(CToolObject.state.AfterDraw);
      return true;
    }

    return false;
  }

  setBeforeDrawPos(x, y) {
    for (let index in this.points) {
      this.points[index].setPosXY(x, y);
      this.points[index].setState(_cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Show);
    }
  }

  setDrawPos(x, y) {
    for (let index in this.points) {
      if (this.points[index].getState() === _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Highlight) {
        this.points[index].setPosXY(x, y);
      }
    }
  }

  setAfterDrawPos(x, y) {
    if (this.step !== 0) {
      this.step -= 1;
    }

    for (let index in this.points) {
      this.points[index].setState(_cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Hide);
    }

    if (this.step === 0) {
      let pObj = this.getChartObjects();
      pObj.pMgr.setNormalMode();
    }
  }

  isSelected(x, y) {
    let isFind = false;

    for (let index in this.points) {
      if (this.points[index].isSelected(x, y)) {
        this.points[index].setState(_cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Highlight);
        isFind = true;
        break;
      }
    }

    if (isFind === true) {
      this.select();
      return true;
    }

    return false;
  }

  select() {
    for (let index in this.points) {
      if (this.points[index].getState() === _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Hide) {
        this.points[index].setState(_cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Show);
      }
    }
  }

  unselect() {
    for (let index in this.points) {
      if (this.points[index].getState() !== _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Hide) {
        this.points[index].setState(_cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Hide);
      }
    }
  }

  calcDistance(point1, point2, point3) {
    let xa = point1.getPosXY().x;
    let ya = point1.getPosXY().y;
    let xb = point2.getPosXY().x;
    let yb = point2.getPosXY().y;
    let xc = point3.getPosXY().x;
    let yc = point3.getPosXY().y;
    let a1 = xa - xc;
    let a2 = ya - yc;
    let b1 = xb - xc;
    let b2 = yb - yc;
    let area = Math.abs(a1 * b2 - a2 * b1);
    let len = Math.sqrt(Math.pow(xb - xa, 2) + Math.pow(yb - ya, 2));
    return area / len;
  }

  calcGap(r, x, y) {
    let xa = r.sx;
    let ya = r.sy;
    let xb = r.ex;
    let yb = r.ey;
    let xc = x;
    let yc = y;
    let a1 = xa - xc;
    let a2 = ya - yc;
    let b1 = xb - xc;
    let b2 = yb - yc;
    let area = Math.abs(a1 * b2 - a2 * b1);
    let len = Math.sqrt(Math.pow(xb - xa, 2) + Math.pow(yb - ya, 2));
    return area / len;
  }

  isWithRect(point1, point2, point3) {
    let sx = point1.getPosXY().x;
    let sy = point1.getPosXY().y;
    let ex = point2.getPosXY().x;
    let ey = point2.getPosXY().y;
    let x = point3.getPosXY().x;
    let y = point3.getPosXY().y;

    if (sx > ex) {
      sx += 4;
      ex -= 4;
    } else {
      sx -= 4;
      ex += 4;
    }

    if (sy > ey) {
      sy += 4;
      ey -= 4;
    } else {
      sy -= 4;
      ey += 4;
    }

    if (sx <= x && ex >= x && sy <= y && ey >= y) {
      return true;
    }

    if (sx >= x && ex <= x && sy <= y && ey >= y) {
      return true;
    }

    if (sx <= x && ex >= x && sy >= y && ey <= y) {
      return true;
    }

    if (sx >= x && ex <= x && sy >= y && ey <= y) {
      return true;
    }

    return false;
  }

}
CToolObject.state = {
  BeforeDraw: 0,
  Draw: 1,
  AfterDraw: 2
};
class CBiToolObject extends CToolObject {
  constructor(name) {
    super(name);
    this.addPoint(new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"](name));
    this.addPoint(new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"](name));
  }

  setBeforeDrawPos(x, y) {
    this.step = 1;
    super.setBeforeDrawPos(x, y);
    this.getPoint(0).setState(_cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Show);
    this.getPoint(1).setState(_cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Highlight);
  }

}
class CTriToolObject extends CToolObject {
  constructor(name) {
    super(name);
    this.addPoint(new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"](name));
    this.addPoint(new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"](name));
    this.addPoint(new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"](name));
  }

  setBeforeDrawPos(x, y) {
    this.step = 2;
    super.setBeforeDrawPos(x, y);
    this.getPoint(0).setState(_cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Show);
    this.getPoint(1).setState(_cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Show);
    this.getPoint(2).setState(_cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Highlight);
  }

  setAfterDrawPos(x, y) {
    if (this.step !== 0) this.step -= 1;

    if (this.step === 0) {
      for (let index in this.points) {
        this.points[index].setState(_cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Hide);
      }
    } else {
      this.getPoint(0).setState(_cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Show);
      this.getPoint(1).setState(_cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Highlight);
      this.getPoint(2).setState(_cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Show);
    }

    if (this.step === 0) {
      let pObj = this.getChartObjects();
      pObj.pMgr.setNormalMode();
    }
  }

}
class CBandLineObject extends CBiToolObject {
  constructor(name) {
    super(name);
    this.drawer = new _plotters__WEBPACK_IMPORTED_MODULE_5__["DrawBandLinesPlotter"](name, this);
  }

  isSelected(x, y) {
    if (super.isSelected(x, y) === true) {
      return true;
    }

    let c = new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"]("frame0.k0");
    c.setPosXY(x, y);
    let sx = this.getPoint(0).getPosXY().x;
    let sy = this.getPoint(0).getPosXY().y;
    let ex = this.getPoint(1).getPosXY().x;
    let ey = this.getPoint(1).getPosXY().y;
    let fibSequence = [100.0, 87.5, 75.0, 62.5, 50.0, 37.5, 25.0, 12.5, 0.0];

    for (let i = 0; i < fibSequence.length; i++) {
      let stage_y = sy + (100 - fibSequence[i]) / 100 * (ey - sy);

      if (stage_y < y + 4 && stage_y > y - 4) {
        this.select();
        return true;
      }
    }

    return false;
  }

}
class CBiParallelLineObject extends CTriToolObject {
  constructor(name) {
    super(name);
    this.drawer = new _plotters__WEBPACK_IMPORTED_MODULE_5__["DrawBiParallelLinesPlotter"](name, this);
  }

  isSelected(x, y) {
    if (super.isSelected(x, y) === true) {
      return true;
    }

    let _0x = this.getPoint(0).getPosXY().x;
    let _0y = this.getPoint(0).getPosXY().y;
    let _1x = this.getPoint(1).getPosXY().x;
    let _1y = this.getPoint(1).getPosXY().y;
    let _2x = this.getPoint(2).getPosXY().x;
    let _2y = this.getPoint(2).getPosXY().y;
    let _a = {
      x: _0x - _1x,
      y: _0y - _1y
    };
    let _b = {
      x: _0x - _2x,
      y: _0y - _2y
    };
    let _c = {
      x: _a.x + _b.x,
      y: _a.y + _b.y
    };

    let _3x = _0x - _c.x;

    let _3y = _0y - _c.y;

    let r1 = {
      sx: _0x,
      sy: _0y,
      ex: _2x,
      ey: _2y
    };
    let r2 = {
      sx: _1x,
      sy: _1y,
      ex: _3x,
      ey: _3y
    };

    if (this.calcGap(r1, x, y) > 4 && this.calcGap(r2, x, y) > 4) {
      return false;
    }

    return true;
  }

}
class CBiParallelRayLineObject extends CTriToolObject {
  constructor(name) {
    super(name);
    this.drawer = new _plotters__WEBPACK_IMPORTED_MODULE_5__["DrawBiParallelRayLinesPlotter"](name, this);
  }

  isSelected(x, y) {
    if (super.isSelected(x, y) === true) {
      return true;
    }

    let _0x = this.getPoint(0).getPosXY().x;
    let _0y = this.getPoint(0).getPosXY().y;
    let _1x = this.getPoint(1).getPosXY().x;
    let _1y = this.getPoint(1).getPosXY().y;
    let _2x = this.getPoint(2).getPosXY().x;
    let _2y = this.getPoint(2).getPosXY().y;
    let _a = {
      x: _0x - _1x,
      y: _0y - _1y
    };
    let _b = {
      x: _0x - _2x,
      y: _0y - _2y
    };
    let _c = {
      x: _a.x + _b.x,
      y: _a.y + _b.y
    };

    let _3x = _0x - _c.x;

    let _3y = _0y - _c.y;

    let r1 = {
      sx: _0x,
      sy: _0y,
      ex: _2x,
      ey: _2y
    };
    let r2 = {
      sx: _1x,
      sy: _1y,
      ex: _3x,
      ey: _3y
    };

    if (r1.ex > r1.sx && x > r1.sx - 4 || r1.ex < r1.sx && x < r1.sx + 4 || r2.ex > r2.sx && x > r2.sx - 4 || r2.ex < r2.sx && x < r2.sx + 4) {
      if (this.calcGap(r1, x, y) > 4 && this.calcGap(r2, x, y) > 4) {
        return false;
      }
    } else {
      return false;
    }

    this.select();
    return true;
  }

}
class CFibFansObject extends CBiToolObject {
  constructor(name) {
    super(name);
    this.drawer = new _plotters__WEBPACK_IMPORTED_MODULE_5__["DrawFibFansPlotter"](name, this);
  }

  isSelected(x, y) {
    if (super.isSelected(x, y) === true) {
      return true;
    }

    let c = new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"]("frame0.k0");
    c.setPosXY(x, y);
    let sx = this.getPoint(0).getPosXY().x;
    let sy = this.getPoint(0).getPosXY().y;
    let ex = this.getPoint(1).getPosXY().x;
    let ey = this.getPoint(1).getPosXY().y;
    let pObj = this.getChartObjects();
    let areaPos = {
      left: pObj.pArea.getLeft(),
      top: pObj.pArea.getTop(),
      right: pObj.pArea.getRight(),
      bottom: pObj.pArea.getBottom()
    };
    let fibFansSequence = [0, 38.2, 50, 61.8];

    for (let i = 0; i < fibFansSequence.length; i++) {
      let stageY = sy + (100 - fibFansSequence[i]) / 100 * (ey - sy);
      let tempStartPt = {
        x: sx,
        y: sy
      };
      let tempEndPt = {
        x: ex,
        y: stageY
      };
      let crossPt = this.getRectCrossPt(areaPos, tempStartPt, tempEndPt);
      let lenToStartPt = Math.pow(crossPt[0].x - sx, 2) + Math.pow(crossPt[0].y - sy, 2);
      let lenToEndPt = Math.pow(crossPt[0].x - ex, 2) + Math.pow(crossPt[0].y - ey, 2);
      let tempCrossPt = lenToStartPt > lenToEndPt ? {
        x: crossPt[0].x,
        y: crossPt[0].y
      } : {
        x: crossPt[1].x,
        y: crossPt[1].y
      };
      if (tempCrossPt.x > sx && x < sx) continue;
      if (tempCrossPt.x < sx && x > sx) continue;
      let a = new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"]("frame0.k0");
      a.setPosXY(sx, sy);
      let b = new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"]("frame0.k0");
      b.setPosXY(tempCrossPt.x, tempCrossPt.y);

      if (this.calcDistance(a, b, c) > 4) {
        continue;
      }

      this.select();
      return true;
    }

    return false;
  }

}
class CFibRetraceObject extends CBiToolObject {
  constructor(name) {
    super(name);
    this.drawer = new _plotters__WEBPACK_IMPORTED_MODULE_5__["DrawFibRetracePlotter"](name, this);
  }

  isSelected(x, y) {
    if (super.isSelected(x, y) === true) {
      return true;
    }

    let c = new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"]("frame0.k0");
    c.setPosXY(x, y);
    let sx = this.getPoint(0).getPosXY().x;
    let sy = this.getPoint(0).getPosXY().y;
    let ex = this.getPoint(1).getPosXY().x;
    let ey = this.getPoint(1).getPosXY().y;
    let fibSequence = [100.0, 78.6, 61.8, 50.0, 38.2, 23.6, 0.0];

    for (let i = 0; i < fibSequence.length; i++) {
      let stage_y = sy + (100 - fibSequence[i]) / 100 * (ey - sy);

      if (stage_y < y + 4 && stage_y > y - 4) {
        this.select();
        return true;
      }
    }

    return false;
  }

}
class CHoriRayLineObject extends CBiToolObject {
  constructor(name) {
    super(name);
    this.drawer = new _plotters__WEBPACK_IMPORTED_MODULE_5__["DrawHoriRayLinesPlotter"](name, this);
  }

  setDrawPos(x, y) {
    if (this.points[0].getState() === _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Highlight) {
      this.points[0].setPosXY(x, y);
      this.points[1].setPosXYNoSnap(this.points[1].getPosXY().x, this.points[0].getPosXY().y);
      return;
    }

    if (this.points[1].getState() === _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Highlight) {
      this.points[1].setPosXY(x, y);
      this.points[0].setPosXYNoSnap(this.points[0].getPosXY().x, this.points[1].getPosXY().y);
    }
  }

  isSelected(x, y) {
    if (super.isSelected(x, y) === true) {
      return true;
    }

    let c = new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"]("frame0.k0");
    c.setPosXY(x, y);
    let sy = this.getPoint(0).getPosXY().y;
    let sx = this.getPoint(0).getPosXY().x;
    let ex = this.getPoint(1).getPosXY().x;

    if (y > sy + 4 || y < sy - 4) {
      return false;
    }

    if (ex > sx && x < sx - 4) {
      return false;
    }

    if (ex < sx && x > sx + 4) {
      return false;
    }

    this.select();
    return true;
  }

}
class CHoriSegLineObject extends CBiToolObject {
  constructor(name) {
    super(name);
    this.drawer = new _plotters__WEBPACK_IMPORTED_MODULE_5__["DrawHoriSegLinesPlotter"](name, this);
  }

  setDrawPos(x, y) {
    if (this.points[0].getState() === _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Highlight) {
      this.points[0].setPosXY(x, y);
      this.points[1].setPosXYNoSnap(this.points[1].getPosXY().x, this.points[0].getPosXY().y);
      return;
    }

    if (this.points[1].getState() === _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"].state.Highlight) {
      this.points[1].setPosXY(x, y);
      this.points[0].setPosXYNoSnap(this.points[0].getPosXY().x, this.points[1].getPosXY().y);
    }
  }

  isSelected(x, y) {
    if (super.isSelected(x, y) === true) {
      return true;
    }

    let c = new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"]("frame0.k0");
    c.setPosXY(x, y);
    let sy = this.getPoint(0).getPosXY().y;
    let sx = this.getPoint(0).getPosXY().x;
    let ex = this.getPoint(1).getPosXY().x;

    if (y > sy + 4 || y < sy - 4) {
      return false;
    }

    if (sx > ex && (x > sx + 4 || x < ex - 4)) {
      return false;
    }

    if (sx < ex && (x < sx - 4 || x > ex + 4)) {
      return false;
    }

    this.select();
    return true;
  }

}
class CHoriStraightLineObject extends CBiToolObject {
  constructor(name) {
    super(name);
    this.drawer = new _plotters__WEBPACK_IMPORTED_MODULE_5__["DrawHoriStraightLinesPlotter"](name, this);
  }

  setDrawPos(x, y) {
    for (let index in this.points) {
      this.points[index].setPosXY(x, y);
    }
  }

  isSelected(x, y) {
    if (super.isSelected(x, y) === true) {
      return true;
    }

    let c = new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"]("frame0.k0");
    c.setPosXY(x, y);
    let sy = this.getPoint(0).getPosXY().y;

    if (y > sy + 4 || y < sy - 4) {
      return false;
    }

    this.select();
    return true;
  }

}
class CRayLineObject extends CBiToolObject {
  constructor(name) {
    super(name);
    this.drawer = new _plotters__WEBPACK_IMPORTED_MODULE_5__["DrawRayLinesPlotter"](name, this);
  }

  isSelected(x, y) {
    if (super.isSelected(x, y) === true) {
      return true;
    }

    let c = new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"]("frame0.k0");
    c.setPosXY(x, y);
    let sx = this.getPoint(0).getPosXY().x;
    let ex = this.getPoint(1).getPosXY().x;

    if (ex > sx && x < sx - 4) {
      return false;
    }

    if (ex < sx && x > sx + 4) {
      return false;
    }

    if (this.calcDistance(this.getPoint(0), this.getPoint(1), c) < 4) {
      this.select();
      return true;
    }

    return false;
  }

}
class CSegLineObject extends CBiToolObject {
  constructor(name) {
    super(name);
    this.drawer = new _plotters__WEBPACK_IMPORTED_MODULE_5__["DrawSegLinesPlotter"](name, this);
  }

  isSelected(x, y) {
    if (super.isSelected(x, y) === true) {
      return true;
    }

    let c = new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"]("frame0.k0");
    c.setPosXY(x, y);

    if (this.isWithRect(this.getPoint(0), this.getPoint(1), c) === false) {
      return false;
    }

    if (this.calcDistance(this.getPoint(0), this.getPoint(1), c) < 4) {
      this.select();
      return true;
    }

    return false;
  }

}
class CStraightLineObject extends CBiToolObject {
  constructor(name) {
    super(name);
    this.drawer = new _plotters__WEBPACK_IMPORTED_MODULE_5__["DrawStraightLinesPlotter"](name, this);
  }

  isSelected(x, y) {
    if (super.isSelected(x, y) === true) {
      return true;
    }

    let c = new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"]("frame0.k0");
    c.setPosXY(x, y);

    if (this.calcDistance(this.getPoint(0), this.getPoint(1), c) < 4) {
      this.select();
      return true;
    }

    return false;
  }

}
class CTriParallelLineObject extends CTriToolObject {
  constructor(name) {
    super(name);
    this.drawer = new _plotters__WEBPACK_IMPORTED_MODULE_5__["DrawTriParallelLinesPlotter"](name, this);
  }

  isSelected(x, y) {
    if (super.isSelected(x, y) === true) {
      return true;
    }

    let pObj = this.getChartObjects();
    let _0x = this.getPoint(0).getPosXY().x;
    let _0y = this.getPoint(0).getPosXY().y;
    let _1x = this.getPoint(1).getPosXY().x;
    let _1y = this.getPoint(1).getPosXY().y;
    let _2x = this.getPoint(2).getPosXY().x;
    let _2y = this.getPoint(2).getPosXY().y;
    let _a = {
      x: _0x - _1x,
      y: _0y - _1y
    };
    let _b = {
      x: _0x - _2x,
      y: _0y - _2y
    };
    let _c = {
      x: _a.x + _b.x,
      y: _a.y + _b.y
    };

    let _3x = _0x - _c.x;

    let _3y = _0y - _c.y;

    let r1 = {
      sx: _0x,
      sy: _0y,
      ex: _2x,
      ey: _2y
    };
    let r2 = {
      sx: _1x,
      sy: _1y,
      ex: _3x,
      ey: _3y
    };
    let _i = {
      x: _0x - _1x,
      y: _0y - _1y
    };
    let _j = {
      x: _2x - _3x,
      y: _2y - _3y
    };
    let _ri = {
      x: _1x - _0x,
      y: _1y - _0y
    };
    let _rj = {
      x: _3x - _2x,
      y: _3y - _2y
    };

    let _4x = Math.abs(_ri.x - _0x);

    let _4y = Math.abs(_ri.y - _0y);

    let _5x = Math.abs(_rj.x - _2x);

    let _5y = Math.abs(_rj.y - _2y);

    let r3 = {
      sx: _4x,
      sy: _4y,
      ex: _5x,
      ey: _5y
    };

    if (this.calcGap(r1, x, y) > 4 && this.calcGap(r2, x, y) > 4 && this.calcGap(r3, x, y) > 4) {
      return false;
    }

    this.select();
    return true;
  }

}
class CVertiStraightLineObject extends CBiToolObject {
  constructor(name) {
    super(name);
    this.drawer = new _plotters__WEBPACK_IMPORTED_MODULE_5__["DrawVertiStraightLinesPlotter"](name, this);
  }

  setDrawPos(x, y) {
    for (let index in this.points) {
      this.points[index].setPosXY(x, y);
    }
  }

  isSelected(x, y) {
    if (super.isSelected(x, y) === true) {
      return true;
    }

    let c = new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"]("frame0.k0");
    c.setPosXY(x, y);
    let sx = this.getPoint(0).getPosXY().x;

    if (x > sx + 4 || x < sx - 4) {
      return false;
    }

    this.select();
    return true;
  }

}
class CPriceLineObject extends CSegLineObject {
  constructor(name) {
    super(name);
    this.drawer = new _plotters__WEBPACK_IMPORTED_MODULE_5__["DrawPriceLinesPlotter"](name, this);
  }

  setDrawPos(x, y) {
    for (let index in this.points) {
      this.points[index].setPosXY(x, y);
    }
  }

  isSelected(x, y) {
    if (super.isSelected(x, y) === true) {
      return true;
    }

    let c = new _cpoint__WEBPACK_IMPORTED_MODULE_2__["CPoint"]("frame0.k0");
    c.setPosXY(x, y);
    let sx = this.getPoint(0).getPosXY().x;
    let sy = this.getPoint(0).getPosXY().y;
    let ex = this.getPoint(1).getPosXY().x;
    let ey = this.getPoint(1).getPosXY().y;

    if (x < sx - 4) {
      return false;
    }

    if (y >= sy + 4 || y <= sy - 4) {
      return false;
    }

    this.select();
    return true;
  }

}
class CArrowLineObject extends CSegLineObject {
  constructor(name) {
    super(name);
    this.drawer = new _plotters__WEBPACK_IMPORTED_MODULE_5__["DrawArrowLinesPlotter"](name, this);
  }

}

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plotter", function() { return Plotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackgroundPlotter", function() { return BackgroundPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainAreaBackgroundPlotter", function() { return MainAreaBackgroundPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RangeAreaBackgroundPlotter", function() { return RangeAreaBackgroundPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineAreaBackgroundPlotter", function() { return TimelineAreaBackgroundPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CGridPlotter", function() { return CGridPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CandlestickPlotter", function() { return CandlestickPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CandlestickHLCPlotter", function() { return CandlestickHLCPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OHLCPlotter", function() { return OHLCPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainInfoPlotter", function() { return MainInfoPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndicatorPlotter", function() { return IndicatorPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndicatorInfoPlotter", function() { return IndicatorInfoPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinMaxPlotter", function() { return MinMaxPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelinePlotter", function() { return TimelinePlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RangePlotter", function() { return RangePlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COrderGraphPlotter", function() { return COrderGraphPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LastVolumePlotter", function() { return LastVolumePlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LastClosePlotter", function() { return LastClosePlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionPlotter", function() { return SelectionPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineSelectionPlotter", function() { return TimelineSelectionPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RangeSelectionPlotter", function() { return RangeSelectionPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CToolPlotter", function() { return CToolPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawStraightLinesPlotter", function() { return DrawStraightLinesPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawSegLinesPlotter", function() { return DrawSegLinesPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawRayLinesPlotter", function() { return DrawRayLinesPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawArrowLinesPlotter", function() { return DrawArrowLinesPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawHoriStraightLinesPlotter", function() { return DrawHoriStraightLinesPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawHoriRayLinesPlotter", function() { return DrawHoriRayLinesPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawHoriSegLinesPlotter", function() { return DrawHoriSegLinesPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawVertiStraightLinesPlotter", function() { return DrawVertiStraightLinesPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawPriceLinesPlotter", function() { return DrawPriceLinesPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParallelLinesPlotter", function() { return ParallelLinesPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawBiParallelLinesPlotter", function() { return DrawBiParallelLinesPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawBiParallelRayLinesPlotter", function() { return DrawBiParallelRayLinesPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawTriParallelLinesPlotter", function() { return DrawTriParallelLinesPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BandLinesPlotter", function() { return BandLinesPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawFibRetracePlotter", function() { return DrawFibRetracePlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawBandLinesPlotter", function() { return DrawBandLinesPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawFibFansPlotter", function() { return DrawFibFansPlotter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CDynamicLinePlotter", function() { return CDynamicLinePlotter; });
/* harmony import */ var _kline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(157);
/* harmony import */ var _named_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(145);
/* harmony import */ var _chart_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(142);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(158);
/* harmony import */ var _cpoint__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(207);
/* harmony import */ var _exprs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(210);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(187);
/* harmony import */ var _data_providers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(211);
/* harmony import */ var _data_sources__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(152);
/* harmony import */ var _ctools__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(208);










class Plotter extends _named_object__WEBPACK_IMPORTED_MODULE_1__["NamedObject"] {
  constructor(name) {
    super(name);
  }

  static drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo((x1 << 0) + 0.5, (y1 << 0) + 0.5);
    context.lineTo((x2 << 0) + 0.5, (y2 << 0) + 0.5);
    context.stroke();
  }

  static drawLines(context, points) {
    let i,
        cnt = points.length;
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);

    for (i = 1; i < cnt; i++) context.lineTo(points[i].x, points[i].y);

    if (Plotter.isChrome) {
      context.moveTo(points[0].x, points[0].y);

      for (i = 1; i < cnt; i++) context.lineTo(points[i].x, points[i].y);
    }

    context.stroke();
  }

  static drawDashedLine(context, x1, y1, x2, y2, dashLen, dashSolid) {
    if (dashLen < 2) {
      dashLen = 2;
    }

    let dX = x2 - x1;
    let dY = y2 - y1;
    context.beginPath();

    if (dY === 0) {
      let count = dX / dashLen + 0.5 << 0;

      for (let i = 0; i < count; i++) {
        context.rect(x1, y1, dashSolid, 1);
        x1 += dashLen;
      }

      context.fill();
    } else {
      let count = Math.sqrt(dX * dX + dY * dY) / dashLen + 0.5 << 0;
      dX = dX / count;
      dY = dY / count;
      let dashX = dX * dashSolid / dashLen;
      let dashY = dY * dashSolid / dashLen;

      for (let i = 0; i < count; i++) {
        context.moveTo(x1 + 0.5, y1 + 0.5);
        context.lineTo(x1 + 0.5 + dashX, y1 + 0.5 + dashY);
        x1 += dX;
        y1 += dY;
      }

      context.stroke();
    }
  }

  static createHorzDashedLine(context, x1, x2, y, dashLen, dashSolid) {
    if (dashLen < 2) {
      dashLen = 2;
    }

    let dX = x2 - x1;
    let count = dX / dashLen + 0.5 << 0;

    for (let i = 0; i < count; i++) {
      context.rect(x1, y, dashSolid, 1);
      x1 += dashLen;
    }
  }

  static createRectangles(context, rects) {
    context.beginPath();
    let e,
        i,
        cnt = rects.length;

    for (i = 0; i < cnt; i++) {
      e = rects[i];
      context.rect(e.x, e.y, e.w, e.h);
    }
  }

  static createPolygon(context, points) {
    context.beginPath();
    context.moveTo(points[0].x + 0.5, points[0].y + 0.5);
    let i,
        cnt = points.length;

    for (i = 1; i < cnt; i++) context.lineTo(points[i].x + 0.5, points[i].y + 0.5);

    context.closePath();
  }

  static drawString(context, str, rect) {
    let w = context.measureText(str).width;

    if (rect.w < w) {
      return false;
    }

    context.fillText(str, rect.x, rect.y);
    rect.x += w;
    rect.w -= w;
    return true;
  }

}
Plotter.isChrome = navigator.userAgent.toLowerCase().match(/chrome/) !== null;
class BackgroundPlotter extends Plotter {
  constructor(name) {
    super(name);
    this._color = _themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Background;
  }

  getColor() {
    return this._color;
  }

  setColor(c) {
    this._color = c;
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let area = mgr.getArea(this.getAreaName());
    let theme = mgr.getTheme(this.getFrameName());
    context.fillStyle = theme.getColor(this._color);
    context.fillRect(area.getLeft(), area.getTop(), area.getWidth(), area.getHeight());
  }

}
class MainAreaBackgroundPlotter extends BackgroundPlotter {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let area = mgr.getArea(this.getAreaName());
    let timeline = mgr.getTimeline(this.getDataSourceName());
    let range = mgr.getRange(this.getAreaName());
    let theme = mgr.getTheme(this.getFrameName());
    let rect = area.getRect();

    if (!area.isChanged() && !timeline.isUpdated() && !range.isUpdated()) {
      let first = timeline.getFirstIndex();
      let last = timeline.getLastIndex() - 2;
      let start = Math.max(first, last);
      rect.X = timeline.toColumnLeft(start);
      rect.Width = area.getRight() - rect.X;
    }

    context.fillStyle = theme.getColor(this._color);
    context.fillRect(rect.X, rect.Y, rect.Width, rect.Height);
  }

}
class RangeAreaBackgroundPlotter extends BackgroundPlotter {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let areaName = this.getAreaName();
    let area = mgr.getArea(areaName);
    let range = mgr.getRange(areaName.substring(0, areaName.lastIndexOf("Range")));
    let isMainRange = range.getNameObject().getCompAt(2) === "main";

    if (!isMainRange && !area.isChanged() && !range.isUpdated()) {
      return;
    }

    let theme = mgr.getTheme(this.getFrameName());
    context.fillStyle = theme.getColor(this._color);
    context.fillRect(area.getLeft(), area.getTop(), area.getWidth(), area.getHeight());
  }

}
class TimelineAreaBackgroundPlotter extends BackgroundPlotter {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let area = mgr.getArea(this.getAreaName());
    let timeline = mgr.getTimeline(this.getDataSourceName());
    if (!area.isChanged() && !timeline.isUpdated()) return;
    let theme = mgr.getTheme(this.getFrameName());
    context.fillStyle = theme.getColor(this._color);
    context.fillRect(area.getLeft(), area.getTop(), area.getWidth(), area.getHeight());
  }

}
class CGridPlotter extends _named_object__WEBPACK_IMPORTED_MODULE_1__["NamedObject"] {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let area = mgr.getArea(this.getAreaName());
    let timeline = mgr.getTimeline(this.getDataSourceName());
    let range = mgr.getRange(this.getAreaName());
    let clipped = false;

    if (!area.isChanged() && !timeline.isUpdated() && !range.isUpdated()) {
      let first = timeline.getFirstIndex();
      let last = timeline.getLastIndex();
      let start = Math.max(first, last - 2);
      let left = timeline.toColumnLeft(start);
      context.save();
      context.rect(left, area.getTop(), area.getRight() - left, area.getHeight());
      context.clip();
      clipped = true;
    }

    let theme = mgr.getTheme(this.getFrameName());
    context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Grid0);
    context.beginPath();
    let dashLen = 4,
        dashSolid = 1;

    if (Plotter.isChrome) {
      dashLen = 4;
      dashSolid = 1;
    }

    let gradations = range.getGradations();

    for (let n in gradations) {
      Plotter.createHorzDashedLine(context, area.getLeft(), area.getRight(), range.toY(gradations[n]), dashLen, dashSolid);
    }

    context.fill();

    if (clipped) {
      context.restore();
    }
  }

}
class CandlestickPlotter extends _named_object__WEBPACK_IMPORTED_MODULE_1__["NamedObject"] {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let ds = mgr.getDataSource(this.getDataSourceName());

    if (ds.getDataCount() < 1) {
      return;
    }

    let area = mgr.getArea(this.getAreaName());
    let timeline = mgr.getTimeline(this.getDataSourceName());
    let range = mgr.getRange(this.getAreaName());

    if (range.getRange() === 0.0) {
      return;
    }

    let theme = mgr.getTheme(this.getFrameName());
    let dark = _util__WEBPACK_IMPORTED_MODULE_3__["Util"].isInstance(theme, _themes__WEBPACK_IMPORTED_MODULE_6__["DarkTheme"]);
    let first = timeline.getFirstIndex();
    let last = timeline.getLastIndex();
    let start;
    if (area.isChanged() || timeline.isUpdated() || range.isUpdated()) start = first;else start = Math.max(first, last - 2);
    let cW = timeline.getColumnWidth();
    let iW = timeline.getItemWidth();
    let left = timeline.toItemLeft(start);
    let center = timeline.toItemCenter(start);
    let strokePosRects = [];
    let fillPosRects = [];
    let fillUchRects = [];
    let fillNegRects = [];

    for (let i = start; i < last; i++) {
      let data = ds.getDataAt(i);
      let high = range.toY(data.high);
      let low = range.toY(data.low);
      let open = data.open;
      let close = data.close;

      if (close > open) {
        let top = range.toY(close);
        let bottom = range.toY(open);
        let iH = Math.max(bottom - top, 1);
        if (iH > 1 && iW > 1 && dark) strokePosRects.push({
          x: left + 0.5,
          y: top + 0.5,
          w: iW - 1,
          h: iH - 1
        });else fillPosRects.push({
          x: left,
          y: top,
          w: Math.max(iW, 1),
          h: Math.max(iH, 1)
        });

        if (data.high > close) {
          high = Math.min(high, top - 1);
          fillPosRects.push({
            x: center,
            y: high,
            w: 1,
            h: top - high
          });
        }

        if (open > data.low) {
          low = Math.max(low, bottom + 1);
          fillPosRects.push({
            x: center,
            y: bottom,
            w: 1,
            h: low - bottom
          });
        }
      } else if (close === open) {
        let top = range.toY(close);
        fillUchRects.push({
          x: left,
          y: top,
          w: Math.max(iW, 1),
          h: 1
        });
        if (data.high > close) high = Math.min(high, top - 1);
        if (open > data.low) low = Math.max(low, top + 1);
        if (high < low) fillUchRects.push({
          x: center,
          y: high,
          w: 1,
          h: low - high
        });
      } else {
        let top = range.toY(open);
        let bottom = range.toY(close);
        let iH = Math.max(bottom - top, 1);
        fillNegRects.push({
          x: left,
          y: top,
          w: Math.max(iW, 1),
          h: Math.max(iH, 1)
        });
        if (data.high > open) high = Math.min(high, top - 1);
        if (close > data.low) low = Math.max(low, bottom + 1);
        if (high < low) fillNegRects.push({
          x: center,
          y: high,
          w: 1,
          h: low - high
        });
      }

      left += cW;
      center += cW;
    }

    if (strokePosRects.length > 0) {
      context.strokeStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Positive);
      Plotter.createRectangles(context, strokePosRects);
      context.stroke();
    }

    if (fillPosRects.length > 0) {
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Positive);
      Plotter.createRectangles(context, fillPosRects);
      context.fill();
    }

    if (fillUchRects.length > 0) {
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Negative);
      Plotter.createRectangles(context, fillUchRects);
      context.fill();
    }

    if (fillNegRects.length > 0) {
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Negative);
      Plotter.createRectangles(context, fillNegRects);
      context.fill();
    }
  }

}
class CandlestickHLCPlotter extends Plotter {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let ds = mgr.getDataSource(this.getDataSourceName());

    if (!_util__WEBPACK_IMPORTED_MODULE_3__["Util"].isInstance(ds, _data_sources__WEBPACK_IMPORTED_MODULE_8__["MainDataSource"]) || ds.getDataCount() < 1) {
      return;
    }

    let area = mgr.getArea(this.getAreaName());
    let timeline = mgr.getTimeline(this.getDataSourceName());
    let range = mgr.getRange(this.getAreaName());

    if (range.getRange() === 0.0) {
      return;
    }

    let theme = mgr.getTheme(this.getFrameName());
    let dark = _util__WEBPACK_IMPORTED_MODULE_3__["Util"].isInstance(theme, _themes__WEBPACK_IMPORTED_MODULE_6__["DarkTheme"]);
    let first = timeline.getFirstIndex();
    let last = timeline.getLastIndex();
    let start;

    if (area.isChanged() || timeline.isUpdated() || range.isUpdated()) {
      start = first;
    } else {
      start = Math.max(first, last - 2);
    }

    let cW = timeline.getColumnWidth();
    let iW = timeline.getItemWidth();
    let left = timeline.toItemLeft(start);
    let center = timeline.toItemCenter(start);
    let strokePosRects = [];
    let fillPosRects = [];
    let fillUchRects = [];
    let fillNegRects = [];

    for (let i = start; i < last; i++) {
      let data = ds.getDataAt(i);
      let high = range.toY(data.high);
      let low = range.toY(data.low);
      let open = data.open;

      if (i > 0) {
        open = ds.getDataAt(i - 1).close;
      }

      let close = data.close;

      if (close > open) {
        let top = range.toY(close);
        let bottom = range.toY(open);
        let iH = Math.max(bottom - top, 1);

        if (iH > 1 && iW > 1 && dark) {
          strokePosRects.push({
            x: left + 0.5,
            y: top + 0.5,
            w: iW - 1,
            h: iH - 1
          });
        } else {
          fillPosRects.push({
            x: left,
            y: top,
            w: Math.max(iW, 1),
            h: Math.max(iH, 1)
          });
        }

        if (data.high > close) {
          high = Math.min(high, top - 1);
          fillPosRects.push({
            x: center,
            y: high,
            w: 1,
            h: top - high
          });
        }

        if (open > data.low) {
          low = Math.max(low, bottom + 1);
          fillPosRects.push({
            x: center,
            y: bottom,
            w: 1,
            h: low - bottom
          });
        }
      } else if (close === open) {
        let top = range.toY(close);
        fillUchRects.push({
          x: left,
          y: top,
          w: Math.max(iW, 1),
          h: 1
        });

        if (data.high > close) {
          high = Math.min(high, top - 1);
        }

        if (open > data.low) {
          low = Math.max(low, top + 1);
        }

        if (high < low) {
          fillUchRects.push({
            x: center,
            y: high,
            w: 1,
            h: low - high
          });
        }
      } else {
        let top = range.toY(open);
        let bottom = range.toY(close);
        let iH = Math.max(bottom - top, 1);
        fillNegRects.push({
          x: left,
          y: top,
          w: Math.max(iW, 1),
          h: Math.max(iH, 1)
        });

        if (data.high > open) {
          high = Math.min(high, top - 1);
        }

        if (close > data.low) {
          low = Math.max(low, bottom + 1);
        }

        if (high < low) {
          fillNegRects.push({
            x: center,
            y: high,
            w: 1,
            h: low - high
          });
        }
      }

      left += cW;
      center += cW;
    }

    if (strokePosRects.length > 0) {
      context.strokeStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Positive);
      Plotter.createRectangles(context, strokePosRects);
      context.stroke();
    }

    if (fillPosRects.length > 0) {
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Positive);
      Plotter.createRectangles(context, fillPosRects);
      context.fill();
    }

    if (fillUchRects.length > 0) {
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Negative);
      Plotter.createRectangles(context, fillUchRects);
      context.fill();
    }

    if (fillNegRects.length > 0) {
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Negative);
      Plotter.createRectangles(context, fillNegRects);
      context.fill();
    }
  }

}
class OHLCPlotter extends Plotter {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let ds = mgr.getDataSource(this.getDataSourceName());

    if (!_util__WEBPACK_IMPORTED_MODULE_3__["Util"].isInstance(ds, _data_sources__WEBPACK_IMPORTED_MODULE_8__["MainDataSource"]) || ds.getDataCount() < 1) {
      return;
    }

    let area = mgr.getArea(this.getAreaName());
    let timeline = mgr.getTimeline(this.getDataSourceName());
    let range = mgr.getRange(this.getAreaName());

    if (range.getRange() === 0.0) {
      return;
    }

    let theme = mgr.getTheme(this.getFrameName());
    let first = timeline.getFirstIndex();
    let last = timeline.getLastIndex();
    let start;

    if (area.isChanged() || timeline.isUpdated() || range.isUpdated()) {
      start = first;
    } else {
      start = Math.max(first, last - 2);
    }

    let cW = timeline.getColumnWidth();
    let iW = timeline.getItemWidth() >> 1;
    let left = timeline.toItemLeft(start);
    let center = timeline.toItemCenter(start);
    let right = left + timeline.getItemWidth();
    let fillPosRects = [];
    let fillUchRects = [];
    let fillNegRects = [];

    for (let i = start; i < last; i++) {
      let data = ds.getDataAt(i);
      let high = range.toY(data.high);
      let low = range.toY(data.low);
      let iH = Math.max(low - high, 1);

      if (data.close > data.open) {
        let top = range.toY(data.close);
        let bottom = range.toY(data.open);
        fillPosRects.push({
          x: center,
          y: high,
          w: 1,
          h: iH
        });
        fillPosRects.push({
          x: left,
          y: top,
          w: iW,
          h: 1
        });
        fillPosRects.push({
          x: center,
          y: bottom,
          w: iW,
          h: 1
        });
      } else if (data.close === data.open) {
        let y = range.toY(data.close);
        fillUchRects.push({
          x: center,
          y: high,
          w: 1,
          h: iH
        });
        fillUchRects.push({
          x: left,
          y: y,
          w: iW,
          h: 1
        });
        fillUchRects.push({
          x: center,
          y: y,
          w: iW,
          h: 1
        });
      } else {
        let top = range.toY(data.open);
        let bottom = range.toY(data.close);
        fillNegRects.push({
          x: center,
          y: high,
          w: 1,
          h: iH
        });
        fillNegRects.push({
          x: left,
          y: top,
          w: iW,
          h: 1
        });
        fillNegRects.push({
          x: center,
          y: bottom,
          w: iW,
          h: 1
        });
      }

      left += cW;
      center += cW;
      right += cW;
    }

    if (fillPosRects.length > 0) {
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Positive);
      Plotter.createRectangles(context, fillPosRects);
      context.fill();
    }

    if (fillUchRects.length > 0) {
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Negative);
      Plotter.createRectangles(context, fillUchRects);
      context.fill();
    }

    if (fillNegRects.length > 0) {
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Negative);
      Plotter.createRectangles(context, fillNegRects);
      context.fill();
    }
  }

}
class MainInfoPlotter extends Plotter {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let area = mgr.getArea(this.getAreaName());
    let timeline = mgr.getTimeline(this.getDataSourceName());
    let ds = mgr.getDataSource(this.getDataSourceName());
    let theme = mgr.getTheme(this.getFrameName());
    context.font = theme.getFont(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Font.Default);
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Text4);
    let rect = {
      x: area.getLeft() + 4,
      y: area.getTop() + 2,
      w: area.getWidth() - 8,
      h: 20
    };
    let selIndex = timeline.getSelectedIndex();
    if (selIndex < 0) return;
    let data = ds.getDataAt(selIndex);
    let digits = ds.getDecimalDigits();
    let time = new Date(data.date);
    let year = time.getFullYear();
    let month = _util__WEBPACK_IMPORTED_MODULE_3__["Util"].formatTime(time.getMonth() + 1);
    let date = _util__WEBPACK_IMPORTED_MODULE_3__["Util"].formatTime(time.getDate());
    let hour = _util__WEBPACK_IMPORTED_MODULE_3__["Util"].formatTime(time.getHours());
    let minute = _util__WEBPACK_IMPORTED_MODULE_3__["Util"].formatTime(time.getMinutes());
    let lang = mgr.getLanguage();

    if (lang === "zh-cn") {
      // if (!Plotter.drawString(context, '时间: ' +
      //         year + '-' + month + '-' + date + '  ' + hour + ':' + minute, rect))
      //     return;
      if (!Plotter.drawString(context, '  开: ' + data.open.toFixed(digits), rect)) return;
      if (!Plotter.drawString(context, '  高: ' + data.high.toFixed(digits), rect)) return;
      if (!Plotter.drawString(context, '  低: ' + data.low.toFixed(digits), rect)) return;
      if (!Plotter.drawString(context, '  收: ' + data.close.toFixed(digits), rect)) return;
    } else if (lang === "en-us") {
      // if (!Plotter.drawString(context, 'DATE: ' +
      //         year + '-' + month + '-' + date + '  ' + hour + ':' + minute, rect))
      //     return;
      if (!Plotter.drawString(context, '  O: ' + data.open.toFixed(digits), rect)) return;
      if (!Plotter.drawString(context, '  H: ' + data.high.toFixed(digits), rect)) return;
      if (!Plotter.drawString(context, '  L: ' + data.low.toFixed(digits), rect)) return;
      if (!Plotter.drawString(context, '  C: ' + data.close.toFixed(digits), rect)) return;
    } else if (lang === "zh-tw") {
      // if (!Plotter.drawString(context, '時間: ' +
      //         year + '-' + month + '-' + date + '  ' + hour + ':' + minute, rect))
      //     return;
      if (!Plotter.drawString(context, '  開: ' + data.open.toFixed(digits), rect)) return;
      if (!Plotter.drawString(context, '  高: ' + data.high.toFixed(digits), rect)) return;
      if (!Plotter.drawString(context, '  低: ' + data.low.toFixed(digits), rect)) return;
      if (!Plotter.drawString(context, '  收: ' + data.close.toFixed(digits), rect)) return;
    }

    if (selIndex > 0) {
      if (lang === "zh-cn") {
        if (!Plotter.drawString(context, '  涨幅: ', rect)) return;
      } else if (lang === "en-us") {
        if (!Plotter.drawString(context, '  CHANGE: ', rect)) return;
      } else if (lang === "zh-tw") {
        if (!Plotter.drawString(context, '  漲幅: ', rect)) return;
      }

      let prev = ds.getDataAt(selIndex - 1);
      let change;

      if ((data.close - prev.close) / prev.close * 100.0) {
        change = (data.close - prev.close) / prev.close * 100.0;
      } else {
        change = 0.00;
      }

      if (change >= 0) {
        change = ' ' + change.toFixed(2);
        context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.TextPositive);
      } else {
        change = change.toFixed(2);
        context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.TextNegative);
      }

      if (!Plotter.drawString(context, change, rect)) return;
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Text4);
      if (!Plotter.drawString(context, ' %', rect)) return;
    }

    let amplitude;

    if ((data.high - data.low) / data.low * 100.0) {
      amplitude = (data.high - data.low) / data.low * 100.0;
    } else {
      amplitude = 0.00;
    }

    if (lang === "zh-cn") {
      if (!Plotter.drawString(context, '  振幅: ' + amplitude.toFixed(2) + ' %', rect)) {
        return;
      } // if (!Plotter.drawString(context, '  量: ' + data.volume.toFixed(2), rect)) {
      //     return;
      // }

    } else if (lang === "en-us") {
      if (!Plotter.drawString(context, '  AMPLITUDE: ' + amplitude.toFixed(2) + ' %', rect)) {
        return;
      } // if (!Plotter.drawString(context, '  V: ' + data.volume.toFixed(2), rect)) {
      //     return;
      // }

    } else if (lang === "zh-tw") {
      if (!Plotter.drawString(context, '  振幅: ' + amplitude.toFixed(2) + ' %', rect)) {
        return;
      } // if (!Plotter.drawString(context, '  量: ' + data.volume.toFixed(2), rect)) {
      //     return;
      // }

    }

    let dp = mgr.getDataProvider(this.getAreaName() + ".secondary");

    if (dp === undefined) {
      return;
    }

    let indic = dp.getIndicator();
    let n,
        cnt = indic.getOutputCount();

    for (n = 0; n < cnt; n++) {
      let out = indic.getOutputAt(n);
      let v = out.execute(selIndex);

      if (isNaN(v)) {
        continue;
      }

      let info = "  " + out.getName() + ": " + v.toFixed(digits);
      let color = out.getColor();

      if (color === undefined) {
        color = _themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Indicator0 + n;
      }

      context.fillStyle = theme.getColor(color);

      if (!Plotter.drawString(context, info, rect)) {
        return;
      }
    }
  }

}
class IndicatorPlotter extends _named_object__WEBPACK_IMPORTED_MODULE_1__["NamedObject"] {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let area = mgr.getArea(this.getAreaName());
    let timeline = mgr.getTimeline(this.getDataSourceName());
    let range = mgr.getRange(this.getAreaName());
    if (range.getRange() === 0.0) return;
    let dp = mgr.getDataProvider(this.getName());
    if (!_util__WEBPACK_IMPORTED_MODULE_3__["Util"].isInstance(dp, _data_providers__WEBPACK_IMPORTED_MODULE_7__["IndicatorDataProvider"])) return;
    let theme = mgr.getTheme(this.getFrameName());
    let cW = timeline.getColumnWidth();
    let first = timeline.getFirstIndex();
    let last = timeline.getLastIndex();
    let start;
    if (area.isChanged() || timeline.isUpdated() || range.isUpdated()) start = first;else start = Math.max(first, last - 2);
    let indic = dp.getIndicator();
    let out,
        n,
        outCount = indic.getOutputCount();

    for (n = 0; n < outCount; n++) {
      out = indic.getOutputAt(n);
      let style = out.getStyle();

      if (style === _exprs__WEBPACK_IMPORTED_MODULE_5__["OutputExpr"].outputStyle.VolumeStick) {
        this.drawVolumeStick(context, theme, mgr.getDataSource(this.getDataSourceName()), start, last, timeline.toItemLeft(start), cW, timeline.getItemWidth(), range);
      } else if (style === _exprs__WEBPACK_IMPORTED_MODULE_5__["OutputExpr"].outputStyle.MACDStick) {
        this.drawMACDStick(context, theme, out, start, last, timeline.toItemLeft(start), cW, timeline.getItemWidth(), range);
      } else if (style === _exprs__WEBPACK_IMPORTED_MODULE_5__["OutputExpr"].outputStyle.SARPoint) {
        this.drawSARPoint(context, theme, out, start, last, timeline.toItemCenter(start), cW, timeline.getItemWidth(), range);
      }
    }

    let left = timeline.toColumnLeft(start);
    let center = timeline.toItemCenter(start);
    context.save();
    context.rect(left, area.getTop(), area.getRight() - left, area.getHeight());
    context.clip();
    context.translate(0.5, 0.5);

    for (n = 0; n < outCount; n++) {
      let x = center;
      out = indic.getOutputAt(n);

      if (out.getStyle() === _exprs__WEBPACK_IMPORTED_MODULE_5__["OutputExpr"].outputStyle.Line) {
        let v,
            points = [];

        if (start > first) {
          v = out.execute(start - 1);
          if (isNaN(v) === false) points.push({
            "x": x - cW,
            "y": range.toY(v)
          });
        }

        for (let i = start; i < last; i++, x += cW) {
          v = out.execute(i);
          if (isNaN(v) === false) points.push({
            "x": x,
            "y": range.toY(v)
          });
        }

        if (points.length > 0) {
          let color = out.getColor();
          if (color === undefined) color = _themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Indicator0 + n;
          context.strokeStyle = theme.getColor(color);
          Plotter.drawLines(context, points);
        }
      }
    }

    context.restore();
  }

  drawVolumeStick(context, theme, ds, first, last, startX, cW, iW, range) {
    let dark = _util__WEBPACK_IMPORTED_MODULE_3__["Util"].isInstance(theme, _themes__WEBPACK_IMPORTED_MODULE_6__["DarkTheme"]);
    let left = startX;
    let bottom = range.toY(0);
    let strokePosRects = [];
    let fillPosRects = [];
    let fillNegRects = [];

    for (let i = first; i < last; i++) {
      let data = ds.getDataAt(i);
      let top = range.toY(data.volume);
      let iH = range.toHeight(data.volume);

      if (data.close > data.open) {
        if (iH > 1 && iW > 1 && dark) {
          strokePosRects.push({
            x: left + 0.5,
            y: top + 0.5,
            w: iW - 1,
            h: iH - 1
          });
        } else {
          fillPosRects.push({
            x: left,
            y: top,
            w: Math.max(iW, 1),
            h: Math.max(iH, 1)
          });
        }
      } else if (data.close === data.open) {
        if (i > 0 && data.close >= ds.getDataAt(i - 1).close) {
          if (iH > 1 && iW > 1 && dark) {
            strokePosRects.push({
              x: left + 0.5,
              y: top + 0.5,
              w: iW - 1,
              h: iH - 1
            });
          } else {
            fillPosRects.push({
              x: left,
              y: top,
              w: Math.max(iW, 1),
              h: Math.max(iH, 1)
            });
          }
        } else {
          fillNegRects.push({
            x: left,
            y: top,
            w: Math.max(iW, 1),
            h: Math.max(iH, 1)
          });
        }
      } else {
        fillNegRects.push({
          x: left,
          y: top,
          w: Math.max(iW, 1),
          h: Math.max(iH, 1)
        });
      }

      left += cW;
    }

    if (strokePosRects.length > 0) {
      context.strokeStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Positive);
      Plotter.createRectangles(context, strokePosRects);
      context.stroke();
    }

    if (fillPosRects.length > 0) {
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Positive);
      Plotter.createRectangles(context, fillPosRects);
      context.fill();
    }

    if (fillNegRects.length > 0) {
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Negative);
      Plotter.createRectangles(context, fillNegRects);
      context.fill();
    }
  }

  drawMACDStick(context, theme, output, first, last, startX, cW, iW, range) {
    let left = startX;
    let middle = range.toY(0);
    let strokePosRects = [];
    let strokeNegRects = [];
    let fillPosRects = [];
    let fillNegRects = [];
    let prevMACD = first > 0 ? output.execute(first - 1) : NaN;

    for (let i = first; i < last; i++) {
      let MACD = output.execute(i);

      if (MACD >= 0) {
        let iH = range.toHeight(MACD);
        if ((i === 0 || MACD >= prevMACD) && iH > 1 && iW > 1) strokePosRects.push({
          x: left + 0.5,
          y: middle - iH + 0.5,
          w: iW - 1,
          h: iH - 1
        });else fillPosRects.push({
          x: left,
          y: middle - iH,
          w: Math.max(iW, 1),
          h: Math.max(iH, 1)
        });
      } else {
        let iH = range.toHeight(-MACD);
        if ((i === 0 || MACD >= prevMACD) && iH > 1 && iW > 1) strokeNegRects.push({
          x: left + 0.5,
          y: middle + 0.5,
          w: iW - 1,
          h: iH - 1
        });else fillNegRects.push({
          x: left,
          y: middle,
          w: Math.max(iW, 1),
          h: Math.max(iH, 1)
        });
      }

      prevMACD = MACD;
      left += cW;
    }

    if (strokePosRects.length > 0) {
      context.strokeStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Positive);
      Plotter.createRectangles(context, strokePosRects);
      context.stroke();
    }

    if (strokeNegRects.length > 0) {
      context.strokeStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Negative);
      Plotter.createRectangles(context, strokeNegRects);
      context.stroke();
    }

    if (fillPosRects.length > 0) {
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Positive);
      Plotter.createRectangles(context, fillPosRects);
      context.fill();
    }

    if (fillNegRects.length > 0) {
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Negative);
      Plotter.createRectangles(context, fillNegRects);
      context.fill();
    }
  }

  drawSARPoint(context, theme, output, first, last, startX, cW, iW, range) {
    let r = iW >> 1;
    if (r < 0.5) r = 0.5;
    if (r > 4) r = 4;
    let center = startX;
    let right = center + r;
    let endAngle = 2 * Math.PI;
    context.save();
    context.translate(0.5, 0.5);
    context.strokeStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Indicator3);
    context.beginPath();

    for (let i = first; i < last; i++) {
      let y = range.toY(output.execute(i));
      context.moveTo(right, y);
      context.arc(center, y, r, 0, endAngle);
      center += cW;
      right += cW;
    }

    context.stroke();
    context.restore();
  }

}
class IndicatorInfoPlotter extends Plotter {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let area = mgr.getArea(this.getAreaName());
    let timeline = mgr.getTimeline(this.getDataSourceName());
    let dp = mgr.getDataProvider(this.getAreaName() + ".secondary");
    let theme = mgr.getTheme(this.getFrameName());
    context.font = theme.getFont(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Font.Default);
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Text4);
    let rect = {
      x: area.getLeft() + 4,
      y: area.getTop() + 2,
      w: area.getWidth() - 8,
      h: 20
    };
    let indic = dp.getIndicator();
    let title;

    switch (indic.getParameterCount()) {
      case 0:
        title = indic.getName();
        break;

      case 1:
        title = indic.getName() + "(" + indic.getParameterAt(0).getValue() + ")";
        break;

      case 2:
        title = indic.getName() + "(" + indic.getParameterAt(0).getValue() + "," + indic.getParameterAt(1).getValue() + ")";
        break;

      case 3:
        title = indic.getName() + "(" + indic.getParameterAt(0).getValue() + "," + indic.getParameterAt(1).getValue() + "," + indic.getParameterAt(2).getValue() + ")";
        break;

      case 4:
        title = indic.getName() + "(" + indic.getParameterAt(0).getValue() + "," + indic.getParameterAt(1).getValue() + "," + indic.getParameterAt(2).getValue() + "," + indic.getParameterAt(3).getValue() + ")";
        break;

      default:
        return;
    }

    if (!Plotter.drawString(context, title, rect)) return;
    let selIndex = timeline.getSelectedIndex();
    if (selIndex < 0) return;
    let out, v, info, color;
    let n,
        cnt = indic.getOutputCount();

    for (n = 0; n < cnt; n++) {
      out = indic.getOutputAt(n);
      v = out.execute(selIndex);
      if (isNaN(v)) continue;
      info = "  " + out.getName() + ": " + v.toFixed(2);
      color = out.getColor();
      if (color === undefined) color = _themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Indicator0 + n;
      context.fillStyle = theme.getColor(color);
      if (!Plotter.drawString(context, info, rect)) return;
    }
  }

}
class MinMaxPlotter extends _named_object__WEBPACK_IMPORTED_MODULE_1__["NamedObject"] {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let ds = mgr.getDataSource(this.getDataSourceName());
    if (ds.getDataCount() < 1) return;
    let timeline = mgr.getTimeline(this.getDataSourceName());
    if (timeline.getInnerWidth() < timeline.getColumnWidth()) return;
    let range = mgr.getRange(this.getAreaName());
    if (range.getRange() === 0) return;
    let dp = mgr.getDataProvider(this.getAreaName() + ".main");
    let first = timeline.getFirstIndex();
    let center = first + timeline.getLastIndex() >> 1;
    let theme = mgr.getTheme(this.getFrameName());
    context.font = theme.getFont(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Font.Default);
    context.textBaseline = "middle";
    context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Text4);
    context.strokeStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Text4);
    let digits = ds.getDecimalDigits();
    this.drawMark(context, dp.getMinValue(), digits, range.toY(dp.getMinValue()), first, center, dp.getMinValueIndex(), timeline);
    this.drawMark(context, dp.getMaxValue(), digits, range.toY(dp.getMaxValue()), first, center, dp.getMaxValueIndex(), timeline);
  }

  drawMark(context, v, digits, y, first, center, index, timeline) {
    let arrowStart, arrowStop, _arrowStop;

    let textStart;

    if (index > center) {
      context.textAlign = "right";
      arrowStart = timeline.toItemCenter(index) - 4;
      arrowStop = arrowStart - 7;
      _arrowStop = arrowStart - 3;
      textStart = arrowStop - 4;
    } else {
      context.textAlign = "left";
      arrowStart = timeline.toItemCenter(index) + 4;
      arrowStop = arrowStart + 7;
      _arrowStop = arrowStart + 3;
      textStart = arrowStop + 4;
    }

    Plotter.drawLine(context, arrowStart, y, arrowStop, y);
    Plotter.drawLine(context, arrowStart, y, _arrowStop, y + 2);
    Plotter.drawLine(context, arrowStart, y, _arrowStop, y - 2);
    context.fillText(_util__WEBPACK_IMPORTED_MODULE_3__["Util"].fromFloat(v, 2), textStart, y);
  }

}
class TimelinePlotter extends Plotter {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let area = mgr.getArea(this.getAreaName());
    let timeline = mgr.getTimeline(this.getDataSourceName());
    if (!area.isChanged() && !timeline.isUpdated()) return;
    let ds = mgr.getDataSource(this.getDataSourceName());
    if (ds.getDataCount() < 2) return;
    let timeInterval = ds.getDataAt(1).date - ds.getDataAt(0).date;
    let n,
        cnt = TimelinePlotter.TIME_INTERVAL.length;

    for (n = 0; n < cnt; n++) {
      if (timeInterval < TimelinePlotter.TIME_INTERVAL[n]) break;
    }

    for (; n < cnt; n++) {
      if (TimelinePlotter.TIME_INTERVAL[n] % timeInterval === 0) if (TimelinePlotter.TIME_INTERVAL[n] / timeInterval * timeline.getColumnWidth() > 60) break;
    }

    let first = timeline.getFirstIndex();
    let last = timeline.getLastIndex();
    let d = new Date();
    let local_utc_diff = d.getTimezoneOffset() * 60 * 1000;
    let theme = mgr.getTheme(this.getFrameName());
    context.font = theme.getFont(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Font.Default);
    context.textAlign = "center";
    context.textBaseline = "middle";
    let lang = mgr.getLanguage();
    let gridRects = [];
    let top = area.getTop();
    let middle = area.getMiddle();

    for (let i = first; i < last; i++) {
      let utcDate = ds.getDataAt(i).date;
      let localDate = utcDate - local_utc_diff;
      let time = new Date(utcDate);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let date = time.getDate();
      let hour = time.getHours();
      let minute = time.getMinutes();
      let text = "";

      if (n < cnt) {
        let m = Math.max(TimelinePlotter.TP_DAY, TimelinePlotter.TIME_INTERVAL[n]);

        if (localDate % m === 0) {
          if (lang === "zh-cn") text = month.toString() + "月" + date.toString() + "日";else if (lang === "zh-tw") text = month.toString() + "月" + date.toString() + "日";else if (lang === "en-us") text = TimelinePlotter.MonthConvert[month] + " " + date.toString();
          context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Text4);
        } else if (localDate % TimelinePlotter.TIME_INTERVAL[n] === 0) {
          let strMinute = minute.toString();
          if (minute < 10) strMinute = "0" + strMinute;
          text = hour.toString() + ":" + strMinute;
          context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Text2);
        }
      } else if (date === 1 && hour < timeInterval / TimelinePlotter.TP_HOUR) {
        if (month === 1) {
          text = year.toString();
          if (lang === "zh-cn") text += "年";else if (lang === "zh-tw") text += "年";
        } else {
          if (lang === "zh-cn") text = month.toString() + "月";else if (lang === "zh-tw") text = month.toString() + "月";else if (lang === "en-us") text = TimelinePlotter.MonthConvert[month];
        }

        context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Text4);
      }

      if (text.length > 0) {
        let x = timeline.toItemCenter(i);
        gridRects.push({
          x: x,
          y: top,
          w: 1,
          h: 4
        });
        context.fillText(text, x, middle);
      }
    }

    if (gridRects.length > 0) {
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Grid1);
      Plotter.createRectangles(context, gridRects);
      context.fill();
    }
  }

}
TimelinePlotter.TP_MINUTE = 60 * 1000;
TimelinePlotter.TP_HOUR = 60 * TimelinePlotter.TP_MINUTE;
TimelinePlotter.TP_DAY = 24 * TimelinePlotter.TP_HOUR;
TimelinePlotter.TIME_INTERVAL = [5 * TimelinePlotter.TP_MINUTE, 10 * TimelinePlotter.TP_MINUTE, 15 * TimelinePlotter.TP_MINUTE, 30 * TimelinePlotter.TP_MINUTE, TimelinePlotter.TP_HOUR, 2 * TimelinePlotter.TP_HOUR, 3 * TimelinePlotter.TP_HOUR, 6 * TimelinePlotter.TP_HOUR, 12 * TimelinePlotter.TP_HOUR, TimelinePlotter.TP_DAY, 2 * TimelinePlotter.TP_DAY];
TimelinePlotter.MonthConvert = {
  1: "Jan.",
  2: "Feb.",
  3: "Mar.",
  4: "Apr.",
  5: "May.",
  6: "Jun.",
  7: "Jul.",
  8: "Aug.",
  9: "Sep.",
  10: "Oct.",
  11: "Nov.",
  12: "Dec."
};
class RangePlotter extends _named_object__WEBPACK_IMPORTED_MODULE_1__["NamedObject"] {
  constructor(name) {
    super(name);
  }

  getRequiredWidth(context, v) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let theme = mgr.getTheme(this.getFrameName());
    context.font = theme.getFont(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Font.Default);
    return context.measureText((Math.floor(v) + 0.88).toString()).width + 16;
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let areaName = this.getAreaName();
    let area = mgr.getArea(areaName);
    let rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
    let range = mgr.getRange(rangeName);
    if (range.getRange() === 0.0) return;
    let isMainRange = range.getNameObject().getCompAt(2) === "main";

    if (isMainRange) {} else {
      if (!area.isChanged() && !range.isUpdated()) return;
    }

    let gradations = range.getGradations();
    if (gradations.length === 0) return;
    let left = area.getLeft();
    let right = area.getRight();
    let center = area.getCenter();
    let theme = mgr.getTheme(this.getFrameName());
    context.font = theme.getFont(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Font.Default);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Text2);
    let gridRects = [];

    for (let n in gradations) {
      let y = range.toY(gradations[n]);
      gridRects.push({
        x: left,
        y: y,
        w: 6,
        h: 1
      });
      gridRects.push({
        x: right - 6,
        y: y,
        w: 6,
        h: 1
      });
      context.fillText(_util__WEBPACK_IMPORTED_MODULE_3__["Util"].fromFloat(gradations[n], 2), center, y);
    }

    if (gridRects.length > 0) {
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Grid1);
      Plotter.createRectangles(context, gridRects);
      context.fill();
    }
  }

}
class COrderGraphPlotter extends _named_object__WEBPACK_IMPORTED_MODULE_1__["NamedObject"] {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    return this._Draw_(context);
  }

  _Draw_(context) {
    if (this.Update() === false) return;
    if (this.updateData() === false) return;
    this.m_top = this.m_pArea.getTop();
    this.m_bottom = this.m_pArea.getBottom();
    this.m_left = this.m_pArea.getLeft();
    this.m_right = this.m_pArea.getRight();
    context.save();
    context.rect(this.m_left, this.m_top, this.m_right - this.m_left, this.m_bottom - this.m_top);
    context.clip();

    let all = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance.getChart()._depthData;

    this.x_offset = 0;
    this.y_offset = 0;
    let ask_tmp = {};
    let bid_tmp = {};
    ask_tmp.x = this.m_left + all.array[this.m_ask_si].amounts * this.m_Step;
    ask_tmp.y = this.m_pRange.toY(all.array[this.m_ask_si].rate);
    bid_tmp.x = this.m_left + all.array[this.m_bid_si].amounts * this.m_Step;
    bid_tmp.y = this.m_pRange.toY(all.array[this.m_bid_si].rate);

    if (Math.abs(ask_tmp.y - bid_tmp.y) < 1) {
      this.y_offset = 1;
    }

    this.x_offset = 1;
    this.DrawBackground(context);
    this.UpdatePoints();
    this.FillBlack(context);
    this.DrawGradations(context);
    this.DrawLine(context);
    context.restore();
  }

  DrawBackground(context) {
    context.fillStyle = this.m_pTheme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Background);
    context.fillRect(this.m_left, this.m_top, this.m_right - this.m_left, this.m_bottom - this.m_top);

    let all = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance.getChart()._depthData;

    if (this.m_mode === 0) {
      let ask_bottom = this.m_pRange.toY(all.array[this.m_ask_si].rate) - this.y_offset;
      let bid_top = this.m_pRange.toY(all.array[this.m_bid_si].rate) + this.y_offset;
      let ask_gradient = context.createLinearGradient(this.m_left, 0, this.m_right, 0);
      ask_gradient.addColorStop(0, this.m_pTheme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Background));
      ask_gradient.addColorStop(1, this.m_pTheme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.PositiveDark));
      context.fillStyle = ask_gradient;
      context.fillRect(this.m_left, this.m_top, this.m_right - this.m_left, ask_bottom - this.m_top);
      let bid_gradient = context.createLinearGradient(this.m_left, 0, this.m_right, 0);
      bid_gradient.addColorStop(0, this.m_pTheme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Background));
      bid_gradient.addColorStop(1, this.m_pTheme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.NegativeDark));
      context.fillStyle = bid_gradient;
      context.fillRect(this.m_left, bid_top, this.m_right - this.m_left, this.m_bottom - bid_top);
    } else if (this.m_mode === 1) {
      let ask_gradient = context.createLinearGradient(this.m_left, 0, this.m_right, 0);
      ask_gradient.addColorStop(0, this.m_pTheme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Background));
      ask_gradient.addColorStop(1, this.m_pTheme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.PositiveDark));
      context.fillStyle = ask_gradient;
      context.fillRect(this.m_left, this.m_top, this.m_right - this.m_left, this.m_bottom - this.m_top);
    } else if (this.m_mode === 2) {
      let bid_gradient = context.createLinearGradient(this.m_left, 0, this.m_right, 0);
      bid_gradient.addColorStop(0, this.m_pTheme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Background));
      bid_gradient.addColorStop(1, this.m_pTheme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.NegativeDark));
      context.fillStyle = bid_gradient;
      context.fillRect(this.m_left, this.m_top, this.m_right - this.m_left, this.m_bottom - this.m_top);
    }
  }

  DrawLine(context) {
    if (this.m_mode === 0 || this.m_mode === 1) {
      context.strokeStyle = this.m_pTheme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Positive);
      context.beginPath();
      context.moveTo(Math.floor(this.m_ask_points[0].x) + 0.5, Math.floor(this.m_ask_points[0].y) + 0.5);

      for (let i = 1; i < this.m_ask_points.length; i++) {
        context.lineTo(Math.floor(this.m_ask_points[i].x) + 0.5, Math.floor(this.m_ask_points[i].y) + 0.5);
      }

      context.stroke();
    }

    if (this.m_mode === 0 || this.m_mode === 2) {
      context.strokeStyle = this.m_pTheme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Negative);
      context.beginPath();
      context.moveTo(this.m_bid_points[0].x + 0.5, this.m_bid_points[0].y + 0.5);

      for (let i = 1; i < this.m_bid_points.length; i++) {
        context.lineTo(this.m_bid_points[i].x + 0.5, this.m_bid_points[i].y + 0.5);
      }

      context.stroke();
    }
  }

  UpdatePoints() {
    let all = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance.getChart()._depthData;

    this.m_ask_points = [];
    let index_ask = {};
    index_ask.x = Math.floor(this.m_left);
    index_ask.y = Math.floor(this.m_pRange.toY(all.array[this.m_ask_si].rate) - this.y_offset);
    this.m_ask_points.push(index_ask);
    let ask_p_i = 0;

    for (let i = this.m_ask_si; i >= this.m_ask_ei; i--) {
      let index0 = {};
      let index1 = {};

      if (i === this.m_ask_si) {
        index0.x = Math.floor(this.m_left + all.array[i].amounts * this.m_Step + this.x_offset);
        index0.y = Math.floor(this.m_pRange.toY(all.array[i].rate) - this.y_offset);
        this.m_ask_points.push(index0);
        ask_p_i = 1;
      } else {
        index0.x = Math.floor(this.m_left + all.array[i].amounts * this.m_Step + this.x_offset);
        index0.y = Math.floor(this.m_ask_points[ask_p_i].y);
        index1.x = Math.floor(index0.x);
        index1.y = Math.floor(this.m_pRange.toY(all.array[i].rate) - this.y_offset);
        this.m_ask_points.push(index0);
        ask_p_i++;
        this.m_ask_points.push(index1);
        ask_p_i++;
      }
    }

    this.m_bid_points = [];
    let index_bid = {};
    index_bid.x = Math.floor(this.m_left);
    index_bid.y = Math.ceil(this.m_pRange.toY(all.array[this.m_bid_si].rate) + this.y_offset);
    this.m_bid_points.push(index_bid);
    let bid_p_i = 0;

    for (let i = this.m_bid_si; i <= this.m_bid_ei; i++) {
      let index0 = {};
      let index1 = {};

      if (i === this.m_bid_si) {
        index0.x = Math.floor(this.m_left + all.array[i].amounts * this.m_Step + this.x_offset);
        index0.y = Math.ceil(this.m_pRange.toY(all.array[i].rate) + this.y_offset);
        this.m_bid_points.push(index0);
        bid_p_i = 1;
      } else {
        index0.x = Math.floor(this.m_left + all.array[i].amounts * this.m_Step + this.x_offset);
        index0.y = Math.ceil(this.m_bid_points[bid_p_i].y);
        index1.x = Math.floor(index0.x);
        index1.y = Math.ceil(this.m_pRange.toY(all.array[i].rate) + this.x_offset);
        this.m_bid_points.push(index0);
        bid_p_i++;
        this.m_bid_points.push(index1);
        bid_p_i++;
      }
    }
  }

  updateData() {
    let all = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance.getChart()._depthData;

    if (all.array === null) return false;
    if (all.array.length <= 50) return false;
    let minRange = this.m_pRange.getOuterMinValue();
    let maxRange = this.m_pRange.getOuterMaxValue();
    this.m_ask_si = all.asks_si;
    this.m_ask_ei = all.asks_si;

    for (let i = all.asks_si; i >= all.asks_ei; i--) {
      if (all.array[i].rate < maxRange) this.m_ask_ei = i;else break;
    }

    this.m_bid_si = all.bids_si;
    this.m_bid_ei = all.bids_si;

    for (let i = all.bids_si; i <= all.bids_ei; i++) {
      if (all.array[i].rate > minRange) this.m_bid_ei = i;else break;
    }

    if (this.m_ask_ei === this.m_ask_si) this.m_mode = 2;else if (this.m_bid_ei === this.m_bid_si) this.m_mode = 1;else this.m_mode = 0;
    this.m_Step = this.m_pArea.getWidth();

    if (this.m_mode === 0) {
      /*
       * View: B     --------    T
       * Data: Lo      -----     Hi
       */
      if (this.m_ask_ei === all.asks_ei && this.m_bid_ei === all.bids_ei) {
        this.m_Step /= Math.min(all.array[this.m_ask_ei].amounts, all.array[this.m_bid_ei].amounts);
      }
      /*
       * View: B     --------     T
       * Data: Lo         -----   Hi
       */
      else if (this.m_ask_ei !== all.asks_ei && this.m_bid_ei === all.bids_ei) {
          this.m_Step /= all.array[this.m_bid_ei].amounts;
        }
        /*
         * View: B     --------    T
         * Data: Lo  -----         Hi
         */
        else if (this.m_ask_ei === all.asks_ei && this.m_bid_ei !== all.bids_ei) {
            this.m_Step /= all.array[this.m_ask_ei].amounts;
          }
          /*
           * View: B     --------    T
           * Data: Lo  ------------  Hi
           */
          else if (this.m_ask_ei !== all.asks_ei && this.m_bid_ei !== all.bids_ei) {
              this.m_Step /= Math.max(all.array[this.m_ask_ei].amounts, all.array[this.m_bid_ei].amounts);
            }
    } else if (this.m_mode === 1) {
      this.m_Step /= all.array[this.m_ask_ei].amounts;
    } else if (this.m_mode === 2) {
      this.m_Step /= all.array[this.m_bid_ei].amounts;
    }

    return true;
  }

  Update() {
    this.m_pMgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let areaName = this.getAreaName();
    this.m_pArea = this.m_pMgr.getArea(areaName);
    if (this.m_pArea === null) return false;
    let rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
    this.m_pRange = this.m_pMgr.getRange(rangeName);
    if (this.m_pRange === null || this.m_pRange.getRange() === 0.0) return false;
    this.m_pTheme = this.m_pMgr.getTheme(this.getFrameName());

    if (this.m_pTheme === null) {
      return false;
    }

    return true;
  }

  DrawGradations(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let areaName = this.getAreaName();
    let area = mgr.getArea(areaName);
    let rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
    let range = mgr.getRange(rangeName);
    if (range.getRange() === 0.0) return;
    let gradations = range.getGradations();
    if (gradations.length === 0) return;
    let left = area.getLeft();
    let right = area.getRight();
    let gridRects = [];

    for (let n in gradations) {
      let y = range.toY(gradations[n]);
      gridRects.push({
        x: left,
        y: y,
        w: 6,
        h: 1
      });
      gridRects.push({
        x: right - 6,
        y: y,
        w: 6,
        h: 1
      });
    }

    if (gridRects.length > 0) {
      let theme = mgr.getTheme(this.getFrameName());
      context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Grid1);
      Plotter.createRectangles(context, gridRects);
      context.fill();
    }
  }

  FillBlack(context) {
    let ask_point = this.m_ask_points;
    let bid_point = this.m_bid_points;
    let ask_first_add = {};
    let ask_last_add = {};
    ask_first_add.x = this.m_right;
    ask_first_add.y = ask_point[0].y;
    ask_last_add.x = this.m_right;
    ask_last_add.y = ask_point[ask_point.length - 1].y;
    let bid_first_add = {};
    let bid_last_add = {};
    bid_first_add.x = this.m_right;
    bid_first_add.y = bid_point[0].y - 1;
    bid_last_add.x = this.m_right;
    bid_last_add.y = bid_point[bid_point.length - 1].y;
    ask_point.unshift(ask_first_add);
    ask_point.push(ask_last_add);
    bid_point.unshift(bid_first_add);
    bid_point.push(bid_last_add);
    context.fillStyle = this.m_pTheme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Background);
    context.beginPath();
    context.moveTo(Math.floor(ask_point[0].x) + 0.5, Math.floor(ask_point[0].y) + 0.5);

    for (let i = 1; i < ask_point.length; i++) {
      context.lineTo(Math.floor(ask_point[i].x) + 0.5, Math.floor(ask_point[i].y) + 0.5);
    }

    context.fill();
    context.beginPath();
    context.moveTo(Math.floor(bid_point[0].x) + 0.5, Math.floor(bid_point[0].y) + 0.5);

    for (let i = 1; i < bid_point.length; i++) {
      context.lineTo(Math.floor(bid_point[i].x) + 0.5, Math.floor(bid_point[i].y) + 0.5);
    }

    context.fill();
    ask_point.shift();
    ask_point.pop();
    bid_point.shift();
    bid_point.pop();
  }

  DrawTickerGraph(context) {
    // return;
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let ds = mgr.getDataSource(this.getDataSourceName());
    let ticker = ds._dataItems[ds._dataItems.length - 1].close;
    let p1x = this.m_left + 1;
    let p1y = this.m_pRange.toY(ticker);
    let p2x = p1x + 5;
    let p2y = p1y + 2.5;
    let p3x = p1x + 5;
    let p3y = p1y - 2.5;
    context.fillStyle = this.m_pTheme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Mark);
    context.strokeStyle = this.m_pTheme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Mark);
  }

}
class LastVolumePlotter extends Plotter {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let timeline = mgr.getTimeline(this.getDataSourceName());
    let areaName = this.getAreaName();
    let area = mgr.getArea(areaName);
    let rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
    let range = mgr.getRange(rangeName);
    if (range.getRange() === 0.0) return;
    let ds = mgr.getDataSource(this.getDataSourceName());
    if (ds.getDataCount() < 1) return;
    let theme = mgr.getTheme(this.getFrameName()); // context.font = theme.getFont(themes.Theme.Font.Default);
    // context.textAlign = "left";
    // context.textBaseline = "middle";
    // context.fillStyle = theme.getColor(themes.Theme.Color.RangeMark);
    // context.strokeStyle = theme.getColor(themes.Theme.Color.RangeMark);

    let v = ds.getDataAt(ds.getDataCount() - 1).volume;
    let y = range.toY(v);
    let left = area.getLeft() + 1; // Plotter.drawLine(context, left, y, left + 7, y);
    // Plotter.drawLine(context, left, y, left + 3, y + 2);
    // Plotter.drawLine(context, left, y, left + 3, y - 2);
    // 指标样式
    // 十字轴线深度Y样式

    Plotter.createPolygon(context, [{
      "x": area.getLeft(),
      "y": y
    }, {
      "x": area.getLeft() + 5,
      "y": y + 10
    }, {
      "x": area.getRight() - 3,
      "y": y + 10
    }, {
      "x": area.getRight() - 3,
      "y": y - 10
    }, {
      "x": area.getLeft() + 5,
      "y": y - 10
    }]);
    context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Background);
    context.fill();
    context.strokeStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Grid5);
    context.stroke();
    context.font = theme.getFont(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Font.Default);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Text5);
    let digits = 2;

    if (range.getNameObject().getCompAt(2) === "main") {
      digits = mgr.getDataSource(this.getDataSourceName()).getDecimalDigits();
    } // 深度Y标记样式
    // context.fillText(Util.fromFloat(v, 2), left + 10, y + 2);


    context.fillText(_util__WEBPACK_IMPORTED_MODULE_3__["Util"].fromFloat(v, 2), area.getCenter(), y + 2);
  }

}
class LastClosePlotter extends Plotter {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let timeline = mgr.getTimeline(this.getDataSourceName());
    let areaName = this.getAreaName();
    let area = mgr.getArea(areaName);
    let rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
    let range = mgr.getRange(rangeName);
    if (range.getRange() === 0.0) return;
    let ds = mgr.getDataSource(this.getDataSourceName());
    if (ds.getDataCount() < 1) return;
    let v = ds._dataItems[ds._dataItems.length - 1].close;
    if (v <= range.getMinValue() || v >= range.getMaxValue()) return;
    let theme = mgr.getTheme(this.getFrameName()); // context.font = theme.getFont(themes.Theme.Font.Default);
    // context.textAlign = "left";
    // context.textBaseline = "middle";
    // context.fillStyle = theme.getColor(themes.Theme.Color.RangeMark);
    // context.strokeStyle = theme.getColor(themes.Theme.Color.RangeMark);

    let y = range.toY(v); // let left = area.getLeft() + 1;
    // Plotter.drawLine(context, left, y, left + 7, y);
    // Plotter.drawLine(context, left, y, left + 3, y + 2);
    // Plotter.drawLine(context, left, y, left + 3, y - 2);
    // 十字轴线深度Y样式

    Plotter.createPolygon(context, [{
      "x": area.getLeft(),
      "y": y
    }, {
      "x": area.getLeft() + 5,
      "y": y + 10
    }, {
      "x": area.getRight() - 3,
      "y": y + 10
    }, {
      "x": area.getRight() - 3,
      "y": y - 10
    }, {
      "x": area.getLeft() + 5,
      "y": y - 10
    }]);
    context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Background);
    context.fill();
    context.strokeStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Grid5);
    context.stroke();
    context.font = theme.getFont(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Font.Default);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Text5);
    let digits = 2;

    if (range.getNameObject().getCompAt(2) === "main") {
      digits = mgr.getDataSource(this.getDataSourceName()).getDecimalDigits();
    } // 深度Y标记样式
    // context.fillText(Util.fromFloat(v, ds.getDecimalDigits()), left + 10, y + 2);


    context.fillText(_util__WEBPACK_IMPORTED_MODULE_3__["Util"].fromFloat(v, ds.getDecimalDigits()), area.getCenter(), y + 2);
  }

}
class SelectionPlotter extends Plotter {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;

    if (mgr._drawingTool !== _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].DrawingTool.CrossCursor) {
      return;
    }

    let area = mgr.getArea(this.getAreaName());
    let timeline = mgr.getTimeline(this.getDataSourceName());

    if (timeline.getSelectedIndex() < 0) {
      return;
    }

    let range = mgr.getRange(this.getAreaName());
    let theme = mgr.getTheme(this.getFrameName());
    context.strokeStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Cursor);
    let x = timeline.toItemCenter(timeline.getSelectedIndex());
    Plotter.drawLine(context, x, area.getTop() - 1, x, area.getBottom());
    let pos = range.getSelectedPosition();

    if (pos >= 0) {
      Plotter.drawLine(context, area.getLeft(), pos, area.getRight(), pos);
    }
  }

}
class TimelineSelectionPlotter extends Plotter {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let area = mgr.getArea(this.getAreaName());
    let timeline = mgr.getTimeline(this.getDataSourceName());
    if (timeline.getSelectedIndex() < 0) return;
    let ds = mgr.getDataSource(this.getDataSourceName());
    if (!_util__WEBPACK_IMPORTED_MODULE_3__["Util"].isInstance(ds, _data_sources__WEBPACK_IMPORTED_MODULE_8__["MainDataSource"])) return;
    let theme = mgr.getTheme(this.getFrameName());
    let lang = mgr.getLanguage();
    let x = timeline.toItemCenter(timeline.getSelectedIndex());
    context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Background);
    context.fillRect(x - 52.5, area.getTop() + 2.5, 106, 18);
    context.strokeStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Grid3);
    context.strokeRect(x - 52.5, area.getTop() + 2.5, 106, 18);
    context.font = theme.getFont(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Font.Default);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Text4);
    let time = new Date(ds.getDataAt(timeline.getSelectedIndex()).date);
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    let strMonth = month.toString();
    let strDate = date.toString();
    let strHour = hour.toString();
    let strMinute = minute.toString();
    let strSecond = second.toString();

    if (minute < 10) {
      strMinute = "0" + strMinute;
    }

    if (second < 10) {
      strSecond = "0" + strSecond;
    }

    let text = "";

    if (lang === "zh-cn") {
      text = strMonth + "月" + strDate + "日  " + strHour + ":" + strMinute;
    } else if (lang === "zh-tw") {
      text = strMonth + "月" + strDate + "日  " + strHour + ":" + strMinute;
    } else if (lang === "en-us") {
      text = TimelineSelectionPlotter.MonthConvert[month] + " " + strDate + "  " + strHour + ":" + strMinute;
    }

    if (_kline__WEBPACK_IMPORTED_MODULE_0__["default"].instance.range < 60000) {
      text += ":" + strSecond;
    }

    context.fillText(text, x, area.getMiddle());
  }

}
TimelineSelectionPlotter.MonthConvert = {
  1: "Jan.",
  2: "Feb.",
  3: "Mar.",
  4: "Apr.",
  5: "May.",
  6: "Jun.",
  7: "Jul.",
  8: "Aug.",
  9: "Sep.",
  10: "Oct.",
  11: "Nov.",
  12: "Dec."
};
class RangeSelectionPlotter extends _named_object__WEBPACK_IMPORTED_MODULE_1__["NamedObject"] {
  constructor(name) {
    super(name);
  }

  Draw(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let areaName = this.getAreaName();
    let area = mgr.getArea(areaName);
    let timeline = mgr.getTimeline(this.getDataSourceName());

    if (timeline.getSelectedIndex() < 0) {
      return;
    }

    let rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
    let range = mgr.getRange(rangeName);

    if (range.getRange() === 0.0 || range.getSelectedPosition() < 0) {
      return;
    }

    let v = range.getSelectedValue();

    if (v === -Number.MAX_VALUE) {
      return;
    }

    let y = range.getSelectedPosition(); // 十字轴线深度Y样式

    Plotter.createPolygon(context, [{
      "x": area.getLeft(),
      "y": y
    }, {
      "x": area.getLeft() + 5,
      "y": y + 10
    }, {
      "x": area.getRight() - 3,
      "y": y + 10
    }, {
      "x": area.getRight() - 3,
      "y": y - 10
    }, {
      "x": area.getLeft() + 5,
      "y": y - 10
    }]);
    let theme = mgr.getTheme(this.getFrameName());
    context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Background);
    context.fill();
    context.strokeStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Grid4);
    context.stroke();
    context.font = theme.getFont(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Font.Default);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.Text3);
    let digits = 2;

    if (range.getNameObject().getCompAt(2) === "main") {
      digits = mgr.getDataSource(this.getDataSourceName()).getDecimalDigits();
    } // y + 2 矫正上下居中


    context.fillText(_util__WEBPACK_IMPORTED_MODULE_3__["Util"].fromFloat(v, digits), area.getCenter(), y + 2);
  }

}
class CToolPlotter extends _named_object__WEBPACK_IMPORTED_MODULE_1__["NamedObject"] {
  constructor(name, toolObject) {
    super(name);
    this.toolObject = toolObject;
    let pMgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let pArea = pMgr.getArea('frame0.k0.main');

    if (pArea === null) {
      this.areaPos = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      return;
    }

    this.areaPos = {
      left: pArea.getLeft(),
      top: pArea.getTop(),
      right: pArea.getRight(),
      bottom: pArea.getBottom()
    };
    this.crossPt = {};
    this.normalSize = 4;
    this.selectedSize = 6;
    this.cursorLen = 4;
    this.cursorGapLen = 3;
    this.theme = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance.getTheme(this.getFrameName());
  }

  drawCursor(context) {
    this.drawCrossCursor(context);
  }

  drawCrossCursor(context) {
    context.strokeStyle = this.theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.LineColorNormal);
    context.fillStyle = this.theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.LineColorNormal);
    let tempPt = this.toolObject.getPoint(0).getPosXY();

    if (tempPt === null) {
      return;
    }

    let x = tempPt.x;
    let y = tempPt.y;
    let cursorLen = this.cursorLen;
    let cursorGapLen = this.cursorGapLen;
    context.fillRect(x, y, 1, 1);
    Plotter.drawLine(context, x - cursorLen - cursorGapLen, y, x - cursorGapLen, y);
    Plotter.drawLine(context, x + cursorLen + cursorGapLen, y, x + cursorGapLen, y);
    Plotter.drawLine(context, x, y - cursorLen - cursorGapLen, x, y - cursorGapLen);
    Plotter.drawLine(context, x, y + cursorLen + cursorGapLen, x, y + cursorGapLen);
  }

  drawCircle(context, center, radius) {
    let centerX = center.x;
    let centerY = center.y;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = this.theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.CircleColorFill);
    context.fill();
    context.stroke();
  }

  drawCtrlPt(context) {
    context.strokeStyle = this.theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.CircleColorStroke);

    for (let i = 0; i < this.ctrlPtsNum; i++) {
      this.drawCircle(context, this.ctrlPts[1][i], this.normalSize);
    }
  }

  highlightCtrlPt(context) {
    context.strokeStyle = this.theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.CircleColorStroke);

    for (let i = 0; i < this.ctrlPtsNum; i++) {
      if (this.toolObject.getPoint(i).getState() === _cpoint__WEBPACK_IMPORTED_MODULE_4__["CPoint"].state.Highlight) this.drawCircle(context, this.ctrlPts[1][i], this.selectedSize);
    }
  }

  drawFibRayLines(context, startPoint, endPoint) {
    for (let i = 0; i < this.fiboFansSequence.length; i++) {
      let stageY = startPoint.y + (100 - this.fiboFansSequence[i]) / 100 * (endPoint.y - startPoint.y);
      let tempStartPt = {
        x: startPoint.x,
        y: startPoint.y
      };
      let tempEndPt = {
        x: endPoint.x,
        y: stageY
      };
      this.drawRayLines(context, tempStartPt, tempEndPt);
    }
  }

  drawRayLines(context, startPoint, endPoint) {
    this.getAreaPos();
    let tempStartPt = {
      x: startPoint.x,
      y: startPoint.y
    };
    let tempEndPt = {
      x: endPoint.x,
      y: endPoint.y
    };
    let crossPt = this.getRectCrossPt(this.areaPos, tempStartPt, tempEndPt);
    let tempCrossPt;

    if (endPoint.x === startPoint.x) {
      if (endPoint.y === startPoint.y) {
        tempCrossPt = endPoint;
      } else {
        tempCrossPt = endPoint.y > startPoint.y ? {
          x: crossPt[1].x,
          y: crossPt[1].y
        } : {
          x: crossPt[0].x,
          y: crossPt[0].y
        };
      }
    } else {
      tempCrossPt = endPoint.x > startPoint.x ? {
        x: crossPt[1].x,
        y: crossPt[1].y
      } : {
        x: crossPt[0].x,
        y: crossPt[0].y
      };
    }

    Plotter.drawLine(context, startPoint.x, startPoint.y, tempCrossPt.x, tempCrossPt.y);
  }

  lenBetweenPts(pt1, pt2) {
    return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
  }

  getCtrlPts() {
    for (let i = 0; i < this.ctrlPtsNum; i++) {
      this.ctrlPts[0][i] = this.toolObject.getPoint(i);
    }
  }

  updateCtrlPtPos() {
    for (let i = 0; i < this.ctrlPtsNum; i++) {
      this.ctrlPts[1][i] = this.ctrlPts[0][i].getPosXY();
    }
  }

  getAreaPos() {
    let pMgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let pArea = pMgr.getArea('frame0.k0.main');

    if (pArea === null) {
      this.areaPos = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      return;
    }

    this.areaPos = {
      left: Math.floor(pArea.getLeft()),
      top: Math.floor(pArea.getTop()),
      right: Math.floor(pArea.getRight()),
      bottom: Math.floor(pArea.getBottom())
    };
  }

  updateDraw(context) {
    context.strokeStyle = this.theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.LineColorNormal);
    this.draw(context);
    this.drawCtrlPt(context);
  }

  finishDraw(context) {
    context.strokeStyle = this.theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.LineColorNormal);
    this.draw(context);
  }

  highlight(context) {
    context.strokeStyle = this.theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.LineColorSelected);
    this.draw(context);
    this.drawCtrlPt(context);
    this.highlightCtrlPt(context);
  }

}
class DrawStraightLinesPlotter extends CToolPlotter {
  constructor(name, toolObject) {
    super(name, toolObject);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 2;
    this.ctrlPts = [new Array(this.ctrlPtsNum), new Array(2)];
    this.getCtrlPts();
  }

  draw(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    this.endPoint = this.ctrlPts[1][1];

    if (this.startPoint.x === this.endPoint.x && this.startPoint.y === this.endPoint.y) {
      Plotter.drawLine(context, this.areaPos.left, this.startPoint.y, this.areaPos.right, this.startPoint.y);
    } else {
      this.crossPt = this.getRectCrossPt(this.areaPos, this.startPoint, this.endPoint);
      Plotter.drawLine(context, this.crossPt[0].x, this.crossPt[0].y, this.crossPt[1].x, this.crossPt[1].y);
    }
  }

}
class DrawSegLinesPlotter extends CToolPlotter {
  constructor(name, toolObject) {
    super(name, toolObject);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 2;
    this.ctrlPts = [new Array(this.ctrlPtsNum), new Array(2)];
    this.getCtrlPts();
  }

  draw(context) {
    this.updateCtrlPtPos();
    this.startPoint = this.ctrlPts[1][0];
    this.endPoint = this.ctrlPts[1][1];

    if (this.startPoint.x === this.endPoint.x && this.startPoint.y === this.endPoint.y) {
      this.endPoint.x += 1;
    }

    Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
  }

}
class DrawRayLinesPlotter extends CToolPlotter {
  constructor(name, toolObject) {
    super(name);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 2;
    this.ctrlPts = [new Array(this.ctrlPtsNum), new Array(2)];
    this.getCtrlPts();
  }

  draw(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    this.endPoint = this.ctrlPts[1][1];

    if (this.startPoint.x === this.endPoint.x && this.startPoint.y === this.endPoint.y) {
      this.endPoint.x += 1;
    }

    this.drawRayLines(context, this.startPoint, this.endPoint);
  }

}
class DrawArrowLinesPlotter extends CToolPlotter {
  constructor(name, toolObject) {
    super(name, toolObject);
    this.toolObject = toolObject;
    this.arrowSizeRatio = 0.03;
    this.arrowSize = 4;
    this.crossPt = {
      x: -1,
      y: -1
    };
    this.ctrlPtsNum = 2;
    this.ctrlPts = [new Array(this.ctrlPtsNum), new Array(2)];
    this.getCtrlPts();
  }

  drawArrow(context, startPoint, endPoint) {
    let len = this.lenBetweenPts(startPoint, endPoint);
    let vectorA = [endPoint.x - startPoint.x, endPoint.y - startPoint.y];
    this.crossPt.x = startPoint.x + (1 - this.arrowSize / len) * vectorA[0];
    this.crossPt.y = startPoint.y + (1 - this.arrowSize / len) * vectorA[1];
    let vectorAautho = [-vectorA[1], vectorA[0]];
    let Aautho = {
      x: vectorAautho[0],
      y: vectorAautho[1]
    };
    let origin = {
      x: 0,
      y: 0
    };
    vectorAautho[0] = this.arrowSize * Aautho.x / this.lenBetweenPts(Aautho, origin);
    vectorAautho[1] = this.arrowSize * Aautho.y / this.lenBetweenPts(Aautho, origin);
    let arrowEndPt = [this.crossPt.x + vectorAautho[0], this.crossPt.y + vectorAautho[1]];
    Plotter.drawLine(context, endPoint.x, endPoint.y, arrowEndPt[0], arrowEndPt[1]);
    arrowEndPt = [this.crossPt.x - vectorAautho[0], this.crossPt.y - vectorAautho[1]];
    Plotter.drawLine(context, endPoint.x, endPoint.y, arrowEndPt[0], arrowEndPt[1]);
  }

  draw(context) {
    this.updateCtrlPtPos();
    this.startPoint = this.ctrlPts[1][0];
    this.endPoint = this.ctrlPts[1][1];

    if (this.startPoint.x === this.endPoint.x && this.startPoint.y === this.endPoint.y) {
      this.endPoint.x += 1;
    }

    Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
    this.drawArrow(context, this.startPoint, this.endPoint);
  }

}
class DrawHoriStraightLinesPlotter extends CToolPlotter {
  constructor(name, toolObject) {
    super(name);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 1;
    this.ctrlPts = [new Array(this.ctrlPtsNum), new Array(2)];
    this.getCtrlPts();
  }

  draw(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    Plotter.drawLine(context, this.areaPos.left, this.startPoint.y, this.areaPos.right, this.startPoint.y);
  }

}
class DrawHoriRayLinesPlotter extends CToolPlotter {
  constructor(name, toolObject) {
    super(name);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 2;
    this.ctrlPts = [new Array(this.ctrlPtsNum), new Array(2)];
    this.getCtrlPts();
  }

  draw(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    this.endPoint = this.ctrlPts[1][1];

    if (this.startPoint.x === this.endPoint.x) {
      Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.areaPos.right, this.startPoint.y);
    } else {
      let tempEndPt = {
        x: this.endPoint.x,
        y: this.startPoint.y
      };
      this.drawRayLines(context, this.startPoint, tempEndPt);
    }
  }

}
class DrawHoriSegLinesPlotter extends CToolPlotter {
  constructor(name, toolObject) {
    super(name, toolObject);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 2;
    this.ctrlPts = [new Array(this.ctrlPtsNum), new Array(2)];
    this.getCtrlPts();
  }

  draw(context) {
    this.updateCtrlPtPos();
    this.startPoint = this.ctrlPts[1][0];
    this.endPoint = this.ctrlPts[1][1];
    this.endPoint.y = this.startPoint.y;

    if (this.startPoint.x === this.endPoint.x && this.startPoint.y === this.endPoint.y) {
      Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.endPoint.x + 1, this.startPoint.y);
    } else {
      Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.endPoint.x, this.startPoint.y);
    }
  }

}
class DrawVertiStraightLinesPlotter extends CToolPlotter {
  constructor(name, toolObject) {
    super(name);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 1;
    this.ctrlPts = [new Array(this.ctrlPtsNum), new Array(2)];
    this.getCtrlPts();
  }

  draw(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    Plotter.drawLine(context, this.startPoint.x, this.areaPos.top, this.startPoint.x, this.areaPos.bottom);
  }

}
class DrawPriceLinesPlotter extends CToolPlotter {
  constructor(name, toolObject) {
    super(name);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 1;
    this.ctrlPts = [new Array(this.ctrlPtsNum), new Array(2)];
    this.getCtrlPts();
  }

  draw(context) {
    context.font = "12px Tahoma";
    context.textAlign = "left";
    context.fillStyle = this.theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.LineColorNormal);
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    let text = this.ctrlPts[0][0].getPosIV().v;
    Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.areaPos.right, this.startPoint.y);
    context.fillText(text.toFixed(2), this.startPoint.x + 2, this.startPoint.y - 15);
  }

}
class ParallelLinesPlotter extends CToolPlotter {
  constructor(name, toolObject) {
    super(name);
    this.toolObject = toolObject;
  }

  getParaPt() {
    let vectorA = [];
    vectorA[0] = this.endPoint.x - this.startPoint.x;
    vectorA[1] = this.endPoint.y - this.startPoint.y;
    let vectorB = [];
    vectorB[0] = this.paraStartPoint.x - this.startPoint.x;
    vectorB[1] = this.paraStartPoint.y - this.startPoint.y;
    this.paraEndPoint = {
      x: -1,
      y: -1
    };
    this.paraEndPoint.x = vectorA[0] + vectorB[0] + this.startPoint.x;
    this.paraEndPoint.y = vectorA[1] + vectorB[1] + this.startPoint.y;
  }

}
class DrawBiParallelLinesPlotter extends ParallelLinesPlotter {
  constructor(name, toolObject) {
    super(name, toolObject);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 3;
    this.ctrlPts = [new Array(this.ctrlPtsNum), new Array(2)];
    this.getCtrlPts();
  }

  draw(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    this.paraStartPoint = this.ctrlPts[1][1];
    this.endPoint = this.ctrlPts[1][2];
    this.getParaPt();
    this.getAreaPos();
    this.crossPt0 = this.getRectCrossPt(this.areaPos, this.startPoint, this.endPoint);
    Plotter.drawLine(context, this.crossPt0[0].x, this.crossPt0[0].y, this.crossPt0[1].x, this.crossPt0[1].y);
    this.crossPt1 = this.getRectCrossPt(this.areaPos, this.paraStartPoint, this.paraEndPoint);
    Plotter.drawLine(context, this.crossPt1[0].x, this.crossPt1[0].y, this.crossPt1[1].x, this.crossPt1[1].y);
  }

}
class DrawBiParallelRayLinesPlotter extends ParallelLinesPlotter {
  constructor(name, toolObject) {
    super(name, toolObject);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 3;
    this.ctrlPts = [new Array(this.ctrlPtsNum), new Array(2)];
    this.getCtrlPts();
  }

  draw(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    this.paraStartPoint = this.ctrlPts[1][1];
    this.endPoint = this.ctrlPts[1][2];

    if (this.startPoint.x === this.endPoint.x && this.startPoint.y === this.endPoint.y) {
      this.endPoint.x += 1;
    }

    this.getParaPt();
    this.drawRayLines(context, this.startPoint, this.endPoint);
    this.drawRayLines(context, this.paraStartPoint, this.paraEndPoint);
  }

}
class DrawTriParallelLinesPlotter extends ParallelLinesPlotter {
  constructor(name, toolObject) {
    super(name, toolObject);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 3;
    this.ctrlPts = [new Array(this.ctrlPtsNum), new Array(2)];
    this.getCtrlPts();
  }

  draw(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    this.paraStartPoint = this.ctrlPts[1][1];
    this.endPoint = this.ctrlPts[1][2];
    let vectorA = [];
    vectorA[0] = this.endPoint.x - this.startPoint.x;
    vectorA[1] = this.endPoint.y - this.startPoint.y;
    let vectorB = [];
    vectorB[0] = this.paraStartPoint.x - this.startPoint.x;
    vectorB[1] = this.paraStartPoint.y - this.startPoint.y;
    this.para1EndPoint = {
      x: -1,
      y: -1
    };
    this.para2EndPoint = {
      x: -1,
      y: -1
    };
    this.para2StartPoint = {
      x: -1,
      y: -1
    };
    this.para1EndPoint.x = vectorA[0] + vectorB[0] + this.startPoint.x;
    this.para1EndPoint.y = vectorA[1] + vectorB[1] + this.startPoint.y;
    this.para2StartPoint.x = this.startPoint.x - vectorB[0];
    this.para2StartPoint.y = this.startPoint.y - vectorB[1];
    this.para2EndPoint.x = this.endPoint.x - vectorB[0];
    this.para2EndPoint.y = this.endPoint.y - vectorB[1];
    this.getAreaPos();
    this.crossPt0 = this.getRectCrossPt(this.areaPos, this.startPoint, this.endPoint);
    Plotter.drawLine(context, this.crossPt0[0].x, this.crossPt0[0].y, this.crossPt0[1].x, this.crossPt0[1].y);
    this.crossPt1 = this.getRectCrossPt(this.areaPos, this.paraStartPoint, this.para1EndPoint);
    Plotter.drawLine(context, this.crossPt1[0].x, this.crossPt1[0].y, this.crossPt1[1].x, this.crossPt1[1].y);
    this.crossPt2 = this.getRectCrossPt(this.areaPos, this.para2StartPoint, this.para2EndPoint);
    Plotter.drawLine(context, this.crossPt2[0].x, this.crossPt2[0].y, this.crossPt2[1].x, this.crossPt2[1].y);
  }

}
class BandLinesPlotter extends CToolPlotter {
  constructor(name, toolObject) {
    super(name);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 2;
    this.ctrlPts = [new Array(this.ctrlPtsNum), new Array(2)];
    this.getCtrlPts();
  }

  drawLinesAndInfo(context, startPoint, endPoint) {
    context.font = "12px Tahoma";
    context.textAlign = "left";
    context.fillStyle = this.theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_6__["Theme"].Color.LineColorNormal);
    let text;

    if (this.toolObject.state === _ctools__WEBPACK_IMPORTED_MODULE_9__["CToolObject"].state.Draw) {
      this.startPtValue = this.toolObject.getPoint(0).getPosIV().v;
      this.endPtValue = this.toolObject.getPoint(1).getPosIV().v;
    }

    this.getAreaPos();

    for (let i = 0; i < this.fiboSequence.length; i++) {
      let stageY = startPoint.y + (100 - this.fiboSequence[i]) / 100 * (endPoint.y - startPoint.y);
      if (stageY > this.areaPos.bottom) continue;
      let stageYvalue = this.startPtValue + (100 - this.fiboSequence[i]) / 100 * (this.endPtValue - this.startPtValue);
      Plotter.drawLine(context, this.areaPos.left, stageY, this.areaPos.right, stageY);
      text = this.fiboSequence[i].toFixed(1) + '% ' + stageYvalue.toFixed(1);
      context.fillText(text, this.areaPos.left + 2, stageY - 15);
    }
  }

  draw(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    this.endPoint = this.ctrlPts[1][1];
    this.drawLinesAndInfo(context, this.startPoint, this.endPoint);
  }

}
class DrawFibRetracePlotter extends BandLinesPlotter {
  constructor(name, toolObject) {
    super(name, toolObject);
    this.toolObject = toolObject;
    this.fiboSequence = [100.0, 78.6, 61.8, 50.0, 38.2, 23.6, 0.0];
  }

}
class DrawBandLinesPlotter extends BandLinesPlotter {
  constructor(name, toolObject) {
    super(name, toolObject);
    this.toolObject = toolObject;
    this.fiboSequence = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
  }

}
class DrawFibFansPlotter extends CToolPlotter {
  constructor(name, toolObject) {
    super(name);
    this.toolObject = toolObject;
    this.fiboFansSequence = [0, 38.2, 50, 61.8];
    this.ctrlPtsNum = 2;
    this.ctrlPts = [new Array(this.ctrlPtsNum), new Array(2)];
    this.getCtrlPts();
  }

  drawLinesAndInfo(context, startPoint, endPoint) {
    this.drawFibRayLines(context, startPoint, endPoint);
  }

  draw(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    this.endPoint = this.ctrlPts[1][1];

    if (this.startPoint.x === this.endPoint.x && this.startPoint.y === this.endPoint.y) {
      this.endPoint.x += 1;
    }

    this.drawLinesAndInfo(context, this.startPoint, this.endPoint);
  }

}
class CDynamicLinePlotter extends _named_object__WEBPACK_IMPORTED_MODULE_1__["NamedObject"] {
  constructor(name) {
    super(name);
    this.flag = true;
    this.context = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance._overlayContext;
  }

  getAreaPos() {
    let pMgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let pArea = pMgr.getArea('frame0.k0.main');

    if (pArea === null) {
      this.areaPos = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      return;
    }

    this.areaPos = {
      left: Math.floor(pArea.getLeft()),
      top: Math.floor(pArea.getTop()),
      right: Math.floor(pArea.getRight()),
      bottom: Math.floor(pArea.getBottom())
    };
  }

  Draw(context) {
    this.getAreaPos();
    let pMgr = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance;
    let pTDP = pMgr.getDataSource(this.getDataSourceName());
    if (pTDP === null || !_util__WEBPACK_IMPORTED_MODULE_3__["Util"].isInstance(pTDP, _data_sources__WEBPACK_IMPORTED_MODULE_8__["MainDataSource"])) return;
    this.context.save();
    this.context.rect(this.areaPos.left, this.areaPos.top, this.areaPos.right - this.areaPos.left, this.areaPos.bottom - this.areaPos.top);
    this.context.clip();
    let count = pTDP.getToolObjectCount();

    for (let i = 0; i < count; i++) {
      let toolObject = pTDP.getToolObject(i);
      let state = toolObject.getState();

      switch (state) {
        case _ctools__WEBPACK_IMPORTED_MODULE_9__["CToolObject"].state.BeforeDraw:
          toolObject.getPlotter().theme = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance.getTheme(this.getFrameName());
          toolObject.getPlotter().drawCursor(this.context);
          break;

        case _ctools__WEBPACK_IMPORTED_MODULE_9__["CToolObject"].state.Draw:
          toolObject.getPlotter().theme = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance.getTheme(this.getFrameName());
          toolObject.getPlotter().updateDraw(this.context);
          break;

        case _ctools__WEBPACK_IMPORTED_MODULE_9__["CToolObject"].state.AfterDraw:
          toolObject.getPlotter().theme = _chart_manager__WEBPACK_IMPORTED_MODULE_2__["ChartManager"].instance.getTheme(this.getFrameName());
          toolObject.getPlotter().finishDraw(this.context);
          break;

        default:
          break;
      }
    }

    let sel = pTDP.getSelectToolObjcet();
    if (sel !== null && sel !== _ctools__WEBPACK_IMPORTED_MODULE_9__["CToolObject"].state.Draw) sel.getPlotter().highlight(this.context);
    this.context.restore();
  }

}

/***/ }),

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

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataProvider", function() { return DataProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainDataProvider", function() { return MainDataProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndicatorDataProvider", function() { return IndicatorDataProvider; });
/* harmony import */ var _named_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _chart_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(142);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(158);
/* harmony import */ var _data_sources__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(152);




class DataProvider extends _named_object__WEBPACK_IMPORTED_MODULE_0__["NamedObject"] {
  constructor(name) {
    super(name);
    this._minValue = 0;
    this._maxValue = 0;
    this._minValueIndex = -1;
    this._maxValueIndex = -1;
  }

  getMinValue() {
    return this._minValue;
  }

  getMaxValue() {
    return this._maxValue;
  }

  getMinValueIndex() {
    return this._minValueIndex;
  }

  getMaxValueIndex() {
    return this._maxValueIndex;
  }

  getMinMaxAt(index, minmax) {
    return true;
  }

  calcRange(firstIndexes, lastIndex, minmaxes, indexes) {
    let min = Number.MAX_VALUE;
    let max = -Number.MAX_VALUE;
    let minIndex = -1;
    let maxIndex = -1;
    let minmax = {};
    let i = lastIndex - 1;
    let n = firstIndexes.length - 1;

    for (; n >= 0; n--) {
      let first = firstIndexes[n];

      if (i < first) {
        minmaxes[n] = {
          "min": min,
          "max": max
        };
      } else {
        for (; i >= first; i--) {
          if (this.getMinMaxAt(i, minmax) === false) {
            continue;
          }

          if (min > minmax.min) {
            min = minmax.min;
            minIndex = i;
          }

          if (max < minmax.max) {
            max = minmax.max;
            maxIndex = i;
          }
        }

        minmaxes[n] = {
          "min": min,
          "max": max
        };
      }

      if (indexes !== null && indexes !== undefined) {
        indexes[n] = {
          "minIndex": minIndex,
          "maxIndex": maxIndex
        };
      }
    }
  }

  updateRange() {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    let timeline = mgr.getTimeline(this.getDataSourceName());
    let firstIndexes = [timeline.getFirstIndex()];
    let minmaxes = [{}];
    let indexes = [{}];
    this.calcRange(firstIndexes, timeline.getLastIndex(), minmaxes, indexes);
    this._minValue = minmaxes[0].min;
    this._maxValue = minmaxes[0].max;
    this._minValueIndex = indexes[0].minIndex;
    this._maxValueIndex = indexes[0].maxIndex;
  }

}
class MainDataProvider extends DataProvider {
  constructor(name) {
    super(name);
    this._candlestickDS = null;
  }

  updateData() {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    let ds = mgr.getDataSource(this.getDataSourceName());

    if (!_util__WEBPACK_IMPORTED_MODULE_2__["Util"].isInstance(ds, _data_sources__WEBPACK_IMPORTED_MODULE_3__["MainDataSource"])) {
      return;
    }

    this._candlestickDS = ds;
  }

  getMinMaxAt(index, minmax) {
    let data = this._candlestickDS.getDataAt(index);

    minmax.min = data.low;
    minmax.max = data.high;
    return true;
  }

}
class IndicatorDataProvider extends DataProvider {
  getIndicator() {
    return this._indicator;
  }

  setIndicator(v) {
    this._indicator = v;
    this.refresh();
  }

  refresh() {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    let ds = mgr.getDataSource(this.getDataSourceName());

    if (ds.getDataCount() < 1) {
      return;
    }

    let indic = this._indicator;
    let i,
        last = ds.getDataCount();
    indic.clear();
    indic.reserve(last);

    for (i = 0; i < last; i++) {
      indic.execute(ds, i);
    }
  }

  updateData() {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    let ds = mgr.getDataSource(this.getDataSourceName());

    if (ds.getDataCount() < 1) {
      return;
    }

    let indic = this._indicator;
    let mode = ds.getUpdateMode();

    switch (mode) {
      case _data_sources__WEBPACK_IMPORTED_MODULE_3__["DataSource"].UpdateMode.Refresh:
        {
          this.refresh();
          break;
        }

      case _data_sources__WEBPACK_IMPORTED_MODULE_3__["DataSource"].UpdateMode.Append:
        {
          indic.reserve(ds.getAppendedCount());
          break;
        }

      case _data_sources__WEBPACK_IMPORTED_MODULE_3__["DataSource"].UpdateMode.Update:
        {
          let i,
              last = ds.getDataCount();
          let cnt = ds.getUpdatedCount() + ds.getAppendedCount();

          for (i = last - cnt; i < last; i++) {
            indic.execute(ds, i);
          }

          break;
        }
    }
  }

  getMinMaxAt(index, minmax) {
    minmax.min = Number.MAX_VALUE;
    minmax.max = -Number.MAX_VALUE;
    let result,
        valid = false;

    let i,
        cnt = this._indicator.getOutputCount();

    for (i = 0; i < cnt; i++) {
      result = this._indicator.getOutputAt(i).execute(index);

      if (isNaN(result) === false) {
        valid = true;

        if (minmax.min > result) {
          minmax.min = result;
        }

        if (minmax.max < result) {
          minmax.max = result;
        }
      }
    }

    return valid;
  }

}

/***/ }),

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

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PositiveRange", function() { return PositiveRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZeroBasedPositiveRange", function() { return ZeroBasedPositiveRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainRange", function() { return MainRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZeroCenteredRange", function() { return ZeroCenteredRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PercentageRange", function() { return PercentageRange; });
/* harmony import */ var _named_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _chart_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(142);


class Range extends _named_object__WEBPACK_IMPORTED_MODULE_0__["NamedObject"] {
  constructor(name) {
    super(name);
    this._updated = true;
    this._minValue = Number.MAX_VALUE;
    this._maxValue = -Number.MAX_VALUE;
    this._outerMinValue = Number.MAX_VALUE;
    this._outerMaxValue = -Number.MAX_VALUE;
    this._ratio = 0;
    this._top = 0;
    this._bottom = 0;
    this._paddingTop = 0;
    this._paddingBottom = 0;
    this._minInterval = 36;
    this._selectedPosition = -1;
    this._selectedValue = -Number.MAX_VALUE;
    this._gradations = [];
  }

  isUpdated() {
    return this._updated;
  }

  setUpdated(v) {
    this._updated = v;
  }

  getMinValue() {
    return this._minValue;
  }

  getMaxValue() {
    return this._maxValue;
  }

  getRange() {
    return this._maxValue - this._minValue;
  }

  getOuterMinValue() {
    return this._outerMinValue;
  }

  getOuterMaxValue() {
    return this._outerMaxValue;
  }

  getOuterRange() {
    return this._outerMaxValue - this._outerMinValue;
  }

  getHeight() {
    return Math.max(0, this._bottom - this._top);
  }

  getGradations() {
    return this._gradations;
  }

  getMinInterval() {
    return this._minInterval;
  }

  setMinInterval(v) {
    this._minInterval = v;
  }

  getSelectedPosition() {
    if (this._selectedPosition >= 0) {
      return this._selectedPosition;
    }

    if (this._selectedValue > -Number.MAX_VALUE) {
      return this.toY(this._selectedValue);
    }

    return -1;
  }

  getSelectedValue() {
    if (this._selectedValue > -Number.MAX_VALUE) {
      return this._selectedValue;
    }

    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    let area = mgr.getArea(this.getAreaName());

    if (area === null) {
      return -Number.MAX_VALUE;
    }

    if (this._selectedPosition < area.getTop() + 12 || this._selectedPosition >= area.getBottom() - 4) {
      return -Number.MAX_VALUE;
    }

    return this.toValue(this._selectedPosition);
  }

  setPaddingTop(p) {
    this._paddingTop = p;
  }

  setPaddingBottom(p) {
    this._paddingBottom = p;
  }

  toValue(y) {
    return this._maxValue - (y - this._top) / this._ratio;
  }

  toY(value) {
    if (this._ratio > 0) {
      return this._top + Math.floor((this._maxValue - value) * this._ratio + 0.5);
    }

    return this._top;
  }

  toHeight(value) {
    if (value == Infinity || this._ratio == 0) {
      return 1.5;
    }

    return Math.floor(value * this._ratio + 1.5);
  }

  update() {
    let min = Number.MAX_VALUE;
    let max = -Number.MAX_VALUE;
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    let dp,
        dpNames = [".main", ".secondary"];

    for (let i = 0; i < dpNames.length; i++) {
      dp = mgr.getDataProvider(this.getName() + dpNames[i]);

      if (dp !== null && dp !== undefined) {
        min = Math.min(min, dp.getMinValue());
        max = Math.max(max, dp.getMaxValue());
      }
    }

    let r = {
      "min": min,
      "max": max
    };
    this.preSetRange(r);
    this.setRange(r.min, r.max);
  }

  select(v) {
    this._selectedValue = v;
    this._selectedPosition = -1;
  }

  selectAt(y) {
    this._selectedPosition = y;
    this._selectedValue = -Number.MAX_VALUE;
  }

  unselect() {
    this._selectedPosition = -1;
    this._selectedValue = -Number.MAX_VALUE;
  }

  preSetRange(r) {
    if (r.min === r.max) {
      r.min = -1.0;
      r.max = 1.0;
    }
  }

  setRange(minValue, maxValue) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    let area = mgr.getArea(this.getAreaName());

    if (this._minValue === minValue && this._maxValue === maxValue && !area.isChanged()) {
      return;
    }

    this._updated = true;
    this._minValue = minValue;
    this._maxValue = maxValue;
    this._gradations = [];

    let top = area.getTop() + this._paddingTop;

    let bottom = area.getBottom() - (this._paddingBottom + 1);

    if (top >= bottom) {
      this._minValue = this._maxValue;
      return;
    }

    this._top = top;
    this._bottom = bottom;
    if (this._maxValue > this._minValue) this._ratio = (bottom - top) / (this._maxValue - this._minValue);else {
      this._ratio = 1;
    }
    this._outerMinValue = this.toValue(area.getBottom());
    this._outerMaxValue = this.toValue(area.getTop());
    this.updateGradations();
  }

  calcInterval() {
    let H = this.getHeight();
    let h = this.getMinInterval();

    if (H / h <= 1) {
      h = H >> 1;
    }

    let d = this.getRange();
    let i = 0;

    while (i > -2 && Math.floor(d) < d) {
      d *= 10.0;
      i--;
    }

    let m, c;

    for (;; i++) {
      c = Math.pow(10.0, i);
      m = c;
      if (this.toHeight(m) > h) break;
      m = 2.0 * c;
      if (this.toHeight(m) > h) break;
      m = 5.0 * c;
      if (this.toHeight(m) > h) break;
    }

    return m;
  }

  updateGradations() {
    this._gradations = [];
    let interval = this.calcInterval();

    if (interval <= 0.0) {
      return;
    }

    let v = Math.floor(this.getMaxValue() / interval) * interval;

    do {
      this._gradations.push(v);

      v -= interval;
    } while (v > this.getMinValue());
  }

}
class PositiveRange extends Range {
  constructor(name) {
    super(name);
  }

  preSetRange(r) {
    if (r.min < 0) r.min = 0;
    if (r.max < 0) r.max = 0;
  }

}
class ZeroBasedPositiveRange extends Range {
  constructor(name) {
    super(name);
  }

  preSetRange(r) {
    r.min = 0;
    if (r.max < 0) r.max = 0;
  }

}
class MainRange extends Range {
  constructor(name) {
    super(name);
  }

  preSetRange(r) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    let timeline = mgr.getTimeline(this.getDataSourceName());
    let dIndex = timeline.getMaxIndex() - timeline.getLastIndex();

    if (dIndex < 25) {
      let ds = mgr.getDataSource(this.getDataSourceName());
      let data = ds.getDataAt(ds.getDataCount() - 1);
      let d = (r.max - r.min) / 4 * (1 - dIndex / 25);
      r.min = Math.min(r.min, Math.max(data.low - d, 0));
      r.max = Math.max(r.max, data.high + d);
    }

    if (r.min > 0) {
      let a = r.max / r.min;

      if (a < 1.016) {
        let m = (r.max + r.min) / 2.0;
        let c = (a - 1.0) * 1.5;
        r.max = m * (1.0 + c);
        r.min = m * (1.0 - c);
      } else if (a < 1.048) {
        let m = (r.max + r.min) / 2.0;
        r.max = m * 1.024;
        r.min = m * 0.976;
      }
    }

    if (r.min < 0) r.min = 0;
    if (r.max < 0) r.max = 0;
  }

}
class ZeroCenteredRange extends Range {
  constructor(name) {
    super(name);
  }

  calcInterval(area) {
    let h = this.getMinInterval();

    if (area.getHeight() / h < 2) {
      return 0.0;
    }

    let r = this.getRange();
    let i;

    for (i = 3;; i += 2) {
      if (this.toHeight(r / i) <= h) break;
    }

    i -= 2;
    return r / i;
  }

  updateGradations() {
    this._gradations = [];
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    let area = mgr.getArea(this.getAreaName());
    let interval = this.calcInterval(area);

    if (interval <= 0.0) {
      return;
    }

    let v = interval / 2.0;

    do {
      this._gradations.push(v);

      this._gradations.push(-v);

      v += interval;
    } while (v <= this.getMaxValue());
  }

  preSetRange(r) {
    let abs = Math.max(Math.abs(r.min), Math.abs(r.max));
    r.min = -abs;
    r.max = abs;
  }

}
class PercentageRange extends Range {
  constructor(name) {
    super(name);
  }

  updateGradations() {
    this._gradations = [];
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    let area = mgr.getArea(this.getAreaName());
    let interval = 10.0;
    let h = Math.floor(this.toHeight(interval));
    if (h << 2 > area.getHeight()) return;
    let v = Math.ceil(this.getMinValue() / interval) * interval;
    if (v === 0.0) v = 0;

    if (h << 2 < 24) {
      if (h << 1 < 8) return;

      do {
        if (v === 20.0 || v === 80.0) this._gradations.push(v);
        v += interval;
      } while (v < this.getMaxValue());
    } else {
      do {
        if (h < 8) {
          if (v === 20.0 || v === 50.0 || v === 80.0) this._gradations.push(v);
        } else {
          if (v === 0.0 || v === 20.0 || v === 50.0 || v === 80.0 || v === 100.0) this._gradations.push(v);
        }

        v += interval;
      } while (v < this.getMaxValue());
    }
  }

}

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CToolManager", function() { return CToolManager; });
/* harmony import */ var _named_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _cpoint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(207);
/* harmony import */ var _ctools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(208);



class CToolManager extends _named_object__WEBPACK_IMPORTED_MODULE_0__["NamedObject"] {
  constructor(name) {
    super(name);
    this.selectedObject = -1;
    this.toolObjects = [];
  }

  getToolObjectCount() {
    return this.toolObjects.length;
  }

  addToolObject(o) {
    this.toolObjects.push(o);
  }

  getToolObject(i) {
    if (i < this.toolObjects.length && i >= 0) {
      return this.toolObjects[i];
    }

    return null;
  }

  getCurrentObject() {
    return this.getToolObject(this.getToolObjectCount() - 1);
  }

  getSelectedObject() {
    return this.getToolObject(this.selectedObject);
  }

  delCurrentObject() {
    this.toolObjects.splice(this.getToolObjectCount() - 1, 1);
  }

  delSelectedObject() {
    this.toolObjects.splice(this.selectedObject, 1);
    this.selectedObject = -1;
  }

  acceptMouseMoveEvent(x, y) {
    if (this.selectedObject === -1) {
      let curr = this.toolObjects[this.getToolObjectCount() - 1];
      if (curr !== null && curr !== undefined && curr.getState() !== _ctools__WEBPACK_IMPORTED_MODULE_2__["CToolObject"].state.AfterDraw) return curr.acceptMouseMoveEvent(x, y);
    } else {
      let sel = this.toolObjects[this.selectedObject];

      if (sel.getState() === _ctools__WEBPACK_IMPORTED_MODULE_2__["CToolObject"].state.Draw) {
        return sel.acceptMouseMoveEvent(x, y);
      }

      sel.unselect();
      this.selectedObject = -1;
    }

    for (let index in this.toolObjects) {
      if (this.toolObjects[index].isSelected(x, y)) {
        this.selectedObject = index;
        return false;
      }
    }

    return false;
  }

  acceptMouseDownEvent(x, y) {
    this.mouseDownMove = false;

    if (this.selectedObject === -1) {
      let curr = this.toolObjects[this.getToolObjectCount() - 1];
      if (curr !== null && curr !== undefined && curr.getState() !== _ctools__WEBPACK_IMPORTED_MODULE_2__["CToolObject"].state.AfterDraw) return curr.acceptMouseDownEvent(x, y);
    } else {
      let sel = this.toolObjects[this.selectedObject];
      if (sel.getState() !== _ctools__WEBPACK_IMPORTED_MODULE_2__["CToolObject"].state.BeforeDraw) return sel.acceptMouseDownEvent(x, y);
    }

    return false;
  }

  acceptMouseDownMoveEvent(x, y) {
    this.mouseDownMove = true;

    if (this.selectedObject === -1) {
      let curr = this.toolObjects[this.getToolObjectCount() - 1];
      if (curr !== null && curr !== undefined && curr.getState() === _ctools__WEBPACK_IMPORTED_MODULE_2__["CToolObject"].state.Draw) return curr.acceptMouseDownMoveEvent(x, y);
      return false;
    } else {
      let sel = this.toolObjects[this.selectedObject];

      if (sel.getState() !== _ctools__WEBPACK_IMPORTED_MODULE_2__["CToolObject"].state.BeforeDraw) {
        if (sel.acceptMouseDownMoveEvent(x, y) === true) {
          let point = this.toolObjects[this.selectedObject].points;

          for (let i = 0; i < point.length; i++) {
            if (point[i].state === _cpoint__WEBPACK_IMPORTED_MODULE_1__["CPoint"].state.Highlight || point[i].state === _cpoint__WEBPACK_IMPORTED_MODULE_1__["CPoint"].state.Show) {
              return true;
            }
          }
        }

        return true;
      }
    }
  }

  acceptMouseUpEvent(x, y) {
    if (this.mouseDownMove === true) {
      if (this.selectedObject === -1) {
        let curr = this.toolObjects[this.getToolObjectCount() - 1];
        if (curr !== null && curr !== undefined && curr.getState() === _ctools__WEBPACK_IMPORTED_MODULE_2__["CToolObject"].state.Draw) return curr.acceptMouseUpEvent(x, y);
        return true;
      } else {
        let sel = this.toolObjects[this.selectedObject];
        if (sel.getState() !== _ctools__WEBPACK_IMPORTED_MODULE_2__["CToolObject"].state.BeforeDraw) return sel.acceptMouseUpEvent(x, y);
      }
    }

    if (this.selectedObject !== -1) {
      return true;
    }

    let curr = this.toolObjects[this.getToolObjectCount() - 1];

    if (curr !== null && curr !== undefined) {
      if (curr.getState() === _ctools__WEBPACK_IMPORTED_MODULE_2__["CToolObject"].state.Draw) return true;

      if (!curr.isValidMouseXY(x, y)) {
        return false;
      }

      if (curr.isSelected(x, y)) {
        return true;
      }
    }

    return false;
  }

}

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timeline", function() { return Timeline; });
/* harmony import */ var _named_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _chart_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(142);
/* harmony import */ var _data_sources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(152);



class Timeline extends _named_object__WEBPACK_IMPORTED_MODULE_0__["NamedObject"] {
  constructor(name) {
    super(name);
    this._updated = false;
    this._innerLeft = 0;
    this._innerWidth = 0;
    this._firstColumnLeft = 0;
    this._scale = 3;
    this._lastScale = -1;
    this._maxItemCount = 0;
    this._maxIndex = 0;
    this._firstIndex = -1;
    this._selectedIndex = -1;
    this._savedFirstIndex = -1;
  }

  isLatestShown() {
    return this.getLastIndex() === this._maxIndex;
  }

  isUpdated() {
    return this._updated;
  }

  setUpdated(v) {
    this._updated = v;
  }

  getItemWidth() {
    return Timeline.itemWidth[this._scale];
  }

  getSpaceWidth() {
    return Timeline.spaceWidth[this._scale];
  }

  getColumnWidth() {
    return this.getSpaceWidth() + this.getItemWidth();
  }

  getInnerWidth() {
    return this._innerWidth;
  }

  getItemLeftOffset() {
    return this.getSpaceWidth();
  }

  getItemCenterOffset() {
    return this.getSpaceWidth() + (this.getItemWidth() >> 1);
  }

  getFirstColumnLeft() {
    return this._firstColumnLeft;
  }

  getMaxItemCount() {
    return this._maxItemCount;
  }

  getFirstIndex() {
    return this._firstIndex;
  }

  getLastIndex() {
    return Math.min(this._firstIndex + this._maxItemCount, this._maxIndex);
  }

  getSelectedIndex() {
    return this._selectedIndex;
  }

  getMaxIndex() {
    return this._maxIndex;
  }

  calcColumnCount(w) {
    return Math.floor(w / this.getColumnWidth()) << 0;
  }

  calcFirstColumnLeft(maxItemCount) {
    return this._innerLeft + this._innerWidth - this.getColumnWidth() * maxItemCount;
  }

  calcFirstIndexAlignRight(oldFirstIndex, oldMaxItemCount, newMaxItemCount) {
    return Math.max(0, oldFirstIndex + Math.max(oldMaxItemCount, 1) - Math.max(newMaxItemCount, 1));
  }

  calcFirstIndex(newMaxItemCount) {
    return this.validateFirstIndex(this.calcFirstIndexAlignRight(this._firstIndex, this._maxItemCount, newMaxItemCount), newMaxItemCount);
  }

  updateMaxItemCount() {
    let newMaxItemCount = this.calcColumnCount(this._innerWidth);
    let newFirstIndex;

    if (this._maxItemCount < 1) {
      newFirstIndex = this.calcFirstIndex(newMaxItemCount);
    } else if (this._lastScale === this._scale) {
      newFirstIndex = this.validateFirstIndex(this._firstIndex - (newMaxItemCount - this._maxItemCount));
    } else {
      let focusedIndex = this._selectedIndex >= 0 ? this._selectedIndex : this.getLastIndex() - 1;
      newFirstIndex = this.validateFirstIndex(focusedIndex - Math.round((focusedIndex - this._firstIndex) * newMaxItemCount / this._maxItemCount));
    }

    this._lastScale = this._scale;

    if (this._firstIndex !== newFirstIndex) {
      if (this._selectedIndex === this._firstIndex) this._selectedIndex = newFirstIndex;
      this._firstIndex = newFirstIndex;
      this._updated = true;
    }

    if (this._maxItemCount !== newMaxItemCount) {
      this._maxItemCount = newMaxItemCount;
      this._updated = true;
    }

    this._firstColumnLeft = this.calcFirstColumnLeft(newMaxItemCount);
  }

  validateFirstIndex(firstIndex, maxItemCount) {
    if (this._maxIndex < 1) {
      return -1;
    }

    if (firstIndex < 0) {
      return 0;
    }

    let lastFirst = Math.max(0, this._maxIndex - 1
    /*maxItemCount*/
    );

    if (firstIndex > lastFirst) {
      return lastFirst;
    }

    return firstIndex;
  }

  validateSelectedIndex() {
    if (this._selectedIndex < this._firstIndex) this._selectedIndex = -1;else if (this._selectedIndex >= this.getLastIndex()) this._selectedIndex = -1;
  }

  onLayout() {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    let area = mgr.getArea(this.getDataSourceName() + ".main");

    if (area !== null) {
      this._innerLeft = area.getLeft() + Timeline.PADDING_LEFT;
      let w = Math.max(0, area.getWidth() - (Timeline.PADDING_LEFT + Timeline.PADDING_RIGHT));

      if (this._innerWidth !== w) {
        this._innerWidth = w;
        this.updateMaxItemCount();
      }
    }
  }

  toIndex(x) {
    return this._firstIndex + this.calcColumnCount(x - this._firstColumnLeft);
  }

  toColumnLeft(index) {
    return this._firstColumnLeft + this.getColumnWidth() * (index - this._firstIndex);
  }

  toItemLeft(index) {
    return this.toColumnLeft(index) + this.getItemLeftOffset();
  }

  toItemCenter(index) {
    return this.toColumnLeft(index) + this.getItemCenterOffset();
  }

  selectAt(x) {
    this._selectedIndex = this.toIndex(x);
    this.validateSelectedIndex();
    return this._selectedIndex >= 0;
  }

  unselect() {
    this._selectedIndex = -1;
  }

  update() {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    let ds = mgr.getDataSource(this.getDataSourceName());
    let oldMaxIndex = this._maxIndex;
    this._maxIndex = ds.getDataCount();

    switch (ds.getUpdateMode()) {
      case _data_sources__WEBPACK_IMPORTED_MODULE_2__["DataSource"].UpdateMode.Refresh:
        if (this._maxIndex < 1) this._firstIndex = -1;else this._firstIndex = Math.max(this._maxIndex - this._maxItemCount, 0);
        this._selectedIndex = -1;
        this._updated = true;
        break;

      case _data_sources__WEBPACK_IMPORTED_MODULE_2__["DataSource"].UpdateMode.Append:
        let lastIndex = this.getLastIndex();
        let erasedCount = ds.getErasedCount();

        if (lastIndex < oldMaxIndex) {
          if (erasedCount > 0) {
            this._firstIndex = Math.max(this._firstIndex - erasedCount, 0);

            if (this._selectedIndex >= 0) {
              this._selectedIndex -= erasedCount;
              this.validateSelectedIndex();
            }

            this._updated = true;
          }
        } else if (lastIndex === oldMaxIndex) {
          this._firstIndex += this._maxIndex - oldMaxIndex;

          if (this._selectedIndex >= 0) {
            this._selectedIndex -= erasedCount;
            this.validateSelectedIndex();
          }

          this._updated = true;
        }

        break;
    }
  }

  move(x) {
    if (this.isLatestShown()) {
      _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.getArea(this.getDataSourceName() + ".mainRange").setChanged(true);
    }

    this._firstIndex = this.validateFirstIndex(this._savedFirstIndex - this.calcColumnCount(x), this._maxItemCount);
    this._updated = true;
    if (this._selectedIndex >= 0) this.validateSelectedIndex();
  }

  startMove() {
    this._savedFirstIndex = this._firstIndex;
  }

  scale(s) {
    this._scale += s;

    if (this._scale < 0) {
      this._scale = 0;
    } else if (this._scale >= Timeline.itemWidth.length) {
      this._scale = Timeline.itemWidth.length - 1;
    }

    this.updateMaxItemCount();

    if (this._selectedIndex >= 0) {
      this.validateSelectedIndex();
    }
  }

}
Timeline.itemWidth = [1, 3, 3, 5, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29];
Timeline.spaceWidth = [1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 7, 7, 7];
Timeline.PADDING_LEFT = 4;
Timeline.PADDING_RIGHT = 8;

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableLayout", function() { return TableLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DockableLayout", function() { return DockableLayout; });
/* harmony import */ var _areas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(204);
/* harmony import */ var _chart_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(142);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(187);
/* harmony import */ var _chart_settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(186);
/* harmony import */ var _kline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(157);





class TableLayout extends _areas__WEBPACK_IMPORTED_MODULE_0__["ChartAreaGroup"] {
  constructor(name) {
    super(name);
    this._nextRowId = 0;
    this._focusedRowIndex = -1;
  }

  getNextRowId() {
    return this._nextRowId++;
  }

  measure(context, width, height) {
    this.setMeasuredDimension(width, height);
    let rowH,
        prevH = 0,
        totalH = 0;
    let h, rows;
    let rh = [];
    let i,
        cnt = this._areas.length;

    for (i = 0; i < cnt; i += 2) {
      rowH = this._areas[i].getHeight();

      if (rowH === 0) {
        if (i === 0) {
          rows = cnt + 1 >> 1;
          let n = rows * 2 + 5;
          let nh = height / n * 2 << 0;
          h = height;

          for (i = rows - 1; i > 0; i--) {
            rh.unshift(nh);
            h -= nh;
          }

          rh.unshift(h);
          break;
        } else if (i === 2) {
          rowH = prevH / 3;
        } else {
          rowH = prevH;
        }
      }

      totalH += rowH;
      prevH = rowH;
      rh.push(rowH);
    }

    if (totalH > 0) {
      let rate = height / totalH;
      rows = cnt + 1 >> 1;
      h = height;

      for (i = rows - 1; i > 0; i--) {
        rh[i] *= rate;
        h -= rh[i];
      }

      rh[0] = h;
    }

    let nw = 8; // chart depths sidebar (深度图侧边栏宽度)

    let tmp = _chart_settings__WEBPACK_IMPORTED_MODULE_3__["ChartSettings"].get();
    let minRW = tmp.charts.depthStatus === "open" ? _kline__WEBPACK_IMPORTED_MODULE_4__["default"].instance.depthWidth : 50;
    let maxRW = Math.min(240, width >> 1);
    let rw = minRW;
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    let timeline = mgr.getTimeline(this.getDataSourceName());

    if (timeline.getFirstIndex() >= 0) {
      let firstIndexes = [];

      for (rw = minRW; rw < maxRW; rw += nw) {
        firstIndexes.push(timeline.calcFirstIndex(timeline.calcColumnCount(width - rw)));
      }

      let lastIndex = timeline.getLastIndex();
      let dpNames = [".main", ".secondary"];
      let minmaxes = new Array(firstIndexes.length);
      let iArea, iIndex;

      for (iArea = 0, iIndex = 0, rw = minRW; iArea < this._areas.length && iIndex < firstIndexes.length; iArea += 2) {
        let area = this._areas[iArea];
        let plotter = mgr.getPlotter(area.getName() + "Range.main");

        for (let iDp in dpNames) {
          let dp = mgr.getDataProvider(area.getName() + dpNames[iDp]);

          if (dp === undefined) {
            continue;
          }

          dp.calcRange(firstIndexes, lastIndex, minmaxes, null);

          while (iIndex < firstIndexes.length) {
            let minW = plotter.getRequiredWidth(context, minmaxes[iIndex].min);
            let maxW = plotter.getRequiredWidth(context, minmaxes[iIndex].max);

            if (Math.max(minW, maxW) < rw) {
              break;
            }

            iIndex++;
            rw += nw;
          }
        }
      }
    }

    for (i = 1; i < this._areas.length; i += 2) {
      this._areas[i].measure(context, rw, rh[i >> 1]);
    }

    let lw = width - rw;

    for (i = 0; i < this._areas.length; i += 2) {
      this._areas[i].measure(context, lw, rh[i >> 1]);
    }
  }

  layout(left, top, right, bottom, forceChange) {
    super.layout(left, top, right, bottom, forceChange);
    if (this._areas.length < 1) return;
    let area;

    let center = left + this._areas[0].getMeasuredWidth();

    let t = top,
        b;
    if (!forceChange) forceChange = this.isChanged();
    let i,
        cnt = this._areas.length;

    for (i = 0; i < cnt; i++) {
      area = this._areas[i];
      b = t + area.getMeasuredHeight();
      area.layout(left, t, center, b, forceChange);
      i++;
      area = this._areas[i];
      area.layout(center, t, this.getRight(), b, forceChange);
      t = b;
    }

    this.setChanged(false);
  }

  drawGrid(context) {
    if (this._areas.length < 1) {
      return;
    }

    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    let theme = mgr.getTheme(this.getFrameName());
    context.fillStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_2__["Theme"].Color.Grid1);
    context.fillRect(this._areas[0].getRight(), this.getTop(), 1, this.getHeight());
    let i,
        cnt = this._areas.length - 2;

    for (i = 0; i < cnt; i += 2) context.fillRect(this.getLeft(), this._areas[i].getBottom(), this.getWidth(), 1);

    if (!mgr.getCaptureMouseWheelDirectly()) {
      for (i = 0, cnt += 2; i < cnt; i += 2) {
        if (this._areas[i].isSelected()) {
          context.strokeStyle = theme.getColor(_themes__WEBPACK_IMPORTED_MODULE_2__["Theme"].Color.Indicator1);
          context.strokeRect(this.getLeft() + 0.5, this.getTop() + 0.5, this.getWidth() - 1, this.getHeight() - 1);
          break;
        }
      }
    }
  }

  highlight(area) {
    this._highlightedArea = null;
    let e,
        i,
        cnt = this._areas.length;

    for (i = 0; i < cnt; i++) {
      e = this._areas[i];

      if (e === area) {
        i &= ~1;
        e = this._areas[i];
        e.highlight(e);
        this._highlightedArea = e;
        i++;
        e = this._areas[i];
        e.highlight(null);
        e.highlight(e);
      } else {
        e.highlight(null);
      }
    }

    return this._highlightedArea !== null ? this : null;
  }

  select(area) {
    this._selectedArea = null;
    let e,
        i,
        cnt = this._areas.length;

    for (i = 0; i < cnt; i++) {
      e = this._areas[i];

      if (e === area) {
        i &= ~1;
        e = this._areas[i];
        e.select(e);
        this._selectedArea = e;
        i++;
        e = this._areas[i];
        e.select(e);
      } else {
        e.select(null);
      }
    }

    return this._selectedArea !== null ? this : null;
  }

  onMouseMove(x, y) {
    if (this._focusedRowIndex >= 0) {
      let upper = this._areas[this._focusedRowIndex];
      let lower = this._areas[this._focusedRowIndex + 2];
      let d = y - this._oldY;
      if (d === 0) return this;
      let upperBottom = this._oldUpperBottom + d;
      let lowerTop = this._oldLowerTop + d;

      if (upperBottom - upper.getTop() >= 60 && lower.getBottom() - lowerTop >= 60) {
        upper.setBottom(upperBottom);
        lower.setTop(lowerTop);
      }

      return this;
    }

    let i,
        cnt = this._areas.length - 2;

    for (i = 0; i < cnt; i += 2) {
      let b = this._areas[i].getBottom();

      if (y >= b - 4 && y < b + 4) {
        _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance.showCursor('n-resize');
        return this;
      }
    }

    return null;
  }

  onMouseLeave(x, y) {
    this._focusedRowIndex = -1;
  }

  onMouseDown(x, y) {
    let i,
        cnt = this._areas.length - 2;

    for (i = 0; i < cnt; i += 2) {
      let b = this._areas[i].getBottom();

      if (y >= b - 4 && y < b + 4) {
        this._focusedRowIndex = i;
        this._oldY = y;
        this._oldUpperBottom = b;
        this._oldLowerTop = this._areas[i + 2].getTop();
        return this;
      }
    }

    return null;
  }

  onMouseUp(x, y) {
    if (this._focusedRowIndex >= 0) {
      this._focusedRowIndex = -1;
      let i,
          cnt = this._areas.length;
      let height = [];

      for (i = 0; i < cnt; i += 2) {
        height.push(this._areas[i].getHeight());
      }

      _chart_settings__WEBPACK_IMPORTED_MODULE_3__["ChartSettings"].get().charts.areaHeight = height;
      _chart_settings__WEBPACK_IMPORTED_MODULE_3__["ChartSettings"].save();
    }

    return this;
  }

}
class DockableLayout extends _areas__WEBPACK_IMPORTED_MODULE_0__["ChartAreaGroup"] {
  constructor(name) {
    super(name);
  }

  measure(context, width, height) {
    super.measure(context, width, height);
    width = this.getMeasuredWidth();
    height = this.getMeasuredHeight();

    for (let i in this._areas) {
      let area = this._areas[i];
      area.measure(context, width, height);

      switch (area.getDockStyle()) {
        case _areas__WEBPACK_IMPORTED_MODULE_0__["ChartArea"].DockStyle.left:
        case _areas__WEBPACK_IMPORTED_MODULE_0__["ChartArea"].DockStyle.Right:
          width -= area.getMeasuredWidth();
          break;

        case _areas__WEBPACK_IMPORTED_MODULE_0__["ChartArea"].DockStyle.Top:
        case _areas__WEBPACK_IMPORTED_MODULE_0__["ChartArea"].DockStyle.Bottom:
          height -= area.getMeasuredHeight();
          break;

        case _areas__WEBPACK_IMPORTED_MODULE_0__["ChartArea"].DockStyle.Fill:
          width = 0;
          height = 0;
          break;
      }
    }
  }

  layout(left, top, right, bottom, forceChange) {
    super.layout(left, top, right, bottom, forceChange);
    left = this.getLeft();
    top = this.getTop();
    right = this.getRight();
    bottom = this.getBottom();
    let w, h;

    if (!forceChange) {
      forceChange = this.isChanged();
    }

    for (let i in this._areas) {
      let area = this._areas[i];

      switch (area.getDockStyle()) {
        case _areas__WEBPACK_IMPORTED_MODULE_0__["ChartArea"].DockStyle.left:
          w = area.getMeasuredWidth();
          area.layout(left, top, left + w, bottom, forceChange);
          left += w;
          break;

        case _areas__WEBPACK_IMPORTED_MODULE_0__["ChartArea"].DockStyle.Top:
          h = area.getMeasuredHeight();
          area.layout(left, top, right, top + h, forceChange);
          top += h;
          break;

        case _areas__WEBPACK_IMPORTED_MODULE_0__["ChartArea"].DockStyle.Right:
          w = area.getMeasuredWidth();
          area.layout(right - w, top, right, bottom, forceChange);
          right -= w;
          break;

        case _areas__WEBPACK_IMPORTED_MODULE_0__["ChartArea"].DockStyle.Bottom:
          h = area.getMeasuredHeight();
          area.layout(left, bottom - h, right, bottom, forceChange);
          bottom -= h;
          break;

        case _areas__WEBPACK_IMPORTED_MODULE_0__["ChartArea"].DockStyle.Fill:
          area.layout(left, top, right, bottom, forceChange);
          left = right;
          top = bottom;
          break;
      }
    }

    this.setChanged(false);
  }

  drawGrid(context) {
    let mgr = _chart_manager__WEBPACK_IMPORTED_MODULE_1__["ChartManager"].instance;
    let theme = mgr.getTheme(this.getFrameName());
    let left = this.getLeft();
    let top = this.getTop();
    let right = this.getRight();
    let bottom = this.getBottom();
    context.fillStyle = theme.getColor(this._gridColor);

    for (let i in this._areas) {
      let area = this._areas[i];

      switch (area.getDockStyle()) {
        case _areas__WEBPACK_IMPORTED_MODULE_0__["ChartArea"].DockStyle.Left:
          context.fillRect(area.getRight(), top, 1, bottom - top);
          left += area.getWidth();
          break;

        case _areas__WEBPACK_IMPORTED_MODULE_0__["ChartArea"].DockStyle.Top:
          context.fillRect(left, area.getBottom(), right - left, 1);
          top += area.getHeight();
          break;

        case _areas__WEBPACK_IMPORTED_MODULE_0__["ChartArea"].DockStyle.Right:
          context.fillRect(area.getLeft(), top, 1, bottom - top);
          right -= area.getWidth();
          break;

        case _areas__WEBPACK_IMPORTED_MODULE_0__["ChartArea"].DockStyle.Bottom:
          context.fillRect(left, area.getTop(), right - left, 1);
          bottom -= area.getHeight();
          break;
      }
    }
  }

}

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chart", function() { return Chart; });
/* harmony import */ var _chart_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(142);
/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(205);
/* harmony import */ var _kline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(157);
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(206);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(137);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_4__);





class Chart {
  constructor() {
    this._data = null;
    this._charStyle = "CandleStick";
    this._depthData = {
      array: null,
      asks_count: 0,
      bids_count: 0,
      asks_si: 0,
      asks_ei: 0,
      bids_si: 0,
      bids_ei: 0
    };
    this.strIsLine = false;
    this._range = _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.range;
    this._symbol = _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.symbol;
  }

  setTitle() {
    let lang = _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.getLanguage();
    let title = _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.symbolName;
    title += ' ';
    title += this.strIsLine ? Chart.strPeriod[lang]['line'] : Chart.strPeriod[lang][this._range];
    title += (this._contract_unit + '/' + this._money_type).toUpperCase();
    _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.setTitle('frame0.k0', title);
  }

  setSymbol(symbol) {
    this._symbol = symbol;
    this.updateDataAndDisplay();
  }

  updateDataAndDisplay(newData) {
    _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.symbol = this._symbol;
    _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.range = this._range;
    /**
     * 46-50 lines is QQ "挺好!" add
    */

    if (newData !== undefined) {
      _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.setCurrentDataSource('frame0.k0', this._symbol + '.' + this._range, newData);
    } else {
      _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.setCurrentDataSource('frame0.k0', this._symbol + '.' + this._range);
    } //ChartManager.instance.setCurrentDataSource('frame0.k0', this._symbol + '.' + this._range);


    _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.setNormalMode();
    let f = _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.chartMgr.getDataSource("frame0.k0").getLastDate();

    if (f === -1) {
      _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.requestParam = _control__WEBPACK_IMPORTED_MODULE_1__["Control"].setHttpRequestParam(_kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.symbol, _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.range, _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.limit, null);
      _control__WEBPACK_IMPORTED_MODULE_1__["Control"].requestData(true);
    } else {
      _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.requestParam = _control__WEBPACK_IMPORTED_MODULE_1__["Control"].setHttpRequestParam(_kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.symbol, _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.range, null, f.toString());
      _control__WEBPACK_IMPORTED_MODULE_1__["Control"].requestData();
    }

    _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.redraw('All', false);
  }

  setCurrentContractUnit(contractUnit) {
    this._contract_unit = contractUnit;
    this.updateDataAndDisplay();
  }

  setCurrentMoneyType(moneyType) {
    this._money_type = moneyType;
    this.updateDataAndDisplay();
  }

  setCurrentPeriod(period) {
    this._range = _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.periodMap[period];

    if (_kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.type === "stomp" && _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.stompClient.ws.readyState === 1) {
      _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.subscribed.unsubscribe();
      _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.subscribed = _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.stompClient.subscribe(_kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.subscribePath + '/' + _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.symbol + '/' + this._range, _control__WEBPACK_IMPORTED_MODULE_1__["Control"].subscribeCallback);
    }

    this.updateDataAndDisplay();
    _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.onRangeChangeFunc(this._range);
  }

  updateDataSource(data) {
    this._data = data;
    _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.updateData("frame0.k0", this._data);
  }

  updateDepth(array) {
    if (array == null) {
      this._depthData.array = [];
      _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.redraw('All', false);
      return;
    }

    if (!array.asks || !array.bids || array.asks === '' || array.bids === '') return;
    let _data = this._depthData;
    _data.array = [];

    for (let i = 0; i < array.asks.length; i++) {
      let data = {};
      data.rate = array.asks[i][0];
      data.amount = array.asks[i][1];

      _data.array.push(data);
    }

    for (let i = 0; i < array.bids.length; i++) {
      let data = {};
      data.rate = array.bids[i][0];
      data.amount = array.bids[i][1];

      _data.array.push(data);
    }

    _data.asks_count = array.asks.length;
    _data.bids_count = array.bids.length;
    _data.asks_si = _data.asks_count - 1;
    _data.asks_ei = 0;
    _data.bids_si = _data.asks_count - 1;
    _data.bids_ei = _data.asks_count + _data.bids_count - 2;

    for (let i = _data.asks_si; i >= _data.asks_ei; i--) {
      if (i === _data.asks_si && _data.array[i] !== undefined) {
        _data.array[i].amounts = _data.array[i].amount;
      } else if (_data.array[i + 1] !== undefined) {
        _data.array[i].amounts = _data.array[i + 1].amounts + _data.array[i].amount;
      }
    }

    for (let i = _data.bids_si; i <= _data.bids_ei; i++) {
      if (i === _data.bids_si && _data.array[i] !== undefined) {
        _data.array[i].amounts = _data.array[i].amount;
      } else if (_data.array[i - 1] !== undefined) {
        _data.array[i].amounts = _data.array[i - 1].amounts + _data.array[i].amount;
      }
    }

    _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.redraw('All', false);
  }

  setMainIndicator(indicName) {
    this._mainIndicator = indicName;

    if (indicName === 'NONE') {
      _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.removeMainIndicator('frame0.k0');
    } else {
      _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.setMainIndicator('frame0.k0', indicName);
    }

    _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.redraw('All', true);
  }

  setIndicator(index, indicName) {
    let count = _kline__WEBPACK_IMPORTED_MODULE_2__["default"].instance.count;

    if (indicName === 'NONE') {
      /*
      let index = 2;
      if (Template.displayVolume === false)
          index = 1;
      */
      let index = 1;
      let areaName = _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.getIndicatorAreaName('frame0.k0', index);
      if (areaName !== '') _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.removeIndicator(areaName);
    } else {
      /*
      let index = 2;
      if (Template.displayVolume === false)
          index = 1;
      */
      let index = count || 2;
      let areaName = _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.getIndicatorAreaName('frame0.k0', index);

      if (areaName === '') {
        _templates__WEBPACK_IMPORTED_MODULE_3__["Template"].createIndicatorChartComps('frame0.k0', indicName);
      } else {
        _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.setIndicator(areaName, indicName);
      }
    }

    _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.redraw('All', true);
  }

  addIndicator(indicName) {
    _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.addIndicator(indicName);
    _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.redraw('All', true);
  }

  removeIndicator(indicName) {
    let areaName = _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.getIndicatorAreaName(2);
    _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.removeIndicator(areaName);
    _chart_manager__WEBPACK_IMPORTED_MODULE_0__["ChartManager"].instance.redraw('All', true);
  }

}
Chart.strPeriod = {
  'zh-cn': {
    'line': '(分时)',
    '1min': '(1分钟)',
    '5min': '(5分钟)',
    '15min': '(15分钟)',
    '30min': '(30分钟)',
    '1hour': '(1小时)',
    '1day': '(日线)',
    '1week': '(周线)',
    '3min': '(3分钟)',
    '2hour': '(2小时)',
    '4hour': '(4小时)',
    '6hour': '(6小时)',
    '12hour': '(12小时)',
    '3day': '(3天)'
  },
  'en-us': {
    'line': '(Line)',
    '1min': '(1m)',
    '5min': '(5m)',
    '15min': '(15m)',
    '30min': '(30m)',
    '1hour': '(1h)',
    '1day': '(1d)',
    '1week': '(1w)',
    '3min': '(3m)',
    '2hour': '(2h)',
    '4hour': '(4h)',
    '6hour': '(6h)',
    '12hour': '(12h)',
    '3day': '(3d)'
  },
  'zh-tw': {
    'line': '(分時)',
    '1min': '(1分鐘)',
    '5min': '(5分鐘)',
    '15min': '(15分鐘)',
    '30min': '(30分鐘)',
    '1hour': '(1小時)',
    '1day': '(日線)',
    '1week': '(周線)',
    '3min': '(3分鐘)',
    '2hour': '(2小時)',
    '4hour': '(4小時)',
    '6hour': '(6小時)',
    '12hour': '(12小時)',
    '3day': '(3天)'
  }
};

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Indicator", function() { return Indicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HLCIndicator", function() { return HLCIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAIndicator", function() { return MAIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMAIndicator", function() { return EMAIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOLUMEIndicator", function() { return VOLUMEIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MACDIndicator", function() { return MACDIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DMIIndicator", function() { return DMIIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DMAIndicator", function() { return DMAIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRIXIndicator", function() { return TRIXIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BRARIndicator", function() { return BRARIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VRIndicator", function() { return VRIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OBVIndicator", function() { return OBVIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMVIndicator", function() { return EMVIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RSIIndicator", function() { return RSIIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WRIndicator", function() { return WRIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SARIndicator", function() { return SARIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KDJIndicator", function() { return KDJIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROCIndicator", function() { return ROCIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MTMIndicator", function() { return MTMIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BOLLIndicator", function() { return BOLLIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PSYIndicator", function() { return PSYIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STOCHRSIIndicator", function() { return STOCHRSIIndicator; });
/* harmony import */ var _exprs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(210);
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(187);


class Indicator {
  constructor() {
    this._exprEnv = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ExprEnv"]();
    this._rid = 0;
    this._params = [];
    this._assigns = [];
    this._outputs = [];
  }

  addParameter(expr) {
    this._params.push(expr);
  }

  addAssign(expr) {
    this._assigns.push(expr);
  }

  addOutput(expr) {
    this._outputs.push(expr);
  }

  getParameterCount() {
    return this._params.length;
  }

  getParameterAt(index) {
    return this._params[index];
  }

  getOutputCount() {
    return this._outputs.length;
  }

  getOutputAt(index) {
    return this._outputs[index];
  }

  clear() {
    this._exprEnv.setFirstIndex(-1);

    let i, cnt;
    cnt = this._assigns.length;

    for (i = 0; i < cnt; i++) {
      this._assigns[i].clear();
    }

    cnt = this._outputs.length;

    for (i = 0; i < cnt; i++) {
      this._outputs[i].clear();
    }
  }

  reserve(count) {
    this._rid++;
    let i, cnt;
    cnt = this._assigns.length;

    for (i = 0; i < cnt; i++) {
      this._assigns[i].reserve(this._rid, count);
    }

    cnt = this._outputs.length;

    for (i = 0; i < cnt; i++) {
      this._outputs[i].reserve(this._rid, count);
    }
  }

  execute(ds, index) {
    if (index < 0) {
      return;
    }

    this._exprEnv.setDataSource(ds);

    _exprs__WEBPACK_IMPORTED_MODULE_0__["ExprEnv"].set(this._exprEnv);

    try {
      let i, cnt;
      cnt = this._assigns.length;

      for (i = 0; i < cnt; i++) {
        this._assigns[i].assign(index);
      }

      cnt = this._outputs.length;

      for (i = 0; i < cnt; i++) {
        this._outputs[i].assign(index);
      }

      if (this._exprEnv.getFirstIndex() < 0) {
        this._exprEnv.setFirstIndex(index);
      }
    } catch (e) {
      if (this._exprEnv.getFirstIndex() >= 0) {
        alert(e);
        throw e;
      }
    }
  }

  getParameters() {
    let params = [];
    let i,
        cnt = this._params.length;

    for (i = 0; i < cnt; i++) params.push(this._params[i].getValue());

    return params;
  }

  setParameters(params) {
    if (params instanceof Array && params.length === this._params.length) {
      for (let i in this._params) this._params[i].setValue(params[i]);
    }
  }

}
class HLCIndicator extends Indicator {
  constructor() {
    super();
    let M1 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M1", 2, 1000, 60);
    this.addParameter(M1);
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("HIGH", new _exprs__WEBPACK_IMPORTED_MODULE_0__["HighExpr"](), _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"].outputStyle.None));
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("LOW", new _exprs__WEBPACK_IMPORTED_MODULE_0__["LowExpr"](), _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"].outputStyle.None));
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("CLOSE", new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"].outputStyle.Line, _themes__WEBPACK_IMPORTED_MODULE_1__["Theme"].Color.Indicator0));
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["RangeOutputExpr"]("MA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), M1), _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"].outputStyle.Line, _themes__WEBPACK_IMPORTED_MODULE_1__["Theme"].Color.Indicator1));
  }

  getName() {
    return "CLOSE";
  }

}
class MAIndicator extends Indicator {
  constructor() {
    super();
    let M1 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M1", 2, 1000, 7);
    let M2 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M2", 2, 1000, 30);
    let M3 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M3", 2, 1000, 0);
    let M4 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M4", 2, 1000, 0);
    let M5 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M5", 2, 1000, 0);
    let M6 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M6", 2, 1000, 0);
    this.addParameter(M1);
    this.addParameter(M2);
    this.addParameter(M3);
    this.addParameter(M4);
    this.addParameter(M5);
    this.addParameter(M6);
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["RangeOutputExpr"]("MA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), M1)));
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["RangeOutputExpr"]("MA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), M2)));
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["RangeOutputExpr"]("MA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), M3)));
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["RangeOutputExpr"]("MA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), M4)));
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["RangeOutputExpr"]("MA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), M5)));
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["RangeOutputExpr"]("MA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), M6)));
  }

  getName() {
    return "MA";
  }

}
class EMAIndicator extends Indicator {
  constructor() {
    super();
    let M1 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M1", 2, 1000, 7);
    let M2 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M2", 2, 1000, 30);
    let M3 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M3", 2, 1000, 0);
    let M4 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M4", 2, 1000, 0);
    let M5 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M5", 2, 1000, 0);
    let M6 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M6", 2, 1000, 0);
    this.addParameter(M1);
    this.addParameter(M2);
    this.addParameter(M3);
    this.addParameter(M4);
    this.addParameter(M5);
    this.addParameter(M6);
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["RangeOutputExpr"]("EMA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["EmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), M1)));
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["RangeOutputExpr"]("EMA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["EmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), M2)));
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["RangeOutputExpr"]("EMA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["EmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), M3)));
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["RangeOutputExpr"]("EMA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["EmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), M4)));
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["RangeOutputExpr"]("EMA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["EmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), M5)));
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["RangeOutputExpr"]("EMA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["EmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), M6)));
  }

  getName() {
    return "EMA";
  }

}
class VOLUMEIndicator extends Indicator {
  constructor() {
    super();
    let M1 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M1", 2, 500, 5);
    let M2 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M2", 2, 500, 10);
    this.addParameter(M1);
    this.addParameter(M2);
    let VOLUME = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("VOLUME", new _exprs__WEBPACK_IMPORTED_MODULE_0__["VolumeExpr"](), _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"].outputStyle.VolumeStick, _themes__WEBPACK_IMPORTED_MODULE_1__["Theme"].Color.Text4);
    this.addOutput(VOLUME);
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["RangeOutputExpr"]("MA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](VOLUME, M1), _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"].outputStyle.Line, _themes__WEBPACK_IMPORTED_MODULE_1__["Theme"].Color.Indicator0));
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["RangeOutputExpr"]("MA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](VOLUME, M2), _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"].outputStyle.Line, _themes__WEBPACK_IMPORTED_MODULE_1__["Theme"].Color.Indicator1));
  }

  getName() {
    return "VOLUME";
  }

}
class MACDIndicator extends Indicator {
  constructor() {
    super();
    let SHORT = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("SHORT", 2, 200, 12);
    let LONG = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("LONG", 2, 200, 26);
    let MID = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("MID", 2, 200, 9);
    this.addParameter(SHORT);
    this.addParameter(LONG);
    this.addParameter(MID);
    let DIF = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("DIF", new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["EmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), SHORT), new _exprs__WEBPACK_IMPORTED_MODULE_0__["EmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), LONG)));
    this.addOutput(DIF);
    let DEA = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("DEA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["EmaExpr"](DIF, MID));
    this.addOutput(DEA);
    let MACD = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("MACD", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](DIF, DEA), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](2)), _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"].outputStyle.MACDStick);
    this.addOutput(MACD);
  }

  getName() {
    return "MACD";
  }

}
class DMIIndicator extends Indicator {
  constructor() {
    super();
    let N = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N", 2, 90, 14);
    let MM = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("MM", 2, 60, 6);
    this.addParameter(N);
    this.addParameter(MM);
    let MTR = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("MTR", new _exprs__WEBPACK_IMPORTED_MODULE_0__["ExpmemaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaxExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaxExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["HighExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["LowExpr"]()), new _exprs__WEBPACK_IMPORTED_MODULE_0__["AbsExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["HighExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["RefExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1))))), new _exprs__WEBPACK_IMPORTED_MODULE_0__["AbsExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["RefExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["LowExpr"]()))), N));
    this.addAssign(MTR);
    let HD = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("HD", new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["HighExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["RefExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["HighExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1))));
    this.addAssign(HD);
    let LD = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("LD", new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["RefExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["LowExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["LowExpr"]()));
    this.addAssign(LD);
    let DMP = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("DMP", new _exprs__WEBPACK_IMPORTED_MODULE_0__["ExpmemaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["IfExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["AndExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["GtExpr"](HD, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](0)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["GtExpr"](HD, LD)), HD, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](0)), N));
    this.addAssign(DMP);
    let DMM = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("DMM", new _exprs__WEBPACK_IMPORTED_MODULE_0__["ExpmemaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["IfExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["AndExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["GtExpr"](LD, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](0)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["GtExpr"](LD, HD)), LD, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](0)), N));
    this.addAssign(DMM);
    let PDI = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("PDI", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](DMP, MTR), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100)));
    this.addOutput(PDI);
    let MDI = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("MDI", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](DMM, MTR), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100)));
    this.addOutput(MDI);
    let ADX = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("ADX", new _exprs__WEBPACK_IMPORTED_MODULE_0__["ExpmemaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["AbsExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](MDI, PDI)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["AddExpr"](MDI, PDI)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100)), MM));
    this.addOutput(ADX);
    let ADXR = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("ADXR", new _exprs__WEBPACK_IMPORTED_MODULE_0__["ExpmemaExpr"](ADX, MM));
    this.addOutput(ADXR);
  }

  getName() {
    return "DMI";
  }

}
class DMAIndicator extends Indicator {
  constructor() {
    super();
    let N1 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N1", 2, 60, 10);
    let N2 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N2", 2, 250, 50);
    let M = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M", 2, 100, 10);
    this.addParameter(N1);
    this.addParameter(N2);
    this.addParameter(M);
    let DIF = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("DIF", new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), N1), new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), N2)));
    this.addOutput(DIF);
    let DIFMA = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("DIFMA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](DIF, M));
    this.addOutput(DIFMA);
  }

  getName() {
    return "DMA";
  }

}
class TRIXIndicator extends Indicator {
  constructor() {
    super();
    let N = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N", 2, 100, 12);
    let M = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M", 2, 100, 9);
    this.addParameter(N);
    this.addParameter(M);
    let MTR = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("MTR", new _exprs__WEBPACK_IMPORTED_MODULE_0__["EmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["EmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["EmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), N), N), N));
    this.addAssign(MTR);
    let TRIX = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("TRIX", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](MTR, new _exprs__WEBPACK_IMPORTED_MODULE_0__["RefExpr"](MTR, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1))), new _exprs__WEBPACK_IMPORTED_MODULE_0__["RefExpr"](MTR, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1))), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100)));
    this.addOutput(TRIX);
    let MATRIX = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("MATRIX", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](TRIX, M));
    this.addOutput(MATRIX);
  }

  getName() {
    return "TRIX";
  }

}
class BRARIndicator extends Indicator {
  constructor() {
    super();
    let N = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N", 2, 120, 26);
    this.addParameter(N);
    let REF_CLOSE_1 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("REF_CLOSE_1", new _exprs__WEBPACK_IMPORTED_MODULE_0__["RefExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1)));
    this.addAssign(REF_CLOSE_1);
    let BR = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("BR", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SumExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaxExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](0), new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["HighExpr"](), REF_CLOSE_1)), N), new _exprs__WEBPACK_IMPORTED_MODULE_0__["SumExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaxExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](0), new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](REF_CLOSE_1, new _exprs__WEBPACK_IMPORTED_MODULE_0__["LowExpr"]())), N)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100)));
    this.addOutput(BR);
    let AR = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("AR", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SumExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["HighExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["OpenExpr"]()), N), new _exprs__WEBPACK_IMPORTED_MODULE_0__["SumExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["OpenExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["LowExpr"]()), N)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100)));
    this.addOutput(AR);
  }

  getName() {
    return "BRAR";
  }

}
class VRIndicator extends Indicator {
  constructor() {
    super();
    let N = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N", 2, 100, 26);
    let M = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M", 2, 100, 6);
    this.addParameter(N);
    this.addParameter(M);
    let REF_CLOSE_1 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("REF_CLOSE_1", new _exprs__WEBPACK_IMPORTED_MODULE_0__["RefExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1)));
    this.addAssign(REF_CLOSE_1);
    let TH = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("TH", new _exprs__WEBPACK_IMPORTED_MODULE_0__["SumExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["IfExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["GtExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), REF_CLOSE_1), new _exprs__WEBPACK_IMPORTED_MODULE_0__["VolumeExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](0)), N));
    this.addAssign(TH);
    let TL = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("TL", new _exprs__WEBPACK_IMPORTED_MODULE_0__["SumExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["IfExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["LtExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), REF_CLOSE_1), new _exprs__WEBPACK_IMPORTED_MODULE_0__["VolumeExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](0)), N));
    this.addAssign(TL);
    let TQ = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("TQ", new _exprs__WEBPACK_IMPORTED_MODULE_0__["SumExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["IfExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["EqExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), REF_CLOSE_1), new _exprs__WEBPACK_IMPORTED_MODULE_0__["VolumeExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](0)), N));
    this.addAssign(TQ);
    let VR = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("VR", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["AddExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](TH, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](2)), TQ), new _exprs__WEBPACK_IMPORTED_MODULE_0__["AddExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](TL, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](2)), TQ)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100)));
    this.addOutput(VR);
    let MAVR = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("MAVR", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](VR, M));
    this.addOutput(MAVR);
  }

  getName() {
    return "VR";
  }

}
class OBVIndicator extends Indicator {
  constructor() {
    super();
    let M = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M", 2, 100, 30);
    this.addParameter(M);
    let REF_CLOSE_1 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("REF_CLOSE_1", new _exprs__WEBPACK_IMPORTED_MODULE_0__["RefExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1)));
    this.addAssign(REF_CLOSE_1);
    let VA = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("VA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["IfExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["GtExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), REF_CLOSE_1), new _exprs__WEBPACK_IMPORTED_MODULE_0__["VolumeExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["NegExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["VolumeExpr"]())));
    this.addAssign(VA);
    let OBV = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("OBV", new _exprs__WEBPACK_IMPORTED_MODULE_0__["SumExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["IfExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["EqExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), REF_CLOSE_1), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](0), VA), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](0)));
    this.addOutput(OBV);
    let MAOBV = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("MAOBV", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](OBV, M));
    this.addOutput(MAOBV);
  }

  getName() {
    return "OBV";
  }

}
class EMVIndicator extends Indicator {
  constructor() {
    super();
    let N = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N", 2, 90, 14);
    let M = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M", 2, 60, 9);
    this.addParameter(N);
    this.addParameter(M);
    let VOLUME = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("VOLUME", new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["VolumeExpr"](), N), new _exprs__WEBPACK_IMPORTED_MODULE_0__["VolumeExpr"]()));
    this.addAssign(VOLUME);
    let MID = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("MID", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["AddExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["HighExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["LowExpr"]()), new _exprs__WEBPACK_IMPORTED_MODULE_0__["RefExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["AddExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["HighExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["LowExpr"]()), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1))), new _exprs__WEBPACK_IMPORTED_MODULE_0__["AddExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["HighExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["LowExpr"]())), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100)));
    this.addAssign(MID);
    let EMV = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("EMV", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](MID, new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](VOLUME, new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["HighExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["LowExpr"]()))), new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["HighExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["LowExpr"]()), N)), N));
    this.addOutput(EMV);
    let MAEMV = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("MAEMV", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](EMV, M));
    this.addOutput(MAEMV);
  }

  getName() {
    return "EMV";
  }

}
class RSIIndicator extends Indicator {
  constructor() {
    super();
    let N1 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N1", 2, 120, 6);
    let N2 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N2", 2, 250, 12);
    let N3 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N3", 2, 500, 24);
    this.addParameter(N1);
    this.addParameter(N2);
    this.addParameter(N3);
    let LC = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("LC", new _exprs__WEBPACK_IMPORTED_MODULE_0__["RefExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1)));
    this.addAssign(LC);
    let CLOSE_LC = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("CLOSE_LC", new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), LC));
    this.addAssign(CLOSE_LC);
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("RSI1", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaxExpr"](CLOSE_LC, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](0)), N1, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["SmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["AbsExpr"](CLOSE_LC), N1, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1))), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100))));
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("RSI2", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaxExpr"](CLOSE_LC, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](0)), N2, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["SmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["AbsExpr"](CLOSE_LC), N2, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1))), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100))));
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("RSI3", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaxExpr"](CLOSE_LC, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](0)), N3, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["SmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["AbsExpr"](CLOSE_LC), N3, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1))), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100))));
  }

  getName() {
    return "RSI";
  }

}
class WRIndicator extends Indicator {
  constructor() {
    super();
    let N = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N", 2, 100, 10);
    let N1 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N1", 2, 100, 6);
    this.addParameter(N);
    this.addParameter(N1);
    let HHV = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("HHV", new _exprs__WEBPACK_IMPORTED_MODULE_0__["HhvExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["HighExpr"](), N));
    this.addAssign(HHV);
    let HHV1 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("HHV1", new _exprs__WEBPACK_IMPORTED_MODULE_0__["HhvExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["HighExpr"](), N1));
    this.addAssign(HHV1);
    let LLV = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("LLV", new _exprs__WEBPACK_IMPORTED_MODULE_0__["LlvExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["LowExpr"](), N));
    this.addAssign(LLV);
    let LLV1 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("LLV1", new _exprs__WEBPACK_IMPORTED_MODULE_0__["LlvExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["LowExpr"](), N1));
    this.addAssign(LLV1);
    let WR1 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("WR1", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](HHV, new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"]()), new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](HHV, LLV)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100)));
    this.addOutput(WR1);
    let WR2 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("WR2", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](HHV1, new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"]()), new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](HHV1, LLV1)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100)));
    this.addOutput(WR2);
  }

  getName() {
    return "WR";
  }

}
class SARIndicator extends Indicator {
  constructor() {
    super();
    let N = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](4);
    let MIN = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](2);
    let STEP = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](2);
    let MAX = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](20);
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("SAR", new _exprs__WEBPACK_IMPORTED_MODULE_0__["SarExpr"](N, MIN, STEP, MAX), _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"].outputStyle.SARPoint));
  }

  getName() {
    return "SAR";
  }

}
class KDJIndicator extends Indicator {
  constructor() {
    super();
    let N = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N", 2, 90, 9);
    let M1 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M1", 2, 30, 3);
    let M2 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M2", 2, 30, 3);
    this.addParameter(N);
    this.addParameter(M1);
    this.addParameter(M2);
    let HHV = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("HHV", new _exprs__WEBPACK_IMPORTED_MODULE_0__["HhvExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["HighExpr"](), N));
    this.addAssign(HHV);
    let LLV = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("LLV", new _exprs__WEBPACK_IMPORTED_MODULE_0__["LlvExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["LowExpr"](), N));
    this.addAssign(LLV);
    let RSV = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("RSV", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), LLV), new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](HHV, LLV)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100)));
    this.addAssign(RSV);
    let K = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("K", new _exprs__WEBPACK_IMPORTED_MODULE_0__["SmaExpr"](RSV, M1, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1)));
    this.addOutput(K);
    let D = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("D", new _exprs__WEBPACK_IMPORTED_MODULE_0__["SmaExpr"](K, M2, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1)));
    this.addOutput(D);
    let J = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("J", new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](K, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](3)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](D, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](2))));
    this.addOutput(J);
  }

  getName() {
    return "KDJ";
  }

}
class ROCIndicator extends Indicator {
  constructor() {
    super();
    let N = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N", 2, 120, 12);
    let M = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M", 2, 60, 6);
    this.addParameter(N);
    this.addParameter(M);
    let REF_CLOSE_N = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("REF_CLOSE_N", new _exprs__WEBPACK_IMPORTED_MODULE_0__["RefExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), N));
    this.addAssign(REF_CLOSE_N);
    let ROC = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("ROC", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), REF_CLOSE_N), REF_CLOSE_N), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100)));
    this.addOutput(ROC);
    let MAROC = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("MAROC", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](ROC, M));
    this.addOutput(MAROC);
  }

  getName() {
    return "ROC";
  }

}
class MTMIndicator extends Indicator {
  constructor() {
    super();
    let N = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N", 2, 120, 12);
    let M = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M", 2, 60, 6);
    this.addParameter(N);
    this.addParameter(M);
    let MTM = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("MTM", new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["RefExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), N)));
    this.addOutput(MTM);
    let MTMMA = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("MTMMA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](MTM, M));
    this.addOutput(MTMMA);
  }

  getName() {
    return "MTM";
  }

}
class BOLLIndicator extends Indicator {
  constructor() {
    super();
    let N = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N", 2, 120, 20);
    this.addParameter(N);
    let STD_CLOSE_N = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("STD_CLOSE_N", new _exprs__WEBPACK_IMPORTED_MODULE_0__["StdExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), N));
    this.addAssign(STD_CLOSE_N);
    let BOLL = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("BOLL", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), N));
    this.addOutput(BOLL);
    let UB = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("UB", new _exprs__WEBPACK_IMPORTED_MODULE_0__["AddExpr"](BOLL, new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](2), STD_CLOSE_N)));
    this.addOutput(UB);
    let LB = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("LB", new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](BOLL, new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](2), STD_CLOSE_N)));
    this.addOutput(LB);
  }

  getName() {
    return "BOLL";
  }

}
class PSYIndicator extends Indicator {
  constructor() {
    super();
    let N = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N", 2, 100, 12);
    let M = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M", 2, 100, 6);
    this.addParameter(N);
    this.addParameter(M);
    let PSY = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("PSY", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CountExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["GtExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["RefExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1))), N), N), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100)));
    this.addOutput(PSY);
    let PSYMA = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("PSYMA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](PSY, M));
    this.addOutput(PSYMA);
  }

  getName() {
    return "PSY";
  }

}
class STOCHRSIIndicator extends Indicator {
  constructor() {
    super();
    let N = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("N", 3, 100, 14);
    let M = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("M", 3, 100, 14);
    let P1 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("P1", 2, 50, 3);
    let P2 = new _exprs__WEBPACK_IMPORTED_MODULE_0__["ParameterExpr"]("P2", 2, 50, 3);
    this.addParameter(N);
    this.addParameter(M);
    this.addParameter(P1);
    this.addParameter(P2);
    let LC = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("LC", new _exprs__WEBPACK_IMPORTED_MODULE_0__["RefExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1)));
    this.addAssign(LC);
    let CLOSE_LC = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("CLOSE_LC", new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["CloseExpr"](), LC));
    this.addAssign(CLOSE_LC);
    let RSI = new _exprs__WEBPACK_IMPORTED_MODULE_0__["AssignExpr"]("RSI", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaxExpr"](CLOSE_LC, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](0)), N, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["SmaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["AbsExpr"](CLOSE_LC), N, new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](1))), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100)));
    this.addAssign(RSI);
    let STOCHRSI = new _exprs__WEBPACK_IMPORTED_MODULE_0__["OutputExpr"]("STOCHRSI", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MulExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["DivExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](RSI, new _exprs__WEBPACK_IMPORTED_MODULE_0__["LlvExpr"](RSI, M)), P1), new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["SubExpr"](new _exprs__WEBPACK_IMPORTED_MODULE_0__["HhvExpr"](RSI, M), new _exprs__WEBPACK_IMPORTED_MODULE_0__["LlvExpr"](RSI, M)), P1)), new _exprs__WEBPACK_IMPORTED_MODULE_0__["ConstExpr"](100)));
    this.addOutput(STOCHRSI);
    this.addOutput(new _exprs__WEBPACK_IMPORTED_MODULE_0__["RangeOutputExpr"]("MA", new _exprs__WEBPACK_IMPORTED_MODULE_0__["MaExpr"](STOCHRSI, P2)));
  }

  getName() {
    return "StochRSI";
  }

}

/***/ })

};;
//# sourceMappingURL=kline.js.map