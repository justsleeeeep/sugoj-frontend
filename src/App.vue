<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import { onMounted } from "vue";
import BasicLayout from "./layouts/BasicLayout.vue";
const doInit = () => {
  console.log("welcome to SUG-OJ");
};
onMounted(() => {
  doInit();
});
</script>
