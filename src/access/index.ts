import store from "@/store";
import router from "@/router";
import ACCESS_ENUM from "./accessEnum";
import checkAccess from "./checkAccess";
router.beforeEach(async (to, form, next) => {
  const user = store.state.user.loginUser;
  if (!user || !user.userRole) {
    await store.dispatch("user/getLoginUser");
    const newuser = store.state.user.loginUser;
    const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
    if (needAccess != ACCESS_ENUM.NOT_LOGIN) {
      if (newuser.userRole == ACCESS_ENUM.NOT_LOGIN) {
        next("/user/login?redirect=${to.fullPath}");
        return;
      } else if (!checkAccess(newuser, needAccess)) {
        next("/noAuth");
      }
    }
  }
  next();
});
