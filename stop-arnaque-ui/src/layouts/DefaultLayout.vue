<script setup>
import { RouterView } from "vue-router";
import Header from "../components/commons/Header.vue";
import Toast from "../components/commons/Toast.vue";
import Footer from "../components/commons/Footer.vue";
import { storeToRefs } from "pinia";
import NotificationComponent from "../components/commons/NotificationComponent.vue";
import { useGlobalStore } from "../stores/global-errors-store";
const store = useGlobalStore();
const { error } = storeToRefs(store);
</script>

<template>
  <Header />
  <div>
    <div v-if="error" class="text-center alert alert-danger container mt-3 p-3 mt-3">
      {{ error }}
    </div>
  </div>
  <NotificationComponent />
  <RouterView />
  <Footer />
  <Toast id="toast-global" />
</template>
