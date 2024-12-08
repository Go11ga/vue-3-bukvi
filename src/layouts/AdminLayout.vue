<template>
  <div class="admin-layout">
    <AdminSidebar />

    <router-view />
  </div>
</template>

<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar';
</script>
