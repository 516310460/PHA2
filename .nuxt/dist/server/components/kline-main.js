exports.ids = [35];
exports.modules = {

/***/ 314:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(315);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
__webpack_require__(5).default("50691e8a", content, true)

/***/ }),

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(13);
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(316);
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(317);
var ___CSS_LOADER_URL_IMPORT_2___ = __webpack_require__(318);
var ___CSS_LOADER_URL_IMPORT_3___ = __webpack_require__(319);
var ___CSS_LOADER_URL_IMPORT_4___ = __webpack_require__(320);
var ___CSS_LOADER_URL_IMPORT_5___ = __webpack_require__(321);
var ___CSS_LOADER_URL_IMPORT_6___ = __webpack_require__(322);
var ___CSS_LOADER_URL_IMPORT_7___ = __webpack_require__(323);
var ___CSS_LOADER_URL_IMPORT_8___ = __webpack_require__(324);
var ___CSS_LOADER_URL_IMPORT_9___ = __webpack_require__(325);
var ___CSS_LOADER_URL_IMPORT_10___ = __webpack_require__(326);
var ___CSS_LOADER_URL_IMPORT_11___ = __webpack_require__(327);
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
// Module
___CSS_LOADER_EXPORT___.push([module.i, "body,html{\n  min-height:100%;\n  margin:0;\n  min-width:100%\n}\n\n.chart_container{\n  cursor:default;\n  font-size:12px;\n  height:100%;\n  position:relative;\n  width:100%;\n  overflow:hidden;\n  border:1px solid #0a0a0a\n}\n\n.chart_container *{\n  font-size:12px\n}\n\n.chart_container div,.chart_container form,.chart_container ul{\n  margin:0;\n  padding:0\n}\n\n.chart_container a:hover{\n  text-decoration:none\n}\n\n.chart_container ul{\n  list-style:none;\n  border:0;\n  margin:0;\n  padding:0\n}\n\n.chart_container button{\n  cursor:pointer\n}\n\n#chart_dom_elem_cache{*font-weight:700;\n  position:absolute;\n  visibility:hidden;\n  z-index:-1\n}\n\n#chart_toolbar{\n  border-bottom:1px solid;*font-weight:700;\n  height:29px;\n  position:absolute;\n  z-index:3\n}\n\n.chart_container.dark #chart_toolbar{\n  background-color:#161616;\n  border-bottom-color:#404040\n}\n\n.chart_container.light #chart_toolbar{\n  background-color:#f6f6f6;\n  border-bottom-color:#afb1b3\n}\n\n.chart_container .chart_toolbar_sep{\n  float:left;\n  height:100%;\n  width:16px\n}\n\n.chart_container .chart_dropdown{\n  float:left;\n  position:relative;\n  z-index:100;\n  cursor:pointer\n}\n\n.chart_container .chart_dropdown_t{\n  background-origin:content-box;\n  background-repeat:no-repeat;\n  border:solid;\n  border-width:1px 1px 0;\n  margin-top:3px;\n  padding-right:10px;\n  z-index:101;\n  position:relative\n}\n\n.chart_container .chart_dropdown_t a{\n  display:inline-block;\n  padding:3px 12px 5px 10px\n}\n\n.chart_container .chart_dropdown_data{\n  border:1px solid;\n  display:none;\n  position:absolute;\n  padding:6px 8px;\n  margin-top:-1px;\n  z-index:100\n}\n\n.chart_container .chart_dropdown_data table{\n  border-collapse:collapse;\n  font-weight:400;\n  white-space:nowrap\n}\n\n.chart_container .chart_dropdown_data td{\n  border-bottom:1px solid;\n  padding:8px 6px;\n  vertical-align:top\n}\n\n.market_chooser .chart_dropdown_data{\n  width:370px\n}\n\n.market_chooser .chart_dropdown_data td{\n  border-bottom:1px solid;\n  padding:1px 6px!important;\n  vertical-align:top;\n  line-height:24px\n}\n\n.market_chooser li{\n  float:left;\n  width:80px;\n  height:24px;\n  line-height:24px\n}\n\n.chart_container .chart_dropdown_data td.marketName_ a.dark{\n  color:#fff\n}\n\n.chart_container .chart_dropdown_data td.marketName_ a.light{\n  color:#000\n}\n\n.chart_container .chart_dropdown_data table tr:last-child td{\n  border-bottom:0\n}\n\n.chart_container .chart_dropdown_data li{\n  white-space:nowrap;\n  display:inline-block\n}\n\n.chart_container .chart_dropdown_data a{\n  text-decoration:none;\n  cursor:pointer;\n  padding:5px 6px\n}\n\n.chart_container .chart_dropdown-hover.chart_dropdown_data{\n  display:block\n}\n\n#chart_dropdown_symbols .chart_dropdown_data td{\n  padding:8px 6px 0\n}\n\n#chart_dropdown_symbols .chart_dropdown_data li{\n  display:block;\n  height:26px\n}\n\n#chart_dropdown_symbols .chart_dropdown_data a{\n  cursor:pointer\n}\n\n#chart_dropdown_themes .chart_dropdown_data td:first-child{\n  padding:6px 1px 7px 6px\n}\n\n.chart_container.dark .chart_dropdown_t{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-position:right 9px;\n  border-color:#161616;\n  color:#e5e5e5\n}\n\n.chart_container.dark .chart_dropdown-hover.chart_dropdown_t{\n  background-color:#161616;\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  background-position:right 8px;\n  border-color:#606060;\n  color:#fff\n}\n\n.chart_container.dark .chart_dropdown_data{\n  background-color:rgba(22,22,22,.8);\n  border-color:#606060\n}\n\n.chart_container.dark .chart_dropdown_data td{\n  border-bottom-color:#404040;\n  color:#e5e5e5\n}\n\n.chart_container.dark .chart_dropdown_data li a{\n  color:#1987da\n}\n\n.chart_container.dark .chart_dropdown_data li a:hover{\n  background-color:#383838\n}\n\n.chart_container.dark .chart_dropdown_data li a.selected{\n  color:#ffac00\n}\n\n.chart_container.light .chart_dropdown_t{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-position:right 10px;\n  border-color:#f6f6f6;\n  color:#393c40\n}\n\n.chart_container.light .chart_dropdown-hover.chart_dropdown_t{\n  background-color:#f6f6f6;\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n  background-position:right 9px;\n  border-color:#4c4f53;\n  color:#393c40\n}\n\n.chart_container.light .chart_dropdown_data{\n  background-color:hsla(0,0%,96.5%,.8);\n  border-color:#4c4f53\n}\n\n.chart_container.light .chart_dropdown_data td{\n  border-bottom-color:#e4e5e6;\n  color:#393c40\n}\n\n.chart_container.light .chart_dropdown_data li a{\n  color:#1478c8\n}\n\n.chart_container.light .chart_dropdown_data a:hover{\n  background-color:#f4f4f4\n}\n\n.chart_container.light .chart_dropdown_data a.selected{\n  color:#f27935\n}\n\n.chart_container .chart_toolbar_label{\n  cursor:default;\n  display:inline-block;\n  float:left;\n  padding:7px 4px\n}\n\n.chart_container.dark .chart_toolbar_label{\n  border-color:#232323;\n  color:#e5e5e5\n}\n\n.chart_container.light .chart_toolbar_label{\n  border-color:#fff;\n  color:#393c40\n}\n\n.chart_container .chart_toolbar_button{\n  border:1px solid;\n  cursor:pointer;\n  float:left;\n  margin:3px 2px;\n  padding:3px 10px;\n  position:relative;\n  z-index:100\n}\n\n.chart_container.dark .chart_toolbar_button{\n  border-color:#404040;\n  color:#e5e5e5\n}\n\n.chart_container.dark .chart_toolbar_button:hover{\n  background-color:#383838;\n  border-color:#606060;\n  color:#fff\n}\n\n.chart_container.dark .chart_toolbar_button.selected{\n  background-color:#383838;\n  border-color:#606060;\n  color:#ffac00\n}\n\n.chart_container.dark .chart_toolbar_button.selected:hover{\n  background-color:#474747;\n  border-color:grey;\n  color:#ffac00\n}\n\n.chart_container.light .chart_toolbar_button{\n  border-color:#ccc;\n  color:#393c40\n}\n\n.chart_container.light .chart_toolbar_button:hover{\n  background-color:#f4f4f4;\n  color:#393c40\n}\n\n.chart_container.light .chart_toolbar_button.selected{\n  background-color:#f4f4f4;\n  border-color:#f27935;\n  color:#f27935\n}\n\n.chart_container .chart_toolbar_tabgroup{\n  float:left\n}\n\n.chart_container .chart_toolbar_tabgroup li{\n  display:inline-block;\n  padding:4px 0;\n  margin:3px 0\n}\n\n.chart_container .chart_toolbar_tabgroup li a{\n  cursor:pointer;\n  padding:4px\n}\n\n.chart_container .chart_toolbar_tabgroup li a:hover{\n  text-decoration:none\n}\n\n.chart_container.dark .chart_toolbar_tabgroup li a{\n  color:#1987da\n}\n\n.chart_container.dark .chart_toolbar_tabgroup li a:hover{\n  background-color:#383838\n}\n\n.chart_container.dark .chart_toolbar_tabgroup li a.selected{\n  color:#ffac00\n}\n\n.chart_container.light .chart_toolbar_tabgroup li a{\n  color:#1478c8\n}\n\n.chart_container.light .chart_toolbar_tabgroup li a:hover{\n  background-color:#f4f4f4\n}\n\n.chart_container.light .chart_toolbar_tabgroup li a.selected{\n  color:#f27935\n}\n\n#chart_toolbar_periods_horz{\n  display:inline-block;\n  float:left;\n  position:relative;\n  z-index:100\n}\n\n#chart_toolbar_periods_vert{\n  float:left\n}\n\n.chart_container a.chart_icon{\n  border:1px solid;\n  height:16px;\n  padding:0;\n  width:16px;\n  box-sizing:border-box\n}\n\n.chart_container a.chart_icon:hover{\n  border-width:2px\n}\n\n.chart_container .chart_dropdown_data a.chart_icon{\n  display:inline-block;\n  margin:0 6px\n}\n\n.chart_container .chart_dropdown_data li a.chart_icon_theme_dark:hover,.chart_container a.chart_icon_theme_dark{\n  background-color:#000\n}\n\n.chart_container .chart_dropdown_data li a.chart_icon_theme_light:hover,.chart_container a.chart_icon_theme_light{\n  background-color:#fff\n}\n\n.chart_container #chart_toolbar_theme{\n  float:left;\n  padding:0 8px\n}\n\n.chart_container #chart_toolbar_theme a.chart_icon{\n  cursor:pointer;\n  float:left;\n  margin:6px 4px\n}\n\n.chart_container #chart_select_theme td:last-child{\n  padding:6px 6px 0 8px\n}\n\n.chart_container #chart_select_theme li{\n  padding:0 4px\n}\n\n.chart_container.dark a.chart_icon{\n  border-color:#aaa\n}\n\n.chart_container.dark a.chart_icon:hover{\n  border-color:#1987da\n}\n\n.chart_container.dark a.chart_icon.selected{\n  border-color:#ffac00\n}\n\n.chart_container.light a.chart_icon{\n  border-color:#aaa\n}\n\n.chart_container.light a.chart_icon.selected{\n  border-color:#f27935\n}\n\n.chart_container #chart_updated_time{\n  float:right;\n  padding-top:6px;\n  margin-right:10px\n}\n\n.chart_container.dark #chart_updated_time{\n  color:#e5e5e5\n}\n\n.chart_container.light #chart_updated_time{\n  color:#393c40\n}\n\n.chart_container #chart_show_depth{\n  float:right;\n  margin-right:30px\n}\n\n#chart_toolpanel{\n  border-right:1px solid;\n  display:none;\n  position:absolute;\n  width:32px;\n  z-index:2\n}\n\n#chart_toolpanel .chart_toolpanel_separator{\n  position:relative;\n  height:4px\n}\n\n#chart_toolpanel .chart_toolpanel_button{\n  position:relative;\n  z-index:100\n}\n\n#chart_toolpanel .chart_toolpanel_icon{\n  background-origin:content-box;\n  background-repeat:no-repeat;\n  cursor:pointer;\n  height:16px;\n  margin:10px auto;\n  position:relative;\n  width:16px;\n  z-index:101\n}\n\n#chart_toolpanel .chart_toolpanel_tip{\n  border-radius:4px;\n  border:1px solid;\n  display:none;*font-weight:700;\n  position:absolute;\n  padding:3px 6px 4px;\n  margin-left:36px;\n  margin-top:-25px;\n  white-space:nowrap;\n  z-index:100\n}\n\n#chart_toolpanel .chart_toolpanel_button:hover .chart_toolpanel_tip{\n  display:block\n}\n\n.chart_container.dark #chart_toolpanel{\n  background-color:#161616;\n  border-right-color:#404040\n}\n\n.chart_container.dark .chart_toolpanel_icon{\n  background-color:#161616\n}\n\n.chart_container.dark .chart_toolpanel_button:hover .chart_toolpanel_icon{\n  background-color:#404040\n}\n\n.chart_container.dark .chart_toolpanel_button.selected .chart_toolpanel_icon{\n  background-color:#161616\n}\n\n.chart_container.dark .chart_toolpanel_tip{\n  background-color:#ffac00;\n  border-color:#ffac00;\n  color:#161616\n}\n\n.chart_container.light #chart_toolpanel{\n  background-color:#f6f6f6;\n  border-right-color:#afb1b3\n}\n\n.chart_container.light .chart_toolpanel_icon{\n  background-color:#f6f6f6\n}\n\n.chart_container.light .chart_toolpanel_button:hover .chart_toolpanel_icon{\n  background-color:#ccc\n}\n\n.chart_container.light .chart_toolpanel_button.selected .chart_toolpanel_icon{\n  background-color:#f4f4f4\n}\n\n.chart_container.light .chart_toolpanel_tip{\n  background-color:#f27938;\n  border-color:#f27938;\n  color:#eee\n}\n\n.chart_container.dark #chart_toolpanel .chart_toolpanel_button .chart_toolpanel_icon{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ")\n}\n\n.chart_container.dark #chart_toolpanel .chart_toolpanel_button.selected .chart_toolpanel_icon{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ")\n}\n\n.chart_container.dark #chart_toolbar .chart_BoxSize{\n  background:url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ") no-repeat\n}\n\n.chart_container.light #chart_toolpanel .chart_toolpanel_button .chart_toolpanel_icon{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ")\n}\n\n.chart_container.light #chart_toolpanel .chart_toolpanel_button.selected .chart_toolpanel_icon{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ")\n}\n\n.chart_container.light #chart_toolbar .chart_BoxSize{\n  background:url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ") no-repeat\n}\n\n.chart_container #chart_toolpanel #chart_Cursor{\n  background-position:0 0\n}\n\n.chart_container #chart_toolpanel #chart_CrossCursor{\n  background-position:0 -20px\n}\n\n.chart_container #chart_toolpanel #chart_SegLine{\n  background-position:0 -40px\n}\n\n.chart_container #chart_toolpanel #chart_StraightLine{\n  background-position:0 -60px\n}\n\n.chart_container #chart_toolpanel #chart_RayLine{\n  background-position:0 -100px\n}\n\n.chart_container #chart_toolpanel #chart_ArrowLine{\n  background-position:0 -80px\n}\n\n.chart_container #chart_toolpanel #chart_HoriSegLine{\n  background-position:0 -160px\n}\n\n.chart_container #chart_toolpanel #chart_HoriStraightLine{\n  background-position:0 -120px\n}\n\n.chart_container #chart_toolpanel #chart_HoriRayLine{\n  background-position:0 -140px\n}\n\n.chart_container #chart_toolpanel #chart_VertiStraightLine{\n  background-position:0 -180px\n}\n\n.chart_container #chart_toolpanel #chart_PriceLine{\n  background-position:0 -200px\n}\n\n.chart_container #chart_toolpanel #chart_TriParallelLine{\n  background-position:0 -220px\n}\n\n.chart_container #chart_toolpanel #chart_BiParallelLine{\n  background-position:0 -240px\n}\n\n.chart_container #chart_toolpanel #chart_BiParallelRayLine{\n  background-position:0 -260px\n}\n\n.chart_container .chart_toolpanel_button #chart_DrawFibRetrace{\n  background-position:0 -280px\n}\n\n.chart_container #chart_toolpanel #chart_DrawFibFans{\n  background-position:0 -300px\n}\n\n#chart_tabbar{\n  border-top:1px solid;\n  cursor:default;\n  display:none;*font-weight:700;\n  overflow:hidden;\n  position:absolute;\n  z-index:1;\n  height:24px\n}\n\n#chart_tabbar ul{\n  height:100%;\n  list-style:none;\n  padding:0 0 0 4px\n}\n\n#chart_tabbar a,#chart_tabbar li{\n  display:inline-block;\n  height:100%;\n  margin:0\n}\n\n#chart_tabbar a{\n  cursor:pointer;\n  padding:0 4px;\n  line-height:24px;\n  overflow:hidden\n}\n\n#chart_tabbar a:hover{\n  text-decoration:none\n}\n\n.chart_container.dark #chart_tabbar{\n  background-color:#161616;\n  border-top-color:#404040\n}\n\n.chart_container.dark #chart_tabbar a{\n  color:#e5e5e5\n}\n\n.chart_container.dark #chart_tabbar a:hover{\n  background-color:#383838;\n  color:#fff\n}\n\n.chart_container.dark #chart_tabbar a.selected{\n  color:#ffac00\n}\n\n.chart_container.light #chart_tabbar{\n  background-color:#f6f6f6;\n  border-top-color:#afb1b3\n}\n\n.chart_container.light #chart_tabbar a{\n  color:#393c40\n}\n\n.chart_container.light #chart_tabbar a:hover{\n  background-color:#f4f4f4;\n  color:#393c40\n}\n\n.chart_container.light #chart_tabbar a.selected{\n  color:#f27935\n}\n\n#chart_canvasGroup,#chart_mainCanvas{\n  position:absolute;\n  z-index:0\n}\n\n#chart_mainCanvas{\n  overflow:hidden\n}\n\n#chart_overlayCanvas{\n  overflow:hidden;\n  position:absolute;\n  z-index:2\n}\n\n#chart_loading{\n  border:1px solid;\n  border-radius:4px;\n  font-size:18px;\n  font-weight:700;\n  line-height:48px;\n  overflow:hidden;\n  position:absolute;\n  text-align:center;\n  visibility:hidden;\n  width:200px;\n  z-index:200\n}\n\n#chart_loading.activated{\n  visibility:visible\n}\n\n.chart_container.dark #chart_loading{\n  border-color:#aaa;\n  background-color:rgba(0,0,0,.6);\n  color:#ccc\n}\n\n.chart_container.light #chart_loading{\n  border-color:#afb1b3;\n  background-color:hsla(0,0%,95.7%,.8);\n  color:#393c40\n}\n\n#chart_parameter_settings{\n  border-radius:4px;\n  border:1px solid;\n  width:640px;\n  position:absolute;\n  overflow:hidden;\n  visibility:hidden;\n  z-index:500\n}\n\n#chart_parameter_settings.clicked{\n  visibility:visible\n}\n\n#chart_parameter_settings h2{\n  padding:8px 12px;\n  margin:0\n}\n\n#chart_parameter_settings table{\n  border-collapse:collapse;\n  width:100%\n}\n\n#chart_parameter_settings tr{\n  line-height:32px\n}\n\n#chart_parameter_settings th{\n  text-align:right;\n  padding:0 4px 0 16px\n}\n\n#chart_parameter_settings input{\n  width:2em;\n  margin:0 2px\n}\n\n#chart_parameter_settings #close_settings{\n  border-radius:4px;\n  cursor:pointer;\n  font-weight:700;\n  text-align:center;\n  margin:8px auto;\n  padding:5px 24px;\n  width:84px\n}\n\n#chart_parameter_settings .chart_str_default{\n  margin-right:24px\n}\n\n.chart_container.dark #chart_parameter_settings{\n  background-color:rgba(22,22,22,.8);\n  border-color:#666;\n  color:#ccc\n}\n\n.chart_container.dark #chart_parameter_settings #close_settings{\n  background:#1887da;\n  color:#eee\n}\n\n.chart_container.dark #chart_parameter_settings td,.chart_container.dark #chart_parameter_settings th{\n  color:#ccc\n}\n\n.chart_container.light #chart_parameter_settings{\n  background-color:hsla(0,0%,96.5%,.8);\n  border-color:#afb1b3;\n  color:#393c40\n}\n\n.chart_container.light #chart_parameter_settings #close_settings{\n  background:#1478c8;\n  color:#eee\n}\n\n.chart_container.light #chart_parameter_settings td,.chart_container.light #chart_parameter_settings th{\n  color:#393c40\n}\n\n.chart_container button,.chart_container input{\n  border-radius:4px;\n  border:1px solid;\n  padding:4px\n}\n\n.chart_container input[type=text]{\n  width:12em\n}\n\n.chart_container button,.chart_container input[type=button],.chart_container input[type=submit]{\n  padding:4px 8px;\n  cursor:pointer\n}\n\n.chart_container.dark button,.chart_container.dark input{\n  background-color:#151515;\n  border-color:#333;\n  color:#ccc\n}\n\n.chart_container.light button,.chart_container.light input{\n  background-color:#ddd;\n  border-color:#ddd;\n  color:#222\n}\n\n.chart_BoxSize{\n  width:20px;\n  height:20px;\n  cursor:pointer\n}\n\n.clear_all{\n  position:relative;\n  z-index:100\n}\n\n.clear_all .clear_all_icon{\n  cursor:pointer;\n  height:16px;\n  margin:0 auto;\n  position:relative;\n  width:16px;\n  z-index:101;\n  background-repeat:no-repeat;\n  background-position:50%\n}\n\n.clear_all:hover .chart_toolpanel_tip{\n  display:block!important\n}\n\n.chart_container.dark .clear_all_icon{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_10___ + ")\n}\n\n.chart_container.light .clear_all_icon{\n  background-image:url(" + ___CSS_LOADER_URL_REPLACEMENT_11___ + ")\n}\n\n.chart_container .symbol-title{\n  float:left;\n  line-height:29px;\n  padding:0 10px;\n  font-weight:700\n}\n\n.chart_container.dark .symbol-title{\n  color:#e5e5e5\n}\n\n.chart_container.light .symbol-title{\n  color:#393c40\n}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/dropdown_w.8cba420.png";

