<template>
    <div v-if="model.$invalid" class="text-danger">
        <ul class="list-unstyled">
            <li v-for="err in model.$errors" :key="err">{{ err.$message }}</li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        model: {
            type: Object,
            required: true,
        },
    },
};
</script>