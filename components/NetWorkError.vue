<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    class="text-center OfflineDialog"
    width="980px">
    <span slot="title">
      <div class="fs20">
        <span class="relative t-1 clffffff">正在重新连接网络......</span>
      </div>
      <div class="NetError"></div>
    </span>
    <img class="mx-auto w310 mt50" src="/img/NetError.png" alt="">
    <p class="mt35 cl000000 fs16 pb-12">网络已断开别着急，马上回来~~</p>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: true
    }
  },
}
</script>