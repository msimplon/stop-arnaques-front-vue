<script>
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";

export default {
    setup() {
        return {
            validator: useVuelidate({ $autoDirty: true }),
        };
    },
    data() {
        return {
            disputeId: [],
            inputs: {
                subject: null,
                email: null,
                incidentNumber: null,
                attachement: null,
                details: null,
                disputeId: 0,
            },
        };
    },
    validations() {
        return {
            inputs: {
                subject: { required, maxLength: maxLength(100) },
                email: { required, maxLength: maxLength(100) },
                details: { required, maxLenght: maxLength(1000) },
                incidentNumber: { required, maxLength: maxLength(1000) },
                attachement: {
                    maxValue: (file) => {
                        return file === null || file.size < 512000
                    }
                },
                disputeId: { required }
            },
        };
    },
    methods: {
        async submit() {
            const formData = new FormData()
            const valid = await this.validator.$validate()
            if (valid) {
                if (this.inputs.attachement != null) {
                    formData.append("attachement", this.inputs.attachement)
                }
                formData.append("subject", this.inputs.subject);
                formData.append("email", this.inputs.email);
                formData.append("incidentNumber", this.inputs.incidentNumber);
                formData.append("details", this.inputs.details);
                formData.append("disputeId", this.inputs.disputeId);

                console.log(formData)
                const resp = await this.$http.post("/forms", formData);
                console.log(formData)
                console.log(resp, "resp")

                if (resp.status === 201) {
                    Object.assign(this.inputs, this.$options.data().inputs);

                    this.$toast.success("toast-global", "Votre signalement a bien été envoyé");
                    this.$router.push({ name: "articles-home" });
                } else {
                    console.error(resp);
                    this.$toast.error("toast-global", "problème de validation");
                }
            }

        },

        handleFileUpload(event) {
            this.inputs.attachement = event.target.files[0]
        },
        async initdispute() {
            const resp = await this.$http.get("/disputes");
            this.disputeId = resp.body;

        },
    },
    beforeMount() {
        this.initdispute();
    },
};
</script>

