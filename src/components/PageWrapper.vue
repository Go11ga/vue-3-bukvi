<template>
  <div
    class="page-wrapper"
  >
    <div :class="container">
      <div class="row h-100">
        <BreadCrumbs
          v-if=crumbs.length
          :crumbs="crumbs"
        />

        <div class="d-flex justify-content-between align-items-center">
          <h2
            v-if="title"
            class="my-4"
          >
            {{ title }}
          </h2>

          <div>
            <slot name="headerAppend" />
          </div>
        </div>

        <slot />

        <PreLoader
          v-if="isLoading"
          :is-loading="isLoading"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  toRefs,
  computed,
} from 'vue';
import PreLoader from '@/components/PreLoader';
import BreadCrumbs from '@/components/ui/BreadCrumbs';

const props = defineProps({
  fluid: {
    type: Boolean,
    default: false,
  },
  crumbs: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const {
  fluid,
  crumbs,
  title,
  isLoading,
} = toRefs(props);

const container = computed(() => (fluid.value ? 'container-fluid' : 'container'));
</script>
