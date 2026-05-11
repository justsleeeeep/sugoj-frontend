import ACCESS_ENUM from "@/access/accessEnum";
import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      meta: {
        userRole: ACCESS_ENUM.NOT_LOGIN,
      },
    },
  }),
  getters: {},
  actions: {
    getLoginUser({ commit }, payload) {
      commit("updateUser", payload);
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
