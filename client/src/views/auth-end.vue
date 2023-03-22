<template>
    <div>

    </div>
</template>

<script setup lang="ts">
    import * as microsoftTeams from '@microsoft/teams-js'

    microsoftTeams.app.initialize();

    microsoftTeams.app.getContext().then(() => {
        microsoftTeams.authentication.notifySuccess();
    })

</script>

<style scoped>

</style>