<script setup lang="ts">
  import { ref } from 'vue'


  // import child components
  import InputCollabWins from './components/InputCollabWins.vue'
  import DisplayCollabWins from './components/DisplayCollabWins.vue'
  import BarTop from './components/BarTop.vue'
  import BarBottom from './components/BarBottom.vue'

  // data to be used as a starting point. 
  import { collab_wins } from './assets/data.json'

 
  let collabWins = ref(collab_wins)
  
  function save_win(data: any){
    collabWins.value.push({...data.value})
  }

</script>

  <template>
    <Suspense>
      <bar-top />
    </Suspense>
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
