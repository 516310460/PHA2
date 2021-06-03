import Vue from "vue";
import AxiosConfig from "./config";
import qs from "qs";
import Cookie from "cookie";
// import zhCN from "~/locales/zh-CN";
// import zhTW from "~/locales/zh-TW";
// import enUS from "~/locales/en-US";

export default function({
    $axios,
    redirect,
    app,
    req,
    store,
    route,
    ResponseErrMsg,
    $message
}) {
    // AxiosConfig.config.baseURL = process.env.baseUrl;
    // Object.assign($axios.defaults, AxiosConfig.config);
    let cookie = null;
    let lang = null;
    let token = null;
    let publicToken = null;
    if (process.server) {
        cookie = Cookie.parse(req.headers.cookie ? req.headers.cookie : "");
    } else {
        cookie = "";
    }
    $axios.onRequest(config => {
      lang = cookie["locale"] ? cookie["locale"] : store.state.locale;
      token = cookie["token"] ? cookie["token"] : store.state.token;
      // 设置默认语言
      app.i18n.locale = lang;
      config.headers["token"] = token;
      // 设置请求语言
      config.headers["lan"] = lang;
      // 将语言提交保存到vuex
      store.commit("SET_LANG", lang);
      config.data = qs.stringify(config.data)
      return config;
    });
    $axios.onResponse(response => {
      if(response.data.code == 500){
        $message.error(response.data.message)
      }
      if(response.data.code == 501){
        $message.error("登录失效，请重新登录")
        store.commit("SET_TOKEN", "");
        store.commit("SET_USERINFO", "");
        return app.router.replace(`/${store.state.locale}/Login`)
      }
      return response.data;
    });
    $axios.onError(error => {
      $message.error("服务器连接失败，请检查网络")
      return {}
    });
}