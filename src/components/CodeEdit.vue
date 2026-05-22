<template>
  <div id="code-editor" ref="codeEditorRef"></div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, watch } from "vue";
import * as monaco from "monaco-editor";

// 接收父组件参数
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: "c++",
  },
});

// 向父组件传值
const emit = defineEmits(["update:modelValue"]);

const codeEditorRef = ref();

let editor = null;

// 不同语言配置
const languageMap = {
  "c++": {
    language: "cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}`,
  },

  java: {
    language: "java",
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
  },

  golang: {
    language: "go",
    code: `package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}`,
  },
};

onMounted(() => {
  // 当前语言配置
  const config = languageMap[props.language] || languageMap.cpp;

  // 初始代码
  const initValue = props.modelValue || config.code;

  // 创建编辑器
  editor = monaco.editor.create(codeEditorRef.value, {
    value: initValue,
    language: config.language,
    theme: "vs-dark",
    automaticLayout: true,

    minimap: {
      enabled: true,
      scale: 3,
      size: "fill",
    },
  });

  // 初始化同步给父组件
  emit("update:modelValue", initValue);

  // 内容变化
  editor.onDidChangeModelContent(() => {
    const value = editor.getValue();

    emit("update:modelValue", value);
  });
});

// 监听语言变化
watch(
  () => props.language,
  (newLanguage) => {
    if (!editor) return;

    const config = languageMap[newLanguage] || languageMap.cpp;

    // 修改 Monaco 语言
    monaco.editor.setModelLanguage(editor.getModel(), config.language);

    // 修改默认代码
    editor.setValue(config.code);

    // 同步给父组件
    emit("update:modelValue", config.code);
  },
);
</script>

<style scoped>
#code-editor {
  height: 500px;
  border: 1px solid #333;
}
</style>