/***/ }),

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/dropup_w.f59dc93.png";

/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/dropdown_b.df4d581.png";

/***/ }),

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/dropup_b.39f16f2.png";

/***/ }),

/***/ 320:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/tool_d_normal.fac2446.png";

/***/ }),

/***/ 321:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/tool_d_push.fd723ec.png";

/***/ }),

/***/ 322:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABC0lEQVQ4T7WTYVEDMRSEv1VAJYCDOmgdgAPAASigKGhx0CoACcUBEsDBVcFj9ibpvF6TDn/IzM0kL9l9t5usImIFvHA6niVtcikinoB1qg3AmyIiSnEslPle0n5CsAT8eZjsChgqwaEUtpIeJ39zsoyILXAPjJhK8Apcl40uSQLvgG9LPxJIWqUDZyQZLOmhemcC6/mqmlskU7A1RYT9mKultwDuLEvSEBE2+MOdp+ebBKXDzOBLhnrvfwiKhFvgJkl4b13xJRN3VXPH2Dmw6F3jEVw9mJLka/RTzg/pDNwiAX7yQ7LbM6ALbpCMGEvwZAwGUBP42QnTIoXJDQ8mcJxrumqjv8TZYdr8Ai/uwaXkPGIcAAAAAElFTkSuQmCC"

