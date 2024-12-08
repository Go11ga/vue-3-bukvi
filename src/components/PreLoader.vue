<template>
  <div
    class="pre-loader"
    :class="{ 'is-loading': isLoading }"
  />
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const { isLoading } = toRefs(props);
</script>
