<template>
	<div class="row g-3 user-list">
		<div
			v-for="event in events"
			:key="event.id"
			class="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-0"
		>
			<EventListItem :event="event" />
		</div>
	</div>
</template>

<script setup>
import { toRefs } from 'vue';
import EventListItem from '@/components/EventListItem';

const props = defineProps({
  events: {
    type: Array,
    required: true,
  	default: () => [],
  },
});

const { events } = toRefs(props);
</script>
