<template>
  <div
    v-if="isActive"
    class="scroll-btn"
  >
    <button
      class="user__btn btn btn-success"
      @click="onClick"
    >
      <i class="bi bi-arrow-up" />
    </button>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  isActive: {
    type: Boolean,
    default: true,
  },
});

const { isActive } = toRefs(props);

const onClick = () => window.scrollTo(0, 0);
</script>
