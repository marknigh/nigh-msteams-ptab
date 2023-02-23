<script setup lang="ts">
import { app }from "@microsoft/teams-js";

const context = await app.getContext()

</script>

<template>
    <section class="section">
        <a href="https://cdw.com">
            <img src="../assets/CDW-logo.png">
        </a>
        <p class="title"> CDW BIG WINS!! </p>
        <p class="subtitle"> WELCOME, {{ context.user?.userPrincipalName }}!! Thanks for logging in from your {{ context.app.host.clientType }}.</p>
    </section>
</template>
