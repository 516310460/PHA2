const pkg = require('./package')
const path = require('path')
// const whitelister = require('purgecss-whitelister')
// 域名或ip
// const baseUrl = 'https://smwl.mycoin.icu'
const baseUrl = 'http://43.128.5.136:9899'
const imgServerUrl = "https://buybit.oss-cn-hongkong.aliyuncs.com/";
const webSocketUrl = "wss://www.buybit.com";
const webSocketHttpUrl = "https://www.buybit.com";

module.exports = {
  ssr: true,
  /*
   ** Headers of the page
   */
  head: {
    title: 'PHA' || pkg.name,
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
    },
    {
      hid: 'description',
      name: 'description',
      content: pkg.description
    },
    {
      'http-equiv': 'Expires',
      content: '0'
    },
    {
      'http-equiv': 'Pragma',
      content: 'no-cache'
    },
    {
      'http-equiv': 'Cache-Control',
      content: 'no-cache, no-store, must-revalidate'
    }
    ],
    link: [{
      rel: "icon",
      type: "image/x-icon",
      href: "/buybit.ico"
    }],
    // script: [{ src: '/font/iconfont.js'}]
  },
  server: {
    host: '0.0.0.0',
    port: '3001'
  },
  loading: {
    color: '#347CEF'
  },
  env: {
    baseUrl: baseUrl,
    imgServerUrl: imgServerUrl,
    webSocketUrl: webSocketUrl,
    webSocketHttpUrl: webSocketHttpUrl
  },

  // 全局属性
  globalName: 'CoinPool',
  render: {
    http2: {
      push: true
    },
    static: {
      maxAge: '1y',
      setHeaders (res, path) {
        if (path.includes('sw.js')) {
          res.setHeader('Cache-Control', `public, max-age=${15 * 60}`)
        }
      }
    },
    // resourceHints 提升页面加载性能与体验（页面太多的话就不适合用默认的true）
    resourceHints: false,
    // Nuxt 项目打包会默认在服务端开启 gzip，如果我们网关层已经做了 gzip，可以关掉 gzip
    // compressor: false
  },
  css: [
    '~assets/icon/iconfont.css',
    '~assets/css/tailwind.css',
    'element-ui/lib/theme-chalk/index.css',
    '~assets/css/main.css',
    '@/assets/css/main.scss',
  ],
  // 打包路径(spa)：nuxt不支持配置相对路径（只能使用绝对路径）
  router: {
    middleware: ['Auth'],
    // base: '/JSPT-ADMIN'
  },

  // 自动扫描components下目录
  components: true,

  plugins: [{
    src: '~plugins/localStorage',
    ssr: false
  },
  // {
  //     src: '~plugins/commonFn',
  //     ssr: false
  // },
  {
    src: '~plugins/pwa',
    ssr: false
  },
  {
    src: '~plugins/GlobalComponents',
    ssr: false
  },
    '~plugins/verification',
  // {
  //     src: '~plugins/websocket',
  //     ssr: false
  // },
  {
    src: '~plugins/clientCommonFn',
    ssr: false
  },
    '~plugins/Calculation',
    '~plugins/commonFn',
    '~plugins/class',
    '~plugins/i18n',
    '~plugins/element-ui',
    '~plugins/axios',
    '~plugins/filters',
    '~plugins/api',
    '~plugins/main',
    '~plugins/np',
  ],
  buildModules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/style-resources',
    "@nuxtjs/svg",
    // 'nuxt-swaggerjsonapi',
    // "nuxt-purgecss"
  ],
  axios: {
    baseURL: baseUrl,
    // retry: {
    //   retries: 2
    // }
  },
  // purgeCSS: {
  //   // whitelist: [
  //   //   'antialiased',
  //   //   'leading-normal',
  //   //   ...whitelister([
  //   //     'node_modules/tailwindcss/lib/plugins/css/preflight.css',
  //   //     'node_modules/element-ui/lib/theme-chalk/button.css',
  //   //     'node_modules/element-ui/lib/theme-chalk/select.css',
  //   //     'node_modules/element-ui/lib/theme-chalk/input.css',
  //   //     'node_modules/element-ui/lib/theme-chalk/rate.css'
  //   //   ])
  //   // ],
  //   whitelistPatternsChildren: [/^__nuxt/, /el-.+$/],
  //   whitelistPatterns: [/^__nuxt/, /el-.+$/]
  // },
  pwa: {
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
    },
    {
      hid: 'description',
      name: 'description',
      content: pkg.description
    },
    {
      'http-equiv': 'Expires',
      content: '0'
    },
    {
      'http-equiv': 'Pragma',
      content: 'no-cache'
    },
    {
      'http-equiv': 'Cache-Control',
      content: 'no-cache, no-store, must-revalidate'
    }
    ],
    manifest: {
      name: 'coin pool',
      short_name: 'coin pool',
      description: 'coin pool',
      background_color: '#2baf88',
      theme_color: '#2baf88',
      lang: 'zh',
      start_url: '/zh-CN'
    },
  },

  swaggerJsonApi: {
    // SourcePath: path.resolve(__dirname, 'swagger.json'), 
    FileUrl: `${baseUrl}/v2/api-docs`,
    OutputPath: path.resolve(__dirname, './plugins/api/api.js'),
    Model: 'details'
  },
  styleResources: {
    scss: ["~assets/css/mixins.scss"]
  },
  build: {
    // 不建议将所有内容提取到一个文件中。提取到多个CSS文件中更好地进行缓存和预加载隔离。它也可以通过仅下载和解析所需的资源来提高页面性能
    // extractCSS: true,
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       styles: {
    //         name: 'styles',
    //         test: /\.(css|vue)$/,
    //         chunks: 'all',
    //         enforce: true
    //       }
    //     }
    //   }
    // },
    vendor: ['element-ui'],
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {

      }
    }
  }
}