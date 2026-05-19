<template>
  <div id="code-editor" ref="codeEditorRef"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as monaco from "monaco-editor";

const codeEditorRef = ref();

onMounted(() => {
  monaco.editor.create(codeEditorRef.value, {
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
</script>

<style>
#code-editor {
  height: 500px;
  border: 1px solid #333;
}
</style>
