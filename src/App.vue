<template>
  <component :is="components[layout]" />
</template>

<script setup>
import { shallowRef, computed } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '@/layouts/MainLayout';
import EmptyLayout from '@/layouts/EmptyLayout';
import AdminLayout from '@/layouts/AdminLayout';

const components = shallowRef({
  MainLayout,
  EmptyLayout,
  AdminLayout,
});

const route = useRoute();
const layout = computed(() => `${route.meta.layout || 'main'}Layout`);
</script>