/***/ }),

/***/ 323:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/tool_l_normal.dc73be3.png";

/***/ }),

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/tool_l_push.5af4c05.png";

/***/ }),

/***/ 325:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABKElEQVQ4T7VTwU0DMRCcrYArwby9j3QQOoAOgA5CBYQKCB0kFUAJoQMe9v/o4JD8X7SWfVo5vhMfLJ1krT3jm9kdYuY9gGeYJSJPMcaDrXnvd0T0amoTgDdiZinFXCj7cwjhbAmY+QaAfrp2AK4ATJXgRwsicowxPlpgu/feH4noHkDGVIIXEXF6sEZSwSJyIqJRpc8EIYS9uXDxJxYcY3yo3lEx56tq7pG0YJWlnojIhnp6C+AupeTGcZyYeRKRD325vd8l0EvOuUHBa4bq2f8QFAm3KaVrI+G91+I1E09V84KxGyLaLrVxBlcPWpK5jWWU7SBdgHskRPRtB0ndHnTCeq1qQlVHOWNUgm5yMADUBH4uhGlrwjRoHpRA41zTlc//GGcN0+EXyGXo9iBlz1cAAAAASUVORK5CYII="

/***/ }),

/***/ 326:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3klEQVQ4T62TPQrCQBCF3waCpZVeI5DMHMXCFFrrCZJOKwWx1Ubs1MabZAjkGnqFkJUVIysmJBK3nJ9vZt7sKHR8qmM+/gtI03RQFMWEiLZVnYlI5Lru0fO8W+n/6EBEQgAnAGsiim2IiKwARFrrkJkvlQBjFJEZgJ3WesnMi5ftmQxgTkR7G1ypQQkBYLro1yUbUK2IFsTEfVWuHaF0dALYOiilej+NYFV+b6LcQKOISZKMlVLnhjWOmPlaqUGWZcM8z6dBEGxqPlLsOM7B9/17o4htb+S/t9C2qh33AOKBYhHSYIk9AAAAAElFTkSuQmCC"

