<template>
  <div
    ref="modalEl"
    class="modal fade"
    tabindex="-1"
    aria-labelledby=""
    aria-hidden="true"
    :data-bs-backdrop="noCloseOnBackdrop ? 'static' : true"
  >
    <div :class="modalClasses">
      <div
        class="modal-content"
        :class="{ 'is-loading': isLoading }"
      >

        <div class="modal-header">
          <h5
            v-if="title"
            class="modal-title"
          >
            {{ title }}
          </h5>
          <button
            class="btn-close"
            aria-label="Close"
            @click="hide"
          />
        </div>

        <div class="modal-body">
          <slot name="body" />
        </div>

        <div
          v-if="!hideFooter"
          class="modal-footer"
        >
          <slot name="footer" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {
  toRefs,
  ref,
  computed,
  onMounted,
  onUnmounted,
} from 'vue';
import { Modal } from 'bootstrap';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },

  hideFooter: {
    type: Boolean,
    default: false,
  },

  noCloseOnBackdrop: {
    type: Boolean,
    default: false,
  },

  size: {
    type: String,
    default: '',
  },

  isLoading: {
    type: Boolean,
    default: false,
  },
});

const {
  title,
  hideFooter,
  noCloseOnBackdrop,
  size,
  isLoading,
} = toRefs(props);

const emit = defineEmits(['close']);

const modalClasses = computed(() => {
  const arr = ['modal-dialog'];

  if (size.value === 'sm') arr.push('modal-sm');
  if (size.value === 'lg') arr.push('modal-lg');
  if (size.value === 'xl') arr.push('modal-xl');

  return arr;
});

const modalEl = ref(null);
let modalObj = null;

const emitClose = () => {
  emit('close');
};

onMounted(() => {
  modalObj = new Modal(modalEl.value);

  modalEl.value.addEventListener('hidden.bs.modal', emitClose);
});

onUnmounted(() => {
  if (modalEl.value) modalEl.value.removeEventListener('hidden.bs.modal', emitClose);
});

const show = () => {
  modalObj.show();
};

const hide = () => {
  modalObj.hide();
};

defineExpose({ show, hide });
</script>
