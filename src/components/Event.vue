<template>
  <div class="row">
    <div class="col-12 col-lg-10 offset-lg-1">
      <div class="user-event">

        <div class="user-event__header">
          <div class="row">

            <div class="col-12 col-md-10">
              <div class="user-event__title">
                {{ event.title }}
              </div>
            </div>

            <div class="col-12 col-md-2">
              <div class="user-event__avatar-wrapper">
                <img
                  class="user-event__avatar-img"
                  src="@/assets/images/crane.png"
                  alt="crane"
                >
              </div>
            </div>

          </div>
        </div>

        <div class="user-event__body">
          <div class="user-event__text">
            {{ event.text }}
          </div>

          <div
            v-if="event.img.length"
            class="user-event__gallery"
          >
            <div class="row gy-4">
              <div
                v-for="(src, idx) in event.img"
                :key="idx"
                @click="onShow(idx)"
                class="col-12 col-lg-6 user-event__gallery-item"
              >
                <img
                  class="user-event__img"
                  :src="src"
                  alt=""
                >
              </div>
            </div>
          </div>
          <VueEasyLightbox
            :visible="isVisible"
            :imgs="event.img"
            :index="index"
            loop
            rotateDisabled
            @hide="onHide"
          />
        </div>

        <div class="user-event__footer">

          <div class="row align-items-center">
            <div class="col-12 col-sm-8">
              <div class="user-event__pubdate">
                {{ handleDate(event.pubDate) }}
              </div>
            </div>
            <div class="col-12 col-sm-4">
              <div class="user-event__counter">
                <i class="bi bi-eye-fill" />

                <div class="user-event__count">
                  {{ event.watch }}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, ref } from 'vue';
import VueEasyLightbox from 'vue-easy-lightbox';
import handleDate from '@/utils/handleDate';

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const { event } = toRefs(props);

const isVisible = ref(false);
const index = ref(0);

const onShow = (idx) => {
  index.value = idx;
  isVisible.value = true;
};

const onHide = () => {
  isVisible.value = false;
};
</script>
