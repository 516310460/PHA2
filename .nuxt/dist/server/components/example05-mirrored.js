exports.ids = [5];
exports.modules = {

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(261);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("59d34d70", content, true, context)
};

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Example05Mirrored_vue_vue_type_style_index_0_id_7971beb0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(218);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Example05Mirrored_vue_vue_type_style_index_0_id_7971beb0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Example05Mirrored_vue_vue_type_style_index_0_id_7971beb0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Example05Mirrored_vue_vue_type_style_index_0_id_7971beb0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_nuxt_postcss8_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_nuxt_postcss8_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Example05Mirrored_vue_vue_type_style_index_0_id_7971beb0_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".vue-grid-layout[data-v-7971beb0]{\n  background:#eee\n}\n.vue-grid-item[data-v-7971beb0]:not(.vue-grid-placeholder){\n  background:#ccc;\n  border:1px solid #000\n}\n.vue-grid-item .resizing[data-v-7971beb0]{\n  opacity:.9\n}\n.vue-grid-item .static[data-v-7971beb0]{\n  background:#cce\n}\n.vue-grid-item .text[data-v-7971beb0]{\n  font-size:24px;\n  text-align:center;\n  position:absolute;\n  top:0;\n  bottom:0;\n  left:0;\n  right:0;\n  margin:auto\n}\n.vue-grid-item .no-drag[data-v-7971beb0],.vue-grid-item .text[data-v-7971beb0]{\n  height:100%;\n  width:100%\n}\n.vue-grid-item .minMax[data-v-7971beb0]{\n  font-size:12px\n}\n.vue-grid-item .add[data-v-7971beb0]{\n  cursor:pointer\n}\n.vue-draggable-handle[data-v-7971beb0]{\n  position:absolute;\n  width:20px;\n  height:20px;\n  top:0;\n  left:0;\n  padding:0 8px 8px 0;\n  background-origin:content-box;\n  background-color:#000;\n  box-sizing:border-box;\n  border-radius:10px;\n  cursor:pointer\n}\n.eventsJSON[data-v-7971beb0],.layoutJSON[data-v-7971beb0]{\n  background:#ddd;\n  border:1px solid #000;\n  margin-top:10px;\n  padding:10px\n}\n.eventsJSON[data-v-7971beb0]{\n  height:100px;\n  overflow-y:scroll\n}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Example05Mirrored.vue?vue&type=template&id=7971beb0&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('grid-layout',{attrs:{"layout":_vm.layout,"col-num":12,"row-height":30,"is-draggable":true,"is-resizable":true,"vertical-compact":true,"use-css-transforms":true},on:{"update:layout":function($event){_vm.layout=$event},"layout-created":_vm.layoutCreatedEvent,"layout-before-mount":_vm.layoutBeforeMountEvent,"layout-mounted":_vm.layoutMountedEvent,"layout-ready":_vm.layoutReadyEvent,"layout-updated":_vm.layoutUpdatedEvent}},_vm._l((_vm.layout),function(item,index){return _c('grid-item',{key:index,attrs:{"x":item.x,"y":item.y,"w":item.w,"h":item.h,"i":item.i,"drag-allow-from":".vue-draggable-handle","drag-ignore-from":".no-drag"},on:{"resize":_vm.resizeEvent,"move":_vm.moveEvent,"resized":_vm.resizedEvent,"container-resized":_vm.containerResizedEvent,"moved":_vm.movedEvent}},[_c('div',{staticClass:"text"},[_c('div',{staticClass:"vue-draggable-handle"}),_vm._v(" "),_c('div',{staticClass:"no-drag"},[_c('span',[_vm._v(_vm._s(item.i))])])])])}),1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/Example05Mirrored.vue?vue&type=template&id=7971beb0&scoped=true&

// EXTERNAL MODULE: external "vue-grid-layout"
var external_vue_grid_layout_ = __webpack_require__(138);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Example05Mirrored.vue?vue&type=script&lang=js&
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

