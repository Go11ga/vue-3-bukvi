<template>
  <AdminPageWrapper
    :is-loading="isLoading"
    :crumbs="crumbs"
  >
    <template #headerAppend>
      <button
        class="btn btn-outline-primary"
        :disabled="isLoading"
        @click="onUpdate"
      >
        <span class="me-2">Сохранить</span>
        <span><i class="bi bi-sd-card" /></span>
      </button>
    </template>

    <main>
      <AdminScheduleForm
        v-if="schedule.length"
        :schedule="schedule"
        @setSchedule="onSetSchedule"
      />
    </main>
  </AdminPageWrapper>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useHead } from '@unhead/vue';
import { useScheduleStore } from '@/store/schedule';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import AdminScheduleForm from '@/components/admin/AdminScheduleForm';

const scheduleStore = useScheduleStore();
const { fetchSchedule, updateSchedule } = scheduleStore;
const toast = inject('toast');

useHead({
  title: () => 'Расписание',
});

const crumbs = ref([{ title: 'Расписание', name: '' }]);
const isLoading = ref(false);
const schedule = ref([]);
const formSchedule = ref([]);

const onSetSchedule = (scheduleTable) => {
  formSchedule.value = scheduleTable;
};

const getSchedule = async () => {
  try {
    isLoading.value = true;

    schedule.value = await fetchSchedule();
    onSetSchedule(schedule.value);
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

const onUpdate = async () => {
  try {
    isLoading.value = true;

    await updateSchedule(formSchedule.value);
    toast.success('Расписание сохранено');
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await getSchedule();
});
</script>
