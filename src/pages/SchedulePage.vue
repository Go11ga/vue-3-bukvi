<template>
  <PageWrapper
    title="Расписание"
    :is-loading="isLoading"
  >
    <main class="pb-4">
      <Schedule :schedule="schedule" />
    </main>
  </PageWrapper>
</template>

<script setup>
import {
  ref,
  onMounted,
  inject,
} from 'vue';
import { useHead } from '@unhead/vue';
import { useScheduleStore } from '@/store/schedule';
import PageWrapper from '@/components/PageWrapper';
import Schedule from '@/components/Schedule';

const scheduleStore = useScheduleStore();
const { fetchSchedule } = scheduleStore;

const toast = inject('toast');

useHead({
  title: 'Расписание',
});

const schedule = ref({});
const isLoading = ref(false);

const getSchedule = async () => {
  try {
    isLoading.value = true;

    schedule.value = await fetchSchedule();
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
