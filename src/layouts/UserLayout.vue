<script setup lang="ts"></script>

<template>
  <div id="UserLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="@/assets/oj-logo.png" class="logo" />
          <div>SUG-OJ</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="http://localhost:8080"> 神秘网址 </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#UserLayout {
  text-align: center;
}
#UserLayout .logo {
  width: 64px;
  height: 64px;
}
#UserLayout .header {
  /* margin-top: 16px;
  margin-bottom: 16px; */
  /* box-shadow: #eee 1px 1px 5px; */
}
#UserLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}
#UserLayout .footer {
  margin-bottom: 16px;
  padding: 16px;
  position: sticky;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
}
</style>
