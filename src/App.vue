<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')"> <router-view /></template>
    <template v-else> <BasicLayout /> </template>
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import { onMounted } from "vue";
import BasicLayout from "./layouts/BasicLayout.vue";
import { useRoute } from "vue-router";
const route = useRoute();

const doInit = () => {
  console.log("welcome to SUG-OJ");
};
onMounted(() => {
  doInit();
});
</script>
