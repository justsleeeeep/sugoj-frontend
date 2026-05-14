import ACCESS_ENUM from "@/access/accessEnum";
import { StoreOptions } from "vuex";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      // meta: {
      //   userRole: ACCESS_ENUM.NOT_LOGIN,
      // },
    },
  }),
  getters: {},
  actions: {
    async getLoginUser({ commit, state }, payload) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code == 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
          //userRole: payload.userRole,
        });
        console.log(state.loginUser);
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
