<template>
  <div id="code-editor" ref="codeEditorRef"></div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import * as monaco from "monaco-editor";

// 接收父组件传值
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

// 向父组件传值
const emit = defineEmits(["update:modelValue"]);

const codeEditorRef = ref();

let editor = null;

onMounted(() => {
  const initValue =
    props.modelValue ||
    `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello World";
}`;

  editor = monaco.editor.create(codeEditorRef.value, {
    value: initValue,
    language: "cpp",
    theme: "vs-dark",
    automaticLayout: true,
  });

  emit("update:modelValue", initValue);
  // 监听编辑器内容变化
  editor.onDidChangeModelContent(() => {
    const value = editor.getValue();

    // 传给父组件
    emit("update:modelValue", value);
  });
});
</script>

<style>
#code-editor {
  height: 400px;
  border: 1px solid #333;
}
</style>
