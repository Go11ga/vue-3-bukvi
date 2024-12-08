<template>
  <div class="main-layout">
    <UserNav />

    <router-view />

    <UserFooter />
  </div>
</template>

<script setup>
import { onMounted, inject } from 'vue';
import { useCommonDataStore } from '@/store/commonData';
import UserNav from '@/components/UserNav';
import UserFooter from '@/components/UserFooter';

const commonDataStore = useCommonDataStore();
const { fetchCommonData } = commonDataStore;

const toast = inject('toast');

const getCommonData = async () => {
  try {
    await fetchCommonData();
  } catch (e) {
    toast.error(e.message);
  }
};

onMounted(async () => {
  await getCommonData();
});
</script>
