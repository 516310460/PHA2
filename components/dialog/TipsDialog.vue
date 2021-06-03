<template>
  <div>
    <!-- 余额不足 -->
    <el-dialog
      :visible.sync="visible"
      @close="$emit('update:tipsVisible', false)"
      width="480px"
      class="balance-dialog"
    >
      <div class="flex justify-center">
        <img
          src="../../static/img/icons/icon_Tips.svg"
          alt=""
        />
      </div>
      <div class="text-center fs16 cl000000 mt-4">{{ content }}</div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class="w-full"
          type="primary"
          @click="visible = false"
        >我已知晓</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TipsDialog",
  props: {
    tipsVisible: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: '未知错误',
    },
  },
  data () {
    return {
      visible: this.tipsVisible,
    }
  },
  watch: {
    tipsVisible () {
      this.visible = this.tipsVisible
    },
  },
}
</script>

<style lang="scss" scoped>
// 余额不足
.balance-dialog {
  /deep/.el-dialog {
    border-radius: 5px;
  }
  /deep/.el-dialog__headerbtn {
    display: block;
    .el-dialog__close {
      color: #000000;
    }
  }
}
</style>