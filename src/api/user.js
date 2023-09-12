import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/loginController/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/loginController/getInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/loginController/logout',
    method: 'post'
  })
}

/**
 获取验证码
 */
export function initVerifyCode(fosV) {
  return request({
    url: '/loginController/initVerifyCode',
    method: 'get',
    responseType: 'json',
    params: { fosV }
  })
}

export function getUserList() {
  return request({
    url: '/UserController/getUserList',
    method: 'get'
  })
}

export function getMoveRoute(accountStatus,roleId) {
  return request({
    url: '/loginController/getMoveRoute',
    method: 'get',
    params:{accountStatus,roleId}
  })
}