<template>
    <div class="row justify-content-center mt-2" data-aos="fade-up" data-aos-delay="300">
        <div class="col-xl-9 col-lg-12">
            <h1 class="row justify-content-center mt-2 mb-3">
                Formulaire de signalement </h1>
            <form novalidate @submit.prevent="submit">
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label for="incidentNumber" class="form-label required">Numéro d'incident
                        </label>
                        <input v-model.trim="inputs.incidentNumber" id="incidentNumber" name="incidentNumber"
                            class="form-control" :class="{ 'is-invalid': validator.inputs.incidentNumber.$error }" />
                        <div class="form-text text-danger" v-if="validator.inputs.incidentNumber.$error">
                            Veuillez renseigner ce champs.
                        </div>
                        <div class="form-text mb-3" v-else>numéro d'incident</div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="incidentNumber" class="form-label required">E-mail
                        </label>
                        <input v-model.trim="inputs.email" id="email" name="email" type="text" maxlength="100"
                            class="form-control" :class="{ 'is-invalid': validator.inputs.email.$error }" />

                        <div class="form-text text-danger" v-if="validator.inputs.email.$error">
                            Veuillez renseigner ce champs avec au minimum 2 caractères
                        </div>
                        <div class="form-text mb-3" v-else>Votre adresse E-mail.</div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="incidentNumber" class="form-label required">Object
                        </label>
                        <input v-model.trim="inputs.subject" id="subject" name="subject" type="text" maxlength="100"
                            class="form-control" :class="{ 'is-invalid': validator.inputs.subject.$error }" />

                        <div class="form-text text-danger" v-if="validator.inputs.subject.$error">
                            Veuillez renseigner ce champs avec au minimum 2 caractères
                        </div>

                        <div class="form-text mb-3" v-else>Saisir un object à votre signalement.</div>
                    </div>
                </div>
                <div class="fieldarnaque">
                    <hr>
                    <i class="bi bi-exclamation-triangle"></i>
                    <p style="margin-left: 5%; justify-items: center; size: 20%;"> DÉCRIVEZ L'ARNAQUE </p>
                    <i class="bi bi-exclamation-triangle"></i>
                    <hr>
                </div>
                <div class=" dropdown d-grid gap-3 mt-4">
                    <label for="disputeId" class="form-label required">Raison du signalement</label>
                    <select v-model.number="inputs.disputeId" id="disputeId" name="disputeId" class="form-select"
                        :class="{ 'is-invalid': validator.inputs.disputeId.$error }">
                        <option selected disabled value="0">Type de litige</option>
                        console.log(this.disputeId)
                        <LabelValues :items="disputeId" />
                    </select>

                    <div class="form-text text-danger" v-if="validator.inputs.disputeId.$error">
                        Veuillez saisir un type de litige
                    </div>

                </div>

                <div class="col-12 mt-4">
                    <label for="details" class="form-label required">Détail du signalement
                    </label>
                    <textarea v-model.trim="inputs.details" id="details" name="details" rows="12" class="form-control"
                        :class="{ 'is-invalid': validator.inputs.details.$error }"></textarea>
                    <div class="form-text text-danger" v-if="validator.inputs.details.$error">
                        Veuillez renseigner ce champs.
                    </div>
                    <div class="form-text mb-3" v-else>Veuillez saisir votre litige</div>
                </div>
                <div class="row mt-4">
                    <div class="col-md-4 mb-3">
                        <div class="mb-3">
                            <div class="mb-3">
                                <label for="attachement" class="form-label required">Pièce-jointe</label>
                                <input :class="{ 'is-invalid': validator.inputs.attachement.$error }" name="attachement"
                                    id="attachement" type="file" accept="images/png,images/jpeg,images/jpg"
                                    class="form-control" @change="handleFileUpload">
                                <div class="form-text text-danger"
                                    v-if="validator.inputs.attachement.$error && !validator.inputs.attachement.maxValue.$invalid">
                                    Veuillez renseigner ce champ.
                                </div>
                                <div class="form-text text-danger"
                                    v-if="validator.inputs.attachement.maxValue.$invalid">
                                    La taille du document ou image ne peut pas dépasser 500ko.
                                </div>

                                <div class="form-text mb-3" v-else> formats acceptés : pdf, jpg, pnj</div>
                            </div>
                        </div>
                    </div>
                </div>
                <fieldset class="reset">
                    <legend class="w-auto px-1">Avant de confirmer</legend>
                    <p>Ne signalez que des arnaques ou publicités trompeuses avérées. En incluant aucune
                        preuve ou
                        élément factuel, votre signalement ne sera pas publié. Dans le cas où vous souhaiteriez
                        simplement partager un avis ou retour d'expérience, merci d'utiliser Trustpilot.
                    </p>

                </fieldset>
                <div class="text-center d-flex justify-content-end">
                    <button class="btn btn-outline-primary col-12 col-md-2 mt-3" type="submit">
                        Confirmer
                        <i class="bi bi-send"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<style>
.hr-sect {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    justify-content: center;
}

.legend {
    margin-top: 3%;

}

.reset {
    all: revert;
}

p,
.text {
    font-family: 'Raleway', sans-serif !important;
    font-size: 15px !important;

}

.fieldarnaque {
    width: 100%;
    margin-top: 3%;
    display: flex;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-around;

}

.fieldarnaque>p {
    color: var(--color-white);
    margin: 0;
    width: 17rem;
    text-align: center;
}

.fieldarnaque>hr {
    width: 40%;
    size: 3px;
    color: var(--color-white);
}


form {
    padding: 30px;
}

.form-control {
    background-color: whitesmoke
}

.form-control:focus {
    border: 3px solid grey;
    border-color: grey;
    box-shadow: 0px 0px 1px 1px grey;
}

input {
    background-color: grey;
}

button[type="submit"] {
    background: rgb(0, 119, 255);
    border: 20px;
    padding: 10px 10px;
    color: #fff;
    transition: 0.4s;
}

.form-check {
    font-size: 15px;
}

button[type="submit"]:hover {
    background: #78cbec;
}
</style>
