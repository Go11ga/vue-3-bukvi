<template>
  <PageWrapper
    title="Новости нашего класса"
    :is-loading="isLoading"
  >
    <main class="pb-4">
      <div class="row">
        <div class="col-8 offset-2 col-sm-6 offset-sm-3 col-md-4 offset-md-4 col-lg-2 offset-lg-0 mb-4">
          <Logo />
        </div>

        <div class="col-12 col-lg-10">
          <EventList :events="userEvents" />

          <div
            v-if="showMoreBtn"
            class="event-list__btn-wrapper"
          >
            <button
              class="event-list__btn"
              @click="getNextUserEvents"
            >
              Загрузить ещё
            </button>
          </div>
        </div>
      </div>

      <ScrollButton :is-active="scrollBtnIsActive" />
    </main>
  </PageWrapper>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  inject,
  computed,
} from 'vue';
import { useHead } from '@unhead/vue';
import { storeToRefs } from 'pinia';
import { useCommonDataStore } from '@/store/commonData';
import { useUserEventsStore } from '@/store/userEvents';

import PageWrapper from '@/components/PageWrapper';
import Logo from '@/components/Logo';
import EventList from '@/components/EventList';
import ScrollButton from '@/components/ui/ScrollButton';

const commonDataStore = useCommonDataStore();
const { commonData } = storeToRefs(commonDataStore);

const userEventsStore = useUserEventsStore();
const { userCount, userEventsLimit } = storeToRefs(userEventsStore);
const { fetchUserEvents, fetchNextUserEvents } = userEventsStore;

const toast = inject('toast');

useHead({
  title: () => commonData.value.classTitle,
});

// userEvents
const isLoading = ref(false);
const userEvents = ref([]);

const getUserEvents = async () => {
  try {
    isLoading.value = true;

    const response = await fetchUserEvents();
    userEvents.value = [...response];
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

// nextUserEvents
const showMoreBtn = computed(() => !(userEvents.value.length < userEventsLimit.value || userCount.value === userEvents.value.length));

const getNextUserEvents = async () => {
  try {
    isLoading.value = true;

    const response = await fetchNextUserEvents();
    userEvents.value = [...userEvents.value, ...response];
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

// scrollBtn
const scrollBtnIsActive = ref(false);

const scroll = () => {
  const { scrollTop } = document.documentElement;
  const { innerHeight } = window;

  if (scrollTop - 100 > innerHeight) {
    scrollBtnIsActive.value = true;
  } else {
    scrollBtnIsActive.value = false;
  }
};

onMounted(async () => {
  await getUserEvents();
  window.addEventListener('scroll', scroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', scroll);
});
</script>
