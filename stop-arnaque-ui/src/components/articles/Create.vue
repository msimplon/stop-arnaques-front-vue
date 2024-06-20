<script>
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength, minValue } from "@vuelidate/validators";

export default {

  setup() {
    return {
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
        introduction: null,
        description: null,
        imageUrl: null,
        date: null,
        categoryId: 0,
      },
      existingTitles: [], // Tableau des titres existants
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
        introduction: { required, maxLength: maxLength(700) },
        description: { required },
        imageUrl: {
          required,
          maxValue: (file) => {
            return file === null || file.size < 512000
          },

        },
        categoryId: { required, minValue: minValue(1) },
        date: {
          required,
          minValue: (value) => {
            const selectedDate = new Date(value);
            const currentDate = new Date();
            return selectedDate >= currentDate;
          },
        }
      },
    };
  },

  computed: {
    isValidDate() {
      const selectedDate = new Date(this.inputs.date);
      const currentDate = new Date();
      return selectedDate.toDateString() === currentDate.toDateString();
    },
  },

  methods: {
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
      console.log(this.validator.inputs.imageUrl.$errors)
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
        const resp = await this.$http.post("/articles", formData);

        if (resp.status === 201) {
          Object.assign(this.inputs, this.$options.data().inputs);
          this.$toast.success("toast-global", "L'article a été créé !");
          this.$router.push({ name: "articles-home" });
        } else {
          this.$toast.error("toast-global", "problème de validation");
        }
      }

    },

    handleFileUpload(event) {
      this.inputs.imageUrl = event.target.files[0]
    },
    async initcategory() {
      const resp = await this.$http.get("/categories");
      this.categoryId = resp.body;
    },
  },
  beforeMount() {
    this.initcategory();
  },

};
</script>

<template>
  <div class="row justify-content-center mt-2" data-aos="fade-up" data-aos-delay="300">
    <div class="col-xl-9 col-lg-12">
      <h1 class="row justify-content-center mt-2 mb-3">
        {{ $t("categoryFormLabels.title.create") }}
      </h1>
      <form novalidate @submit.prevent="submit">
        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="name" class="form-label required">{{ $t('categoryFormLabels.formTitle') }}</label>
            <input v-model.trim="inputs.title" id="title" name="title" type="text" maxlength="100" class="form-control"
              :class="{ 'is-invalid': validator.inputs.title.$error }" />
            <div class="form-text text-danger" v-if="validator.inputs.title.$error">
              Veuillez renseigner ce champs.
            </div>

            <div class="form-text mb-3" v-else>{{ $t("formElse.elseTitle") }}</div>
          </div>

          <div class="col-md-4 mb-3">
            <label for="name" class="form-label required">{{ $t('categoryFormLabels.formSubTitle') }}</label>
            <input v-model.trim="inputs.subTitle" id="subTitle" name="subTitle" type="text" maxlength="100"
              class="form-control" :class="{ 'is-invalid': validator.inputs.subTitle.$error }" />
            <div class="form-text text-danger" v-if="validator.inputs.subTitle.$error">
              Veuillez renseigner ce champs.
            </div>

            <div class="form-text mb-3" v-else>{{ $t("formElse.elseSubtitle") }}</div>
          </div>

          <div class="col-md-4 mb-3">
            <label for="editor" class="form-label required">{{ $t('categoryFormLabels.formEditor') }}</label>
            <input v-model.trim="inputs.editor" id="editor" name="editor" type="text" maxlength="100"
              class="form-control" :class="{ 'is-invalid': validator.inputs.editor.$error }" />
            <div class="form-text text-danger" v-if="validator.inputs.editor.$error">
              Veuillez renseigner ce champs.
            </div>

            <div class="form-text mb-3" v-else>{{ $t("formElse.elseEditor") }}.</div>
          </div>
        </div>

        <div class="col-12">
          <label for="introduction" class="form-label required">{{ $t('categoryFormLabels.formIntroduction') }}</label>
          <textarea v-model.trim="inputs.introduction" id="introduction" name="introduction" maxlength="1000" rows="12"
            class="form-control" :class="{ 'is-invalid': validator.inputs.introduction.$error }"></textarea>
          <div class="form-text text-danger" v-if="validator.inputs.introduction.$error">
            Veuillez renseigner ce champs.
          </div>
          <div class="form-text mb-3" v-else>{{ $t("formElse.elseIntroduction") }}.</div>
        </div>

        <div class="col-12">
          <label for="description" class="form-label required">{{
          $t("categoryFormLabels.formDescription")
        }}</label>
          <textarea v-model.trim="inputs.description" id="description" name="description" rows="12" class="form-control"
            :class="{ 'is-invalid': validator.inputs.description.$error }"></textarea>
          <div class="form-text text-danger" v-if="validator.inputs.description.$error">
            Veuillez renseigner ce champs.
          </div>
          <div class="form-text mb-3" v-else>{{ $t("formElse.elseDescription") }}</div>
        </div>


        <div class="row mt-4">
          <div class="col-md-4 mb-3">
            <div class="mb-3">
              <div class="mb-3">
                <label for="imageUrl" class="form-label required">{{ $t("categoryFormLabels.formImageUrl") }}</label>
                <input :class="{ 'is-invalid': validator.inputs.imageUrl.$error }" name="imageUrl" id="imageUrl"
                  type="file" accept="images/png,images/jpeg,images/jpg" class="form-control"
                  @change="handleFileUpload">
                <div class="form-text text-danger"
                  v-if="validator.inputs.imageUrl.$error && !validator.inputs.imageUrl.maxValue.$invalid">
                  Veuillez renseigner ce champ.
                </div>
                <div class="form-text text-danger" v-if="validator.inputs.imageUrl.maxValue.$invalid">
                  L'image que vous téléchargez ne doit pas dépasser 2 Mo.
                </div>

                <div class="form-text mb-3" v-else>{{ $t("formElse.elseImage") }}</div>
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
            <div class="form-text mb-3" v-else>{{ $t("formElse.elseDate") }}</div>
          </div>
          <div class="col-md-4 mb-3">
            <label for="categoryId" class="form-label required">{{ $t("formCategory.select") }}</label>
            <select v-model.number="inputs.categoryId" id="categoryId" name="categoryId" class="form-select"
              :class="{ 'is-invalid': validator.inputs.categoryId.$error }">
              <option selected disabled value="0">{{ $t("formCategory.fieldSelect") }}</option>
              <LabelValues :items="categoryId" />
            </select>

            <div class="form-text text-danger" v-if="validator.inputs.categoryId.$error">
              Veuillez saisir une catégorie
            </div>

            <div class="form-text mb-3" v-else>{{ $t("formElse.elseCategory") }}</div>
          </div>
        </div>
        <div class="text-center d-flex justify-content-end">
          <button class="btn btn-outline-primary col-2" type="submit">
            {{ $t("button.create") }}
            <i class="bi bi-send"></i></button>
        </div>
      </form>
    </div>
  </div>
</template>
