<script setup lang="ts">
  import MainWindow from './components/MainWindow.vue'
  
  // microsoft teams javascript client sdk
  import * as microsoftTeams from "@microsoft/teams-js";
  console.log(microsoftTeams)
  console.log(microsoftTeams.app)
  microsoftTeams.app.initialize().then(() => {
    microsoftTeams.app.getContext().then((context) => {
      console.log('context: ', context)
    })
  }).catch((error) => {
    console.log('error in initialization', error)
  })

</script>

<template>
  <MainWindow />
</template>

<style scoped>
</style>
