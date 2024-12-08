<template>
  <PageWrapper
    :is-loading="isLoading"
    :crumbs="crumbs"
  >
    <main class="pb-4">
      <Event
        v-if="userEvent.id"
        :event="userEvent"
      />
    </main>
  </PageWrapper>
</template>

<script setup>
import {
  toRefs,
  ref,
  onMounted,
  inject,
} from 'vue';
import { useHead } from '@unhead/vue';
import { useUserEventsStore } from '@/store/userEvents';
import { useChartStore } from '@/store/chart';
import PageWrapper from '@/components/PageWrapper';
import Event from '@/components/Event';
import { PAGE_EVENT_LIST } from '@/constants/router';

const userEventsStore = useUserEventsStore();
const { fetchUserEvent, increaseUserEventWatch } = userEventsStore;

const chartStore = useChartStore();
const { createChartItem } = chartStore;

const toast = inject('toast');

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const { id } = toRefs(props);

const title = ref('');
useHead({
  title: () => title.value,
});

const isLoading = ref(false);
const userEvent = ref({});

const getEvent = async () => {
  try {
    isLoading.value = true;

    userEvent.value = await fetchUserEvent(id.value);
    title.value = userEvent.value.title;

    await increaseUserEventWatch(id.value);
    await createChartItem(id.value);
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

const crumbs = ref([]);

const setCrumbs = () => {
  crumbs.value = [
    { title: 'Главная', name: PAGE_EVENT_LIST },
    { title: title.value, name: '' },
  ];
};

onMounted(async () => {
  await getEvent();
  setCrumbs();
});
</script>
