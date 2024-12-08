import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
  const uid = ref(null);

  const login = async ({ email, password }) => {
    const auth = getAuth();
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    uid.value = user.uid;

    return user;
  };

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return {
  	uid,
  	login,
  	logout,
  };
});
