import * as jsCokie from "js-cookie";
import { state as OldState } from "./index"

function deepClone(obj) {
    var newObj = obj instanceof Array ? [] : {}
    for (var i in obj) {
        newObj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
    return newObj
}
export default {
    //elementUI布局大小设置
    set_textSize(state, textSize) {
        state.textSize = textSize;
    },
    //重置state
    resetState(state) {
        var copyState = deepClone(new OldState()) // 拷贝state对象
        for (var i in copyState) {
            state[i] = copyState[i] // 递归赋值
        }
    },
    // 多种语言版本
    SET_LOCALES(state, locales) {
        state.locales = locales;
    },
    // 切换语言
    SET_LANG(state, locale) {
        // locales中存在相应的语言即设置其为locale
        if (state.locales.includes(locale)) {
            state.locale = locale;
            jsCokie.set("locale", locale);
        }
    },
    // 切换页面状态
    SET_PAGELOADING(state, pageLoading) {
        state.pageLoading = pageLoading;
    },

    //切换菜单
    SET_MENU(state, menu) {
        state.menuType = menu;
    },
    // token值
    SET_TOKEN(state, token) {
        state.token = token;
        jsCokie.set("token", token);
        if (!state.token) {
            state.UserInfo = "";
        }
    },
    //publicToken值
    SET_PUBLICTOKEN(state, publicToken) {
        state.publicToken = publicToken;
        jsCokie.set("publicToken", publicToken);
    },
    //用户资产
    SET_USERASSETS(state, UserAssets) {
        state.UserAssets = UserAssets;
    },
    // 用户信息
    SET_USERINFO(state, UserInfo) {
        state.UserInfo = UserInfo;
    },
    //是否展开、收缩
    set_isCollapse(state, isCollapse) {
        state.isCollapse = isCollapse
    },
    //是否有子节点
    set_isChildCollapse(state, isChildCollapse) {
        state.isChildCollapse = isChildCollapse
    },
    //设置菜单栏
    set_menu_list(state, menu_list) {
        state.menu_list = menu_list;
    },
    visitedViews(state, visitedViews) {
        state.visitedViews = visitedViews;
    },
    /**
     * 基于store key  直接修改数据
     * @param {Object} data - 参数 {key: '', value: ''}
     */
    setStoreData(state, data) {
        state[data.key] = data.value
    },
    /**
     * 通过path地址设置面包屑列表数据
     * @param {String} path - router 地址
     */
    setBreadcrumb(state, path) {},

    //k线时间类型
    SET_INTERVALTYPE(state, intervalType) {
        state.intervalType = intervalType;
    },

    //k线时间
    SET_INTERVAL(state, interval) {
        state.interval = interval;
    },
    //买币查询条件
    SET_GetAllAdvertListParams(state, GetAllAdvertListParams) {
        state.AllAdvertListParams = {
            "page": 1, // "页码"
            "pageSize": 10, // "单页条数"
            "gdType": GetAllAdvertListParams.gdType, // "挂单类型: 1购买单,2出售单"
            "fCode": GetAllAdvertListParams.fCode, // "法币币种"
            "PayCode": "", // "支付方式"
            "fPrice": "", // "金额"
            "tCode": GetAllAdvertListParams.tCode, // "挂单币种(需填OTC支持法币交易币种)"
        };

    },
    //行情自选数据
    SET_DIYCOINDATA(state, value) {
        state.storeDiyCoinData = value.slice()
    }
}