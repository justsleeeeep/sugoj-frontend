<template>
  <a-row
    id="globalheader"
    class="grid-demo"
    style="margin-bottom: 16px"
    align="center"
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
        <a-menu-item v-for="item in routes" :key="item.path">
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
const router = useRouter();
const route = useRoute();
const store = useStore();
setTimeout(() => {
  store.dispatch("user/getLoginUser", { userName: "" });
}, 3000);
router.beforeEach((to, form, next) => {
  const user = store.state.user.loginUser;
  if (to.path == "/admin") {
    if (user.meta.access != "admin") {
      next("/NoAuth");
      return;
    }
  }
  next();
});
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
