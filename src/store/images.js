import { defineStore } from 'pinia';
import { doc, updateDoc } from 'firebase/firestore';
import {
  getStorage,
  ref as fbRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db } from '@/firebase';

export const useImagesStore = defineStore('images', () => {
  const createImages = async ({ id, images }) => {
    const storage = getStorage();

    const imgPromises = [];
    images.forEach((el) => {
      const storageRef = fbRef(storage, `${id}/${el.name}`);
      const promise = uploadBytes(storageRef, el);
      imgPromises.push(promise);
    });

    const snapshots = await Promise.all(imgPromises);

    const urlPromises = [];
    snapshots.forEach((el) => {
      urlPromises.push(getDownloadURL(el.ref));
    });

    const urls = await Promise.all(urlPromises);
    return urls;
  };

  const addImage = async ({ id, img, file }) => {
    const storage = getStorage();
    const storageRef = fbRef(storage, `${id}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);

    const url = await getDownloadURL(snapshot.ref);
    img.push(url);

    const docRef = doc(db, 'news', id);
    await updateDoc(docRef, { img });
  };

  const removeImage = async ({ id, name, img }) => {
    const storage = getStorage();
    const fileRef = fbRef(storage, `${id}/${name}`);
    const storePromise = deleteObject(fileRef);

    const docRef = doc(db, 'news', id);
    const docPromise = updateDoc(docRef, {
      img,
    });

    await Promise.all([docPromise, storePromise]);
  };

  const removeImages = async ({ id, images }) => {
    const storage = getStorage();
    const promises = [];

    images.forEach((el) => {
      const imgRef = fbRef(storage, `${id}/${el.name}`);
      const promise = deleteObject(imgRef);
      promises.push(promise);
    });

    await Promise.all(promises);
  };

  return {
  	createImages,
  	addImage,
  	removeImage,
  	removeImages,
  };
});
