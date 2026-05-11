import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      meta: {
        role: "nologin",
      },
    },
  }),
  getters: {},
  actions: {
    getLoginUser({ commit }, payload) {
      commit("updateUser", {
        userName: "sugpepper",
        meta: { role: "admin" },
      });
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
