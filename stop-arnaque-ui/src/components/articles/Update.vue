<script>
import { useRoute } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength, minValue } from "@vuelidate/validators";
export default {
  setup() {
    return {
      route: useRoute(),
      validator: useVuelidate({ $autoDirty: true }),
      existingTitles: [],
    };
  },
  data() {
    return {
      categoryId: [],
      inputs: {
        title: null,
        subTitle: null,
        editor: null,
        description: null,
        introduction: null,
        imageUrl: null,
        date: null,
        categoryId: 0,
      },
      existingImage: null,
      existingTitles: [], // Tableau des titres existants
      baseUrl: import.meta.env.VITE_IMG_BASE_URL,
    };
  },
  validations() {
    return {
      inputs: {
        title: {
          required, maxLength: maxLength(100), uniqueTitle: (value) => ({
            isValid: this.isTitleUnique(value),
            message: "Ce titre existe déjà. Veuillez en choisir un autre.",
          }),
        },
        subTitle: { required, maxLength: maxLength(100) },
        editor: { required, maxLenght: maxLength(100) },
        description: { required },
        introduction: { required, maxLength: maxLength(700) },
        imageUrl: {
          required
        },
        categoryId: { required, minValue: minValue(1) },
        date: { required }
      },
    };
  },
  methods: {
    async initInputs() {
      const resp = await this.$http.get(`/articles/${this.id}/detail`);
      this.inputs = resp.body;
      console.log(resp.body, "test")
      this.existingImage = resp.body.imageUrl
      this.inputs.imageUrl = null
      console.log(this.inputs, this.existingImage, "null image")
    },
    isTitleUnique(value) {
      return !this.existingTitles.includes(value);
    },
    getFormattedDate() {
      let today = new Date();
      let day = today.getDate();
      let month = today.getMonth() + 1;
      let year = today.getFullYear();
      if (day < 10) {
        day = '0' + day;
      }
      if (month < 10) {
        month = '0' + month;
      }
      return `${year}-${month}-${day}`;
    },
    async submit() {
      const formData = new FormData()
      const valid = await this.validator.$validate()
      if (valid) {
        const [year, month, day] = this.inputs.date.toString().split("-")
        if (this.inputs.imageUrl != null) {
          formData.append("imageUrl", this.inputs.imageUrl)
        }
        formData.append("title", this.inputs.title);
        if (!this.validator.inputs.title.uniqueTitle.isValid) {
          this.$toast.error("toast-global", "Ce titre existe déjà.Veuillez en choisir un autre.", this.validator.inputs.title.uniqueTitle.message);
        }
        formData.append("subTitle", this.inputs.subTitle);
        formData.append("editor", this.inputs.editor);
        formData.append("description", this.inputs.description);
        formData.append("introduction", this.inputs.introduction);
        formData.append("date", `${day}/${month}/${year}`);
        formData.append("categoryId", this.inputs.categoryId);
        const resp = await this.$http.patch(`/articles/${this.id}`, formData);
        console.log(formData)
        console.log(resp, "resp")
        console.log("STATUS", resp.status);
        if (resp.status === 200) {
          Object.assign(this.inputs, this.$options.data().inputs);
          this.$toast.success("toast-global", "Article modifié avec succès");
          this.$router.push({ name: 'articles-home' });
        } else {
          this.$toast.error("toast-global", "problème de validation");
        }
      }
    },
    handleFileUpload(event) {
      this.inputs.imageUrl = event.target.files[0];
    },
    async initcategory() {
      const resp = await this.$http.get("/categories");
      this.categoryId = resp.body;
    },
  },
  async mounted() {
    this.id = this.route.params.id;
    await this.initcategory();
    await this.initInputs();
    console.log(this.inputs);
  },
};
</script>
<template>
  <div class="row justify-content-center mt-2" data-aos="fade-up" data-aos-delay="300">
    <div class="col-xl-9 col-lg-12">
      <h1 class="row justify-content-center mt-2 mb-3">
        Modifier un article
      </h1>
      <form novalidate @submit.prevent="submit">
        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="name" class="form-label required">Titre</label>
            <input v-model.trim="inputs.title" id="title" name="title" type="text" maxlength="100" class="form-control"
              :class="{ 'is-invalid': validator.inputs.title.$error }" />
            <div class="form-text text-danger" v-if="validator.inputs.title.$error">
              Veuillez renseigner ce champs.
            </div>
            <div class="form-text mb-3" v-else>Titre de l'article.</div>
          </div>
          <div class="col-md-4 mb-3">
            <label for="name" class="form-label required">Sous-titre</label>
            <input v-model.trim="inputs.subTitle" id="subTitle" name="subTitle" type="text" maxlength="100"
              class="form-control" :class="{ 'is-invalid': validator.inputs.subTitle.$error }" />
            <div class="form-text text-danger" v-if="validator.inputs.subTitle.$error">
              Veuillez renseigner ce champs.
            </div>
            <div class="form-text mb-3" v-else>Sous-titre de l'article.</div>
          </div>

          <div class="col-md-4 mb-3">
            <label for="editor" class="form-label required">Editeur</label>
            <input v-model.trim="inputs.editor" id="editor" name="editor" type="text" maxlength="100"
              class="form-control" :class="{ 'is-invalid': validator.inputs.editor.$error }" />
            <div class="form-text text-danger" v-if="validator.inputs.editor.$error">
              Veuillez renseigner ce champs.
            </div>
            <div class="form-text mb-3" v-else>Editeur de l'article.</div>
          </div>
        </div>
        <div class="col-12">
          <label for="description" class="form-label required">{{
        $t("categoryFormLabels.formDescription")
      }}</label>
          <textarea v-model.trim="inputs.description" id="description" name="description" maxlength="1000" rows="12"
            class="form-control" :class="{ 'is-invalid': validator.inputs.description.$error }"></textarea>
          <div class="form-text text-danger" v-if="validator.inputs.description.$error">
            Veuillez renseigner ce champs.
          </div>
          <div class="form-text mb-3" v-else>Contenu de l'article.</div>
        </div>
        <div class="col-12">
          <label for="introduction" class="form-label required">Introduction</label>
          <textarea v-model.trim="inputs.introduction" id="introduction" name="introduction" maxlength="1000" rows="12"
            class="form-control" :class="{ 'is-invalid': validator.inputs.introduction.$error }"></textarea>
          <div class="form-text text-danger" v-if="validator.inputs.introduction.$error">
            Veuillez renseigner ce champs.
          </div>
          <div class="form-text mb-3" v-else>Introduction de l'article.</div>
        </div>
        <div class="row mt-4">
          <div class="col-md-4 mb-3">
            <div class="mb-3">
              <div class="mb-3">
                <label for="imageUrl" class="form-label required">Ajouter une image</label>
                <input name="imageUrl" id="imageUrl" type="file" class="form-control" @change="handleFileUpload">
                <div>
                  <img :src="baseUrl + existingImage" class="img-fluid rounded-top" :alt="inputs.title" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <label for="name" class="form-label required">Date</label>
            <input v-model.trim="inputs.date" id="date" name="date" :min="getFormattedDate()" type="date"
              class="form-control"
              :class="{ 'is-invalid': validator.inputs.date.$error || (validator.inputs.date === false && inputs.date) }" />
            <div class="form-text text-danger" v-if="validator.inputs.date.$error && !inputs.date">
              Veuillez renseigner ce champ.
            </div>
            <div class="form-text text-danger" v-if="validator.inputs.date === false && inputs.date">
              La date ne peut pas être antérieure à la date actuelle.
            </div>
            <div class="form-text mb-3" v-else>Date de publication présente ou future.</div>
          </div>
          <div class="col-md-4 mb-3">
            <label for="categoryId" class="form-label required">Catégorie</label>
            <select v-model.number="inputs.categoryId" id="categoryId" name="categoryId" class="form-select"
              :class="{ 'is-invalid': validator.inputs.categoryId.$error }">
              <option selected disabled value="0">Choisir une catégorie</option>
              <LabelValues :items="categoryId" />
            </select>
            <div class="form-text text-danger" v-if="validator.inputs.categoryId.$error">
              Veuillez saisir une catégorie
            </div>
            <div class="form-text mb-3" v-else>Actualité ou conseil.</div>
          </div>
        </div>
        <div class="text-center d-flex justify-content-end">
          <button class="btn btn-outline-primary col-12 col-md-2 mt-3" type="submit">
            Créer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>