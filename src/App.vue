<script setup lang="ts">
  import MainWindow from './components/MainWindow.vue'
  import { ref } from 'vue'
  import * as microsoftTeams from "@microsoft/teams-js";

 let clientType = ''
 let userPrincipialName = ''
 let theme = ''
  
 // microsoft teams javascript client sdk
  microsoftTeams.app.initialize().then(() => {
    microsoftTeams.app.getContext().then((context) => {
      clientType = context.app.host.clientType
      userPrincipialName = context.user?.loginHint!
      theme = context.app.theme
      microsoftTeams.app.notifySuccess()
    })
  }).catch((error) => {
    console.log('error in initialization', error)
    microsoftTeams.app.notifyFailure(error)
  })

</script>

<template>
  <MainWindow :clientType="clientType" :userPrincipalName="userPrincipialName" :theme="theme"/>
</template>

<style scoped>
</style>
