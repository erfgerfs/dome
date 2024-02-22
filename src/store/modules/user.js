import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken()
  }
}

const state = {
  token: getToken(),
}
const mutations = {

  setToken: (state, token) => {
    state.token = token
    setToken(token)
  },

  removeToken(state) {
    state.token = null
    removeToken()
  },
}

const actions = {
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

