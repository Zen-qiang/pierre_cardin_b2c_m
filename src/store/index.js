import Vue from 'vue'
import Vuex from 'vuex'

import LS from 'storejs'

Vue.use(Vuex)

//定义数据仓库前缀，避免保存到LocalStorage中的数据节点冲突
var sysKeys = 'DL_pierreCardin_'

/**
 * showBack [显示返回键]
 * @type {Boolean}
 * @author sy 2019-05-08
 */
const showBack = false;

/**
 * isLocation [首页锚点定位]
 * @type {Boolean}
 * @author sy 2019-05-15
 */
const isLocation = false

/*
 * activeList 活动列表
 * pageSize 设置每页显示记录条数
 * pageSizes 设置每页显示记录条数的下拉选项
 * */
const state = {
  showBack: showBack,
  isLocation: isLocation
}

//从组件中提交请求方法，写在此类下，注意保存时，一定要保存为json
const mutations = {
  setshowBack(state, payload) { //设置是否认显示返回按钮
    state.showBack = payload;
    LS.set(sysKeys + 'showBack', JSON.stringify(state.showBack))
  },
  setIsLocation(state, payload) { //设置是否锚点定位
    state.isLocation = payload;
    LS.set(sysKeys + 'isLocation', JSON.stringify(state.isLocation))
  }
}

/* 从本地存储读取数据 */
for (var item in state) {
  LS.get(sysKeys + item) ? state[item] = JSON.parse(LS.get(sysKeys + item)) : false;
}

//数据过滤
const getters = {}

//异步缓存
const actions = {}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
