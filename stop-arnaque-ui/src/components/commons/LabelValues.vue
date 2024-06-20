<script>
export default {
    props: {
        items: {
            type: Array,
            default: []
        }
    }
}
</script>
<template>
    <option v-for="item in items" :key="item.id" :value="item.id">
        <!-- {{ item.name }} -->
        <span>{{ item.label }}</span>
        <span>{{ item.name }}</span>
    </option>
</template>