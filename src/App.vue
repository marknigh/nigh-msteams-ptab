<script setup lang="ts">
  import { ref } from 'vue'

  // import child components
  import InputCollabWins from './components/InputCollabWins.vue'
  import DisplayCollabWins from './components/DisplayCollabWins.vue'
  import BarTop from './components/BarTop.vue'
  import BarBottom from './components/BarBottom.vue'

  // data to be used as a starting point. 
  import { collab_wins } from './assets/data.json'

  import * as microsoftTeams from "@microsoft/teams-js";
  
  let collabWins = ref(collab_wins)
  let clientType = ref('desktop')
  let userPrincipialName = ref('mark@marknigh.com')
  let theme = ref('c')
  
 // microsoft teams javascript client sdk
  microsoftTeams.app.initialize().then(() => {
    microsoftTeams.app.getContext().then((context) => {
      console.log('context: ', context)
      clientType.value = context.app.host.clientType 
      userPrincipialName.value = context.user?.loginHint!
      theme.value = context.app.theme
      microsoftTeams.app.notifySuccess()
    })
  }).catch((error) => {
    console.log('error in initialization', error)
    microsoftTeams.app.notifyFailure(error)
  })

  function save_win(data: { customer: '', revenue: '', gp: '' }){
    console.log(data)
    collabWins.value.push(data)
  }

</script>

<template>
  <bar-top :clientType="clientType" :userPrincipalName="userPrincipialName" :theme="theme"/>
  <div class="container">
    <div class="columns is-variable is-8">
      <div class="column is-half">
        <InputCollabWins @save:win="save_win"/>
      </div>
      <div class="column is-half">
        <DisplayCollabWins :wins="collabWins"/>
      </div>
    </div>
  </div>
  <bar-bottom></bar-bottom>
</template>

<style scoped>
</style>
