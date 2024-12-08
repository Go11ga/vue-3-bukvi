<template>
  <AdminPageWrapper
    :is-loading="isLoading"
    :crumbs="crumbs"
  >
    <main>
      <AdminCommonDataForm
        v-if="commonData.id"
        v-model="isLoading"
        :common-data="commonData"
      />
    </main>
  </AdminPageWrapper>
</template>

<script setup>
import {
  ref,
  inject,
  onMounted,
} from 'vue';
import { useHead } from '@unhead/vue';
import { useCommonDataStore } from '@/store/commonData';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import AdminCommonDataForm from '@/components/admin/AdminCommonDataForm';

const commonDataStore = useCommonDataStore();
const { fetchCommonData } = commonDataStore;

const toast = inject('toast');

useHead({
  title: () => 'Общая информация',
});

const crumbs = ref([{ title: 'Общая информация', name: '' }]);
const isLoading = ref(false);
const commonData = ref({});

const getCommonData = async () => {
  try {
    isLoading.value = true;

    commonData.value = await fetchCommonData();
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await getCommonData();
});
</script>
