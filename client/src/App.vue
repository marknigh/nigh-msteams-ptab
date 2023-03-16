<script setup lang="ts">
  import { ref } from 'vue'

  // import child components
  import InputCollabWins from './components/InputCollabWins.vue'
  import DisplayCollabWins from './components/DisplayCollabWins.vue'
  import BarTop from './components/BarTop.vue'
  import BarBottom from './components/BarBottom.vue'
  import GetWeather from './components/GetWeather.vue'
  import ProfilePicture from './components/ProfilePicture.vue'
  import CalendarEvent from './components/CalendarView.vue'

  // data to be used as a starting point. 
  import { collab_wins } from './assets/data.json'
 
  let collabWins = ref(collab_wins)
  
  function save_win(data: any){
    collabWins.value.push({...data.value})
  }

</script>

  <template>
    <div class="container">
      <div class="columns is-variable is-8">
        <Suspense>
          <profile-picture/>
        </Suspense>
        <Suspense>
          <bar-top/>
        </Suspense>
        <Suspense>
          <calendar-event/>
        </Suspense>
          <Suspense>
            <get-weather />
          </Suspense>
      </div>
    </div>

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
