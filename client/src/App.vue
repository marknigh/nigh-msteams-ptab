<script setup lang="ts">
  import { ref } from 'vue'


  // import child components
  import InputCollabWins from './components/InputCollabWins.vue'
  import DisplayCollabWins from './components/DisplayCollabWins.vue'
  import BarTop from './components/BarTop.vue'
  import BarBottom from './components/BarBottom.vue'
  import GetWeather from './components/GetWeather.vue'
  
  // data to be used as a starting point. 
  import { collab_wins } from './assets/data.json'

 
  let collabWins = ref(collab_wins)
  
  function save_win(data: any){
    collabWins.value.push({...data.value})
  }

</script>

  <template>
    <nav class="level">
      <div class="level-item has-text-centered">
        <Suspense>
          <bar-top />
          <template #fallback>
            Loading...
          </template> 
        </Suspense>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <Suspense>
            <get-weather />
          </Suspense>
        </div>
      </div>
    </nav>

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
