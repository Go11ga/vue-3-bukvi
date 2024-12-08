<template>
  <div class="admin-page-wrapper">
    <nav class="sticky-top bg-body-tertiary admin-page-wrapper__nav">
      <BreadCrumbs
        v-if=crumbs.length
        :crumbs="crumbs"
      />

      <div class="admin-page-wrapper__header-slot">
        <slot name="headerAppend" />
      </div>
    </nav>

    <div class="admin-page-wrapper__body">
      <slot />
    </div>

    <PreLoader
      v-if="isLoading"
      :is-loading="isLoading"
    />
  </div>
</template>

<script setup>
import { toRefs } from 'vue';
import PreLoader from '@/components/PreLoader';
import BreadCrumbs from '@/components/ui/BreadCrumbs';

const props = defineProps({
  crumbs: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const { crumbs, isLoading } = toRefs(props);
</script>
