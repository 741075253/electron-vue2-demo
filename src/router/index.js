import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    // component: () =>
    //   import(/* webpackChunkName: "welcome" */ '../views/WelcomeView.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "welcome" */ '../views/HomeView.vue'),
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
  },
  {
    path: '/displayResource/imgPreview',
    name: 'imgPreview',
    component: () =>
      import(
        /* webpackChunkName: "sign" */ '../views/displayResource/imgPreview.vue'
      ),
  },
  {
    path: '/displayResource/filePreview',
    name: 'filePreview',
    component: () =>
      import(
        /* webpackChunkName: "sign" */ '../views/displayResource/filePreview/index.vue'
      ),
  },
  {
    path: '/displayResource/filePreviewList',
    name: 'filePreviewList',
    component: () =>
      import(
        /* webpackChunkName: "sign" */ '../views/displayResource/filePreview/list.vue'
      ),
  },
  {
    path: '/displayResource/videoPreview',
    name: 'videoPreview',
    component: () =>
      import(
        /* webpackChunkName: "sign" */ '../views/displayResource/videoPreview/index.vue'
      ),
  },
  {
    path: '/displayResource/videoPreviewList',
    name: 'videoPreviewList',
    component: () =>
      import(
        /* webpackChunkName: "sign" */ '../views/displayResource/videoPreview/list.vue'
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
