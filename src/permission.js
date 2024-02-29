import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { getInfo } from '@/api/user'
import { Dtrouter } from '@/router/Dtrouter'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

function yjly(permissions) {
  const arr = permissions.map(item => {
    return item.split(':')[0]
  })
  return [...new Set(arr)]
  // console.log(Arra);
}
function erly(permissions) {
  const arr = permissions.map(item => {
    const bbb = item.split(':')
    return `${bbb[0]}:${bbb[1]}`
  })
  return [...new Set(arr)]
}

//写动态路由和后台所返回的路由进行匹配
function userRouter(onely, towly, Dtrouter) {
  if (onely.includes('*')) {
    return Dtrouter
  }

  const onearr = Dtrouter.filter(item => {

    return onely.includes(item.permission)
    // console.log(item);
  }).map(item => {
    return {
      ...item,
      children: item.children.filter(itm => {
        return towly.includes(itm.permission)
      })
    }
  })
  return onearr
}

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()


  // const function yjly(){

  // },
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {

          await store.dispatch('user/setInfo1')
          const res = await getInfo()
          const permissions = res.data.data.permissions
          console.log('permissions', permissions);
          //获取一级路由点
          const onely = yjly(permissions)
          // console.log(onely);
          //获取二级路由点
          const towly = erly(permissions)
          // console.log('towly', towly);
          //获取本地自定义的动态路由
          console.log("Dtrouter", Dtrouter);
          //进行匹配方法
          const qbrouter = userRouter(onely, towly, Dtrouter)
          router.addRoutes([
            ...qbrouter,
            { path: '*', redirect: '/404', hidden: true }
          ])
          store.commit('user/setRouter', qbrouter)

          console.log("qbrouter", qbrouter);
          next(to.fullPath);
        } catch (error) {
          next(`/login?redirect=${to.path}`)
          NProgress.done()
          // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          await store.dispatch("user/logout");
          Message.error(error || "Has Error");
          // 跳转到登录页
          next(`/login?redirect=${to.path}`);
          NProgress.done();

        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
