<template>
  <AdminPageWrapper
    :is-loading="isLoading"
    :crumbs="crumbs"
  >
    <template #headerAppend>
      <button
        class="btn btn-outline-primary"
        :disabled="isLoading"
        @click="onUpdate"
      >
        <span class="me-2">Сохранить</span>
        <span><i class="bi bi-sd-card" /></span>
      </button>
    </template>

    <main class="pb-4">
      <div
        v-if="memo.id"
        class="row"
      >
        <div class="col-6">
          <div class="mb-3">
            <label
              for="text"
              class="form-label"
            >
              Справочная информация
            </label>

            <textarea
              v-model="memo.text"
              id="text"
              class="form-control"
              rows="20"
              required
            />
          </div>
        </div>
      </div>
    </main>
  </AdminPageWrapper>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useHead } from '@unhead/vue';
import { useReminderStore } from '@/store/reminder';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';

const reminderStore = useReminderStore();
const { fetchReminder, updateReminder } = reminderStore;
const toast = inject('toast');

useHead({
  title: () => 'Памятка',
});

const crumbs = ref([{ title: 'Памятка', name: '' }]);
const isLoading = ref(false);
const memo = ref({});

const getMemo = async () => {
  try {
    isLoading.value = true;

    memo.value = await fetchReminder();
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getMemo();
});

const onUpdate = async () => {
  try {
    isLoading.value = true;

    await updateReminder({ ...memo.value });
    toast.success('Памятка обновлена');
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};
</script>
