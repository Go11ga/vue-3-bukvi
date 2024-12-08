<template>
	<AdminPageWrapper
    :is-loading="isLoading"
    :crumbs="crumbs"
  >
	  <template #headerAppend>
			<button
				class="btn btn-danger"
				:disabled="isLoading"
				@click="startRemoveEvent"
			>
				<span class="me-2">Удалить Событие</span>
				<span><i class="bi bi-trash" /></span>
			</button>
		</template>

  	<main class="pb-4">
  		<AdminEventUpdateForm
  			v-model="isLoading"
  			v-if="event.title"
  			:event="event"
  			:id="id"
  			@updatedImage="getEvent"
  		/>

  		<RemoveModal
  			ref="modal"
  			@remove="onRemove"
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
import AdminEventUpdateForm from '@/components/admin/AdminEventUpdateForm';
import RemoveModal from '@/components/ui/RemoveModal';
import { PAGE_ADMIN_EVENT_LIST, PAGE_ADMIN_EVENT_DETAIL } from '@/constants/router';

const eventsStore = useEventsStore();
const { fetchEvent, removeEvent } = eventsStore;
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

useHead({
  title: () => event.value.title,
});

// crumbs
const crumbs = ref([]);

const setCrumbs = () => {
	crumbs.value = [
		{ title: 'Список событий', name: PAGE_ADMIN_EVENT_LIST },
		{ title: event.value.title, name: PAGE_ADMIN_EVENT_DETAIL, params: { id: id.value } },
		{ title: 'редактирование', path: '' },
	];
};

onMounted(async () => {
	await getEvent();
	setCrumbs();
});

const modal = ref(null);

const startRemoveEvent = () => {
	modal.value.show();
};

const onRemove = async () => {
	try {
    isLoading.value = true;

  	const formData = {
			id: id.value,
			images: event.value.images,
		};

    await removeEvent(formData);
    toast.success('Событие удалено');
    router.push({ name: PAGE_ADMIN_EVENT_LIST });
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};
</script>
