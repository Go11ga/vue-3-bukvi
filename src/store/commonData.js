import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  query, collection, getDocs, doc, updateDoc,
} from 'firebase/firestore';
import {
  getStorage, ref as fbRef, uploadBytes, getDownloadURL, deleteObject, listAll,
} from 'firebase/storage';
import { db } from '@/firebase';
import handleSnapshot from '@/utils/handleSnapshot.js';

export const useCommonDataStore = defineStore('commonData', () => {
  const commonData = ref({});

  const fetchCommonData = async () => {
    const fetchQuery = query(collection(db, 'common'));
    const documentSnapshots = await getDocs(fetchQuery);

    const [common] = handleSnapshot(documentSnapshots);
    commonData.value = common;

    return commonData.value;
  };

  const updateCommonData = async ({ id, formData }) => {
    const docRef = doc(db, 'common', id);
    await updateDoc(docRef, { ...formData });
  };

  const updateImg = async (file) => {
    const storage = getStorage();
    const listRef = fbRef(storage, 'about');

    const res = await listAll(listRef);

    const fileName = res?.items[0]?.name;

    if (fileName) {
      const storageRef = fbRef(storage, `about/${fileName}`);
      await deleteObject(storageRef);
    }

    const storageRef = fbRef(storage, `about/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);

    const docRef = doc(db, 'common', 'data');
    await updateDoc(docRef, { img: url });

    return url;
  };

  return {
  	commonData,
  	fetchCommonData,
    updateCommonData,
    updateImg,
  };
});
