import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store/index.js"

Vue.use(Router)

const router = new Router({
//   mode: 'history',
  routes: [{
    path: "",
    name: "layout",
    redirect: {
      name: "home"
    },
    component: () => import('@/page/public/layout'),
    children: [{
        path: '/',
        name: 'home',
        component: () => import('@/page/home/home'),
        meta: {
          title: "首页"
        }
      }, {
        path: '/search',
        name: 'search',
        component: () => import('@/page/search/search'),
        meta: {
          title: "搜索"
        }
      }, {
        path: '/chanpin',
        name: 'chanpin',
        component: () => import('@/page/chanpin/transtfe'),
        redirect: {
          name: "chanpin_index"
        },
        children: [{
          path: 'index/:id',
          name: "chanpin_index",
          component: () => import('@/page/chanpin/index')
        }, {
          path: 'list/:pid/:id',
          name: "chanpin_list",
          component: () => import('@/page/chanpin/list')
        }, {
          path: 'detail/:id',
          name: "chanpin_detail",
          component: () => import('@/page/chanpin/detail')
        }]
      }, {
        path: '/furnishing',
        name: 'furnishing',
        component: () => import('@/page/furnishing/transfer'),
        redirect: {
          name: "furnishing_index"
        },
        meta: {
          title: "家居顾问"
        },
        children: [{
          path: 'index',
          name: "furnishing_index",
          component: () => import('@/page/furnishing/index')
        }, {
          path: 'detail/:id',
          name: "furnishing_detail",
          component: () => import('@/page/furnishing/detail')
        }]
      }, {
        path: '/declarehair',
        name: 'declarehair',
        component: () => import('@/page/declarehair/transfer'),
        redirect: {
          name: "declarehair_index"
        },
        meta: {
          title: "品牌宣发"
        },
        children: [{
          path: 'index',
          name: "declarehair_index",
          component: () => import('@/page/declarehair/index')
        }, {
          path: 'detail/:id',
          name: "declarehair_detail",
          component: () => import('@/page/declarehair/detail')
        }]
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import('@/page/contact/contact'),
        meta: {
          title: "联系我们"
        }
      },
      {
        path: '/brand',
        name: 'brand',
        component: () => import('@/page/contact/brand'),
        meta: {
          title: "品牌招聘"
        }
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('@/page/contact/member'),
        meta: {
          title: "会员招募"
        }
      }
    ]
  }],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

let whiteList = ['home', 'contact', 'brand', 'member', "declarehair_index", "furnishing_index"]
//监听路由
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.name) > -1) {
    store.commit('setshowBack', false)
  } else {
    store.commit('setshowBack', true)
  }
  store.commit("setIsLocation", false);
  next()
})

router.afterEach((to, from, next) => {
  window.pageYOffset = 0
  window.scrollTo(0, 0)
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0;
})

export default router