/* harmony default export */ var Example05Mirroredvue_type_script_lang_js_ = ({
  components: {
    GridLayout: external_vue_grid_layout_["GridLayout"],
    GridItem: external_vue_grid_layout_["GridItem"]
  },

  data() {
    return {
      layout: [{
        h: 2,
        i: '0',
        w: 8,
        x: 0,
        y: 0
      }, {
        h: 15,
        i: '1',
        w: 2,
        x: 8,
        y: 0
      }, {
        h: 15,
        i: '2',
        w: 2,
        x: 10,
        y: 0
      }, {
        h: 13,
        i: '3',
        w: 2,
        x: 0,
        y: 2
      }, {
        h: 13,
        i: '4',
        w: 6,
        x: 2,
        y: 2
      }, {
        h: 7,
        i: '5',
        w: 8,
        x: 0,
        y: 15
      }, {
        h: 7,
        i: '6',
        w: 4,
        x: 8,
        y: 15
      }],
      draggable: true,
      resizable: true,
      index: 0,
      eventLog: []
    };
  },

  // watch: {
  //     eventLog: function() {
  //         const eventsDiv = this.$refs.eventsDiv;
  //         eventsDiv.scrollTop = eventsDiv.scrollHeight;
  //     }
  // },
  mounted() {
    this.$nextTick(() => {// this.layout = this.$store.state.layout
      // console.log(this.$store.state.layout)
      // setTimeout(()=>{
      //   this.layout = [{"x":0,"y":0,"w":6,"h":3,"i":"0","moved":false},{"x":2,"y":3,"w":2,"h":4,"i":"1","moved":false},{"x":4,"y":3,"w":2,"h":5,"i":"2","moved":false},{"x":6,"y":0,"w":2,"h":3,"i":"3","moved":false},{"x":8,"y":0,"w":2,"h":3,"i":"4","moved":false},{"x":10,"y":0,"w":2,"h":3,"i":"5","moved":false},{"x":0,"y":3,"w":2,"h":5,"i":"6","moved":false},{"x":2,"y":7,"w":2,"h":5,"i":"7","moved":false},{"x":4,"y":8,"w":2,"h":5,"i":"8","moved":false},{"x":6,"y":3,"w":2,"h":4,"i":"9","moved":false},{"x":8,"y":3,"w":2,"h":4,"i":"10","moved":false},{"x":10,"y":3,"w":2,"h":4,"i":"11","moved":false},{"x":0,"y":11,"w":2,"h":5,"i":"12","moved":false},{"x":2,"y":14,"w":2,"h":5,"i":"13","moved":false},{"x":4,"y":13,"w":2,"h":4,"i":"14","moved":false},{"x":6,"y":7,"w":2,"h":4,"i":"15","moved":false},{"x":8,"y":7,"w":2,"h":5,"i":"16","moved":false},{"x":10,"y":7,"w":2,"h":2,"i":"17","moved":false},{"x":0,"y":8,"w":2,"h":3,"i":"18","moved":false},{"x":2,"y":12,"w":2,"h":2,"i":"19","moved":false}]
      // }, 3000)
      // console.log(JSON.stringify(this.$store.state.layout))
    });
  },

  methods: {
    moveEvent: function (i, newX, newY) {
      const msg = 'MOVE i=' + i + ', X=' + newX + ', Y=' + newY; // console.log(msg);
    },
    movedEvent: function (i, newX, newY) {
      const msg = 'MOVED i=' + i + ', X=' + newX + ', Y=' + newY; // console.log(msg);
    },
    resizeEvent: function (i, newH, newW, newHPx, newWPx) {
      const msg = 'RESIZE i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx; // console.log(msg);
    },
    resizedEvent: function (i, newX, newY, newHPx, newWPx) {
      const msg = 'RESIZED i=' + i + ', X=' + newX + ', Y=' + newY + ', H(px)=' + newHPx + ', W(px)=' + newWPx; // console.log(msg);
    },
    containerResizedEvent: function (i, newH, newW, newHPx, newWPx) {
      const msg = 'CONTAINER RESIZED i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx; // console.log(msg);
    },
    layoutCreatedEvent: function (newLayout) {// console.log("Created layout: ", newLayout)
    },
    layoutBeforeMountEvent: function (newLayout) {// console.log("beforeMount layout: ", newLayout)
    },
    layoutMountedEvent: function (newLayout) {// console.log("Mounted layout: ", newLayout)
    },
    layoutReadyEvent: function (newLayout) {// console.log("Ready layout: ", newLayout)
    },
    layoutUpdatedEvent: function (newLayout) {
      console.log(newLayout); // console.log("Updated layout: ", newLayout)
      // this.$store.commit("set_layout", newLayout)
    }
  }
});
// CONCATENATED MODULE: ./components/Example05Mirrored.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Example05Mirroredvue_type_script_lang_js_ = (Example05Mirroredvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./components/Example05Mirrored.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(260)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Example05Mirroredvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "7971beb0",
  "d199a71e"
  
)

/* harmony default export */ var Example05Mirrored = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=example05-mirrored.js.map