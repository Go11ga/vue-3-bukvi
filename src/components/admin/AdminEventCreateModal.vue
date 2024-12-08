<template>
  <Modal
    ref="modal"
    title="Создать событие"
    hide-footer
    no-close-on-backdrop
    size="xl"
    :is-loading="isLoading"
    @close="onClose"
  >
    <template #body>
      <form @submit.prevent="onCreateEvent($event)">
        <div class="mb-3">
          <label
            for="title"
            class="form-label"
          >
            Заголовок события
          </label>
          <input
            v-model="title"
            id="title"
            class="form-control"
            required
          >
        </div>

        <div class="mb-3">
          <label
            for="date"
            class="form-label"
          >
            Дата события
          </label>
          <input
            type="datetime-local"
            v-model="date"
            id="date"
            class="form-control"
            required
          >
        </div>

        <div class="mb-3">
          <label
            for="text"
            class="form-label"
          >
            Текст события
          </label>
          <textarea
            v-model="text"
            id="text"
            class="form-control"
            rows="10"
            required
          />
        </div>

        <div class="input-group mb-3">
          <input
            ref="filesEl"
            type="file"
            class="form-control"
            multiple="multiple"
          >
        </div>

        <button
          class="btn btn-secondary"
          type="submit"
          :disabled="false"
        >
          Добавить
        </button>
      </form>
    </template>
  </Modal>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useEventsStore } from '@/store/events';
import Modal from '@/components/Modal';
import setFormDateToday from '@/utils/setFormDateToday';

const eventsStore = useEventsStore();
const { createEvent } = eventsStore;
const toast = inject('toast');

const modal = ref(null);

const date = ref('');

const show = async () => {
  date.value = setFormDateToday();

  modal.value.show();
};

defineExpose({ show });

const title = ref('');
const text = ref('');
const filesEl = ref(null);
const isLoading = ref(false);

const emit = defineEmits(['created']);

const onCreateEvent = async ($event) => {
  try {
    isLoading.value = true;

    const eventItem = {
      title: title.value,
      text: text.value,
      pubDate: new Date(date.value),
      img: [],
      watch: 0,
    };

    const { files } = $event.target[3];
    const images = Object.values(files);

    const formData = {
      eventItem,
      images,
    };

    await createEvent(formData);

    modal.value.hide();
    toast.success('Событие добавлено');
    emit('created');
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

const onClose = () => {
  title.value = '';
  text.value = '';
  filesEl.value.value = '';
};
</script>
