import instance from '@/utils/request'

export function login(data) {
  return instance({
    url: '/park/login',
    method: 'post',
    data
  })
}
export function uplogin(data) {
  return instance({
    url: '/park/profile/updatePwd',
    method: 'PUT',
    data
  })
}
export function getinfo() {
  return instance({
    url: '/park/user/profile',
    method: 'GET',

  })
}
export function lyglApi(params) {
  return instance({
    url: '/park/building',
    method: 'GET',
    params
  })
}
export function lygldelApi(id) {
  return instance({
    url: `/park/building/` + id,
    method: 'DELETE',

  })
}
export function lygladdApi(data) {
  return instance({
    url: `/park/building`,
    method: 'POST',
    data
  })
}
export function lyglupApi(data) {
  return instance({
    url: `/park/building`,
    method: 'PUT',
    data
  })
}
export function lyglxqApi(id) {
  return instance({
    url: `/park/building/` + id,
    method: 'GET',

  })
}
///park/enterprise
export function qyaddApi(data) {
  return instance({
    url: `/park/enterprise`,
    method: 'POST',
    data
  })
}
export function qyApi(params) {
  return instance({
    url: '/park/enterprise',
    method: 'GET',
    params
  })
}
export function qydelApi(id) {
  return instance({
    url: `/park/enterprise/` + id,
    method: 'DELETE',

  })
}
export function qyejzApi(data) {
  return instance({
    url: `/upload`,
    method: 'POST',
    data
  })
}
export function qyxqApi(id) {
  return instance({
    url: `/park/enterprise/` + id,
    method: 'GET',
    id
  })
}
export function qybjApi(data) {
  return instance({
    url: `/park/enterprise`,
    method: 'PUT',
    data
  })
}
export function qyxzApi(id) {
  return instance({
    url: `/download/` + id,
    method: 'POST',
    responseType: 'blob',

  })
}
export function qyzyApi(id) {
  return instance({
    url: `/park/enterprise/rent/` + id,
    method: 'GET',

  })
}
export function qygetApi(params) {
  return instance({
    url: `/parking/area/list`,
    method: 'GET',
    params
  })
}
export function qy1delApi(id) {
  return instance({
    url: `/parking/area/` + id,
    method: 'DELETE',

  })
}
export function qyxlApi() {
  return instance({
    url: `/parking/rule/list`,
    method: 'GET',

  })
}
export function qyadd1Api(data) {
  return instance({
    url: `/parking/area`,
    method: 'POST',
    data

  })
}
export function qybj1Api(data) {
  return instance({
    url: `/parking/area`,
    method: 'PUT',
    data
  })
}
export function getparApi(params) {
  return instance({
    url: `/parking/payment/list`,
    method: 'GET',
    params

  })
}
export function getbillingApi(params) {
  return instance({
    url: `/parking/rule/list`,
    method: 'GET',
    params

  })
}
export function delbillingApi(id) {
  return instance({
    url: `/parking/rule/` + id,
    method: 'DELETE',
  })
}
export function addbillingApi(data) {
  return instance({
    url: `/parking/rule`,
    method: 'POST',
    data
  })
}
export function xqbillingApi(id) {
  return instance({
    url: `/parking/rule/`+id,
    method: 'GET',

  })
}
export function updatebillingApi(data) {
  return instance({
    url: `/parking/rule`,
    method: 'PUT',
    data

  })
}




// export function getInfo(token) {
//   return instance({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return instance({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
