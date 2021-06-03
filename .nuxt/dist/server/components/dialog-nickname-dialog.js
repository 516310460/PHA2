exports.ids = [3];
exports.modules = {

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/dialog/NicknameDialog.vue?vue&type=template&id=4250ad03&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-dialog',{staticClass:"new-dialog",attrs:{"visible":_vm.visible,"append-to-body":"","before-close":_vm.handleClose,"title":"设置昵称","width":"480px"},on:{"update:visible":function($event){_vm.visible=$event},"close":function($event){return _vm.$emit('update:nicknameDialogVisible', false)}}},[_c('div',{staticClass:"mb-6 cl454545"},[_vm._v("请设置您的账号昵称，建议不要使用真实姓名。")]),_vm._v(" "),_c('el-form',{ref:"ruleFormNickname",staticClass:"demo-ruleForm",attrs:{"model":_vm.ruleFormNickname,"rules":_vm.rulesNickname,"label-width":"0"}},[_c('el-form-item',{attrs:{"prop":"nickname"}},[_c('label',{attrs:{"for":""}},[_vm._v("昵称")]),_vm._v(" "),_c('el-input',{attrs:{"placeholder":"请设置昵称","type":"text","maxlength":"20","show-word-limit":""},model:{value:(_vm.ruleFormNickname.nickname),callback:function ($$v) {_vm.$set(_vm.ruleFormNickname, "nickname", $$v)},expression:"ruleFormNickname.nickname"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"mt-12"},[_c('el-button',{staticClass:"w-full",attrs:{"type":"primary"},on:{"click":function($event){return _vm.submitForm('ruleFormNickname')}}},[_vm._v("设置昵称")])],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/dialog/NicknameDialog.vue?vue&type=template&id=4250ad03&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/dialog/NicknameDialog.vue?vue&type=script&lang=js&
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
/* harmony default export */ var NicknameDialogvue_type_script_lang_js_ = ({
  props: {
    nicknameDialogVisible: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: '未知错误'
    }
  },

  data() {
    return {
      visible: this.nicknameDialogVisible,
      ruleFormNickname: {
        nickname: ''
      },
      rulesNickname: {
        nickname: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }, {
          min: 2,
          max: 20,
          message: '长度在 2 到 20 个字符',
          trigger: 'blur'
        }]
      }
    };
  },

  watch: {
    nicknameDialogVisible() {
      this.visible = this.nicknameDialogVisible;
    }

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.setNickname();
        } else {
          return false;
        }
      });
    },

    //设置昵称
    setNickname() {
      this.$api.User.UpdateNickname(this.ruleFormNickname).then(res => {
        if (res.isSuccess) {
          this.$message.success("设置成功");
          this.nicknameDialogVisible = false;
        }
      });
    },

    handleClose() {
      this.$emit('close-dialog', false);
    }

  }
});
// CONCATENATED MODULE: ./components/dialog/NicknameDialog.vue?vue&type=script&lang=js&
 /* harmony default export */ var dialog_NicknameDialogvue_type_script_lang_js_ = (NicknameDialogvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./components/dialog/NicknameDialog.vue



function injectStyles (context) {
  
  
}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  dialog_NicknameDialogvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "4250ad03",
  "7ddf8f01"
  
)

/* harmony default export */ var NicknameDialog = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=dialog-nickname-dialog.js.map