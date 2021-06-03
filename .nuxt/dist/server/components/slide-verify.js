exports.ids = [42];
exports.modules = {

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(263);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("e64c0c3a", content, true, context)
};

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlideVerify_vue_vue_type_style_index_0_id_8cb765a6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(219);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlideVerify_vue_vue_type_style_index_0_id_8cb765a6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlideVerify_vue_vue_type_style_index_0_id_8cb765a6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlideVerify_vue_vue_type_style_index_0_id_8cb765a6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SlideVerify_vue_vue_type_style_index_0_id_8cb765a6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".slide-verify[data-v-8cb765a6]{\n  position:relative;\n  width:310px;\n  overflow:hidden\n}\n.slide-verify-block[data-v-8cb765a6]{\n  position:absolute;\n  left:0;\n  top:0\n}\n.slide-verify-refresh-icon[data-v-8cb765a6]{\n  position:absolute;\n  right:0;\n  top:0;\n  width:34px;\n  height:34px;\n  cursor:pointer;\n  content:\"刷新\";\n  font-size:22px;\n  line-height:34px;\n  text-align:center;\n  font-weight:700;\n  color:#3fdeae;\n  background-size:34px 471px\n}\n.slide-verify-refresh-icon[data-v-8cb765a6]:hover{\n  transform:rotate(180deg);\n  transition:all .2s ease-in-out\n}\n.slide-verify-slider[data-v-8cb765a6]{\n  position:relative;\n  text-align:center;\n  width:310px;\n  height:40px;\n  line-height:40px;\n  margin-top:15px;\n  background:#f7f9fa;\n  color:#45494c;\n  border:1px solid #e4e7eb\n}\n.slide-verify-slider-mask[data-v-8cb765a6]{\n  position:absolute;\n  left:0;\n  top:0;\n  height:40px;\n  border:0 solid #1991fa;\n  background:#d1e9fe\n}\n.slide-verify-info[data-v-8cb765a6]{\n  position:absolute;\n  top:170px;\n  left:0;\n  height:30px;\n  width:350px;\n  color:#fff;\n  text-align:center;\n  line-height:30px;\n  background-color:#52ccba;\n  opacity:0\n}\n.slide-verify-info.fail[data-v-8cb765a6]{\n  background-color:#f57a7a\n}\n.slide-verify-info.show[data-v-8cb765a6]{\n  -webkit-animation:hide-data-v-8cb765a6 1s ease;\n          animation:hide-data-v-8cb765a6 1s ease\n}\n@-webkit-keyframes hide-data-v-8cb765a6{\n0%{\n    opacity:0\n}\nto{\n    opacity:.9\n}\n}\n@keyframes hide-data-v-8cb765a6{\n0%{\n    opacity:0\n}\nto{\n    opacity:.9\n}\n}\n.slide-verify-slider-mask-item[data-v-8cb765a6]{\n  position:absolute;\n  top:0;\n  left:0;\n  width:38px;\n  height:38px;\n  background:#fff;\n  box-shadow:0 0 3px rgba(0,0,0,.3);\n  cursor:pointer;\n  transition:background .2s linear\n}\n.slide-verify-slider-mask-item[data-v-8cb765a6]:hover{\n  background:#1991fa\n}\n.slide-verify-slider-mask-item:hover .slide-verify-slider-mask-item-icon[data-v-8cb765a6]{\n  background-position:0 -13px\n}\n.slide-verify-slider-mask-item-icon[data-v-8cb765a6]{\n  position:absolute;\n  top:9px;\n  left:7px;\n  width:14px;\n  height:12px;\n  content:\"法币\";\n  font-size:22px;\n  color:#ddd\n}\n.container-active .slide-verify-slider-mask-item[data-v-8cb765a6]{\n  height:38px;\n  top:-1px;\n  border:1px solid #1991fa\n}\n.container-active .slide-verify-slider-mask[data-v-8cb765a6]{\n  height:38px;\n  border-width:1px\n}\n.container-success .slide-verify-slider-mask-item[data-v-8cb765a6]{\n  height:38px;\n  top:-1px;\n  border:1px solid #52ccba;\n  background-color:#52ccba!important\n}\n.container-success .slide-verify-slider-mask[data-v-8cb765a6]{\n  height:38px;\n  border:1px solid #52ccba;\n  background-color:#d2f4ef\n}\n.container-success .slide-verify-slider-mask-item-icon[data-v-8cb765a6]{\n  background-position:0 0!important\n}\n.container-fail .slide-verify-slider-mask-item[data-v-8cb765a6]{\n  height:38px;\n  top:-1px;\n  border:1px solid #f57a7a;\n  background-color:#f57a7a!important\n}\n.container-fail .slide-verify-slider-mask[data-v-8cb765a6]{\n  height:38px;\n  border:1px solid #f57a7a;\n  background-color:#fce1e1\n}\n.container-fail .slide-verify-slider-mask-item-icon[data-v-8cb765a6]{\n  top:14px;\n  background-position:0 -82px!important\n}\n.container-active .slide-verify-slider-text[data-v-8cb765a6],.container-fail .slide-verify-slider-text[data-v-8cb765a6],.container-success .slide-verify-slider-text[data-v-8cb765a6]{\n  display:none\n}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/SlideVerify.vue?vue&type=template&id=8cb765a6&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"slide-verify",style:(_vm.widthlable),attrs:{"id":"slideVerify","onselectstart":"return false;"}},[_vm._ssrNode("<canvas"+(_vm._ssrAttr("width",_vm.w))+(_vm._ssrAttr("height",_vm.h))+" data-v-8cb765a6></canvas> <canvas"+(_vm._ssrAttr("width",_vm.w))+(_vm._ssrAttr("height",_vm.h))+" class=\"slide-verify-block\" data-v-8cb765a6></canvas> <div class=\"slide-verify-refresh-icon el-icon-refresh\" data-v-8cb765a6></div> <div"+(_vm._ssrClass("slide-verify-info",{fail: _vm.fail, show: _vm.showInfo}))+" data-v-8cb765a6>"+_vm._ssrEscape(_vm._s(_vm.infoText))+"</div> <div"+(_vm._ssrClass("slide-verify-slider",{'container-active': _vm.containerActive, 'container-success': _vm.containerSuccess, 'container-fail': _vm.containerFail}))+(_vm._ssrStyle(null,_vm.widthlable, null))+" data-v-8cb765a6><div class=\"slide-verify-slider-mask\""+(_vm._ssrStyle(null,{width: _vm.sliderMaskWidth}, null))+" data-v-8cb765a6><div class=\"slide-verify-slider-mask-item\""+(_vm._ssrStyle(null,{left: _vm.sliderLeft}, null))+" data-v-8cb765a6><div class=\"slide-verify-slider-mask-item-icon el-icon-s-unfold\" data-v-8cb765a6></div></div></div> <span class=\"slide-verify-slider-text\" data-v-8cb765a6>"+_vm._ssrEscape(_vm._s(_vm.sliderText))+"</span></div>")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/SlideVerify.vue?vue&type=template&id=8cb765a6&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/SlideVerify.vue?vue&type=script&lang=js&
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
function sum(x, y) {
  return x + y;
}

