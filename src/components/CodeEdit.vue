<template>
  <div id="code-editor" ref="codeEditorRef"></div>
  <button @click="printCode">打印代码</button>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as monaco from "monaco-editor";

const codeEditorRef = ref();
let editor = null;
onMounted(() => {
  editor = monaco.editor.create(codeEditorRef.value, {
    value: `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello World";
}`,
    language: "cpp",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: true,
      scale: 3,
      size: "fill",
    },
  });
});
const printCode = () => {
  console.log(editor.getValue());
};
</script>

<style>
#code-editor {
  height: 500px;
  border: 1px solid #333;
}
</style>
