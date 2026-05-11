<template>
  <a-row
    id="globalheader"
    class="grid-demo"
    style="margin-bottom: 16px"
    align="center"
    :wrap="false"
  >
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="[route.path]"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/oj-logo.png" />
            <div class="title">SUG-OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user.loginUser.userName }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";
import AdminView from "@/views/AdminView.vue";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import { computed } from "vue";
const router = useRouter();
const route = useRoute();
const store = useStore();
const visibleRoutes = computed(() => {
  const loginUser = store.state.user.loginUser;
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) return false;
    if (!checkAccess(loginUser, item.meta?.access as string)) return false;
    return true;
  });
});
setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "sugpepper",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);
// router.beforeEach((to, form, next) => {
//   const user = store.state.user.loginUser;
//   if (to.meta.access == ACCESS_ENUM.ADMIN) {
//     console.log(user.meta.role);
//     if (user.meta.userRole != ACCESS_ENUM.ADMIN) {
//       next("/NoAuth");
//       return;
//     }
//   }
//   next();
// });
// const selectedKeys = ref(["/"]);
// router.afterEach((to, from, failure) => {
//   selectedKeys.value = [to.path];
// });
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}
.title {
  color: #444;
  margin-left: 16px;
}
.logo {
  height: 48px;
}
</style>
