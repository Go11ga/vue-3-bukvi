import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
 query, collection, getDocs, doc, updateDoc,
} from 'firebase/firestore';
import { db } from '@/firebase';
import handleSnapshot from '@/utils/handleSnapshot.js';

export const useReminderStore = defineStore('reminder', () => {
	const reminder = ref({});

	const fetchReminder = async () => {
    const fetchQuery = query(collection(db, 'memo'));
    const documentSnapshots = await getDocs(fetchQuery);

    const reminderData = handleSnapshot(documentSnapshots);
    const [reminderEl] = reminderData;
    reminder.value = reminderEl;

    return reminder.value;
  };

  const updateReminder = async ({ id, text }) => {
    const docRef = doc(db, 'memo', id);
    await updateDoc(docRef, { text });
  };

  return {
  	reminder,
  	fetchReminder,
  	updateReminder,
  };
});
