<template>
  <div
    class="auth"
    :class="{ 'is-loading': isLoading }"
  >
    <form
      @submit.prevent="onSubmit"
    >
      <div class="form-floating mb-2">
        <input
          v-model="email"
          id="email"
          class="form-control"
          type="email"
          placeholder="name@example.com"
          required
        >
        <label for="email">
          Электронная почта
        </label>
      </div>

      <div class="form-floating mb-2">
        <input
          v-model="password"
          id="password"
          class="form-control"
          type="password"
          placeholder="Password"
          required
        >
        <label for="password">
          Пароль
        </label>
      </div>

      <button
        class="btn btn-primary"
        type="submit"
        :disabled="isLoading"
      >
        Войти
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useAuthStore } from '@/store/auth';
import { PAGE_ADMIN_EVENT_LIST } from '@/constants/router';

const authStore = useAuthStore();
const { login } = authStore;

const router = useRouter();
const toast = inject('toast');

useHead({
  title: 'Авторизация',
});

const isLoading = ref(false);
const email = ref('');
const password = ref('');

const onSubmit = async () => {
  try {
    isLoading.value = true;

    const formData = {
      email: email.value,
      password: password.value,
    };

    await login(formData);

    router.push({ name: PAGE_ADMIN_EVENT_LIST });
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};
</script>
