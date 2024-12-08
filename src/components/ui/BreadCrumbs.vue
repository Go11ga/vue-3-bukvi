<template>
  <div class="breadcrumbs">

    <button
      v-for="(crumb, idx) in crumbs"
      :key="idx"
      class="breadcrumbs__link"
      :class="{ 'breadcrumbs__link--disabled': idx === crumbs.length - 1 }"
      @click="$router.push({ name: crumb.name, params: crumb.params })"
    >
      {{ crumb.title }}
    </button>

  </div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  crumbs: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const { crumbs } = toRefs(props);
</script>
