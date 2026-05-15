<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">用户注册</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        field="checkPassword"
        tooltip="重新输入密码"
        label="验证密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请重新输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" style="width: 120px" type="primary"
          >注册</a-button
        >
      </a-form-item>
      <a style="text-align: left" href="http://localhost:8080/user/login">
        如有账号点击跳转登陆界面
      </a>
    </a-form>
    <!-- {{ form }} -->
  </div>
</template>

<script setup lang="ts">
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import { reactive } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);
const router = useRouter();
const store = useStore();
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code == 0) {
    alert("注册成功:id=" + JSON.stringify(res.data));
    router.push({
      path: "/user/login",
    });
  } else {
    message.error("注册失败" + res.message);
  }
};
</script>
