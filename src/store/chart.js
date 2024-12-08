import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  query,
  collection,
  addDoc,
  getDocs,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/firebase';
import handleSnapshot from '@/utils/handleSnapshot.js';

export const useChartStore = defineStore('chart', () => {
  const chart = ref([]);

  const createChartItem = async (id) => {
    const chartItem = {
      eventId: id,
      date: new Date(),
      watch: 1,
    };

    await addDoc(collection(db, 'views'), chartItem);
  };

  const fetchChart = async () => {
    const fetchQuery = query(collection(db, 'views'), orderBy('date', 'asc'));
    const documentSnapshots = await getDocs(fetchQuery);

    chart.value = handleSnapshot(documentSnapshots);

    return chart.value;
  };

  return {
  	chart,
  	createChartItem,
  	fetchChart,
  };
});
