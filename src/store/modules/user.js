import { login, logout, getInfo } from '@/api/user'
import { resetRouter } from '@/router'
import { getToken, removeToken, setToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    userName: '',
    userPermission: '',
    accountStatus: '',
    roleId: '',
    unit: '',
    department: '',
    loginId: '',
    roles:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, userName) => {
    state.userName = userName
  },
  SET_ACCOUNSTARUS: (state, accountStatus) => {
    state.accountStatus = accountStatus
  },
  SET_UNIT: (state, unit) => {
    state.unit = unit
  },
  SET_DEPARTMENT: (state, department) => {
    state.department = department
  },
  SET_LOGINID: (state, loginId) => {
    state.loginId = loginId
  },
  SET_ROLEID: (state, roleId) => {
    state.roleId = roleId
  },
  SET_UNITID: (state, unitId) => {
    state.unitId = unitId
  },
  SET_DEPARTMENTID: (state, departmentId) => {
    state.departmentId = departmentId
  },
  SET_ROLES: (state, roles) =>{
    state.roles = roles
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    console.log("步骤1：登录,执行login并返回token")
    const { loginId, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginId: loginId.trim(), password: password }).then(response => {
        commit('SET_TOKEN', response.data)
        console.log("步骤2： 获取到token存到vuex")
        setToken(response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  //获取用户信息
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log("步骤8: 获取用户信息并存到vuex中，方便接下来获取角色使用")
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('验证失败，请重新登录.')
        }
        const { userName, userPermission, unit, department,accountStatus, loginId,roleId,unitId,departmentId} = data
        commit('SET_USERNAME', userName)
        commit('SET_ACCOUNSTARUS', accountStatus)
        commit('SET_ROLES', userPermission)
        commit('SET_UNIT', unit)
        commit('SET_DEPARTMENT', department)
        commit('SET_LOGINID', loginId)
        commit('SET_ROLEID', roleId)
        commit('SET_UNITID', unitId)
        commit('SET_DEPARTMENTID', departmentId)
        resolve(data)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() //必须先移除令牌
        commit('RESET_STATE')
        commit('SET_ROLES',[])
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token

  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken()
      commit('RESET_STATE')
      commit('SET_ROLES',[])
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

