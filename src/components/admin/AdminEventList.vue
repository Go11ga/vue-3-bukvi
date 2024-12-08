<template>
	<div v-if="events.length">
		<table class="table table-striped align-middle table-sm small">
			<thead>
				<tr>
					<th scope="col">Заголовок</th>
					<th scope="col">Дата публикации</th>
					<th scope="col">Фотографии</th>
					<th scope="col">Просмотры</th>
					<th scope="col" />
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="event in events"
					:key="event.id"
				>
					<td>
						{{ event.title }}
					</td>
					<td>
						{{ handleDate(event.pubDate) }}
					</td>
					<td>
						{{ event.img.length }}
					</td>
					<td>
						{{ event.watch}}
					</td>
					<td>
						<button
							class="btn btn-outline-dark"
							style="--bs-btn-padding-y: .2rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;"
							@click="onClick(event)"
						>
							Подробнее
							<i class="bi bi-arrow-up-right-square" />
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import handleDate from '@/utils/handleDate';
import { PAGE_ADMIN_EVENT_DETAIL } from '@/constants/router';

const router = useRouter();

const props = defineProps({
  events: {
    type: Array,
    required: true,
  	default: () => [],
  },
});

const { events } = toRefs(props);

const onClick = (event) => {
  router.push({ name: PAGE_ADMIN_EVENT_DETAIL, params: { id: event.id } });
};
</script>
