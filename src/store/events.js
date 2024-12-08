import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  query,
  collection,
  getCountFromServer,
  orderBy,
  limit,
  getDocs,
  startAfter,
  startAt,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '@/firebase';
import handleSnapshot from '@/utils/handleSnapshot.js';
import { useImagesStore } from '@/store/images';

const imagesStore = useImagesStore();
const { createImages, removeImages } = imagesStore;

export const useEventsStore = defineStore('events', () => {
  const events = ref([]);
  const eventsLimit = ref(10);
  const startQueries = ref([]);
  const endQueries = ref([]);
  const counter = ref(0);
  const count = ref(3);

  const getCount = computed(() => Math.floor(count.value / eventsLimit.value));

  const fetchEvents = async () => {
    const coll = collection(db, 'news');
    const snapshot = await getCountFromServer(coll);
    count.value = snapshot.data().count;

    const fetchQuery = query(collection(db, 'news'), orderBy('pubDate', 'desc'), limit(eventsLimit.value));
    const documentSnapshots = await getDocs(fetchQuery);
    events.value = handleSnapshot(documentSnapshots);

    const startQuery = documentSnapshots.docs[0];
    startQueries.value.push(startQuery);

    const lastQuery = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    endQueries.value.push(lastQuery);

    return events.value;
  };

  const fetchPrevEvents = async () => {
    const fetchPrevQuery = query(collection(db, 'news'), orderBy('pubDate', 'desc'), startAt(startQueries.value[counter.value - 1]), limit(eventsLimit.value));
    const documentSnapshots = await getDocs(fetchPrevQuery);
    events.value = handleSnapshot(documentSnapshots);

    counter.value--;

    return events.value;
  };

  const fetchNextEvents = async () => {
    const fetchNextQuery = query(collection(db, 'news'), orderBy('pubDate', 'desc'), startAfter(endQueries.value[counter.value]), limit(eventsLimit.value));
    const documentSnapshots = await getDocs(fetchNextQuery);
    events.value = handleSnapshot(documentSnapshots);

    const startQuery = documentSnapshots.docs[0];
    startQueries.value.push(startQuery);

    const lastQuery = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    endQueries.value.push(lastQuery);

    counter.value++;

    return events.value;
  };

  const event = ref({});

  const fetchEvent = async (id) => {
    const docRef = doc(db, 'news', id);
    const docSnap = await getDoc(docRef);
    const eventSnap = docSnap.data();

    const fullImages = [];

    eventSnap.img.forEach((el) => {
      let arr = el.split('%2F');
      arr = arr[1].split('?');
      const name = arr[0];

      fullImages.push({
        name,
        fullPath: el,
      });
    });

    eventSnap.images = fullImages;
    event.value = eventSnap;
    return event.value;
  };

  const createEvent = async ({ eventItem, images }) => {
    const docRef = await addDoc(collection(db, 'news'), eventItem);
    const { id } = docRef;

    const urls = await createImages({ id, images });

    await updateDoc(doc(db, 'news', id), {
      img: urls,
    });

    return id;
  };

  const updateEvent = async ({
    id,
    title,
    pubDate,
    text,
  }) => {
    const docRef = doc(db, 'news', id);
    await updateDoc(docRef, { title, pubDate, text });
  };

  const removeEvent = async ({ id, images }) => {
    await removeImages({ id, images });
    await deleteDoc(doc(db, 'news', id));
  };

  return {
  	events,
  	eventsLimit,
  	startQueries,
  	endQueries,
  	counter,
  	count,
  	getCount,
  	fetchEvents,
  	fetchPrevEvents,
  	fetchNextEvents,
    event,
    fetchEvent,
    createEvent,
    updateEvent,
    removeEvent,
  };
});
