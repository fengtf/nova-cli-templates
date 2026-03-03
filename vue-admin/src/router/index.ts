import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: () => import('@/views/auth/callback.vue'),
    meta: { title: '认证回调', hidden: true }
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', icon: 'icon-app', breadcrumb: [{ title: '首页', path: '/home' }] }
      }
    ]
  },
  {
    path: '/404',
    name: 'Error404',
    component: () => import('@/views/error/404.vue'),
    meta: { title: '页面不存在', hidden: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫（登录验证已关闭，直接放行）
router.beforeEach((_to, _from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to) => {
  NProgress.done()
  document.title = to.meta.title ? `${to.meta.title} - 后台管理系统` : '后台管理系统'
})

export default router
