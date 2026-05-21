<template>
  <div id="viewQuestionview">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card>
          <h2>{{ form.title }}</h2>
          <div style="margin-bottom: 16px">
            <a-tag v-for="tag in form.tags" :key="tag">
              {{ tag }}
            </a-tag>
          </div>
          <p>提交数：{{ form.submitNum }}</p>
          <p>通过数：{{ form.acceptNum }}</p>
          <div style="margin-bottom: 16px">
            <p>
              时间限制：
              {{ judgeConfig.timelimit }} ms
            </p>

            <p>
              内存限制：
              {{ judgeConfig.memorylimit }} kb
            </p>

            <p>
              堆栈限制：
              {{ judgeConfig.stacklimit }} kb
            </p>
          </div>
          <MdView :model-value="form.content" />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-select
          :style="{ width: '320px' }"
          placeholder="选择语言"
          v-model="codeAndLan.language"
        >
          <a-option>java</a-option>
          <a-option>c++</a-option>
          <a-option>golang</a-option>
        </a-select>
        <CodeEdit v-model="codeAndLan.code" />
        <div style="display: flex; justify-content: flex-end">
          <a-button @click="doSubmit" type="primary" style="min-width: 200px">
            提交代码
          </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";

import CodeEdit from "@/components/CodeEdit.vue";
import MdView from "@/components/MdView.vue";

const form = ref<any>({});

const route = useRoute();

const loadData = async () => {
  const id = route.params.id;

  const res = await QuestionControllerService.getQuestionByIdVoUsingGet(
    Number(id),
  );

  if (res.code === 0) {
    form.value = res.data;
  } else {
    message.error("查询失败：" + res.message);
  }
};

onMounted(() => {
  loadData();
});

const codeAndLan = ref({
  questionId: Number(route.params.id),
  language: "",
  code: "",
});
const doSubmit = async () => {
  const res = await QuestionSubmitControllerService.addQuestionSubmitUsingPost(
    codeAndLan.value,
  );
  if (res.code == 0) {
    message.success("提交成功");
  } else message.error("加载失败" + res.message);
};

/**
 * judgeConfig 是字符串
 * 要转成对象
 */
const judgeConfig = computed(() => {
  if (!form.value.judgeConfig) {
    return {};
  }

  return JSON.parse(form.value.judgeConfig);
});
</script>
