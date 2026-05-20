<template>
  <div id="addquestionview">创建题目</div>
  <a-form :model="form">
    <a-form-item field="title" label="标题">
      <a-input v-model="form.title" placeholder="请输入标题" />
    </a-form-item>
    <a-form-item field="tags" label="标签">
      <a-input-tag
        :style="{ width: '380px' }"
        placeholder="请输入标签"
        :max-tag-count="3"
        allow-clear
      />
    </a-form-item>
    <a-form-item field="cnetent" label="内容">
      <MdEdit />
    </a-form-item>
    <a-form-item field="answer" label="答案">
      <MdEdit />
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

    <a-form-item field="name" label="Username">
      <a-input
        v-model="form.name"
        placeholder="please enter your username..."
      />
    </a-form-item>
    <a-form-item
      v-for="(post, index) of form.posts"
      :field="`posts[${index}].value`"
      :label="`Post-${index}`"
      :key="index"
    >
      <a-input v-model="post.value" placeholder="please enter your post..." />
      <a-button @click="handleDelete(index)" :style="{ marginLeft: '10px' }"
        >Delete</a-button
      >
    </a-form-item>
    <div>
      <a-button @click="handleAdd">Add Post</a-button>
    </div>

    <a-form-item>
      <a-button>Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import MdEdit from "@/components/MdEdit.vue";
import { reactive } from "vue";
const form = reactive({
  title: "Test",
  tags: ["easy"],
  content: "centent1",
  answer: "answer2",
  judgeConfig: {
    timelimit: 100,
    memorylimit: 100,
    stacklimit: 100,
  },
  judgeCase: [
    {
      input: "1",
      output: "1",
    },
  ],
});
</script>

<style>
#addquestionview {
}
</style>
