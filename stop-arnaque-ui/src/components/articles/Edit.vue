<template>
  <h1 class="row justify-content-center mt-2 mb-3">Modifier un article</h1>
  <div class="table-responsive">
    <table class="table table-hover table-bordered">
      <!-- Table Head -->
      <thead>
        <tr class="text-center align-middle">
          <th scope="col">Image</th>
          <th scope="col">Titre</th>
          <th scope="col">Editeur</th>
          <th scope="col">Date de publication</th>
          <th scope="col">Modifier</th>
          <th scope="col">Supprimer</th>
        </tr>
      </thead>
      <!-- Table Body -->
      <tbody class="text-nowrap align-middle">
        <tr v-for="article in articles" :key="article.id">
          <td class="text-center">
            <img :src="baseUrl + article.imageUrl" class="img-fluid rounded-top" :alt="article.title" />
          </td>
          <td class="text-center">
            <!-- Ouvrir la fenêtre modale lorsqu'on clique sur le titre -->
            <a href="#" @click="openModal(article)">{{ article.title }}</a>
          </td>
          <td class="text-center">{{ article.editor }}</td>
          <td class="text-center">{{ $d(article.date, 'long') }}</td>
          <td class="text-center">
            <RouterLink :to="{ name: 'article-update', params: { id: article.id } }" title="Update article">
              <i class="bi bi-pencil-square"></i>
            </RouterLink>
          </td>
          <td class="text-center">
            <!-- Ajouter l'icône de suppression avec la fonction openDeleteModal(article.id) -->
            <a href="#" @click="openDeleteModal(article.id)"><i class="bi bi-trash3"></i></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal pour afficher les détails de l'article -->
  <div v-if="selectedArticle" class="modal fade show d-block" tabindex="-1" role="dialog"
    style="background: rgba(0, 0, 0, 0.5);">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Détails de l'article</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Contenu des détails de l'article -->
          <img :src="baseUrl + selectedArticle.imageUrl" class="img-fluid rounded-top" :alt="selectedArticle.title" />
          <p>{{ selectedArticle.title }}</p>
          <p>{{ selectedArticle.title }}</p>
          <p>{{ selectedArticle.subtitle }}</p>
          <p>{{ selectedArticle.editor }}</p>
          <p>{{ selectedArticle.introduction }}</p>
          <p>{{ selectedArticle.description }}</p>
          <p>{{ $d(selectedArticle.date, 'long') }}</p>


          <!-- Ajoutez ici d'autres détails de l'article -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Fermer</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal pour confirmer la suppression de l'article -->
  <div v-if="articleToDelete" class="modal fade show d-block" tabindex="-1" role="dialog"
    style="background: rgba(0, 0, 0, 0.5);">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmer la suppression</h5>
          <button type="button" class="btn-close" @click="closeDeleteModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Êtes-vous sûr de vouloir supprimer l'article "{{ articleToDelete.title }}" ?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Annuler</button>
          <button type="button" class="btn btn-danger" @click="confirmRemove(articleToDelete.id)">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: import.meta.env.VITE_IMG_BASE_URL,
      articles: [],
      selectedArticle: null, // Article sélectionné pour afficher les détails
      articleToDelete: null, // Article sélectionné pour la suppression
    };
  },
  methods: {
    async initArticles() {
      const resp = await this.$http.get("/articles/list-articles");
      this.articles = resp.body;
    },
    openModal(article) {
      this.selectedArticle = article;
    },
    closeModal() {
      this.selectedArticle = null;
    },
    openDeleteModal(id) {
      this.articleToDelete = this.articles.find(article => article.id === id);
    },
    closeDeleteModal() {
      this.articleToDelete = null;
    },
    async confirmRemove(id) {
      const resp = await this.$http.delete(`/articles/byId/${id}`);
      if (resp.status === 200) {
        this.$toast.success("toast-global", "Article supprimé avec succes.");
        this.$router.push({ name: "articles-edit" });
        await this.initArticles();
      } else {
        console.error(resp);
        this.$toast.error("toast-global", "erreur.");
      }
      this.closeDeleteModal();
    },
  },
  beforeMount() {
    this.initArticles();
  },
};
</script>

<style scoped>
.modal-dialog {
  margin-top: 10%;
}
</style>
