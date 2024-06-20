<script>
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from "pinia";
import { ArticleStore } from "../../stores/article-store";


export default {
    setup() {
        const articleStoreObj = ArticleStore();
        const { article } = storeToRefs(articleStoreObj);
        const route = useRoute();
        onBeforeMount(() => {
            const id = route.params.id;
            if (id !== undefined) {
                articleStoreObj.get_one_article(id);
            }
        });

        return {
            route,
            id: route.params.id,
            baseUrl: import.meta.env.VITE_IMG_BASE_URL,
            article,
        }
    },
}
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <article class="blog-card">
                    <div class="blog-card__background">
                        <div class="card__background--wrapper">
                            <div class="card__background--main" style="background-color: gray">
                                <div class="card__background--layer"></div>
                            </div>
                        </div>
                    </div>
                    <div class="blog-card__head"></div>
                    <div class="blog-card__info">
                        <div class="blog-card-style">
                            <h4>{{ article?.title }}</h4>
                            <p class="card-tag">{{ article?.categoryName }}</p>
                        </div>
                        <hr class="divide">
                        <h5>{{ article?.subTitle }}</h5>
                        <div class="editor-info d-flex flex-column flex-md-row">
                            <p class="editor">
                                <i class="bi bi-pencil"></i>
                                Par {{ article?.editor }}
                            </p>
                            <p class="editor-date">
                                <i class="bi bi-calendar"></i> Publié le
                                {{ article?.date }}
                            </p>
                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <img :src="baseUrl + article.imageUrl" :alt="article.name" class="detail">
                                <p class="text mt-5">{{ article?.introduction }}</p>
                                <p class="text-titre">{{ article?.subTitle }}</p>
                                <p class="text">{{ article?.description }}</p>
                            </div>
                            <div class="col-md-4">
                                <div class="sidebar">
                                    <h4>Informations supplémentaires</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                                        Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh
                                        elementum imperdiet.</p>
                                    <p>Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
                                        Mauris massa. Vestibulum lacinia arcu eget nulla.</p>
                                    <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                        himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.</p>
                                    <h4>Informations supplémentaires</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                                        Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh
                                        elementum imperdiet.</p>
                                    <p>Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
                                        Mauris massa. Vestibulum lacinia arcu eget nulla.</p>
                                    <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                        himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.</p>
                                    <p>Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
                                        Mauris massa. Vestibulum lacinia arcu eget nulla.</p>
                                    <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                        himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<style>
.detail {
    width: 100%;
    height: auto;
}

.text-titre {
    color: blue;
    font-weight: bold;
}

.sidebar {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
}

@media (min-width: 768px) {
    .detail {
        width: 100%;
    }
}
</style>
