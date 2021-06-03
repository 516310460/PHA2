exports.ids = [40];
exports.modules = {

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(183);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("792d0654", content, true, context)
};

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Popper_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(147);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Popper_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Popper_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Popper_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Popper_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".myPopper{\n  position:absolute;\n  z-index:20000;\n  box-sizing:border-box;\n  padding:10px 0;\n  display:none;\n  margin:3px 0\n}\n.popper-inner{\n  background:#f6f6f6;\n  border:1px solid #DCDDDF;\n  box-shadow:0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);\n  height:100%;\n  box-sizing:border-box;\n  padding:5px;\n  overflow:auto;\n  border-radius:4px\n}\n.popper-triangle{\n  position:absolute;\n  z-index:2;\n  width:0;\n  height:0\n}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/selectSearch/Popper.vue?vue&type=template&id=6c3f64fa&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"myPopper",on:{"mousedown":function($event){$event.stopPropagation();}}},[_vm._ssrNode("<div class=\"popper-inner\">","</div>",[_vm._t("default")],2),_vm._ssrNode(" <div></div>")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/selectSearch/Popper.vue?vue&type=template&id=6c3f64fa&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/selectSearch/Popper.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
/* harmony default export */ var Poppervue_type_script_lang_js_ = ({
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    maxHt: {
      type: Number,
      default: 400
    },
    width: {
      type: Number,
      default: -1
    }
  },

  data() {
    return {};
  },

  mounted() {
    //要求父元素的大小和父元素的input输入框的大小一致
    let pt = this.$parent.$el;
    let el = this.$el;
    let docElm = document.documentElement;
    let body = document.body; //pt.removeChild(el);

    body.appendChild(el); // 组件监听页面resize只能用addEventListener，否则不会生效

    window.addEventListener('resize', this.checkTransfer, false); // 监听scroll事件的事件传递必须使用捕获阶段，让外部元素事件先触发

    document.addEventListener('scroll', this.checkTransfer, true);
  },

  watch: {
    visible: function (val) {
      if (val) {
        let list = document.querySelectorAll('.myPopper');

        for (let i = 0; i < list.length; i++) {
          list[i].style.display = 'none';
        }

        let pt = this.$parent.$el;
        let rect = pt.getBoundingClientRect();
        let _w = document.documentElement.clientWidth;
        let _h = document.documentElement.clientHeight;
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        let scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
        let top = rect.top;
        let bottom = _h - rect.bottom;
        let left = rect.left;
        let width = rect.width;

        if (bottom > top) {
          let maxht = bottom < this.maxHt ? bottom : this.maxHt;
          this.$el.style.cssText = 'max-height:' + maxht + 'px;width:' + (this.width == -1 ? width : this.width) + 'px;left:' + left + 'px;top:' + rect.bottom + 'px;display:block;'; //   this.$refs.tri.style.cssText =
          //     'border-width:6px;border-color:transparent;border-style:solid;left:20px;top:-1px;border-bottom-color:#DCDDDF'
        } else {
          let maxht = top < this.maxHt ? top : this.maxHt;
          this.$el.style.cssText = 'max-height:' + maxht + 'px;width:' + (this.width == -1 ? width : this.width) + 'px;left:' + left + 'px;bottom:' + (bottom - -rect.height) + 'px;display:block'; //   this.$refs.tri.style.cssText =
          //     'border-width:6px;border-color:transparent;border-style:solid;left:20px;bottom:-1px;border-top-color:#DCDDDF;'
        }
      } else {
        this.$el.style.display = 'none';
      }
    }
  },
  methods: {
    checkTransfer() {
      if (this.visible) {
        let list = document.querySelectorAll('.myPopper');

        for (let i = 0; i < list.length; i++) {
          list[i].style.display = 'none';
        }

        let pt = this.$parent.$el;
        let rect = pt.getBoundingClientRect();
        let _w = document.documentElement.clientWidth;
        let _h = document.documentElement.clientHeight;
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        let scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
        let top = rect.top;
        let bottom = _h - rect.bottom;
        let left = rect.left;
        let width = rect.width;

        if (bottom > top) {
          let maxht = bottom < this.maxHt ? bottom : this.maxHt;
          this.$el.style.cssText = 'max-height:' + maxht + 'px;width:' + (this.width == -1 ? width : this.width) + 'px;left:' + left + 'px;top:' + rect.bottom + 'px;display:block;'; //   this.$refs.tri.style.cssText =
          //     'border-width:6px;border-color:transparent;border-style:solid;left:20px;top:-1px;border-bottom-color:#DCDDDF'
        } else {
          let maxht = top < this.maxHt ? top : this.maxHt;
          this.$el.style.cssText = 'max-height:' + maxht + 'px;width:' + (this.width == -1 ? width : this.width) + 'px;left:' + left + 'px;bottom:' + (bottom - -rect.height) + 'px;display:block'; //   this.$refs.tri.style.cssText =
          //     'border-width:6px;border-color:transparent;border-style:solid;left:20px;bottom:-1px;border-top-color:#DCDDDF;'
        }
      } else {
        this.$el.style.display = 'none';
      }
    }

  },

  beforeDestory() {
    document.body.removeChild(this.$el);
  }

});
// CONCATENATED MODULE: ./components/selectSearch/Popper.vue?vue&type=script&lang=js&
 /* harmony default export */ var selectSearch_Poppervue_type_script_lang_js_ = (Poppervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./components/selectSearch/Popper.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(182)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  selectSearch_Poppervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "2ff2b5db"
  
)

/* harmony default export */ var Popper = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=select-search-popper.js.map