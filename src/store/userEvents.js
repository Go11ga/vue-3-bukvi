import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  query,
  collection,
  getCountFromServer,
  orderBy,
  limit,
  getDocs,
  startAfter,
  doc,
  getDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { db } from '@/firebase';
import handleSnapshot from '@/utils/handleSnapshot.js';

export const useUserEventsStore = defineStore('userEvents', () => {
  const userEvents = ref([]);
  const userCount = ref(0);
  const userEventsLimit = ref(10);
  const userEventsStartQuery = ref({});
  const userEventsEndQuery = ref({});

  const fetchUserEvents = async () => {
    const coll = collection(db, 'news');
    const snapshot = await getCountFromServer(coll);
    userCount.value = snapshot.data().count;

    const fetchQuery = query(collection(db, 'news'), orderBy('pubDate', 'desc'), limit(userEventsLimit.value));
    const documentSnapshots = await getDocs(fetchQuery);

    userEvents.value = handleSnapshot(documentSnapshots);

    const [firstDoc] = documentSnapshots.docs;
    userEventsStartQuery.value = firstDoc;
    userEventsEndQuery.value = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return userEvents.value;
  };

  const fetchNextUserEvents = async () => {
    const fetchNextQuery = query(collection(db, 'news'), orderBy('pubDate', 'desc'), startAfter(userEventsEndQuery.value), limit(userEventsLimit.value));
    const documentSnapshots = await getDocs(fetchNextQuery);

    userEvents.value = handleSnapshot(documentSnapshots);
    userEventsEndQuery.value = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return userEvents.value;
  };

  const userEvent = ref({});

  const fetchUserEvent = async (id) => {
    const docRef = doc(db, 'news', id);
    const docSnap = await getDoc(docRef);
    const event = docSnap.data();

    event.id = id;
    userEvent.value = event;

    return userEvent.value;
  };

  const increaseUserEventWatch = async (id) => {
    const docRef = doc(db, 'news', id);

    await updateDoc(docRef, {
      watch: increment(1),
    });
  };

  return {
  	userEvents,
  	userCount,
  	userEventsLimit,
  	userEventsStartQuery,
  	userEventsEndQuery,
  	fetchUserEvents,
  	fetchNextUserEvents,
    userEvent,
    fetchUserEvent,
    increaseUserEventWatch,
  };
});
