import Vue from 'vue'
import VueRouter from 'vue-router'

import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './store'

// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'

// Import Views - Top level
import App from './components/App.vue'

//添加bootstrap-vue组件！
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)

Vue.use(VueRouter)

Vue.config.productionTip = false

// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Some middleware to help us ensure the user is authenticated.
// router.beforeEach((to, from, next) => {
  // window.console.log('Transition', transition)
//   if (to.auth && (to.router.app.$store.state.token === 'null')) {
//     window.console.log('Not authenticated')
//     next({
//       path: '/login',
//       query: { redirect: to.fullPath }
//     })
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#root', 
  router: router,
  template: '<App/>',
  components: { App }
})
