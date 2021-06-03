import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _c6e9dc9e = () => interopDefault(import('../pages/_lang/index.vue' /* webpackChunkName: "pages/_lang/index" */))
const _7c84fb58 = () => interopDefault(import('../pages/_lang/Assets.vue' /* webpackChunkName: "pages/_lang/Assets" */))
const _44b656b0 = () => interopDefault(import('../pages/_lang/Login.vue' /* webpackChunkName: "pages/_lang/Login" */))
const _a24fb998 = () => interopDefault(import('../pages/_lang/Register.vue' /* webpackChunkName: "pages/_lang/Register" */))
const _504692c9 = () => interopDefault(import('../pages/_lang/ResetPassword.vue' /* webpackChunkName: "pages/_lang/ResetPassword" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/:lang",
    component: _c6e9dc9e,
    name: "lang"
  }, {
    path: "/:lang?/Assets",
    component: _7c84fb58,
    name: "lang-Assets"
  }, {
    path: "/:lang?/Login",
    component: _44b656b0,
    name: "lang-Login"
  }, {
    path: "/:lang?/Register",
    component: _a24fb998,
    name: "lang-Register"
  }, {
    path: "/:lang?/ResetPassword",
    component: _504692c9,
    name: "lang-ResetPassword"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
