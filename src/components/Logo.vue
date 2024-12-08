<template>
  <img
    class="user-logo-img"
    :src="commonData.img"
    alt=""
  >
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCommonDataStore } from '@/store/commonData';

const commonDataStore = useCommonDataStore();
const { commonData } = storeToRefs(commonDataStore);
</script>
