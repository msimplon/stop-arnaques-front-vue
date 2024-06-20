<script>

export default {

    data() {
        return {
            baseUrl: import.meta.env.VITE_IMG_BASE_URL,
            articles: [],
        };
    },

    methods: {
        async initArticles() {
            const resp = await this.$http.get("/articles/list-articles");
            this.articles = resp.body;
            console.log('Articles récupérés:', this.articles);
        },


    },

    beforeMount() {
        this.initArticles();
    },
};
</script>


<template>
    <section class=" row fw-semibold text-center">
        <div class="col-md-4 p-5 d-flex justify-content-center cardo" v-for="article in articles">

            <div class="cardi">
                <img :src="baseUrl + article.imageUrl" :alt="article.name" class="card-img-top">
                <div class="cardi-body-info">
                    <h2>{{ article.title }}</h2>
                    <hr class="divid">
                    <p class="card-text text-muted ">{{ article.introduction }}</p>
                    <RouterLink :to="{ name: 'article-detail', params: { id: article.id } }" class="link"
                        title="Details...">
                        Lire plus
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>
