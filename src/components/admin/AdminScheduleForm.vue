<template>
  <div class="row g-3">
    <div
      v-for="item in schedule"
      :key="item.id"
      class="col-4"
    >

      <div class="card">
        <h5 class="card-header">
          {{ item.title }}
        </h5>

        <div class="card-body">
          <input
            v-for="lesson in item.items"
            :key="lesson.id"
            v-model="lesson.title"
            class="form-control mb-1"
            type="text"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, watch } from 'vue';

const props = defineProps({
  schedule: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const { schedule } = toRefs(props);

const emit = defineEmits(['setSchedule']);

watch(schedule.value, (val) => {
  emit('setSchedule', val);
});
</script>
