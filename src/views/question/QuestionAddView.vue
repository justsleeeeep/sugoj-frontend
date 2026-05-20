<template>
  <div id="questionaddview">
    <h2>创建题目</h2>
    <a-form :model="form" label-align="left">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag
          v-model="form.tags"
          :style="{ width: '380px' }"
          placeholder="请输入标签"
          :max-tag-count="3"
          allow-clear
        />
      </a-form-item>
      <a-form-item field="content" label="内容">
        <MdEdit v-model="form.content" />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEdit v-model="form.answer" />
      </a-form-item>

      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="min-width: 580px">
          <a-form-item field="judgeConfig.timelimit" label="时间限制(ms)">
            <a-input-number
              v-model="form.judgeConfig.timelimit"
              mode="button"
              size="large"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.memorylimit" label="空间限制(kb)">
            <a-input-number
              v-model="form.judgeConfig.memorylimit"
              mode="button"
              size="large"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.stacklimit" label="堆栈限制(kb)">
            <a-input-number
              v-model="form.judgeConfig.stacklimit"
              mode="button"
              size="large"
            />
          </a-form-item>
        </a-space>
      </a-form-item>

      <a-form-item label="测试用例" :content-flex="false" :merge-props="false">
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          no-style
          :key="index"
        >
          <a-space direction="vertical" style="min-width: 640px">
            <a-form-item
              :field="`from.judgeCase[${index}].input`"
              :label="`输入用例`"
              :key="index"
            >
              <a-input v-model="judgeCaseItem.input" placeholder="输入" />
            </a-form-item>
            <a-form-item
              :field="`from.judgeCase[${index}].output`"
              :label="`输出用例`"
              :key="index"
            >
              <a-input v-model="judgeCaseItem.output" placeholder="输出" />
            </a-form-item>
            <a-button
              type="outline"
              status="danger"
              @click="handleDelete(index)"
              >删除</a-button
            >
          </a-space>
        </a-form-item>
        <div style="margin-top: 32px">
          <a-button type="outline" status="success" @click="handleAdd"
            >新增测试用例</a-button
          >
        </div>
      </a-form-item>
      <div style="margin-top: 16px"></div>
      <a-form-item>
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import MdEdit from "@/components/MdEdit.vue";
import { QuestionControllerService } from "../../../generated";
import { reactive } from "vue";
import message from "@arco-design/web-vue/es/message";
const form = reactive({
  title: "A+B",
  tags: ["easy"],
  content: "A+B",
  answer: "无题解",
  judgeConfig: {
    timelimit: 1000,
    memorylimit: 524288,
    stacklimit: 524288,
  },
  judgeCase: [
    {
      input: "1 1",
      output: "2",
    },
    {
      input: "2 5",
      output: "7",
    },
  ],
});
const doSubmit = async () => {
  console.log(form);
  const res = await QuestionControllerService.addQuestionUsingPost(form);
  if (res.code == 0) {
    message.success("创建成功");
  } else {
    message.error("创建失败" + res.message);
  }
};
const handleAdd = () => {
  form.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.judgeCase.splice(index, 1);
};
</script>

<style>
#addquestionview {
}
</style>
