const consola = require('consola')
export default function ({
  isHMR,
  app,
  store,
  route,
  params,
  error,
  redirect,
  res,
  req,
  $api
}) {
  // 如果从热模块替换调用中间件，则忽略它
  if (isHMR) return
  const UrlPathArray = route.path.split('/')[1]
  const UrlPathArrayState = UrlPathArray.includes('-')
  if (
    UrlPathArray &&
    (UrlPathArray == 'zh-CN' ||
      UrlPathArray == 'zh-TW' ||
      UrlPathArray == 'en-US')
  ) {
    store.commit('SET_LANG', UrlPathArray)
  }
  let url = '';
  if (
    !route.path.includes(`/${store.state.locale}`) &&
    store.state.locale !== app.i18n.fallbackLocale
  ) {
    if (UrlPathArrayState) {
      url = route.path.replace(UrlPathArray, store.state.locale)
    } else {
      url = `/${store.state.locale}${route.fullPath}`
    }
    return redirect(url)
  } else {
    if (UrlPathArrayState) {
      return
    } else {
      url = `/${store.state.locale}${route.fullPath}`
    }
    //判断当前二级域名是否是otc 是就加上
    // url += req && req.headers && req.headers.host.split('.')[0] == 'otc' ? 'OTC' : ''
    return redirect(url)
  }
}
