<template>
	<div class="card mt-4">
		<h5 class="card-header">
			{{ event.title }}
		</h5>

		<div class="card-body">
			<p class="card-text">
				{{ event.text }}
			</p>

			<div class="row g-3 mt-4">
				<div
					v-for="(img, idx) in event.images"
					:key="idx"
					class="col-3"
				>
					<img
						class="img-fluid img-thumbnail"
						:src="img.fullPath"
						alt=""
					>
				</div>
			</div>
		</div>

		<div class="card-footer d-flex justify-content-between text-body-secondary">
			<div>
				{{ handleDate(event.pubDate) }}
			</div>
			<div class="d-flex justify-content-between">
				<i class="bi bi-eye-fill" />
				<span class="d-inline-block ms-2">{{ event.watch }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { toRefs } from 'vue';
import handleDate from '@/utils/handleDate.js';

const props = defineProps({
  event: {
		type: Object,
		required: true,
		default: () => {},
	},
});

const { event } = toRefs(props);
</script>
