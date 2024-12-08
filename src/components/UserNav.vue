<template>
  <nav
    v-if="commonData.id"
    class="navbar navbar-expand-lg navbar-light sticky-top shadow-sm user-nav"
  >
    <div class="container user-nav__container">
      <div class="user-nav__link-wrapper">
        <div class="user-nav__title">
          {{ commonData.classTitle }}
        </div>
      </div>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse user-nav__collapse"
      >
        <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link user-nav__btn"
              :to="{ name: PAGE_EVENT_LIST }"
            >
              Главная
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link user-nav__btn user-nav__btn--last"
              :to="{ name: PAGE_SCHEDULE }"
            >
              Расписание
            </router-link>
          </li>
        </ul>

        <div class="user-nav__auth">
          <router-link
            class="nav-link user-nav__btn user-nav__btn--last"
            :to="{ name: PAGE_AUTH }"
          >
            Войти
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCommonDataStore } from '@/store/commonData';
import { PAGE_EVENT_LIST, PAGE_SCHEDULE, PAGE_AUTH } from '@/constants/router';

const commonDataStore = useCommonDataStore();
const { commonData } = storeToRefs(commonDataStore);
</script>
