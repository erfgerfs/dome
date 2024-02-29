import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/workbench',
    children: [{
      path: 'workbench',
      component: () => import('@/views/workbench/index'),
      meta: { title: '工作台', icon: 'el-icon-data-board' }
    }]
  },
  {
    path: '/add',
    component: () => import('@/views/park/enterprise/add/index'),

  },
  {
    path: '/car/addMonthCard',
    component: () => import('@/views/car/addMonthCard/index'),

  },
  {
    path: '/car/editMonthCard',
    component: () => import('@/views/car/editMonthCard/index'),

  },
  {
    path: '/car/renewMonthCard',
    component: () => import('@/views/car/renewMonthCard/index'),

  },
  {
    path: '/car/viewMonthCard',
    component: () => import('@/views/car/viewMonthCard/index'),

  },
  {
    path: '/bj',
    component: () => import('@/views/park/enterprise/bj/index'),

  },
  {
    path: '/detail',
    component: () => import('@/views/park/enterprise/detail/index'),
  },
  {
    path: '/system/role/add',
    component: () => import('@/views/system/role/add/index'),
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
