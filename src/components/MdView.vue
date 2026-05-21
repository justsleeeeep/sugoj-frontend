<template>
  <Viewer :value="modelValue" :plugins="plugins" />
</template>

<script>
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Viewer } from "@bytemd/vue-next";

const plugins = [gfm(), highlight()];

export default {
  components: { Viewer },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      plugins,
    };
  },
};
</script>
