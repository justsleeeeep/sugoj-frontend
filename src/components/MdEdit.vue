<template>
  <Editor
    :value="modelValue"
    mode="split"
    :plugins="plugins"
    @change="handleChange"
  />
</template>

<script>
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor } from "@bytemd/vue-next";

const plugins = [gfm(), highlight()];

export default {
  components: { Editor },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue"],

  data() {
    return {
      plugins,
    };
  },

  methods: {
    handleChange(v) {
      this.$emit("update:modelValue", v);
    },
  },
};
</script>

<style>
.bytemd-toolbar-right > :last-child {
  display: none;
}
</style>
