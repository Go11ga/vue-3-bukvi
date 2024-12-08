<template>
  <div class="event-list-item">

    <div class="event-list-item__header">
      <h5 class="event-list-item__title">{{ event.title }}</h5>

      <div class="event-list-item__avatar-wrapper">
        <img
          class="event-list-item__avatar-img"
          src="@/assets/images/crane.png"
          alt=""
        >
      </div>

      <div class="event-list-item__pubdate">
        {{ handleDate(event.pubDate) }}
      </div>
    </div>

    <div class="event-list-item__body">
      <img
        class="event-list-item__img"
        :src="event.img[0]"
        alt=""
      >

      <div class="event-list-item__text">
        {{ event.text }}
      </div>
    </div>

    <div class="event-list-item__footer">
      <router-link
        :to="{ name: PAGE_EVENT_DETAIL, params: { id: event.id } }"
        class="btn event-list-item__btn"
      >
        Читать далее
      </router-link>

      <div class="event-list-item__counter">
        <i class="bi bi-eye-fill" />

        <div class="event-list-item__count">
          {{ event.watch }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';
import { PAGE_EVENT_DETAIL } from '@/constants/router';
import handleDate from '@/utils/handleDate';

const props = defineProps({
  event: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const { event } = toRefs(props);
</script>
