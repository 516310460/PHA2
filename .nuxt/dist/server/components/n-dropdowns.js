exports.ids = [36];
exports.modules = {

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/NDropdowns.vue?vue&type=template&id=3312b37e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"click-outside",rawName:"v-click-outside",value:(_vm.handleClickOutside),expression:"handleClickOutside"}],staticClass:"relative inline-block text-left"},[_vm._t("button"),_vm._ssrNode(" <div"+(_vm._ssrClass("origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 z-50",_vm.show ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95'))+"><div"+(_vm._ssrClass("py-1",_vm.show ? 'block' : 'hidden'))+">"+(_vm._ssrList((_vm.list),function(item,index){return ("<div"+(_vm._ssrClass("text-gray-700 block px-4 py-2 text-sm cursor-pointer",_vm.listIndex == index && 'bg-gray-100 text-gray-900'))+">"+_vm._ssrEscape(_vm._s(item.name))+"</div>")}))+"</div></div>")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/NDropdowns.vue?vue&type=template&id=3312b37e&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/NDropdowns.vue?vue&type=script&lang=js&
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
/* harmony default export */ var NDropdownsvue_type_script_lang_js_ = ({
  name: 'NDropdowns',
  props: {
    value: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: []
    },
    show: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      listIndex: 0
    };
  },

  methods: {
    clickList(item) {
      this.$emit("change", item);
    },

    handleClickOutside() {
      if (this.show) {
        this.$emit("change", '');
      }
    }

  }
});
// CONCATENATED MODULE: ./components/NDropdowns.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_NDropdownsvue_type_script_lang_js_ = (NDropdownsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./components/NDropdowns.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_NDropdownsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "7e315220"
  
)

/* harmony default export */ var NDropdowns = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=n-dropdowns.js.map