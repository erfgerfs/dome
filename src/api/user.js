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
    headers: {
      'Content-Type': 'multipart/form-data'
    },
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
    url: `/parking/rule/` + id,
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
export function getmonthCardApi(params) {
  return instance({
    url: `/parking/card/list`,
    method: 'GET',
    params

  })
}
export function getcostApi(params) {
  return instance({
    url: `/park/propertyfee`,
    method: 'GET',
    params

  })
}
export function delcostApi(id) {
  return instance({
    url: `/park/propertyfee/` + id,
    method: 'DELETE',


  })
}
export function addcostApi(data) {
  return instance({
    url: `/park/propertyfee`,
    method: 'POST',
    data
  })
}
export function AllenterprisecostApi() {
  return instance({
    url: `/park/all/enterprise`,
    method: 'GET',
  })
}
export function AllbuildingcostApi() {
  return instance({
    url: `/park/all/building`,
    method: 'GET',
  })
}
export function getinfoApi(params) {
  return instance({
    url: `/pole/info/list`,
    method: 'GET',
    params
  })
}
export function delinfoApi(ids) {
  return instance({
    url: `/pole/info/` + ids,
    method: 'DELETE',

  })
}
export function addinfoApi(data) {
  return instance({
    url: `/pole/info`,
    method: 'POST',
    data
  })
}
export function listinfoApi() {
  return instance({
    url: `/parking/area/dropList`,
    method: 'GET',

  })
}
export function bjinfoApi(data) {
  return instance({
    url: `/pole/info`,
    method: 'PUT',
    data
  })
}
//获取企业楼宇  /park/rent/building
export function listbuildingApi() {
  return instance({
    url: `/park/rent/building`,
    method: 'GET',
  })
}
//企业添加合同 /park/enterprise/rent
export function addbuildingApi(data) {
  return instance({

    url: `/park/enterprise/rent`,
    method: 'POST',
    data
  })
}

//月卡管理 删除   /parking/card/{ids}
export function delcardApi(ids) {
  return instance({
    url: `/parking/card/` + ids,
    method: 'DELETE',
  })
}
//月卡管理 添加   /parking/card/{ids}
export function addcardApi(data) {
  return instance({
    url: `/parking/card`,
    method: 'POST',
    data
  })
}
//月卡管理 详情   /parking/card/{ids}
export function xqcardApi(id) {
  return instance({
    url: `/parking/card/detail/` + id,
    method: 'GET',
  })
}
//月卡管理 编辑   /parking/card/{ids}
export function updatecardApi(data) {
  return instance({
    url: `/parking/card/edit`,
    method: 'PUT',
    data
  })
}
//系统管理员工 列表   /park/sys/user
export function listemployeeApi(params) {
  return instance({
    url: `/park/sys/user`,
    method: 'GET',
    params
  })
}
//系统管理员工 列表   /park/sys/role
export function getemployeeApi() {
  return instance({
    url: `/park/sys/role`,
    method: 'GET',
  })
}
//系统管理员工 添加   /park/sys/user
export function addemployeeApi(data) {
  return instance({
    url: `/park/sys/user`,
    method: 'POST',
    data
  })
}
//系统管理员工 添加   /park/sys/user/12270
export function delemployeeApi(id) {
  return instance({
    url: `/park/sys/user/` + id,
    method: 'DELETE',

  })
}
//系统管理员工 编辑   /park/sys/user/12270
export function updateemployeeApi(data) {
  return instance({
    url: `/park/sys/user`,
    method: 'PUT',
    data
  })
}
//系统管理员工 重置密码   /park/sys/user/resetPwd
export function passemployeeApi(data) {
  return instance({
    url: `/park/sys/user/resetPwd`,
    method: 'PUT',
    data
  })
}
//企业 退租   /park/enterprise/rent/{id}
export function tuienterpriseApi(id) {
  return instance({
    url: `/park/enterprise/rent/` + id,
    method: 'PUT',

  })
}
//企业 删除合同   /park/enterprise/rent/{id}
export function delenterpriseApi(id) {
  return instance({
    url: `/park/enterprise/rent/` + id,
    method: 'DELETE',

  })
}
//月卡 续费   /parking/card/recharge
export function xfrechargeApi(data) {
  return instance({
    url: `/parking/card/recharge`,
    method: 'POST',
    data
  })
}
//月卡 查看   /parking/card/{Id}
export function ckrechargeApi(id) {
  return instance({
    url: `/parking/card/` + id,
    method: 'GET',

  })
}
//角色 列表   /park/sys/role
export function listroleApi() {
  return instance({
    url: `/park/sys/role`,
    method: 'GET',

  })
}
//角色 功能权限   park/sys/role/
export function gnroleApi(id) {
  return instance({
    url: `/park/sys/role/` + id,
    method: 'GET',

  })
}
//角色 获取树状   /park/sys/permision/all/tree
export function getroleApi() {
  return instance({
    url: `/park/sys/permision/all/tree`,
    method: 'GET',

  })
}
//角色 成员   /park/sys/permision/all/tree
export function cyroleApi(id, params) {
  return instance({
    url: `/park/sys/roleUser/` + id,
    method: 'GET',
    params
  })
}
//角色 添加   /api/park/sys/role
export function addroleApi(data) {
  return instance({
    url: `/park/sys/role`,
    method: 'POST',
    data
  })
}
//角色 删除   /api/park/sys/role
export function delroleApi(id) {
  return instance({
    url: `/park/sys/role/` + id,
    method: 'DELETE',

  })
}
//角色 编辑   /park/sys/role
export function updateroleApi(data) {
  return instance({
    url: `/park/sys/role/`,
    method: 'PUT',
    data

  })
}





export function getInfo() {
  return instance({
    url: '/park/user/profile',
    method: 'GET',

  })
}

//背景图片
export function bgurlApi() {
  return instance({
    url: '/assets/login-bg-e4ea539c.svg',
    method: 'GET',

  })
}

// export function logout() {
//   return instance({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
