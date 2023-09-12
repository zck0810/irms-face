import router, { constantRoutes } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'


NProgress.configure({ showSpinner: false }) // NProgress配置

const whiteList = ['/login'] // 没有重定向白名单

router.beforeEach(async(to, from, next) => {
  console.log('步骤4：路由跳转前的相关判断')
  // 开始进度条
  NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  // 判断用户是否已登录
  const hasToken = store.getters.token //从vuex中获取token
  if (hasToken) {
    console.log('步骤5： 已获得token, 判断to.path是否等于：/login，如果是则重定向到首页，如果不是就判断是否有角色')
    if (to.path === '/login') {
      console.log('步骤6： 如果已登录，则重定向到主页 ')
      // 如果已登录，则重定向到主页
      next({ path: '/' })
      // next()
      NProgress.done()
    } else {
      console.log('步骤6： 判断是否有角色，如果有直接next（）下一步,如果没有就执行步骤7-getInfo获取用户信息')
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          console.log("步骤7: 执行getInfo")
          await store.dispatch('user/getUserInfo')
          console.log("步骤9： 已获取角色，执行generateRoutes获取路由")
          const accessRoutes = await store.dispatch('permission/generateRoutes')
          console.log("步骤16： 路由已获取到，把路由添加到可访问路由")
          // 动态添加可访问路由
          router.addRoutes(accessRoutes)
          if(accessRoutes.length===0){
            next({ path: '/404' })
          }else {
            next({ ...to, replace: true })
          }
        } catch (error) {
          // 删除令牌并转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error.message || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接进入
      next()
    } else {
      // 其他没有访问权限的页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
