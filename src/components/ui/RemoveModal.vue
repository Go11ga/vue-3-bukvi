<template>
  <Modal
    ref="modal"
    title="Удалить элемент?"
    hide-footer
    size="sm"
  >
    <template #body>
      <div class="d-flex justify-content-between">
        <button
          class="btn btn-secondary"
          @click="hide"
        >
          Отменить
        </button>

        <button
          class="btn btn-danger"
          @click="onClick"
        >
          Удалить
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { ref } from 'vue';
import Modal from '@/components/Modal';

const emit = defineEmits(['remove']);

const modal = ref(null);

const show = () => {
  modal.value.show();
};

const hide = () => {
  modal.value.hide();
};

defineExpose({ show });

const onClick = () => {
  emit('remove');
  hide();
};
</script>
