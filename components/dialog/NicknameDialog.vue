<template>
    <el-dialog
      :visible.sync="visible"
      @close="$emit('update:nicknameDialogVisible', false)"
      append-to-body
      :before-close="handleClose"
      title="设置昵称"
      width="480px"
      class="new-dialog"
    >
    <div class="mb-6 cl454545">请设置您的账号昵称，建议不要使用真实姓名。</div>
    <el-form
        :model="ruleFormNickname"
        :rules="rulesNickname"
        ref="ruleFormNickname"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item prop="nickname">
          <label for="">昵称</label>
          <el-input
            v-model="ruleFormNickname.nickname"
            placeholder="请设置昵称"
            type="text"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item class="mt-12">
          <el-button class="w-full" @click="submitForm('ruleFormNickname')" type="primary">设置昵称</el-button>
        </el-form-item>
    </el-form>
    </el-dialog>
</template>

<script>
  export default {
    props: {
      nicknameDialogVisible: {
        type: Boolean,
        default: false,
      },
      content: {
        type: String,
        default: '未知错误',
      },
    },
    data() {
      return {
        visible:this.nicknameDialogVisible,
        ruleFormNickname:{
          nickname:''
        },
        rulesNickname:{
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
        },
      }
    },
    watch: {
      nicknameDialogVisible() {
        this.visible = this.nicknameDialogVisible
      },
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.setNickname()
          } else {
            return false;
          }
        });
      },
      //设置昵称
      setNickname(){
        this.$api.User.UpdateNickname(this.ruleFormNickname).then(res => {
          if (res.isSuccess) {
            this.$message.success("设置成功");
            this.nicknameDialogVisible = false;
          }
        })
      },
      handleClose(){
        this.$emit('close-dialog', false)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>