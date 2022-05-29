import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/display3D',
    name: 'display3D',
    component: () =>
      import(
        /* webpackChunkName: "display" */ '../views/displayCompany/index.vue'
      ),
  },
  {
    path: '/displayResource',
    name: 'displayResource',
    component: () =>
      import(
        /* webpackChunkName: "resource" */ '../views/displayResource/index.vue'
      ),
  },
  {
    path: '/signLeader',
    name: 'signLeader',
    component: () =>
      import(/* webpackChunkName: "sign" */ '../views/signLeader/index.vue'),
  },
  {
    path: '/managePage',
    name: 'managePage',
    component: () =>
      import(/* webpackChunkName: "manage" */ '../views/managePage/index.vue'),
    children: [
      {
        path: 'videoManage',
        name: 'videoManage',
        component: () =>
          import(
            /* webpackChunkName: "manage" */ '../views/managePage/videoManage'
          ),
      },
      {
        path: 'imgManage',
        name: 'imgManage',
        component: () =>
          import(
            /* webpackChunkName: "manage" */ '../views/managePage/imgManage'
          ),
      },
      {
        path: 'fileManage',
        name: 'fileManage',
        component: () =>
          import(
            /* webpackChunkName: "manage" */ '../views/managePage/fileManage'
          ),
      },
      {
        path: 'signManage',
        name: 'signManage',
        component: () =>
          import(
            /* webpackChunkName: "manage" */ '../views/managePage/signManage'
          ),
      },
    ],
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
