<script>
import { reactive, computed } from "vue";
import {
  email,
  helpers,
  minLength,
  maxLength,
  required,
} from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import ValidationMessage from "../components/commons/ValidationMessage.vue";

export default {
  name: "SignUp",
  components: {
    ValidationMessage,
  },
  setup() {

    const state = reactive({
      user: {
        firstName: null,
        lastName: null,
        username: null,
        password: null,
      },
    });

    const validPassword = helpers.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?]).{8,42}$/
    );
    const rules = computed(() => {
      return {
        user: {
          firstName: {
            required: helpers.withMessage(
              "Veuillez renseigner ce champ.",
              required
            ),
            minLength: helpers.withMessage(
              "Veuillez saisir au moins 2 caractères.",
              minLength(2)
            ),
            maxLength: helpers.withMessage(
              "Veuillez saisir moins de 30 caractères.",
              maxLength(30)
            ),
          },
          lastName: {
            required: helpers.withMessage(
              "Veuillez renseigner ce champ.",
              required
            ),
            minLength: helpers.withMessage(
              "Veuillez saisir au moins 2 caractères.",
              minLength(2)
            ),
            maxLength: helpers.withMessage(
              "Veuillez saisir moins de 100 caractères.",
              maxLength(100)
            ),
          },
          username: {
            required: helpers.withMessage(
              "Veuillez renseigner ce champ.",
              required
            ),
            username: helpers.withMessage(
              "Veuillez fournir une adresse électronique valide au format votrenom@example.com",
              email
            ),
          },
          password: {
            required: helpers.withMessage(
              "Veuillez renseigner ce champ.",
              required
            ),
            maxLength: helpers.withMessage(
              "Veuillez saisir moins de 100 caractères.",
              minLength(8)
            ),
            validPassword: helpers.withMessage(
              "Format non valide.",
              validPassword
            ),
          },
          // confirmPassword: {
          //   required: helpers.withMessage(
          //     "Veuillez renseigner ce champ.",
          //     required
          //   ),
          //   sameAs: helpers.withMessage(
          //     "Veuillez saisir les mots de passe identiques.",
          //     sameAs(state.user.password)
          //   ),
          // },
        },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
      validPassword,
      //validateEmailError
    };

  },
  methods: {
    async submit() {
      const resp = await this.$http.post('/users', this.state.user);
      this.v$.$validate();
      if (!this.v$.$error) {
        const my_user = this.state.user;
        console.log(my_user);


        if (resp.status === 201) {
          // Object.assign(this.user, this.$options.data().user);
          // this.validator.$reset();
          this.$toast.success("toast-global", "Le compte a été créé !!!");
          this.$router.push({ name: "signIn" });

        } else {
          console.error(resp);
          this.$toast.error("toast-global", "l'adresse mail existe déjà");
        }
      }
    }

  },

  beforeMount() {

  },

};
</script>

<template>
  <main>
    <div class="container-xl mt-2">
      <div class="presentation">
        <div class="welcome">{{ $t("authlabels.formwelcom") }}</div>
      </div>
      <div class="row mt-4">
        <div class="col-md my-6 mx-auto">
          <section id="section1">
            <form novalidate @submit.prevent="submit">
              <fieldset>
                <legend class="w-auto px-2">
                  <h4>{{ $t("authlabels.title.signUp") }}</h4>
                </legend>
                <div class="mb-3">
                  <div class="row">
                    <div class="col-md-4">
                      <label for="firstName" class="form-label required">{{ $t("authlabels.formFirstName") }}</label>
                      <input v-model.trim="state.user.firstName" name="firstName" id="firstName" type="text"
                        class="form-control" :class="{
                          'is-invalid': v$.user.firstName.$error,
                        }" />
                      <ValidationMessage :model="v$.user.firstName" />
                    </div>
                    <div class="col-md-4">
                      <label for="lastName" class="form-label required">{{ $t("authlabels.formName") }}</label>
                      <input v-model.trim="state.user.lastName" name="lastName" id="lastName" type="text"
                        class="form-control" :class="{
                          'is-invalid': v$.user.lastName.$error,
                        }" />
                      <ValidationMessage :model="v$.user.lastName" />
                    </div>

                    <div class="col-md-4">
                      <label for="username" class="form-label required"><i class="bi bi-envelope-at"></i> {{
                        $t("authlabels.formUsername") }}</label>
                      <input v-model.trim="state.user.username" name="username" id="username" type="email"
                        class="form-control" aria-describedby="emailHelp"
                        :class="{ 'is-invalid': v$.user.username.$error }" />
                      <div id="emailHelp" class="form-text">
                        {{ $t("authlabels.helpUsername") }}</div>
                      <ValidationMessage :model="v$.user.username" />
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="password" class="form-label required"><i class="bi bi-key"></i> {{
                        $t("authlabels.formPassword") }}</label>
                      <input v-model.trim="state.user.password" name="password" id="password" type="password"
                        class="form-control" :class="{ 'is-invalid': v$.user.password.$error }" />
                      <div id="passwordHelp" class="form-text">
                        {{ $t("authlabels.helpPassword") }}
                      </div>
                      <ValidationMessage :model="v$.user.password" />
                    </div>
                  </div>
                </div>
                <div class="aside-text-info">
                  En validant votre inscription, vous accepter les
                  <RouterLink :to="{ name: 'cgu' }">
                    conditions générales d’utilisation (CGU)
                  </RouterLink>
                </div>
                <div class="text-center d-flex justify-content-end">
                  <button class="btn btn-outline-primary col-2 mt-2" type="submit">
                    {{ $t("authlabels.submitRegister") }} </button>
                </div>

              </fieldset>
            </form>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>


