<template>
  <AdminPageWrapper
    :is-loading="isLoading"
    :crumbs="crumbs"
  >
    <main>
      <AdminViewsChart
        v-if="views.length"
        :views="views"
      />
    </main>
  </AdminPageWrapper>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { useHead } from '@unhead/vue';
import { useChartStore } from '@/store/chart';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import AdminViewsChart from '@/components/admin/AdminViewsChart';
import handleChartDate from '@/utils/handleChartDate.js';

const chartStore = useChartStore();
const { fetchChart } = chartStore;

const toast = inject('toast');

useHead({
  title: () => 'Статистика просмотров',
});

const crumbs = ref([{ title: 'Статистика просмотров', name: '' }]);
const isLoading = ref(false);
const views = ref([]);

const getViews = async () => {
  try {
    isLoading.value = true;

    const response = await fetchChart();
    const arr = [];

    response.forEach((el) => {
      const idx = arr.findIndex((arrItem) => arrItem.x === handleChartDate(el.date));

      if (idx !== -1) {
        // eslint-disable-next-line
        arr[idx]['y'] = +arr[idx]['y'] + 1;
      } else {
        arr.push({
          y: +el.watch,
          x: handleChartDate(el.date),
        });
      }
    });

    views.value = arr;
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await getViews();
});
</script>
