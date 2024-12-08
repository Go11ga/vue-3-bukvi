<template>
  <div v-if="schedule.length">
    <div class="row g-3">
      <div
        class="col-12 col-md-6 col-lg-4"
        v-for="item in schedule"
        :key="item.id"
      >

        <div class="card">
          <h5 class="card-header">
            {{ item.title }}
          </h5>

            <ul class="list-group list-group-flush">
              <li
                v-for="lesson in item.items"
                :key="lesson.id"
                class="list-group-item"
              >
                <div class="schedule__item">
                  {{ lesson.title }}
                </div>
              </li>
            </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  schedule: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const { schedule } = toRefs(props);
</script>
