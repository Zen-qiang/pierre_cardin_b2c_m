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
import animated from 'animate.css'

Vue.use(animated)

Vue.use(MintUI)

Vue.prototype.BaseUrl = process.env.API_ROOT;

Vue.prototype.cliHeight = window.document.body.offsetHeight - 421

Vue.prototype.Trim = function(str) {
  return str.toString().replace(/\n | \r\n\↵/g, "<br/>");
}

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
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
  },
  mounted() {
    if (/Windows|Macintosh/i.test(navigator.userAgent)) {
      window.location.href = 'http://www.pc18.vip/pc18/index.html';
    };
  }

})
