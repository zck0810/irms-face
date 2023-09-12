import { asyncRoutes, constantRoutes, getAsyncRoutes } from '@/router'
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      let accessedRoutes
      console.log("步骤10：调用getAsyncRoutes方法")
      getAsyncRoutes().then(() => {
        console.log("步骤15：把处理完的路由赋值给accessedRoutes返回并添加到vuex中")
          accessedRoutes =asyncRoutes
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }
      ).catch(error => {
        console.log(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

