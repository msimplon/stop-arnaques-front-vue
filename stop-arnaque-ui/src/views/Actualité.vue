<script>
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { ArticleStore } from "../stores/article-store";


export default {
  name: "Conso",
  setup() {
    const articleStoreObj = ArticleStore();
    const { lastAddedArticles } = storeToRefs(articleStoreObj);
    onBeforeMount(() => {
      articleStoreObj.get_last_added_articles();
    });
    return {
      lastAddedArticles,
      baseUrl: import.meta.env.VITE_IMG_BASE_URL

    };
  },

};
</script>

<template>
  <h2 class="fancy my-4" style="--w: 50vw;--c: #919191;--b:4px;--g:-5px">A la une</h2>
  <div class="row">
    <div class="col-md-4 p-3 d-flex justify-content-center cardo " v-for="article in lastAddedArticles" :key="article.id">
      <div class="cardi w-100">
        <img :src="baseUrl + article.imageUrl" :alt="article.name" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title text-center">
            {{ article.title }}
          </h5>
          <p class="card-subtitle mb-2 text-muted text-center">
            {{ article.introduction }}
          </p>
          <RouterLink :to="{ name: 'article-detail', params: { id: article.id } }" class="link" title="Details..."> Lire
            plus
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>