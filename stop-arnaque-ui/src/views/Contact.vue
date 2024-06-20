<script>
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength, email } from "@vuelidate/validators";

export default {
  setup() {
    return {
      validator: useVuelidate({ $autoDirty: true }),
    };
  },
  data() {
    return {
      inputs: {
        primaryRecipient: null,
        subject: null,
        body: null,
      },
    };
  },
  validations() {
    return {
      inputs: {
        primaryRecipient: { required, email },
        subject: { required, maxLength: maxLength(100) },
        body: { required, maxLength: maxLength(1000) },
      },
    };
  },
  methods: {
    async submit() {
      const resp = await this.$http.post("/send-mail", this.inputs);
      if (resp.status === 204) {
        Object.assign(this.inputs, this.$options.data().inputs);
        this.validator.$reset();
        this.$toast.success("toast-global", "Votre message a bien été envoyé");
        this.$router.push({ name: "articles-home" });
      } else {
        console.error(resp);
        this.$toast.error("toast-global", "problème de validation");
      }
    },
  },
};
</script>


<template>
  <section id="contact" class="contact">
    <div class="container">
      <div class="section-title">
        <h1 class="row justify-content-center mt-1 mb-1">Contact</h1>
      </div>

      <div class="row justify-content-center">
        <div class="col-xl-3 col-lg-4 mt-4" data-aos="fade-up">
          <div class="info-box">
            <i class="bi bi-geo-alt mydimension"></i>
            <h3>Localisation</h3>
            <p>Rue d'adam,73400 Paris,France</p>
          </div>
        </div>

        <div class="col-xl-3 col-lg-4 mt-4" data-aos="fade-up" data-aos-delay="100">
          <div class="info-box">
            <i class="bi bi-mailbox mydimension"></i>
            <h3>Adresse email</h3>
            <p>info@gmail.com</p>
            <p>rdv@gmail.com</p>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 mt-4" data-aos="fade-up" data-aos-delay="200">
          <div class="info-box">
            <i class="bi bi-telephone mydimension"></i>
            <h3>Numéro</h3>
            <p>+33 558 95 59 85<br />+33 558 95 59 89</p>
          </div>
        </div>
      </div>

      <div class="row justify-content-center" data-aos="fade-up" data-aos-delay="300">
        <div class="col-xl-9 col-lg-12 mt-4">
          <form novalidate @submit.prevent="submit" class="email-form">
            <div class="row">
              <div class="col-md-6 form-group mt-3 mt-md-0">
                <input for="primaryRecipient" type="email" class="form-control"
                  :class="{ 'is-invalid': validator.inputs.primaryRecipient.$error }" id="primaryRecipient"
                  name="primaryRecipient" v-model="inputs.primaryRecipient" placeholder="Votre Email" required />
                <!-- <span v-if="validator.inputs.primaryRecipient.$error">
                  {{ validator.inputs.primaryRecipient.$errors[0].$message }}
                </span> -->
              </div>

              <div class="col-md-6 form-group mt-3 mt-md-0">
                <input for="subject" type="text" class="form-control"
                  :class="{ 'is-invalid': validator.inputs.subject.$error }" name="subject" id="subject"
                  v-model="inputs.subject" placeholder="Votre sujet" required />
              </div>
              <span v-if="validator.inputs.subject.$error">
                {{ validator.inputs.subject.$errors[0].$message }}
              </span>
            </div>

            <div class="form-group mt-3">
              <textarea for="body" class="form-control" :class="{ 'is-invalid': validator.inputs.body.$error }"
                id="body" name="body" rows="3" v-model="inputs.body" placeholder="Votre message" required></textarea>
              <span v-if="validator.inputs.body.$error">
                {{ validator.inputs.body.$errors[0].$message }}
              </span>
            </div>
            <div class="my-3">

            </div>
            <div class="text-center d-flex justify-content-end">
              <button class="btn btn-outline-primary col-2" type="submit">
                Envoyer
                <i class="bi bi-envelope white-envelope"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
