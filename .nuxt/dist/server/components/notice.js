exports.ids = [37];
exports.modules = {

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(193);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("7ba83de9", content, true, context)
};

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Notice_vue_vue_type_style_index_0_rel_stylesheet_2Fscss_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(161);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Notice_vue_vue_type_style_index_0_rel_stylesheet_2Fscss_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Notice_vue_vue_type_style_index_0_rel_stylesheet_2Fscss_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Notice_vue_vue_type_style_index_0_rel_stylesheet_2Fscss_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Notice_vue_vue_type_style_index_0_rel_stylesheet_2Fscss_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".bk09{\n  background-color:#09b67d\n}\n.bk10{\n  background:#b8babb!important;\n  background-color:#b8babb!important\n}\n.bk19{\n  background-color:#f7f7f7\n}\n.bk29{\n  background-color:#fff\n}\n.bk34{\n  background-color:#a3acbd\n}\n.bk52{\n  background-color:#333\n}\n.bk62{\n  background-color:#0b1821\n}\n.bk88{\n  background-color:#02ad8f\n}\n.bk112{\n  background-color:#131722\n}\n.bk113{\n  background-color:#02ad8f\n}\n.bk114{\n  background-color:#222e3e\n}\n.bk117{\n  background-color:#08050c\n}\n.bk121{\n  background-color:#13181a\n}\n.bk122{\n  background-color:#162229\n}\n.cl08{\n  color:#aa5369\n}\n.cl09{\n  color:#09b67d\n}\n.cl23{\n  color:#5c5c5c\n}\n.cl24{\n  color:#858585\n}\n.cl25{\n  color:#adadad\n}\n.cl29{\n  color:#fff\n}\n.cl52{\n  color:#333\n}\n.cl75{\n  color:#959595\n}\n.cl77{\n  color:#cd332d\n}\n.cl88{\n  color:#02ad8f\n}\n.cl110{\n  color:#4adb62\n}\n.cl113{\n  color:#02ad8f\n}\n.cl123{\n  color:#c1d3df\n}\n.cl125{\n  color:#707d8f\n}\n.cl127{\n  color:#08b67e\n}\n.cl128{\n  color:#d5742c\n}\n.cl_buy{\n  color:#03bf7b\n}\n.cl_sell{\n  color:#eb4d5c\n}\n.br-cl09{\n  border:1px solid #09b67d\n}\n.br-cl13{\n  border:1px solid #47545c\n}\n.br-cl72{\n  border:1px solid #ededed\n}\n.tl{\n  text-align:left\n}\n.tc{\n  text-align:center\n}\n.tr{\n  text-align:right\n}\n.fl{\n  float:left\n}\n.fr{\n  float:right\n}\n.hover-cl09:hover{\n  cursor:pointer;\n  color:#09b67d\n}\n.OTCNotice{\n  position:absolute;\n  overflow:hidden;\n  z-index:999;\n  width:100%;\n  height:40px;\n  line-height:40px;\n  bottom:0\n}\n.OTCNotice .OTCNotice-Content{\n  width:1200px;\n  margin:0 auto\n}\n.OTCNotice .OTCNotice-Content .marquee_box{\n  display:block;\n  position:relative;\n  height:40px;\n  overflow:hidden\n}\n.OTCNotice .OTCNotice-Content .marquee_box .marquee_top{\n  transition:all .5s;\n  margin-top:-40px\n}\n.OTCNotice .OTCNotice-Content .marquee_box .marquee_list{\n  display:block;\n  position:absolute;\n  top:0;\n  left:0\n}\n.OTCNotice .OTCNotice-Content .marquee_box .marquee_list li{\n  height:40px;\n  line-height:40px;\n  padding-left:20px\n}\n.OTCNotice .OTCNotice-Content .marquee_box .marquee_list li a{\n  display:block\n}\n.OTCNotice .OTCNotice-Content img{\n  display:block;\n  float:left;\n  margin:12px auto;\n  width:16px\n}\n.OTCNotice .OTCNotice-Content .NoticeMarquee{\n  display:block;\n  float:left;\n  height:28px;\n  line-height:28px;\n  width:720px;\n  padding-left:20px\n}\n.OTCNotice .OTCNotice-Content .NoticeMarquee a{\n  display:block\n}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Notice.vue?vue&type=template&id=cc07cb14&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[_vm._ssrNode("<section class=\"OTCNotice w-1200 mx-auto bk222E4B\">","</section>",[_vm._ssrNode("<section class=\"OTCNotice-Content\">","</section>",[_vm._ssrNode("<div class=\"flex items-center justify-between\">","</div>",[_vm._ssrNode("<img src=\"/svg/tongzhi.svg\" alt> "),_vm._ssrNode("<div class=\"marquee_box flex-1\">","</div>",[_c('marquee',{staticClass:"clffffff"},[_vm._v("近期因hpool官方对矿池异常账户进行清理，是为解决双挖、假算力、网络DDOS攻击等问题，从而确保矿工的利益。在此期间hpool矿池的提现速度降低，请各位会员稍多等待一段时间，给各位带来的不便，敬请谅解。")])],1)],2)])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/Notice.vue?vue&type=template&id=cc07cb14&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Notice.vue?vue&type=script&lang=js&
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
/* harmony default export */ var Noticevue_type_script_lang_js_ = ({
  name: 'Notice',
  components: {},

  data() {
    return {
      // MyOrderPageSize: 4,// 订单分页数
      MyOrderPageSize: 10,
      // 订单分页数
      // MyOrderPageState: false,// 订单是否分页
      MyOrderPageState: true,
      // 订单是否分页
      animate: false,
      locale: this.$store.state.locale,
      NoticeList: [{
        id: 1,
        title: "公告1"
      }, {
        id: 2,
        title: "公告2"
      }],
      // 广告列表
      pageNum: 1,
      PageSize: 10
    };
  },

  created() {},

  mounted() {
    this.$nextTick(() => {
      setInterval(this.showMarquee, 10000); // this.InitData()
    });
  },

  methods: {
    InitData() {
      this.listByState();
    },

    listByState() {
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.PageSize
      };
      this.$api.Footer.listByState(obj).then(res => {
        if (res && res.data.code == 200) {
          this.NoticeList = res.data.data.items;
        }
      });
    },

    showMarquee() {
      this.animate = true;
      setTimeout(() => {
        this.NoticeList.push(this.NoticeList[0]);
        this.NoticeList.shift();
        this.animate = false;
      }, 500);
    }

  }
});
// CONCATENATED MODULE: ./components/Notice.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Noticevue_type_script_lang_js_ = (Noticevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./components/Notice.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(192)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Noticevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "66767178"
  
)

/* harmony default export */ var Notice = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=notice.js.map