import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  PAGE_EVENT_LIST,
  PAGE_EVENT_DETAIL,
  PAGE_SCHEDULE,
  PAGE_AUTH,
  PAGE_ADMIN_EVENT_LIST,
  PAGE_ADMIN_EVENT_DETAIL,
  PAGE_ADMIN_EVENT_UPDATE,
  PAGE_ADMIN_VIEWS,
  PAGE_ADMIN_SCHEDULE,
  PAGE_ADMIN_COMMON_DATA,
  PAGE_ADMIN_REMIND,
  PAGE_ERROR,
} from '@/constants/router';

const routes = [
  {
    path: '/',
    name: PAGE_EVENT_LIST,
    component: () => import('@/pages/EventListPage'),
    meta: {
      layout: 'Main',
    },
  },
  {
    path: '/event/:id',
    name: PAGE_EVENT_DETAIL,
    component: () => import('@/pages/EventDetailPage.vue'),
    props: true,
    meta: {
      layout: 'Main',
    },
  },
  {
    path: '/schedule',
    name: PAGE_SCHEDULE,
    component: () => import('@/pages/SchedulePage.vue'),
    meta: {
      layout: 'Main',
    },
  },
  {
    path: '/auth',
    name: PAGE_AUTH,
    component: () => import('@/pages/AuthPage.vue'),
    meta: {
      layout: 'Empty',
    },
  },
  {
    path: '/admin',
    name: PAGE_ADMIN_EVENT_LIST,
    component: () => import('@/pages/admin/AdminEventListPage.vue'),
    meta: {
      layout: 'Admin',
      auth: true,
    },
  },
  {
    path: '/admin/:id',
    name: PAGE_ADMIN_EVENT_DETAIL,
    component: () => import('@/pages/admin/AdminEventDetailPage.vue'),
    props: true,
    meta: {
      layout: 'Admin',
      auth: true,
    },
  },
  {
    path: '/admin/update/:id',
    name: PAGE_ADMIN_EVENT_UPDATE,
    component: () => import('@/pages/admin/AdminEventUpdatePage.vue'),
    props: true,
    meta: {
      layout: 'Admin',
      auth: true,
    },
  },
  {
    path: '/admin/chart',
    name: PAGE_ADMIN_VIEWS,
    component: () => import('@/pages/admin/AdminChartPage.vue'),
    props: true,
    meta: {
      layout: 'Admin',
      auth: true,
    },
  },
  {
    path: '/admin/schedule',
    name: PAGE_ADMIN_SCHEDULE,
    component: () => import('@/pages/admin/AdminSchedulePage.vue'),
    props: true,
    meta: {
      layout: 'Admin',
      auth: true,
    },
  },
  {
    path: '/admin/common-data',
    name: PAGE_ADMIN_COMMON_DATA,
    component: () => import('@/pages/admin/AdminCommonDataPage.vue'),
    props: true,
    meta: {
      layout: 'Admin',
      auth: true,
    },
  },
  {
    path: '/admin/remind',
    name: PAGE_ADMIN_REMIND,
    component: () => import('@/pages/admin/AdminRemindPage.vue'),
    props: true,
    meta: {
      layout: 'Admin',
      auth: true,
    },
  },
  {
    path: '/:catchAll(.*)',
    name: PAGE_ERROR,
    component: () => import('@/pages/ErrorPage.vue'),
    meta: {
      layout: 'Empty',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// eslint-disable-next-line
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
        (user) => {
          removeListener();
          resolve(user);
      },
      reject,
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next('/auth');
    }
  } else {
    next();
  }
});

export { routes };
export default router;
