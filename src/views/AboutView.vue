<script setup lang="ts">
import { ref, watch } from "vue";
import MdEdit from "@/components/MdEdit.vue";

const content = ref("");

// 监听 markdown 内容变化
watch(content, (newValue) => {
  console.log("md内容:", newValue);
});
</script>

<template>
  <div class="about">
    <MdEdit v-model="content" />
    <h1>This is an about page</h1>
  </div>
</template>
