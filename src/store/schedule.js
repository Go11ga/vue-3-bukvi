import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  query,
  collection,
  orderBy,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/firebase';
import handleSnapshot from '@/utils/handleSnapshot.js';

export const useScheduleStore = defineStore('schedule', () => {
  const schedule = ref([]);

  const fetchSchedule = async () => {
    const fetchQuery = query(collection(db, 'table'), orderBy('innerId', 'asc'));
    const documentSnapshots = await getDocs(fetchQuery);

    schedule.value = handleSnapshot(documentSnapshots);
    return schedule.value;
  };

  const updateSchedule = async (scheduleTable) => {
    const promises = [];

    scheduleTable.forEach((el) => {
      const docRef = doc(db, 'table', el.id);
      const promise = updateDoc(docRef, { items: el.items });
      promises.push(promise);
    });

    await Promise.all(promises);
  };

  return {
  	schedule,
  	fetchSchedule,
  	updateSchedule,
  };
});
