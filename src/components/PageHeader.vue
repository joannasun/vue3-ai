<template>
    <div class="page-header">
        <div class="title">
            <h3>{{ props.title}}</h3>
        </div>
        <div class="buttons">
            <slot name="buttons"></slot>
        </div>
    </div>
</template>
<script setup>

const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})

</script>
<style scoped lang="scss">
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
