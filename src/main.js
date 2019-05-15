// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/index.js"

import './assets/css/index.scss' // global css
import * as filters from './filters/index' // global filters

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

Vue.prototype.BaseUrl = 'http://www.pc18.vip';

Vue.prototype.cliHeight = window.document.body.offsetHeight - 421

Vue.prototype.Trim = function(str) {
  return str.toString().replace(/\n | \r\n\↵/g, "<br/>");
}

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

router.beforeEach((to, from, next) => {
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  next()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }

})
