<script setup>
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth-store";
import { usePageStore } from "@/stores/page-store";

const authStore = useAuthStore();
const pageStore = usePageStore();
const { userRole } = storeToRefs(authStore);
const { isAdmin, isLoggedIn, userFullName } = storeToRefs(authStore);
const logout = async () => {
  await authStore.logout();
  pageStore.alert.type = "success";
  pageStore.alert.message = `vous vous êtes déconnecté !😊`;
  pageStore.alert.show = true;
  setTimeout(() => {
    pageStore.alert.show = false;
  }, 3000);
  router.push("/");
};

</script>
<template>
  <header class="bg-light sticky-top">
    <nav class="container-xxl navbar-light navbar navbar-expand-md">
      <div class="container-fluid">
        <div class="lol">
          <RouterLink :to="{ name: 'articles-home' }" class="navbar-brand">Stop Arnaque
          </RouterLink>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i class="bi bi-shield-lock-fill"></i>
                Administrateur
              </a>
              <ul class="dropdown-menu">
                <li v-if="isLoggedIn && isAdmin">
                  <RouterLink :to="{ name: 'articles-edit' }" class="dropdown-item">
                    <i class="bi bi-pencil-square"></i>
                    Editer un article
                  </RouterLink>
                </li>
                <li v-if="isLoggedIn && isAdmin">
                  <RouterLink :to="{ name: 'articles-create' }" class="dropdown-item">
                    <i class="bi bi-file-earmark-plus"></i>
                    Nouvel article
                  </RouterLink>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i class="bi bi-bookmarks-fill"></i>
                Actualité
              </a>
              <ul class="dropdown-menu">
                <li>
                  <RouterLink :to="{ name: 'dgccrf' }" class="dropdown-item">
                    <i class="bi bi-bank"></i>
                    Site de la DGCCRF
                  </RouterLink>
                </li>
                <li v-if="isLoggedIn && isAdmin">
                  <RouterLink :to="{ name: 'actualité' }" class="dropdown-item">
                    <i class="bi bi-house-door-fill"></i> A la une
                  </RouterLink>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <RouterLink :to="{ name: 'contact' }" class="nav-link">
                <i class="bi bi-envelope-at-fill"></i>
                Contact
              </RouterLink>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <RouterLink :to="{ name: 'signIn' }" class="nav-link">
                <i class="bi bi-gear-wide-connected"></i>
                Connexion
              </RouterLink>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <RouterLink :to="{ name: 'signUp' }" class="nav-link">
                <i class="bi bi-check-circle-fill"></i>
                Inscription
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink :to="{ name: 'article-signal-arnaque' }" class="nav-link">
                <i class="bi bi-bell-fill"></i> Signaler
              </RouterLink>
            </li>
            <li class="nav-item">
              <a href="#" @click="logout" v-if="isLoggedIn">
                <i class="bi bi-box-arrow-right fs-2 logout me-4"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<style>
.navbar-nav .nav-item {
  margin-right: 5px;
}

.navbar {
  padding: 20px;
}
</style>
