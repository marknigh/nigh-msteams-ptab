<script setup lang="ts">
    
    defineProps<{clientType: string, userPrincipalName: string, theme: string}>()

</script>

<template>
    <section class="section">
        <a href="https://cdw.com">
            <img src="https://webobjects2.cdw.com/is/image/CDW/logo-cdw-no-tag?wid=64&hei=64&fmt=webp,,lossless">
            </a>
        <p class="title"> CDW BIG WINS!! </p>
        <p class="subtitle"> WELCOME, {{ userPrincipalName }}!! Thanks for logging in from your {{ clientType }}.</p>
    </section>
</template>