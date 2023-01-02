<script setup lang="ts">
import { ref } from 'vue'
// defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
    <fluent-button appearance="secondary">Click Me</fluent-button>
    <fluent-text-field appearance="outline" placeholder="user@email.com">Email</fluent-text-field>
</template>

<style scoped>
</style>
