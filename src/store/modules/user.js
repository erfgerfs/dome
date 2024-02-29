import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { constantRoutes } from '@/router/index'

const state = {
  token: getToken(),
  userInfo: {},
  mens: [...constantRoutes]
}
const mutations = {
  setInfo(state, ooo) {
    console.log('ooo', ooo);
    state.userInfo = ooo
  },
  setRouter(start, dtrouter) {
    start.mens = [...constantRoutes, ...dtrouter,]
  },

  setToken: (state, token) => {
    state.token = token
    setToken(token)
  },

  removeToken(state) {
    state.token = null
    state.userInfo = null
    removeToken()
  },
}

const actions = {


  async setInfo1({ commit }) {
    const res = await getInfo()
    console.log(res.data.data);
    commit('setInfo', res.data.data)
  },


  async login(context, payload) {
    const res = await login(payload)
    console.log(res);
    context.commit('setToken', res.data.data.token)

  },
  logout(context) {
    context.commit('removeToken') // 删除token

    // context.commit('setUserInfo', {}) // 设置⽤户信息为空对象

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

