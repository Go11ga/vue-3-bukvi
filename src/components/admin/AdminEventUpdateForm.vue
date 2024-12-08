<template>
	<div class="row">
		<div class="col-6">
			<form
				class="mb-3"
				@submit.prevent="onUpdateEvent"
			>
				<div class="mb-3">
					<label
						for="title"
						class="form-label"
					>
						Заголовок события
					</label>
					<input
						v-model="formEvent.title"
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
            v-model="formEvent.date"
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
						v-model="formEvent.text"
						id="text"
						class="form-control"
						rows="9"
						required
					/>
				</div>

				<button
					class="btn btn-outline-primary"
					type="submit"
					:disabled="isLoading"
				>
					Обновить
				</button>
			</form>

			<div class="row g-2 mb-4">
				<div
					v-for="image in event.images"
					:key="image.name"
					class="col-4"
				>
					<div class="position-relative">
						<img
							:src="image.fullPath"
							alt=""
							class="img-fluid"
						>
						<button
							class="btn btn-danger position-absolute top-0 end-0"
							style="--bs-btn-padding-y: .2rem; --bs-btn-padding-x: .4rem; --bs-btn-font-size: .75rem;"
							:disabled="isLoading"
							@click="onRemoveImage(image.name)"
						>
			        <i class="bi bi-x-lg" />
			      </button>
			      <span class="position-absolute bottom-0 end-0">{{image.name}}</span>
					</div>
				</div>
			</div>

			<form
				class="mb-4"
				@submit.prevent="onAddImage($event)"
			>
		    <input
		    	ref="filesEl"
		    	type="file"
		    	class="form-control mb-3"
		    >

		    <button
		    	class="btn btn-outline-primary"
		    	type="submit"
		    	:disabled="isLoading"
		    >
		  		Загрузить
		  	</button>
			</form>

		</div>
	</div>
</template>

<script setup>
import {
	toRefs,
	onMounted,
	ref,
	inject,
} from 'vue';
import { useRouter } from 'vue-router';
import { useEventsStore } from '@/store/events';
import { useImagesStore } from '@/store/images';
import setFormDate from '@/utils/setFormDate';
import { PAGE_ADMIN_EVENT_DETAIL } from '@/constants/router';

const eventsStore = useEventsStore();
const { updateEvent } = eventsStore;

const imagesStore = useImagesStore();
const { addImage, removeImage } = imagesStore;

const router = useRouter();
const toast = inject('toast');

// props
const props = defineProps({
	id: {
		type: String,
		required: true,
	},

	event: {
		type: Object,
		required: true,
		default: () => {},
	},
});

const { id, event } = toRefs(props);

const emit = defineEmits(['updatedImage']);

const formEvent = ref({});

const isLoading = defineModel({ default: false });

onMounted(() => {
	formEvent.value.title = event.value.title;
	formEvent.value.date = setFormDate(event.value.pubDate);
	formEvent.value.text = event.value.text;
});

const onUpdateEvent = async () => {
	try {
    isLoading.value = true;

  	const formData = {
			id: id.value,
			title: formEvent.value.title,
			pubDate: new Date(formEvent.value.date),
			text: formEvent.value.text,
		};

		await updateEvent(formData);
		toast.success('Событие обновлено');
		router.push({ name: PAGE_ADMIN_EVENT_DETAIL, params: { id: id.value } });
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

const filesEl = ref(null);

const onAddImage = async ($event) => {
	try {
		isLoading.value = true;

		const file = $event?.target[0]?.files[0];

		if (!file) {
			toast.error('Необходимо выбрать файл');
			return;
		}

		const item = event.value.images.find((el) => el.name === file.name);
		if (item) {
			toast.error('Файл с таким именем уже загружен');
			return;
		}

		const formData = {
			id: id.value,
			img: event.value.img,
			file,
		};

		await addImage(formData);
		toast.success('Файл добавлен');
		emit('updatedImage');
		filesEl.value.value = '';
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

const onRemoveImage = async (name) => {
	try {
		isLoading.value = true;

		const idx = event.value.images.findIndex((el) => el.name === name);

		const processedImgs = [];

		event.value.images.forEach((el) => {
			processedImgs.push(el.fullPath);
		});

		processedImgs.splice(idx, 1);

		const formData = {
			id: id.value,
			name,
			img: processedImgs,
		};

		await removeImage(formData);

		event.value.images.splice(idx, 1);
		toast.success('Файл удален');
	} catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};
</script>
