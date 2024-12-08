<template>
  <div class="row">
    <div class="col-6">
      <div class="form-floating mb-2">
        <input
          v-model="commonData.schoolTitle"
          id="schoolTitle"
          class="form-control"
          type="text"
          required
        >
        <label for="schoolTitle">Название школы</label>
      </div>

      <div class="form-floating mb-2">
        <input
          v-model="commonData.fullSchoolTitle"
          id="fullSchoolTitle"
          class="form-control"
          type="text"
          required
        >
        <label for="fullSchoolTitle">Полное название школы</label>
      </div>

      <div class="form-floating mb-2">
        <input
          v-model="commonData.schoolAddress"
          id="schoolAddress"
          class="form-control"
          type="text"
          required
        >
        <label for="schoolAddress">Адрес школы</label>
      </div>

      <div class="form-floating mb-2">
        <input
          v-model="commonData.classTitle"
          id="classTitle"
          class="form-control"
          type="text"
          required
        >
        <label for="classTitle">Название класса</label>
      </div>

      <div class="form-floating mb-2">
        <input
          v-model="commonData.teacherName"
          id="teacherName"
          class="form-control"
          type="text"
          required
        >
        <label for="teacherName">Классный руководитель</label>
      </div>

      <div class="form-floating">
        <input
          v-model="commonData.pageTitle"
          id="pageTitle"
          class="form-control"
          type="text"
          required
        >
        <label for="pageTitle">Общий тайтл</label>
      </div>
    </div>
  </div>

  <div class="row mt-3">
    <div class="col-12">
      <button
        class="btn btn-outline-primary"
        :disabled="isLoading"
        @click="onUpdate"
      >
        Сохранить
      </button>
    </div>
  </div>

  <div class="row mt-3">
    <div class="col-2">
      <img
        :src="commonData.img"
        alt=""
        class="img-fluid img-thumbnail"
      >
    </div>
  </div>

   <div class="row mt-3">
    <div class="col-6">

      <form @submit.prevent="onUpdateImg($event)">
        <div class="input-group">
          <input
            ref="fileEl"
            type="file"
            class="form-control"
          >
        </div>

        <button
          class="btn btn-outline-primary mt-3"
          type="submit"
          :disabled="isLoading"
        >
          Сохранить
        </button>
      </form>

    </div>
  </div>
</template>

<script setup>
import {
  toRefs,
  inject,
  ref,
} from 'vue';
import { useCommonDataStore } from '@/store/commonData';

const commonDataStore = useCommonDataStore();
const { updateCommonData, updateImg } = commonDataStore;
const toast = inject('toast');

const props = defineProps({
  commonData: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const { commonData } = toRefs(props);

const isLoading = defineModel({ default: false });

const onUpdate = async () => {
  try {
    isLoading.value = true;

    const formData = {
      schoolTitle: commonData.value.schoolTitle,
      fullSchoolTitle: commonData.value.fullSchoolTitle,
      schoolAddress: commonData.value.schoolAddress,
      classTitle: commonData.value.classTitle,
      teacherName: commonData.value.teacherName,
      pageTitle: commonData.value.pageTitle,
    };

    await updateCommonData({ formData, id: commonData.value.id });
    toast.success('Общая информация сохранена');
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

const fileEl = ref(null);

const onUpdateImg = async ($event) => {
  try {
    const file = $event.target[0].files[0];

    if (!file) {
      toast.error('Необходимо выбрать файл');
      return;
    }

    isLoading.value = true;

    const url = await updateImg(file);
    commonData.value.img = url;
    fileEl.value.value = '';
    toast.success('Изображение обновлено');
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};
</script>
