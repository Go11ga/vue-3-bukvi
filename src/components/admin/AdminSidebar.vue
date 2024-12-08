<template>
	<div
		class="admin-sidebar"
		:class="{ 'admin-sidebar--active': isActive }"
	>
		<div class="admin-sidebar__header">
    	<button
    		class="admin-sidebar__btn"
    		@click.prevent="toggleSidebar"
    	>
    		<span class="">
          <i class="bi bi-list" />
        </span>
    	</button>
		</div>

    <div class="admin-sidebar__list">
    	<div
    		v-for="item in routes"
    		:key=item.id
    		class="admin-sidebar__list-item"
    	>
        <router-link
          :to="{ name: item.name }"
          class="admin-sidebar__link"
        >
	        <span class="admin-sidebar__link-icon">
	          <i
	          	:class="item.icon"
	          />
	        </span>
	        <span class="admin-sidebar__link-text">
	          {{ item.text }}
	        </span>
        </router-link>
      </div>
    </div>

    <div class="admin-sidebar__footer">
    	<button
    		class="admin-sidebar__btn admin-sidebar__btn--no-border"
    		@click.prevent="onLogout"
    	>
    		<span class="">
          <i class="bi bi-box-arrow-right" />
        </span>
    	</button>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import {
	PAGE_ADMIN_EVENT_LIST,
	PAGE_ADMIN_VIEWS,
	PAGE_ADMIN_SCHEDULE,
	PAGE_ADMIN_COMMON_DATA,
	PAGE_ADMIN_REMIND,
	PAGE_EVENT_LIST,
} from '@/constants/router';

const routes = ref([
	{
		id: 1,
		name: PAGE_ADMIN_EVENT_LIST,
		text: 'Список событий',
		icon: 'bi bi-file-earmark-text',
	},
	{
		id: 2,
		name: PAGE_ADMIN_VIEWS,
		text: 'Статистика просмотров',
		icon: 'bi bi-bar-chart-fill',
	},
	{
		id: 3,
		name: PAGE_ADMIN_SCHEDULE,
		text: 'Расписание',
		icon: 'bi bi-layout-text-sidebar-reverse',
	},
	{
		id: 4,
		name: PAGE_ADMIN_COMMON_DATA,
		text: 'Общая информация',
		icon: 'bi bi-collection',
	},
	{
		id: 5,
		name: PAGE_ADMIN_REMIND,
		text: 'Памятка',
		icon: 'bi bi-lightbulb',
	},
]);

const authStore = useAuthStore();
const { logout } = authStore;
const router = useRouter();
const toast = inject('toast');

const isLoading = ref(false);

const onLogout = async () => {
  try {
    isLoading.value = true;

    await logout();
    router.push({ name: PAGE_EVENT_LIST });
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
};

const isActive = ref(false);

const toggleSidebar = () => {
	isActive.value = !isActive.value;
};
</script>
