import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_6c274575 from 'nuxt_plugin_plugin_6c274575' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_workbox_06b8d667 from 'nuxt_plugin_workbox_06b8d667' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_6c64c67a from 'nuxt_plugin_metaplugin_6c64c67a' // Source: ./pwa/meta.plugin.js (mode: 'all')
import nuxt_plugin_axios_dcd38fea from 'nuxt_plugin_axios_dcd38fea' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_localStorage_3e0f79e7 from 'nuxt_plugin_localStorage_3e0f79e7' // Source: ../plugins/localStorage (mode: 'client')
import nuxt_plugin_pwa_6e032ffa from 'nuxt_plugin_pwa_6e032ffa' // Source: ../plugins/pwa (mode: 'client')
import nuxt_plugin_GlobalComponents_74965de0 from 'nuxt_plugin_GlobalComponents_74965de0' // Source: ../plugins/GlobalComponents (mode: 'client')
import nuxt_plugin_verification_a985191c from 'nuxt_plugin_verification_a985191c' // Source: ../plugins/verification (mode: 'all')
import nuxt_plugin_clientCommonFn_4e1f36d6 from 'nuxt_plugin_clientCommonFn_4e1f36d6' // Source: ../plugins/clientCommonFn (mode: 'client')
import nuxt_plugin_Calculation_7f113b1c from 'nuxt_plugin_Calculation_7f113b1c' // Source: ../plugins/Calculation (mode: 'all')
import nuxt_plugin_commonFn_6023762c from 'nuxt_plugin_commonFn_6023762c' // Source: ../plugins/commonFn (mode: 'all')
import nuxt_plugin_class_fb6f5ffe from 'nuxt_plugin_class_fb6f5ffe' // Source: ../plugins/class (mode: 'all')
import nuxt_plugin_i18n_56ca5e75 from 'nuxt_plugin_i18n_56ca5e75' // Source: ../plugins/i18n (mode: 'all')
import nuxt_plugin_elementui_69306e1c from 'nuxt_plugin_elementui_69306e1c' // Source: ../plugins/element-ui (mode: 'all')
import nuxt_plugin_axios_fb9c9a02 from 'nuxt_plugin_axios_fb9c9a02' // Source: ../plugins/axios (mode: 'all')
import nuxt_plugin_filters_a8b86778 from 'nuxt_plugin_filters_a8b86778' // Source: ../plugins/filters (mode: 'all')
import nuxt_plugin_api_6e03a23a from 'nuxt_plugin_api_6e03a23a' // Source: ../plugins/api (mode: 'all')
import nuxt_plugin_main_56ccea10 from 'nuxt_plugin_main_56ccea10' // Source: ../plugins/main (mode: 'all')
import nuxt_plugin_np_a8b5c84e from 'nuxt_plugin_np_a8b5c84e' // Source: ../plugins/np (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$coinpool', {
  get() {
    const globalNuxt = this.$root.$options.$coinpool
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$coinpool
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"PHA","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"},{"hid":"description","name":"description","content":"PHA2"},{"http-equiv":"Expires","content":"0"},{"http-equiv":"Pragma","content":"no-cache"},{"http-equiv":"Cache-Control","content":"no-cache, no-store, must-revalidate"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Fbuybit.ico"}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__coinpool_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__COINPOOL__ && window.__COINPOOL__.state) {
      store.replaceState(window.__COINPOOL__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_6c274575 === 'function') {
    await nuxt_plugin_plugin_6c274575(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_06b8d667 === 'function') {
    await nuxt_plugin_workbox_06b8d667(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_6c64c67a === 'function') {
    await nuxt_plugin_metaplugin_6c64c67a(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_dcd38fea === 'function') {
    await nuxt_plugin_axios_dcd38fea(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_localStorage_3e0f79e7 === 'function') {
    await nuxt_plugin_localStorage_3e0f79e7(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pwa_6e032ffa === 'function') {
    await nuxt_plugin_pwa_6e032ffa(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_GlobalComponents_74965de0 === 'function') {
    await nuxt_plugin_GlobalComponents_74965de0(app.context, inject)
  }

  if (typeof nuxt_plugin_verification_a985191c === 'function') {
    await nuxt_plugin_verification_a985191c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_clientCommonFn_4e1f36d6 === 'function') {
    await nuxt_plugin_clientCommonFn_4e1f36d6(app.context, inject)
  }

  if (typeof nuxt_plugin_Calculation_7f113b1c === 'function') {
    await nuxt_plugin_Calculation_7f113b1c(app.context, inject)
  }

  if (typeof nuxt_plugin_commonFn_6023762c === 'function') {
    await nuxt_plugin_commonFn_6023762c(app.context, inject)
  }

  if (typeof nuxt_plugin_class_fb6f5ffe === 'function') {
    await nuxt_plugin_class_fb6f5ffe(app.context, inject)
  }

  if (typeof nuxt_plugin_i18n_56ca5e75 === 'function') {
    await nuxt_plugin_i18n_56ca5e75(app.context, inject)
  }

  if (typeof nuxt_plugin_elementui_69306e1c === 'function') {
    await nuxt_plugin_elementui_69306e1c(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_fb9c9a02 === 'function') {
    await nuxt_plugin_axios_fb9c9a02(app.context, inject)
  }

  if (typeof nuxt_plugin_filters_a8b86778 === 'function') {
    await nuxt_plugin_filters_a8b86778(app.context, inject)
  }

  if (typeof nuxt_plugin_api_6e03a23a === 'function') {
    await nuxt_plugin_api_6e03a23a(app.context, inject)
  }

  if (typeof nuxt_plugin_main_56ccea10 === 'function') {
    await nuxt_plugin_main_56ccea10(app.context, inject)
  }

  if (typeof nuxt_plugin_np_a8b5c84e === 'function') {
    await nuxt_plugin_np_a8b5c84e(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
