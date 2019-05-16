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

Vue.prototype.BaseUrl = process.env.WEB_ROOT;

Vue.prototype.cliHeight = window.document.body.offsetHeight - 421

Vue.prototype.Trim = function(str) {
  return str.toString().replace(/\n | \r\n\↵/g, "<br/>");
}

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

window.addEventListener("beforeunload", window.scrollTo(0, 0))

router.afterEach((to, from, next) => {
  document.documentElement.scrollTop = document.body.scrollTop = 0;
  window.addEventListener("beforeunload", window.scrollTo(0, 0))
  //   window.scrollTo(0, 0);
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
