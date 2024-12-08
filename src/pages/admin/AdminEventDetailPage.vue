<template>
	<AdminPageWrapper
    :is-loading="isLoading"
    :crumbs="crumbs"
  >
  	<template #headerAppend>
  		<button
        class="btn btn-outline-primary"
        @click="updateEvent"
      >
        <span class="me-2">
          Редактировать событие
        </span>
        <span>
          <i class="bi bi-arrow-up-right-square" />
        </span>
      </button>
  	</template>

  	<main class="pb-4">
  		<AdminEventDetailForm
  			v-if="event.title"
  			:event="event"
  		/>
  	</main>
	</AdminPageWrapper>
</template>

<script setup>
import {
  toRefs,
  onMounted,
  ref,
  inject,
} from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useEventsStore } from '@/store/events';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import AdminEventDetailForm from '@/components/admin/AdminEventDetailForm';
import { PAGE_ADMIN_EVENT_LIST, PAGE_ADMIN_EVENT_UPDATE } from '@/constants/router';

const eventsStore = useEventsStore();
const { fetchEvent } = eventsStore;
const router = useRouter();
const toast = inject('toast');

// props
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const { id } = toRefs(props);

const isLoading = ref(false);
const event = ref({});

useHead({
  title: () => event.value.title,
});

const getEvent = async () => {
  try {
    isLoading.value = true;

    event.value = await fetchEvent(id.value);
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

// crumbs
const crumbs = ref([]);

const setCrumbs = () => {
  crumbs.value = [
    { title: 'Список событий', name: PAGE_ADMIN_EVENT_LIST },
    { title: event.value.title, name: '' },
  ];
};

onMounted(async () => {
  await getEvent();
  setCrumbs();
});

const updateEvent = () => {
  router.push({ name: PAGE_ADMIN_EVENT_UPDATE, params: { id: id.value } });
};
</script>
