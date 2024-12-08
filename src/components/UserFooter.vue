<template>
  <footer
    v-if="commonData.id"
    class="user-footer"
  >
    <div class="container">
      <div class="row h-100">
        <div class="col-12 col-lg-3 d-flex flex-column justify-content-between">
          <div class="user-footer__title">
            {{ commonData.classTitle }}
          </div>

          <div class="user-footer__creds">
            <i>by go11ga &copy;</i>
          </div>
        </div>

        <div class="col-12 col-lg-5">
          <div class="user-footer__text">
            Классный руководитель: {{ commonData.teacherName }}
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="user-footer__text">
            {{ commonData.fullSchoolTitle }}
          </div>

          <div class="user-footer__text">
            {{ commonData.schoolAddress }}
          </div>

          <a class="user-footer__link" href="https://sch1354uz.mskobr.ru/" target="_blank" rel="noopener noreferrer">
            Сайт школы
          </a>
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCommonDataStore } from '@/store/commonData';

const commonDataStore = useCommonDataStore();
const { commonData } = storeToRefs(commonDataStore);
</script>
