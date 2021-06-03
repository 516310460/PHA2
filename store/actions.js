import Cookie from "cookie";
export default {
    async nuxtServerInit({
        dispatch,
        commit,
        state
    }, {
        app,
        req,
        store,
        route,
        redirect,
        error
    }) {
        const cookie = Cookie.parse(req.headers.cookie ? req.headers.cookie : "");
        const lang = cookie["locale"] ? cookie["locale"] : (cookie.locale ? cookie.locale : state.locale);
        // const token = cookie["token"] ? cookie["token"] : (cookie.token && cookie.token != 'null' ? cookie.token : state.token);
        const publicToken = cookie["publicToken"] ? cookie["publicToken"] : (cookie.publicToken && cookie.publicToken != 'null' ? cookie.publicToken : state.publicToken);
        commit("SET_LANG", lang || 'zh-CN');
        // commit("SET_TOKEN", token || '');
        commit("SET_PUBLICTOKEN", publicToken || '');
        if (!store.state.publicToken) {
            // await dispatch('SignToken')
        } else {
            // await dispatch('GetUserLoginInfo')
        }
    },

    async SignToken({ commit, dispatch, state }) {
        await this.$api.Token.SignToken({ type: 1 }).then(res => {
            if (res.isSuccess) {
                commit('SET_PUBLICTOKEN', res.data.token)
            }
        })
    },
    // 获取用户OTC资产
    async GetUserAssets({ commit, dispatch, state }) {
        await this.$api.Assets.GetUserAssets().then(res => {
            if (res.isSuccess) {
                commit('SET_USERASSETS', res.data)
            }
        })
    },
    async GetUserInfo({ commit, dispatch, state }) {
        await this.$api.User.GetUserInfo().then(res => {
            if (res.isSuccess) {
                commit('SET_USERINFO', res.data)
            }
        })
    },
    async GetUserLoginInfo({ commit, dispatch, state }) {
        await this.$api.User.GetUserLoginInfo().then(res => {
            if (res.code == 200) {
                commit('SET_USERINFO', res.data)
            }
        })
    },
};