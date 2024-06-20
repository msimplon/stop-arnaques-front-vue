<script setup>
import { reactive, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import useValidate from "@vuelidate/core";

import { maxLength, minValue, minLength, required } from "@vuelidate/validators";
import { useAuthStore } from "@/stores/auth-store";
import { usePageStore } from "@/stores/page-store";

const user = reactive({
    username: null,
    password: null,
});
const rules = computed(() => {
    return {

        username: { required, maxLength: maxLength(200), minLength: minLength(2) },
        password: {
            required, maxLength: maxLength(120), minLength: minLength(8)
        }


    };


});

const v$ = useValidate(rules, user);
const authStore = useAuthStore();
const { userRole } = storeToRefs(authStore);
const pageStore = usePageStore();
const router = useRouter();
const submit = async () => {
    await v$.value.$validate();
    if (!v$.value.$error) {
        const resp = await authStore.login(user);
        if (resp.status === 200) {
            const token = resp.body.token;
            console.log("Token after login", token);
            if (userRole.value == "ADMIN") {
                router.push("/admin/articles");
                pageStore.alert.type = "success";
                pageStore.alert.message = `${user.username} est connecté 😊`;
                pageStore.alert.show = true;
                setTimeout(() => {
                    pageStore.alert.show = false;
                }, 7000);
            } else {
                router.push("/");
                pageStore.alert.type = "success";
                pageStore.alert.message = `${user.username} est connecté 😊`;
                pageStore.alert.show = true;
                setTimeout(() => {
                    pageStore.alert.show = false;
                }, 6000);
            }
        }
        if (!resp) {
            console.error(resp);
            this.$toast.error("toast-global", "problème de validation");
        }
    }
};
</script>

<template>
    <main>
        <div class="container-xl mt-2 signInContain">
            <div class="row mt-4">
                <div class="col-md my-6 mx-auto">
                    <section id="section1">
                        <form novalidate @submit.prevent="submit">
                            <fieldset>
                                <legend class="w-auto px-2">
                                    <h4 class="mt-2">{{ $t("authlabels.title.signIn") }}</h4>
                                </legend>
                                <div class="form-floating">
                                    <input v-model.trim="user.username" id="username" name="username" type="text"
                                        maxlength="100" class="form-control"
                                        :class="{ 'is-invalid': v$.username.$error }" />
                                    <label for="username" class="form-label required">
                                        <i class="bi bi-envelope-at"></i> {{ $t("authlabels.formUsername") }}
                                    </label>
                                    <div class="form-text text-danger" v-if="v$.username.$error">
                                        Veuillez renseigner ce champ avec au minimum 2 caractères
                                    </div>
                                    <div class="form-text mb-3" v-else>Email.</div>
                                </div>
                                <div class="form-floating">
                                    <input v-model.trim="user.password" id="password" name="password" type="password"
                                        maxlength="100" minlength="8" class="form-control"
                                        :class="{ 'is-invalid': v$.password.$error }" />
                                    <label for="password" class="form-label required">
                                        <i class="bi bi-key"></i> {{ $t("authlabels.formPassword") }}
                                    </label>
                                    <div class="form-text text-danger" v-if="v$.password.$error">
                                        Veuillez saisir au moins 8 caractères.
                                    </div>
                                    <div class="form-text mb-3" v-else>Mot de passe.</div>
                                </div>
                                <div class="aside-text-info">
                                    Vous n'avez pas encore de compte ?
                                    <RouterLink :to="{ name: 'signUp' }">Inscription</RouterLink>
                                </div>
                                <div class="text-center d-flex justify-content-end">
                                    <button class="btn btn-outline-primary col-2 mt-4" type="submit">
                                        {{ $t("authlabels.submitRegister") }}
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    </main>
</template>