/***/ }),

/***/ 327:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3ElEQVQ4T62TPQrCQBCF3y4BSys9RmCZs1iYQms9QdJppSC22oid2niV2YEcQ48Q2EjEyIoJicQt5+ebmTc7Ch2f6piP/wKMMQOt9YSZt1WdEVGcZdkxTdNb6f/ogIgiACcAa2ZOfAgRrQDEzrlIRC6VgMJIRDMAuzzPl9baxcv2TAYwZ+a9D67UoIQAKLro1yUXoFoRPUgR91W5doTS0Qng66CU6v00glf5vYlyA40iGmPGWutzwxpHInKt1CAMw2EQBFNr7abmIyXOuYOI3BtFbHsj/72FtlX9uAer52IR8HRvCwAAAABJRU5ErkJggg=="

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./components/kline/css/main.css
var main = __webpack_require__(314);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/kline/main.vue?vue&type=script&lang=js&
 // import Kline from "./js/kline.js";

const VueKline = {
  name: "main",
  props: {
    klineParams: {
      type: Object,
      default: {}
    },
    klineData: {
      type: Object,
      default: {}
    }
  },

  data() {
    return {
      cfg: {
        element: "#kline_container",
        width: this.klineParams.width,
        height: this.klineParams.height,
        theme: this.klineParams.theme,
        language: this.klineParams.language,
        ranges: this.klineParams.ranges,
        symbol: this.klineParams.symbol,
        symbolName: this.klineParams.symbolName,
        limit: 1000,
        count: this.klineParams.count,
        intervalTime: this.klineParams.intervalTime,
        debug: false,
        depthWidth: this.klineParams.depthWidth,
        onRequestData: this.onRequestData,
        onRangeChange: this.onRangeChange
      },
      kline: null
    };
  },

  mounted() {
    this.$nextTick(() => {
      let that = this;
      setTimeout(() => {
        that.kline = new this.$Kline(that.cfg);
        that.kline.draw();
      }, 300);

      window.onload = function () {
        that.kline = new that.$Kline(that.cfg);
        that.kline.draw();
      };
    });
  },

  render() {
    const h = arguments[0];
    return h("div", {
      "attrs": {
        "id": "kline_container"
      }
    }, [h("div", {
      "class": "chart_container dark"
    }, [h("div", {
      "attrs": {
        "id": "chart_toolpanel"
      }
    }, [h("div", {
      "class": "chart_toolpanel_separator"
    }), h("div", {
      "class": "clear_all"
    }, [h("div", {
      "class": "clear_all_icon",
      "attrs": {
        "id": "clearCanvas"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_clear_all"
    }, ["\u6E05\u9664\u5168\u90E8"])]), h("div", {
      "class": "chart_toolpanel_button"
    }, [h("div", {
      "class": "chart_toolpanel_icon",
      "attrs": {
        "id": "chart_Cursor",
        "name": "Cursor"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_cursor"
    }, ["\u5149\u6807"])]), h("div", {
      "class": "chart_toolpanel_button"
    }, [h("div", {
      "class": "chart_toolpanel_icon",
      "attrs": {
        "id": "chart_CrossCursor",
        "name": "CrossCursor"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_cross_cursor"
    }, ["\u5341\u5B57\u5149\u6807"])]), h("div", {
      "class": "chart_toolpanel_button"
    }, [h("div", {
      "class": "chart_toolpanel_icon",
      "attrs": {
        "id": "chart_SegLine",
        "name": "SegLine"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_seg_line"
    }, ["\u7EBF\u6BB5"])]), h("div", {
      "class": "chart_toolpanel_button"
    }, [h("div", {
      "class": "chart_toolpanel_icon",
      "attrs": {
        "id": "chart_StraightLine",
        "name": "StraightLine"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_straight_line"
    }, ["\u76F4\u7EBF"])]), h("div", {
      "class": "chart_toolpanel_button"
    }, [h("div", {
      "class": "chart_toolpanel_icon",
      "attrs": {
        "id": "chart_RayLine",
        "name": "RayLine"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_ray_line"
    }, ["\u5C04\u7EBF"])]), h("div", {
      "class": "chart_toolpanel_button"
    }, [h("div", {
      "class": "chart_toolpanel_icon",
      "attrs": {
        "id": "chart_ArrowLine",
        "name": "ArrowLine"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_arrow_line"
    }, ["\u7BAD\u5934"])]), h("div", {
      "class": "chart_toolpanel_button"
    }, [h("div", {
      "class": "chart_toolpanel_icon",
      "attrs": {
        "id": "chart_HoriSegLine",
        "name": "HoriSegLine"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_horz_seg_line"
    }, ["\u6C34\u5E73\u7EBF\u6BB5"])]), h("div", {
      "class": "chart_toolpanel_button"
    }, [h("div", {
      "class": "chart_toolpanel_icon",
      "attrs": {
        "id": "chart_HoriStraightLine",
        "name": "HoriStraightLine"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_horz_straight_line"
    }, ["\u6C34\u5E73\u76F4\u7EBF"])]), h("div", {
      "class": "chart_toolpanel_button"
    }, [h("div", {
      "class": "chart_toolpanel_icon",
      "attrs": {
        "id": "chart_HoriRayLine",
        "name": "HoriRayLine"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_horz_ray_line"
    }, ["\u6C34\u5E73\u5C04\u7EBF"])]), h("div", {
      "class": "chart_toolpanel_button"
    }, [h("div", {
      "class": "chart_toolpanel_icon",
      "attrs": {
        "id": "chart_VertiStraightLine",
        "name": "VertiStraightLine"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_vert_straight_line"
    }, ["\u5782\u76F4\u76F4\u7EBF"])]), h("div", {
      "class": "chart_toolpanel_button"
    }, [h("div", {
      "class": "chart_toolpanel_icon",
      "attrs": {
        "id": "chart_PriceLine",
        "name": "PriceLine"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_price_line"
    }, ["\u4EF7\u683C\u7EBF"])]), h("div", {
      "class": "chart_toolpanel_button"
    }, [h("div", {
      "class": "chart_toolpanel_icon",
      "attrs": {
        "id": "chart_TriParallelLine",
        "name": "TriParallelLine"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_tri_parallel_line"
    }, ["\u4EF7\u683C\u901A\u9053\u7EBF"])]), h("div", {
      "class": "chart_toolpanel_button"
    }, [h("div", {
      "class": "chart_toolpanel_icon",
      "attrs": {
        "id": "chart_BiParallelLine",
        "name": "BiParallelLine"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_bi_parallel_line"
    }, ["\u5E73\u884C\u76F4\u7EBF"])]), h("div", {
      "class": "chart_toolpanel_button"
    }, [h("div", {
      "class": "chart_toolpanel_icon",
      "attrs": {
        "id": "chart_BiParallelRayLine",
        "name": "BiParallelRayLine"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_bi_parallel_ray"
    }, ["\u5E73\u884C\u5C04\u7EBF"])]), h("div", {
      "class": "chart_toolpanel_button"
    }, [h("div", {
      "class": "chart_toolpanel_icon",
      "attrs": {
        "id": "chart_DrawFibRetrace",
        "name": "DrawFibRetrace"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_fib_retrace"
    }, ["\u6590\u6CE2\u7EB3\u5951\u56DE\u8C03"])]), h("div", {
      "class": "chart_toolpanel_button"
    }, [h("div", {
      "class": "chart_toolpanel_icon",
      "attrs": {
        "id": "chart_DrawFibFans",
        "name": "DrawFibFans"
      }
    }), h("div", {
      "class": "chart_toolpanel_tip chart_str_fib_fans"
    }, ["\u6590\u6CE2\u7EB3\u5951\u6247\u5F62"])])]), h("div", {
      "class": "absolute opacity-10 z-10 text-center"
    }, [h("img", {
      "attrs": {
        "src": "/img/Home/logo.svg",
        "alt": "logo"
      },
      "class": "w-64 mx-auto"
    })]), h("div", {
      "attrs": {
        "id": "chart_canvasGroup"
      },
      "class": "temp"
    }, [h("canvas", {
      "class": "chart_canvas",
      "attrs": {
        "id": "chart_mainCanvas"
      },
      "style": {
        cursor: "default"
      }
    }), h("canvas", {
      "class": "chart_canvas",
      "attrs": {
        "id": "chart_overlayCanvas"
      },
      "style": {
        cursor: "default"
      }
    })]), h("div", {
      "attrs": {
        "id": "chart_tabbar"
      }
    }, [h("ul", [h("li", [h("a", {
      "attrs": {
        "name": "VOLUME"
      },
      "class": ""
    }, ["VOLUME"])]), h("li", [h("a", {
      "attrs": {
        "name": "MACD"
      },
      "class": ""
    }, ["MACD"])]), h("li", [h("a", {
      "attrs": {
        "name": "KDJ"
      },
      "class": ""
    }, ["KDJ"])]), h("li", [h("a", {
      "attrs": {
        "name": "StochRSI"
      },
      "class": ""
    }, ["StochRSI"])]), h("li", [h("a", {
      "attrs": {
        "name": "RSI"
      },
      "class": ""
    }, ["RSI"])]), h("li", [h("a", {
      "attrs": {
        "name": "DMI"
      },
      "class": ""
    }, ["DMI"])]), h("li", [h("a", {
      "attrs": {
        "name": "OBV"
      },
      "class": ""
    }, ["OBV"])]), h("li", [h("a", {
      "attrs": {
        "name": "BOLL"
      },
      "class": ""
    }, ["BOLL"])]), h("li", [h("a", {
      "attrs": {
        "name": "SAR"
      },
      "class": ""
    }, ["SAR"])]), h("li", [h("a", {
      "attrs": {
        "name": "DMA"
      },
      "class": ""
    }, ["DMA"])]), h("li", [h("a", {
      "attrs": {
        "name": "TRIX"
      },
      "class": ""
    }, ["TRIX"])]), h("li", [h("a", {
      "attrs": {
        "name": "BRAR"
      },
      "class": ""
    }, ["BRAR"])]), h("li", [h("a", {
      "attrs": {
        "name": "VR"
      },
      "class": ""
    }, ["VR"])]), h("li", [h("a", {
      "attrs": {
        "name": "EMV"
      },
      "class": ""
    }, ["EMV"])]), h("li", [h("a", {
      "attrs": {
        "name": "WR"
      },
      "class": ""
    }, ["WR"])]), h("li", [h("a", {
      "attrs": {
        "name": "ROC"
      },
      "class": ""
    }, ["ROC"])]), h("li", [h("a", {
      "attrs": {
        "name": "MTM"
      },
      "class": ""
    }, ["MTM"])]), h("li", [h("a", {
      "attrs": {
        "name": "PSY"
      }
    }, ["PSY"])])])]), h("div", {
      "attrs": {
        "id": "chart_parameter_settings"
      }
    }, [h("h2", {
      "class": "chart_str_indicator_parameters"
    }, ["\u6307\u6807\u53C2\u6570\u8BBE\u7F6E"]), h("table", [h("tbody", [h("tr", [h("th", ["MA"]), h("td", [h("input", {
      "attrs": {
        "name": "MA"
      }
    }), h("input", {
      "attrs": {
        "name": "MA"
      }
    }), h("input", {
      "attrs": {
        "name": "MA"
      }
    }), h("input", {
      "attrs": {
        "name": "MA"
      }
    }), h("input", {
      "attrs": {
        "name": "MA"
      }
    }), h("input", {
      "attrs": {
        "name": "MA"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])]), h("th", ["DMA"]), h("td", [h("input", {
      "attrs": {
        "name": "DMA"
      }
    }), h("input", {
      "attrs": {
        "name": "DMA"
      }
    }), h("input", {
      "attrs": {
        "name": "DMA"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])])]), h("tr", [h("th", ["EMA"]), h("td", [h("input", {
      "attrs": {
        "name": "EMA"
      }
    }), h("input", {
      "attrs": {
        "name": "EMA"
      }
    }), h("input", {
      "attrs": {
        "name": "EMA"
      }
    }), h("input", {
      "attrs": {
        "name": "EMA"
      }
    }), h("input", {
      "attrs": {
        "name": "EMA"
      }
    }), h("input", {
      "attrs": {
        "name": "EMA"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])]), h("th", ["TRIX"]), h("td", [h("input", {
      "attrs": {
        "name": "TRIX"
      }
    }), h("input", {
      "attrs": {
        "name": "TRIX"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])])]), h("tr", [h("th", ["VOLUME"]), h("td", [h("input", {
      "attrs": {
        "name": "VOLUME"
      }
    }), h("input", {
      "attrs": {
        "name": "VOLUME"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])]), h("th", ["BRAR"]), h("td", [h("input", {
      "attrs": {
        "name": "BRAR"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])])]), h("tr", [h("th", ["MACD"]), h("td", [h("input", {
      "attrs": {
        "name": "MACD"
      }
    }), h("input", {
      "attrs": {
        "name": "MACD"
      }
    }), h("input", {
      "attrs": {
        "name": "MACD"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])]), h("th", ["VR"]), h("td", [h("input", {
      "attrs": {
        "name": "VR"
      }
    }), h("input", {
      "attrs": {
        "name": "VR"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])])]), h("tr", [h("th", ["KDJ"]), h("td", [h("input", {
      "attrs": {
        "name": "KDJ"
      }
    }), h("input", {
      "attrs": {
        "name": "KDJ"
      }
    }), h("input", {
      "attrs": {
        "name": "KDJ"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])]), h("th", ["EMV"]), h("td", [h("input", {
      "attrs": {
        "name": "EMV"
      }
    }), h("input", {
      "attrs": {
        "name": "EMV"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])])]), h("tr", [h("th", ["StochRSI"]), h("td", [h("input", {
      "attrs": {
        "name": "StochRSI"
      }
    }), h("input", {
      "attrs": {
        "name": "StochRSI"
      }
    }), h("input", {
      "attrs": {
        "name": "StochRSI"
      }
    }), h("input", {
      "attrs": {
        "name": "StochRSI"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])]), h("th", ["WR"]), h("td", [h("input", {
      "attrs": {
        "name": "WR"
      }
    }), h("input", {
      "attrs": {
        "name": "WR"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])])]), h("tr", [h("th", ["RSI"]), h("td", [h("input", {
      "attrs": {
        "name": "RSI"
      }
    }), h("input", {
      "attrs": {
        "name": "RSI"
      }
    }), h("input", {
      "attrs": {
        "name": "RSI"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])]), h("th", ["ROC"]), h("td", [h("input", {
      "attrs": {
        "name": "ROC"
      }
    }), h("input", {
      "attrs": {
        "name": "ROC"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])])]), h("tr", [h("th", ["DMI"]), h("td", [h("input", {
      "attrs": {
        "name": "DMI"
      }
    }), h("input", {
      "attrs": {
        "name": "DMI"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])]), h("th", ["MTM"]), h("td", [h("input", {
      "attrs": {
        "name": "MTM"
      }
    }), h("input", {
      "attrs": {
        "name": "MTM"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])])]), h("tr", [h("th", ["OBV"]), h("td", [h("input", {
      "attrs": {
        "name": "OBV"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])]), h("th", ["PSY"]), h("td", [h("input", {
      "attrs": {
        "name": "PSY"
      }
    }), h("input", {
      "attrs": {
        "name": "PSY"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])])]), h("tr", [h("th", ["BOLL"]), h("td", [h("input", {
      "attrs": {
        "name": "BOLL"
      }
    })]), h("td", [h("button", {
      "class": "chart_str_default"
    }, ["\u9ED8\u8BA4\u503C"])])])])]), h("div", {
      "attrs": {
        "id": "close_settings"
      }
    }, [h("a", {
      "class": "chart_str_close"
    }, ["\u5173\u95ED"])])]), h("div", {
      "attrs": {
        "id": "chart_loading"
      },
      "class": "chart_str_loading"
    }, ["\u6B63\u5728\u8BFB\u53D6\u6570\u636E..."])]), h("div", {
      "style": {
        display: "none"
      },
      "attrs": {
        "id": "chart_language_switch_tmp"
      }
    }, [h("span", {
      "attrs": {
        "name": "chart_str_period",
        "zh_tw": "週期",
        "zh_cn": "周期",
        "en_us": "TIME"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_period_line",
        "zh_tw": "分時",
        "zh_cn": "分时",
        "en_us": "Line"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_period_1m",
        "zh_tw": "1分鐘",
        "zh_cn": "1分钟",
        "en_us": "1m"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_period_3m",
        "zh_tw": "3分鐘",
        "zh_cn": "3分钟",
        "en_us": "3m"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_period_5m",
        "zh_tw": "5分鐘",
        "zh_cn": "5分钟",
        "en_us": "5m"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_period_15m",
        "zh_tw": "15分鐘",
        "zh_cn": "15分钟",
        "en_us": "15m"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_period_30m",
        "zh_tw": "30分鐘",
        "zh_cn": "30分钟",
        "en_us": "30m"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_period_1h",
        "zh_tw": "1小時",
        "zh_cn": "1小时",
        "en_us": "1h"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_period_2h",
        "zh_tw": "2小時",
        "zh_cn": "2小时",
        "en_us": "2h"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_period_4h",
        "zh_tw": "4小時",
        "zh_cn": "4小时",
        "en_us": "4h"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_period_6h",
        "zh_tw": "6小時",
        "zh_cn": "6小时",
        "en_us": "6h"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_period_12h",
        "zh_tw": "12小時",
        "zh_cn": "12小时",
        "en_us": "12h"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_period_1d",
        "zh_tw": "日線",
        "zh_cn": "日线",
        "en_us": "1d"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_period_3d",
        "zh_tw": "3日",
        "zh_cn": "3日",
        "en_us": "3d"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_period_1w",
        "zh_tw": "周線",
        "zh_cn": "周线",
        "en_us": "1w"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_settings",
        "zh_tw": "更多",
        "zh_cn": "更多",
        "en_us": "MORE"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_setting_main_indicator",
        "zh_tw": "均線設置",
        "zh_cn": "均线设置",
        "en_us": "Main Indicator"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_setting_main_indicator_none",
        "zh_tw": "關閉均線",
        "zh_cn": "关闭均线",
        "en_us": "None"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_setting_indicator_parameters",
        "zh_tw": "指標參數設置",
        "zh_cn": "指标参数设置",
        "en_us": "Indicator Parameters"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_chart_style",
        "zh_tw": "主圖樣式",
        "zh_cn": "主图样式",
        "en_us": "Chart Style"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_main_indicator",
        "zh_tw": "主指標",
        "zh_cn": "主指标",
        "en_us": "Main Indicator"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_indicator",
        "zh_tw": "技術指標",
        "zh_cn": "技术指标",
        "en_us": "Indicator"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_indicator_cap",
        "zh_tw": "技術指標",
        "zh_cn": "技术指标",
        "en_us": "INDICATOR"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_tools",
        "zh_tw": "畫線工具",
        "zh_cn": "画线工具",
        "en_us": "Tools"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_tools_cap",
        "zh_tw": "畫線工具",
        "zh_cn": "画线工具",
        "en_us": "TOOLS"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_theme",
        "zh_tw": "主題選擇",
        "zh_cn": "主题选择",
        "en_us": "Theme"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_theme_cap",
        "zh_tw": "主題選擇",
        "zh_cn": "主题选择",
        "en_us": "THEME"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_language_setting",
        "zh_tw": "語言(LANG)",
        "zh_cn": "语言(LANG)",
        "en_us": "LANGUAGE"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_depth_cap",
        "zh_tw": "深度圖",
        "zh_cn": "深度图",
        "en_us": "DEPTH"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_none",
        "zh_tw": "關閉",
        "zh_cn": "关闭",
        "en_us": "None"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_theme_dark",
        "zh_tw": "深色主題",
        "zh_cn": "深色主题",
        "en_us": "Dark"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_theme_light",
        "zh_tw": "淺色主題",
        "zh_cn": "浅色主题",
        "en_us": "Light"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_on",
        "zh_tw": "開啟",
        "zh_cn": "开启",
        "en_us": "On"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_off",
        "zh_tw": "關閉",
        "zh_cn": "关闭",
        "en_us": "Off"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_close",
        "zh_tw": "關閉",
        "zh_cn": "关闭",
        "en_us": "CLOSE"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_default",
        "zh_tw": "默認值",
        "zh_cn": "默认值",
        "en_us": "default"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_loading",
        "zh_tw": "正在讀取數據...",
        "zh_cn": "正在读取数据...",
        "en_us": "Loading..."
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_indicator_parameters",
        "zh_tw": "指標參數設置",
        "zh_cn": "指标参数设置",
        "en_us": "Indicator Parameters"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_cursor",
        "zh_tw": "光標",
        "zh_cn": "光标",
        "en_us": "Cursor"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_cross_cursor",
        "zh_tw": "十字光標",
        "zh_cn": "十字光标",
        "en_us": "Cross Cursor"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_seg_line",
        "zh_tw": "線段",
        "zh_cn": "线段",
        "en_us": "Trend Line"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_straight_line",
        "zh_tw": "直線",
        "zh_cn": "直线",
        "en_us": "Extended"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_ray_line",
        "zh_tw": "射線",
        "zh_cn": "射线",
        "en_us": "Ray"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_arrow_line",
        "zh_tw": "箭頭",
        "zh_cn": "箭头",
        "en_us": "Arrow"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_horz_seg_line",
        "zh_tw": "水平線段",
        "zh_cn": "水平线段",
        "en_us": "Horizontal Line"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_horz_straight_line",
        "zh_tw": "水平直線",
        "zh_cn": "水平直线",
        "en_us": "Horizontal Extended"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_horz_ray_line",
        "zh_tw": "水平射線",
        "zh_cn": "水平射线",
        "en_us": "Horizontal Ray"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_vert_straight_line",
        "zh_tw": "垂直直線",
        "zh_cn": "垂直直线",
        "en_us": "Vertical Extended"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_price_line",
        "zh_tw": "價格線",
        "zh_cn": "价格线",
        "en_us": "Price Line"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_tri_parallel_line",
        "zh_tw": "價格通道線",
        "zh_cn": "价格通道线",
        "en_us": "Parallel Channel"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_bi_parallel_line",
        "zh_tw": "平行直線",
        "zh_cn": "平行直线",
        "en_us": "Parallel Lines"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_bi_parallel_ray",
        "zh_tw": "平行射線",
        "zh_cn": "平行射线",
        "en_us": "Parallel Rays"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_fib_retrace",
        "zh_tw": "斐波納契回調",
        "zh_cn": "斐波纳契回调",
        "en_us": "Fibonacci Retracements"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_fib_fans",
        "zh_tw": "斐波納契扇形",
        "zh_cn": "斐波纳契扇形",
        "en_us": "Fibonacci Fans"
      }
    }), h("span", {
      "attrs": {
        "name": "chart_str_clear_all",
        "zh_tw": "清除全部",
        "zh_cn": "清除全部",
        "en_us": "Clear All"
      }
    })])]);
  },

  methods: {
    // 重新绘制线条
    redraw() {
      this.kline.draw();
    },

    // 设置画布大小
    resize(w, h) {
      this.kline.resize(w, h);
    },

    // 设置交易品种
    setSymbol(symbol, symbolName) {
      this.kline.setSymbol(symbol, symbolName);
    },

    // 设置主题
    setTheme(style) {
      this.kline.setTheme(style);
    },

    // 设置语言
    setLanguage(lang) {
      this.kline.setLanguage(lang);
    },

    // 设置请求间隔时间(ms)
    setIntervalTime(intervalTime) {
      this.kline.setIntervalTime(intervalTime);
    },

    // 设置深度图宽度
    onRangeChange(range) {
      this.$emit("refreshKlineData", range);
      return range;
    },

    // 聚合时间改变时触发(ms)
    onRequestData(param, callback) {
      let data = this.klineData;
      callback(data);
    }

  }
};
/* harmony default export */ var mainvue_type_script_lang_js_ = (VueKline);
// CONCATENATED MODULE: ./components/kline/main.vue?vue&type=script&lang=js&
 /* harmony default export */ var kline_mainvue_type_script_lang_js_ = (mainvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./components/kline/main.vue
var render, staticRenderFns




/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  kline_mainvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "2e0c9e96"
  
)

/* harmony default export */ var kline_main = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=kline-main.js.map