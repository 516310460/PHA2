module.exports = {
  // purge: [],
  // 配置 Tailwind 来移除生产环境下没有使用到的样式声明
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '240': '240px',
        '420': '420px',
        '1200': '1200px'
      },
      height: {
        '220': '220px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
