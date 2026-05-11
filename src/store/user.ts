import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      meta: {
        access: "nologin",
      },
    },
  }),
  getters: {},
  actions: {
    getLoginUser({ commit }, payload) {
      commit("updateUser", {
        userName: "sugpepper",
        meta: { access: "admin" },
      });
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
