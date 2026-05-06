<template>
  <div class="menu-demo">
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
  </div>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const route = useRoute();
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
