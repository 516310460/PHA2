<template>
  <div class="Footer bk0F182D">
    <div class="w-1200 mx-auto">
      <div class="flex items-start leading-10 w-full pt-20 pb-16 cl9FA9C0 border-b bc-co121D36">
        <div class="flex-1 text-center">
          <p class="fs18 clffffff">关于我们</p>
          <nuxt-link :to="`/about/index`">关于我们</nuxt-link>
          <p>职业机会</p>
          <p>商务联络</p>
          <p>
            <nuxt-link :to="`/${locale}/News/index`">币池动态</nuxt-link>
          </p>
          <p>
            <nuxt-link :to="`/${locale}/agreement/index`">服务协议</nuxt-link>
          </p>
        </div>
        <div class="flex-1 text-center">
          <p class="fs18 clffffff">产品</p>
          <p class="">关于我们</p>
          <p>职业机会</p>
          <p>商务联络</p>
          <p>币池动态</p>
          <p>服务协议</p>
        </div>
        <div class="flex-1 text-center">
          <p class="fs18 clffffff">服务</p>
          <p class="">关于我们</p>
          <p>
            <nuxt-link :to="`/transactionRules/Index`">交易规则</nuxt-link>
          </p>
          <p>商务联络</p>
          <p>币池动态</p>
          <p>
            <nuxt-link :to="`/information/index`">资讯中心</nuxt-link>
          </p>
        </div>
        <div class="flex-1 text-center">
          <p class="fs18 clffffff">帮助</p>
          <p class="">
            <nuxt-link :to="`/commonProblem/_index`">常见问题</nuxt-link>
          </p>
          <p class="mt-2">
            <nuxt-link :to="`/Help/Help`">帮助中心</nuxt-link>
          </p>
          <p>
            <nuxt-link :to="`/privacy/_index`">隐私声明</nuxt-link>
          </p>
          <p>
            <nuxt-link :to="`/Feedback/_index`">建议反馈</nuxt-link>
          </p>
          <p>币池动态</p>
          <p>服务协议</p>
        </div>
        <div class="flex-1 text-center">
          <p class="fs18 clffffff">社区</p>
          <p>
            <nuxt-link :to="`/community/index`">加入社区</nuxt-link>
          </p>
          <p>职业机会</p>
          <p>商务联络</p>
          <p>币池动态</p>
          <p>服务协议</p>
        </div>
      </div>
      <p class="py-8 text-center clffffff">
        © 2021 - 2040 Bichi.com. All rights reserved
      </p>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['locale']),
  },
  mounted () { },
  methods: {},
}
</script>
<style lang="scss" scoepd>
.Footer {
}
</style>