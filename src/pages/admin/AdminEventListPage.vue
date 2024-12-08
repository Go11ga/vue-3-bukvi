<template>
  <AdminPageWrapper
    :is-loading="isLoading"
    :crumbs="crumbs"
  >
    <template #headerAppend>
      <button
        class="btn btn-outline-primary"
        @click="startAddEvent"
      >
        <span class="me-2">
          <i class="bi bi-plus-circle" />
        </span>
        <span>
          Добавить событие
        </span>
      </button>
    </template>

    <main>
      <div class="d-flex justify-content-start align-items-center my-4">
        <ul class="pagination mb-0 me-4">
          <li class="page-item">
            <button
              class="page-link"
              :class="{ disabled: counter === 0 }"
              @click="onFetchPrevEvents"
            >
              Назад
            </button>
          </li>

          <li class="page-item">
            <button
              class="page-link"
              :class="{ disabled: counter === getCount }"
              @click="onFetchNextEvents"
            >
              Вперёд
            </button>
          </li>
        </ul>

        <div>
          страница: {{ counter + 1 }}
        </div>
      </div>

      <AdminEventList :events="events" />

      <AdminEventCreateModal
        ref="modal"
        @created="onCreated"
      />
    </main>
  </AdminPageWrapper>
</template>

<script setup>
import {
  onMounted,
  ref,
  inject,
} from 'vue';
import { storeToRefs } from 'pinia';
import { useHead } from '@unhead/vue';
import { useEventsStore } from '@/store/events';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import AdminEventList from '@/components/admin/AdminEventList';
import AdminEventCreateModal from '@/components/admin/AdminEventCreateModal';

const eventsStore = useEventsStore();
const { counter, getCount } = storeToRefs(eventsStore);
const { fetchEvents, fetchPrevEvents, fetchNextEvents } = eventsStore;

useHead({
  title: 'Список событий',
});

const toast = inject('toast');

const crumbs = ref([{ title: 'Список событий', name: '' }]);
const isLoading = ref(false);
const events = ref([]);

const getEvents = async () => {
  try {
    isLoading.value = true;

    events.value = await fetchEvents();
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

const onFetchPrevEvents = async () => {
  try {
    isLoading.value = true;

    events.value = await fetchPrevEvents();
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

const onFetchNextEvents = async () => {
  try {
    isLoading.value = true;

    events.value = await fetchNextEvents();
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

const modal = ref(null);

const showModal = () => {
  modal.value.show();
};

const startAddEvent = () => {
  showModal();
};

const reloadEvents = async () => {
  await getEvents();
  counter.value = 0;
};

const onCreated = async () => {
  await reloadEvents();
};

onMounted(async () => {
  await reloadEvents();
});
</script>
