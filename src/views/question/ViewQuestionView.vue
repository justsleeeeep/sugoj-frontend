<template>
  <div id="viewQuestionview">
    <a-row :gutter="16">
      <!-- 题目区域 -->
      <a-col :span="12">
        <a-card>
          <h2>{{ form.title }}</h2>

          <!-- 标签 -->
          <div style="margin-bottom: 16px">
            <a-tag v-for="tag in form.tags" :key="tag">
              {{ tag }}
            </a-tag>
          </div>

          <!-- 提交信息 -->
          <p>提交数：{{ form.submitNum }}</p>
          <p>通过数：{{ form.acceptNum }}</p>

          <!-- 判题配置 -->
          <div style="margin-bottom: 16px">
            <p>时间限制：{{ judgeConfig.timelimit }} ms</p>
            <p>内存限制：{{ judgeConfig.memorylimit }} kb</p>
            <p>堆栈限制：{{ judgeConfig.stacklimit }} kb</p>
          </div>

          <!-- 题目内容 -->
          <MdView :model-value="form.content" />
        </a-card>
      </a-col>

      <!-- 编辑器区域 -->
      <a-col :span="12">
        <!-- 语言选择 -->
        <div style="margin-bottom: 16px">
          <a-select
            v-model="codeAndLan.language"
            :style="{ width: '320px' }"
            placeholder="请选择语言"
          >
            <a-option value="c++">c++</a-option>
            <a-option value="java">java</a-option>
            <a-option value="golang">golang</a-option>
          </a-select>
        </div>

        <!-- 代码编辑器 -->
        <CodeEdit v-model="codeAndLan.code" :language="codeAndLan.language" />

        <!-- 提交按钮 -->
        <div style="display: flex; justify-content: flex-end; margin-top: 16px">
          <a-button type="primary" style="min-width: 200px" @click="doSubmit">
            提交代码
          </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import {
  QuestionControllerService,
  QuestionSubmitControllerService,
} from "../../../generated";

import message from "@arco-design/web-vue/es/message";

import CodeEdit from "@/components/CodeEdit.vue";
import MdView from "@/components/MdView.vue";

// 路由
const route = useRoute();

// 题目数据
const form = ref<any>({});

// 提交数据
const codeAndLan = ref({
  questionId: Number(route.params.id),
  language: "c++",
  code: "",
});

// 加载题目
const loadData = async () => {
  const id = Number(route.params.id);

  const res = await QuestionControllerService.getQuestionByIdVoUsingGet(id);

  if (res.code === 0) {
    form.value = res.data;
  } else {
    message.error("查询失败：" + res.message);
  }
};

// 页面加载
onMounted(() => {
  loadData();
});

// 提交代码
const doSubmit = async () => {
  // 校验语言
  if (!codeAndLan.value.language) {
    message.warning("请选择编程语言");
    return;
  }

  // 校验代码
  if (!codeAndLan.value.code.trim()) {
    message.warning("请输入代码");
    return;
  }

  console.log("提交参数：", codeAndLan.value);

  const res = await QuestionSubmitControllerService.addQuestionSubmitUsingPost(
    codeAndLan.value,
  );

  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败：" + res.message);
  }
};

/**
 * 判题配置
 * 后端返回的是 JSON 字符串
 */
const judgeConfig = computed(() => {
  if (!form.value.judgeConfig) {
    return {};
  }

  try {
    return JSON.parse(form.value.judgeConfig);
  } catch (e) {
    console.error("judgeConfig 解析失败", e);
    return {};
  }
});
</script>

<style scoped>
#viewQuestionview {
  padding: 24px;
}
</style>
