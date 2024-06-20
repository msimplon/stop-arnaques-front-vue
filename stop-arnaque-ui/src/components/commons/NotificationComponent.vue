<script setup>
import { computed, watch } from "vue";
import { usePageStore } from "@/stores/page-store";

const pageStore = usePageStore();
const alertClass = computed(() => {
    return `text-center alert alert-${pageStore.alert.type}`;
});
watch(
    () => pageStore.alert,
    (newAlert) => {
        type.value = newAlert.type;
        message.value = newAlert.message;
        show.value = newAlert.show;
    }
);
</script>

<template>
    <div>
        <div v-if="pageStore.alert.show" class="text-center alert container mt-3" :class="alertClass">
            {{ pageStore.alert.message }}
        </div>
    </div>
</template>

<style>
.alert {
    max-width: 300px;
    /* Ajustez la largeur selon vos besoins */
    margin: auto;
    padding: 10px;
    text-align: center;
    background-color: #8fdbe6;
    /* Bleu clair pour le fond */
    color: #014a97;
    /* Bleu pour le texte */
    border: 1px solid #007bff;
    /* Bordure bleue */

}
</style>