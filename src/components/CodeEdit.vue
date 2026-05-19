<template>
  <div id="code-editor" ref="codeEditorRef" />
  <Editor :value="modelValue" :plugins="plugins" @change="handleChange" />
</template>

<script>
import * as monaco from "monaco-editor";
const codeEditorRef = ref();
const myEditor = monaco.editor.create(document.getElementById("container"), {
  value,
  language: "javascript",
  automaticLayout: true,
});
</script>

<style></style>
