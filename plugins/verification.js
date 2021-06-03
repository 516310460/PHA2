export default (context, inject) => {

  const verification = {

    // 校验是否开启支付方式, 没有开启就提示，开启了就跳转发布广告
    isOpenPayment () {
      if (!context.store.state.UserInfo.isOpenPayment) {
        return context.$message.error("暂未开启支付方式，请先开启支付方式")
      }
      context.app.router.replace(`/${context.store.state.locale}/Buycoins/Business/AD/Publish`)
    },

  }

  context.$verification = verification;
  inject("verification", verification);
}