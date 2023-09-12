/*
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

/!**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-超级管理员-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，项目将不会显示在侧边栏中(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果没有设置alwaysShow，当item有多个子路由时，
 *                                它将变成嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置了noRedirect，则不会在breadcrumb中重定向
 * name:'router-name'             该名称由<keep-alive>使用(必须设置!!)
 * meta : {
    roles: ['超级管理员','单位管理员']    控制页面角色(可以设置多个角色)
    title: 'title'               名称显示在侧边栏和面包屑中(推荐设置)
    icon: 'svg-name'/'el-icon-x' 图标显示在侧边栏中
    breadcrumb: false            如果设置为false，则条目将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'  如果设置了路径，侧边栏将突出显示您设置的路径
  }
 *!/

/!**
 * constantRoutes
 * 没有权限要求的基本页面
 *所有角色都可以访问
 如首页和登录页和一些不用权限的公用页面
 *!/
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '综合驾驶舱', icon: 'dashboard' }
    }]
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 404页一定要放在最后!!
  { path: '*', redirect: '/404', hidden: true }
]



const createRouter = () => new Router({
  // 模式:'history'， //需要服务支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
*/



import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

import Layout from '@/layout'
import { getMoveRoute } from '@/api/user'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，项目将不会显示在侧边栏中(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果没有设置alwaysShow，当item有多个子路由时，
 *                                它将变成嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置了noRedirect，则不会在breadcrumb中重定向
 * name:'router-name'             该名称由<keep-alive>使用(必须设置!!)
 * meta : {
    roles: ['超级管理员','单位管理员']    控制页面角色(可以设置多个角色)
    title: 'title'               名称显示在侧边栏和面包屑中(推荐设置)
    icon: 'svg-name'/'el-icon-x' 图标显示在侧边栏中
    breadcrumb: false            如果设置为false，则条目将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'  如果设置了路径，侧边栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基本页面
 *所有角色都可以访问
 如首页和登录页和一些不用权限的公用页面
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
]

export let asyncRoutes = [
  // 404页一定要放在最后!!
  { path: '*', redirect: '/404', hidden: true }
]

/* export const asyncRoutes = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    alwaysShow: true,
    meta: {
      title: '综合驾驶舱',
      icon: 'dashboard',
      roles: ['超级管理员', '单位管理员']
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/dashboard'),
        name: 'Dashboard',
        meta: {
          title: '综合驾驶舱',
          roles: ['超级管理员','单位管理员']
        }
      },
    ]
  },
  {
    path: '/informationResources',
    component: Layout,
    redirect: '/informationResources/generalMessage',
    name: 'InformationResources',
    meta: {
      title: '信息资源管理',
      icon: 'table',
      roles: ['超级管理员', '单位管理员']
    },
    children: [
      {
        path: 'generalMessage',
        component: () => import('@/views/informationResources/generalMessage'),
        name: 'GeneralMessage',
        meta: {
          title: '综合信息管理',
          roles: ['超级管理员','单位管理员']
        }
      },
      {
        path: 'informationDataImport',
        component: () => import('@/views/informationResources/informationDataImport'),
        name: 'InformationDataImport',
        meta: {
          title: '信息数据导入',
          roles: ['超级管理员','单位管理员']
        }
      },
      {
        path: 'dataReportMake',
        component: () => import('@/views/informationResources/dataReportMake'),
        name: 'DataReportMake',
        meta: {
          title: '数据报表制作',
          roles: ['超级管理员', '单位管理员']
        }
      },
      {
        path: 'digitalComputerRoom',
        component: () => import('@/views/informationResources/digitalComputerRoom'),
        name: 'DigitalComputerRoom',
        meta: {
          title: '线上数字机房',
          roles: ['超级管理员', '单位管理员']
        }
      },
    ]
  },
  {
    path: '/basicInformation',
    component: Layout,
    redirect: '/basicInformation/unit',
    name: 'BasicInformation',
    meta: {
      title: '基础信息管理',
      icon: 'el-icon-set-up',
      roles: ['超级管理员', '单位管理员']
    },
    children: [
      {
        path: 'unit',
        component: () => import('@/views/basicInformation/unit'),
        name: 'Unit',
        meta: {
          title: '单位管理',
          roles: ['超级管理员', '单位管理员']
        }
      },
      {
        path: 'department',
        component: () => import('@/views/basicInformation/department'),
        name: 'Department',
        meta: {
          title: '部门管理',
          roles: ['超级管理员', '单位管理员']
        }
      },
      {
        path: 'firstLevelEquipmentType',
        component: () => import('@/views/basicInformation/firstLevelEquipmentType'),
        name: 'FirstLevelEquipmentType',
        meta: {
          title: '一级设备类型',
          roles: ['超级管理员', '单位管理员']
        }
      },
      {
        path: 'secondLevelEquipmentType',
        component: () => import('@/views/basicInformation/secondLevelEquipmentType'),
        name: 'SecondLevelEquipmentType',
        meta: {
          title: '二级设备类型',
          roles: ['超级管理员', '单位管理员']
        }
      },
      {
        path: 'businessSystem',
        component: () => import('@/views/basicInformation/businessSystem'),
        name: 'BusinessSystem',
        meta: {
          title: '业务系统管理',
          roles: ['超级管理员', '单位管理员']
        }
      },
      {
        path: 'businessSonSystem',
        component: () => import('@/views/basicInformation/businessSonSystem'),
        name: 'BusinessSonSystem',
        meta: {
          title: '业务子系统管理',
          roles: ['超级管理员', '单位管理员']
        }
      },
      {
        path: 'machineRoom',
        component: () => import('@/views/basicInformation/machineRoom'),
        name: 'MachineRoom',
        meta: {
          title: '机房管理',
          roles: ['超级管理员', '单位管理员']
        }
      },
    ]
  },
  {
    path: '/lifecycle',
    component: Layout,
    redirect: '/lifecycle/equipmentInstallation',
    name: 'Lifecycle',
    meta: {
      title: '全生命周期管理',
      icon: 'el-icon-bangzhu',
      roles: ['超级管理员', '单位管理员']                       // 2. 设置路由可进入权限列表
    },
    children: [
      {
        path: 'equipmentInstallation',
        component: () => import('@/views/lifecycle/equipmentInstallation'),
        name: 'EquipmentInstallation',
        meta: {
          title: '设备安装',
          roles: ['超级管理员', '单位管理员']
        }
      },
      {
        path: 'equipmentAllot',
        component: () => import('@/views/lifecycle/equipmentAllot'),
        name: 'EquipmentAllot',
        meta: {
          title: '设备调拨',
          roles: ['超级管理员', '单位管理员']
        }
      },
      {
        path: 'equipmentMove',
        component: () => import('@/views/lifecycle/equipmentMove'),
        name: 'EquipmentMove',
        meta: {
          title: '设备移动',
          roles: ['超级管理员', '单位管理员']
        }
      },
      {
        path: 'equipmentMaintain',
        component: () => import('@/views/lifecycle/equipmentMaintain'),
        name: 'EquipmentMaintain',
        meta: {
          title: '设备维修',
          roles: ['超级管理员', '单位管理员']
        }
      },
      {
        path: 'equipmentScrap',
        component: () => import('@/views/lifecycle/equipmentScrap'),
        name: 'equipmentScrap',
        meta: {
          title: '设备报废',
          roles: ['超级管理员', '单位管理员']
        }
      },
      {
        path: 'resourceApplication',
        component: () => import('@/views/lifecycle/resourceApplication'),
        name: 'ResourceApplication',
        meta: {
          title: '资源申请',
          roles: ['超级管理员', '单位管理员']
        }
      },
      {
        path: 'machineRoomConstruction',
        component: () => import('@/views/lifecycle/machineRoomConstruction'),
        name: 'MachineRoomConstruction',
        meta: {
          title: '机房施工',
          roles: ['超级管理员', '单位管理员']
        }
      },
    ]
  },
  {
    path: '/systemInformation',
    component: Layout,
    redirect: '/systemInformation/rolePermission',
    name: 'SystemInformation',
    meta: {
      title: '系统信息管理',
      icon: 'el-icon-postcard',
      roles: ['超级管理员', '单位管理员']
    },
    children: [
      {
        path: 'rolePermission',
        component: () => import('@/views/systemInformation/rolePermission'),
        name: 'RolePermission',
        meta: {
          title: '角色权限管理',
          roles: ['超级管理员']
        }
      },
      {
        path: 'userInformation',
        component: () => import('@/views/systemInformation/userInformation'),
        name: 'UserInformation',
        meta: {
          title: '用户信息管理',
          roles: ['超级管理员', '单位管理员']
          // 如果不设置权限，继承父路由的权限
        }
      },
      {
        path: 'personalInformation',
        component: () => import('@/views/systemInformation/personalInformation'),
        name: 'PersonalInformation',
        meta: {
          title: '用户信息管理',
          roles: ['超级管理员', '单位管理员']
        }
      },
      {
        path: 'dataInterface',
        component: () => import('@/views/systemInformation/dataInterface'),
        name: 'DataInterface',
        meta: {
          title: '数据接口管理',
          roles: ['超级管理员']
        }
      },
    ]
  },
  {
    path: '/log',
    component: Layout,
    redirect: '/log/logRecord',
    name: 'Log',
    meta: {
      title: '日志管理',
      icon: 'el-icon-edit-outline',
      roles: ['超级管理员']
    },
    children: [
      {
        path: 'logRecord',
        component: () => import('@/views/log/logRecord'),
        name: 'LogRecord',
        meta: {
          title: '日志记录',
          roles: ['超级管理员']
        }
      },
      {
        path: 'userLog',
        component: () => import('@/views/log/userLog'),
        name: 'UserLog',
        meta: {
          title: '用户日志',
          roles: ['超级管理员']
          // 如果不设置权限，继承父路由的权限
        }
      }
    ]
  },
  {
    path: '/helpInformation',
    component: Layout,
    redirect: '/helpInformation/helpDocument',
    name: 'HelpInformation',
    alwaysShow: true,
    meta: {
      title: '帮助信息',
      icon: 'el-icon-wallet',
      roles: ['超级管理员', '单位管理员']
    },
    children: [
      {
        path: 'helpDocument',
        component: () => import('@/views/helpInformation/helpDocument'),
        name: 'HelpDocument',
        meta: {
          title: '帮助文档',
          roles: ['超级管理员', '单位管理员']
        }
      },
    ]
  },

  // 404 页面必须放置在最后一个页面
  { path: '*', redirect: '/404', hidden: true }
] */


const createRouter = () => new Router({
  // 模式:'history'， //需要服务支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export function getAsyncRoutes() {
  //resolve ： 表示成功的回调; reject ： 表示失败的回调。
  return new Promise((resolve, reject) => {
    console.log("步骤11：调用接口getMoveRoute从后端获取路由（需要传递权限判断参数accountStatus，roleId）")
    getMoveRoute(store.getters.accountStatus,store.getters.roleId).then(response => {
      if (response.data.length === 0){
        asyncRoutes = []
      }else {
        const { data } = response
        console.log("步骤12：调用filterAsyncRoutes方法，处理路由数据")
        asyncRoutes = filterAsyncRoutes(data) // 全部的路由数据
      }
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

export function filterAsyncRoutes(routes) {
  const accessedRoutes = []
  console.log("步骤13： 遍历调用initRoute递归封装每一个路由及其子路由")
  routes.forEach(permission => {
    const routeNode = initRoute(permission)
    accessedRoutes.push(routeNode) // push一个个封装好的路由数据
  })
  const firstRouteNode =
    {
      path: '/',
      component: Layout,
      redirect: routes[0].path + '/' + routes[0].children[0].path,
      hidden: true
    }
  console.log("步骤14：设置处理后的第一个路由的path为：'/'并加到最后，方便作为首页")
  accessedRoutes.push(firstRouteNode)
  return accessedRoutes // 返回全部的路由数据
}

export function initRoute(permission) { // 封装路由
  if (permission.children && permission.children.length > 0) { // 如果存在子节点
    const route = {
      path: permission.path,
      component: Layout,
      alwaysShow: true,
      meta: {
        title: permission.meta.title,
        icon: permission.meta.icon,
        breadcrumb: false
      },
      children: []
    }
    permission.children.forEach(child => { // 递归封装子节点
      route.children.push(initRoute(child, child.level))
    })
    return route
  } else { // 不存在子节点直接返回
    return getRouter(permission)
  }
}

export function getRouter(permission) {
  if (permission.children && permission.children.length > 0) { // 一级菜单Layout
    return {
      path: permission.path,
      component: Layout,
      children: [{
        path: '',
        component: (resolve) => require([`@/views/${permission.component}`], resolve),
        meta: {
          title: permission.meta.title,
          icon: permission.meta.icon,
          breadcrumb: false
        }
      },],
    }
  } else { // 子菜单
    return {
      path: permission.path,
      component: (resolve) => require([`@/views/${permission.component}`], resolve),
      meta: {
        title: permission.meta.title,
        icon: permission.meta.icon,
        breadcrumb: false
      }
    }
  }
}



export default router