function square(x) {
  return x * x;
}

/* harmony default export */ var SlideVerifyvue_type_script_lang_js_ = ({
  name: 'SlideVerify',
  props: {
    // block length
    l: {
      type: Number,
      default: 42
    },
    // block radius
    r: {
      type: Number,
      default: 10
    },
    // canvas width
    w: {
      // 背景图宽
      type: [Number, String],
      default: 350
    },
    // canvas height
    h: {
      // 背景图高
      type: [Number, String],
      default: 200
    },
    // canvas width
    sw: {
      // 小图宽
      type: [Number, String],
      default: 50
    },
    // canvas height
    sh: {
      type: [Number, String],
      default: 50
    },
    // block_x: {
    //   type: Number,
    //   default: 155
    // },
    blocky: {
      // 小图初始的垂直距离
      type: [Number, String],
      default: 20
    },
    sliderText: {
      type: String,
      default: 'Slide filled right'
    },
    imgurl: {
      // 大图地址
      type: String,
      default: ''
    },
    miniimgurl: {
      // 小图地址
      type: String,
      default: ''
    },
    fresh: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      containerActive: false,
      // container active class
      containerSuccess: false,
      // container success class
      containerFail: false,
      // container fail class
      canvasCtx: null,
      blockCtx: null,
      block: null,
      canvasStr: null,
      // block_x: undefined, // container random position
      // blocky: undefined,
      L: this.l + this.r * 2 + 3,
      // block real lenght
      img: undefined,
      originX: undefined,
      originY: undefined,
      isMouseDown: false,
      trail: [],
      widthlable: '',
      sliderLeft: 0,
      // block right offset
      sliderMaskWidth: 0,
      // mask width
      dialogVisible: false,
      infoText: '验证成功',
      fail: false,
      showInfo: false
    };
  },

  watch: {
    fresh(val) {
      if (val) {
        this.init();
      }
    }

  },

  mounted() {
    // 随机生成数this.block_x =
    this.init();
  },

  methods: {
    init() {
      this.initDom();
      this.bindEvents();
      this.widthlable = 'width:' + this.w + 'px;';
    },

    initDom() {
      this.block = this.$refs.block;
      this.canvasStr = this.$refs.canvas;
      this.canvasCtx = this.canvasStr.getContext('2d');
      this.blockCtx = this.block.getContext('2d');
      this.initImg();
    },

    initImg(h) {
      var that = this;
      const img = document.createElement('img');
      img.onload = onload;

      img.onerror = () => {
        img.src = that.imgurl;
      };

      img.src = that.imgurl;

      img.onload = function () {
        that.canvasCtx.drawImage(img, 0, 0, that.w, that.h);
      };

      this.img = img;
      const img1 = document.createElement('img');
      var blockCtx = that.blockCtx;
      var blocky = h || that.blocky;

      if (blocky === 0) {
        return;
      }

      img1.onerror = () => {
        img1.src = that.miniimgurl;
      };

      img1.src = that.miniimgurl;

      img1.onload = function () {
        // blockCtx.drawImage(img1, 0, blocky, that.sw, that.sh)
        blockCtx.drawImage(img1, 0, blocky, 55, 45);
      }; // console.log(777, h)

    },

    // 刷新
    refresh() {
      this.$emit('refresh');
    },

    sliderDown(event) {
      this.originX = event.clientX;
      this.originY = event.clientY;
      this.isMouseDown = true;
    },

    touchStartEvent(e) {
      this.originX = e.changedTouches[0].pageX;
      this.originY = e.changedTouches[0].pageY;
      this.isMouseDown = true;
    },

    bindEvents() {
      document.addEventListener('mousemove', e => {
        if (!this.isMouseDown) return false;
        const moveX = e.clientX - this.originX;
        const moveY = e.clientY - this.originY;
        if (moveX < 0 || moveX + 38 >= this.w) return false;
        this.sliderLeft = moveX + 'px';
        const blockLeft = (this.w - 40 - 20) / (this.w - 40) * moveX;
        this.block.style.left = blockLeft + 'px';
        this.containerActive = true; // add active

        this.sliderMaskWidth = moveX + 'px';
        this.trail.push(moveY);
      }, {
        passive: true
      });
      document.addEventListener('mouseup', e => {
        if (!this.isMouseDown) return false;
        this.isMouseDown = false;
        if (e.clientX === this.originX) return false;
        this.containerActive = false; // remove active

        this.verify();
      }, {
        passive: true
      });
    },

    touchMoveEvent(e) {
      if (!this.isMouseDown) return false;
      const moveX = e.changedTouches[0].pageX - this.originX;
      const moveY = e.changedTouches[0].pageY - this.originY;
      if (moveX < 0 || moveX + 38 >= this.w) return false;
      this.sliderLeft = moveX + 'px';
      const blockLeft = (this.w - 40 - 20) / (this.w - 40) * moveX;
      this.block.style.left = blockLeft + 'px';
      this.containerActive = true;
      this.sliderMaskWidth = moveX + 'px';
      this.trail.push(moveY);
    },

    touchEndEvent(e) {
      if (!this.isMouseDown) return false;
      this.isMouseDown = false;
      if (e.changedTouches[0].pageX === this.originX) return false;
      this.containerActive = false;
      this.verify();
    },

    verify() {
      const arr = this.trail; // drag y move distance

      const average = arr.reduce(sum) / arr.length; // average

      const deviations = arr.map(x => x - average); // deviation array

      const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length); // standard deviation

      const left = parseInt(this.block.style.left);
      this.$emit('success', left, stddev);
    },

    reset(h) {
      this.containerActive = false;
      this.containerSuccess = false;
      this.containerFail = false;
      this.sliderLeft = 0;
      this.block.style.left = 0;
      this.sliderMaskWidth = 0;
      this.canvasCtx.clearRect(0, 0, this.w, this.h);
      this.blockCtx.clearRect(0, 0, this.w, this.h);
      this.fail = false;
      this.showInfo = false;
      this.containerFail = false;
      this.containerSuccess = false;
      this.initImg(h);
    },

    handleFail() {
      this.fail = true;
      this.showInfo = true;
      this.infoText = '验证失败';
      this.containerFail = true; // console.log(6666)
      // setTimeout(() => {
      //   this.block.style.left = 0
      //   this.sliderMaskWidth = 0
      //   this.sliderLeft = 0
      //   this.fail = false
      //   this.showInfo = false
      //   this.containerFail = false
      // }, 800)
    },

    handleSuccess() {
      // console.log(777)
      this.showInfo = true;
      this.infoText = '验证成功';
      this.containerSuccess = true;
      setTimeout(() => {
        this.block.style.left = 0;
        this.sliderMaskWidth = 0;
        this.sliderLeft = 0;
        this.fail = false;
        this.showInfo = false;
        this.containerSuccess = false;
      }, 1000);
    }

  }
});
// CONCATENATED MODULE: ./components/SlideVerify.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SlideVerifyvue_type_script_lang_js_ = (SlideVerifyvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./components/SlideVerify.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(262)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SlideVerifyvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "8cb765a6",
  "23d7bc64"
  
)

/* harmony default export */ var SlideVerify = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=slide-verify.js.map