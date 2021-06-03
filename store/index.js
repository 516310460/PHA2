import actions from './mutations'

/**
 * store 数据
 * @param {Boolean} device.isMobile - 是否为手机环境
 * @param {Object} user_info - 用户信息
 * @param {Boolean} isCollapse - 是否折叠
 * @param {String} url_path - 路由地址
 * @param {Array} breadcrumb_list - 面包屑列表
 * @param {Array} menu_list - 菜单列表
 */
let data = {
    textSize: 'default', // elementUI布局大小 default medium small mini
    locales: ['zh-CN', 'zh-TW', 'en-US'],
    locale: 'zh-CN',
    token: '',
    publicToken: '',
    pageLoading: false, //页面是否加载完成
    UserInfo: {},
    UserAssets: {},
    // user_info: {},
    isCollapse: false,
    menuType: '', //管理菜单切换
    isChildCollapse: true, //是否有子节点
    url_path: '',
    breadcrumb_list: [],
    intervalType: 4, // k线类型
    interval: 15, // k线时间
    // 快速导航列表
    visitedViews: [
        // {
        //   title: '轮播管理',
        //   query: '',
        //   path: '/',
        //   fullPath: '/'
        // }
    ],
    cachedViews: [],
    tagsView: {
        // visitedViews: [{
        //   title: '轮播管理',
        //   query: '',
        //   path: '/',
        //   fullPath: '/'
        // }]
    },
    // 可以搜索的菜单列表
    search_menu_list: [],
    // 菜单列表
    menu_list: [
        // {
        //   id: 1, // 唯一id
        //   key: '', // 唯一key
        //   name: '轮播管理', // 菜单汉字名称
        //   pinyin: 'lunboguanli', // 菜单拼音名称
        //   path: '/', // 菜单路由
        //   icon: 'iconfont icon-index', // 菜单icon类名
        //   pid: '', // 父id
        //   isEdit: false, // 是否在编辑该节点
        //   children: [] // 菜单子节点
        // },
        // {
        //   id: 2, // 唯一id
        //   key: 'Train',
        //   name: '培训活动管理',
        //   pinyin: 'peixunhuodongguanli',
        //   path: '/Train',
        //   icon: 'el-icon-setting',
        //   pid: '', // 父id
        //   isEdit: false, // 是否在编辑该节点
        //   children: [] // 菜单子节点
        // },
        // {
        //   id: 3, // 唯一id
        //   key: 'Special',
        //   name: '专题管理',
        //   pinyin: 'jiaoyiguanli',
        //   path: '/Special',
        //   icon: 'el-icon-setting',
        //   pid: '', // 父id
        //   isEdit: false, // 是否在编辑该节点
        //   children: [] // 菜单子节点
        // },
        // {
        //   id: 4, // 唯一id
        //   key: 'DataLog',
        //   name: '数据同步日志',
        //   pinyin: 'shanghuguanli',
        //   path: '/DataLog',
        //   icon: 'el-icon-setting',
        //   pid: '', // 父id
        //   isEdit: false, // 是否在编辑该节点
        //   children: [] // 菜单子节点
        // }
    ],
    //买币查询条件
    AllAdvertListParams: {
        "page": 1, // "页码"
        "pageSize": 10, // "单页条数"
        "gdType": '', // "挂单类型: 1购买单,2出售单"
        "fCode": '', // "法币币种"
        "PayCode": "", // "支付方式"
        "fPrice": "", // "金额"
        "tCode": '', // "挂单币种(需填OTC支持法币交易币种)"
    },
    storeDiyCoinData: [], //行情自选数据
}

export const state = () => data
    // export const OldState = () => data